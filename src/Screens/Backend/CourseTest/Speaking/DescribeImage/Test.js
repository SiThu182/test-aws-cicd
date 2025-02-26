import { Box, Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useRef, createContext } from "react";
import swal from "sweetalert";
import { useCallback } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import DictionaryModal from "../../../../../components/DictionaryModal";
import { fetchPostsByPageAsync } from "../../../../../redux/thunk/Posts";
import { fetchScoreCount } from "../../../../../components/Backend/ScoreCountApi";

import "react-circular-progressbar/dist/styles.css";
import { requestAudio } from "../../../../../customHooks/Permissions/RequestPermission";

import { CalculatorScore } from "../CalculatorScore";
import getBlobDuration from "get-blob-duration";
import WaveSurfer from "wavesurfer.js";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import useCheckPermissions from "../../../../../customHooks/Permissions/CheckPermissions";
import AnswerParentComponent from "../../../../../components/Backend/UserAnswerComponents/AnswerParent";

import TestPreparationCard from "../../../../../components/Backend/TestCard/TestPreparationCard";

import PracticeLayout from "../../../../../components/Backend/PracticeLayout/PracticeLayout";
import { getCookie } from "../../../../../Utils/GetCookies";
export const DataForDiAnswerContext = createContext();

const TestDI = () => {
  const frontendURL = process.env.REACT_APP_FRONTEND_URL;
  const { systemErrorStatus } = useSelector((state) => state.systemInfoAlert);
  const permissionState = useCheckPermissions();
  const [cleanCheckPermission, setCleanCheckPermission] = useState(true);
  const { postsByPage, loading, status } = useSelector((state) => state.posts);
  const [modalOpen, setModalOpen] = useState(false);
  const [dictWord, setDictWord] = useState("");
  const [resetState, setResetState] = useState(false);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  let postPath = "get-test-post-di";
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  //State

  // let [loading,setLoading] = useState(true)
  let [recorder, setRecorder] = useState();
  const [beginningCounterCount, setBeginningCounterCount] = useState(25);
  let [stoppedBeginInterval, setStoppedBeginInterval] = useState(false);
  let [beepSound, setBeepSound] = useState(false);
  //  const [stoppedRecordInterval,setStoppedRecordInterval] = useState(true);
  const [blobUrl, setBlobUrl] = useState("");
  const [answer, setAnswer] = useState(false);
  const [overall_result, setOverallResult] = useState([]);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [errorStore, setErrorStore] = useState(false);
  const [errorScore, setErrorScore] = useState(false);

  const [recordingCounterCount, setRecordingCounterCount] = useState(0);
  const [stoppedRecordInterval, setStoppedRecordInterval] = useState(true);

  let [isStatusBeginning, setIsStatusBeginning] = useState(true);
  let [isStatusRecording, setIsStatusRecording] = useState(false);
  let [totalPage, setTotalPage] = useState("");
  let [pagePaginate, setPagePaginate] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  const [startTime, setStartTime] = useState([]);
  let [image, setImage] = useState();

  let [isFinish, setIsFinish] = useState(false);
  let [retry, setRetry] = useState(false);
  // const [status, setStatus] = useState(false);
  const [page, setPage] = useState(1);
  const [blob, setBlob] = useState("");
  const [content, setContent] = useState("");

  //speech to text
  // const [recognition, setRecognition] = useState(null);
  // const [recording, setRecording] = useState(false);
  // const [language, setLanguage] = useState("en-US");
  // const [result, setResult] = useState("");
  // const [interimResult, setInterimResult] = useState("");
  // const [downloadDisabled, setDownloadDisabled] = useState(true);

  //audio waveform
  const [audioPlay, setAudioPlay] = useState(false);

  const waveformRef = useRef(null);
  const waveSurfer = useRef(null);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (blob !== "") {
      // Initialize WaveSurfer when the component mounts
      waveSurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        height: 100,
        // Other configuration options here
      });

      // Load the audio file when it's selected
      if (blob !== "") {
        waveSurfer.current.loadBlob(blob);
      }
      // waveSurfer.current.load(`${process.env.PUBLIC_URL}/64e8b09418275.wav`);

      return () => {
        // Clean up the WaveSurfer instance when the component unmounts
        waveSurfer.current.destroy();
      };
    }
  }, [blob, postsByPage]);

  const handlePlay = () => {
    setAudioPlay(true);
    waveSurfer.current.play();
  };

  const handlePause = () => {
    setAudioPlay(false);

    waveSurfer.current.pause();
  };

  const languages = [
    { code: "en-US", name: "English (US)" },
    { code: "en-GB", name: "English (UK)" },
    { code: "es-ES", name: "Español" },
    { code: "fr-FR", name: "Français" },
    { code: "de-DE", name: "Deutsch" },
    { code: "it-IT", name: "Italiano" },
    { code: "ja-JP", name: "日本語" },
    { code: "ko-KR", name: "한국어" },
    { code: "pt-BR", name: "Português (Brasil)" },
    { code: "ru-RU", name: "Русский" },
    { code: "zh-CN", name: "中文 (中国)" },
  ];

  // const speechToText = () => {
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
  //         setInterimResult("");
  //       } else {
  //         setInterimResult(" " + speechResult);
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
  // };

  //end speech to text

  //check audio permission
  //check permission and request

  useEffect(() => {
    if (
      permissionState.permissionAllowed &&
      cleanCheckPermission &&
      systemErrorStatus === null
    ) {
      requestAudio().then((createRecorder) => {
        setRecorder(createRecorder);

        setCleanCheckPermission(false);
      });
    }
  }, [permissionState, cleanCheckPermission, systemErrorStatus]);

  //getTotal page
  useEffect(() => {
    if (postsByPage.data !== undefined) {
      setTotalPage(postsByPage.data.total);
      let i = 1;
      let Paginate = [];
      while (i <= totalPage) {
        Paginate.push(i);
        i++;
      }
      setPagePaginate(Paginate);
      setContent(postsByPage.data.data[0].content);
      setCurrentPage(postsByPage.data.current_page);
    }
  }, [setPagePaginate, postsByPage, totalPage]);
  //get post
  useEffect(() => {
    dispatch(fetchPostsByPageAsync({ path: postPath, page: page }));
  }, [dispatch, postPath, page]);

  //start begin interval
  useEffect(() => {
    //begin interval
    let beginInterval = (flag) => {
      if (!flag && systemErrorStatus === null) {
        const interval = setInterval(() => {
          setBeginningCounterCount((prevBegin) => prevBegin - 1);
        }, 1000);
        return interval;
      }
    };
    if (
      postsByPage.data !== undefined &&
      postsByPage.data.data.length !== 0 &&
      loading === false
    ) {
      setIsStatusBeginning(true);
      postsByPage.data.data[0].media_type === "1"
        ? setImage(postsByPage.data.data[0].media)
        : setImage(
            `${process.env.REACT_APP_BACKEND_URL}storage/di/${postsByPage.data.data[0].media}`
          );
      let interval = beginInterval(stoppedBeginInterval);

      return () => clearInterval(interval);
    }
  }, [
    stoppedBeginInterval,
    isStatusBeginning,
    systemErrorStatus,
    postsByPage,
    loading,
    beginningCounterCount,
  ]);

  let start = useCallback(() => {
    let audio = new Audio(frontendURL + "/beep.mp3");
    setIsStatusBeginning(false);
    setIsStatusRecording(true);
    audio.play();

    if (systemErrorStatus === null) {
      recorder.startRecording();
      setStoppedRecordInterval(false);
      // speechToText();
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [systemErrorStatus, recorder, frontendURL]);

  //stop begin interval
  useEffect(() => {
    if (beginningCounterCount < 1) {
      setStoppedBeginInterval(true);
      setBeepSound(true);
    }
  }, [beginningCounterCount]);

  useEffect(() => {
    if (beepSound) {
      start();
      setBeepSound(false);
    }
  }, [beepSound, start]);
  //record Interval
  let recordInterval = useCallback(
    (flag) => {
      if (!flag && systemErrorStatus === null) {
        const interval = setInterval(() => {
          setRecordingCounterCount((preCount) => preCount + 1);
        }, 1000);
        return interval;
      }
    },
    [systemErrorStatus]
  );
  //Record start
  useEffect(() => {
    if (stoppedBeginInterval) {
      let interval = recordInterval(stoppedRecordInterval);

      return () => clearInterval(interval);
    }
  }, [stoppedRecordInterval, stoppedBeginInterval, recordInterval]);

  useEffect(() => {
    let recordingCount = 40;
    // save audio
    let save_audio = async () => {
      await recorder.stopRecording();
      // recognition !== null && recognition.stop();
      SpeechRecognition.stopListening();

      let blob = await recorder.getBlob();
      // this.setState({msg:'stop recording'})
      const blobURL = URL.createObjectURL(blob);
      setBlobUrl(blobURL);
      setBlob(blob);
      setIsFinish(true);
    };
    if (recordingCounterCount >= recordingCount) {
      // setState({})
      setStoppedRecordInterval(true);
      save_audio();
    }
  }, [recordingCounterCount, recorder]);

  //record end

  let skip = () => {
    setBeginningCounterCount(0);
  };
  let finish = () => {
    setRecordingCounterCount(40);
  };

  // let controller = new AbortController();
  //transcript useEffect
  useEffect(() => {
    if (listening && isStatusRecording) {
      // let lastArray = transcript?.split(" ");
      // console.log(transcript);
      // console.log(lastArray);
      // if (lastArray[lastArray?.length - 1] !== " ") {

      const currentTime = new Date().getTime();

      setStartTime((prev) => [...prev, currentTime]);
      // }
    }
  }, [transcript, listening, isStatusRecording]);
  //upload & get score
  let upload = async () => {
    if (transcript !== undefined && transcript !== "") {
      setAnswerLoading(true);

      // formData.append("audio", blob, "tmp.mp3");

      let id = localStorage.getItem("userId");
      let response = await fetchScoreCount(
        id,
        1,
        postsByPage.data.data[0].id,
        "di"
      );

      //Calculate score
      let rec_duration = await getBlobDuration(blobUrl);
      let user_recognize_words = transcript.toLocaleLowerCase();

      // let content_arr = content.split(/[\(\),\s]+/).filter(Boolean).map(content => content.replace(/\./g, '').trim());
      // let char_arr = user_recognize_words.split(/[\(\),\s]+/).filter(Boolean).map(user_recognize_words => user_recognize_words.replace(/\./g, '').trim());

      if (response === 1) {
        let overall_result = CalculatorScore(
          content.toLocaleLowerCase(),
          user_recognize_words,
          rec_duration.toFixed(2),
          "di",
          startTime,
          postsByPage.data.data[0].keyword_length
        );

        setOverallResult(overall_result);

        setAnswerLoading(true);

        try {
          // Store data in our db
          setAnswer(true);
          setOverallResult(overall_result);
          setAnswerLoading(false);
          setRetry(true);

          // Store data in our db
          let token = getCookie("userToken");
          let id = localStorage.getItem("userId");

          //for point contribution in format content ,pronunciation,fluency
          let points = {
            content: overall_result.content_ninety,
            pronunciation: overall_result.pronunciation_ninety,
            fluency: overall_result.fluency_ninety,
          };

          var formData = new FormData();

          let file = new File([blob], "filename.webm", {
            type: "audio/webm;codecs=opus",
          });
          formData.append("audio", file, "tmp.mp3", { type: "audio/webm" });
          formData.append(
            "length_of_recording_in_sec",
            rec_duration.toFixed(2)
          );
          formData.append(
            "number_of_recognized_words",
            overall_result.number_of_recognized_words
          );
          formData.append(
            "number_of_words_in_post",
            overall_result.number_of_words_in_post
          );
          formData.append("overall_points", overall_result.overall_points);
          // formData.append("post_language_id" ,overall_result.post_language_id);
          // "post_language_name" ,overall_result.post_language_name,
          formData.append("user_recording_transcript", transcript);
          formData.append("post_id", postsByPage.data.data[0].id);
          formData.append("category", "di");
          formData.append("user_id", id);
          formData.append("points", JSON.stringify(points));

          if (!token) this.props.navigate("/login");
          else {
            let config = { headers: { Authorization: "Bearer " + token } };
            try {
              await axios.post(`${backendURL}scores-ra`, formData, config);
            } catch (error) {
              setErrorStore(true);
              alert("Store result error please retake the exam");
            }
          }
        } catch (error) {
          setErrorStore(true);

          alert("Store result error please retake the exam");
        }

        return;
      } else {
        setAnswerLoading(false);
      }
    } else {
      swal({
        title: "Warning",
        text: "Audio not recognized .Please retry .",
        icon: "warning",
        button: "OK!",
      });
      setRetry(true);
    }
  };

  //reset state for nxt & prev
  let reset = () => {
    setResetState(true);
    setTimeout(() => {
      if (stoppedBeginInterval === true && stoppedRecordInterval === false) {
        recorder.stopRecording();
        // recognition !== null && recognition.stop();
        SpeechRecognition.stopListening();
      }

      setIsFinish(false);

      setAnswerLoading(false);
      setAnswer(false);
      setRetry(false);
      setBlob("");
      setErrorUpload(false);
      setErrorStore(false);
      setErrorScore(false);
      setStoppedBeginInterval(false);
      setStoppedRecordInterval(false);
      setBeginningCounterCount(25);
      setRecordingCounterCount(0);
      setIsStatusBeginning(false);
      setIsStatusRecording(false);
      // setResult("");
      setStartTime([]);
      resetTranscript();
      setAudioPlay(false);
      setResetState(false);
    }, 2000);
  };

  let option = "";

  if (status === "loading") {
    option = (
      <>
        <option>Loading</option>
      </>
    );
  }
  if (status === "failed") {
    option = (
      <>
        <option>Fail to fetch data</option>
      </>
    );
  } else {
    option = pagePaginate.map((item, index) => {
      return (
        <option
          key={index}
          value={item}
          style={{ textAlign: "center", marginLeft: "0.5rem" }}
        >
          {item}/{totalPage}
        </option>
      );
    });
  }

  const AnswerBlock = () => {
    return (
      <>
        {answer ? (
          <>
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
                }}
              >
                <Box sx={{ width: "10%", minWidth: "8rem", margin: "0 auto" }}>
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
                    value={overall_result.pronunciation_ninety}
                    maxValue={90}
                    text={`${overall_result.pronunciation_ninety}/90`}
                  />
                </Box>

                <Box sx={{ width: "10%", minWidth: "8rem", margin: "0 auto" }}>
                  <h3
                    style={{ whiteSpace: "nowrap", textAlign: "center", my: 2 }}
                  >
                    Fluency
                  </h3>
                  <CircularProgressbar
                    value={overall_result.fluency_ninety}
                    maxValue={90}
                    text={`${overall_result.fluency_ninety}/90`}
                  />
                </Box>

                <Box sx={{ width: "10%", minWidth: "8rem", margin: "0 auto" }}>
                  <h3 style={{ whiteSpace: "nowrap" }}>Content</h3>
                  <CircularProgressbar
                    value={overall_result.content_ninety}
                    maxValue={90}
                    text={`${overall_result.content_ninety}/90`}
                  />
                </Box>

                <Box sx={{ width: "10%", minWidth: "8rem", margin: "0 auto" }}>
                  <h3 style={{ whiteSpace: "nowrap" }}>Final</h3>
                  <CircularProgressbar
                    value={overall_result.overall_points_ninety}
                    maxValue={90}
                    text={`${overall_result.overall_points_ninety.toFixed(2)}`}
                  />
                </Box>
                <br />
              </Box>
            </Box>
          </>
        ) : (
          ""
        )}

        {retry && (
          <Box sx={{ textAlign: "left", my: 2 }}>
            <Button
              variant="contained"
              disabled={!retry}
              onClick={() => reset()}
            >
              Retry
            </Button>
          </Box>
        )}
      </>
    );
  };
  return (
    <>
      <PracticeLayout
        category={"di"}
        setPage={setPage}
        reset={reset}
        status={status}
        postsByPage={postsByPage}
        backPath={"/admin/speaking"}
        navTitle={"Describe Image"}
        categoryQuestion={
          " Look at the graph below. In 25 seconds, please speak into the microphone and describe in detail what the graph is showing. You will have 40 seconds to give your response."
        }
        upload={upload}
        page={page}
        totalPage={totalPage}
        error={errorUpload || errorStore || errorScore}
        disableReset={status === "succeeded" && !resetState ? false : true}
        disableSubmit={
          status === "succeeded"
            ? !isFinish ||
              answerLoading ||
              retry ||
              errorScore ||
              errorStore ||
              errorUpload ||
              resetState
              ? true
              : false
            : true
        }
        disableAudioText={
          status === "succeeded"
            ? postsByPage?.data !== undefined &&
              postsByPage?.data !== null &&
              !resetState
              ? false
              : true
            : true
        }
        disablePrev={
          status === "succeeded" && !resetState
            ? currentPage === 1
              ? true
              : false
            : true
        }
        disableNext={
          status === "succeeded" && !resetState
            ? currentPage === totalPage
              ? true
              : false
            : true
        }
        audioText={
          status === "succeeded" ? postsByPage.data?.data[0]?.audio_text : null
        }
        audio={
          postsByPage?.data?.data[0]?.media_type === "1"
            ? postsByPage?.data?.data[0]?.media
            : `${process.env.REACT_APP_BACKEND_URL}storage/di/${postsByPage?.data?.data[0]?.media}`
        }
        answerBlock={() => <AnswerBlock />}
        answerTemplate={postsByPage?.data?.data[0]?.answer_template}
        answerLoading={answerLoading}
        answer={answer}
        disableAnswer={status === "succeeded" && !resetState ? false : true}
        // answerTabs={() => (
        //   <AnswerTabs content={content} postsByPage={postsByPage} />
        // )}
      >
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                lg: "row",
              },
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box sx={{ margin: "0 auto", height: "50vh", py: 1 }}>
              {status === "loading" || status === "succeeded" ? (
                loading ? (
                  <Box
                    sx={{
                      width: "5%",
                      margin: "0 auto",
                    }}
                  >
                    <CircularProgress sx={{ textAlign: "center" }} />
                  </Box>
                ) : (
                  postsByPage.data &&
                  (postsByPage.data.data.length !== 0 ? (
                    <img
                      alt="Discribe_Img"
                      src={image}
                      style={{
                        backgroundColor: "#000",
                        height: "100%",
                        width: "100%",
                        marginLeft: {
                          md: "1rem",
                          sm: "0rem",
                          xs: "0rem",
                        },
                      }}
                    />
                  ) : (
                    <Typography>No Content Yet</Typography>
                  ))
                )
              ) : (
                <Typography sx={{ color: "red", textAlign: "center" }}>
                  Fail to fetch data
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                margin: "0 auto",
                width: {
                  xs: "60%",
                  lg: "30%",
                },
              }}
            >
              <Box sx={{ margin: "0 auto", width: "90%" }}>
                <TestPreparationCard
                  status={status}
                  loading={loading}
                  isFinish={isFinish}
                  isStatusRecording={isStatusRecording}
                  recordingCounterCount={recordingCounterCount}
                  beginningCounterCount={beginningCounterCount}
                  handlePause={handlePause}
                  handlePlay={handlePlay}
                  waveformRef={waveformRef}
                  audioPlay={audioPlay}
                  skip={skip}
                  skipDisabled={
                    recorder === null || recorder === undefined ? true : false
                  }
                  resetState={resetState}
                  finish={finish}
                />
              </Box>
            </Box>
          </Box>
        </>
        <DictionaryModal
          word={dictWord}
          open={modalOpen}
          setOpen={setModalOpen}
        />
      </PracticeLayout>

      <DataForDiAnswerContext.Provider value={content}>
        <Box sx={{ width: "100%", p: 2 }}>
          <AnswerParentComponent
            postId={postsByPage.data?.data[0]?.id}
            type="Speaking"
            category={"di"}
          />
        </Box>
      </DataForDiAnswerContext.Provider>
    </>
  );
};

export default TestDI;
