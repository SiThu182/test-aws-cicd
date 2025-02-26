import { Box, Tooltip } from "@mui/material";
import React from "react";

function FormatErrorLine() {
  return (
    <Tooltip title="Format Error: Double space">
      <Box
        sx={{
          width: "1rem",
          borderBottom: "1px solid red",
          height: "1rem",
          display: "inline-block",
        }}
      ></Box>
    </Tooltip>
  );
}

export default FormatErrorLine;
