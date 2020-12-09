const fleetRepository = require("./repository");

const generalInfo = [];

const vesselsByFleetBeta = {};

const vesselsByFleet = {};

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
      const _id = fleet["_id"];
      vesselsByFleetBeta[_id]= vessels
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
    _id,
    mmsi,
    imo,
    flag,
    vessel_class,
    size,
    number_of_blips,
  }) => ({ name,_id, mmsi, imo, flag, vessel_class, size, number_of_blips }))(
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
  if (vesselsByFleet[id]) return vesselsByFleet[id];
  
  const fleetVessels = vesselsByFleetBeta[id];
  const vesselsList = [];
  for (const vesselId of fleetVessels) {
    const vesselFullData = await getVesselFullData(vesselId);
    const location = await getVesselLocation(vesselId);
    vesselFullData["location"] = location;
    vesselsList.push(vesselFullData);
  }
  vesselsByFleet[id] = vesselsList;
  return vesselsList;
};

const getVesselsByProperties =  (id, properties) => {
  try {
    let vessels=  vesselsByFleet[id]
    const keys = Object.keys(properties);
    for (const key of keys) {
      vessels = vessels.filter(vessel => {
        return vessel[key] == properties[key]});
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
