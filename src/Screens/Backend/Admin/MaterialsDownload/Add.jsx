import { Box, Typography } from "@mui/material";
import React from "react";

import BlogFormComponent from "../../../../components/Backend/Admin/Posts/BlogForm";
import BackButton from "../../../../components/Backend/BackButton";
import DownloadMaterialsForm from "../../../../components/Backend/Admin/Posts/DownloadMaterialsForm";

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
          <Typography variant="h5">Materials Download</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 0 }}>
            Add Material Download
          </Typography>
          <BackButton />
        </Box>

        <DownloadMaterialsForm />

        {/* <BlogFormComponent
          edit=""
          category="blog"
          addPath="blog"
        ></BlogFormComponent> */}
      </Box>
    </>
  );
};

export default Add;
