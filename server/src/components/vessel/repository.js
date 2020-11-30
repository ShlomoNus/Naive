const path = require("path");
const fs = require("fs").promises;

const getAll = async () => {
  const allVessels = await fs.readFile(
    path.join(__dirname, "..", "..", "assets/vessels.json"),
    { encoding: "utf-8" }
  );
  return JSON.parse (allVessels);
};


module.exports = { getAll };
