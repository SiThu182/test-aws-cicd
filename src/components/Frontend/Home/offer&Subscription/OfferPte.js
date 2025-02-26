// icon
import GradingIcon from "@mui/icons-material/Grading";
import SettingsIcon from "@mui/icons-material/Settings";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box, minHeight } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";

function OfferPte() {
  const { t } = useTranslation();
  //custom css and responsive value
  const offerBox = {
    textAlign: "center",
    px: 3,
  };
  const hStyle = {
    fontSize: {
      xs: "15px",
      sm: "17px",
      md: "1.7rem",
    },
    fontWeight: 600,
    py: "1rem",
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
    mb: 5,
  };

  const iconBox = {
    width: "100%",
    p: {
      md: 1,
      sm: 1,
      xs: 0,
    },
  };

  const iconStyle = {
    padding: "1rem",
    color: "#fff",
    fontSize: {
      xs: "5rem",
      sm: "5rem",
      md: "8rem",
    },
    // backgroundColor: "rgb(0,89,171)",
    backgroundColor: "#0CAFFF",
    borderRadius: "0.5rem",
    boxShadow: 3,
    height: {
      md: "10rem",
      xs: "5rem",
    },
    width: {
      md: "10rem",
      xs: "5rem",
    },
  };

  const titleStyle = {
    fontSize: {
      xs: "16px",
      sm: "17px",
      md: "1.3rem",
    },
    fontWeight: 500,
    py: {
      xs: 0.5,
      sm: 1,
      md: 2,
    },
    minHeight: "5rem",
  };
  return (
    <>
      {/* offerBox start */}
      <Box sx={{ ...offerBox, pt: 10 }}>
        {/* title  */}
        <Typography variant="h3" component="h3" sx={{ ...hStyle }}>
          {t("offer", { ns: "feature" })}
        </Typography>
        {/* info */}
        <Typography variant="p" component="p" sx={{ ...pStyle }}>
          {t("feature", { ns: "feature" })}
        </Typography>
        {/* offer icon and info grid start */}
        <Grid
          container
          justify="space-around"
          direction={{
            md: "row",
            sm: "row",
            xs: "column",
          }}
          alignItems="center"
          flexWrap="wrap"
          width={1}
          marginTop={5}
          sx={{
            "& .MuiGrid-container": {
              margin: "0 auto",
            },
          }}
        >
          {/* offer icon and info content */}
          <Grid item xs={0} md={0} lg={0} xl={2.25}></Grid>
          <Grid item xs={4} md={4} lg={4} xl={2.5}>
            <Box sx={{ ...iconBox }}>
              <Box
                sx={{
                  minHeight: "8rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <GradingIcon sx={{ ...iconStyle }}></GradingIcon>
              </Box>

              <Typography variant="h5" sx={{ ...titleStyle }} component="h5">
                {t("mt", { ns: "feature" })}
              </Typography>
              <Typography variant="p" component="p" sx={{ ...pStyle }}>
                {t("mtdescription", { ns: "feature" })}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4} md={4} lg={4} xl={2.5}>
            <Box sx={{ ...iconBox }}>
              <Box
                sx={{
                  minHeight: "8rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SettingsIcon sx={{ ...iconStyle }}></SettingsIcon>
              </Box>

              <Typography variant="h5" sx={{ ...titleStyle }} component="h5">
                {t("uiux", { ns: "feature" })}
              </Typography>
              <Typography variant="p" component="p" sx={{ ...pStyle }}>
                {t("uiuxDescription", { ns: "feature" })}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4} md={4} lg={4} xl={2.5}>
            <Box sx={{ ...iconBox }}>
              <Box
                sx={{
                  minHeight: "8rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextSnippetIcon sx={{ ...iconStyle }}></TextSnippetIcon>
              </Box>

              <Typography variant="h5" sx={{ ...titleStyle }} component="h5">
                {t("strategy", { ns: "feature" })}
              </Typography>
              <Typography variant="p" sx={{ ...pStyle }} component="p">
                {t("strategyDescription", { ns: "feature" })}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={0} md={0} lg={0} xl={2.25}></Grid>
        {/* offer icon and info grid end */}
      </Box>
      {/* offerBox end */}
    </>
  );
}

export default OfferPte;
