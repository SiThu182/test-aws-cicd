import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function BackButton(props) {
  const { path = null } = props;
  const navigate = useNavigate();
  return (
    <Box className="container-fluid">
      <Button
        variant="contained"
        sx={{
          bgcolor: "#2196f3",
          color: "white",

          "&:hover": {
            bgcolor: "white",
            color: "black",
          },
          mb: 2,
        }}
        onClick={() => (path !== null ? navigate(path) : navigate(-1))}
      >
        <ArrowBackIcon></ArrowBackIcon> Back
      </Button>
    </Box>
  );
}

export default BackButton;
