const FleetService = require("./service");
const getGeneralData = async (req,res) => {
    const fleets = await FleetService.getGeneralData();
    res.status(200).json({fleets:fleets})
};

const getFleetVessels=(req,res) =>{
  const id = req.params.id;
  const vessels= await FleetService.getFleetsVessels(id);
  res.status(200).json({vessels:vessels})
}

const getVesselByProperties = async(req,res) =>{
  const {params} = req;
  const matchVessels = await FleetService.getVesselByProperties(params);
  res.status(200).json({vessels: matchVessels})

}
module.exports = {
  getGeneralData,
  getFleetVessels
};
