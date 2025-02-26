import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";

import "./carouselCustom.css";
import "react-responsive-carousel/lib/styles/carousel.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchBannerFrontendAsync } from "../../../../redux/thunk/Banner";

function CarouselComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bannerListFrontend, bannerListFrontendStatus } = useSelector(
    (state) => state.banner
  );
  const frontEndURL = process.env.REACT_APP_FRONTEND_URL;
  const hStyle = {
    color: "white",
    fontSize: {
      xs: "15px",
      sm: "17px",
      md: "1.7rem",
      lg: "2rem",
      xl: "2.5rem",
    },
    textAlign: "left",
    fontWeight: 600,

    py: {
      xs: "0rem",
      sm: "0.25rem",
      md: "0.5rem",
    },
  };
  const buttonStyle = {
    justifyContent: "flex-start",
    color: "#757575",
    backgroundColor: "yellow",
    cursor: "pointer",

    "&:hover": {
      color: "black",
      backgroundColor: "white",
    },
  };
  const pStyle = {
    fontSize: {
      xs: "0.5rem",
      sm: "0.7rem",
      md: "1rem",
      lg: "1.2rem",
      xl: "1.5rem",
    },
  };

  useEffect(() => {
    dispatch(FetchBannerFrontendAsync({ path: "banners" }));
  }, [dispatch]);

  console.log(bannerListFrontend, "banner frontend");

  return (
    <div>
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        className="pte-start-carousel"
        autoPlay={false}
        infiniteLoop={true}
        animationHandler={"fade"}
        interval={3000}
      >
        {bannerListFrontendStatus === "succeeded" ? (
          bannerListFrontend?.map((b, index) => (
            <div className="six" key={index} style={{ minHeight: "20vh" }}>
              <img
                // src="http://localhost:3000/Image/BannerImg6.png"
                src={`${process.env.REACT_APP_BACKEND_URL}storage/${b.image_url}`}
                style={{ height: "100%" }}
                alt="banner"
                loading="lazy"
              />
            </div>
          ))
        ) : bannerListFrontendStatus === "loading" ? (
          <Box
            sx={{
              minHeight: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Loading banner Image
          </Box>
        ) : (
          bannerListFrontendStatus === "failed" && (
            <Box
              sx={{
                minHeight: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Failed to fetch banner Image
            </Box>
          )
        )}
        {/* {bannerListFrontendStatus === "loading" && (
          <Box
            sx={{
              minHeight: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Loading banner Image
          </Box>
        )}
        {bannerListFrontendStatus === "failed" && (
          <Box
            sx={{
              minHeight: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Failed to fetch banner Image
          </Box>
        )} */}
        {/* carousel items end */}
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
