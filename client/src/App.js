import { createContext, useEffect, useState } from "react";
import {Route,Switch } from "react-router-dom";
import FleetsTable from "./fleetsTable";
import SingleFleet from "./singleFleet";
import Axios from 'axios';
export const fleetContext =createContext();
export default function App() {
  const [state, setState] = useState([]);
  useEffect(() => {
   
    const setContextData = async()=>{
      const res= await Axios.get('http://localhost:80/fleet');
      setState(res.data)
    }
    setContextData()
  }, [])
  return (
    <fleetContext.Provider value={state}>

    <div className="App">
    <Switch>
    
    <Route path='/single/:id' exact component={SingleFleet} />
    <Route path='/' exact component={FleetsTable} /> 
    </Switch>
    </div>
    </fleetContext.Provider>
  );
}

