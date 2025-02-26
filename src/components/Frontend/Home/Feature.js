import DescriptionIcon from "@mui/icons-material/Description";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import HelpIcon from "@mui/icons-material/Help";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

function Feature() {
  const { t } = useTranslation();
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
  const pStyle = {
    width: "100%",
    color: "#757575",
    fontSize: {
      xs: "0.8rem",
      sm: "1rem",
      md: "0.9rem",
      lg: "1.2rem",
    },
    mb: 2,
    minHeight: {
      md: "10rem",
      xs: "5rem",
    },
    textAlign: "center",
  };

  const featureTitle = {
    width: "100%",
    color: "#0CAFFF",
    fontWeight: "600",
    fontSize: {
      xs: "1rem",
      sm: "1rem",
      md: "1.1rem",
      lg: "1.5rem",
    },
    pt: 1,
    my: "auto 0",
    height: "4rem",
    textAlign: "center",
  };

  const featureBox = {
    p: 2,
    textAlign: "center",
    background: "#0CAFFF",
    borderRadius: "50%",
    width: "5rem",
    height: "5rem",
    position: "relative",
    m: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: 5,
  };

  return (
    <Box sx={{ backgroundColor: "FFF", py: 10 ,}}>
      {/* rgb(227,242,253) */}
      <Typography variant="h3" sx={{ ...hStyle }}>
        Aigma Pte Ai <span style={{ color: "#0CAFFF" }}>Feature</span>
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: {
            xs: "column",
            sm: "row",
            md: "row",
          },

          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "20%",
            },
          }}
        >
          <Box sx={{ ...featureBox }}>
            <i
              className="fa-solid fa-brain fa-2xl"
              style={{
                color: "white",
              }}
            ></i>
            <span
              style={{
                position: "absolute",
                top: "30%",
                left: "35%",
                fontWeight: "600",
                color: "#0CAFFF",
              }}
            >
              A i
            </span>
          </Box>
          <Typography sx={{ ...featureTitle }}>
            {t("aiScoring", { ns: "aiFeature" })}
          </Typography>
          <Typography sx={{ ...pStyle }}>
            {t("aiScoringDescription", { ns: "aiFeature" })}
          </Typography>
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "20%",
            },
          }}
        >
          <Box sx={{ ...featureBox }}>
            <HelpIcon sx={{ fontSize: "2rem", color: "white" }}></HelpIcon>
          </Box>
          <Typography sx={{ ...featureTitle }}>
            {t("latestQuestion", { ns: "aiFeature" })}
          </Typography>
          <Typography sx={{ ...pStyle }}>
            {t("latestQuestionDescription", { ns: "aiFeature" })}
          </Typography>
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "20%",
            },
          }}
        >
          <Box sx={{ ...featureBox }}>
            <PendingActionsIcon
              sx={{ fontSize: "2rem", color: "white" }}
            ></PendingActionsIcon>
          </Box>
          <Typography sx={{ ...featureTitle }}>
            {t("class", { ns: "aiFeature" })}
          </Typography>
          <Typography sx={{ ...pStyle }}>
            {t("classDescription", { ns: "aiFeature" })}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "20%",
            },
          }}
        >
          <Box sx={{ ...featureBox }}>
            <PendingActionsIcon
              sx={{ fontSize: "2rem", color: "white" }}
            ></PendingActionsIcon>
          </Box>
          <Typography sx={{ ...featureTitle }}>Practice </Typography>
          <Typography sx={{ ...pStyle }}>
            {t("practice", { ns: "aiFeature" })}
          </Typography>
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "20%",
            },
          }}
        >
          <Box sx={{ ...featureBox }}>
            <PendingActionsIcon
              sx={{ fontSize: "2rem", color: "white" }}
            ></PendingActionsIcon>
          </Box>
          <Typography sx={{ ...featureTitle }}>
            {t("mt", { ns: "aiFeature" })}
          </Typography>
          <Typography sx={{ ...pStyle }}>
            {t("mtDescription", { ns: "aiFeature" })}
          </Typography>
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "20%",
            },
          }}
        >
          <Box sx={{ ...featureBox }}>
            <DescriptionIcon
              sx={{ fontSize: "2rem", color: "white" }}
            ></DescriptionIcon>
          </Box>
          <Typography sx={{ ...featureTitle }}>
            {t("smt", { ns: "aiFeature" })}
          </Typography>
          <Typography sx={{ ...pStyle }}>
            {t("smtDescription", { ns: "aiFeature" })}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",

          alignItems: "center",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "20%",
            },
          }}
        >
          <Box sx={{ ...featureBox }}>
            <FactCheckIcon
              sx={{ fontSize: "2rem", color: "white" }}
            ></FactCheckIcon>
          </Box>

          <Typography sx={{ ...featureTitle }}>
            {t("check", { ns: "aiFeature" })}
          </Typography>
          <Typography sx={{ ...pStyle }}>
            {t("checkDescription", { ns: "aiFeature" })}
          </Typography>
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "20%",
            },
          }}
        >
          <Box sx={{ ...featureBox }}>
            <OnlinePredictionIcon
              sx={{ fontSize: "2rem", color: "white" }}
            ></OnlinePredictionIcon>
          </Box>
          <Typography sx={{ ...featureTitle }}>
            {t("predict", { ns: "aiFeature" })}
          </Typography>
          <Typography sx={{ ...pStyle }}>
            {t("predictDescription", { ns: "aiFeature" })}
          </Typography>
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "20%",
            },
          }}
        >
          <Box sx={{ ...featureBox }}>
            <NewspaperIcon
              sx={{ fontSize: "2rem", color: "white" }}
            ></NewspaperIcon>
          </Box>
          <Typography sx={{ ...featureTitle }}>
            {t("blog", { ns: "aiFeature" })}
          </Typography>
          <Typography sx={{ ...pStyle }}>
            {t("blogDescription", { ns: "aiFeature" })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Feature;
