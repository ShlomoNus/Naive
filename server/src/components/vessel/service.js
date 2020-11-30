const vesselRepository = require("./repository");

const getAllVessels = async () => {
  const allVessels = await vesselRepository.getAll();
  return allVessels;
};

module.exports = { getAllVessels };
