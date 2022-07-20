const dotenv = require("dotenv");
dotenv.config();

const { ThirdwebSDK, ChainId, NATIVE_TOKENS } = require("@thirdweb-dev/sdk");

const sdk = new ThirdwebSDK("rinkeby");

const contract = sdk.getMarketplace(
  process.env.MARKETPLACE_CONTRACT_ADDRESS
);

// address of the contract the asset you want to list is on
const ListArtwork = async (_contractAddress, _tokenId, _price) => {
  const listing = {
    // token ID of the asset you want to list
    assetContractAddress: _contractAddress,
    tokenId: _tokenId,
    // when should the listing open up for offers
    startTimestamp: new Date(),
    // how long the listing will be open for
    listingDurationInSeconds: 86400,
    // how many of the asset you want to list
    quantity: 1,
    // address of the currency contract that will be used to pay for the listing
    currencyContractAddress: NATIVE_TOKEN_ADDRESS,
    // how much the asset will be sold for
    buyoutPricePerToken: _price,
  };

  const tx = await contract.direct.createListing(listing);
  const receipt = tx.receipt; // the transaction receipt
  const id = tx.id;

  return {id, receipt};
};

const GetListing = async (listingId) => {
  const listing = await contract.getListing(listingId);
  return listing;
};

const AllListings = async () => {
  const listings = await contract.getActiveListings();
  return listings;
};

const ActiveListings = async () => {
  const activeListings = await contract.getAllListings();
  // const priceOfFirstListing = listings[0].price;
  return activeListings;
};

const MakeOffer = async (listingId) => {
  // The listing ID of the asset you want to offer on
  // The price you are willing to offer per token
  const pricePerToken = 1;
  // The quantity of tokens you want to receive for this offer
  const quantity = 1;
  // The address of the currency you are making the offer in (must be ERC-20)
  const currencyContractAddress =
    NATIVE_TOKENS[ChainId.Rinkeby].wrapped.address;

  await contract.direct.makeOffer(
    listingId,
    quantity,
    currencyContractAddress,
    pricePerToken
  );
};

const BuyNFT = async (listingId) => {
  const quantity = 1;
  await contract.buyoutListing(listingId, quantity);
};

const AcceptOffer = async (listingId, offerMaker) => {
  await contract.direct.acceptOffer(listingId, offerMaker);
};

// Export to the main index.js file for import in the frontend
module.exports = {
  ListArtwork,
  GetListing,
  AllListings,
  ActiveListings,
  MakeOffer,
  AcceptOffer,
  BuyNFT,
};
