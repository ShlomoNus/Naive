const path = require("path");
const fs = require("fs").promises;

const getAllFleets = async () => {
  const allFleets = await fs.readFile(
    path.join(__dirname, "..", "..", "assets/fleets.json"),
    { encoding: "utf-8" }
  );
  return JSON.parse(allFleets);
};

const getFleetById =(id)=>{
  const allFleets=   await getAllFleets();
  const selectedFleet= allFleets.find(fleet=> fleet._id == id  )
  return selectedFleet;
}


module.exports = { getAllFleets,getFleetById };
