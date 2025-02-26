import { Box, Typography } from "@mui/material";
import React from "react";

function PageNavTitle(props) {
  const { text } = props;
  const styles = {
    ml: "1.5rem",
    top: "1rem",
    width: "50%",
    position: "absolute",
    overflow: "visible",
    zIndex: 1300,
  };
  return (
    <>
      <Box sx={{ ...styles }}>
        <Typography
          variant="h5"
          sx={{
            ml: "0.5rem",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            width: "50%",
          }}
        >
          {text}
        </Typography>
      </Box>
    </>
  );
}

export default PageNavTitle;
