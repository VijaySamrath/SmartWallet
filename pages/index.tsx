import { ConnectWallet, Web3Button, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { NFTDROP_ADDRESS } from "../const/constants";
import NFTGrid from "../components/NFTGrid";


const Home: NextPage = () => {
  const address = useAddress();
  
  const {
    contract
  } = useContract(NFTDROP_ADDRESS);
  const{
    data,
    isLoading,
  } = useOwnedNFTs(contract, address);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      < ConnectWallet />
      {!address ? (
        <p className={styles.description}>Connect your Wallet to get Started</p>
      ) :(
        <div>
          <h3> Your NFTs</h3>
          <NFTGrid
          isLoading={isLoading}
          nfts={data}
          emptyText="You dont have any NFTs Yet."
          />
        <Web3Button
        contractAddress={NFTDROP_ADDRESS}
        action={(contract) => contract.erc721.claim(1)}
       >Claim NFT</Web3Button>
       </div>
      )}
      </main>
    </div>
  );
};

export default Home;
