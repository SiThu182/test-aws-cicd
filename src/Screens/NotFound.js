import { Alert, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          bgcolor: "rgb(231 239 254)",
          width: "100vw",
          height: "100vh",
          py: "7rem",
        }}
      >
        <Box sx={{ width: {
          md:"40vw",
          sm:"70vw",
          xs:"90vw"
        }, margin: " auto" }}>
          <Alert severity="error">
            <Typography variant="p">
              This is an error alert — check it out!
            </Typography>
          </Alert>
          <Box sx={{ bgcolor: "#fff", height: "25vh", p: 3 }}>
            <Typography variant="h5">Oops Nothing here.</Typography>
            <Typography variant="h5">Lets go back</Typography>
            <Button variant="contained" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default NotFound;
