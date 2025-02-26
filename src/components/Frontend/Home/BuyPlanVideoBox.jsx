import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function BuyPlanVideoBox() {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef();
  const [vdSrc, setVdSrc] = useState(
    process.env.REACT_APP_BACKEND_URL + "/How-to-buy-subscription-plans.mp4"
  );

  useEffect(() => {
    if (videoRef.current !== null) {
      if (hovered) {
        try {
          videoRef.current?.play().catch((error) => {});
        } catch (error) {}
      } else {
        videoRef.current?.pause();
      }
    }
  }, [hovered]);
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        background: "white",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          m: {
            xs: 0,
            sm: 2,
          },
          padding: 2,
          display: "flex",
          // background: "whitesmoke",
          background: "blueGrey",

          justifyContent: "space-between",
          borderRadius: "0.5rem",
          boxShadow: 4,
          gap: "1rem",

          flexWrap: "wrap",
          maxWidth: "70vw",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "40%" } }}>
          <Typography variant="h4" sx={{ color: "#3f51b5", mb: "2rem" }}>
            {t("howBuy", { ns: "buyPage" })}
          </Typography>
          <Typography sx={{ color: "#000"}}>{t("howBuyDescription", { ns: "buyPage" })}</Typography>
          <Box sx={{ display: "flex", gap: "2rem", mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                setVdSrc(
                  process.env.REACT_APP_BACKEND_URL +
                    "/How-to-buy-subscription-plans.mp4"
                );
              }}
            >
              English
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setVdSrc(
                  process.env.REACT_APP_BACKEND_URL +
                    "/How-to-buy-subscription-plans-mm.mp4"
                );
              }}
            >
              Myanmar
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            minWidth: "15rem",
            position: "relative",
            overflow: "hidden",
            backgroundPosition: "center",
            transition: "1s ease",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={
              process.env.REACT_APP_FRONTEND_URL +
              "Image/subscription_banner.png"
            }
            alt="how-to-buy-plan-img"
            style={{
              display: hovered ? "none" : "block",
              objectFit: "cover",
              width: "100%",
              height: "100%",
              objectPosition: "center",
              overflow: "hidden",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 4,
            }}
            onLoad={() => setLoading(false)}
          />
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                zIndex: 5,
              }}
            >
              <CircularProgress sx={{ m: "auto" }}></CircularProgress>
            </Box>
          ) : (
            <>
              <video
                ref={videoRef}
                src={vdSrc}
                controls
                loop
                style={{ width: "100%", height: "100%" }}
              ></video>
            </>
          )}
        </Box>
      </Box>
    </section>
  );
}

export default BuyPlanVideoBox;
