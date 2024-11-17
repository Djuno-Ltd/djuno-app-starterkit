import React, { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export const SolanaWalletsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const network = WalletAdapterNetwork.Mainnet;
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint = "https://rpc.djuno.io";
  // "https://sparkling-dry-tree.solana-mainnet.quiknode.pro/06c45bb85e099fa183d4978bfb8e6b63f5a76a7a/";

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network })],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
