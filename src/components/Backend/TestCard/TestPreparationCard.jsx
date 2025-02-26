import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
const TestPreparationCard = (props) => {
  const {
    status,
    loading,
    isFinish,
    isStatusRecording,
    recordingCounterCount,
    beginningCounterCount,
    handlePause,
    handlePlay,
    waveformRef,
    audioPlay,
    skip,
    skipDisabled = false,
    resetState,
    finish,
  } = props;

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title={
          isFinish ? (
            <Typography sx={{ textAlign: "center" }}>Finished</Typography>
          ) : isStatusRecording ? (
            <Typography sx={{ textAlign: "center" }}>
              Recording... 00:
              {recordingCounterCount < 10
                ? "0" + recordingCounterCount
                : recordingCounterCount}{" "}
              seconds
            </Typography>
          ) : (
            <Typography sx={{ textAlign: "center" }}>
              Beginning in 00:
              {beginningCounterCount < 10
                ? "0" + beginningCounterCount
                : beginningCounterCount}{" "}
              seconds
            </Typography>
          )
        }
      />
      <hr></hr>
      <CardContent>
        {isStatusRecording === true && (
          <>
            <LinearProgress
              variant="determinate"
              sx={{
                height: 5,
                marginBottom: "1.5rem",
                borderRadius: 5,
              }}
              value={(recordingCounterCount / 40) * 100}
            />
          </>
        )}

        {isFinish ? (
          <>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                margin: "0 auto",
                justifyContent: {
                  md: "space-evenly",
                  sm: "center",
                  xs: "center",
                },
                pl: {
                  md: 4,
                  sm: 0,
                  xs: 0,
                },
                p: 2,
                mt: 5,
                backgroundColor: "#fff",
                borderRadius: "1rem",
                border: 0.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  height: 100,
                  width: { sm: "10%", md: "10%", xs: "15%" },
                  alignItems: "center",
                  margin: "0 auto",
                }}
              >
                {audioPlay == false ? (
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "#fff",
                      paddingLeft: "3px",
                      cursor: "pointer",
                    }}
                    onClick={handlePlay}
                  >
                    <PlayArrowIcon />
                  </button>
                ) : (
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "#fff",
                      paddingLeft: "3px",
                      cursor: "pointer",
                    }}
                    onClick={handlePause}
                  >
                    <PauseIcon />
                  </button>
                )}
              </Box>

              <Box
                sx={{
                  width: { sm: "80%", md: "90%", xs: "83%" },
                  margin: "0 auto",
                }}
              >
                <div ref={waveformRef}></div>
              </Box>
            </Box>
          </>
        ) : isStatusRecording ? (
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              style={{ margin: "0 auto" }}
              onClick={() => finish()}
            >
              Finish
            </Button>
          </Box>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              style={{ margin: "0 auto" }}
              disabled={
                loading === false &&
                !resetState &&
                status === "succeeded" &&
                !skipDisabled
                  ? false
                  : true
              }
              onClick={() => skip()}
            >
              Skip
            </Button>
          </Box>
        )}
        <br></br>
      </CardContent>
    </Card>
  );
};

export default TestPreparationCard;
