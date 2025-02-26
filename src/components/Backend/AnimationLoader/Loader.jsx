import { Box } from "@mui/material";
import React from "react";

function Loader() {
  return (
    <div
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
      }}
    >
      <Box
        sx={{
          borderRadius: "50%",
          width: "3rem",
          height: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            "radial-gradient(circle, cyan 5%, white 30%, yellow 65%)",

          "@keyframes width-increase": {
            "0%": {
              width: "2rem",
              height: "2rem",

              backgroundColor: "red",
              transform: "rotate(0deg)",
            },
            "50%": {
              width: "8rem",
              height: "8rem",

              borderRadius: "50%",
              transform: "rotate(360deg)",
              backgroundColor: "yellow",
            },
            "100%": {
              width: "2rem",
              height: "2rem",

              transform: "rotate(0deg)",
              backgroundColor: "#4dabf5",
            },
          },
          animation: "1s width-increase ease infinite",
        }}
      >
        <img
          src={process.env.REACT_APP_FRONTEND_URL + "Image/AigmaLogo.png"}
          style={{ width: "100%" }}
          alt="pte_loading"
        />
      </Box>
    </div>
  );
}

export default Loader;
