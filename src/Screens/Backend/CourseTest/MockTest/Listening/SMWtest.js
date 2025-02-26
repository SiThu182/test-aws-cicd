// import { Box, Button, FormControlLabel, FormGroup, Radio, Typography } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Radio,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useEffect } from "react";

// import { RecordRTCPromisesHandler } from "recordrtc";

function SMWtest(props) {
  const audioRef = useRef();
  const [checkArray, setCheckArray] = useState([]);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState(1);
  const [storeData, setStoreData] = useState({
    post: [],
    score: [],
    answer: [],
  });
  //   let [count, setCount] = useState(0);

  //   let [content, setContent] = useState("");
  const [audio, setAudio] = useState();
  const [beginningStatus, setBeginningStatus] = useState(true);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const clickHandler = () => {
    let overall_point = 0;
    checkArray.forEach((c) => {
      if (c.name === value && c.isCorrect === 1) {
        overall_point += 1;
      }
    });

    storeData.score.push(overall_point);
    storeData.answer.push(value);
    storeData.post.push(props.smwPost[index].id);
    setStoreData(storeData);
    let post = storeData.post.toString();
    let score = storeData.score.toString();
    let answer = JSON.stringify(storeData.answer);
    let store = {
      post: post,
      score: score,
      answer: answer,
      question_number: props.smwPost.length,
    };
    localStorage.setItem("smw", JSON.stringify(store));

    setBeginningStatus(true);
    if (index === props.smwPost.length - 1) {
      props.setSmw(false);
      props.setCurrentPage((prev) => prev + 1);
    } else {
      props.setCurrentPage((prev) => prev + 1);
      setIndex((prev) => prev + 1);
    }
  };
  //checkPermission

  useEffect(() => {
    async function checkAudioPermission() {
      try {
        await navigator.mediaDevices.getUserMedia(
          { audio: true },
          () => {},
          () => {}
        );
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

  //audio
  useEffect(() => {
    setCheckArray(props.smwPost[index].mul_choices);
    // setContent(props.smwPost[index].content);
    setAudio("");

    if (props.smwPost[index].media_type === "1") {
      setAudio(props.smwPost[index].media);
    } else {
      setAudio(
        `${process.env.REACT_APP_BACKEND_URL}storage/smw/${props.smwPost[index].media}`
      );
    }
  }, [props.smwPost, index]);

  return (
    <>
      <Box
        sx={{
          mt: "2rem",
          px: {
            xs: 2,
            sm: 5,
            md: 10,
            lg: "10rem",
            xl: "20rem",
          },
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
          <Box sx={{ width: "100%" }}>
            <Typography variant="body5">
              You will hear a recording of a lecture. At the end of the
              recording the last word or group of words has been replaced by a
              beep. Select the correct option to complete the recording.
            </Typography>
          </Box>
          {/* Audio */}
          <Box>
            {audio !== "" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: {
                      md: "30%",
                      sm: "50%",
                      xs: "100%",
                    },
                    boxShadow: 5,
                  }}
                  disabled={true}
                >
                  <audio
                    controls
                    ref={audioRef}
                    disabled
                    id="audio"
                    src={audio}
                    onEnded={() => setBeginningStatus(false)}
                    preload="metadata"
                    autoPlay
                  ></audio>
                </Button>
              </Box>
            )}
          </Box>

          <Box>
            {checkArray !== undefined && checkArray.length !== 0 && (
              <>
                <Box
                  sx={{
                    width: "90%",
                    margin: "0 auto",

                    borderRadius: "0.5rem",
                    padding: 1,
                    boxShadow: 1,
                  }}
                >
                  {/* <Typography sx={{ my: 2, fontSize: "1.2rem" }}>
                  {content}
                </Typography> */}
                  <FormGroup>
                    {checkArray.map((c, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          sx={{
                            //   backgroundColor: checkBg === index ? "yellow" : "",
                            my: 0.2,
                          }}
                          control={
                            <Radio
                              checked={value === c.name}
                              value={c.name}
                              onChange={handleChange}
                            />
                          }
                          label={c.name}
                        />
                      );
                    })}
                  </FormGroup>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          mt: 5,
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          sx={{ mr: "1rem", mb: "1rem" }}
          onClick={clickHandler}
          diabled={beginningStatus}
        >
          Next
        </Button>
      </Box>
    </>
  );
}

export default SMWtest;
