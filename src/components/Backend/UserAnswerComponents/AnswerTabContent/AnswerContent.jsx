import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { DataForAnswerContext } from "../../../../Screens/Backend/CourseTest/Reading/ReorderParagraph/Test";
import { DataForRsmcAnswerContext } from "../../../../Screens/Backend/CourseTest/Reading/ChooseSingleAns/Test";
import { DataForRmcAnswerContext } from "../../../../Screens/Backend/CourseTest/Reading/ChooseMultipleAns/Test";
import { DataForRfibAnswerContext } from "../../../../Screens/Backend/CourseTest/Reading/FIB/Test";
import { DataForRwfibAnswerContext } from "../../../../Screens/Backend/CourseTest/Reading/R&WFIB/Test";
import { DataForListeningSingleAnswerContext } from "../../../../Screens/Backend/CourseTest/Listening/ReusableTest";
import { DataForMcAnswerContext } from "../../../../Screens/Backend/CourseTest/Listening/ChooseMultipleAns/Test";
import { DataForFibAnswerContext } from "../../../../Screens/Backend/CourseTest/Listening/FillInBlank/Test";
import { DataForHiwAnswerContext } from "../../../../Screens/Backend/CourseTest/Listening/HighlightIncorrectWords/Test";
import { DataForReusableSpeakingComponent } from "../../../../Screens/Backend/CourseTest/Speaking/ReusableComponent";

function AnswerContent({ category }) {
  const contentRop = useContext(DataForAnswerContext);
  const contentRsOrAsq = useContext(DataForReusableSpeakingComponent);
  const correctRsmcValue = useContext(DataForRsmcAnswerContext);
  const correctLSingleAnswerValue = useContext(
    DataForListeningSingleAnswerContext
  );
  const correctRmcAnswer = useContext(DataForRmcAnswerContext);
  const correctMcAnswer = useContext(DataForMcAnswerContext);
  const correctRfibAnswer = useContext(DataForRfibAnswerContext);
  const correctRwfibAnswer = useContext(DataForRwfibAnswerContext);
  const correctFibAnswer = useContext(DataForFibAnswerContext);
  const correctHiwAnswer = useContext(DataForHiwAnswerContext);

  return (
    <Box sx={{ width: "auto", margin: "0 auto", p: 2 }}>
      <h3
        style={{
          whiteSpace: "nowrap",
          textAlign: "center",
          my: 2,
        }}
      >
        Correct Answer
      </h3>
      <Typography
        sx={{
          backgroundColor: "#384450",
          color: "#fff",
          mt: 2,
          textAlign: "center",
        }}
      >
        {category === "rs" && contentRsOrAsq}
        {category === "asq" && contentRsOrAsq}
        {category === "rsmc" && correctRsmcValue}
        {category === "rmc" && correctRmcAnswer.answerText}

        {category === "rwfib" && correctRwfibAnswer.answerText}
        {category === "rfib" && correctRfibAnswer.answerText}
        {category === "rop" && contentRop}

        {(category === "smc" || category === "hcs" || category === "smw") &&
          correctLSingleAnswerValue}
        {category === "mc" && correctMcAnswer.answerText}
        {category === "fib" && correctFibAnswer.answerText}
        {category === "hiw" && correctHiwAnswer.answerText}
      </Typography>
    </Box>
  );
}

export default AnswerContent;
