import { Box, Typography } from "@mui/material";
import React from "react";

import BackButton from "../../../../components/Backend/BackButton";
import BannerForm from "../../../../components/Backend/Admin/Posts/BannerForm";
import DiscountCouponForm from "../../../../components/Backend/Admin/Posts/DiscountForm";

const DiscountAdd = () => {
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
          <Typography variant="h5">Discount</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 0 }}>
            Add Discount
          </Typography>
          <BackButton />
        </Box>
        <DiscountCouponForm />
      </Box>
    </>
  );
};

export default DiscountAdd;
