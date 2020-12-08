const path = require("path");
const fs = require("fs").promises;

const getFleets = async () => {
  const allFleets = await fs.readFile(
    path.join(__dirname, "..", "..", "assets/fleets.json"),
    { encoding: "utf-8" }
  );
  return JSON.parse(allFleets);
};

const getAllVessels = async () => {
  const allVessels = await fs.readFile(
    path.join(__dirname, "..", "..", "assets/vessels.json"),
    { encoding: "utf-8" }
  );
  return JSON.parse (allVessels);
};

const getAllVesselLocation = async () => {
  const allVessels = await fs.readFile(
    path.join(__dirname, "..", "..", "assets/vesselLocations.json"),
    { encoding: "utf-8" }
  );
  return JSON.parse (allVessels);
};


module.exports = {
  getFleets,
  getAllVessels,
  getAllVesselLocation
};
