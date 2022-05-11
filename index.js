
const dotenv = require('dotenv'); // Ensure your .env has the same keys as the .env.example
dotenv.config();
const app = require('./server');

// Backend API
const { 
    CreateMarketplace, 
    ListArtwork, 
} = require('./marketplace'); 

// Get request
app.get("/api/v1", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// TODO: Working on naming convention for routes
app.post("/api/v1/marketplace/create", async (req, res) => {

    let fee = req.body.fee ? req.body.fee : {
        gasLimit: "380000",
        gasPrice: "20",
    };

    // TODO: Add validation
    let requestObj = {
        feeRecipient: process.env.BUIDL_STORE_FEE_RECIPIENT_ADDRESS,
        marketplaceFee: req.body.marketplaceFee || 2000,
        chain: req.body.chain || "ETH",
        fromPrivateKey: process.env.BUIDL_STORE_DEPLOYER_PRIVATE_KEY,
        fee: fee,
    }
    let response = await CreateMarketplace(requestObj);
    res.send(response); // Should expect a txId as the response
});

// TODO: Working on naming convention for routes
app.get("/api/v1/marketplace/artwork/getAll", (req, res) => {
    // TODO: Add validation
    // TODO: Add error handling
    // TODO: Add logging
    // TODO: Add documentation for return values expected
    ListArtwork(req, res);
});
