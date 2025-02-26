import { StopCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import getBlobDuration from "get-blob-duration";
import React, { useContext, useRef, useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import swal from "sweetalert";
import { CalculatorScore } from "../../Speaking/CalculatorScore";
import { Sections } from "../MtStyleVariable";
import { updateUserData } from "../StoreDataFunctions";
import { requestAudio } from "../../../../../customHooks/Permissions/RequestPermission";
import ErrrorBoundaryClass from "../../../../../components/ErrrorBoundaryClass";
import { MtErrorFallbackFunction } from "../../../../../components/ErrorFallbackFunction";
import { CircularProgressbar } from "react-circular-progressbar";
import { AdminCheckContext } from "../MockTest";
import { useParams } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { saveTempMt } from "../../../../../Utils/SaveTempMt";

function ReusableTest(props) {
 
  const {
    category,
    setSave,
    answer,
    beginningCounterCountDuration,
    recordingCounterCountDuration,
    testPost,
    setCategoryState,
    setCurrentPage,
    setPause,
    pause,
    setSpeakingState,
    setCurrentCategory,
    setCurrentIndex,
    passSaveDataState,
    setPassSaveDataState,
    setCurrentQuestionStart,
    error,
    mockId,
    audioArray,
    imageArray,
    setError,
    checkAnswerState,
  } = props;
  const audioRef = useRef();
  const ansAudioRef = useRef();
  const data = useParams();
  let frontendURL = process.env.REACT_APP_FRONTEND_URL;
  const [beginningCounterCount, setBeginningCounterCount] = useState(
    beginningCounterCountDuration
  );
  const checkByAdmin = useContext(AdminCheckContext);
  const recorderRef = useRef(null);
  const [audio, setAudio] = useState();
  const [recordingCount, setRecordingCount] = useState(0);
  const [beginningStatus, setBeginningStatus] = useState(true);
  const [recordingStatus, setRecordingStatus] = useState(true);
  const [clickNext, setClickNext] = useState(false);
  // const [recorder, setRecorder] = useState();
  const [index, setIndex] = useState(0);
  const [finish, setFinish] = useState(false);
  // const [blob, setBlob] = useState();
  const [storeData, setStoreData] = useState();
  const [next, setNext] = useState(false);
  //for audio related section;
  const [duration, setDuration] = useState("");
  //for image section
  const [image, setImage] = useState();
  //for recording auto sending duration
  const [sendRecording, setSendRecording] = useState(false);
  const [waitRecording, setWaitRecording] = useState(false);
  const [sendingState, setSendingState] = useState(false);

  //speech to text development
  // const [recording, setRecording] = useState(false);
  // const [language, setLanguage] = useState("en-US");
  const [recognition, setRecognition] = useState(null);
  const [result, setResult] = useState("");
  // const [interimResult, setInterimResult] = useState("");

  // const [blobUrl, setBlobUrl] = useState();

  //check answer state & const
  const [showWord, setShowWord] = useState([]);
  const [overallResult, setOverallResult] = useState([]);

  //for pause calculation
  const [startTime, setStartTime] = useState([]);
  //////              //////

  const [pageCleanUp, setPageCleanUp] = useState(true);
  //save context get

  //check answer state true
  useEffect(() => {
    if (checkAnswerState) {
      let user_answer = JSON.parse(answer?.answers);

      let content_arr = testPost[index]?.content
        .split(/[\(\),\s]+/)
        .filter(Boolean)
        .map((content) => content.replace(/\./g, "").trim());
      let char_arr = user_answer[index][0]
        .split(/[\(\),\s]+/)
        .filter(Boolean)
        .map((user_recognize_words) =>
          user_recognize_words.replace(/\./g, "").trim()
        );

      content_arr.forEach((check_char) => {
        if (char_arr !== undefined && char_arr?.includes(check_char)) {
          showWord.push({ name: check_char, color: "#16A085" }); // This would mutate the state, which is not allowed
          setShowWord(showWord);
        } else {
          showWord.push({ name: check_char, color: "#F21F21" }); // This would mutate the state, which is not allowed
          setShowWord(showWord);
        }
      });
      if (
        answer !== undefined &&
        answer?.point_detail !== null &&
        answer?.point_detail !== undefined
      ) {
        let pointDetail = JSON.parse(answer?.point_detail);

        setOverallResult({
          fluency_ninety: pointDetail[index]?.fluency,
          content_ninety: pointDetail[index]?.content,
          content: pointDetail[index]?.content,
          pronunciation_ninety: pointDetail[index]?.pronunciation,
          overall_points_ninety:
            (pointDetail[index]?.fluency +
              pointDetail[index]?.content +
              pointDetail[index]?.content) /
            3,
        });
      }
    }
  }, [
    answer,
    category,
    checkAnswerState,
    index,
    result,
    showWord,
    testPost,
    ansAudioRef,
  ]);

  // answer check for old records which not have pause and other updated calculation
  const answerCheckScore = () => {
    let char_arr = answer?.answers?.split(",")[index];

    if (
      ansAudioRef !== undefined &&
      !isNaN(ansAudioRef?.current?.duration) &&
      ansAudioRef?.current?.src !== ""
    ) {
      let overall_result = CalculatorScore(
        testPost[index].content.toLocaleLowerCase(),
        char_arr,
        ansAudioRef?.current.duration.toFixed(2),
        category,
        null,
        testPost[index].keyword_length
      );

      setOverallResult(overall_result);
    }
  };
  //update with save progress data

  useEffect(() => {
    if (passSaveDataState) {
      let saveCategory = localStorage.getItem("saveCategory");
      let saveIndex = localStorage.getItem("saveIndex");
      setCurrentQuestionStart(true);
      if (saveCategory == category) {
        setIndex(parseInt(saveIndex));
        setCurrentIndex(saveIndex);

        setPassSaveDataState(false);
        setTimeout(() => {
          localStorage.removeItem("saveCategory");
          localStorage.removeItem("saveIndex");
        }, 2500);
      } else {
        setCategoryState(false);
      }
    }
    setCurrentIndex(index);
  }, [
    index,
    setCurrentQuestionStart,
    setCurrentIndex,
    setPassSaveDataState,
    passSaveDataState,
    category,
    setCategoryState,
  ]);

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  //get set data from local storage and set current state
  useEffect(() => {
    if (!checkAnswerState && !passSaveDataState) {
      let userId = localStorage.getItem("userId");

      let saveStoreData = localStorage.getItem(userId + "saveMt" + mockId);
      saveStoreData = JSON.parse(saveStoreData);

      let getStoreData = JSON.parse(saveStoreData?.[category]);
      getStoreData.url = getStoreData.url.split(",");
      getStoreData.score = getStoreData.score.split(",");
      getStoreData.answer = JSON.parse(getStoreData.answer);
      getStoreData.points = JSON.parse(getStoreData.points);

      setCurrentQuestionStart(true);
      console.log(getStoreData, "getStoreData");

      setStoreData(getStoreData);
    }

    setCurrentCategory(category);
  }, [
    category,
    setCurrentCategory,
    setCurrentQuestionStart,
    checkAnswerState,
    mockId,
    passSaveDataState,
  ]);

  useEffect(() => {
    setCurrentIndex(index);
  }, [index, setCurrentIndex]);

  const reset = useCallback(() => {
    setBeginningStatus(true);
    resetTranscript();
    setShowWord([]);
    setStartTime([]);
    setResult("");
    setSave(true);
    setClickNext(false);
    setRecordingStatus(true);
    setBeginningCounterCount(beginningCounterCountDuration);
    setRecordingCount(0);
    setFinish(false);
    setNext(false);
    setDuration("");
    setRecognition(null);
    setSendRecording(false);
    setWaitRecording(false);
    setPageCleanUp(true);
  }, [setSave, resetTranscript, beginningCounterCountDuration]);

  const pageCondition = useCallback(async () => {
    if (pageCleanUp) {
      setPageCleanUp(false);
      if (index === testPost.length - 1) {
        //end of category

        setCategoryState(false);
        if (category === "asq") {
          setSpeakingState(false);
        }
      }
      //update the data in local storage
      if (!checkAnswerState) {
        updateUserData("Speaking", category, storeData, mockId);
      }

      let updateDbSave = async () => {
        if (!checkAnswerState) {
          await saveTempMt(data.id, data.mt_type_id);
        }
      };
      await updateDbSave();
      setCurrentPage((prev) => prev + 1);
      setIndex((prev) => prev + 1);
      setCurrentQuestionStart(true);

      reset();
      setPause(false);
    }
  }, [
    index,
    setPause,
    reset,
    checkAnswerState,
    pageCleanUp,
    setCurrentQuestionStart,
    data,
    testPost,
    setCategoryState,
    setCurrentPage,
    setSpeakingState,
    category,
    storeData,
  ]);

  const clickHandler = () => {
    if (checkAnswerState) {
      pageCondition();
    } else if (beginningStatus) {
      storeData.score[index] = 0;
      storeData.url[index] = "";
      storeData.answer[index][0] = "";

      pageCondition();
    } else if (!beginningStatus && !recordingStatus) {
      // pageCondition();
      // setWaitRecording(true);
      setNext(true);
      setPause(true);
      setClickNext(true);
      //go to useEffect
    } else if (!beginningStatus && recordingStatus) {
      setRecordingCount(recordingCounterCountDuration);

      setNext(true);
      setPause(true);
      setClickNext(true);
    }
  };

  // useEffect for wait recording
  // useEffect(() => {
  //   if (waitRecording) {
  //     setPause(true);
  //     if (sendRecording) {
  //       pageCondition();
  //     }
  //   }
  // }, [waitRecording, sendRecording, pageCondition, setPause]);

  //audio related section
  const onLoadedMetaData = () => {
    if (audio !== "") {
      let x =
        category === "rl"
          ? audioRef.current.duration + 10
          : audioRef.current.duration + 1;
      setDuration(x.toFixed(0));
    }
  };
  //audio setting
  //audio
  useEffect(() => {
    if (category === "rs" || category === "rl" || category === "asq") {
      setAudio("");

      if (audioArray[index] !== null && audioArray[index] !== undefined) {
        setAudio(audioArray[index]);
      }

      setBeginningCounterCount(duration);
    }
  }, [testPost, category, index, duration, audioArray]);

  //image setting
  //audio
  useEffect(() => {
    if (category === "di") {
      setImage("");
      if (imageArray[index] !== null && imageArray[index] !== undefined) {
        setImage(imageArray[index]);
      }
    }
  }, [testPost, index, category, imageArray]);

  //checkPermission
  useEffect(() => {
    requestAudio()
      .then(async (createRecorder) => {
        // setRecorder(createRecorder);
        recorderRef.current = createRecorder;
      })
      .catch(() => alert("No support Audio Permission"));
  }, []);

  //speech to text
  // const speechToText = useCallback(() => {
  //   try {
  //     const SpeechRecognition =
  //       window.SpeechRecognition || window.webkitSpeechRecognition;
  //     const recognition = new SpeechRecognition();
  //     recognition.lang = language;
  //     recognition.interimResults = true;
  //     setRecognition(recognition);
  //     setRecording(true);

  //     recognition !== null && recognition.start();
  //     recognition.onresult = (event) => {
  //       const speechResult = event.results[0][0].transcript;

  //       if (event.results[0].isFinal) {
  //         setResult((prevResult) => prevResult + " " + speechResult);
  //         // setInterimResult("");
  //       } else {
  //         //setInterimResult(" " + speechResult);
  //       }
  //       setDownloadDisabled(false);
  //     };
  //     recognition.onspeechend = () => {
  //       speechToText();
  //     };
  //     recognition.onerror = (event) => {
  //       // stopRecording();
  //       // if (event.error === "no-speech") {
  //       //   alert("No speech was detected. Stopping...");
  //       // } else if (event.error === "audio-capture") {
  //       //   alert(
  //       //     "No microphone was found. Ensure that a microphone is installed."
  //       //   );
  //       // } else if (event.error === "not-allowed") {
  //       //   alert("Permission to use microphone is blocked.");
  //       // } else if (event.error === "aborted") {
  //       //   alert("Listening Stopped.");
  //       // } else {
  //       //   alert("Error occurred in recognition: " + event.error);
  //       // }
  //     };
  //   } catch (error) {}
  // }, [language]);

  //pause count
  useEffect(() => {
    if (listening && !beginningStatus) {
      const currentTime = new Date().getTime();

      setStartTime((prev) => [...prev, currentTime]);

      // }
    }
  }, [transcript, listening, beginningStatus]);

  useEffect(() => {
    if (!checkAnswerState) {
      let beginInterval = (flag, pause) => {
        if (flag && !pause) {
          const interval = setInterval(() => {
            setBeginningCounterCount((prev) => prev - 1);
          }, 1000);
          return interval;
        }
      };

      let interval = beginInterval(beginningStatus, pause);
      return () => clearInterval(interval);
    }
  }, [beginningStatus, pause, category, checkAnswerState]);

  useEffect(() => {
    if (
      (category === "rl" || category === "rs") &&
      beginningStatus &&
      pause &&
      audioRef !== undefined &&
      !audioRef.current.paused
    ) {
      audioRef.current.pause();
    }
    if (
      (category === "rl" || category === "rs") &&
      beginningStatus &&
      !pause &&
      beginningCounterCount !== undefined &&
      duration !== undefined &&
      // beginningCounterCount !== duration &&
      audioRef !== undefined &&
      audioRef?.current?.paused &&
      !(audioRef?.current.currentTime >= audioRef.current.duration)
    ) {
      audioRef.current.play();
    }
  }, [beginningStatus, category, pause, duration, beginningCounterCount]);

  useEffect(() => {
    if (beginningCounterCount === 0) {
      let audioPlay = () => {
        let audio = new Audio(frontendURL + "/beep.mp3");
        audio.play();
        audio.onended = () => {
          recorderRef?.current?.startRecording();
          // speechToText();
          SpeechRecognition.startListening({ continuous: true });
          // speechToText();
        };
      };

      setBeginningStatus(false);
      setBeginningCounterCount("");
      setRecordingStatus(true);
      audioPlay();
    }
  }, [
    beginningCounterCountDuration,
    checkAnswerState,
    beginningCounterCount,
    recorderRef,
    frontendURL,
  ]);

  useEffect(() => {
    if (!beginningStatus && recordingStatus) {
      let recordInterval = (flag, pause) => {
        if (flag && !pause) {
          const interval = setInterval(() => {
            setRecordingCount((prev) => prev + 1);
          }, 1000);
          return interval;
        }
      };
      let interval = recordInterval(recordingStatus, pause);
      return () => clearInterval(interval);
    }
  }, [beginningStatus, recordingStatus, pause]);

  useEffect(() => {
    if (recordingCount >= recordingCounterCountDuration) {
      setFinish(true);
      setRecordingCount(0);
      setRecordingStatus(false);
      SpeechRecognition.stopListening();
      setSendingState(true);
    }
  }, [recordingCount, recordingCounterCountDuration]);

  // const remainingSpace = navigator?.storage?.estimate?.().then((estimate) => {
  //   console.log("Remaining storage space:", estimate.quota - estimate.usage);
  // });

  // console.log(remainingSpace);

  useEffect(() => {
    if (sendingState && clickNext) {
      let sendBlob = async () => {
        await recorderRef?.current?.stopRecording();
        const startTime = performance.now();

        // setRecognition(null);

        let BLOB = await recorderRef?.current?.getBlob();
        const blobUrl = URL.createObjectURL(BLOB);
        let formDataBlob = new FormData();
        formDataBlob.append("audio", BLOB, "tmp.mp3");
        let res;
        let timeoutApi;
        timeoutApi = setTimeout(() => {
          swal({
            title: "Submitting taking too long",
            text: "Please retry after checking your internet connnection.Press okay to reload ,your current progress is saved",
            icon: "error",
            buttons: true,
            dangerMode: true,
            closeOnClickOutside: false,
          }).then((ok) => {
            if (ok) {
              window.location.reload();
            } else {
              setPause(false);
              window.location.reload();
            }
          });
          // You can take appropriate actions here, such as stopping the API call or showing a message to the user
          // For demonstration purposes, we're just logging a warning message
        }, 30000);
        try {
          res = await axios.post(
            `${process.env.REACT_APP_BACKEND_ADMIN}recording`,
            formDataBlob,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          const endTime = performance.now();
          const elapsedTime = (endTime - startTime) / 1000;

          clearTimeout(timeoutApi);
          let user_recognize_words = transcript.toLocaleLowerCase();
          let rec_duration = await getBlobDuration(blobUrl);
          let overall_result = CalculatorScore(
            testPost[index]?.content.toLowerCase(),
            user_recognize_words,
            rec_duration.toFixed(2),
            category,
            startTime,
            testPost[index].keyword_length
          );

          storeData.score[index] =
            overall_result !== undefined && overall_result !== null
              ? category === "asq"
                ? overall_result?.content
                : overall_result?.overall_points.toFixed(2)
              : 0;
          storeData.url[index] = res.data.url;
          storeData.answer[index][0] = transcript;
          storeData.points[index] = {
            content:
              category === "asq"
                ? overall_result?.content
                : overall_result?.content_ninety,
            pronunciation:
              category === "asq" ? null : overall_result.pronunciation_ninety,
            fluency: category === "asq" ? null : overall_result.fluency_ninety,
          };
          console.log("finished setting storedata");

          if (next) {
            pageCondition();
            setPause(false);
          }

          // if (
          //   overall_result !== undefined &&
          //   overall_result !== null &&
          //   res?.data?.url !== null &&
          //   res?.data?.url !== undefined
          // ) {
          //   setSendRecording(true);
          // }
        } catch (error) {
          //
          clearTimeout(timeoutApi);
          try {
            axios
              .post(`${process.env.REACT_APP_BACKEND_API}error-logs`, {
                error: error.message,
                page_route: window.location.pathname,
                user_device: "",
                browser: localStorage.getItem("browser"),
                user_id: localStorage.getItem("userId"),
              })
              .then(() => {
                ["route_path", "error"].forEach((key) => {
                  localStorage.removeItem(key);
                });
              })
              .catch(() => {
                localStorage.setItem("error", error.message);
                localStorage.setItem("route_path", window.location.pathname);
                // localStorage.setItem("user_device", userDevice);
              });
          } catch (error) {
            console.log(error, "error");

            localStorage.setItem("error", error.message);
            localStorage.setItem("route_path", window.location.pathname);
            // localStorage.setItem("user_device", userDevice);
          }
          console.log(error, "error");

          swal({
            title: "Sending audio to server went wrong ." + error.message,
            text: "You can retry after reloading .Press okay to reload ,your current progress is saved .Cancel will continue the test but your answer will not be correct.",
            icon: "error",
            buttons: true,
            dangerMode: true,
            closeOnClickOutside: false,
          }).then((ok) => {
            if (ok) {
              window.location.reload();
            } else {
              storeData.score[index] = 0;
              storeData.url[index] = "";
              storeData.answer[index][0] = "";
              storeData.points[index] = {
                content: category === "asq" ? 0 : 10,
                pronunciation: 10,
                fluency: 10,
              };

              setStoreData(storeData);
              if (next) {
                pageCondition();
                setPause(false);
              }

              // setSendRecording(true);
              // window.location.reload();
            }
          });
        }
      };
      setRecordingCount(0);
      sendBlob();
      setSendingState(false);
    }
  }, [
    recorderRef,
    recognition,
    transcript,
    sendingState,
    startTime,
    setPause,
    storeData,
    clickNext,
    index,
    testPost,
    waitRecording,
    next,
    pageCondition,
    category,
  ]);

  if (category === "asq") {
    console.log(audioArray[index]);
    console.log(audioArray);
  }
  return (
    <ErrrorBoundaryClass
      fallback={
        <MtErrorFallbackFunction
          error={error}
          setError={setError}
        ></MtErrorFallbackFunction>
      }
    >
      <>
        <Box
          sx={{
            ...Sections.sectionContainer,
            px: checkAnswerState ? 0 : Sections.sectionPadding.px,
          }}
        >
          <Box
            sx={{
              ...Sections.bgWhiteCard,
            }}
          >
            <Box sx={{ width: "100%", p: 2 }}>
              <Typography
                sx={{
                  ...Sections.cardFont,
                }}
              >
                {category === "ra"
                  ? "Look at the text below. In 40 seconds, you must read this text   aloud as naturally and clearly as possible. You have 40 seconds to read aloud"
                  : category === "rs"
                  ? "You will hear a sentence. Please repeat the sentence exactly as you hear it. You will hear the sentence only once. "
                  : category === "rl"
                  ? "You will hear a lecture. After listening to the lecture, in 10 seconds, please speak into the microphone and retell what you have just heard from the lecture in your own words. You will have 40 seconds to give your response."
                  : category === "di"
                  ? " Look at the text below. In 25 seconds,please speak into the microphone and describe in detail what the graph showing. You will have 40 seconds to give your response."
                  : "You will hear a question. Please give a simple and short answer. Often just one or a few words is enough."}
              </Typography>
            </Box>
            {/* Audio */}
            {category !== "di" && (
              <Box
                sx={{
                  ...Sections.audioCard,
                  height:
                    category == "rs" || category == "rl" || category == "asq"
                      ? "80%"
                      : "30%",
                  flexDirection:
                    category == "rs" || category == "rl" || category == "asq"
                      ? "column"
                      : "row",
                }}
              >
                {(category === "rs" ||
                  category === "rl" ||
                  category === "asq") && (
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
                        boxShadow: 5,
                        height: "100%",
                      }}
                      disabled={!checkAnswerState}
                    >
                      <audio
                        controls
                        ref={audioRef}
                        onLoadedMetadata={onLoadedMetaData}
                        // disabled
                        onError={() => {
                          setPause(true);
                          swal({
                            title: "Audio load error",
                            text: "Audio load error.You current progress is saved .Please connect to internet and press ok ",
                            icon: "error",
                            buttons: true,
                            dangerMode: true,
                            closeOnClickOutside: false,
                          }).then((ok) => {
                            if (ok) {
                              setSave(true);
                              window.location.reload();
                            } else {
                              setPause(false);
                            }
                          });
                        }}
                        id="qAudio"
                        src={audioArray[index]}
                        preload="metadata"
                        autoPlay
                      ></audio>
                    </Button>
                  </Box>
                )}

                {checkAnswerState ? (
                  <Box
                    sx={{
                      height: "5rem",
                      my: {
                        xs: "2rem",
                        xl: "3rem",
                      },
                      width: "100%",
                      mx: "auto",
                      border: "2px solid whitesmoke",
                      borderRadius: "1rem",
                      boxShadow: "0 0 5px black",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        width: "100%",
                        boxShadow: 5,
                        height: "100%",
                      }}
                    >
                      <audio
                        ref={ansAudioRef}
                        controls
                        onLoadedData={() => {
                          if (answer?.point_detail === null) {
                            answerCheckScore();
                          }
                        }}
                        id="ansAudio"
                        src={
                          answer?.urls?.split(",")[index] !== undefined
                            ? answer?.urls?.split(",")[index]
                            : ""
                        }
                        preload="metadata"
                        // autoPlay
                      ></audio>
                    </Button>
                  </Box>
                ) : (
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
                              Recording in{" "}
                              {beginningCounterCount / 60 < 10
                                ? "0" + Math.floor(beginningCounterCount / 60)
                                : Math.floor(beginningCounterCount / 60)}{" "}
                              :{" "}
                              {beginningCounterCount % 60 < 10
                                ? "0" + (beginningCounterCount % 60)
                                : beginningCounterCount % 60}
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
                      }}
                    >
                      <Button
                        sx={{
                          borderRadius: 0,
                          borderRight: "1px solid black",
                        }}
                        disabled={true}
                      >
                        <StopCircle
                          sx={{
                            width: "1rem",
                            color:
                              !beginningStatus && recordingStatus
                                ? "red"
                                : "black",
                          }}
                        ></StopCircle>
                      </Button>
                      <Box sx={{ width: "100%", margin: "auto 2px" }}>
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
                                /00 : {recordingCounterCountDuration}
                              </Typography>
                            </Box>
                            <Box sx={{ width: "60%" }}>
                              <LinearProgress
                                variant="determinate"
                                sx={{
                                  ...Sections.ProgressBar,
                                }}
                                value={
                                  (recordingCount /
                                    recordingCounterCountDuration) *
                                  100
                                }
                              />
                            </Box>
                          </Box>
                        </>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            )}
            {category === "di" && (
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
                      style={{ width: "80%",height:"80%" ,p: 1 }}
                    />
                  )}
                </Box>

                <Box
                  sx={{
                    ...Sections.audioCard,
                    width: {
                      xs: "60%",
                      md: "30%",
                    },
                    maxWidth: "23rem",
                  }}
                >
                  {checkAnswerState ? (
                    <Box
                      sx={{
                        height: "5rem",
                        my: {
                          xs: "2rem",
                          xl: "3rem",
                        },
                        width: "100%",
                        mx: "auto",
                        border: "2px solid whitesmoke",
                        borderRadius: "1rem",
                        boxShadow: "0 0 5px black",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          width: "100%",
                          boxShadow: 5,
                          height: "100%",
                        }}
                      >
                        <audio
                          ref={ansAudioRef}
                          controls
                          onLoadedData={() => {
                            if (answer.point_detail === null) {
                              answerCheckScore();
                            }
                          }}
                          id="ansAudio"
                          src={
                            answer?.urls?.split(",")[index] !== undefined
                              ? answer?.urls?.split(",")[index]
                              : ""
                          }
                          preload="metadata"
                          // autoPlay
                        ></audio>
                      </Button>
                    </Box>
                  ) : (
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
                                !beginningStatus && recordingStatus
                                  ? "red"
                                  : "black",
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
                                  value={
                                    (recordingCount /
                                      recordingCounterCountDuration) *
                                    100
                                  }
                                />
                              </Box>
                            </Box>
                          </>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            )}

            {category === "ra" && (
              <Box
                sx={{
                  ...Sections.raContent,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    height: "100%",

                    m: 2,
                    p: {
                      xs: 1,
                      sm: 2,
                      md: 3,
                    },
                    backgroundColor: "whitesmoke",
                    borderRadius: "1rem",
                    boxShadow: 5,
                    overflowY: "auto",
                  }}
                >
                  <Typography
                    sx={{
                      ...Sections.cardFont,
                      lineHeight: "20px",
                    }}
                  >
                    {testPost[index]?.content}
                    {/* {testPost} */}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Box>
            {overallResult.length !== 0 &&
              overallResult !== undefined &&
              answer?.urls?.split(",")[index] !== undefined &&
              answer?.urls?.split(",")[index] !== "" && (
                <Box sx={{ mx: 2 }}>
                  <Typography variant="h5" m={2}>
                    Score
                  </Typography>
                  <Box sx={{ width: "100%", textAlign: "center" }}>
                    <Box
                      sx={{
                        display: {
                          md: "flex",
                          sm: "column",
                          xs: "column",
                        },
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
                        py: 3,
                        backgroundColor: "#fff",
                        borderRadius: "1rem",
                        // borderRadius: "1rem 1rem  0rem 0rem",
                      }}
                    >
                      {category !== "asq" && (
                        <>
                          <Box sx={{ width: "10%", margin: "0 auto" }}>
                            <h3
                              style={{
                                whiteSpace: "nowrap",
                                textAlign: "center",
                                my: 2,
                              }}
                            >
                              Pronunciation
                            </h3>
                            <CircularProgressbar
                              value={overallResult.pronunciation_ninety}
                              maxValue={90}
                              text={`${overallResult.pronunciation_ninety}/90`}
                            />
                          </Box>
                          <Box sx={{ width: "10%", margin: "0 auto" }}>
                            <h3
                              style={{
                                whiteSpace: "nowrap",
                                textAlign: "center",
                                my: 2,
                              }}
                            >
                              Fluency
                            </h3>
                            <CircularProgressbar
                              value={overallResult.fluency_ninety}
                              maxValue={90}
                              text={`${overallResult.fluency_ninety}/90`}
                            />
                          </Box>
                        </>
                      )}

                      <Box
                        sx={{
                          width: category === "asq" ? "30%" : "10%",
                          margin: "0 auto",
                        }}
                      >
                        <h3 style={{ whiteSpace: "nowrap" }}>Content</h3>
                        <CircularProgressbar
                          value={
                            props.category === "asq"
                              ? overallResult?.content
                              : overallResult.content_ninety
                          }
                          maxValue={props.category !== "asq" ? 90 : 1}
                          text={`${
                            props.category === "asq"
                              ? overallResult?.content
                              : overallResult.content_ninety
                          }/${props.category !== "asq" ? "90" : "1"}`}
                        />
                      </Box>
                      {category !== "asq" && (
                        <>
                          <Box sx={{ width: "10%", margin: "0 auto" }}>
                            <h3 style={{ whiteSpace: "nowrap" }}>Final</h3>
                            <CircularProgressbar
                              value={overallResult.overall_points_ninety}
                              maxValue={90}
                              text={`${overallResult.overall_points_ninety.toFixed(
                                2
                              )}`}
                            />
                          </Box>
                        </>
                      )}
                      <br />
                    </Box>

                    {(category === "ra" || category === "rs") && (
                      <Box
                        sx={{
                          width: "100%",
                          minHeight: "8rem",
                          textAlign: "center",
                          backgroundColor: "#fff",
                          padding: "  10px",
                          borderRadius: "0rem 0rem 1rem 1rem  ",
                        }}
                      >
                        <Card>
                          <CardHeader
                            // titleTypographyProps={{variant:'h1' }}
                            title={
                              <>
                                Pronunciation
                                <span
                                  style={{
                                    backgroundColor: "#16A085",
                                    padding: "4px 8px",
                                    margin: "3px",
                                    borderRadius: 5,
                                    fontSize: "15px",
                                    color: "#fff",
                                  }}
                                >
                                  Good
                                </span>
                                <span
                                  style={{
                                    backgroundColor: "#F21F21",
                                    padding: "4px 8px",
                                    margin: "3px",
                                    borderRadius: 5,
                                    fontSize: "15px",
                                    color: "#fff",
                                  }}
                                >
                                  Poor
                                </span>
                              </>
                            }
                            sx={{
                              bgcolor: "grey",
                              textAlign: "left",
                              fontSize: 10,
                            }}
                          />

                          <CardContent>
                            <Box
                              sx={{
                                width: "80%",
                                margin: "0 auto",
                                minHeight: "8rem",
                              }}
                            >
                              {showWord.map((word, index) => (
                                <Typography
                                  key={index}
                                  variant="body1"
                                  sx={{
                                    bgcolor: word.color,
                                    display: "inline-block",
                                    padding: "4px 8px",
                                    margin: "2px",
                                    borderRadius: 5,
                                    color: "#fff",
                                  }}
                                >
                                  {word.name}
                                </Typography>
                              ))}
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}
          </Box>
          <Box
            sx={{
              ...Sections.next,
              width: checkAnswerState ? "100%" : "100vw",
            }}
          >
            <Button
              variant="contained"
              onClick={clickHandler}
              sx={{
                mr: "1rem",
                mb: "1rem",
                position: checkAnswerState ? "relative" : "absolute",
                right: 10,
              }}
              disabled={
                checkByAdmin === true
                  ? false
                  : ((recordingCount < 1 && recordingStatus === true) ||
                      waitRecording ||
                      next) &&
                    !checkAnswerState
                  ? true
                  : false
              }
            >
              {waitRecording || next ? (
                <CircularProgress size="1rem"></CircularProgress>
              ) : (
                ""
              )}
              Next
            </Button>
          </Box>
        </Box>
      </>
    </ErrrorBoundaryClass>
  );
}

export default ReusableTest;
