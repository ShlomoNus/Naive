const FleetRepository = require("./repository");
const vesselService = require("../vessel/service");

const getGeneralData = async () => {
  try {
    const data = await FleetRepository.getAllFleets();
    const fleetsArray = [];
    for (const fleet of data) {
      const fleetData = {
        name: fleet["name"],
        length: fleet["vessels"].length,
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
    const vesselsFullData = [];
    for (const fleetsVessel of fleetsVessels) {
      const neededVessel = allVessels.find(
        (generalVessel) => generalVessel["_id"] === fleetsVessel["_id"]
      );
      vesselsFullData.push(neededVessel);
    }
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
    const matchedVessel = filterVesselsByProperties(fleetsVessels, properties);
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
