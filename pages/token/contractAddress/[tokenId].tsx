import { NFT, ThirdwebSDK} from "@thirdweb-dev/sdk";
import { GetStaticPaths,GetStaticProps } from "next";
import { NFTDROP_ADDRESS, activeChain} from "../../../const/constants";
import styles from "../../../styles/Home.module.css";
import { ThirdwebNftMedia, useAddress, useWallet} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { Signer } from "ethers";
import SmartWalletConnected from "../../../components/SmartWallet/smartWalletConnected";
import newSmartWallet from "../../../components/SmartWallet/SmartWallet";

type Props = {
    nft: NFT;
  };

  export default function Token({ nft }: Props) {
    const [smartWalletAddress, setSmartWalletAddress] = useState<string | undefined>(
      undefined
    );
    const [signer, setSigner] = useState<Signer>();
  
    // get the currently connected wallet
    const address = useAddress();
    const wallet = useWallet();
  
    // create a smart wallet for the NFT
    useEffect(() => {
      const createSmartWallet = async (nft: NFT) => {
        if (nft && smartWalletAddress == null && address && wallet) {
          const smartWallet = newSmartWallet(nft);
          console.log("personal wallet", address);
          await smartWallet.connect({
            personalWallet: wallet,
          });
          setSigner(await smartWallet.getSigner());
          console.log("signer", signer);
          setSmartWalletAddress(await smartWallet.getAddress());
          console.log("smart wallet address", await smartWallet.getAddress());
          return smartWallet;
        } else {
          console.log("smart wallet not created");
        }
      };
      createSmartWallet(nft);
    }, [nft, smartWalletAddress, address, wallet]);
  
    return (
      <div className={styles.conatiners}>
        {nft && (
          <div>
            <ThirdwebNftMedia metadata={nft.metadata} />
            <h1>{nft.metadata.name}</h1>
            <p>Token Id: {nft.metadata.id}</p>
          </div>
        )}
        {smartWalletAddress ? (
          <SmartWalletConnected signer={signer} />
        ) : (
          <p> Loading .... </p>
        )}
      </div>
    );
  }

export const getStaticProps: GetStaticProps = async (context) => {
    const tokenId = context.params?.tokenId as string;
  
    const sdk = new ThirdwebSDK(activeChain);
  
    const contract = await sdk.getContract(NFTDROP_ADDRESS);
  
    const nft = await contract.erc721.get(tokenId);
  
    return {
      props: {
        nft,
      },
      revalidate: 1, // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
    }
  };
  
  export const getStaticPaths:GetStaticPaths = async () => {
    const sdk = new ThirdwebSDK(activeChain);
  
    const contract = await sdk.getContract(NFTDROP_ADDRESS);
  
    const nfts = await contract.erc721.getAll();
  
    const paths = nfts.map((nft) => {
      return {
        params: {
          contractAddress: NFTDROP_ADDRESS,
          tokenId: nft.metadata.id,
        },
      };
    });
  
    return {
      paths,
      fallback: "blocking", // can also be true or 'blocking'
    };
  };