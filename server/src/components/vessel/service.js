const vesselRepository = require("./repository");

const getAllVessels = async () => {
  try {
    const allVessels = await vesselRepository.getAll();
  return allVessels;
  } catch (error) {
    throw Error(error);

  }
};
const filterLocation = (location)=>{
  const {lastpos} =location;
  const lat=lastpos['geometry']['coordinates'][1]; 
  const lon=lastpos['geometry']['coordinates'][0];
  const filteredLocation =  {ts:lastpos['ts'],coordinates:{lat,lon}}
  return filteredLocation;
}
 const attachVesselsLocation = async(vessels)=>{
  const locations =  await vesselRepository.getAllVesselLocation();
  for (const vessel of vessels) {
    const  location =  locations.find(location => location['_id'] == vessel['_id']);
    if(location) vessel['location']=filterLocation(location);
  }
  return vessels
 } 

module.exports = { getAllVessels,attachVesselsLocation,filterLocation };
