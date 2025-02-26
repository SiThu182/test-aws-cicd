import React from "react";
import Carousel from "react-multi-carousel";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  Button,
} from "@mui/material";
import InstructorInfo from "./InstructorInfo";

function InstructorCarousel() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 825 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 825, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const frontEndURL = process.env.REACT_APP_FRONTEND_URL;
  return (
    <>
      <Box sx={{ background: "rgb(231 239 254)", py: "8rem" }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#2196f3",
            fontWeight: "bolder",
            my: "2rem",
          }}
        >
          Our PTE Expert Trainers
        </Typography>
        <Box
          sx={{
            width: {
              sm: "95vw",
              md: "80vw",
            },
            mx: "auto",
          }}
        >
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
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            //   deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-50-px"
          >
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
              }}
            >
              <Card
                sx={{
                  minWidth: "300px",
                  maxWidth: "450px",
                  m: 3,
                  height: "auto",
                }}
              >
                <CardMedia
                  component="img"
                  width={"100%"}
                  // height="50%"
                  image={frontEndURL + "Image/SND.png"}
                  title="instructor"
                />
                <CardContent sx={{ height: "auto" }}>
                  <Box sx={{ px: 2 }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bolder", color: "#2196f3" }}
                    >
                      Tr. Saw Nay Doon
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#2196f3" }}>
                      IELTS, PTE,TOEFL Instructor
                    </Typography>
                  </Box>
                  <Box sx={{ px: 2 }}>
                    <List
                      sx={{
                        listStyleType: "disc",
                        pl: 2,
                        "& .MuiListItem-root": {
                          display: "list-item",
                        },
                      }}
                    >
                      <ListItem>
                        <Typography>LL.B</Typography>
                      </ListItem>
                      <ListItem>
                        <Typography> Diploma in English (MUFL)</Typography>
                      </ListItem>
                      <ListItem>
                        <Typography> Diploma in Political Science</Typography>
                      </ListItem>
                      <ListItem>
                        <Typography> Diploma in International Law</Typography>
                      </ListItem>
                      <ListItem>
                        <Typography>
                          Single Subject Diploma in Business Law( ICM,UK )
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography>
                          Executive Diploma in English Language Teaching (LQB )
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </CardContent>
              </Card>
            </Box> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
              }}
            >
              <Card
                sx={{
                  minWidth: "300px",
                  minHeight: "750px",
                  maxWidth: "450px",
                  m: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="50%"
                  image={frontEndURL + "Image/SND.png"}
                  title="green iguana"
                />
                <CardContent>
                  <Box sx={{ px: 2 }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bolder", color: "#2196f3" }}
                    >
                      Tr. Saw Nay Doon
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#2196f3" }}>
                      IELTS, PTE,TOEFL Instructor
                    </Typography>
                  </Box>
                  <Box sx={{ px: 2 }}>
                    <List
                      sx={{
                        listStyleType: "disc",
                        pl: 2,
                        "& .MuiListItem-root": {
                          display: "list-item",
                        },
                      }}
                    >
                      <ListItem>
                        <Typography>13 years teaching experience</Typography>
                      </ListItem>

                      <ListItem>
                        <Typography>
                          Seasoned language instructor specializing in IELTS,
                          TOEFL, and PTE preparation
                        </Typography>
                      </ListItem>

                      <ListItem>
                        <Typography> Myanmar </Typography>
                      </ListItem>

                      <InstructorInfo instructor="naydoon" />
                    </List>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
              }}
            >
              <Card
                sx={{
                  minWidth: "300px",
                  minHeight: "750px",
                  maxWidth: "450px",
                  m: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="50%"
                  image={frontEndURL + "Image/ny.png"}
                  title="green iguana"
                />
                <CardContent>
                  <Box sx={{ px: 2 }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bolder", color: "#2196f3" }}
                    >
                      Tr. Nang Yoon's
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#2196f3" }}>
                      IELTS, PTE,TOEFL Instructor
                    </Typography>
                  </Box>
                  <Box sx={{ px: 2 }}>
                    <List
                      sx={{
                        listStyleType: "disc",
                        pl: 2,
                        "& .MuiListItem-root": {
                          display: "list-item",
                        },
                      }}
                    >
                      <ListItem>
                        <Typography>3 years teaching experience</Typography>
                      </ListItem>

                      <ListItem>
                        <Typography>
                          SAT - 1360 / 1600 | EF test - 74 / 100 | BBC score -
                          560/ 600 | Duolingo score - 140/160{" "}
                        </Typography>
                      </ListItem>

                      <ListItem>
                        <Typography> Myanmar </Typography>
                      </ListItem>

                      <InstructorInfo instructor="nangyoon" />
                    </List>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
              }}
            >
              <Card
                sx={{
                  minWidth: "300px",
                  minHeight: "750px",
                  maxWidth: "450px",
                  m: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="50%"
                  image={frontEndURL + "Image/NML.png"}
                  title="green iguana"
                />
                <CardContent>
                  <Box sx={{ px: 2 }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bolder", color: "#2196f3" }}
                    >
                      Tr. Nyo Min Lwin's
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#2196f3" }}>
                      IELTS, PTE,TOEFL Instructor
                    </Typography>
                  </Box>
                  <Box sx={{ px: 2 }}>
                    <List
                      sx={{
                        listStyleType: "disc",
                        pl: 2,
                        "& .MuiListItem-root": {
                          display: "list-item",
                        },
                      }}
                    >
                      <ListItem>
                        <Typography>3 years teaching experience</Typography>
                      </ListItem>

                      <ListItem>
                        <Typography>
                          {" "}
                          Higher National Diploma in Business Management{" "}
                        </Typography>
                      </ListItem>

                      <ListItem>
                        <Typography> Myanmar </Typography>
                      </ListItem>
                    </List>
                    <InstructorInfo instructor="nyominlwin" />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Carousel>
        </Box>
      </Box>
    </>
  );
}

export default InstructorCarousel;
