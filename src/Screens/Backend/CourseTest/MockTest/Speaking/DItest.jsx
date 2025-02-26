import { StopCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import getBlobDuration from "get-blob-duration";
import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { RecordRTCPromisesHandler } from "recordrtc";

import CalculatorScore from "../../Speaking/CalculateScore";
import { Sections } from "../MtStyleVariable";

function DItest(props) {
  let frontendURL = process.env.REACT_APP_FRONTEND_URL;
  alert(frontendURL)
  console.log(frontendURL,"frontendURL")
  const [beginningCounterCount, setBeginningCounterCount] = useState(25);

  const [recordingCount, setRecordingCount] = useState(0);

  const [beginningStatus, setBeginningStatus] = useState(true);
  const [recordingStatus, setRecordingStatus] = useState(true);
  const [recorder, setRecorder] = useState();
  const [index, setIndex] = useState(0);
  const [finish, setFinish] = useState(false);
  const [blob, setBlob] = useState();
  const [storeData, setStoreData] = useState({
    post: [],
    score: [],
    answer: [],
    url: [],
  });
  // const [blobUrl, setBlobUrl] = useState();
  const [image, setImage] = useState();
  const [next, setNext] = useState(false);

  const [sendingState, setSendingState] = useState(false);
  //for recording auto sending duration
  const [sendRecording, setSendRecording] = useState(false);
  const [waitRecording, setWaitRecording] = useState(false);
  //speech to text development
  const [recording, setRecording] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [recognition, setRecognition] = useState(null);
  const [result, setResult] = useState("");
  // const [interimResult, setInterimResult] = useState("");
  const [downloadDisabled, setDownloadDisabled] = useState(true);
  const pageCondition = useCallback(() => {
    if (index === props.diPost.length - 1) {
      props.setDi(false);
    }
    let post = storeData.post.toString();
    let score = storeData.score.toString();
    let answer = storeData.answer.toString();
    let url = storeData.url.toString();
    let store = {
      post: post,
      score: score,
      answer: answer,
      url: url,
      question_number: props.diPost.length,
    };

    localStorage.setItem("di", JSON.stringify(store));
    props.setCurrentPage((prev) => prev + 1);
    setIndex((prev) => prev + 1);
    reset();
  }, [index, props, storeData]);

  const clickHandler = () => {
    if (beginningStatus) {
      storeData.post.push(
        props.diPost[index].id === null ? "null_id" : props.diPost[index].id
      );
      storeData.score.push(0);
      storeData.answer.push("");
      storeData.url.push("");
      pageCondition();
    }
    if (!beginningStatus && !recordingStatus) {
      setWaitRecording(true);
      //go to useEffect
    }
    if (!beginningStatus && recordingStatus) {
      setRecordingCount(40);
      setNext(true);
      props.setPause(true);
    }
  };

  // useEffect for wait recording
  useEffect(() => {
    if (waitRecording) {
      if (sendRecording) {
        pageCondition();
      }
    }
  }, [waitRecording, sendRecording, pageCondition]);

  const reset = () => {
    setRecognition(null);
    setResult("");
    setBeginningStatus(true);
    setRecordingStatus(true);
    setBeginningCounterCount(25);
    setRecordingCount(0);
    setNext(false);
    setBlob("");
    // setBlobUrl("");
    setFinish(false);
  };

  //checkPermission

  useEffect(() => {
    async function checkAudioPermission() {
      try {
        let stream = await navigator.mediaDevices.getUserMedia(
          { audio: true },
          () => {},
          () => {}
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

  //audio
  useEffect(() => {
    setImage("");
    if (props.diPost[index].media_type === "1") {
      setImage(props.diPost[index].media);
    } else {
      setImage(
        `${process.env.REACT_APP_BACKEND_URL}storage/di/${props.diPost[index].media}`
      );
    }
  }, [props.diPost, index]);

  //begin
  useEffect(() => {
    if (beginningStatus) {
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
    }
  }, [beginningStatus]);

  //speech to text
  const speechToText = useCallback(() => {
    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language;
      recognition.interimResults = true;
      setRecognition(recognition);
      setRecording(true);

      recognition !== null && recognition.start();
      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        if (event.results[0].isFinal) {
          setResult((prevResult) => prevResult + " " + speechResult);
          // setInterimResult("");
        } else {
          // setInterimResult(" " + speechResult);
        }
        setDownloadDisabled(false);
      };
      recognition.onspeechend = () => {
        speechToText();
      };
      recognition.onerror = (event) => {
        // stopRecording();
        // if (event.error === "no-speech") {
        //   alert("No speech was detected. Stopping...");
        // } else if (event.error === "audio-capture") {
        //   alert(
        //     "No microphone was found. Ensure that a microphone is installed."
        //   );
        // } else if (event.error === "not-allowed") {
        //   alert("Permission to use microphone is blocked.");
        // } else if (event.error === "aborted") {
        //   alert("Listening Stopped.");
        // } else {
        //   alert("Error occurred in recognition: " + event.error);
        // }
      };
    } catch (error) {}
  }, [language]);

  useEffect(() => {
    if (beginningCounterCount === 0) {
      let audioPlay = () => {
        let audio = new Audio(frontendURL + "/beep.mp3");
        audio.play();
        audio.onended = () => {
          recorder.startRecording();
          speechToText();
        };
      };
      setBeginningStatus(false);
      setBeginningCounterCount(25);
      setRecordingStatus(true);
      audioPlay();
    }
  }, [beginningCounterCount, recorder, frontendURL, speechToText]);

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
    if (recordingCount >= 40) {
      setFinish(true);
      setSendingState(true);
    }
  }, [recordingCount]);

  useEffect(() => {
    if (sendingState) {
      // setRecordingCount(0);
      let sendBlob = async () => {
        setRecordingStatus(false);
        await recorder.stopRecording();
        recognition !== null && recognition.stop();
        let BLOB = await recorder.getBlob();
        let formDataBlob = new FormData();
        formDataBlob.append("audio", BLOB, "tmp.mp3");

        let res;
        try {
          res = await axios.post(
            `${process.env.REACT_APP_BACKEND_ADMIN}recording`,
            formDataBlob,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          storeData.post.push(props.diPost[index].id);
          const blobUrl = URL.createObjectURL(BLOB);
          let rec_duration = await getBlobDuration(blobUrl);
          let overall_result = CalculatorScore(
            props.diPost[index].content,
            result,
            rec_duration.toFixed(2),
            "di"
          );
          storeData.score.push(
            overall_result !== undefined
              ? overall_result?.overall_points.toFixed(2)
              : 0
          );
          storeData.answer.push(result);
          storeData.url.push(result);
          setStoreData(storeData);
          if (next) {
            pageCondition();
            props.setPause(false);
          }
          storeData.url.push(res.data.url);
          setSendRecording(true);
        } catch (error) {
          storeData.post.push(props.diPost[index].id);
          storeData.score.push(0);
          storeData.answer.push("");
          storeData.url.push("");
          setStoreData(storeData);
          if (next) {
            pageCondition();
            props.setPause(false);
          }
          setSendRecording(true);
        }
      };
      sendBlob();
      setSendingState(false);
    }
  }, [
    sendingState,
    pageCondition,
    next,
    recorder,
    blob,
    props,
    storeData,
    index,
    props.diPost,
    result,
    recognition,
  ]);

  return (
    <>
      <Box
        sx={{
          ...Sections.sectionContainer,
        }}
      >
        <Box
          sx={{
            ...Sections.bgWhiteCard,
            height: {
              xs: "auto",
              md: "28rem",
            },
            mt: "4rem",
          }}
        >
          <Box sx={{ width: "100%", mb: 2, px: 2, pt: 1 }}>
            <Typography
              variant="body5"
              sx={{
                ...Sections.cardFont,
              }}
            >
              Look at the text below. In 25 seconds,please speak into the
              microphone and describe in detail what the graph showing. You will
              have 40 seconds to give your response.
            </Typography>
          </Box>
          {/* Audio */}
          <Box
            sx={{
              ...Sections.diBox,
            }}
          >
            <Box
              sx={{
                ...Sections.diImg,

                // width: {
                //   xs: "80%",
                //   md: "60%",
                // },
              }}
            >
              {image !== "" && (
                <img
                  src={image}
                  alt="pte_img"
                  style={{ width: "100%", p: 1 }}
                />
              )}
            </Box>
            <Box
              sx={{
                ...Sections.audioCard,
                width: {
                  xs: "60%",
                  md: "35%",
                },
              }}
            >
              <Box
                sx={{
                  height: {
                    xs: "5rem",
                    sm: "5rem",
                    md: "8rem",
                  },
                  my: {
                    xs: "2rem",
                    xl: "3rem",
                  },
                  width: "100%",
                  border: "2px solid whitesmoke",
                  borderRadius: "1rem",
                  boxShadow: "0 0 5px black",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    height: {
                      xs: "50%",
                      sm: "50%",
                      md: "70%",
                    },
                  }}
                >
                  <Box
                    sx={{
                      ...Sections.UpperCardWidth,
                    }}
                  >
                    {/* <Typography>Audio Recorder</Typography> */}
                    {beginningStatus && (
                      <>
                        <Typography>
                          Recording in 00 :{" "}
                          {beginningCounterCount < 10
                            ? "0" + beginningCounterCount
                            : beginningCounterCount}
                        </Typography>
                      </>
                    )}
                    {!beginningStatus && recordingStatus && (
                      <>
                        <Typography
                          sx={{
                            ...Sections.cardFont,
                          }}
                        >
                          Recording
                        </Typography>
                      </>
                    )}
                    {finish && <Typography> Finished</Typography>}
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
                    ...Sections.LowerCardWidth,

                    height: {
                      xs: "50%",
                      sm: "50%",
                      md: "30%",
                    },
                  }}
                >
                  <Button
                    sx={{
                      width: "1rem",
                      borderRadius: 0,
                      borderRight: "1px solid black",
                      "& .MuiButtonBase-root": {
                        width: "1rem",
                      },
                    }}
                  >
                    <StopCircle
                      sx={{
                        width: "1rem",
                        color:
                          !beginningStatus && recordingStatus ? "red" : "black",
                      }}
                    ></StopCircle>
                  </Button>
                  <Box sx={{ width: "90%", margin: "auto 2px" }}>
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: {
                              xs: "100%",
                              sm: "40%",
                            },
                          }}
                        >
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            00 :
                            {recordingCount < 10
                              ? "0" + recordingCount
                              : recordingCount}
                            /00 : 40
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: {
                              md: "60%",
                              sm: "60%",
                              sx: "60%",
                            },
                          }}
                        >
                          <LinearProgress
                            variant="determinate"
                            sx={{
                              ...Sections.ProgressBar,
                            }}
                            value={(recordingCount / 40) * 100}
                          />
                        </Box>
                      </Box>
                    </>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          ...Sections.next,
        }}
      >
        <Button
          variant="contained"
          onClick={clickHandler}
          sx={{ mr: "1rem", mb: "1rem" }}
          disabled={recordingCount < 1 || waitRecording || next ? true : false}
        >
          {waitRecording || next ? (
            <CircularProgress
              size="1rem"
              sx={{ width: "1rem", size: "1rem" }}
            ></CircularProgress>
          ) : (
            ""
          )}
          Next
        </Button>
      </Box>
    </>
  );
}

export default DItest;
