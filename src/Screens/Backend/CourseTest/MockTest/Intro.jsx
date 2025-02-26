import { StopCircle } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button,  Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RecordRTCPromisesHandler } from "recordrtc";

function Intro(props) {
  let navigate = useNavigate();

  let [beginningCounterCount, setBeginningCounterCount] = useState(25);
  let [beginningStatus, setBeginningStatus] = useState(true);
  // let [audioPlay, setAudioPlay] = useState(false);
  let [recordingCount, setRecordingCount] = useState(0);
  let [recordingStatus, setRecordingStatus] = useState(false);

  let [recorder, setRecorder] = useState();
  let [blocked, setBlocked] = useState();
  let [blob, setBlob] = useState();
  let [blobUrl, setBlobUrl] = useState();
  let [finish, setFinish] = useState(false);
  let frontendURL = process.env.REACT_APP_FRONTEND_URL;
  useEffect(() => {
    let beginInterval = (flag) => {
      if (flag) {
        const interval = setInterval(() => {
          setBeginningCounterCount((prev) => prev - 1);
        }, 1000);
        return interval;
      }
    };
    let interval = beginInterval(beginningStatus);
    return () => clearInterval(interval);
  }, [beginningStatus]);

  useEffect(() => {
    if (beginningCounterCount === 0) {
    
      let audioPlay = () => {
        let audio = new Audio(frontendURL + "/beep.mp3");
        audio.play();
        audio.onended = () => {
         
          recorder.startRecording();
        };
      };

      setBeginningStatus(false);
      setBeginningCounterCount(25);
      setRecordingStatus(true);
      audioPlay();
    }
  }, [beginningCounterCount, recorder]);

  useEffect(() => {
    if (!beginningStatus && recordingStatus) {
      let recordInterval = (flag) => {
        if (flag) {
          const interval = setInterval(() => {
            setRecordingCount((prev) => prev + 1);
          }, 1000);
          return interval;
        }
      };
      let interval = recordInterval(recordingStatus);
      return () => clearInterval(interval);
    }
  }, [beginningStatus, recordingStatus, recorder]);

  useEffect(() => {
    if (recordingCount >= 25) {
      setRecordingStatus(false);

      let blobUrlFunction = async () => {
        
        await recorder.stopRecording();
       
        let bLOB = await recorder.getBlob();
    ;
        const blobURL = URL.createObjectURL(bLOB);
        
    
        setBlobUrl(blobURL);
        setBlob(bLOB);
      };
      blobUrlFunction();
      setRecordingCount(0);

      setFinish(true);
    }
  }, [recordingCount, recorder, blob]);

  const clickHandler = () => {
    props.setIntro(false);
  };

  //checkPermission
  useEffect(() => {
    async function checkAudioPermission() {
      try {
        let stream = await navigator.mediaDevices.getUserMedia(
          { audio: true },
          () => {
           
            setBlocked(false);
          },
          () => {
         
            setBlocked(true);
          }
        );
        setRecorder(new RecordRTCPromisesHandler(stream, { type: "audio" }));
      } catch (error) {
        console.log("Please enable your audio permission:", error);
      }
    }
    checkAudioPermission();
    navigator.permissions
      .query({ name: "microphone" })
      .then((permissionObj) => {
        if (permissionObj.state === "denied") {
          alert(
            "Please allow microphone access as we need to record the voice and make score calculation or you may face errors in recording"
          );
        }
      })
      .catch((error) => {
        console.log("Got error :", error);
      });
  }, []);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ my: 2, mr: 2 }}
          onClick={() => navigate("/mocktest/tabs")}
        >
          <LogoutIcon />
          <Typography>Exit</Typography>
        </Button>
      </Box>
      <Box
        width="100%"
        sx={{
          backgroundColor: "rgb(231,239,254)",
          px: {
            xs: 2,
            sm: 5,
            md: "8rem",
            lg: "10rem",
            xl: "20rem",
          },
          // height: "30rem",
          heigth: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "2rem",
            p: 2,
            boxShadow: 5,
          }}
        >
          <Box
            sx={{
              width: "100%",

              pl: 3,
            }}
          >
            <Typography variant="h6">
              Read the prompt below.In 25 seconds you must reply in your own
              words,as naturally and clearly as possible.You have 25 seconds to
              record your response.
            </Typography>
            <Typography>
              Please introduce yourself.For example,you could talk about one of
              the following.
            </Typography>
            <Box sx={{ mt: "1rem", pl: 3 }}>
              <Typography variant="span">
                <ul>
                  <li>Your interests</li>
                  <li>Your plan for future study </li>
                  <li>Why you want to study abroad</li>
                  <li>Why you need to learn English</li>
                  <li>Why you choose this test</li>
                </ul>
              </Typography>
            </Box>
          </Box>
          {/* Audio */}
          <Box
            sx={{
              width: {
                md: "40%",
                sm: "50%",
                xs: "100%",
              },
              height: "10rem",
              my: "1rem",
              mx: "auto",
              border: "2px solid whitesmoke",
              borderRadius: "1rem",
              boxShadow: "0 0 5px black",
            }}
          >
            <Box
              sx={{
                display: "flex",
                height: "80%",
              }}
            >
              <Box
                sx={{
                  width: "85%",
                  borderBottom: "1px solid black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Typography sx={{ mr: "16px" }}>Audio Recorder</Typography> */}
                <br />
                {beginningStatus && (
                  <Typography>
                    Beginning in 00 :{" "}
                    {beginningCounterCount < 10
                      ? "0" + beginningCounterCount
                      : beginningCounterCount}{" "}
                    seconds
                  </Typography>
                )}
                {!beginningStatus && recordingStatus && (
                  <Typography>
                    Recording 00 :
                    {recordingCount < 10
                      ? "0" + recordingCount
                      : recordingCount}{" "}
                    seconds
                  </Typography>
                )}
                {!beginningStatus && !recordingStatus && (
                  <Typography>Finished recording</Typography>
                )}
              </Box>

              <Box
                sx={{
                  width: "15%",
                  borderLeft: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              ></Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                height: "20%",
                backgroundColor: "silver",
                borderBottomLeftRadius: "1rem",
                borderBottomRightRadius: "1rem",
              }}
            >
              <Button
                sx={{
                  borderRadius: 0,
                  borderRight: "1px solid black",
                }}
              >
                <StopCircle
                  sx={{ color: recordingStatus ? "red" : "black" }}
                ></StopCircle>
              </Button>
              {/* <Button
              sx={{
                width: "10%",
                borderRadius: 0,
                borderRight: "1px solid black",
              }}
            >
              <PlayArrow sx={{ color: "black" }}></PlayArrow>
            </Button> */}

              <Box sx={{ width: "90%", margin: "auto 2px" }}>
                {/* <LinearProgress variant="determinate" value={30} /> */}
                <audio
                  controls
                  src={blobUrl}
                  style={{
                    height: "1rem",
                    width: "100%",
                  }}
                ></audio>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",

          display: "flex",
          mt: 2,

          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          sx={{ height: "30%", mr: 3 }}
          // disabled={beginningStatus ? true : false}
          onClick={clickHandler}
        >
          Next
        </Button>
      </Box>
    </>
  );
}

export default Intro;
