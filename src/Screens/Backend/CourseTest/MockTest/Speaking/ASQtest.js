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
import React, { useRef, useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { RecordRTCPromisesHandler } from "recordrtc";

import CalculatorScore from "../../Speaking/CalculateScore";
import { Sections } from "../MtStyleVariable";

function ASQtest(props) {
  const audioRef = useRef();

  const [beginningCounterCount, setBeginningCounterCount] = useState(35);
  const [duration, setDuration] = useState();
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
  const [audio, setAudio] = useState();
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
    if (index === props.asqPost.length - 1) {
      //
      props.setAsq(false);
      props.setSpeakingState(false);
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
      question_number: props.asqPost.length,
    };

    localStorage.setItem("asq", JSON.stringify(store));
    props.setCurrentPage((prev) => prev + 1);
    setIndex((prev) => prev + 1);
    reset();
  }, [index, props, storeData]);
  const clickHandler = () => {
    if (beginningStatus) {
      storeData.post.push(
        props.asqPost[index].id === null ? "null_id" : props.asqPost[index].id
      );
      storeData.score.push(0);
      storeData.answer.push("");
      storeData.url.push("");
      pageCondition();
    }
    if (!beginningStatus && !recordingStatus) {
      //
      // pageCondition();
      setWaitRecording(true);
      //go to useEffect
    }
    if (!beginningStatus && recordingStatus) {
      recognition !== null && recognition.stop();
      setRecordingCount(10);
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
    setNext(false);
    setBlob("");
    // setBlobUrl("");
    setFinish(false);
    setDuration("");
    setSendRecording(false);
    setWaitRecording(false);
    setRecordingCount(0);
  };

  //checkPermission

  const onLoadedMetaData = () => {
    if (audio !== "") {
      
      let x = audioRef.current.duration + 1;
      setDuration(x.toFixed(0));
    }
  };
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
    setAudio("");
  
    if (props.asqPost[index].media_type === "1") {
      setAudio(props.asqPost[index].media);
    } else {
      setAudio(
        `${process.env.REACT_APP_BACKEND_URL}storage/asq/${props.asqPost[index].media}`
      );
    }

    setBeginningCounterCount(duration);
  }, [props.asqPost, index, duration]);

  //begin
  useEffect(() => {
    if (beginningStatus && beginningCounterCount !== undefined) {
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
  }, [beginningStatus, beginningCounterCount]);

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
      setBeginningStatus(false);
      setBeginningCounterCount(25);
      setRecordingStatus(true);
      recorder.startRecording();
      speechToText();
    }
  }, [beginningCounterCount, recorder, speechToText]);

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
    if (recordingCount >= 10) {
      setFinish(true);
      setSendingState(true);
    }
  }, [recordingCount]);

  useEffect(() => {
    if (sendingState) {
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

          storeData.post.push(props.asqPost[index].id);
          const blobUrl = URL.createObjectURL(BLOB);
          let rec_duration = await getBlobDuration(blobUrl);

          let overall_result = CalculatorScore(
            props.asqPost[index].content,
            result,
            rec_duration.toFixed(2),
            "asq"
          );
          storeData.score.push(
            overall_result !== undefined
              ? overall_result?.overall_points.toFixed(2)
              : 0
          );
          storeData.answer.push(result);
          storeData.url.push(res.data.url);
          setStoreData(storeData);
          if (next) {
            pageCondition();
            props.setPause(false);
          }
          setSendRecording(true);
        } catch (error) {
          storeData.post.push(props.asqPost[index].id);
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
    next,
    pageCondition,
    recorder,
    blob,
    props,
    storeData,
    index,
    props.asqPost,
    result,
    recognition,
  ]);

  return (
    <>
      <Box
        sx={{
          ...Sections.sectionContainer,
          mt: "2rem",
        }}
      >
        <Box
          sx={{
            ...Sections.bgWhiteCard,
            height: {
              sm: "auto",
              md: "100%",
            },
          }}
        >
          <Box sx={{ width: "100%", p: 2 }}>
            <Typography
              sx={{
                ...Sections.cardFont,
              }}
            >
              You will hear a question. Please give a simple and short answer.
              Often just one or a few words is enough.
            </Typography>
          </Box>
          {/* Audio */}

          <Box
            sx={{
              ...Sections.audioCard,
              height: "70%",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  height: "5rem",
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
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: "100%",
                    boxShadow: 5,
                  }}
                  disabled={true}
                >
                  <audio
                    controls
                    ref={audioRef}
                    onLoadedMetadata={onLoadedMetaData}
                    disabled
                    id="audio"
                    src={audio}
                    preload="metadata"
                    autoPlay
                  ></audio>
                </Button>
              </Box>
              <Box
                sx={{
                  height: "8rem",
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
                    height: "70%",
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
                        <Typography>Recording</Typography>
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
                  }}
                >
                  <Button
                    sx={{
                      borderRadius: 0,
                      borderRight: "1px solid black",
                    }}
                  >
                    <StopCircle
                      sx={{
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
                        <Box sx={{ width: "40%" }}>
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            00 :
                            {recordingCount < 10
                              ? "0" + recordingCount
                              : recordingCount}
                            /00 : 10
                          </Typography>
                        </Box>
                        <Box sx={{ width: "60%" }}>
                          <LinearProgress
                            variant="determinate"
                            sx={{
                              ...Sections.ProgressBar,
                            }}
                            value={(recordingCount / 10) * 100}
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

export default ASQtest;
