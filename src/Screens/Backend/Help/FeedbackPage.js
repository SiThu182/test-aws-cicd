import React from "react";
import PageNavTitle from "../../../components/Backend/PageTitle";
import FeedbackForm from "../../../components/Frontend/FeedbackForm/FeedbackForm";
import { Box } from "@mui/material";

function FeedbackPage() {
  return (
    <>
      <PageNavTitle text={"Feedback"}></PageNavTitle>
      <Box sx={{ width: "100%" }}>
        <h1>Feedback Form</h1>
        <FeedbackForm bgColor="rgb(231 239 254)" />
      </Box>
    </>
  );
}

export default FeedbackPage;
