import React from "react";
import { Typography, CircularProgress } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function TableListLoadingComponent() {
  return (
    <TableRow>
      <TableCell colSpan="12" height="60vh">
        <Typography
          variant="h5"
          textAlign="center"
          sx={{ py: "20vh", color: "red" }}
        >
          <CircularProgress />
        </Typography>
      </TableCell>
    </TableRow>
  );
}

export default TableListLoadingComponent;
