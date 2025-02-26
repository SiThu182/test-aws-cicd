import { Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import React, { useContext, useRef } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { DataForAnswerContext } from "../../../Screens/Backend/CourseTest/Reading/ReorderParagraph/Test";
import { DataForRmcAnswerContext } from "../../../Screens/Backend/CourseTest/Reading/ChooseMultipleAns/Test";
import ReusableScoreMultipleChoiceContent from "./ScoreDialogContent/ReusableScoreContent";
import { DataForRfibAnswerContext } from "../../../Screens/Backend/CourseTest/Reading/FIB/Test";
import { DataForRwfibAnswerContext } from "../../../Screens/Backend/CourseTest/Reading/R&WFIB/Test";
import ReusableScoreWritingContent from "./ScoreDialogContent/ReusableScoreWritingContent";
import { DataForMcAnswerContext } from "../../../Screens/Backend/CourseTest/Listening/ChooseMultipleAns/Test";
import { DataForFibAnswerContext } from "../../../Screens/Backend/CourseTest/Listening/FillInBlank/Test";
import { DataForHiwAnswerContext } from "../../../Screens/Backend/CourseTest/Listening/HighlightIncorrectWords/Test";
import ReusableScoreSpeakingContent from "./ScoreDialogContent/ReusableScoreSpeakingContent";
function ScoreDialog(props) {
  const { open, setOpen, userAnswer, category } = props;

  const contentRop = useContext(DataForAnswerContext);
  // const correctRsmcValue = useContext(DataForRsmcAnswerContext);
  const correctRmcAnswer = useContext(DataForRmcAnswerContext);
  const correctMcAnswer = useContext(DataForMcAnswerContext);
  const correctRfibAnswer = useContext(DataForRfibAnswerContext);
  const correctFibAnswer = useContext(DataForFibAnswerContext);
  const correctRwfibAnswer = useContext(DataForRwfibAnswerContext);
  const correctHiwAnswer = useContext(DataForHiwAnswerContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth={true}
      sx={{
        zIndex: 1900,
        backgroundColor: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(5px)",
      }}
      maxWidth={"md"}
      onClose={handleClose}
      open={open}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          // color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Typography variant="h5" my={2}>
          Score
        </Typography>
        {(category === "ra" ||
          category === "rs" ||
          category === "rl" ||
          category === "rts" ||
          category === "di" ||
          category === "asq") && (
          <ReusableScoreSpeakingContent
            userAnswer={
              userAnswer !== null &&
              userAnswer?.userAnswer !== undefined &&
              userAnswer?.userAnswer !== ""
                ? userAnswer?.userAnswer
                : null
            }
            keyword_length={userAnswer?.keyword_length}
            rec_duration={userAnswer?.recordingSecond}
            points={
              userAnswer !== null &&
              userAnswer?.point_detail !== undefined &&
              userAnswer?.point_detail !== ""
                ? JSON.parse(userAnswer?.point_detail)
                : null
            }
            overallPoint={userAnswer !== null ? userAnswer?.point : 0}
            category={category}
          ></ReusableScoreSpeakingContent>
        )}

        {(category === "rsmc" ||
          category === "smc" ||
          category === "hcs" ||
          category === "smw") && (
          <ReusableScoreMultipleChoiceContent
            value={userAnswer !== null ? userAnswer?.point : 0}
            maxValue={1}
            category={category}
          ></ReusableScoreMultipleChoiceContent>
        )}
        {category === "rmc" && (
          <ReusableScoreMultipleChoiceContent
            value={userAnswer !== null ? userAnswer?.point : 0}
            maxValue={correctRmcAnswer.count}
            category={category}
          ></ReusableScoreMultipleChoiceContent>
        )}
        {category === "rfib" && (
          <ReusableScoreMultipleChoiceContent
            value={userAnswer !== null ? userAnswer?.point : 0}
            maxValue={correctRfibAnswer.count}
            category={category}
          ></ReusableScoreMultipleChoiceContent>
        )}
        {category === "rop" && (
          <ReusableScoreMultipleChoiceContent
            value={userAnswer !== null ? userAnswer?.point : 0}
            maxValue={contentRop?.split(",").length - 1}
            category={category}
          />
        )}
        {category === "rwfib" && (
          <ReusableScoreMultipleChoiceContent
            value={userAnswer !== null ? userAnswer?.point : 0}
            maxValue={correctRwfibAnswer?.count}
            category={category}
          />
        )}
        {(category === "swt" ||
          category === "we" ||
          category === "sst" ||
          category === "wemail" ||
          category === "wfd") && (
          <>
            <ReusableScoreWritingContent
              points={
                userAnswer !== null &&
                userAnswer?.point_detail !== undefined &&
                userAnswer?.point_detail !== ""
                  ? JSON.parse(userAnswer?.point_detail)
                  : null
              }
              userAnswer={userAnswer?.userAnswer}
              overallPoint={userAnswer !== null ? userAnswer?.point : 0}
              category={category}
            ></ReusableScoreWritingContent>
          </>
        )}
        {category === "mc" && (
          <ReusableScoreMultipleChoiceContent
            value={userAnswer !== null ? userAnswer?.point : 0}
            maxValue={correctMcAnswer.count}
            category={category}
          ></ReusableScoreMultipleChoiceContent>
        )}
        {category === "fib" && (
          <ReusableScoreMultipleChoiceContent
            value={userAnswer !== null ? userAnswer?.point : 0}
            maxValue={correctFibAnswer.count}
            category={category}
          ></ReusableScoreMultipleChoiceContent>
        )}
        {category === "hiw" && (
          <ReusableScoreMultipleChoiceContent
            value={userAnswer !== null ? userAnswer?.point : 0}
            maxValue={correctHiwAnswer.count}
            category={category}
          ></ReusableScoreMultipleChoiceContent>
        )}

        {/* <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={() => reset()}>
                Try Again
              </Button>
            </Box> */}
      </DialogContent>
    </Dialog>
  );
}

export default ScoreDialog;
