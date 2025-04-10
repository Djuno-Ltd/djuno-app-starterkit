import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { setStorage, getStorage } from "../utils/helper";
import { useWeb3Auth } from "@djuno/web3auth-hook";

export type Web3authState = {
  selectedNetwork: any;
  handleChangeSelectedNetwork: (net: any) => void;
};

const initialState: Web3authState = {
  selectedNetwork: null,
  handleChangeSelectedNetwork: () => {},
};

export const Web3authSettingContext =
  createContext<Web3authState>(initialState);

export type SearchProviderProps = {
  children: React.ReactNode;
};

function Web3authSettingProvider({ children }: SearchProviderProps) {
  const [selectedNetwork, setSelectedNetwork] = useState();
  const { networks } = useWeb3Auth();

  useEffect(() => {
    if (networks.length > 0) {
      const _selectedNetwork = networks.find(
        (network) => network.Id.toString() === getStorage("networkId")
      );
      if (_selectedNetwork) {
        setSelectedNetwork(_selectedNetwork);
      }
    }
  }, [networks]);

  const handleChangeSelectedNetwork = useCallback((network: any) => {
    setSelectedNetwork(network);
    setStorage("networkName", network.NetworkName);
    setStorage("networkId", network.Id.toString());
  }, []);

  return (
    <Web3authSettingContext.Provider
      value={{
        selectedNetwork,
        handleChangeSelectedNetwork,
      }}
    >
      {children}
    </Web3authSettingContext.Provider>
  );
}

export const useWeb3authSetting = () => useContext(Web3authSettingContext);

export default Web3authSettingProvider;
