import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCountry } from "../../../redux/slice/UserSlice";

function CountryDialog() {
  const frontendURL = process.env.REACT_APP_FRONTEND_URL;
  const dispatch = useDispatch();

  const { country } = useSelector((state) => state.user);
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    let localCountry = localStorage.getItem("country");
    if ((country === null || country === undefined) && localCountry === null) {
      setDialogOpen(true);
    }
    if (country === null || country === undefined || localCountry !== null) {
      dispatch(setCountry(localCountry));
    }
  }, [dispatch, country]);

  const handleClose = (chooseCountry) => {
    dispatch(setCountry(chooseCountry));
    localStorage.setItem("country", chooseCountry);
    setDialogOpen(false);
  };

  return (
    <Dialog
      open={dialogOpen}
      sx={{
        backdropFilter: "blur(5px)",
        p: 2,
      }}
    >
      <Box
        sx={{
          mx: "auto",
          p: 2,
        }}
      >
        <img
          src={frontendURL + "/Image/AigmaLogo.png"}
          style={{ width: "8rem" }}
          alt="aigma_logo"
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "#041E42",
          borderRadius: "2rem",
          boxShadow: 2,
          m: 2,
          color: "white",
        }}
      >
        <DialogTitle>Please Choose?</DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ color: "white" }}>
            Choosing country is crucial for payment related processes
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mx: "auto",
          }}
        >
          <Button variant="contained" onClick={() => handleClose("Myanmar")}>
            Myanmar
          </Button>
          <Button
            variant="contained"
            onClick={() => handleClose("International")}
          >
            International
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default CountryDialog;
