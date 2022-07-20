const fs = require("fs").promises;

const ReadFileAsync = async (artistName) => {
  const data = await fs.readFile(
    "./data/LaunchArtists/" + artistName + ".json",
    "binary"
  );
  console.log("data for" + artistName + data.toString());
  return data.toString();
};


module.exports = { ReadFileAsync };
