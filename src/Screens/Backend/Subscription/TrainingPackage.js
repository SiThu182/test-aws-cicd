import { Box, Typography } from "@mui/material";
import React from "react";
import Training from "../../../components/Frontend/Home/offer&Subscription/TrainingPackage";
import "./trainingWidthStyle.css";
import Currency from "../../../components/Backend/Currency";
function TrainingPackage() {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Currency />
      </Box>
      <Box
        sx={{
          ml: "2rem",
          top: "1rem",
          position: "absolute",
          overflow: "visible",
          zIndex: 1500,
        }}
      >
        <Typography variant="h5">Training Package</Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Training containerClass="carousel-container-backend" />
      </Box>
    </Box>
  );
}

export default TrainingPackage;
