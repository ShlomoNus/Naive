const fleetRepository = require("./repository");
const vesselService = require("../vessel/service");

const generalInfo = [];

const vesselsByFleetBeta = new Map();

const vesselsByFleet = new Map();

const getGeneralFleetsInfo = async () => {
  try {
    if (generalInfo.length > 0) return generalInfo;
    const fleets = await fleetRepository.getFleets();
    for (const fleet of fleets) {
      const fleetData = {
        name: fleet["name"],
        vesselsCount: fleet["vessels"].length,
        _id: fleet["_id"],
      };
      generalInfo.push(fleetData);
      const vessels = [];
      for (const vessel of fleet["vessels"]) {
        vessels.push(vessel["_id"]);
      }
      vesselsByFleetBeta.set(fleet["_id"], vessels);
    }
    return generalInfo;
  } catch (error) {
    throw Error(error);
  }
};
const getVesselFullData = async (id) => {
  const allVessels = await fleetRepository.getAllVessels();
  const vesselFullData = allVessels.find((v) => v["_id"] == id);
  const picked = (({
    name,
    mmsi,
    imo,
    flag,
    vessel_class,
    size,
    number_of_blips,
  }) => ({ name, mmsi, imo, flag, vessel_class, size, number_of_blips }))(
    vesselFullData
  );
  return picked;
};
const getVesselLocation = async (id) => {
  const allLocations = await fleetRepository.getAllVesselLocation();
  const location = allLocations.find((l) => l["_id"] == id);
  return location["lastpos"]["geometry"]["coordinates"];
};
const getFleetsVessels = async (id) => {
  if (vesselsByFleet.get(id)) return vesselsByFleet.get(id);
  const fleetVessels = vesselsByFleetBeta.get(id);
  const vesselsList = [];
  for (const vesselId of fleetVessels) {
    const vesselFullData = await getVesselFullData(vesselId);
    const location = await getVesselLocation(vesselId);
    vesselFullData["location"] = location;
    vesselsList.push(vesselFullData);
  }
  vesselsByFleet.set([id, vesselsList]);
  return vesselsList;
};

const getVesselsByProperties = async (id, properties) => {
  try {
    let vessels = [...vesselsByFleet(id)];
    const keys = Object.keys(properties);
    for (const key of keys) {
      vessels = vessels.filter(vessel => vessel[key] == properties[key]);
    }
    return vessels;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  getGeneralFleetsInfo,
  getFleetsVessels,
  getVesselsByProperties,
};
