import { Box, Typography } from "@mui/material";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import AnswerContent from "../AnswerTabContent/AnswerContent";

function ReusableScoreMultipleChoiceContent(props) {
  const { value, maxValue, correctAnswer, category } = props;

  return (
    <>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Box
          sx={{
            display: {
              md: "flex",
              sm: "column",
              xs: "column",
            },
            width: "100%",
            margin: "0 auto",
            justifyContent: {
              md: "space-evenly",
              sm: "center",
              xs: "center",
            },
            alignItems: "center",
            pl: {
              md: 4,
              sm: 0,
              xs: 0,
            },
            py: 3,
            //   backgroundColor: "#fff",
            borderRadius: "1rem",
          }}
        >
          <Box sx={{ width: "30%", margin: "0 auto" }}>
            <h3
              style={{
                whiteSpace: "nowrap",
                textAlign: "center",
                my: 2,
              }}
            >
              Mark
            </h3>
            <CircularProgressbar
              value={value}
              maxValue={maxValue}
              text={value + "/" + maxValue}
            />
          </Box>
          <AnswerContent category={category}></AnswerContent>
          <br />
        </Box>
      </Box>
    </>
  );
}

export default ReusableScoreMultipleChoiceContent;
