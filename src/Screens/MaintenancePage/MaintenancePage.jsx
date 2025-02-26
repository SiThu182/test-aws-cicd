import { Box, Typography } from "@mui/material";
import React from "react";
import WarningIcon from "@mui/icons-material/Warning";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
function MaintenancePage() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",

        backgroundImage: `url(${process.env.REACT_APP_FRONTEND_URL}Under-construction-bro.svg)`,
        backgroundSize: {
          xs: "200px ",
          md: "30vw",
          lg: "350px",
        },
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255,255,255,0.2)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",

            paddingTop: "1rem",
          }}
        >
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <WarningIcon
              sx={{ color: "orange", fontSize: "5rem" }}
            ></WarningIcon>
          </Box>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontFamily: "'Varela Round', sans-serif",
              color: "#3f51b5",
              fontWeight: "bold",
            }}
          >
            This website is under maintenance for smoother experience. <br />
            Come back later.
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontFamily: "'Varela Round', sans-serif",
              color: "#9e9e9e",
            }}
          >
            Any Questions ? Please email us to{" "}
            <a
              className="infoNav"
              href="mailto:info@smarteduglobe.com"
              style={{ color: "black" }}
            >
              info@smarteduglobe.com
            </a>
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontFamily: "'Varela Round', sans-serif",
                color: "#9e9e9e",
              }}
            >
              Contact Us :
            </Typography>
            <a
              href="https://www.facebook.com/profile.php?id=100093900947184"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookRoundedIcon
                sx={{
                  transition: "0.2s ease",
                  ":hover": {
                    color: "rgba(25,0,0,0.7)",

                    cursor: "pointer",
                  },
                }}
              ></FacebookRoundedIcon>
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MaintenancePage;
