import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import React from "react";
import Carousel from "react-multi-carousel";

import "./ShowCase.css";

function PteShowCase() {
  const frontendURL = process.env.REACT_APP_FRONTEND_URL;
  //custom css and responsive value
  // const showCaseBox = {
  //   p: {
  //     xs: 0,
  //     sm: 2,
  //     md: 3,
  //   },
  // };
  // const gridOne = {
  //   ml: {
  //     xs: 12,
  //     sm: 12,
  //     md: 12,
  //   },
  // };
  // const grid2 = {
  //   m: {
  //     xs: "auto ",
  //     sm: "auto ",
  //     md: "auto ",
  //   },
  // };
  // const certImg = {
  //   width: "100%",
  // };

  const hStyle = {
    color: "#616161",
    fontWeight: 600,
    fontSize: {
      xs: "16px",
      sm: "18px",
      md: "2.1rem",
    },
    mb: 1,
  };

  // const titleStyle = {
  //   color: "#717171",
  //   fontWeight: 500,
  //   fontSize: {
  //     md: "1.5rem",
  //   },
  // };
  // const pStyle = {
  //   width: "70%",

  //   color: "#757575",
  //   fontSize: {
  //     xs: "0.8rem",
  //     sm: "1.2rem",
  //     md: "0.9rem",
  //     lg: "1.2rem",
  //   },
  // };

  const pCarouselStyle = {
    width: "70%",

    color: "#757575",
    margin: "0 auto",
    fontSize: {
      xs: "0.8rem",
      sm: "1rem",
      md: "0.9rem",
      lg: "1.2rem",
    },
  };

  const btnStyle = {
    borderRadius: 2,
    fontWeight: "bold",
    width: "8rem",
    mx: 0.5,
    my: 2,
    fontSize: 14,
    transition: "0.5s ease",
    "&:hover": {
      color: "white",
      backgroundColor: "blue",
    },
    "&:active": {
      color: "white",
      backgroundColor: "yellow",
    },
  };

  const showCaseCarouselBox = {
    p: {
      xs: 0,
      sm: 0,
      md: 0,
    },
    py: 0,
  };

  const videoBox = {
    textAlign: "center",
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 750 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 750, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      {/* <Box sx={{ ...showCaseBox }}>
        <Grid
          container
          spacing={2}
          direction={{
            md: "row",
            sm: "column",
            xs: "column",
          }}
          justify="flex-start"
          alignItems="flex-start"
          flexWrap="wrap"
        >
          <Grid item xs={4} sx={{ ...gridOne }}>
            <img
              src={process.env.REACT_APP_FRONTEND_URL+"Image/cert1.jpg"
              alt="certificatgee_img1"
              style={{ ...certImg }}
            />
            <img
              src={process.env.REACT_APP_FRONTEND_URL+"Image/cert2.jpg"
              alt="certificatgee_img2"
              style={{ ...certImg }}
            />
          </Grid>

          <Grid item xs={6} sx={{ ...grid2 }}>
            <Typography variant="h5" component="h5" sx={{ ...titleStyle }}>
              SHOWCASE
            </Typography>
            <Typography variant="h4" component="h4" sx={{ ...hStyle }}>
              Successful students
            </Typography>
            <Typography variant="p" component="p" sx={{ ...pStyle }}>
              We believe students results are the best measurement <br /> of our
              coaching quality. iSmart PTE Ai is confident with
              <br /> the high pass rate and students’ satisfaction with the
              <br /> courses..
            </Typography>
            <Button variant="outlined" color="primary" sx={{ ...btnStyle }}>
              View More
            </Button>
          </Grid>
        </Grid>
      </Box> */}
      <Box sx={{ ...videoBox }}>
        {/* <Typography
          variant="h3"
          component="h3"
          color="initial"
          sx={{ ...hStyle }}
        >
          SHOWCASE
        </Typography> */}
        <Typography variant="h4" component="h4" sx={{ ...hStyle, mt: 3 }}>
          Successful students
        </Typography>
        <Typography variant="p" component="p" sx={{ ...pCarouselStyle, mb: 5 }}>
          We believe students results are the best measurement of our coaching
          quality. iSmart PTE Ai is confident with the high pass rate and
          students’ satisfaction with the courses..
        </Typography>
        <Box sx={{ ...showCaseCarouselBox }}>
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            ssr={true} //means to render carousel on server-side.
            infinite={true}
            // autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all 1s ease"
            transitionDuration={1000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
            // deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-50-px"
            className="showcase"
          >
            <Box
              sx={{
                width: {
                  xs: "60%",
                  sm: "50%",
                  md: "35%",
                  xl: "40%",
                },
                mx: "auto",
              }}
            >
              <img
                src={frontendURL + "Image/HKKW_Score_Card.png"}
                alt="certificatgee_img1"
                style={{ width: "100%" }}
              />
            </Box>
            <Box
              sx={{
                width: {
                  xs: "60%",
                  sm: "50%",
                  md: "35%",
                  xl: "40%",
                },
                mx: "auto",
              }}
            >
              <img
                src={frontendURL + "Image/NAH_Score_Card.png"}
                alt="certificatgee_img1"
                style={{ width: "100%" }}
              />
            </Box>
            <Box
              sx={{
                width: {
                  xs: "60%",
                  sm: "50%",
                  md: "35%",
                  xl: "40%",
                },
                mx: "auto",
              }}
            >
              <img
                src={frontendURL + "Image/KH_Score_Card.png"}
                alt="certificatgee_img1"
                style={{ width: "100%" }}
              />
            </Box>
            <Box
              sx={{
                width: {
                  xs: "60%",
                  sm: "50%",
                  md: "35%",
                  xl: "40%",
                },
                mx: "auto",
              }}
            >
              <img
                src={frontendURL + "Image/TTH_Score_Card.png"}
                alt="certificatgee_img1"
                style={{ width: "100%" }}
              />
            </Box>
            <Box
              sx={{
                width: {
                  xs: "60%",
                  sm: "50%",
                  md: "35%",
                  xl: "40%",
                },
                mx: "auto",
              }}
            >
              <img
                src={frontendURL + "Image/Score_Card_1.png"}
                alt="certificatgee_img1"
                style={{ width: "100%" }}
              />
            </Box>
          </Carousel>
          <Button variant="outlined" color="primary" sx={{ ...btnStyle }}>
            View More
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default PteShowCase;
