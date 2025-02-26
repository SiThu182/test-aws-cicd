import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Button,Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import CountryDialog from "../OnlineCourses/CountryDialog";
import CarouselComponent from "./Carousel/CarouselComponent";
import FAQs from "./FAQs";
import Feature from "./Feature";
import InfoIconBox from "./InfoIconBox";
import LayoutOS from "./offer&Subscription/LayoutOS";
// import TrainingPackage from "./offer&Subscription/TrainingPackage";
import PteAbout from "./PteAbout";
// import PteCourse from "./PteCourse";
// import PteShowCase from "./PteShowCase";
// import PteTestimonial from "./PteTestimonials";

import TrainingPackage from "./offer&Subscription/TrainingPackage";
import Subscription from "./offer&Subscription/Subscription";
import Testimonial from "../../../Screens/Frontend/Testimonial";
// import ScoreCardComponent from "../../Backend/MockTest/ScoreCardComponent";
import { useSelector } from "react-redux";
import TitleTranslation from "../../TitleTranslation";

// import VideoPte from "./VideoPte/VideoPte";

const HomePage = () => {
  const [showButton, setShowButton] = useState(false);
  const [video, setVideo] = React.useState("English");
  const [expanded, setExpanded] = React.useState(false);
  const { user } = useSelector((state) => state.user);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    const scrollButtonVisibility = () => {
      window.scrollY > 150 ? setShowButton(true) : setShowButton(false);
    };
    window.addEventListener("scroll", scrollButtonVisibility);
    return () => {
      window.removeEventListener("scroll", scrollButtonVisibility);
    };
  }, []);
  const hStyle = {
    fontSize: {
      xs: "16px",
      sm: "17px",
      md: "1.7rem",
    },
    fontWeight: 600,
    pt: "1rem",
    pb: "3rem",
    textAlign: "center",
  };

  // useGoogleTranslateScript();
  return (
    <>
      <Box sx={{ position: "relative" }}>
        {/* <AdDialog></AdDialog> */}
        {/* <CountryDialog></CountryDialog> */}

        {showButton && (
          <Button
            sx={{
              position: "fixed",
              right: 10,
              boxShadow: 4,
              bottom: 10,
              backgroundColor: "#0CAFFF",
              zIndex: "1999",
              borderRadius: "5rem",
              "&:hover": {
                backgroundColor: "black",
                color: "yellow",
              },
            }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <KeyboardArrowUpIcon sx={{ color: "white" }}></KeyboardArrowUpIcon>
          </Button>
        )}
        <CarouselComponent></CarouselComponent>
        <PteAbout></PteAbout>
      
        <Subscription></Subscription>

        {/* <PteCourse></PteCourse> */}
        {/* <PteShowCase></PteShowCase>*/}
        {/* <PteTestimonial></PteTestimonial>  */}
        <LayoutOS></LayoutOS>
        <InfoIconBox></InfoIconBox>

        <TrainingPackage />

        <Feature></Feature>
        <Box sx={{ backgroundColor: "rgb(227,242,253)", py: 10 }}>
          <Box
            sx={{
              width: "80vw",
              height: "70vh",
              maxWidth: "1300px",
              margin: "0 auto",
              padding: "10px",
            }}
          >
            <Testimonial></Testimonial>
          </Box>
        </Box> 
        <FAQs></FAQs>
        {/* <Box sx={{ backgroundColor: "rgb(227,242,253)" }}>
          <Typography variant="h3" sx={{ ...hStyle }}>
            How to buy <span style={{ color: "#0CAFFF" }}>Plan</span>
          </Typography>
          <QAaccordion
            title="How to Buy Plan"
            content={
              <>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    sx={{ mr: 2 }}
                    onClick={() => {
                      setVideo("English");
                    }}
                  >
                    English
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setVideo("Myanmar");
                    }}
                  >
                    Myanmar
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {video === "English" && (
                    <video width={"50%"} height={"50%"} controls>
                      <source
                        // src="https://ptebackend.aigmapte.com/How-to-buy-subscription-plans.mp4"
                        src={
                          process.env.REACT_APP_BACKEND_URL +
                          "/How-to-buy-subscription-plans.mp4"
                        }
                        type="video/mp4"
                      />
                      <source
                        // src="https://ptebackend.aigmapte.com/How%20to%20buy%20subscription%20plans.mov"
                        src={
                          process.env.REACT_APP_BACKEND_URL +
                          "How%20to%20buy%20subscription%20plans.mov"
                        }
                        type="video/quicktime"
                      />

                      <p>Your browser cannot play the provided video file.</p>
                    </video>
                  )}
                  {video === "Myanmar" && (
                    <video width={"50%"} height={"50%"} controls>
                      <source
                        // src="https://ptebackend.aigmapte.com//How-to-buy-subscription-plans-mm.mp4"
                        src={
                          process.env.REACT_APP_BACKEND_URL +
                          "https://ptebackend.aigmapte.com//How-to-buy-subscription-plans-mm.mp4"
                        }
                        type="video/mp4"
                      />
                      <p>Your browser cannot play the provided video file.</p>
                    </video>
                  )}
                </Box>
              </>
            }
            expanded={expanded}
            handleChange={handleChange}
            panel={"panel5"}
          />
        </Box> */}

        {/* <PartnersCardSlide></PartnersCardSlide> */}
        {/* <Box sx={{ backgroundColor: "rgb(227,242,253)" }}>
          <Box
            sx={{
              width: "80vw",
              height: "70vh",
              maxWidth: "1300px",
              margin: "0 auto",
              padding: "10px",
            }}
          >
            <Testimonial></Testimonial>
          </Box>
        </Box>  */}
      </Box>

      {/* <>
        {user !== null && (
          <ScoreCardComponent
            pointArray={undefined}
            user={user}
            post={null}
            overallPoint={80}
            mockTestId={6}
            date={new Date().toDateString()}
          />
        )}
      </> */}
    </>
  );
};

export default HomePage;
