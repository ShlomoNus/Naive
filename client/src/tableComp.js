import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
const useStyle = makeStyles({
  compRoot: {
    padding: "5%",
    display: "flex",
    justifyContent: "center",
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
  const classNames = {selected:' selected',desc:' desc selected'
      }
  const [rowData,setRowData]=useState([]);
  const [sortProps,setSortProps]=useState({headerName:'', order:1});
  const headersCells = () =>
    headers.map((header, index) => (
      <TableCell className='headerCell'  key={index} >
        {header}<ArrowUpwardIcon onClick={() =>{sortColumn(header) }} className={`arrow${sortProps.headerName!==header?'': sortProps.order === -1?classNames.desc :classNames.selected}`} />
      </TableCell>
    ));
    useEffect(() =>{
      setRowData(rowsData)
    },[rowsData])

    useEffect( () =>{
      let sortedRowData = [...rowData].sort(comparator) ;
      setRowData(sortedRowData);
    },[sortProps])

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
      <Link className={classes.link} to={`${linkTo}/${row['_id']}`}>{firstCell}</Link>
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
  }
  return (
    <div className={classes.compRoot}>
      <Paper className={classes.paper}>
        <TableContainer style={{cursor:'default'}}>
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
