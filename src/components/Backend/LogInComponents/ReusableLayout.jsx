import React, { useEffect, useState } from "react";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { Divider } from "@mui/material";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";

import { useNavigate } from "react-router-dom";

import { FormStyle } from "../FormStyle";

import ReusableStepper from "../InfoCarousel";
const ReusableLayout = React.memo((props) => {
  const { form, images, actions } = props;
  const navigate = useNavigate();
  const [imageArray, setImageArray] = useState([]);
  useEffect(() => {
    setImageArray(images);
  }, [images]);
  return (
    <Box
      sx={{
        ...FormStyle.bg,
      }}
    >
      {/* <Alert id="alert" onClose={() => close()}>
        This is a success alert — check it out!
      </Alert> */}
      <KeyboardBackspaceIcon
        sx={{ position: "absolute", top: 4, left: "1rem", cursor: "pointer" }}
        onClick={() => navigate("/")}
      ></KeyboardBackspaceIcon>

      <Card
        sx={{
          ...FormStyle.card,
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

        <Box sx={{ display: "flex", height: "85vh" }}>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              height: "100%",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly"
            }}
          >
            <Box sx={{ textAlign: "center", mt: 1 }}>
              <img
                // src="http://localhost:3000/Image/AigmaLogo.png"
                src={process.env.REACT_APP_FRONTEND_URL + "Image/AigmaLogo.png"}
                alt="pte-logo"
                style={{
                  width: "12rem",
                  margin: "0 auto",
                }}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Divider></Divider>
            </Box>

            <CardContent
              sx={{
                ...FormStyle.content,
                
                
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "80%",
                }}
              >
                {form}
              </Box>
            </CardContent>

            <CardActions
              sx={{
                ...FormStyle.cardAction,
              }}
            >
              {actions}
            </CardActions>
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "100%",
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
              background:
                "radial-gradient(circle, rgba(228,237,255,0.9501050420168067) 54%, rgba(15,132,247,0.8520658263305322) 100%)",
              // "radial-gradient(circle, rgba(168,214,254,1) 48%, rgba(27,82,204,1) 89%)",
            }}
          >
            
            {imageArray.length == 0 ? (
              <>Loading....</>
            ) : (
              <ReusableStepper images={imageArray} />
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
});

export default ReusableLayout;
