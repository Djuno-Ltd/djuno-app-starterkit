export type NetworkStateType = {
  networks: Array<NetworkType>;
  selectedNetwork: NetworkType | null;
  loading: boolean;
};

export interface NetworkType {
  Id: string;
  NetworkName: string;
  ChainId: number;
  WalletResponses: WalletInNetwork[];
}

export interface WalletInNetwork {
  Id: number;
  NetworkId: string;
  WalletName: string;
}
