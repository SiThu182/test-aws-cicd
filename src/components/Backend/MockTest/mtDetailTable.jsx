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

import { DialogStyle } from "../DialogwithTable/DialogStyle";

function MtDetailTable(props) {
 
  return (
    <>
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "80%",
          },
          mt: "2rem",
          mx: "auto",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            ...DialogStyle.table,
          }}
        >
          <Table
            sx={{
              "& .MuiTableBody-root>tr:nth-of-type(even)": {
                backgroundColor: "whitesmoke",
                boxShadow: 0,
              },
            }}
          >
            <TableHead
              sx={{
                "& .MuiTableRow-head": {
                  backgroundColor:
                    props.title === "Speaking"
                      ? "red"
                      : props.title === "Writing"
                      ? "yellow"
                      : props.title === "Reading"
                      ? "yellowgreen"
                      : "cyan",
                  border: 0,
                  m: 0,
                  fontSize: "1.5rem",
                  "& .header": {},
                },
              }}
            >
              <TableRow className="header">
                <TableCell
                  sx={{
                    fontSize: "1.2rem",
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}
                >
                  No.
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1.2rem",
                    },
                  }}
                >
                  {" "}
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1.2rem",
                    },
                  }}
                >
                  Category
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1.2rem",
                    },
                  }}
                >
                  Score
                </TableCell>
                {/* <TableCell>Overall Point</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.score !== 0 && props.score !== undefined ? (
                props.score.map((s, i) =>
                  s.posts.split(",").map((p, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        borderBottom:
                          index === s.posts.split(",").length - 1
                            ? "dashed red 2px"
                            : "",
                      }}
                    >
                      <TableCell
                        sx={{
                          width: "25%",
                          display: {
                            xs: "none",
                            md: "block",
                          },
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ width: "25%" }}>
                        {props.title === "Speaking" && s.post_data !== undefined
                          ? s.post_data.map((t) =>
                              t.id === parseInt(p) ? t.title : ""
                            )
                          : props.title !== "Speaking" &&
                            s.post_data !== undefined
                          ? s.post_data.map((t) =>
                              t.id === parseInt(p) ? t.title : ""
                            )
                          : "no"}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "25%",
                        }}
                      >
                        {s.category}
                      </TableCell>
                      <TableCell sx={{ width: "25%" }}>
                        {/* {props.title === "Speaking" && s.scores.includes("[") 
                          ? JSON.parse(s.scores)[index]
                        
                          :  s.scores[index]!==undefined
                          ? s.scores.split(",")[index]
                          : "nothing"} */}
                        {s.scores[index] !== undefined
                          ? s.scores.split(",")[index]
                          : "nothing"}
                      </TableCell>
                    </TableRow>
                  ))
                )
              ) : (
                <TableRow>
                  <TableCell>
                    <CircularProgress></CircularProgress>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default MtDetailTable;
