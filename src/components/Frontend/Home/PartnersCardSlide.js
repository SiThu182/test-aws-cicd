import { Box, Card, Typography } from "@mui/material";
import React from "react";
import Carousel from "react-multi-carousel";

function PartnersCardSlide() {
  const frontEndURL = process.env.REACT_APP_FRONTEND_URL;
  const hStyle = {
    backgroundColor: "rgb(227,242,253)",
    fontSize: {
      xs: "16px",
      sm: "17px",
      md: "1.7rem",
    },
    fontWeight: 600,
    pt: "1rem",
    pb: "1rem",
    textAlign: "center",
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 750 },
      items: 2,
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
      <Typography variant="h3" sx={{ ...hStyle }}>
        Our <span style={{ color: "#0CAFFF" }}>Partners</span>
      </Typography>
      <Box sx={{ backgroundColor: "rgb(227,242,253)" }}>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          //   autoPlay={this.props.deviceType !== "mobile" ? true : false}
          autoPlay={false}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all 1s ease"
          transitionDuration={1000}
          className="testimonial"
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          //   deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-50-px"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: "auto",
              mx: "2rem",
              minHeight: "25rem",
            }}
          >
            <Card
              sx={{
                backgroundColor: "white",
                borderRadius: "1rem",

                boxShadow: 5,
                p: 2,
                mb: 5,
              }}
            >
              <Box
                sx={{
                  width: "10rem",
                  height: "10rem",
                  mx: "auto",
                  overflow: "hidden",
                  border: "5px solid black",
                  boxShadow: 3,
                  borderRadius: "50%",
                  position: "relative",
                }}
              >
                <img
                  alt="Australia_Flag"
                  src={`${frontEndURL}Image/Australia_Flag.png`}
                  style={{
                    position: "absolute",
                    left: "-20%",
                    top: "-20%",
                    width: "15rem",
                    height: "15rem",
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                sx={{ color: "#0CAFFF", textAlign: "center" }}
              >
                Australia
              </Typography>

              <Box sx={{ width: "80%", mx: "auto" }}>
                {" "}
                <Typography
                  sx={{
                    color: "#757575",
                    textAlign: "center",

                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                      md: "0.9rem",
                      lg: "1rem",
                    },
                  }}
                >
                  AigmaPTE Ai
                  <br />
                  107/31-35 Smallwood Ave Homebush NSW Australia 2140
                </Typography>
              </Box>
            </Card>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: "auto",
              mx: "2rem",
              minHeight: "25rem",
            }}
          >
            <Card
              sx={{
                backgroundColor: "white",
                borderRadius: "1rem",

                boxShadow: 5,
                p: 2,
                mb: 5,
              }}
            >
              <Box
                sx={{
                  width: "10rem",
                  height: "10rem",
                  mx: "auto",
                  overflow: "hidden",
                  border: "5px solid black",
                  boxShadow: 3,
                  borderRadius: "50%",
                  position: "relative",
                }}
              >
                <img
                  alt="Australia_Flag"
                  src={`${frontEndURL}Image/Thai_Flag.png`}
                  style={{
                    position: "absolute",
                    left: "-20%",
                    top: "-20%",
                    width: "12rem",
                    height: "12rem",
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                sx={{ color: "#0CAFFF", textAlign: "center" }}
              >
                Thai
              </Typography>

              <Box sx={{ width: "80%", mx: "auto" }}>
                {" "}
                <Typography
                  sx={{
                    color: "#757575",
                    textAlign: "center",

                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                      md: "0.9rem",
                      lg: "1rem",
                    },
                  }}
                >
                  AigmaPTE Ai
                  <br />
                  107/31-35 Smallwood Ave Homebush NSW Australia 2140
                </Typography>
              </Box>
            </Card>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: "auto",
              mx: "2rem",
              minHeight: "25rem",
            }}
          >
            <Card
              sx={{
                backgroundColor: "white",
                borderRadius: "1rem",

                boxShadow: 5,
                p: 2,
                mb: 5,
              }}
            >
              <Box
                sx={{
                  width: "10rem",
                  height: "10rem",
                  mx: "auto",
                  overflow: "hidden",
                  border: "5px solid black",
                  boxShadow: 3,
                  borderRadius: "50%",
                  position: "relative",
                }}
              >
                <img
                  alt="Australia_Flag"
                  src={`${frontEndURL}Image/Myanmar_Flag.png`}
                  style={{
                    position: "absolute",
                    left: "-14%",
                    top: "-20%",
                    width: "12rem",
                    height: "12rem",
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                sx={{ color: "#0CAFFF", textAlign: "center" }}
              >
                Myanmar
              </Typography>

              <Box sx={{ width: "80%", mx: "auto" }}>
                {" "}
                <Typography
                  sx={{
                    color: "#757575",
                    textAlign: "center",

                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                      md: "0.9rem",
                      lg: "1rem",
                    },
                  }}
                >
                  AigmaPTE Ai
                  <br />
                  107/31-35 Smallwood Ave Homebush NSW Australia 2140
                </Typography>
              </Box>
            </Card>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: "auto",
              mx: "2rem",
              minHeight: "25rem",
            }}
          >
            <Card
              sx={{
                backgroundColor: "white",
                borderRadius: "1rem",

                boxShadow: 5,
                p: 2,
                mb: 5,
              }}
            >
              <Box
                sx={{
                  width: "10rem",
                  height: "10rem",
                  mx: "auto",
                  overflow: "hidden",
                  border: "5px solid black",
                  boxShadow: 3,
                  borderRadius: "50%",
                  position: "relative",
                }}
              >
                <img
                  alt="Australia_Flag"
                  src={`${frontEndURL}Image/Nepal_Flag.png`}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "-20%",
                    width: "12rem",
                    height: "12rem",
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                sx={{ color: "#0CAFFF", textAlign: "center" }}
              >
                Nepal
              </Typography>

              <Box sx={{ width: "80%", mx: "auto" }}>
                {" "}
                <Typography
                  sx={{
                    color: "#757575",
                    textAlign: "center",

                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                      md: "0.9rem",
                      lg: "1rem",
                    },
                  }}
                >
                  AigmaPTE Ai
                  <br />
                  107/31-35 Smallwood Ave Homebush NSW Australia 2140
                </Typography>
              </Box>
            </Card>
          </Box>
        </Carousel>
      </Box>
    </>
  );
}

export default PartnersCardSlide;
