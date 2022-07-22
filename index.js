const dotenv = require("dotenv"); // Ensure your .env has the same keys as the .env.example
dotenv.config();
const app = require("./server");
const { getTokenMetadata } = require("./Metadata");

// Backend API
const { ListArtwork } = require("./marketplace");

// const {
//   connectWallet,
//   getCurrentWalletConnected,
// } = require("./public/WalletInteraction");

const { Artist } = require("./ArtistData");

// app.get("/api/v1/data/artist/:artistName", async (req, res) => {
//   console.log(`getting data for: ${req.params.artistName}`);
//   const data = await getMetadata();
//   res.send(data);
// });


// Get request
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


// /api/v1/data/artist/afuturemodern
app.get("/api/v1/data/artist/:artistName", async (req, res) => {
  console.log(`getting data for: ${req.params.artistName}`);
  const data = await Artist(req.params.artistName);
  res.send(data);
});


// const fetchWallet = async () => {
//   const { address, status } = await getCurrentWalletConnected();
//   return { address, status };
// };

// app.get("/api/wallet/fetchConnected", async (_, res) => {
//   const { address, status } = await fetchWallet();
//   res.send({ address, status });
// });

// app.get("/api/wallet/connect", async (_, res) => {
//   console.log("connecting wallet");
//   try {
//     const { address, status } = await connectWallet();
//     res.send({ address, status });
//   } catch (error) {console.log(error);}
// });

// eg. GET http://localhost:3000/api/v1/data/artist/afuturemodern
app.get(
  "/api/v1/marketplace/listing/new/:contractAddress/:tokenId",
  async (req, res) => {
    console.log(
      `getting data for: contractAddress : ${req.params.contractAddress} tokenId: ${req.params.tokenId}`
    );
    const {id, receipt} = await ListArtwork(
      req.params.contractAddress,
      req.params.tokenId
    );
    res.send(id, receipt);
  }
);

// get metadata of an NFT with Alchemy SDK.
// eg. GET http://localhost:3000/api/v1/metadata/NFT/0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405/77001
app.get("/api/v1/metadata/NFT/:address/:tokenId", async (req, res) => {
  console.log(`getting data for: ${req.params.address.toString()}`);
  const address = req.params.address.toString();
  const tokenId = req.params.tokenId.toString();
  const data = await getTokenMetadata(address, tokenId);
  console.log(`data: ${data}`);
  res.send(data);
});
