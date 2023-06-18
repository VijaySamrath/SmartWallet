import {
    ThirdwebNftMedia,
    ThirdwebSDKProvider,
    useAddress,
    useBalance,
    useContract,
    useOwnedNFTs,
    Web3Button
  } from "@thirdweb-dev/react";
  import React from "react";
  import { activeChain,EDITIONDROP_ADDRESS, TOKENDROP_ADDRESS } from "../../const/constants";
  import { Signer, Contract} from "ethers";

  interface ConnectedProps {
    signer: Signer | undefined;
  }
  
  const SmartWalletConnected: React.FC<ConnectedProps> = ({ signer }) => {
    return (
      <ThirdwebSDKProvider signer={signer} activeChain={activeChain}>
        <ClaimTokens />
      </ThirdwebSDKProvider>
    );
  };
  
  const ClaimTokens = () => {
    const address = useAddress();
    const { data: tokenBalance, isLoading: tokenBalanceIsLoading } =
    useBalance(TOKENDROP_ADDRESS);

    const{
        contract 
    } = useContract{EDITIONDROP_ADDRESS};
    const {
        data: ownedNFTs,
        isLoading: ownedNFTsIsLoading,
    } = useOwnedNFTs(contract,address)
    return (
        <div>
            <p>Smart wallet address: {address}</p>
            <h1>Claim tokens:</h1>
            {tokenBalanceIsLoading ? (
                <p>Loading...</p>
            ) : (
                <p>Token balance: {tokenBalance?.displayValue}</p>
            )}
            <Web3Button
                contractAddress={TOKENDROP_ADDRESS}
                action={(contract) => contract.erc20.claim(5)}

            >Claim Token</Web3Button>
            <br />
            <h1>Claim NFT:</h1>
            <Web3Button
              contractAddress={TOKENDROP_ADDRESS}
              action={(contract) => contract.erc1155.claim(0, 1)} 
            >Claim NFT</Web3Button>
            {ownedNFTsIsLoading ?(
                <p>Loadon...</p>
            ) : (
                <div>
                    {ownedNFTs && ownedNFTs.length > 0 ? (
                        ownedNFTs.map((nft) => = (
                            <div>
                                <ThirdwebNftMedia
                                   metadata={nft.metadata} 
                                />
                                <p>{nft.metadata.name}</p>
                                <p>QTY: {nft.quantityOwned}</p>
                            </div>
                        ))

                        ) :(
                            <p>You have no NFTs</p>
                        )} 

                </div>
           )}
        </div>
    )
  }
    
  export default SmartWalletConnected; 