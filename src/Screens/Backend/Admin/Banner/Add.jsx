import { Box, Typography } from "@mui/material";
import React from "react";

import BlogFormComponent from "../../../../components/Backend/Admin/Posts/BlogForm";
import BackButton from "../../../../components/Backend/BackButton";
import BannerForm from "../../../../components/Backend/Admin/Posts/BannerForm";

const Add = () => {
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
          <Typography variant="h5">Banner</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 0 }}>
            Add Banner Image
          </Typography>
          <BackButton />
        </Box>
        <BannerForm edit="" category="banner" addPath="banners"></BannerForm>
      </Box>
    </>
  );
};

export default Add;
