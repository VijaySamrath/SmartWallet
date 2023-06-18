import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";

type Props = {
  nft: NFT;
};

// Each NFT component shows the NFT image, name, and token ID.
export default function NFTComponent({ nft }: Props) {
  return (
    <>
      <ThirdwebNftMedia metadata={nft.metadata} />

      <p> Token ID : {nft.metadata.id}</p>
      <p>{nft.metadata.name}</p>
    </>
  );
}