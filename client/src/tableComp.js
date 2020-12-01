import React from "react";
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
    width: "50%",
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
  
  const headersCells = () =>
    headers.map((header, index) => (
      <TableCell key={index} >
        {header}
      </TableCell>
    ));

  const createCells = () => {
    const generatedCells = [];
    for (const row of rowsData) {
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
    for (const line of cellsLines) {
      rows.push(<TableRow> {line}</TableRow>);
    }
    return rows;
  };
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
