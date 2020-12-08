import { useContext } from "react";
import { fleetContext } from "./App";
import TableComp from "./tableComp";

export default function FleetsTable() {
  const headers=['name', 'vesselsCount']

  const fleetsData = useContext(fleetContext)
  console.log(fleetsData.fleets);

  return (
    <div>
     <TableComp headers={headers} rowsData={fleetsData.fleets} linkTo='/single' />
    </div>
  );
}

