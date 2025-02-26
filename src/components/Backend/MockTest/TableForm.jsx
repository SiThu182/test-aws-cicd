import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function TableForm(props) {
  return (
    <>
      <Box
        className="container-fluid "
        sx={{
          m: "0 auto",
          minWidth: "55vw",
          boxShadow: 5,
          overflowX: "auto",
        }}
      >
        <div className="row ">
          <div className="col-md-10 ">
            <Box className="card">
              <TableContainer
                component={Paper}
                sx={{
                  minHeight: "55vh",
                  // height: "73vh",
                  boxShadow: 5,
                  "& .MuiTable-root": {
                    overflowX: "auto",
                  },
                }}
              >
                <Table
                  aria-label="simple table"
                  sx={{
                    border: "0.5px solid black",

                    "& .MuiTableHead-root": {
                      zIndex: 2,
                    },
                    "& .MuiTableRow-root": {
                      height: "30px",
                      "& .MuiTableCell-head": {
                        color: "whitesmoke",
                      },
                    },
                  }}
                >
                  <TableHead
                    sx={{
                      width: "100%",
                      bgcolor: "#2196f3",
                      zIndex: 3,
                      position: "sticky",
                      top: 0,
                    }}
                    style={{ height: "1rem", padding: 0 }}
                  >
                    <TableRow width="100%">
                      <TableCell width="20%">
                        <Typography
                          variant="body5"
                          sx={{ textAlign: "center" }}
                        >
                          Post ID
                        </Typography>
                      </TableCell>
                      <TableCell width="20%">
                        <Typography
                          variant="body5"
                          sx={{ textAlign: "center" }}
                        >
                          Title
                        </Typography>
                      </TableCell>
                      <TableCell width="30%">
                        <Typography
                          variant="body5"
                          sx={{ textAlign: "center" }}
                        >
                          Content
                        </Typography>
                      </TableCell>
                      <TableCell width="30%">
                        <Typography
                          variant="body5"
                          sx={{ textAlign: "center" }}
                        >
                          Post Active Status
                        </Typography>
                      </TableCell>
                      <TableCell width="30%">
                        <Typography
                          variant="body5"
                          sx={{ textAlign: "center" }}
                        >
                          Exist in other Mock test
                        </Typography>
                      </TableCell>
                      <TableCell width="20%">
                        <Typography
                          variant="body5"
                          sx={{ textAlign: "center" }}
                        >
                          Check
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{props.postHtmlTable}</TableBody>
                </Table>
              </TableContainer>
            </Box>
          </div>
        </div>
      </Box>
    </>
  );
}

export default TableForm;
