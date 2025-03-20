import React, { useState } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";

const TableC = ({ columns, data }) => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(5);

  // Filter data based on search
  const filteredData = data.filter((row) =>
    row.date.includes(search)
  );

  return (
    <Paper sx={{ padding: 2, overflow: "hidden", borderRadius: 3, margin: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        {/* Entries Selector */}
        <FormControl sx={{display : 'flex' ,minWidth: 120, flexDirection : 'row', gap :1, alignItems : 'center' }}>
          <Typography >Show </Typography>
          {/* <InputLabel>Show</InputLabel> */}
          <Select
            value={entries}
            onChange={(e) => setEntries(e.target.value)}
            size="small"
          >
            {[5, 10, 20].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Search Field */}
        <TextField
          label="Search Date"
          variant="outlined"
          size="small"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <MuiTable>
          {/* Table Head */}
          <TableHead sx={{ backgroundColor: "#1c0c3f" }}>
            <TableRow>
              {columns.map((head) => (
                <TableCell key={head} sx={{ color: "white", fontWeight: "bold" }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {filteredData.slice(0, entries).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white" }}>
                {columns.map((col, i) => (
                  <TableCell key={i}>{row[col.toLowerCase().replace(/\s/g, "")] || "-"}</TableCell>
                ))}
              </TableRow>
            ))}

            {/* Empty rows for styling */}
            {[...Array(entries - filteredData.length)].map((_, index) => (
              <TableRow key={index + filteredData.length + 1} sx={{ backgroundColor: "#f5f5f5" }}>
                {columns.map((_, i) => (
                  <TableCell key={i}>-</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Paper>
  );
};

export default TableC;