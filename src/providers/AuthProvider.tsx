import { PropsWithChildren } from "react";
import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from "react";
import Loading from "../components/loading";
import WalletModal from "../components/walletModal";
import { animated, useTransition } from "@react-spring/web";
import { useWallet } from "@solana/wallet-adapter-react";
import { networkHandshakeApi, authApi } from "./../api/networksApi";
import bs58 from "bs58";
import { toast } from "react-hot-toast";
import { useMetamask } from "./MetamaskProvider";
import { useAppDispatch } from "../hooks";
import { fetchProfile } from "../store/profileSlice";
import { getStorage, setStorage, removeStorage } from "../utils/helper";
import { useMatch } from "react-router-dom";
// import { useMatch } from "react-router-dom";

export type AuthContextType = {
  logout: () => void;
  metaLogout: () => void;
};
export type AuthProps = {
  children: React.ReactNode;
};

type Status = "disable" | "connect_wallet" | "loading" | "ok" | "sign";

export const AuthContext = createContext<AuthContextType>({
  logout: () => {},
  metaLogout: () => {},
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState<Status>("connect_wallet");
  const { publicKey, signMessage, connecting, disconnect, connected, wallet } =
    useWallet();

  const {
    accounts,
    signMessage: metaSignMessage,
    isConnecting,
    isConnected,
    disconnect: metaDisconnect,
    getRealAddress,
  } = useMetamask();

  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    disconnect().then().catch();
    removeStorage("token");
    removeStorage("publicKey");
    setStatus("connect_wallet");
  }, [disconnect]);

  const metaLogout = useCallback(
    (message?: string) => {
      metaDisconnect().then().catch();
      removeStorage("token");
      removeStorage("publicKey");
      setStatus("connect_wallet");
      if (message !== undefined) toast.error(message || "Somthing went wrong!");
    },
    [metaDisconnect]
  );

  useEffect(() => {
    if (connecting) setStatus("loading");
    else if (!connecting && !connected) setStatus("connect_wallet");
  }, [connecting, connected]);

  useEffect(() => {
    if (isConnecting) setStatus("loading");
    else if (!isConnecting && !isConnected) setStatus("connect_wallet");
  }, [isConnecting, isConnected]);

  useEffect(() => {
    if (publicKey !== null) {
      // if (isMatchSignPage === null)
      getToken(getStorage("networkId"), getStorage("token"));
      // else if (isMatchSignPage) setStatus("sign");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  useEffect(() => {
    if (accounts.length > 0 && getStorage("networkName") !== "solana") {
      // if (isMatchSignPage === null)
      getMetaToken(getStorage("networkId"), getStorage("token"));
      // else if (isMatchSignPage) setStatus("sign");
    } else {
      metaLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts[0]]);

  const getToken = async (networkId: string, token?: string | null) => {
    if (!publicKey || !networkId || !signMessage) {
      logout();
      return;
    }
    setStatus("loading");
    const login = async (token: string) => {
      try {
        setStorage("token", token);
        setStorage("publicKey", publicKey.toBase58());
        dispatch(fetchProfile());
        setStatus("ok");
      } catch (e) {
        logout();
      }
    };

    try {
      if (token && getStorage("publicKey") === publicKey.toBase58()) {
        await login(token);
      } else {
        setStatus("loading");
        // localStorage.removeItem("publicKey");
        // localStorage.removeItem("network");
        const walletName = wallet?.adapter.name.toLowerCase();
        if (walletName) {
          const { data } = await networkHandshakeApi(
            networkId.toString(),
            publicKey.toBase58()
          );
          const message = new TextEncoder().encode(data);
          const signature = await signMessage(message);
          const authResponse = await authApi(
            networkId.toString(),
            publicKey.toBase58(),
            bs58.encode(signature)
          );
          if (authResponse.data === null) logout();
          else login(authResponse.data);
        }
      }
    } catch (e: any) {
      console.log("getToken called catch!", e);
      if (
        e?.error?.message &&
        e?.error?.code !== -32603 &&
        e?.error?.code !== 4001
      ) {
        toast.error(e?.error?.message || "Something went wrong!");
      }
      logout();
    }
  };

  const getMetaToken = useCallback(
    async (networkId: string, token?: string | null) => {
      if (!accounts.length || !networkId || !metaSignMessage) {
        metaLogout();
        return;
      }

      setStatus("loading");
      const login = async (token: string) => {
        try {
          if (accounts[0]) {
            setStorage("token", token);
            setStorage("publicKey", getRealAddress(accounts[0]));
            // const { result } = await djibConn.status();
            // @ts-ignore
            dispatch(fetchProfile());
            // let statusState = {
            //   used: result.cloud.used_size_kb,
            //   total: result.cloud.total_size_kb,
            //   updateAt: result.cloud.updated_at,
            //   createAt: result.cloud.created_at,
            //   prizes: result.prizes,
            // };

            setStatus("ok");
          } else {
            metaLogout();
          }
        } catch (e) {
          metaLogout();
        }
      };

      try {
        if (token && getStorage("publicKey") === getRealAddress(accounts[0])) {
          await login(token);
        } else {
          // localStorage.removeItem("publicKey");
          // localStorage.removeItem("network");
          const { data } = await networkHandshakeApi(
            networkId.toString(),
            getRealAddress(accounts[0])
          );

          const signature = await metaSignMessage(data);
          if (signature) {
            const authResponse = await authApi(
              networkId.toString(),
              getRealAddress(accounts[0]),
              signature
            );
            if (authResponse.data === null) metaLogout("authenticated error!");
            else login(authResponse.data);
          }
        }
      } catch (e: any) {
        console.log("getToken called catch!", e);
        if (
          e?.error?.message &&
          e?.error?.code !== -32603 &&
          e?.error?.code !== 4001
        ) {
          toast.error(e?.error?.message || "Something went wrong!");
        }
        metaLogout();
      }
    },
    [accounts, metaSignMessage, metaLogout, getRealAddress, dispatch]
  );

  const contextValue = useMemo(
    () => ({
      logout,
      metaLogout,
    }),
    [logout, metaLogout]
  );

  const transition = useTransition(status === "connect_wallet", {
    from: { opacity: 0 },
    leave: { opacity: 0 },
    enter: {
      opacity: 1,
    },
  });

  // if (isMatchSignPage !== null) return <>{children}</>;
  return (
    <AuthContext.Provider value={contextValue}>
      {transition(
        (animationStyle, show) =>
          show && (
            <animated.div style={animationStyle}>
              <WalletModal />
            </animated.div>
          )
      )}
      {status === "ok" && <>{children}</>}
      {status === "loading" && <Loading style={{ height: "100vh" }} />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
