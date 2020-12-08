import { createContext, useEffect, useState } from "react";
import {Route,Switch } from "react-router-dom";
import FleetsTable from "./fleetsTable";
import SingleFleet from "./singleFleet";
import Axios from 'axios';
const context =createContext();
export default function App() {
  const [state, setState] = useState([]);
  useEffect(() => {
   
    const x = async()=>{
      const res= await Axios.get('http://localhost:80/fleet');
      console.log(res.data)
    }
    x()
  }, [])
  return (
    <div className="App">
    <Switch>
    
    {/* <Route path='/single' exact component={SingleFleet} />
    <Route path='/' exact component={FleetsTable} /> */}
    </Switch>
    </div>
  );
}

