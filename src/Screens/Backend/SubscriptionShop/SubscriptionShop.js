import { Box, Typography } from "@mui/material";
import React from "react";

import SubscriptionTabs from "../../../components/Frontend/Home/offer&Subscription/SubscriptionTabs";

function SubscriptionShop() {
  localStorage.setItem("backToPath", "/admin/subscription-shop");
  return (
    <>
      <Box
        sx={{
          ml: "1.5rem",
          top: "1rem",
          position: "absolute",
          overflow: "visible",
          zIndex: 1500,
        }}
      >
        <Typography variant="h5" sx={{ ml: 1 }}>
          Subscription Shop
        </Typography>
      </Box>
      <Box
        sx={{
          borderRadius: "1rem",
          backgroundColor: "aliceblue",
          width: "80%",
          mx: "auto",
          p: 2,
          boxShadow: 5,
          mt: "2rem",
        }}
      >
        <SubscriptionTabs></SubscriptionTabs>
      </Box>
    </>
  );
}

export default SubscriptionShop;
