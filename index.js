import dotenv from "dotenv";
import axios from "axios";
dotenv.config();



const CreateMarketplace = () => {
  axios
    .post(
      "https://api-eu1.tatum.io/v3/blockchain/marketplace/listing",
      {
        feeRecipient: process.env.BUIDL_STORE_FEE_RECIPIENT_ADDRESS,
        marketplaceFee: 2000,
        chain: "ETH",
        fromPrivateKey: process.env.BUIDL_STORE_DEPLOYER_PRIVATE_KEY,
        fee: {
          gasLimit: "380000",
          gasPrice: "20",
        },
      },
      {
        headers: {
          "content-type": "application/json",
          "x-api-key": process.env.TATUM_API_KEY,
          "x-testnet-type": "ethereum-rinkeby",
        },
      }
    )
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};


// TODO: add below ones instead of fromPrivateKey for production.
// "signatureId": "<Wallet's signature ID from Tatum KMS>",
// "index": 0,
// "nonce": 1,
const ListArtwork = () => {
    axios
      .post(
        "https://api-eu1.tatum.io/v3/blockchain/marketplace/listing/sell",
        {
          fromPrivateKey: process.env.BUIDL_STORE_DEPLOYER_PRIVATE_KEY,
          contractAddress: process.env.MARKETPLACE_CONTRACT_ADDRESS,
          nftAddress: "0x89206c5492d4a9814585924e7128d4cac53400c3", // an example NFT minted on rinkeby testnet
          seller: "0xA97868b65b435E0ff4028317C3121A6748e20a59", // current owner of that NFT (seller)
          chain: "ETH",
          tokenId: "1",
          listingId: "1",
          price: "1",
          isErc721: true,
          fee: {
              gasLimit: "380000",
              gasPrice: "20",
            },
        },
        {
          headers: {
            "content-type": "application/json",
            "x-api-key": process.env.TATUM_API_KEY,
            "x-testnet-type": "ethereum-rinkeby",
          },
        }
      )
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };



//   fromPrivateKey - The private key of the address that will pay for the gas fees for the approval operation.
//   chain - The chain on which the operation will take place (the same as in the first two API requests).
//   contractAddress - The address of the ERC-20 token used to buy the NFT from the marketplace.
//   isErc721 - Set to "true" if you are selling an ERC-721 or equivalent token. Set to "false" if you are selling an ERC-1155 token.
//   spender - The address of the marketplace smart contract that will be transferring the token.
//   tokenId - The ID of the NFT being sold.
//   feeCurrency - The currency in which the gas fee for the operation will be paid (only for Celo).
//   fee - The gas price and limit for the gas fee to pay for the operation. If this fee is absent, the fee will be calculated automatically.

// tx @ rinkeby:  0x5b9fdd253727945e74051f926dc2262e17db85507c28dd311accd18ee6210725
  const SendApproval = () => {
    axios
      .post(
        "https://api-eu1.tatum.io/v3/blockchain/auction/approve",
        {
          fromPrivateKey: process.env.BUIDL_STORE_DEPLOYER_PRIVATE_KEY,
          contractAddress: process.env.WETH_RINKEBY_CONTRACT_ADDRESS,
          spender: process.env.MARKETPLACE_CONTRACT_ADDRESS,
          chain: "ETH",
          tokenId: "1",
          isErc721: true,
        //   nonce: 2,
          fee: {
              gasLimit: "380000",
              gasPrice: "20",
            },
        },
        {
          headers: {
            "content-type": "application/json",
            "x-api-key": process.env.TATUM_API_KEY,
            "x-testnet-type": "ethereum-rinkeby",
          },
        }
      )
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // tx @ Rinkeby: 0xc499cc23fe14e70ead59dd31c3bf34ef3f08be5ec2d88fcb17d9fd63300cbc8f
  const ApproveSpendingAndCashback = () => {
    axios
      .post(
        "https://api-eu1.tatum.io/v3/blockchain/token/approve",
        {
          fromPrivateKey: process.env.BUIDL_STORE_DEPLOYER_PRIVATE_KEY,
          contractAddress: process.env.WETH_RINKEBY_CONTRACT_ADDRESS,
          spender: process.env.MARKETPLACE_CONTRACT_ADDRESS,
          chain: "ETH",
          amount: "0.2",
          isErc721: true,
          fee: {
              gasLimit: "380000",
              gasPrice: "20",
            },
        },
        {
          headers: {
            "content-type": "application/json",
            "x-api-key": process.env.TATUM_API_KEY,
            "x-testnet-type": "ethereum-rinkeby",
          },
        }
      )
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

// tx @ Rinkeby: 0x3bf928a6649b486e2b06d68ef7fabb86093e196156c9bc47780ce8ec5f50c6fb
  const PurchaseNFTFromListing = () => {
    axios
      .post(
        "https://api-eu1.tatum.io/v3/blockchain/marketplace/listing/buy",
        {
          fromPrivateKey: process.env.BUIDL_STORE_DEPLOYER_PRIVATE_KEY,
          contractAddress: process.env.MARKETPLACE_CONTRACT_ADDRESS,
          buyer: "0xF2Bb8DCD9c246c03a42b029942DDD92Dd0Ea2302",
          chain: "ETH",
          amount: "1.2",
          listingId: "1",
          isErc721: true,
          fee: {
              gasLimit: "380000",
              gasPrice: "20",
            },
        },
        {
          headers: {
            "content-type": "application/json",
            "x-api-key": process.env.TATUM_API_KEY,
            "x-testnet-type": "ethereum-rinkeby",
          },
        }
      )
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }




// CreateMarketplace();
//ListArtwork();
// SendApproval();
// ApproveSpendingAndCashback();
PurchaseNFTFromListing();
