const path = require("path");
const fs = require("fs").promises;

const getGeneralFleetsInfo = async () => {
  try {
    const cachedData = await fs.readFile(
      path.join(__dirname, "..", "..", "assets/cached.json"),
      { encoding: "utf-8" }
    );
    return JSON.parse(cachedData).generalInfo;
  } catch (error) {
    const data = await getRowFleets();
    const generalInfo = [];
    const cacheFleetArray = [];
    for (const fleet of data) {
      const fleetData = {
        name: fleet["name"],
        vesselsCount: fleet["vessels"].length,
        _id: fleet["_id"],
      };
      generalInfo.push(fleetData);
      const fleetAndVessels = {
        _id: fleet._id,
        vessels: fleet["vessels"],
      };
      cacheFleetArray.push(fleetAndVessels);
    }
    await cacheData(generalInfo, "generalInfo");
    await cacheData(cacheFleetArray, "fleets");
    return generalInfo;
  }
};

const getFleets = async () => {
  const cachedData = await fs.readFile(
    path.join(__dirname, "..", "..", "assets/cached.json"),
    { encoding: "utf-8" }
  );
  return JSON.parse(cachedData).fleets;
};

const getRowFleets = async () => {
  const allFleets = await fs.readFile(
    path.join(__dirname, "..", "..", "assets/fleets.json"),
    { encoding: "utf-8" }
  );
  return JSON.parse(allFleets);
};

const cacheData = async (data, property) => {
  try {
    const cache = await fs.readFile(
      path.join(__dirname, "..", "..", "assets/cached.json"),
      { encoding: "utf-8" }
    );

    const fromJson = JSON.parse(cache);
    fromJson[property] = data;
    await fs.writeFile(
      path.join(__dirname, "..", "..", "assets/cached.json"),
      JSON.stringify(fromJson)
    );
    console.log("succeed");
  } catch (error) {
    const cache = {};
    cache[property] = data;
    const ToJson = JSON.stringify(cache);
    fs.writeFile(
      path.join(__dirname, "..", "..", "assets/cached.json"),
      ToJson
    );
    console.log("failed");
  }
};

const getFleetById = async (id) => {
  const allFleets = await getFleets();
  const selectedFleet = allFleets.find((fleet) => fleet._id == id);
  return selectedFleet;
};
const getFleetVesselsByID = async (id) => {
  const cachedData = await fs.readFile(
    path.join(__dirname, "..", "..", "assets/cached.json"),
    { encoding: "utf-8" }
  );
  const vesselsList = JSON.parse(cachedData).vesselsFullList;
  const fleet = vesselsList.find((item) => item["_id"] === id);
  return fleet["vessels"];
};
module.exports = {
  getGeneralFleetsInfo,
  getFleets,
  getFleetById,
  getFleetVesselsByID,
};
