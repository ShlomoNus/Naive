import { useEffect, useState } from "react";
import Axios from "axios";

import TableComp from "./tableComp";




export default function FleetsTable() {
  const headers=['name', 'vesselsCount']
  const [fleets, setFleets] = useState([]);

  useEffect(() => {
    const fleetsFromServer = async () =>{
      const res= await Axios.get('http://localhost:80/fleet');
     const {fleets}= res.data;
      setFleets(fleets);
    }
    fleetsFromServer();
  }, []);


  return (
    <div>
    {fleets? <TableComp headers={headers} rowsData={fleets} linkTo='/single' />:null }
    </div>
  );
}

