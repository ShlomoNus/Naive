import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyle = makeStyles({
  compRoot: {
    padding: "5%",
    display: "flex",
    justifyContent: "center",
  },
  paper: {
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export default function TableComp({ headers, rowsData, linkTo=null }) {
  
  const classes = useStyle();
  const [rowData,setRowData]=useState(rowsData);
  const [sortProps,setSortProps]=useState({headerName:'', order:1});
  const headersCells = () =>
    headers.map((header, index) => (
      <TableCell key={index} >
        {header}
      </TableCell>
    ));

  const createCells = () => {
    const generatedCells = [];
    for (const row of rowData) {
      let cells = headers.map((header, index) => (
        <TableCell  key={index}> {row[header]}</TableCell>
      ));
      if (linkTo) {
        cells = linkCells(cells, row);
      }
      generatedCells.push(cells);
    }
    return generatedCells;
  };
  const linkCells = (cells, row) => {
    const firstCell = cells.shift();
    const wrappedCell = (
      <Link to={{ pathname: linkTo, state: row }}>{firstCell}</Link>
    );
    cells.unshift(wrappedCell);
    return cells;
  };
  const renderRows = () => {
    const cellsLines = createCells();
    const rows = [];
    let index = 0
    for (const line of cellsLines) {
      rows.push(<TableRow key={index}> {line}</TableRow>);
      index++
    }
    return rows;
  };

  const comparatorData=(header)=>{
    header==sortProps.headerName? setSortProps({...sortProps,order:sortProps.order * -1}) : setSortProps({headerName:header,order:1});
  }
  const comparator= (a,b) =>{
    if(a[sortProps.headerName]<b[sortProps.headerName]){
      return -1 *sortProps.order
    }
    if(a[sortProps.headerName]>b[sortProps.headerName]){
      return 1 *sortProps.order
    }
    return 0;
  }

  const sortColumn =(header) =>{
    comparatorData(header);
    let sortedRowData = rowData.sort(comparator) ;
    setRowData(sortedRowData);
  }
  return (
    <div className={classes.compRoot}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>{headersCells()}</TableRow>
            </TableHead>
            <TableBody>
            {renderRows()}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
