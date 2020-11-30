const FleetRepository = require("./repository");
const vesselService = require('../vessel/service');



const getGeneralData = async () => {
  try {
    const data = await FleetRepository.getAllFleets();
    const fleetsArray = [];
    for (const fleet of data) {
      const fleetData = {
        name: fleet["name"],
        length: fleet["vessels"].length,
      }
      fleetsArray.push(fleetData);
    }
    return fleetsArray;

  } catch (error) {
    throw Error(error);
  }
};

const getFleetsVessels= async (id) =>{
  const selectedFleet= await  FleetRepository.getFleetById(id);
  const fleetsVessels=  selectedFleet['vessels'];
  const allVessels=vesselService.getAllVessels();
  const vesselsFullData=[];
  for (const fleetsVessel of fleetsVessels) {
     const neededVessel= allVessels.find( generalVessel => generalVessel['_id'] === fleetsVessel['_id'] ) ;    
      vesselsFullData.push(neededVessel);
    }

    return vesselsFullData;
}

const getVesselByProperties = async (params) =>{
  const fleetId= params['id'];
  delete params['id'];
  const fleetsVessels =await getFleetsVessels(fleetId);
  
  const matchedVessel = filterVesselByProperties(fleetsVessels,fleetId);
  return matchedVessel;
}

const filterVesselByProperties=(vessels,param)=>{
  const keys = Object.keys(param);
  
  for (const key of keys) {
  vessels=  vessels.filter( vessel => vessel[key] === param[key]  );
  }
  return vessels
}

module.exports = { getGeneralData,getFleetsVessels,getVesselByProperties };
