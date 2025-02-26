import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CircleIcon from "@mui/icons-material/Circle";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { useDispatch } from "react-redux";

import { fetchCourseFrontendAsync } from "../../../redux/thunk/Course";

import "./TestimonialStyle.css";
import "react-multi-carousel/lib/styles.css";

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

const TestimonialCarousel = React.memo(({ feedbacks, state }) => {
  const frontEndURL = process.env.REACT_APP_FRONTEND_URL;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCourseFrontendAsync("courses"));
    // setAssign()
  }, [dispatch]);

  const CustomDot = ({
    onMove,
    index,
    onClick,
    active,
    carouselState: { currentSlide, deviceType },
  }) => {
    const [chooseSlide, setChooseSlide] = useState();
    useEffect(() => {
      setChooseSlide(currentSlide);
    }, [currentSlide]);
    return (
      <>
        {index == chooseSlide ||
        (index >= chooseSlide - 2 && index <= chooseSlide + 2) ? (
          index == chooseSlide - 2 || index == chooseSlide + 2 ? (
            <li
              // className={active ? "active-dot" : "inactive-dot"}
              onClick={() => onClick()}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1,
                  opacity: 0.5,
                }}
              >
                <CircleIcon sx={{ cursor: "pointer", fontSize: "0.7rem" }} />
              </Box>
            </li>
          ) : index == chooseSlide ? (
            <li
              className={active ? "active-dot" : "inactive-dot"}
              onClick={() => onClick()}
            >
              <ButtonBase sx={{ borderRadius: "50%" }}>
                <RadioButtonCheckedIcon
                  sx={{ cursor: "pointer", fontSize: "1.3rem" }}
                />
              </ButtonBase>
            </li>
          ) : (
            <li onClick={() => onClick()}>
              <ButtonBase sx={{ borderRadius: "50%" }}>
                <RadioButtonUncheckedIcon
                  className={active ? "active-dot" : "inactive-dot"}
                  sx={{ cursor: "pointer", fontSize: "1rem" }}
                />
              </ButtonBase>
            </li>
          )
        ) : (
          ""
        )}
      </>
    );
  };

  const arrowStyle = {
    background: "transparent",
    border: 0,
    color: "#fff",
    cursor: "pointer",
    fontSize: "80px",
    zIndex: 500,
  };
  const CustomRight = ({ onClick }) => {
    return (
      <button
        className="arrow right"
        onClick={onClick}
        style={{ ...arrowStyle }}
      >
        <ArrowCircleRightIcon style={{ fontSize: "50px", color: "black" }} />
      </button>
    );
  };

  const CustomLeft = ({ onClick }) => (
    <button className="arrow left" onClick={onClick} style={{ ...arrowStyle }}>
      <ArrowCircleLeftIcon style={{ fontSize: "50px", color: "black" }} />
    </button>
  );

  return (
    <>
      <Box sx={{ backgroundColor: "aliceblue", py: 4, px: 2, pb: 10 }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            color: "#616161",
            fontWeight: 600,
            fontSize: {
              xs: "16px",
              sm: "18px",
              md: "2.1rem",
            },
            mb: 1,
          }}
        >
          Student Feedback
        </Typography>
        {state === "succeeded" &&
        feedbacks?.length !== 0 &&
        feedbacks !== undefined ? (
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={false}
            //autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all 1s ease"
            transitionDuration={1000}
            className="testimonial"
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            //   deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style-testimonial"
            itemClass="carousel-item-padding-50-px"
            customDot={<CustomDot />}
            customRightArrow={<CustomRight />}
            customLeftArrow={<CustomLeft />}
          >
            {feedbacks?.map((f) => (
              <Box
                key={f.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  my: "auto",
                  minHeight: "25rem",
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "1rem",
                    width: {
                      xs: "90%",
                      sm: "90%",
                      md: "70%",
                    },
                    boxShadow: 5,
                    p: 2,
                    mb: 5,
                  }}
                >
                  <Avatar
                    alt="Aigma Student"
                    src={`${process.env.REACT_APP_BACKEND_URL}storage/${f.image}`}
                    sx={{
                      mx: "auto",
                      width: 100,
                      height: 100,
                    }}
                  />
                  <Typography variant="h6" textAlign={"center"}>
                    {f.name}
                  </Typography>
                  <Typography textAlign={"center"}>PTE student</Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={{ width: "10%" }}>
                      <FormatQuoteIcon
                        sx={{
                          transform: "rotate(180deg)",
                        }}
                      ></FormatQuoteIcon>
                    </Box>
                    <Box sx={{ width: "80%" }}>
                      {" "}
                      <Typography
                        sx={{
                          color: "#757575",
                          margin: "0 auto",
                          fontSize: {
                            xs: "0.8rem",
                            sm: "1rem",
                            md: "0.9rem",
                            lg: "1rem",
                          },
                        }}
                      >
                        {f.description}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "10%", alignSelf: "flex-end", pl: 4 }}>
                      <FormatQuoteIcon></FormatQuoteIcon>
                    </Box>
                  </Box>
                </Card>
              </Box>
            ))}
          </Carousel>
        ) : feedbacks?.length !== 0 ? (
          <Box sx={{ display: "flex", height: "70vh" }}>
            <CircularProgress sx={{ m: "auto" }}></CircularProgress>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              height: "40vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Not exist yet ...</Typography>
          </Box>
        )}
      </Box>
    </>
  );
});

export default TestimonialCarousel;
