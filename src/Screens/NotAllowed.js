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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: {
              md: "40vw",
              sm: "70vw",
              xs: "90vw",
            },
            borderRadius: "1rem",

            boxShadow: 5,
          }}
        >
          <Alert
            severity="warning"
            sx={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
          >
            <Typography variant="p">
              This is an warning alert — check it out!
            </Typography>
          </Alert>
          <Box
            sx={{
              bgcolor: "#fff",
              height: "25vh",
              p: 3,
              borderBottomLeftRadius: "1rem",
              borderBottomRightRadius: "1rem",
            }}
          >
            <Typography variant="h5">Not allowed.</Typography>
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
