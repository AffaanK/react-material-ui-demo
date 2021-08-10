import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function createData(title, email, description, range, valid) {
  return { title, email, description, range, valid};
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function DataList({dataList}) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Range</TableCell>
            <TableCell align="right">Valid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.map((row) => (
            row.valid=='yes'?
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.range}</TableCell>
              <TableCell align="right">{row.valid}</TableCell>
            </TableRow>
            :null
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
