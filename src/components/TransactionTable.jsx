import React, { useState } from "react";
import {
  Table,
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
} from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";

const transactions = [
  { id: 1, date: "10-01-2025", time: "12:34:12", amount: "124 USDT" },
  { id: 2, date: "17-01-2025", time: "20:19:43", amount: "82 USDT" },
  { id: 3, date: "25-01-2025", time: "11:43:56", amount: "188 USDT" },
  { id: 4, date: "03-02-2025", time: "17:29:01", amount: "145 USDT" },
  { id: 5, date: "15-02-2025", time: "23:12:27", amount: "102 USDT" }
];

const TransactionTable = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  const filteredData = transactions.filter((row) =>
    row.date.includes(search)
  );

  return (
    <Paper sx={{ padding: 2, overflow: "hidden", borderRadius: 3, margin: '2rem' }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Show</InputLabel>
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

        <TextField
          label="Search Date"
          variant="outlined"
          size="small"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1c0c3f" }}>
            <TableRow>
              {["Sr. No.", "Date", "Time", "Received Amount"].map((head) => (
                <TableCell key={head} sx={{ color: "white", fontWeight: "bold" }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(0, entries).map((row) => (
              <TableRow key={row.id} sx={{ backgroundColor: row.id % 2 === 0 ? "#f5f5f5" : "white" }}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            ))}
            {[...Array(entries - filteredData.length)].map((_, index) => (
              <TableRow key={index + filteredData.length + 1} sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TransactionTable;