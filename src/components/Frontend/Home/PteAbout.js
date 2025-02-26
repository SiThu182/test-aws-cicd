import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";

function PteAbout() {
  const containerStyle = {
    //custom css and responsive value
    display: {
      sm: "block",
      md: "flex",
    },
    justifyContent: "center",
    p: {
      md: 10,
      sm: 3,
      xs: 1,
    },
    backgroundColor: "rgb(240,248,255)",
  };
  const boxOneStyle = {
    width: {
      sm: "100%",
      md: "700px",
    },
  };
  const { t } = useTranslation();
  const hStyle = {
    color: "#616161",
    fontWeight: 600,
    fontSize: {
      xs: "16px",
      sm: "18px",
      md: "1.7rem",
    },
    mb: 5,
    textAlign: {
      xs: "center",
      sm: "center",
      md: "left",
      lg: "left",
    },
  };

  const titleStyle = {
    color: "#717171",
    fontWeight: 500,
    fontSize: {
      xs: "16px",
      sm: "17px",
      md: "1.4rem",
    },
    textAlign: {
      xs: "center",
      sm: "center",
      md: "left",
      lg: "left",
    },
  };
  const pStyle = {
    width: "90%",
    color: "#757575",
    lineHeight: "1.9rem",
    fontSize: {
      xs: "0.8rem",
      sm: "1rem",
      md: "0.9rem",
      lg: "1.2rem",
    },
  };

  const boxTwoStyle = {
    width: {
      md: "500px",
      sm: "100%",
    },
    display: "flex",
  };

  const imgBox = {
    width: "40%",
    zIndex: 3,
    ml: 1,
    mr: 2,
    my: 5,
  };
  const imgStyle = {
    width: "100%",
    height: "100%",
    zIndex: 3,
  };
  return (
    <>
      <Box sx={{ ...containerStyle }}>
        <Box sx={{ ...boxOneStyle }}>
          <Typography variant="h5" component="h5" sx={{ ...titleStyle }}>
            About
          </Typography>
          <Typography variant="h4" component="h4" sx={{ ...hStyle }}>
            Our Story
          </Typography>
          <Typography variant="p" component="p" sx={{ ...pStyle }}>
            {t("about-text", { ns: "about" })}
            {/* Established since 2022, Aigma PTE Ai has been a trusted choice for{" "}
            <br />
            many students who aspire to pass the English Proficiency Test –
            <br />
            Pearson Test of English – Academic for immigration and study
            <br />
            purposes.
            <br />
            <br />
            We are proud to say that we have helped over thousand of PTE <br />
            aspirants of different nationalities achieve their scores. At
            iSmart, it is <br /> not just about teaching, it is also about
            constantly motivating our <br /> students, and being with them in
            their PTE journey. */}
          </Typography>
        </Box>
        <Box sx={{ ...boxTwoStyle, position: "relative" }}>
          <Box sx={{ ...imgBox }}>
            <img
              src={
                process.env.REACT_APP_FRONTEND_URL +
                "Image/everyone-has-story-text-written-typewriter-181088741.jpg"
              }
              alt="imgUp"
              style={{ ...imgStyle }}
            />
          </Box>
          <Box sx={{ ...imgBox }}>
            <img
              src={
                process.env.REACT_APP_FRONTEND_URL +
                "Image/road-going-up-as-arrow-sky-highway-63640347.jpg"
              }
              alt="imgUp"
              style={{ ...imgStyle }}
            />
          </Box>
          {/* <Box
            sx={{
              position: "absolute",
              top: "-10%",
              right: "-2%",
              zIndex: 1,
              background:
                "linear-gradient(356deg, rgba(188,185,251,1) 29%, rgba(135,202,255,1) 46%)",
              width: "10rem",
              height: "110%",
            }}
          ></Box> */}
          {/* <Box
            sx={{
              position: "absolute",
              bottom: "-10%",
              right: "-2%",
              zIndex: 1,
              background:
                "linear-gradient(356deg, rgba(188,185,251,1) 29%, rgba(135,202,255,1) 46%)",
              width: "110%",
              height: "1%",
            }}
          ></Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "-15%",
              right: "-2%",
              zIndex: 1,
              background:
                "linear-gradient(356deg, rgba(188,185,251,1) 29%, rgba(135,202,255,1) 46%)",
              width: "130%",
              height: "1%",
            }}
          ></Box> */}
        </Box>
      </Box>
    </>
  );
}

export default PteAbout;
