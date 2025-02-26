import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { colorCode } from "../../../components/Colors/ReusableColorCode";
import QAaccordion from "../../../components/Frontend/FeedbackForm/QAaccordion";
import PageNavTitle from "../../../components/Backend/PageTitle";

function QuestionAndAnswerPage() {
  const [expanded, setExpanded] = React.useState(false);


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <PageNavTitle text={"Q & A"}></PageNavTitle>
      <Box
        sx={{
          backgroundColor: colorCode.homeFrontColor.lightBlue,
          minHeight: "40vh",
          width: "100%",
        }}
      >
        <Box sx={{ width: "100%", mt: 3 }}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Q & A{" "}
          </Typography>
          <QAaccordion
            title="Which browser is most suitable for this website?"
            content={
              <Typography>
                Works best on Google Chrome .Download latest version of chrome
                at{" "}
                <a
                  href="https://www.google.com/chrome/"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.google.com/chrome/
                </a>
              </Typography>
            }
            expanded={expanded}
            handleChange={handleChange}
            panel={"panel1"}
          />
          <QAaccordion
            title="Audio Problem"
            content={
              "If the notification alert shows audio cannot start .You can check the microphone acees is allowed or not and then reload with hard reload button at side bar."
            }
            expanded={expanded}
            handleChange={handleChange}
            panel={"panel2"}
          />
          <QAaccordion
            title="Internet Problem"
            content={"Coming Soon ..."}
            expanded={expanded}
            handleChange={handleChange}
            panel={"panel3"}
          />{" "}
          <QAaccordion
            title="Image Problem"
            content={"Coming Soon ..."}
            expanded={expanded}
            handleChange={handleChange}
            panel={"panel4"}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default QuestionAndAnswerPage;
