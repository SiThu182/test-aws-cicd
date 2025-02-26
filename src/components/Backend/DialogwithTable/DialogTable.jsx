import {
  Box,
  ButtonBase,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";

import { DialogStyle } from "./DialogStyle";

function DialogTable(props) {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        sx={{ zIndex: "3000", backdropFilter: "blur(5px)" }}
        maxWidth={"md"}
        open={props.open}
        onClose={handleClose}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle>{props.title} Practice Scores</DialogTitle>

          <DialogActions>
            <ButtonBase onClick={handleClose}>
              <CancelIcon></CancelIcon>
            </ButtonBase>
          </DialogActions>
        </Box>
        {props.status === "succeeded" && props.score === "0" && (
          <Typography sx={{ m: 2 }}>No score yet...</Typography>
        )}
        {props.status === "loading" && (
          <TableRow>
            <TableCell>
              <CircularProgress></CircularProgress>
            </TableCell>
          </TableRow>
        )}

        {props.status === "failed" && (
          <Typography sx={{ m: 2 }}>Failed to fetch score ....</Typography>
        )}
        {props.status === "succeeded" && props.score !== "0" && (
          <Box sx={{ width: "80%", mt: "2rem", mx: "auto", mb: 2 }}>
            <TableContainer
              component={Paper}
              sx={{
                ...DialogStyle.table,
              }}
            >
              <Table>
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
                    },
                  }}
                >
                  <TableRow>
                    <TableCell>User Name</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Content</TableCell>
                    <TableCell>Overall Point</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.status === "succeeded" &&
                    props.score !== "0" &&
                    props.score !== "" &&
                    props.score?.map((s, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ width: "25%" }}>{index + 1}</TableCell>
                        <TableCell sx={{ width: "25%" }}>
                          {s.category}
                        </TableCell>
                        <TableCell sx={{ width: "25%" }}>
                          {s.post_title}
                        </TableCell>
                        <TableCell sx={{ width: "25%" }}>
                          {s.overall_point}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Dialog>
    </>
  );
}

export default DialogTable;
