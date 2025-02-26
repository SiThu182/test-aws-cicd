import { Box, Typography } from "@mui/material";
import React from "react";

import BlogFormComponent from "../../../../components/Backend/Admin/Posts/BlogForm";
import BackButton from "../../../../components/Backend/BackButton";

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
          <Typography variant="h5">Blog</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 0 }}>
            Add Blog
          </Typography>
          <BackButton />
        </Box>
        <BlogFormComponent
          edit=""
          category="blog"
          addPath="blog"
        ></BlogFormComponent>
      </Box>
    </>
  );
};

export default Add;
