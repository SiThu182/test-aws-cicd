import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
const AudioBox = ({
  status,
  loading,
  isPlaying,
  setIsPlaying,
  setPlayingStatus,
  playingStatus,
  playingCounterCount,
  startPlayingCounterCount,
  playAudio,
  playAudioRef,
  // isStatusRecording,
  stoppedPlayingInterval,

  category,

  postsByPage,
  setIsStartCounting,
  setplayingCounterCount,
  resetState,
  setStoppedPlayingInterval,
  isPlayingStatus,
  setIsPlayingStatus,
}) => {
  let [currentAudio, setCurrentAudio] = useState(0);

  let playingInterval = useCallback(
    (flag) => {
      if (
        !flag &&
        playAudioRef?.current !== null &&
        playAudioRef !== undefined
      ) {
        const interval = setInterval(() => {
          setplayingCounterCount((prevplaying) => prevplaying - 1);
        }, 1000);
        return interval;
      }
    },
    [playAudioRef, setplayingCounterCount]
  );
  //start playing counter count
  useEffect(() => {
    if (postsByPage.data !== undefined && loading === false && !resetState) {
      if (postsByPage.data.data[0] === undefined) {
      } else {
        let media_type = postsByPage.data.data[0].media_type;
        let media = postsByPage.data.data[0].media;
        playAudioRef.current = new Audio(
          media_type === "1"
            ? media
            : `${process.env.REACT_APP_BACKEND_URL}storage/sst/${media}`
        );
        let interval = playingInterval(stoppedPlayingInterval);
        return () => clearInterval(interval);
      }
    }
  }, [
    playingCounterCount,
    postsByPage,
    stoppedPlayingInterval,
    loading,
    playingInterval,
    playAudioRef,
    resetState,
  ]);

  //pause the player when component unmounts
  useEffect(() => {
    return () => {
      if (playAudioRef.current !== null) {
        playAudioRef.current.pause();
        playAudioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (
      playAudioRef.current !== undefined &&
      playAudioRef.current !== null &&
      playAudioRef.current !== ""
    ) {
      playAudioRef.current.onended = () => setIsStartCounting(true);
    }
  });
  useEffect(() => {
    if (playAudioRef?.current !== "") {
      let interval = playingInterval(stoppedPlayingInterval);
      return () => clearInterval(interval);
    }
  }, [playAudioRef, playingInterval, stoppedPlayingInterval]);

  //stop playing counter count
  useEffect(() => {
    if (playingCounterCount < 1) {
      setStoppedPlayingInterval(true);
      // setPlayAudio(new Audio(postsByPage.data.data[0].media));
    }
  }, [playingCounterCount, setStoppedPlayingInterval, postsByPage]);

  //start audio play
  useEffect(() => {
    if (stoppedPlayingInterval && playAudioRef.current !== null) {
      setIsPlaying(true);
      const playAudiofun = () => {
        if (playAudioRef.current.pause) {
          playAudioRef.current.play();
        }
        playAudioRef.current.onended = () => {
          setPlayingStatus(false);
          setIsPlaying(false);
        };
      };
      playAudiofun();
    }
  }, [stoppedPlayingInterval, playAudioRef]);
  let playPause = () => {
    if (playAudioRef.current !== "") {
      if (playingCounterCount >= 1) {
        setplayingCounterCount(0);
        setStoppedPlayingInterval(true);
      }
      let currentPlaying = true;
      // Get state of song
      currentPlaying = isPlayingStatus;

      if (playAudioRef.current.currentTime >= playAudioRef.current.duration) {
        currentPlaying = false;
      }

      if (currentPlaying) {
        // Pause the song if it is playing
        playAudioRef.current.pause();
      } else {
        // Play the song if it is paused
        playAudioRef.current.play();
      }
      setIsPlayingStatus(!isPlayingStatus);
    }

    // Change the state of song
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (playAudioRef.current !== null) {
        setCurrentAudio(() => playAudioRef.current.currentTime);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [playAudioRef]);
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
};

export default AudioBox;
