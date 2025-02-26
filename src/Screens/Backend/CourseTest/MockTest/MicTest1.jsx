import { StopCircle } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RecordRTCPromisesHandler } from "recordrtc";
import ExitConfirmBox from "./ExitConfirmBox";

function MicTest1(props) {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  let [recordingStatus, setRecordingStatus] = useState(false);
  const { systemErrorStatus } = useSelector((state) => state.systemInfoAlert);
  let [recorder, setRecorder] = useState();
  let [blocked, setBlocked] = useState();
  let [blob, setBlob] = useState();
  let [blobUrl, setBlobUrl] = useState();
  let [finish, setFinish] = useState(false);

  const clickHandler = () => {
    setRecordingStatus(true);
    recorder.startRecording();
  };

  const stateChange = () => {
    props.setMicTest1(false);
  };

  const stopRecording = () => {
    setRecordingStatus(false);
    let blobUrlFunction = async () => {
      await recorder.stopRecording();

      let bLOB = await recorder.getBlob();

      const blobURL = URL.createObjectURL(bLOB);

      setBlobUrl(blobURL);
      setBlob(bLOB);
    };
    blobUrlFunction();

    setFinish(true);
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
          onClick={() => setOpen(true)}
        >
          <LogoutIcon />
          <Typography>Exit</Typography>
        </Button>
      </Box>
      <ExitConfirmBox
        open={open}
        setOpen={setOpen}
        check={true}
      ></ExitConfirmBox>
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
          heigth: "30rem",
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
              Microphone Check
              <br /> This is an opportunity to check that your microphone is
              working correctly.
            </Typography>

            <Box sx={{ mt: "1rem", pl: 3 }}>
              <Typography variant="body6" sx={{ fontSize: "1.1rem" }}>
                <ul>
                  <li>
                    Make sure your headset is on and the microphone is in the
                    downward position near your mouth.
                  </li>
                  <li>
                    When you are ready, click on the Record button and say
                    "Testing, testing, one, two, three" into the microphone.
                  </li>
                  <li>
                    After you have spoken, click on the Stop
                    <i
                      className="fa-solid fa-circle-stop"
                      style={{ color: "#cd4518" }}
                    ></i>{" "}
                    button. Your recording is now complete.
                  </li>
                  <li>
                    Now click on the Playback ► button. You should clearly hear
                    yourself speaking.
                  </li>
                  <li>
                    If you can not hear your voice clearly, please contact
                    system administrator.
                  </li>
                  <li>
                    Note for the mock test (not mic check): You only need to
                    click next button when you have finished each question
                    during the test.The rest is automatic and no time or audio
                    skipping will be available during preparation or audio
                    playing.
                  </li>
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
                <Button
                  variant="contained"
                  onClick={clickHandler}
                  sx={{ display: recordingStatus || finish ? "none" : "" }}
                >
                  Record
                </Button>
                <br />
                {recordingStatus && <Typography>Recording ...</Typography>}
                {!recordingStatus && finish && (
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
                onClick={stopRecording}
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
                  src={blobUrl}
                  controls
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
          onClick={stateChange}
        >
          Next
        </Button>
      </Box>
    </>
  );
}

export default MicTest1;
