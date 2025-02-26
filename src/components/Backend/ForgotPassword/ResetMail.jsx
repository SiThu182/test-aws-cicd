import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { FormStyle } from "../FormStyle";

export default function MediaCard() {
  const navigate = useNavigate();

  // redirect authenticated user to profile screen

  return (
    <>
      <Box
        sx={{
          ...FormStyle.bg,
        }}
      >
        <Card
          sx={{
            ...FormStyle.card,
            height: "auto",
            width: "40vw",
          }}
        >
          <Box
            sx={{
              ...FormStyle.yellow,
            }}
          />
          <Box
            sx={{
              ...FormStyle.blue,
            }}
          />
          <Box
            sx={{
              ...FormStyle.red,
            }}
          />
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <img
              // src="http://localhost:3000/Image/AigmaLogo.png"
              src={process.env.REACT_APP_FRONTEND_URL + "Image/AigmaLogo.png"}
              alt="pte-logo"
              style={{
                width: "50%",
                margin: "0 auto",
              }}
            />
          </Box>

          <CardContent
            sx={{
              ...FormStyle.content,
            }}
          >
            <Divider></Divider>
            <Typography
              variant="h5"
              sx={{ ...FormStyle.formHeading }}
              color="text.secondary"
            >
              Verification code send successfully.
            </Typography>
            <Box
              sx={{
                backgroundColor: "blue",
                my: 2,
                borderRadius: "50%",
                mx: "auto",
                width: "5rem",
                height: "5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "5",
                background:
                  "linear-gradient(29deg, rgba(0,0,0,1) 0%, rgba(90,193,255,1) 45%, rgba(255,255,255,1) 68%)",
              }}
            >
              <Box sx={{ width: "5rem", overflow: "hidden" }}>
                <Box
                  sx={{
                    "@keyframes width-rotate": {
                      "0%": {
                        transform: "translateX(-85px)",
                      },
                      "10%": {
                        transform: "translateX(-80px)",
                      },
                      "15%": {
                        transform: "translateX(-70px)",
                      },
                      "20%": {
                        transform: "translateX(-60px)",
                      },
                      "25%": {
                        transform: "translateX(-50px)",
                      },
                      "30%": {
                        transform: "translateX(-40px)",
                      },
                      "35%": {
                        transform: "translateX(-30px)",
                      },
                      "40%": {
                        transform: "translateX(-20px)",
                      },
                      "45%": {
                        transform: "translateX(-10px)",
                      },
                      "50%": {
                        transform: "translateX(0px)",
                      },

                      "60%": {
                        transform: "translateX(10px)",
                      },
                      "65%": {
                        transform: "translateX(20px)",
                      },
                      "70%": {
                        transform: "translateX(30px)",
                      },
                      "75%": {
                        transform: "translateX(40px)",
                      },
                      "80%": {
                        transform: "translateX(50px)",
                      },
                      "85%": {
                        transform: "translateX(60px)",
                      },
                      "90%": {
                        transform: "translateX(70px)",
                      },
                      "95%": {
                        transform: "translateX(80px)",
                      },
                      "100%": {
                        transform: "translateX(85px)",
                      },
                    },
                    animation: "1.5s width-rotate ease-in infinite",
                  }}
                >
                  <i
                    class="fa-solid fa-barcode  fa-2xl"
                    // style={{ color: "" }}
                  ></i>
                </Box>
              </Box>
            </Box>
            <Typography
              variant="h5"
              sx={{ fontSize: "1rem" }}
              color="text.secondary"
            >
              Please check your email inbox and spam folder
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              ...FormStyle.cardAction,
              mt: "2rem",
            }}
          >
            <Button variant="contained" onClick={() => navigate("/login")}>
              Return to login
            </Button>
            <Box
              sx={{
                // display: "flex",
                // justifyContent: "space-between",
                textAlign: "center",
                color: "rgb(25,118,210)",
                width: "100%",
                mt: "2rem",
              }}
            >
              <Typography sx={{ textDecoration: "underline" }}>
                Terms & Condition
              </Typography>
              <Typography sx={{ textDecoration: "underline" }}>
                Privacy & Policy
              </Typography>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
