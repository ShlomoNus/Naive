const vesselRepository = require("./repository");

const getAllVessels = async () => {
  try {
    const allVessels = await vesselRepository.getAll();
  return allVessels;
  } catch (error) {
    throw Error(error);

  }
};

module.exports = { getAllVessels };
