import { Box, Typography } from "@mui/material";
import React from "react";

import VideoRecordingFormComponent from "../../../../components/Backend/Admin/Posts/VideoRecordingForm";
import BackButton from "../../../../components/Backend/BackButton";
import PageNavTitle from "../../../../components/Backend/PageTitle";

const Add = () => {
  return (
    <>
      <Box id="main" sx={{ width: "100%", p: 4 }}>
        <PageNavTitle text="Video Recording" />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 0 }}>
            Add Video Recording
          </Typography>
          <BackButton />
        </Box>
        <VideoRecordingFormComponent
          edit=""
          //   category="video-recording"
          addPath="video-recording"
        ></VideoRecordingFormComponent>
      </Box>
    </>
  );
};

export default Add;
