import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import Link from "next/link";
// import React from "react";
import { NFTDROP_ADDRESS } from "../const/constants";
// import Skeleton from "../Skeleton/Skeleton";
import NFT from "./NFT";
import styles from "../styles/Home.module.css";

type Props = {
  isLoading: boolean;
  nfts: NFTType[] | undefined;
  emptyText?: string;
};

// NFTGrid component shows a grid of the connected wallet's owned NFTs.
export default function NFTGrid({
  isLoading,
  nfts,
  emptyText = "No owned NFTS.",
}: Props) {
  return (
    <div className={styles.Container}>
            <div className={styles.grid}>
            {nfts && nfts.length > 0 ? (
            nfts.map((nft) => (
          <Link
            href={`/token/${NFTDROP_ADDRESS}/${nft.metadata.id}`}
            key={nft.metadata.id}
            className={styles.card}
          >
            <NFT nft={nft} />
          </Link>
        ))
      ) : (
        <p>{emptyText}</p>
      )}
    </div>
    </div>
    )
}