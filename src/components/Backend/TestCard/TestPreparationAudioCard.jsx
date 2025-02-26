import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
function TestPreparationAudioCard(props) {
  const {
    status,
    loading,
    isPlaying,
    setIsPlaying,
    setPlayingStatus,
    playingStatus,
    playingCounterCount,
    startPlayingCounterCount,
    playPause,
    playAudio,
    // isStatusRecording,
    stoppedPlayingInterval,
    currentAudio,
    category,
    postsByPage,
  } = props;

  return (
    <Card sx={{ margin: "0 auto", width: "60%" }}>
      <CardHeader
        title={
          status === "succeeded" &&
          category == postsByPage?.data?.data[0]?.category ? (
            playingStatus ? (
              isPlaying ? (
                <Typography sx={{ textAlign: "center" }}>Playing</Typography>
              ) : (
                <Typography sx={{ textAlign: "center" }}>
                  Beginning in... 00:
                  {playingCounterCount < 10
                    ? "0" + playingCounterCount
                    : playingCounterCount}{" "}
                  seconds
                </Typography>
              )
            ) : (
              <Typography sx={{ textAlign: "center" }}>Finished</Typography>
            )
          ) : (
            <>
              <Box
                sx={{
                  width: "5%",
                  margin: "0 auto",
                }}
              >
                <CircularProgress sx={{ textAlign: "center" }} />
              </Box>
            </>
          )
        }
      />
      <hr></hr>
      <CardContent>
        {status === "loading" || status === "succeeded" ? (
          loading || playAudio.current === null ? (
            <Box
              sx={{
                width: "5%",
                margin: "0 auto",
              }}
            >
              <CircularProgress sx={{ textAlign: "center" }} />
            </Box>
          ) : (
            <>
              {status === "succeeded" &&
                playAudio.current !== null &&
                category == postsByPage?.data?.data[0]?.category && (
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={1}>
                        <button
                          onClick={playPause}
                          disabled={
                            // playAudio === "" ? true : isStatusRecording ? true : false
                            playingStatus ? false : true
                          }
                        >
                          {!playAudio.current.paused ? (
                            <PauseIcon></PauseIcon>
                          ) : (
                            <PlayArrowIcon></PlayArrowIcon>
                          )}
                        </button>
                      </Grid>
                      <Grid item xs={11}>
                        <LinearProgress
                          variant="determinate"
                          sx={{
                            height: 5,
                            borderRadius: 5,
                            marginTop: "0.8rem",
                            //  display: 'inline',
                          }}
                          value={
                            !stoppedPlayingInterval
                              ? (playingCounterCount /
                                  startPlayingCounterCount) *
                                100
                              : isPlaying && playingStatus
                              ? (currentAudio / playAudio.current.duration) *
                                100
                              : 100
                          }
                        />
                      </Grid>
                    </Grid>
                    {category == "rl" &&
                      stoppedPlayingInterval &&
                      isPlaying && (
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={() => {
                              playAudio.current.pause();
                              playAudio.current.currentTime =
                                playAudio.current.duration;
                              setIsPlaying(false);
                              setPlayingStatus(false);
                            }}
                          >
                            Skip
                          </Button>
                        </Box>
                      )}
                  </>
                )}
            </>
          )
        ) : (
          status === "failed" && (
            <Typography sx={{ textAlign: "center", color: "red" }}>
              Fail to fetch data
            </Typography>
          )
        )}

        <br></br>
        {postsByPage?.data?.data.length === 0 && (
          <Typography>No Content Yet</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default TestPreparationAudioCard;
