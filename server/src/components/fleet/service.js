const FleetRepository = require("./repository");
const vesselService = require("../vessel/service");

const getGeneralFleetsInfo = async () => {
  try {
    const generalInfo = await FleetRepository.getGeneralFleetsInfo();
    return generalInfo;
  } catch (error) {
    throw Error(error);
  }
};

const getFleetsVessels = async (id) => {
  try {
    const vesselsData = await FleetRepository.getFleetVesselsByID(id);
   return vesselsData;  
  } catch (error) {
    const selectedFleet = await FleetRepository.getFleetById(id);
    const fleetsVessels = selectedFleet["vessels"];
    const allVessels = await vesselService.getAllVessels();
    let vesselsFullData = [];
    for (const fleetsVessel of fleetsVessels) {
      const neededVessel = allVessels.find(
        (generalVessel) => generalVessel["_id"] === fleetsVessel["_id"]
      );
      vesselsFullData.push(neededVessel);
    }
    vesselsFullData = vesselService.attachVesselsLocation(vesselsFullData);
   const fleet= {'_id':id,'vessels':vesselsFullData}
    return fleet;
  }
};

const getVesselsByProperties = async (properties) => {
  try {
    const fleetId = properties["_id"];
    delete properties["_id"];
    const fleetsVessels = await getFleetsVessels(fleetId);
    let matchedVessel = filterVesselsByProperties(fleetsVessels, properties);
    matchedVessel = await vesselService.attachVesselsLocation(matchedVessel);
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

module.exports = {
  getGeneralFleetsInfo,
  getFleetsVessels,
  getVesselsByProperties,
};
