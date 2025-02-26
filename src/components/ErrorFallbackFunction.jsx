import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import React from "react";

import { useEffect } from "react";
import { colorCode } from "./Colors/ReusableColorCode";
import ReloadOrBackCard from "./ReloadOrBackCard";

export function MtErrorFallbackFunction(props) {
  const { setError } = props;

  useEffect(() => {
    setError(true);
  }, [setError]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "2rem",
          p: 2,
          boxShadow: 4,
        }}
      >
        <Box sx={{ mx: "auto", textAlign: "center" }}>
          <i
            className="fa-solid fa-triangle-exclamation fa-beat-fade fa-2xl"
            style={{ color: "#f1ff33" }}
          ></i>
        </Box>
        <Typography sx={{ my: 2 }}>
          Unfortunately , we have run into problem.But rest assure we save your
          progress.Please press button to resume test .
        </Typography>
        <Box>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Start from save progress
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export function AppFallbackFunction() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: colorCode.homeFrontColor.lightBlue,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: "65%",
          borderRadius: "1rem",
          boxShadow: 2,
        }}
      >
        <ReloadOrBackCard
          header={"Something went wrong . You can choose to reload or back "}
        />
      </Box>
    </Box>
  );
}
