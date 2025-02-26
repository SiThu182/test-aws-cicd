import { StopCircle } from "@mui/icons-material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { requestAudio } from "../../../../customHooks/Permissions/RequestPermission";
import ExitConfirmBox from "./ExitConfirmBox";
import LogoutIcon from "@mui/icons-material/Logout";
// import { RecordRTCPromisesHandler } from "recordrtc";

function MicTest(props) {
  const [open, setOpen] = useState(false);
  let [audioCheck, setAudioCheck] = useState();

  let frontendURL = process.env.REACT_APP_FRONTEND_URL;
  //checkPermission
  useEffect(() => {
    requestAudio().catch(() => alert("No support Audio Permission"));
  }, []);

  const clickHandler = () => {
    setAudioCheck(true);
    let audio = new Audio(frontendURL + "/beep.mp3");
    audio.play();
    audio.onended = () => {
      setAudioCheck(false);
    };
  };

  const stateChange = () => {
    props.setMicTest(false);
  };
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
              Headset Check
              <br /> This is an opportunity to check that your headset is
              working correctly.
            </Typography>

            <Box sx={{ mt: "1rem", pl: 3 }}>
              <Typography variant="body6" sx={{ fontSize: "1.1rem" }}>
                <ul>
                  <li>
                    Put your headset on and adjust it so that it fits
                    comfortably over your ears.
                  </li>
                  <li>
                    When you are ready, click on the ► button. You will hear a
                    short recording.
                  </li>
                  <li>
                    If you do not hear anything in your headphones while the
                    status reads Playing, please contact the system
                    administrator.
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
                <Typography sx={{ mr: "16px" }}></Typography>
                <Typography>{audioCheck ? "Playing" : ""}</Typography>
                <Button variant="contained" onClick={clickHandler}>
                  <PlayArrowIcon></PlayArrowIcon>
                </Button>
                <br />
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
                  sx={{ color: audioCheck ? "red" : "black" }}
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
                  src={frontendURL + "/beep.mp3"}
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

export default MicTest;
