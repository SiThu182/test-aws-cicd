import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import BtnComponent from "./BtnComponent";
// import TextToSpeech from "../../../Screens/Backend/CourseTest/Speaking/ReadAloud/TextToSpeak";
function PracticeButtonAndFunction(props) {
  const {
    next,
    prev,
    option,
    submit,
    reset,
    error,
    retry,
    disableSubmit,
    disableAudioText,
    disablePrev,
    disableNext,
    disableReset,
    page,
    goToPage,
    category,
    audioText,
    audio,
    answerTemplate,
    disableAnswer,
  } = props;

  const [showAudioText, setShowAudioText] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const answerCategory = [
    "rl",
    "rts",
    "di",
    "asq",
    "mc",
    "smc",
    "fib",
    "hiw",
    "hcs",
    "smw",
    "rsmc",
    "rmc",
    "rfib",
    "rwfib",
    "rop",
    "rsmc",
    "rmc",
    "rfib",
    "rwfib",
    "rop",
    "swt",
    "we",
    "sst",
    "wfd",
  ];

  const audioTextCategory = [
    "ra",
    "rs",
    "rl",
    "rts",
    "asq",
    "sst",
    "wfd",
    "mc",
    "smc",
    "fib",
    "hiw",
    "hcs",
    "smw",
  ];

  const speakingCategory = ["ra", "rs", "rl", "di", "asq", "rts"];

  const listeningCategory = [
    "smc",
    "mc",
    "fib",
    "hiw",
    "hcs",
    "smw",
    "sst",
    "wfd",
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          my: 2,
          flexWrap: "wrap",
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            position: "relative",
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
          <BtnComponent
            disabledBtn={disableSubmit}
            onClickFun={submit}
            name={"Submit"}
          />
          <BtnComponent
            disabledBtn={disableReset}
            onClickFun={reset}
            name={"Reset"}
          />

          {audioTextCategory.includes(category) && (
            <BtnComponent
              disabledBtn={disableAudioText}
              setShowAudioText={setShowAudioText}
              name={category === "ra" || category === "rs" ? "Answer" : "Audio"}
            />
          )}
          {answerCategory.includes(category) && (
            <BtnComponent
              disabledBtn={disableAnswer}
              setShowAudioText={setShowAnswer}
              name={"Answer"}
            />
          )}

          {/* <Box
          sx={{
            position: {
              // xs: "absolute",
              md: "relative",
            },
            bottom: {
              xs: "-2.5rem",
              md: 0,
            },
          }}
        >
          <Button
            variant="contained"
            onClick={() => reset()}
            disabled={disableReset}
            sx={{ mr: 2, my: 1, fontSize: "0.8rem", p: 1 }}
          >
            Restart
          </Button>
          {audioTextCategory.includes(category) && (
            <Button
              variant="contained"
              disabled={disableAudioText}
              onClick={() => setShowAudioText((prev) => !prev)}
              sx={{ my: 1 }}
            >
              Audio Text
            </Button>
          )}
        </Box> */}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "start",
              md: "end",
            },
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
          <BtnComponent
            disabledBtn={disablePrev}
            onClickFun={prev}
            name={"Prev"}
          />
          <select
            value={page}
            style={{
              boxShadow: "0 0 0.1rem #000",
              borderRadius: "1rem",
              marginRight: "0.5rem",
            }}
            onChange={(e) => goToPage(e)}
          >
            {option}
          </select>

          <BtnComponent
            disabledBtn={disableNext}
            onClickFun={next}
            name={"Next"}
          />
        </Box>
      </Box>
      {showAudioText && (
        <Box
          sx={{
            my: 2,
            width: "100%",
            backgroundColor: "white",
            boxShadow: 3,
            p: 2,
            borderRadius: "1rem",
          }}
        >
          <Typography variant="h6">
            {category === "ra" || category === "rs" ? "Answer" : "Audio"}
          </Typography>
          <Typography sx={{ color: "green", mt: 2, mb: 3 }}>
            {audioText !== null && audioText !== undefined
              ? audioText
              : "Transcript not available"}
          </Typography>

          {/* <Typography>

            <TextToSpeech text={audioText} />
          </Typography> */}
          {audio !== null && audio !== undefined && (
            <Box
              sx={{
                mt: "2",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <audio src={audio} controls></audio>
            </Box>
          )}
        </Box>
      )}
      {showAnswer && (
        <Box
          sx={{
            my: 2,
            width: "100%",
            backgroundColor: "white",
            boxShadow: 3,
            p: 2,
            borderRadius: "1rem",
          }}
        >
          <Typography variant="h6">
            {category === "rl" || category === "rts" || category === "di"
              ? "Answer Template"
              : "Answer"}
          </Typography>
          <Typography sx={{ color: "green", mt: 2, mb: 3 }}>
            {answerTemplate !== null && answerTemplate !== "null"
              ? answerTemplate
              : "Answer not available"}
          </Typography>
        </Box>
      )}
      {error && (
        <>
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              backgroundColor: "#fff",
            }}
          >
            <Typography sx={{ textAlign: "center", color: "red", p: 2 }}>
              Something went wrong.Please retake test after checking your
              Internet and Mic .
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right", mt: 3 }}>
            <Button variant="contained" onClick={() => reset()}>
              Retake
            </Button>
          </Box>
        </>
      )}

      {retry &&
        (speakingCategory.includes(category) ? (
          <Box
            sx={{
              my: 2,
              width: "100%",
              backgroundColor: "white",
              boxShadow: 3,
              p: 2,
              borderRadius: "1rem",
            }}
          >
            <Typography sx={{ color: "red" }}>
              Your voice cannot be recognized . Please speak loud and clear into
              the microphone
            </Typography>
            <small style={{ color: "green" }}>
              Score Token is not reduced{" "}
            </small>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={() => reset()}>
              Try Again
            </Button>
          </Box>
        ))}
    </>
  );
}

export default PracticeButtonAndFunction;
