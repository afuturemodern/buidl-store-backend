import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

// TODO: add below ones instead of fromPrivateKey for production.
// "signatureId": "<Wallet's signature ID from Tatum KMS>",
// "index": 0,
// "nonce": 1,
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
          "x-testnet-type": "ethereum-rinkeby"
        },
      }, 
      
    )
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};

CreateMarketplace();
