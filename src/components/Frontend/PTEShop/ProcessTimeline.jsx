import { Box, Typography } from "@mui/material";
import React from "react";

function ProcessTimeline({ currentTimeline }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        padding: "2rem",
        pt: "5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Typography sx={{ position: "absolute", top: -60, left: "-40%" }}>
          Chart
        </Typography>
        <Box
          sx={{
            width: "1rem",
            height: "1rem",
            borderRadius: "50% ",
            backgroundColor: currentTimeline === "cart" ? "green" : "gray",
          }}
        ></Box>
      </Box>
      <Box
        sx={{ height: "2px", width: "20%", background: "black", mx: 2 }}
      ></Box>
      <Box sx={{ position: "relative" }}>
        <Typography sx={{ position: "absolute", top: -60, left: "-40%" }}>
          Order
        </Typography>
        <Box
          sx={{
            width: "1rem",
            height: "1rem",
            borderRadius: "50% ",
            backgroundColor: currentTimeline === "order" ? "green" : "gray",
          }}
        ></Box>
      </Box>
      <Box
        sx={{ height: "2px", width: "20%", background: "black", mx: 2 }}
      ></Box>
      <Box
        sx={{
          position: "relative",
          textWrap: {
            xs: "wrap",
            md: "nowrap",
          },
        }}
      >
        <Typography sx={{ position: "absolute", top: -60, left: "-40%" }}>
          Order Complete
        </Typography>
        <Box
          sx={{
            width: "1rem",
            height: "1rem",
            borderRadius: "50% ",
            backgroundColor: currentTimeline === "complete" ? "green" : "gray",
          }}
        ></Box>
      </Box>
    </Box>
  );
}

export default ProcessTimeline;
