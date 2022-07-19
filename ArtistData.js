const { ReadFileAsync } = require("./FileUtils");

const Artist = async (artistName) => {
  console.log("calling ReadFileAsync@FileUtils");
  const data = ReadFileAsync(artistName);
  return data;
};

module.exports = { Artist };
