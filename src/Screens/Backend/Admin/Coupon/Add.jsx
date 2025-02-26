import { Box, Typography } from "@mui/material";
import React from "react";

import BackButton from "../../../../components/Backend/BackButton";

import CouponForm from "../../../../components/Backend/Admin/Posts/CouponForm";

const CouponAdd = () => {
  return (
    <>
      <Box id="main" sx={{ width: "100%", p: 4 }}>
        <Box
          sx={{
            top: "1rem",

            position: "absolute",
            overflow: "visible",
            zIndex: 1500,
          }}
        >
          <Typography variant="h5">Coupon</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 0 }}>
            Create Coupon
          </Typography>
          <BackButton />
        </Box>
        <CouponForm />
      </Box>
    </>
  );
};

export default CouponAdd;
