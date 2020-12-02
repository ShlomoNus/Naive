const FleetRepository = require("./repository");
const vesselService = require("../vessel/service");

const getGeneralData = async () => {
  try {
    const data = await FleetRepository.getAllFleets();
    const fleetsArray = [];
    for (const fleet of data) {
      const fleetData = {
        name: fleet["name"],
        vesselsCount: fleet["vessels"].length,
        _id:fleet["_id"]
      };
      fleetsArray.push(fleetData);
    }
    return fleetsArray;
  } catch (error) {
    throw Error(error);
  }
};

const getFleetsVessels = async (id) => {
  try {
    const selectedFleet = await FleetRepository.getFleetById(id);
    const fleetsVessels = selectedFleet["vessels"];
    const allVessels = await vesselService.getAllVessels();
    let vesselsFullData = [];
    for (const fleetsVessel of fleetsVessels) {
      const neededVessel = allVessels.find(
        (generalVessel) => generalVessel["_id"] === fleetsVessel["_id"]
      );
      vesselsFullData.push(neededVessel);
    };
    vesselsFullData= vesselService.attachVesselsLocation(vesselsFullData);
    return vesselsFullData;
  } catch (error) {
    throw Error(error);
  }
};

const getVesselsByProperties = async (properties) => {
  try {
    const fleetId = properties["_id"];
    delete properties["_id"];
    const fleetsVessels = await getFleetsVessels(fleetId);
    let matchedVessel = filterVesselsByProperties(fleetsVessels, properties);
    matchedVessel= await vesselService.attachVesselsLocation(matchedVessel);
    console.log('xxxxx',matchedVessel);
    return matchedVessel;
  } catch (error) {
    throw Error(error);
  }
};

const filterVesselsByProperties = (vessels, properties) => {
  const keys = Object.keys(properties);

  for (const key of keys) {
    vessels = vessels.filter((vessel) => vessel[key] == properties[key]);
  }
  return vessels;
};

module.exports = { getGeneralData, getFleetsVessels, getVesselsByProperties };
