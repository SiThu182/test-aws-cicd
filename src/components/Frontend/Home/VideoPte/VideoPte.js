import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React from "react";
import { Carousel } from "react-responsive-carousel";

import "./VideoPte.css";

function VideoPte() {
  //custom css and responsive value
  const videoBox = {
    textAlign: "center",
    backgroundColor: "#fff8e1",
  };

  const hStyle = {
    color: "#616161",
    fontWeight: 600,
    fontSize: {
      xs: "16px",
      sm: "18px",
      md: "1.7rem",
    },
    py: "1rem",
  };
  const pStyle = {
    color: "#757575",
    fontSize: {
      xs: "0.8rem",
      sm: "1.2rem",
      md: "0.9rem",
      lg: "1.2rem",
    },
    mb: 5,
  };

  const carouselBox = {
    backgroundColor: "#fff8e1",
    p: {
      xs: 0,
      sm: 4,
      md: 5,
    },
    my: 5,
  };
  return (
    <>
      <Box sx={{ ...videoBox }}>
        <Typography
          variant="h3"
          component="h3"
          color="initial"
          sx={{ ...hStyle }}
        >
          VIDEOS FOR PTE STUDY
        </Typography>
        <Typography variant="p" color="initial" sx={{ ...pStyle }}>
          To stay up-to-date on self-study techniques, Pearson grading
          algorithms, and typical error analysis lessons
          <br /> any PTE student may have, make sure to subscribe to our YouTube
          channel
        </Typography>
        <Box sx={{ ...carouselBox }}>
          <Carousel
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            className="video-carousel"
            autoPlay={true}
            infiniteLoop={true}
            interval={3000}
          >
            <div className="video-img">
              <img
                src={
                  process.env.REACT_APP_FRONTEND_URL +
                  "Image/IMG_20230211_152255.png"
                }
                alt="videoImg"
              />
              <img
                src={
                  process.env.REACT_APP_FRONTEND_URL +
                  "Image/IMG_20230211_151836.png"
                }
                alt="videoImg"
              />
            </div>
            <div className="video-img">
              <img
                src={
                  process.env.REACT_APP_FRONTEND_URL +
                  "Image/IMG_20230211_152255.png"
                }
                alt="videoImg"
              />
              <img
                src={
                  process.env.REACT_APP_FRONTEND_URL +
                  "Image/IMG_20230211_151836.png"
                }
                alt="videoImg"
              />
            </div>
            <div className="video-img">
              <img
                src={
                  process.env.REACT_APP_FRONTEND_URL +
                  "Image/IMG_20230211_152255.png"
                }
                alt="videoImg"
              />
              <img
                src={
                  process.env.REACT_APP_FRONTEND_URL +
                  "Image/IMG_20230211_151836.png"
                }
                alt="videoImg"
              />
            </div>
            <div className="video-img">
              <img
                src={
                  process.env.REACT_APP_FRONTEND_URL +
                  "Image/IMG_20230211_152255.png"
                }
                alt="videoImg"
              />
              <img
                src={
                  process.env.REACT_APP_FRONTEND_URL +
                  "Image/IMG_20230211_151836.png"
                }
                alt="videoImg"
              />
            </div>
            <div className="video-img">
              <img
                src={
                  process.env.REACT_APP_FRONTEND_URL +
                  "Image/IMG_20230211_152255.png"
                }
                alt="videoImg"
              />
              <img
                src={
                  process.env.REACT_APP_FRONTEND_URL +
                  "Image/IMG_20230211_151836.png"
                }
                alt="videoImg"
              />
            </div>
          </Carousel>
        </Box>
      </Box>
    </>
  );
}

export default VideoPte;
