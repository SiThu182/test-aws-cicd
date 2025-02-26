import { Box, Typography } from "@mui/material";
import React from "react";

import FeedbackFormComponent from "../../../../components/Backend/Admin/Posts/FeedbackForm";
import BackButton from "../../../../components/Backend/BackButton";
import PageNavTitle from "../../../../components/Backend/PageTitle";

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
          <Typography variant="h5"> Add Student Feedback Form</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 2 }}>
            Add student feedback
          </Typography>
          <BackButton />
        </Box>
      
        <FeedbackFormComponent
          edit=""
          //   category="video-recording"
          addPath="student-feedbacks"
        ></FeedbackFormComponent>
      </Box>
    </>
  );
};

export default Add;
