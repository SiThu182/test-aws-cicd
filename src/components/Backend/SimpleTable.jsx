import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { PageCard } from "../../Screens/Backend/PageStyle";

function SimpleTable(props) {
  const { headerArray, children } = props;

  return headerArray !== null && headerArray !== undefined ? (
    <TableContainer
      component={Paper}
      sx={{
        ...PageCard.mtTable,
        minHeight: "30vh",
      }}
    >
      <Table
        sx={{
          "& .MuiTableHead-root .MuiTableRow-head": {
            backgroundColor: "cyan",
            ...props.headerStyle,
            color: "white",
          },
        }}
      >
        <TableHead
          sx={{
            "& .MuiTableRow-head": {
              backgroundColor: "cyan",
              border: 0,
              m: 0,
            },
          }}
        >
          <TableRow>
            {headerArray.map((h) => (
              <TableCell key={h[0]} style={{ ...props.headerTextStyle }}>
                {h[1]}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Box>
      <CircularProgress></CircularProgress>
    </Box>
  );
}

export default SimpleTable;
