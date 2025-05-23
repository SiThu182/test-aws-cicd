import { Box, CircularProgress, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import axios from "axios";
import getBlobDuration from "get-blob-duration";
import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  createContext,
} from "react";
import swal from "sweetalert";
import { CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchScoreCount } from "../../../../../components/Backend/ScoreCountApi";
import { fetchPostsByPageAsync } from "../../../../../redux/thunk/Posts";
import { CalculatorScore } from "../CalculatorScore";

import "react-circular-progressbar/dist/styles.css";
import WaveSurfer from "wavesurfer.js";
import { requestAudio } from "../../../../../customHooks/Permissions/RequestPermission";
import useCheckPermissions from "../../../../../customHooks/Permissions/CheckPermissions";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import AnswerParentComponent from "../../../../../components/Backend/UserAnswerComponents/AnswerParent";
import TestPreparationCard from "../../../../../components/Backend/TestCard/TestPreparationCard";
import PracticeLayout from "../../../../../components/Backend/PracticeLayout/PracticeLayout";
import { getCookie } from "../../../../../Utils/GetCookies";
import { Speak } from "../../../../../Utils/TTS";
import DictionaryModal from "../../../../../components/DictionaryModal";

export const DataForRaAnswerContext = createContext();
const AnswerTabs = ({ content, postsByPage }) => {
  return (
    <DataForRaAnswerContext.Provider value={content}>
      <Box sx={{ width: "100%", p: 2 }}>
        <AnswerParentComponent
          postId={postsByPage.data?.data[0]?.id}
          type="Speaking"
          category={"ra"}
        />
      </Box>
    </DataForRaAnswerContext.Provider>
  );
};

const TestRA = () => {
  let frontendURL = process.env.REACT_APP_FRONTEND_URL;
  const { postsByPage, loading, status } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [dictWord, setDictWord] = useState("");
  const dispatch = useDispatch();
  let postPath = "get-test-post-ra";
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  const permissionState = useCheckPermissions();
  const { systemErrorStatus } = useSelector((state) => state.systemInfoAlert);

  const [cleanCheckPermission, setCleanCheckPermission] = useState(true);

  let [recorder, setRecorder] = useState();
  const [beginningCounterCount, setBeginningCounterCount] = useState(40);
  let [stoppedBeginInterval, setStoppedBeginInterval] = useState(false);

  const [blobUrl, setBlobUrl] = useState("");
  const [answer, setAnswer] = useState(false);
  const [overall_result, setOverallResult] = useState([]);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [errorStore, setErrorStore] = useState(false);
  const [errorScore, setErrorScore] = useState(false);

  const [recordingCounterCount, setRecordingCounterCount] = useState(0);
  const [stoppedRecordInterval, setStoppedRecordInterval] = useState(true);

  const [startTime, setStartTime] = useState([]);

  // let [isBlocked, setIsBlocking] = useState(false);
  let [isStatusBeginning, setIsStatusBeginning] = useState(true);
  let [isStatusRecording, setIsStatusRecording] = useState(false);
  let [totalPage, setTotalPage] = useState("");
  let [content, setContent] = useState("");
  let [beepSound, setBeepSound] = useState(false);
  let [retry, setRetry] = useState(false);

  let [currentPage, setCurrentPage] = useState(1);
  let [isFinish, setIsFinish] = useState(false);

  const [page, setPage] = useState(1);
  const [blob, setBlob] = useState("");
  const [audioPlay, setAudioPlay] = useState(false);

  const [resetState, setResetState] = useState(false);

  let [showWord, setShowWord] = useState([]);

  const waveformRef = useRef(null);
  const waveSurfer = useRef(null);
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  console.log(
    transcript,
    "<>",
    interimTranscript.interimTranscript,
    "<>",
    finalTranscript,
    "<>",
    listening,
    "<>",
    browserSupportsSpeechRecognition,
    "<>",
    isMicrophoneAvailable
  );

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

  //check audio permission
  //check permission and request
  useEffect(() => {
    if (permissionState.permissionAllowed && cleanCheckPermission) {
      requestAudio().then((createRecorder) => {
        setRecorder(createRecorder);
        setCleanCheckPermission(false);
      });
    }
  }, [permissionState, cleanCheckPermission]);

  //get post
  useEffect(() => {
    dispatch(fetchPostsByPageAsync({ path: postPath, page: page }));
  }, [dispatch, postPath, page]);

  //getTotal page
  useEffect(() => {
    if (postsByPage.data !== undefined && postsByPage.data.data.length !== 0) {
      setTotalPage(postsByPage.data.total);
      setCurrentPage(postsByPage.data.current_page);
      setContent(postsByPage.data.data[0].content);
    }
  }, [postsByPage, totalPage]);
  //start begin interval
  useEffect(() => {
    //begin interval
    let beginInterval = (flag) => {
      if (!flag) {
        const interval = setInterval(() => {
          setBeginningCounterCount((prevBegin) => prevBegin - 1);
        }, 1000);
        return interval;
      }
    };
    if (
      postsByPage.data !== undefined &&
      postsByPage.data?.data.length !== 0 &&
      loading === false
    ) {
      setIsStatusBeginning(true);
      let interval = beginInterval(stoppedBeginInterval);
      return () => clearInterval(interval);
    }
  }, [
    stoppedBeginInterval,
    isStatusBeginning,
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
      // let recordingIncrement;

      recorder.startRecording();

      // speechToText();
      SpeechRecognition.startListening({ continuous: true });

      setStoppedRecordInterval(false);
      // setStatus(true)

      setStoppedBeginInterval(true);
    }
  }, [recorder, systemErrorStatus, frontendURL]);
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
  let recordInterval = useCallback((flag) => {
    if (!flag) {
      const interval = setInterval(() => {
        setRecordingCounterCount((preCount) => preCount + 1);
      }, 1000);
      return interval;
    }
  }, []);

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
      let blob = await recorder.getBlob();
      const blobURL = URL.createObjectURL(blob);
      setBlobUrl(blobURL);
      setBlob(blob);
      setIsFinish(true);
      // recognition !== null && recognition.stop();
      SpeechRecognition.stopListening();

      // setRecording(false);
    };
    if (recordingCounterCount >= recordingCount) {
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

  //transcript useEffect
  useEffect(() => {
    if (listening && isStatusRecording) {
      // let lastArray = transcript?.split(" ");

      // if (lastArray[lastArray?.length - 1] !== " ") {

      const currentTime = new Date().getTime();

      setStartTime((prev) => [...prev, currentTime]);
      // }
    }
  }, [transcript, listening, isStatusRecording]);

  // let controller = new AbortController();
  //upload & get score
  let upload = async () => {
    //check scoring count
    if (transcript !== undefined && transcript !== "") {
      let id = localStorage.getItem("userId");
      setAnswerLoading(true);
      let user_recognize_words = transcript.toLocaleLowerCase();
      let rec_duration = await getBlobDuration(blobUrl);
      let overall_result = CalculatorScore(
        content.toLocaleLowerCase(),
        user_recognize_words,
        rec_duration.toFixed(2),
        "ra",
        startTime
      );
      setOverallResult(overall_result);

      let response = await fetchScoreCount(
        id,
        1,
        postsByPage.data.data[0].id,
        "ra"
      );

      let content_arr = content
        .split(/[\(\),\s]+/)
        .filter(Boolean)
        .map((content) => content.replace(/\./g, "").trim());
      let char_arr = user_recognize_words
        .split(/[\(\),\s]+/)
        .filter(Boolean)
        .map((user_recognize_words) =>
          user_recognize_words.replace(/\./g, "").trim()
        );
      // let   = 0;
      let lowercase_content_arr = content_arr.map((content) =>
        content.toLowerCase()
      );
      let lowercase_char_arr = char_arr.map((char) => char.toLowerCase());
      setShowWord([]);
      lowercase_content_arr.forEach((check_char, index) => {
        if (lowercase_char_arr.includes(check_char)) {
          //remove match word from user answer array to avoid counting or matching twice in some case
          let indexToRemove = lowercase_char_arr.indexOf(check_char);
          lowercase_char_arr.splice(indexToRemove, 1);
          showWord.push({ name: content_arr[index], color: "#16A085" }); // This would mutate the state, which is not allowed
          setShowWord(showWord);
        } else {
          showWord.push({ name: content_arr[index], color: "#F21F21" }); // This would mutate the state, which is not allowed
          setShowWord(showWord);
        }
      });

      if (response === 1) {
        //for point contribution array in format content ,pronunciation,fluency
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
        formData.append("length_of_recording_in_sec", rec_duration);
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
        formData.append("category", "ra");
        formData.append("user_id", user.data.id);
        formData.append("points", JSON.stringify(points));

        setAnswerLoading(true);
        setOverallResult(overall_result);
        try {
          // Store data in our db
          setRetry(true);
          setAnswer(true);

          setAnswerLoading(false);
          let token = getCookie("userToken");
          if (!token) this.props.navigate("/login");
          else {
            let config = {
              headers: { Authorization: "Bearer " + token },
            };
            await axios.post(`${backendURL}scores-ra`, formData, config);

            // setRetry(true);
          }
        } catch (error) {
          setErrorStore(true);
          alert("Store result error please retake the exam");
        }
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

        waveSurfer !== null &&
          waveSurfer.current !== null &&
          waveSurfer.current.pause();
      }
      setIsFinish(false);
      setStartTime([]);
      setAnswerLoading(false);
      setAnswer(false);
      setErrorUpload(false);
      setErrorStore(false);
      setBlob("");
      setErrorScore(false);
      setStoppedBeginInterval(false);
      setStoppedRecordInterval(false);
      setBeginningCounterCount(40);
      setRecordingCounterCount(0);
      setIsStatusBeginning(false);
      setIsStatusRecording(false);
      setRetry(false);
      resetTranscript();
      setResetState(false);
      // setResult("");

      // setRecording(false);
      setShowWord([]);
      setAudioPlay(false);
    }, 2000);
  };

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
                  borderRadius: "1rem 1rem  0rem 0rem",
                }}
              >
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
                    value={overall_result.pronunciation_ninety}
                    maxValue={90}
                    text={`${overall_result.pronunciation_ninety}/90`}
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
                    value={overall_result.fluency_ninety}
                    maxValue={90}
                    text={`${overall_result.fluency_ninety}/90`}
                  />
                </Box>

                <Box sx={{ width: "10%", margin: "0 auto" }}>
                  <h3 style={{ whiteSpace: "nowrap" }}>Content</h3>
                  <CircularProgressbar
                    value={overall_result.content_ninety}
                    maxValue={90}
                    text={`${overall_result.content_ninety}/90`}
                  />
                </Box>

                <Box sx={{ width: "10%", margin: "0 auto" }}>
                  <h3 style={{ whiteSpace: "nowrap" }}>Final</h3>
                  <CircularProgressbar
                    value={overall_result.overall_points_ninety}
                    maxValue={90}
                    text={`${overall_result.overall_points_ninety.toFixed(2)}`}
                  />
                </Box>
              </Box>

              {/* <div className="my-5 row justify-content-center text-center">
                                        <div className="col-md-6">
                                            <audio src={this.state.blobURL} controls></audio>
                                        </div>
                                    </div> */}
              <Box
                sx={{
                  width: "100%",
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
                    <Box sx={{ width: "80%", margin: "0 auto" }}>
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
            </Box>
          </>
        ) : (
          ""
        )}
      </>
    );
  };

  return (
    <>
      <PracticeLayout
        category="ra"
        setPage={setPage}
        reset={reset}
        status={status}
        postsByPage={postsByPage}
        backPath={"/admin/speaking"}
        navTitle={"Read Aloud"}
        categoryQuestion={
          "Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud."
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
        audioText={postsByPage?.data?.data[0]?.content}
        audio={
          postsByPage?.data?.data[0]?.media_type === "1"
            ? postsByPage?.data?.data[0]?.media
            : `${process.env.REACT_APP_BACKEND_URL}storage/ra/${postsByPage?.data?.data[0]?.media}`
        }
        answerBlock={() => <AnswerBlock />}
        answerLoading={answerLoading}
        answer={answer}
        // answerTabs={() => (
        //   <AnswerTabs content={content} postsByPage={postsByPage} />
        // )}
      >
        <>
          <Box sx={{ margin: "0 auto", width: "60%" }}>
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

          <Box sx={{ margin: "0 auto", width: "100%", py: 4 }}>
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
                content.split(" ").map((word, index) => (
                  <Typography
                    variant="body5"
                    key={index}
                    sx={{
                      fontSize: "1.2rem",
                      whiteSpace: "pre-wrap",
                      "&:hover": {
                        background: "#edff34",
                      },
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      Speak(e.target.innerText);
                      setDictWord(e.target.innerText);
                      setModalOpen(true);
                    }}
                  >
                    {word}{" "}
                  </Typography>
                ))
              )
            ) : (
              <Typography sx={{ textAlign: "center", color: "red" }}>
                Fail to fetch data
              </Typography>
            )}
          </Box>
        </>
        <DictionaryModal
          word={dictWord}
          open={modalOpen}
          setOpen={setModalOpen}
        />
      </PracticeLayout>

      <DataForRaAnswerContext.Provider value={content}>
        <Box sx={{ width: "100%", p: 2 }}>
          <AnswerParentComponent
            postId={postsByPage.data?.data[0]?.id}
            type="Speaking"
            category={"ra"}
          />
        </Box>
      </DataForRaAnswerContext.Provider>
    </>
  );
};

export default TestRA;
