import { WalletName } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletIcon } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";
import styles from "./../styles/WalletModal.module.scss";
import { ReactComponent as Logo } from "../assets/icons/logo.svg";
import NetworksDropdown from "./networksDropdown";
import { useMetamask, MetamaskIcon } from "../providers/MetamaskProvider";
import { useWeb3authSetting } from "../providers/Web3authSettingProvider";
import { useWeb3Auth } from "@djuno/web3auth-hook";

function WalletModal({ absolute }: { absolute?: boolean }) {
  const { wallets, select } = useWallet();
  const { connect } = useMetamask();

  const { selectedNetwork } = useWeb3authSetting();
  const { networks, getNetworks } = useWeb3Auth();

  useEffect(() => {
    getNetworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (walletName: WalletName) => {
    select(walletName);
  };

  const handleMetaClick = (chainId: number) => {
    connect(+chainId);
  };

  const WalletConnectionContent = () => {
    return (
      <>
        <p className={absolute ? "text-sm text-slate-500" : styles.desc}>
          Select network
        </p>
        <NetworksDropdown />
        <ul className={styles.wallets}>
          <p className={absolute ? "text-sm text-slate-500" : styles.desc}>
            Select your wallet
          </p>
          {selectedNetwork?.NetworkName === "solana" &&
            wallets.map((wallet) => (
              <li
                key={`wallet-${wallet.adapter.name}`}
                onClick={() => handleClick(wallet.adapter.name)}
              >
                <WalletIcon wallet={wallet} />
                {wallet.adapter.name}
              </li>
            ))}
          {selectedNetwork &&
            selectedNetwork.NetworkName !== "solana" &&
            selectedNetwork.WalletResponses.map((wallet: any) => (
              <li
                key={`wallet-${wallet.WalletName}`}
                onClick={() => handleMetaClick(selectedNetwork.ChainId)}
              >
                <MetamaskIcon />
                {wallet.WalletName}
              </li>
            ))}
        </ul>
      </>
    );
  };
  if (absolute) return <WalletConnectionContent />;
  return (
    <div className={styles.container}>
      <div className={styles.walletModal}>
        <Logo width={70} />
        <p className={styles.title}>Connect wallet</p>
        <WalletConnectionContent />
      </div>
    </div>
  );
}

export default WalletModal;
