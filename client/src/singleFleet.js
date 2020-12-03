import { useEffect, useState } from "react";
import Axios from "axios";
import TableComp from "./tableComp";
import { Button, TextField } from "@material-ui/core";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useLocation } from "react-router-dom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default function SingleFleet() {
  //router-location
  const location = useLocation();

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
    latitude: 29.11272239685059,
    longitude: 36.62507247924805,
    width: "90%",
    height: "100vh",
    zoom: 5,
  });
  //ref

  // fetching data
  useEffect(() => {
    const getVessels = async () => {
      const _id = location.state["_id"];
      const vessels = await Axios.get(`http://localhost:80/fleet/${_id}`);
      setVessels(vessels.data["vessels"]);
      createLocation(vessels.data["vessels"]);
    };
    getVessels();
  }, []);

  const updateFilter = (filterName, value) => {
    setFilter({ ...filter, [filterName]: value });
  };
  const createLocation = (vessels) => {
      if(!vessels) return;
    const locations = [];
    for (const vessel of vessels) {
      const location = {};

      location["_id"] = vessel["_id"];
      location["name"] = vessel["name"];
      location["flag"] = vessel["flag"];
      location["mmsi"] = vessel["name"];
      location["ts"] = vessel["location"]["ts"];
      location["latitude"] = vessel["location"]["coordinates"]["lat"];
      location["longitude"] = vessel["location"]["coordinates"]["lon"];
      locations.push(location);
    }
    setLocations(locations);
    const latitude = locations[0]["latitude"];
    const longitude = locations[0]["longitude"];
    setViewport({ ...viewport, latitude, longitude });
  };
  const filterVessels = async () => {
    if (Object.is(defaultFilter, filter)) return;
    const jsonBody = {};
    jsonBody["_id"] = location.state["_id"];
    for (const key in filter) {
        if(filter[key]) jsonBody[key] = filter[key]
    }
    setFilter(defaultFilter);
    const response = await Axios.get("http://localhost:80/fleet/vessels", {
      params: jsonBody,
    });
    const vessels = response["data"]["vessels"];
    setVessels(vessels);
    if(Array.isArray(vessels))return;
    createLocation(vessels);
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
          style={{marginTop:'10px',marginLeft:'10px'}}
          onClick={() => {
            filterVessels();
          }}
        >
          Filter
        </Button>
      </form>
      <TableComp headers={headers} rowsData={vessels} />
      <div className="mapContainer">
        <ReactMapGL
          mapStyle="mapbox://styles/shlomon/cki7y1r61b03f19oyca7zfwof"
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
          {...viewport}
          mapboxApiAccessToken={
            process.env.REACT_APP_TOKEN
          }
        >
          {locations.map((location) => (
            <Marker
              key={location._id}
              latitude={location.latitude}
              longitude={location.longitude}
            >
              {
                <DirectionsBoatIcon
                  onClick={() => {
                    const copy= location;
                    delete copy._id
                    setSelectedLocation(copy);
                  }}
                  style={{ color: "#fff", cursor: "pointer" }}
                />
              }
            </Marker>
          ))}
          {selectedLocation ? (
            <ClickAwayListener onClickAway={() =>setSelectedLocation(null)} >
              <Popup
               
                latitude={selectedLocation.latitude}
                longitude={selectedLocation.longitude}
              >
                {Object.entries(selectedLocation).map((pair) => (
                  <div>
                    {pair[0]} : {pair[1]}
                  </div>
                ))}
              </Popup>
            </ClickAwayListener>
          ) : null}
        </ReactMapGL>
      </div>
    </div>
  );
}
