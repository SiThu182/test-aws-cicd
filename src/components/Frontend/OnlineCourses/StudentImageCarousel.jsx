import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Box, Typography, CircularProgress } from "@mui/material";
const StudentImageCarousel = React.memo(({ scoreCards, state }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 825 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 825, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const frontEndURL = process.env.REACT_APP_FRONTEND_URL;
  const [groupArray, setGroupArray] = useState([]);
  function groupArrayIntoFourElements(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i += 4) {
      result.push(arr.slice(i, i + 4));
    }
    return result;
  }

  useEffect(() => {
    if (state === "succeeded" && scoreCards !== undefined) {
      const originalArray = [...scoreCards];
      const groupedArray = groupArrayIntoFourElements(originalArray);

      setGroupArray([...groupedArray]);
    }
  }, [scoreCards, state]);

  return (
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
        PTE High Score Student
      </Typography>
      {state === "succeeded" &&
      scoreCards?.length !== 0 &&
      scoreCards !== undefined ? (
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
          {groupArray.map((group, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                width: {
                  xs: "95vw",
                  md: "80vw",
                },
                mx: "auto",
              }}
            >
              {group.map((s) => (
                <Box key={s.id} sx={{ width: "45%", m: 2,background:"black" }}>
                  <Box>
                    <img
                      // src="http://localhost:3000/Image/BannerImg2.png"
                      src={`${process.env.REACT_APP_BACKEND_URL}storage/${s.image}`}
                      style={{ width: "100%" }}
                      alt="banner"
                      loading="lazy"
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Carousel>
      ) : scoreCards?.length !== 0 ? (
        <Box sx={{ display: "flex", height: "70vh" }}>
          <CircularProgress sx={{ m: "auto" }}></CircularProgress>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "70vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Not exist yet ...</Typography>
        </Box>
      )}
    </Box>
  );
});

export default StudentImageCarousel;
