import { useWallet } from "@solana/wallet-adapter-react";
import { WalletIcon } from "@solana/wallet-adapter-react-ui";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../providers/AuthProvider";
import styles from "./../styles/WalletDropdown.module.scss";
import ActionList from "./actionList";
import Button from "./button";
import { ReactComponent as ProfileIcon } from "./../assets/icons/user.svg";
import useShow from "../hooks/useShow";
import useWindowOnClick from "../hooks/useWindowOnClick";
import { useNavigate } from "react-router-dom";
import { Option } from "../types";
import { useMetamask, MetamaskIcon } from "../providers/MetamaskProvider";
import classNames from "classnames";

export const walletMenu: Option[] = [
  {
    value: "copy",
    label: "Copy address",
  },
  {
    value: "change",
    label: "Change wallet",
  },
  {
    value: "disconnect",
    label: "Disconnect",
  },
];

function WalletDropdown({ showProfile = true }: { showProfile?: boolean }) {
  const { publicKey, wallet, connected } = useWallet();
  const { isConnected, accounts, getRealAddress } = useMetamask();

  const { logout, metaLogout } = useAuth();
  const navigate = useNavigate();
  const [isShow, { show, hide }] = useShow();

  useWindowOnClick(
    () => {
      hide();
    },
    [],
    { capture: true }
  );

  const walletAddress = useMemo(() => {
    return publicKey?.toBase58();
  }, [publicKey]);

  const metaWalletAddress = useMemo(() => {
    return accounts[0];
  }, [accounts]);

  const handleItemClick = useCallback(
    (value: string) => {
      switch (value) {
        case "disconnect":
          if (connected) logout();
          if (isConnected) metaLogout();
          break;
        case "change":
          if (connected) logout();
          if (isConnected) metaLogout();
          break;
        case "copy":
          let text = metaWalletAddress
            ? getRealAddress(metaWalletAddress)
            : null;
          if (walletAddress) text = walletAddress;
          if (text)
            toast.promise(navigator.clipboard.writeText(text), {
              loading: "Copy...",
              success: <p>Copied!</p>,
              error: <p>Failed.</p>,
            });
          break;
      }
    },
    [
      connected,
      logout,
      isConnected,
      metaLogout,
      getRealAddress,
      metaWalletAddress,
      walletAddress,
    ]
  );

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (connected || isConnected) {
        show();
      }
    },
    [connected, isConnected, show]
  );

  if (!connected && !isConnected) return <></>;
  return (
    <div className={styles.container}>
      {showProfile && (
        <div className={styles.profile} onClick={() => navigate("/settings")}>
          <ProfileIcon />
        </div>
      )}

      {connected && (
        <Button
          className={classNames(styles.button, {
            [styles.showProfile]: showProfile,
          })}
          borderButton={true}
          active={isShow}
          onClickCapture={handleButtonClick}
        >
          {publicKey ? (
            <>
              <WalletIcon wallet={wallet} />
              <p>{walletAddress}</p>
            </>
          ) : (
            "Connect Wallet"
          )}
        </Button>
      )}

      {isConnected && (
        <Button
          className={classNames(styles.button, {
            [styles.showProfile]: showProfile,
          })}
          borderButton={true}
          active={isShow}
          onClickCapture={handleButtonClick}
        >
          {accounts.length > 0 ? (
            <>
              <MetamaskIcon />
              <p>{accounts[0]}</p>
            </>
          ) : (
            "Connect Wallet"
          )}
        </Button>
      )}

      <ActionList
        fullWidth={true}
        show={isShow}
        options={walletMenu}
        onClose={() => hide()}
        onClick={handleItemClick}
      />
    </div>
  );
}

export default WalletDropdown;
