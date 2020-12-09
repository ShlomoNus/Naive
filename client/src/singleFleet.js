import { useEffect, useState } from "react";
import Axios from "axios";
import TableComp from "./tableComp";
import { Button, TextField } from "@material-ui/core";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useParams } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

export default function SingleFleet() {
  //router-params
  const params = useParams();

  //default states
  const defaultFilter = { name: "", flag: "", mmsi: "" };
  const [filter, setFilter] = useState(defaultFilter);
  //states
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const headers = [
    "name",
    "mmsi",
    "imo",
    "flag",
    "vessel_class",
    "size",
    "number_of_blips",
  ];
  const [vessels, setVessels] = useState([]);
  const [viewport, setViewport] = useState({
  
    width: "90%",
    height: "100vh",
    zoom: 5,
  });
  //ref

  // fetching data
  useEffect(() => {
    const getVessels = async () => {
      const _id = params.id;
      const vessels = await Axios.get(`http://localhost:80/fleet/${_id}`);
      setVessels(vessels.data["vessels"]);
    };
    getVessels();
  }, []);

  useEffect(() => {
    createLocation(vessels);
  }, [vessels]);

  const updateFilter = (filterName, value) => {
    setFilter({ ...filter, [filterName]: value.trim() });
  };
  const createLocation = (vessels) => {
    if (!vessels || vessels.length === 0) {
      setLocations([]);
      return;
    }
    const locations = [];
    for (const vessel of vessels) {
      const location = (({name,flag,mmsi}) => ({ name,flag,mmsi }))(vessel)
       location['longitude'] = vessel['location'][0];
       location ['latitude'] = vessel['location'][1];
      locations.push(location);
    }
    setLocations(locations);
    const longitude= locations[0]['longitude']
    const latitude= locations[0]['latitude']
    setViewport({ ...viewport, longitude,latitude });
  };
  const filterVessels = async () => {
    if (Object.is(defaultFilter, filter)) return;
    const jsonBody = {};
    for (const key in filter) {
      if (filter[key]) jsonBody[key] = filter[key];
    }
    const response = await Axios.get(`http://localhost:80/fleet/filter/${params.id}`, {
      params: jsonBody,
    });
    console.log();
    const vessels = response["data"]["vessels"];
    setVessels(vessels);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form>
        <TextField
          onChange={(e) => updateFilter("name", e.target.value)}
          value={filter.name}
          id="standard-basic"
          label="Name"
        />
        <TextField
          onChange={(e) => updateFilter("flag", e.target.value)}
          value={filter.flag}
          id="standard-basic"
          label="Flag"
        />
        <TextField
          onChange={(e) => updateFilter("mmsi", e.target.value)}
          value={filter.mmsi}
          id="standard-basic"
          label="MMSI"
        />
        <Button
          variant="contained"
          style={{ marginTop: "10px", marginLeft: "10px" }}
          onClick={() => {
            filterVessels();
          }}
        >
          Filter
        </Button>
      </form>
      <TableComp headers={headers} rowsData={vessels} />
      <div className="mapContainer">
     {  locations? <ReactMapGL
          mapStyle="mapbox://styles/shlomon/cki7y1r61b03f19oyca7zfwof"
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
        >
          {locations.map((location) => (
            <Marker
              key={location._id}
              longitude={location['longitude']}
              latitude={location['latitude']}
            >
              {
                <DirectionsBoatIcon
                  onClick={() => {
                    setSelectedLocation(location);
                  }}
                  style={{ color: "#fff", cursor: "pointer" }}
                />
              }
            </Marker>
          ))}
          {selectedLocation ? (
            <ClickAwayListener onClickAway={() => setSelectedLocation(null)}>
              <Popup
                longitude={selectedLocation['longitude']}
                latitude={selectedLocation['latitude']}
              >
                {Object.entries(selectedLocation).map((pair) => (
                  <div>
                    {pair[0]} : {pair[1]}
                  </div>
                ))}
              </Popup>
            </ClickAwayListener>
          ) : null}
        </ReactMapGL> : null}
      </div>
    </div>
  );
}
