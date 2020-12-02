const vesselRepository = require("./repository");

const getAllVessels = async () => {
  try {
    const allVessels = await vesselRepository.getAll();
  return allVessels;
  } catch (error) {
    throw Error(error);

  }
};
 const attachVesselsLocation = async(vessels)=>{
  const locations =  await vesselRepository.getAllVesselLocation();
  for (const vessel of vessels) {
    const  location =  locations.find(location => location['_id'] == vessel['_id']);
    if(location) vessel['location']=location;
  }
  return vessels
 } 

module.exports = { getAllVessels,attachVesselsLocation };
