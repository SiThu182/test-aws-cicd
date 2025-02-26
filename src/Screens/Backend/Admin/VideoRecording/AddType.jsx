import { Box, Typography } from "@mui/material";
import React from "react";
import BackButton from "../../../../components/Backend/BackButton";
import PageNavTitle from "../../../../components/Backend/PageTitle";
import VideoRecordingTypeForm from "../../../../components/Backend/Admin/Posts/VideoRecordingTypeForm";

const AddType = () => {
  return (
    <>
      <Box id="main" sx={{ width: "100%", p: 4 }}>
        <PageNavTitle text="Video Recording Type" />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 0 }}>
            Add Video Recording Type
          </Typography>
          <BackButton />
        </Box>
        <VideoRecordingTypeForm
          edit=""
          //   category="video-recording"
          addPath="video-recording-type"
        ></VideoRecordingTypeForm>
      </Box>
    </>
  );
};

export default AddType;
