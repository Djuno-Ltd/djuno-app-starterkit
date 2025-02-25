import React, { createContext, useCallback, useContext, useState } from "react";
// import { Client } from "@djuno/web3auth-sdk";
import { setStorage } from "../utils/helper";

export type Web3authState = {
  // client: Client | null;

  // handleGetNetworks: () => void;
  // networks: any[];
  // loadingNetworks: boolean;
  selectedNetwork: any;
  handleChangeSelectedNetwork: (net: any) => void;

  // handleGetProfile: () => void;
  // handleGetProfileAvatar: () => void;
  // handleChangeProfile: (data: any) => Promise<void>;
  // handleChangeProfileAvatar: (formData: any) => void;
  // profile: any;
  // profileAvatar: string | null;
  // loadingProfile: boolean;
};

const initialState: Web3authState = {
  // client: null,

  // networks: [],
  // handleGetNetworks: () => {},
  // loadingNetworks: false,
  selectedNetwork: null,
  handleChangeSelectedNetwork: () => {},

  // handleGetProfile: () => {},
  // handleGetProfileAvatar: () => {},
  // handleChangeProfile: async () => {},
  // handleChangeProfileAvatar: () => {},
  // profile: {},
  // profileAvatar: null,
  // loadingProfile: false,
};

export const Web3authSettingContext =
  createContext<Web3authState>(initialState);

export type SearchProviderProps = {
  children: React.ReactNode;
};

function Web3authSettingProvider({ children }: SearchProviderProps) {
  // const [client, setClient] = useState<Client | null>(null);

  const [selectedNetwork, setSelectedNetwork] = useState();
  // const [networks, setNetworks] = useState([]);
  // const [loadingNetworks, setLoadingNetworks] = useState(false);

  // const [profile, setProfile] = useState({});
  // const [profileAvatar, setProfileAvatar] = useState<string | null>(null);
  // const [loadingProfile, setLoadingProfile] = useState(false);

  // useEffect(() => {
  //   const client = new Client({
  //     accessKey: process.env.REACT_APP_ACCESS_KEY || "",
  //   });

  //   setClient(client);
  // }, []);

  // const handleGetNetworks = useCallback(() => {
  //   setLoadingNetworks(true);
  //   client
  //     ?.networks()
  //     .then(({ data }) => {
  //       setNetworks(data);

  //       let selectedNet = data[0];
  //       const netId = getStorage("networkId");
  //       if (netId) {
  //         const searchedNet = data.find(
  //           (n: any) => Number(n.Id) === Number(netId)
  //         );
  //         if (typeof searchedNet !== "undefined") {
  //           selectedNet = searchedNet;
  //         }
  //       }
  //       setSelectedNetwork(selectedNet);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     })
  //     .finally(() => {
  //       setLoadingNetworks(false);
  //     });
  // }, [client]);

  const handleChangeSelectedNetwork = useCallback((network: any) => {
    setSelectedNetwork(network);
    setStorage("networkName", network.NetworkName);
    setStorage("networkId", network.Id.toString());
  }, []);

  // const handleGetProfile = useCallback(() => {
  //   setLoadingProfile(true);
  //   client
  //     ?.getProfile(getStorage("token"))
  //     .then(({ data }) => {
  //       setProfile(data);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     })
  //     .finally(() => {
  //       setLoadingProfile(false);
  //     });
  // }, [client]);

  // const handleGetProfileAvatar = useCallback(() => {
  //   setLoadingProfile(true);
  //   client
  //     ?.getProfileAvatar(getStorage("token"))
  //     .then(({ data }) => {
  //       console.log("profileAvatar", data);
  //       setProfileAvatar(data);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     })
  //     .finally(() => {
  //       setLoadingProfile(false);
  //     });
  // }, [client]);

  // const handleChangeProfile = useCallback(
  //   async (data: any) => {
  //     setLoadingProfile(true);
  //     new Promise((resolve) => {
  //       client
  //         ?.updateProfile(getStorage("token"), data)
  //         .then(() => {
  //           resolve(true);
  //         })
  //         .catch((e) => {
  //           console.error(e);
  //         })
  //         .finally(() => {
  //           setLoadingProfile(false);
  //         });
  //     });
  //   },
  //   [client]
  // );

  // const handleChangeProfileAvatar = useCallback(
  //   (formData: any) => {
  //     setLoadingProfile(true);
  //     client
  //       ?.saveProfileAvatar(getStorage("token"), formData)
  //       .then(({ data }) => {
  //         // setProfileAvatar(data);
  //       })
  //       .catch((e) => {
  //         console.error(e);
  //       })
  //       .finally(() => {
  //         setLoadingProfile(false);
  //       });
  //   },
  //   [client]
  // );

  return (
    <Web3authSettingContext.Provider
      value={{
        // client,

        // handleGetNetworks,
        // networks,
        // loadingNetworks,
        selectedNetwork,
        handleChangeSelectedNetwork,

        // handleGetProfile,
        // handleGetProfileAvatar,
        // handleChangeProfile,
        // handleChangeProfileAvatar,
        // profile,
        // profileAvatar,
        // loadingProfile,
      }}
    >
      {children}
    </Web3authSettingContext.Provider>
  );
}

export const useWeb3authSetting = () => useContext(Web3authSettingContext);

export default Web3authSettingProvider;
