import React from "react";
import { Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function TableListFailedComponent() {
  return (
    <TableRow>
      <TableCell colSpan="12" height="60vh">
        <Typography
          variant="h5"
          textAlign="center"
          sx={{ py: "20vh", color: "red" }}
        >
          Fail to fetch data
        </Typography>
      </TableCell>
    </TableRow>
  );
}

export default TableListFailedComponent;
