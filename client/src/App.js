import {Route,Switch } from "react-router-dom";
import FleetsTable from "./fleetsTable";
import SingleFleet from "./singleFleet";
export default function App() {

  return (
    <div className="App">
    <Switch>
    
    <Route path='/single' exact component={SingleFleet} />
    <Route path='/' exact component={FleetsTable} />
    </Switch>
    </div>
  );
}

