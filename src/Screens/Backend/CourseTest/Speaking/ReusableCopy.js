import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import React, { useEffect, useState, useRef, createContext } from "react";
import { useCallback } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";

import { fetchPostsByPageAsync } from "../../../../redux/thunk/Posts";
import { fetchScoreCount } from "../../../../components/Backend/ScoreCountApi";
import BrowserType from "../../../../components/Backend/BrowserType";

import { CalculatorScore } from "./CalculatorScore";
import getBlobDuration from "get-blob-duration";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import WaveSurfer from "wavesurfer.js";

import { requestAudio } from "../../../../customHooks/Permissions/RequestPermission";
import useCheckPermissions from "../../../../customHooks/Permissions/CheckPermissions";

import AnswerParentComponent from "../../../../components/Backend/UserAnswerComponents/AnswerParent";
import PaginationAndButtonLayout from "../../../../components/Backend/PracticeComponents/PracticeButtonAndFunction";
import ReloadOrBackCard from "../../../../components/ReloadOrBackCard";
import SwipeableSideDrawer from "../../../../components/Backend/SideDrawer/SideDrawer";
import PageNavTitle from "../../../../components/Backend/PageTitle";

import TestPreparationAudioCard from "../../../../components/Backend/TestCard/TestPreparationAudioCard";
import BackButton from "../../../../components/Backend/BackButton";
import TestRecordingCard from "../../../../components/Backend/TestCard/TestRecordingCard";
import NoteCard from "../../../../components/Backend/NoteCard/NoteCard";
import { getCookie } from "../../../../Utils/GetCookies";

export const DataForReusableSpeakingComponent = createContext();

const ReusableTest = (props) => {
  let frontendURL = process.env.REACT_APP_FRONTEND_URL;
  const permissionState = useCheckPermissions();
  const { systemErrorStatus } = useSelector((state) => state.systemInfoAlert);
  const [cleanCheckPermission, setCleanCheckPermission] = useState(true);
  let { postsByPage, loading, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  //   let postPath = "get-test-post-rs";
  let postPath = props.path;
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  const audioRef = useRef(null);
  // let [loading,setLoading] = useState(true)
  let [recorder, setRecorder] = useState();
  const [beginningCounterCount, setBeginningCounterCount] = useState(
    props.beginningCounterCount
  );

  let [stoppedBeginInterval, setStoppedBeginInterval] = useState(false);

  const [recordingCounterCount, setRecordingCounterCount] = useState(0);
  const [stoppedRecordInterval, setStoppedRecordInterval] = useState(true);
  const [blobUrl, setBlobUrl] = useState("");

  //audio wave form and recording
  const [blob, setBlob] = useState("");
  const [audioPlay, setAudioPlay] = useState(false);

  const waveformRef = useRef(null);
  const waveSurfer = useRef(null);
  const {
    transcript,
    // interimTranscript,
    // finalTranscript,
    resetTranscript,
    listening,
    // browserSupportsSpeechRecognition,
    // isMicrophoneAvailable,
  } = useSpeechRecognition();
  console.log(transcript, "<>");

  // const [fetchOnce, setFetchOnce] = useState(true);
  const [assignPage, setAssignPage] = useState(true);
  const [answer, setAnswer] = useState(false);
  const [overall_result, setOverallResult] = useState([]);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [errorStore, setErrorStore] = useState(false);
  const [errorScore, setErrorScore] = useState(false);

  const [playingCounterCount, setplayingCounterCount] = useState(
    props.playingCounterCount
  );
  let [stoppedPlayingInterval, setStoppedPlayingInterval] = useState(false);
  let [playingStatus, setPlayingStatus] = useState(true);
  let [totalPage, setTotalPage] = useState("");
  let [pagePaginate, setPagePaginate] = useState([]);
  let [isStatusBeginning, setIsStatusBeginning] = useState(false);
  let [startRecord, setStartRecord] = useState(false);
  const [startTime, setStartTime] = useState([]);
  let [isStatusRecording, setIsStatusRecording] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  let [retry, setRetry] = useState(false);
  //needs to check
  let [playAudio, setPlayAudio] = useState("");
  let [playOnce, setPlayOnce] = useState(false);
  let [isFinish, setIsFinish] = useState(false);
  let [isPlaying, setIsPlaying] = useState(false);

  let [page, setPage] = useState(1);
  let [isPlayingStatus, setIsPlayingStatus] = useState(true);
  let [currentAudio, setCurrentAudio] = useState(0);
  let [content, setContent] = useState("");

  //speech to text
  // const [recognition, setRecognition] = useState(null);
  // const [recording, setRecording] = useState(false);
  // const [language, setLanguage] = useState("en-US");
  // const [result, setResult] = useState("");
  // const [interimResult, setInterimResult] = useState("");
  // const [downloadDisabled, setDownloadDisabled] = useState(true);

  let [showWord, setShowWord] = useState([]);

  const [resetState, setResetState] = useState(false);
  //show waveform
  useEffect(() => {
    if (blobUrl) {
      // Initialize WaveSurfer when the component mounts
      waveSurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        height: 100,
        // Other configuration options here
      });

      // Load the audio file when it's selected
      if (blob) {
        waveSurfer.current.loadBlob(blob);
      }
      // waveSurfer.current.load(`${process.env.PUBLIC_URL}/64e8b09418275.wav`);

      return () => {
        // Clean up the WaveSurfer instance when the component unmounts
        waveSurfer.current.destroy();
      };
    }
  }, [blobUrl, blob]);

  const handlePlay = () => {
    setAudioPlay(true);
    waveSurfer.current.play();
  };

  const handlePause = () => {
    setAudioPlay(false);

    waveSurfer.current.pause();
  };

  //duration
  // const [duration, setDuration] = useState(0);

  // const languages = [
  //   { code: "en-US", name: "English (US)" },
  //   { code: "en-GB", name: "English (UK)" },
  //   { code: "es-ES", name: "Español" },
  //   { code: "fr-FR", name: "Français" },
  //   { code: "de-DE", name: "Deutsch" },
  //   { code: "it-IT", name: "Italiano" },
  //   { code: "ja-JP", name: "日本語" },
  //   { code: "ko-KR", name: "한국어" },
  //   { code: "pt-BR", name: "Português (Brasil)" },
  //   { code: "ru-RU", name: "Русский" },
  //   { code: "zh-CN", name: "中文 (中国)" },
  // ];

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
  //     //  recognition.onspeechend = () => {
  //     //    speechToText();
  //     //  };
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
      permissionState.permissionAllowed === "granted" &&
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
      setCurrentPage(postsByPage.data.current_page);
      setContent(postsByPage.data.data[0].content);
    }
  }, [setPagePaginate, postsByPage, totalPage]);

  //get page data
  useEffect(() => {
    dispatch(fetchPostsByPageAsync({ path: postPath, page: page }));
    SpeechRecognition.stopListening();
  }, [dispatch, postPath, page]);

  //playing interval
  let playingInterval = useCallback(
    (flag) => {
      setPlayOnce(true);
      if (!flag && systemErrorStatus === null) {
        const interval = setInterval(() => {
          setplayingCounterCount((prevplaying) => prevplaying - 1);
        }, 1000);
        return interval;
      }
    },
    [systemErrorStatus]
  );

  //start playing counter count
  useEffect(() => {
    if (
      postsByPage.data !== undefined &&
      loading === false &&
      postsByPage.data?.data.length !== 0 &&
      !resetState
    ) {
      let media_type = postsByPage.data.data[0].media_type;
      let media = postsByPage.data.data[0].media;

      setPlayAudio(
        new Audio(
          media_type === "1"
            ? media
            : `${process.env.REACT_APP_BACKEND_URL}storage/${props.category}/${media}`
        )
      );
      let interval = playingInterval(stoppedPlayingInterval);
      return () => clearInterval(interval);
    }
  }, [
    playingCounterCount,
    postsByPage,
    resetState,
    stoppedPlayingInterval,
    page,
    playingInterval,
    props,
    loading,
  ]);

  //stop playing counter count
  useEffect(() => {
    if (playingCounterCount < 1) {
      setStoppedPlayingInterval(true);
    }
  }, [playingCounterCount, page, playOnce]);

  //start audio play
  useEffect(() => {
    if (stoppedPlayingInterval && systemErrorStatus === null && playOnce) {
      setIsPlaying(true);
      setPlayOnce(false);
      if (playingStatus) {
        const playAudiofun = () => {
          playAudio.onloadeddata = () => {
            if (playAudio.pause) {
              playAudio.play();
            }
            playAudio.onended = () => {
              setPlayingStatus(false);
              setIsPlaying(false);
            };
          };
        };
        playAudiofun();

        // return () => {
        //   setTimeout(() => {
        //     playAudio.pause();
        //   }, 500);
        // };
      }
    }
  }, [
    stoppedPlayingInterval,
    playAudio,
    isPlaying,
    page,
    playingStatus,
    playOnce,
    systemErrorStatus,
  ]);

  //start beginning counter count
  useEffect(() => {
    if (playingStatus === false) {
      setIsStatusBeginning(true);
      let beginInterval = (flag) => {
        if (!flag && systemErrorStatus === null) {
          const interval = setInterval(() => {
            if (beginningCounterCount < 0) {
              setBeginningCounterCount(0);
            } else {
              setBeginningCounterCount((prevBegin) => prevBegin - 1);
            }
          }, 1000);
          return interval;
        }
      };
      let interval = beginInterval(stoppedBeginInterval);
      return () => clearInterval(interval);
    }
  }, [
    stoppedBeginInterval,
    stoppedPlayingInterval,
    systemErrorStatus,
    playingStatus,
    beginningCounterCount,
    page,
  ]);

  //prepare state for recording
  let start = useCallback(() => {
    setIsStatusBeginning(false);
    setIsStatusRecording(true);
    if (props.category === "rl") {
      let audio = new Audio(frontendURL + "/beep.mp3");
      audio.play();
    }

    recorder.startRecording();
    setStoppedRecordInterval(false);
    // speechToText();
    SpeechRecognition.startListening({ continuous: true });
  }, [recorder, props.category, frontendURL]);

  //stop beginning counter count
  useEffect(() => {
    if (beginningCounterCount < 1) {
      setStoppedBeginInterval(true);
      setStartRecord(true);
    }
  }, [beginningCounterCount, page]);
  //start record
  useEffect(() => {
    if (startRecord) {
      start();
      setStartRecord(false);
    }
  }, [startRecord, start]);

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

  //stop recording counter count
  useEffect(() => {
    let recordingCount = props.recordingTotalCount;
    // save audio
    let save_audio = async () => {
      await recorder.stopRecording();
      let blob = await recorder.getBlob();
      // this.setState({msg:'stop recording'})
      const blobURL = URL.createObjectURL(blob);
      setBlobUrl(blobURL);

      setBlob(blob);
      // recognition !== null && recognition.stop();
      SpeechRecognition.stopListening();

      setIsFinish(true);
    };
    if (recordingCounterCount >= recordingCount) {
      setStoppedRecordInterval(true);
      save_audio();
    }
  }, [recordingCounterCount, page, recorder, props]);

  // let controller = new AbortController();
  //upload & get score

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
  let upload = async () => {
    // var formData = new FormData();

    if (transcript !== undefined && transcript !== "") {
      setAnswerLoading(true);
      // formData.append("audio", blob, "tmp.mp3");
      let id = localStorage.getItem("userId");
      let response = await fetchScoreCount(
        id,
        1,
        postsByPage.data.data[0].id,
        props.category
      );

      //Calculate score
      let rec_duration = await getBlobDuration(blobUrl);
      let user_recognize_words = transcript.toLocaleLowerCase();

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
      let lowercase_content_arr = content_arr.map((content) =>
        content.toLowerCase()
      );
      let lowercase_char_arr = char_arr.map((char) => char.toLowerCase());

      setShowWord([]);

      lowercase_content_arr.forEach((check_char, index) => {
        if (lowercase_char_arr.includes(check_char)) {
          //remove match word from user answer array to avoid counting or matching twice in some case
          if (props.category === "rs") {
            let indexToRemove = lowercase_char_arr.findIndex((item) =>
              item.includes(check_char)
            );

            lowercase_char_arr.splice(indexToRemove, 1);
          }
          showWord.push({ name: content_arr[index], color: "#16A085" }); // This would mutate the state, which is not allowed
          setShowWord(showWord);
        } else {
          showWord.push({ name: content_arr[index], color: "#F21F21" }); // This would mutate the state, which is not allowed
          setShowWord(showWord);
        }
      });

      if (response === 1) {
        let overall_result = CalculatorScore(
          content.toLowerCase(),
          user_recognize_words,
          rec_duration.toFixed(2),
          props.category,
          startTime,
          postsByPage.data.data[0].keyword_length
        );

        //for point contribution  in format content ,pronunciation,fluency

        let points = {
          content:
            props.category === "asq"
              ? overall_result.content
              : overall_result.content_ninety,
          pronunciation:
            props.category === "asq"
              ? null
              : overall_result.pronunciation_ninety,
          fluency:
            props.category === "asq" ? null : overall_result.fluency_ninety,
        };

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
          formData.append(
            "overall_points",
            props.category == "asq"
              ? overall_result.content_ninety == 90
                ? 1
                : 0
              : overall_result.overall_points
          );
          formData.append("points", JSON.stringify(points));
          // formData.append("post_language_id" ,overall_result.post_language_id);
          // "post_language_name" ,overall_result.post_language_name,
          formData.append("user_recording_transcript", transcript);
          formData.append("post_id", postsByPage.data.data[0].id);
          formData.append("category", props.category);
          formData.append("user_id", id);

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

        // try {
        //   const res = await axios.post(`${backendURL}recording`, formData, {
        //     headers: { "Content-Type": "multipart/form-data" },
        //   });

        //   if (res.status === 200) {
        //

        //     try {
        //       const res_score = await axios.post(
        //         `${backendURL}score/${postsByPage.data.data[0].post_id}`,
        //         { url: res.data.url },
        //         { signal: controller.signal }
        //       );

        //       if (res_score.status === 200) {

        //         let res_array = JSON.parse(res_score.data["response"]);
        //         const overall_result = res_array[1].overall_result_data[0];

        //         setAnswer(true);
        //         setOverallResult(overall_result);
        //         setAnswerLoading(false);
        //         setRetry(true);

        //         // Store data in our db
        //         let token = getCookie("userToken");
        //         let id = localStorage.getItem("userId");
        //         if (!token) this.props.navigate("/login");
        //         else {

        //           let config = { headers: { Authorization: "Bearer " + token } };
        //           try {
        //             await axios.post(
        //               `${backendURL}scores-rs`,
        //               {
        //                 ...overall_result,
        //                 ...{
        //                   post_id: postsByPage.data.data[0].post_id,
        //                   category: props.category,
        //                   user_id: id,
        //                 },
        //               },
        //               config
        //             );
        //           } catch (error) {
        //             setErrorStore(true);
        //             alert("Store result error please retake the exam");
        //           }
        //         }
        //       } else {
        //         alert(res.status);
        //         setAnswerLoading(false);
        //       }
        //     } catch (error) {
        //       setErrorScore(true);
        //       setAnswerLoading(false);
        //     }
        //   }
        // } catch (error) {
        //   alert(error.toJSON().message);
        //   setAnswerLoading(false);
        //   setErrorUpload(true);
        // }
      } else {
        setAnswerLoading(false);
      }
    } else {
      setRetry(true);
    }
  };

  let skip = () => {
    setBeginningCounterCount(0);
  };
  let finish = () => {
    setRecordingCounterCount(props.recordingTotalCount);
  };

  //reset state for next & prev
  let reset = () => {
    if (stoppedBeginInterval === true && stoppedRecordInterval === false) {
      recorder.stopRecording();
      // recognition !== null && recognition.stop();
      SpeechRecognition.stopListening();

      waveSurfer !== null &&
        waveSurfer.current !== null &&
        waveSurfer.current.pause();
    }
    setPlayAudio("");
    setAssignPage(true);
    setPlayingStatus(true);
    setPlayOnce(false);
    setplayingCounterCount(props.playingCounterCount);
    setRecordingCounterCount(0);
    setIsPlaying(false);
    setIsFinish(false);
    setStartTime([]);
    setCleanCheckPermission(true);
    setRetry(false);
    setAnswerLoading(false);
    setAnswer(false);
    setErrorUpload(false);
    setErrorStore(false);
    setErrorScore(false);

    setStoppedPlayingInterval(false);
    setStoppedBeginInterval(false);
    setStoppedRecordInterval(false);

    setBeginningCounterCount(props.beginningCounterCount);
    setIsStatusBeginning(false);
    setIsStatusRecording(false);
    setShowWord([]);
    // setResult("");
    setAudioPlay(false);
    resetTranscript();

    setResetState(true);

    setTimeout(() => {
      setResetState(false);
    }, 2000);
  };

  let next = () => {
    setPage(page * 1 + 1);
    reset();
  };

  let prev = () => {
    setPage(page - 1);

    reset();
  };

  //paginate with select drop down

  let goToPage = (e) => {
    reset();
    setPage(e.target.value);
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

  let playPause = () => {
    if (playAudio !== "") {
      if (playingCounterCount >= 1) {
        setplayingCounterCount(0);
        setStoppedPlayingInterval(true);
      }
      let currentPlaying = true;
      // Get state of song
      currentPlaying = isPlayingStatus;

      if (playAudio.currentTime >= playAudio.duration) {
        currentPlaying = false;
      }

      if (currentPlaying) {
        // Pause the song if it is playing
        playAudio.pause();
      } else {
        // Play the song if it is paused
        playAudio.play();
      }
      setIsPlayingStatus(!isPlayingStatus);

      // Change the state of song
      // this.setState({ isPlaying: !isPlaying });
    }
  };

  useEffect(() => {
    if (playAudio !== undefined || playAudio !== "") {
      const intervalId = setInterval(() => {
        playAudio.addEventListener("timeupdate", () => {
          const newTime = playAudio.currentTime;
          console.log(playAudio.currentTime);
          // setCurrentTime(newTime);
          setCurrentAudio(newTime);
        });
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [playAudio.currentTime, playAudio]);

  console.log("current audio");
  console.log(currentAudio);
  console.log(playAudio.currentTime);
  console.log(playAudio.pause ? "true" : "false");

  return (
    <>
      <SwipeableSideDrawer
        category={props.category}
        setPost={setPage}
        reset={reset}
        status={status}
        currentPage={postsByPage?.data?.data[0]?.post_number}
      />
      {status === "failed" && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 1,
            top: "40%",
            left: "40%",
            backdropFilter: "blur(20px)",
          }}
        >
          <ReloadOrBackCard header="Failed to fetch data .You can try reload or refresh" />
        </Box>
      )}
      <audio src={playAudio} ref={audioRef} />
      <BrowserType></BrowserType>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          my: 1.5,

          ml: "1rem",
          width: "100%",
        }}
      >
        <Typography variant="h5"></Typography>
        <BackButton path={"/admin/speaking"} />
      </Box>
      <PageNavTitle
        text={
          props.category === "rs"
            ? "Repeat Sentence"
            : props.category === "rl"
            ? "Retell Lecture"
            : "Answer Short Question"
        }
      />
      <Box
        sx={{
          width: "100%",
          px: 2,
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Box id="main" sx={{ width: { xs: "100%", md: "75%" } }}>
          <Box
            className="container-fluid"
            sx={{
              p: "0.5rem",
              bgcolor: "#fff",
              borderRadius: "1rem",
              boxShadow: 2,
            }}
          >
            <div className="card">
              <Typography sx={{ my: 2, fontSize: "1.2rem" }}>
                <span
                  style={{
                    backgroundColor: "#4dabf5",
                    color: "white",
                    borderRadius: "0.3rem",
                    padding: "0.3rem",
                  }}
                >
                  {props.category.toUpperCase()}
                  {status === "succeeded"
                    ? postsByPage?.data?.data[0]?.post_number
                    : "..."}
                </span>{" "}
                {props.category === "rs"
                  ? "  You will hear a sentence. Please repeat the sentence exactly as you hear it. You will hear the sentence only once."
                  : props.category === "rl"
                  ? " You will hear an Interview/Lecture. After listening to it, in 10 seconds, please speak into the microphone and retell what you have just heard from the lecture in your own words. You will have 40 seconds to give your response."
                  : "You will hear a question. Please give a simple and short answer. Often just one or a few words is enough."}
              </Typography>

              <Box sx={{ margin: "0 auto", width: "100%", mb: 4 }}>
                {status === "succeeded" && (
                  <Box sx={{ color: "#2196f3" }}>
                    <Typography variant="h6">
                      {postsByPage.data.data[0].title}
                    </Typography>
                  </Box>
                )}

                <TestPreparationAudioCard
                  status={status}
                  loading={loading}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  setPlayingStatus={setPlayingStatus}
                  playingStatus={playingStatus}
                  playingCounterCount={playingCounterCount}
                  startPlayingCounterCount={props.playingCounterCount}
                  playAudio={playAudio}
                  playPause={playPause}
                  isStatusRecording={isStatusRecording}
                  stoppedPlayingInterval={stoppedPlayingInterval}
                  currentAudio={currentAudio}
                  category={props.category}
                  postsByPage={postsByPage}
                />
              </Box>
              <Box sx={{ margin: "0 auto", width: "100%" }}>
                <TestRecordingCard
                  isFinish={isFinish}
                  isStatusBeginning={isStatusBeginning}
                  isStatusRecording={isStatusRecording}
                  recordingCounterCount={recordingCounterCount}
                  recordingTotalCount={props.recordingTotalCount}
                  beginningCounterCount={beginningCounterCount}
                  audioPlay={audioPlay}
                  handlePause={handlePause}
                  handlePlay={handlePlay}
                  waveformRef={waveformRef}
                  skip={skip}
                  finish={finish}
                />
              </Box>
            </div>
          </Box>
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "25%",
            },
            px: {
              xs: 0,
              md: 2,
            },
            my: {
              xs: 2,
              md: 0,
            },
          }}
        >
          <NoteCard />
        </Box>
      </Box>
      <Box sx={{ width: "100%", px: 2 }}>
        <PaginationAndButtonLayout
          submit={upload}
          next={next}
          reset={reset}
          prev={prev}
          option={option}
          goToPage={goToPage}
          category={props.category}
          page={page}
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
          error={errorUpload || errorStore || errorScore}
          retry={
            retry &&
            !resetState &&
            (transcript === undefined || transcript === "")
          }
          audioText={
            status === "succeeded"
              ? props.category === "rs"
                ? postsByPage.data?.data[0]?.content
                : props.category === "asq"
                ? postsByPage.data?.data[0]?.title
                : postsByPage.data?.data[0]?.audio_text
              : null
          }
          audio={
            postsByPage?.data?.data[0]?.media_type === "1"
              ? postsByPage?.data?.data[0]?.media
              : `${process.env.REACT_APP_BACKEND_URL}storage/${props.category}/${postsByPage?.data?.data[0]?.media}`
          }
          answerTemplate={
            props.category === "asq"
              ? postsByPage?.data?.data[0]?.content
              : postsByPage?.data?.data[0]?.answer_template
          }
          disableAnswer={status === "succeeded" && !resetState ? false : true}
        />

        {answerLoading && (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <CircularProgress />
          </Box>
        )}
        {answer ? (
          <>
            <Typography variant="h5" my={2}>
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
                {props.category !== "asq" && (
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
                  </>
                )}

                <Box sx={{ width: "10%", margin: "0 auto" }}>
                  <h3 style={{ whiteSpace: "nowrap" }}>Content</h3>
                  <CircularProgressbar
                    value={
                      props.category === "asq"
                        ? overall_result.content
                        : overall_result.content_ninety
                    }
                    maxValue={props.category !== "asq" ? 90 : 1}
                    text={`${
                      props.category === "asq"
                        ? overall_result.content
                        : overall_result.content_ninety
                    }/${props.category !== "asq" ? "90" : "1"}`}
                  />
                </Box>
                {props.category !== "asq" && (
                  <>
                    <Box sx={{ width: "10%", margin: "0 auto" }}>
                      <h3 style={{ whiteSpace: "nowrap" }}>Final</h3>
                      <CircularProgressbar
                        value={overall_result.overall_points_ninety}
                        maxValue={90}
                        text={`${overall_result.overall_points_ninety.toFixed(
                          2
                        )}`}
                      />
                    </Box>
                  </>
                )}
                <br />
              </Box>
              {props.category === "rs" && (
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
              )}
            </Box>
          </>
        ) : (
          ""
        )}
      </Box>

      <DataForReusableSpeakingComponent.Provider value={content}>
        <Box sx={{ width: "100%", p: 2 }}>
          <AnswerParentComponent
            postId={postsByPage.data?.data[0]?.id}
            type="Speaking"
            category={props.category}
          />
        </Box>
      </DataForReusableSpeakingComponent.Provider>
    </>
  );
};

export default ReusableTest;
