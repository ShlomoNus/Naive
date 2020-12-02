const FleetService = require("./service");
const getGeneralData = async (req, res) => {
  try {
    const fleets = await FleetService.getGeneralData();
    res.status(200).json({ fleets: fleets });
  } catch (error) {
    res.status(404).json({ error: error.massage });
  }
};

const getFleetVessels = async (req, res) => {
  try {
    const id = req.params.id;
    const vessels = await FleetService.getFleetsVessels(id);
    res.status(200).json({ vessels: vessels });
  } catch (error) {
    res.status(404).json({ error: error.massage });
  }
};

const getVesselByProperties = async (req, res) => {
  try {
    const properties = req.query;
    console.log(properties);
    const matchVessels = await FleetService.getVesselsByProperties(properties);
    res.status(200).json({ vessels: matchVessels });
  } catch (error) {
    res.status(404).json({ error: error.massage });
  }
};

module.exports = {
  getGeneralData,
  getFleetVessels,
  getVesselByProperties,
};
