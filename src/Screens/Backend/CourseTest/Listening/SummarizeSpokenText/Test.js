import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import swal from "sweetalert";
import React, { createContext, useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
// import { RecordRTCPromisesHandler } from "recordrtc";
import Typo from "typo-js";

import { fetchPostsByPageAsync } from "../../../../../redux/thunk/Posts";
// import { grammar_check } from "../../ScoreCountApi";
import AnswerParentComponent from "../../../../../components/Backend/UserAnswerComponents/AnswerParent";

import CalculateScore from "../../CalculationForWritingSections.js/CalculateScore";
import TestPreparationAudioCard from "../../../../../components/Backend/TestCard/TestPreparationAudioCard";

import PracticeLayout from "../../../../../components/Backend/PracticeLayout/PracticeLayout";
import { getCookie } from "../../../../../Utils/GetCookies";
import ErrorTooltipContent from "../../../../../components/Backend/PracticeComponents/ErrorTooltipContent";
import LightTooltip from "../../../../../components/Backend/PracticeComponents/LightTooltip";
import Timer from "../../../../../components/Backend/PracticeComponents/Timer";
import AudioBox from "./AudioBox";
//import FormatErrorLine from "../../../../../components/Backend/FormatErrorLine";
export const DataForSstAnswerContext = createContext();

const TestSST = () => {
  const theme = useTheme();
  let { postsByPage, loading, status } = useSelector((state) => state.posts);
  // const [timerCounterCount, setTimerCounterCount] = useState(600);
  const [isStartCounting, setIsStartCounting] = useState(false);
  const dispatch = useDispatch();
  let postPath = "listening_test/sst";
  // let frontendURL = process.env.REACT_APP_FRONTEND_URL;
  // let frontendURL = process.env.REACT_APP_FRONTEND_URL;
  // const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  const [textBoxDisabled, setTextBoxDisabled] = useState(false);
  const [value, setValue] = useState(1);
  const [checkArray, setCheckArray] = useState([]);
  const [checkBg, setCheckBg] = useState([]);
  const [answer, setAnswer] = useState(false);
  // const [overall_result, setOverallResult] = useState([]);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [errorStore, setErrorStore] = useState(false);
  const [errorScore, setErrorScore] = useState(false);
  const [errorScoreCalculation, setErrorScoreCalculation] = useState(false);
  const [playingCounterCount, setplayingCounterCount] = useState(3);
  let [stoppedPlayingInterval, setStoppedPlayingInterval] = useState(false);
  let [playingStatus, setPlayingStatus] = useState(true);

  const [resetCount, setResetCount] = useState(false);
  // let [contentArr, setContentArr] = useState();
  let [char, setChar] = useState();
  let [wordCount, setWordCount] = useState(0);
  const [wordForm, setWordForm] = useState(0);
  const [vocabulary, setVocabulary] = useState(0);
  const [content, setContent] = useState(0);

  //spelling check
  const [dictionary, setDictionary] = useState(null);
  const [spellCount, setSpellCount] = useState();
  const [checkStatus, setCheckStatus] = useState(false);
  const [grammarMark, setGrammarMark] = useState(0);
  // const [overallPoint,setOverallPoint] = useState(0);
  let [showAudioText, setShowAudioText] = useState(false);
  const [resetState, setResetState] = useState(false);
  const [mistakeDetails, setMistakeDetails] = useState();
  const [testResultForComment, setTestResultForComment] = useState([]);
  const [testErrorOffset, setTestErrorOffset] = useState([]);
  const [replacements, setReplacements] = useState([]);
  const [errorCount, setErrorCount] = useState(0);
  const [overallPoint, setOverallPoint] = useState(0);
  const [stopCount, setStopCount] = useState(false);
  useEffect(() => {
    const loadDictionary = async () => {
      const affData = await fetch(
        `${process.env.REACT_APP_FRONTEND_URL}/en_US.aff`
      ).then((res) => res.text());
      const wordsData = await fetch(
        `${process.env.REACT_APP_FRONTEND_URL}/en_US.dic`
      ).then((res) => res.text());
      const dictionary = new Typo("en_US", affData, wordsData);
      setDictionary(dictionary);
    };
    loadDictionary();
  }, []);

  // let [content, setContent] = useState("");
  // let [playAudio, setPlayAudio] = useState("");
  let playAudioRef = useRef(null);

  let [isPlaying, setIsPlaying] = useState(false);

  //paging
  let [totalPage, setTotalPage] = useState("");
  // let [pagePaginate, setPagePaginate] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [page, setPage] = useState(1);
  let [isPlayingStatus, setIsPlayingStatus] = useState(true);

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
      // setPagePaginate(Paginate);
      if (postsByPage.data.data[0] === undefined) {
      } else {
        setCheckArray(postsByPage.data.data[0].mul_choices);
        // setContent(postsByPage.data.data[0].content);
        playAudioRef.current = null; //no data consider to remove after data entry
      }
      setCurrentPage(postsByPage.data.current_page);
    }
  }, [postsByPage, totalPage]);

  //get page data
  useEffect(() => {
    dispatch(fetchPostsByPageAsync({ path: postPath, page: page }));
  }, [dispatch, postPath, page]);

  //start playing counter count
  // useEffect(() => {
  //   if (postsByPage.data !== undefined && loading === false && !resetState) {
  //     if (postsByPage.data.data[0] === undefined) {
  //     } else {
  //       let media_type = postsByPage.data.data[0].media_type;
  //       let media = postsByPage.data.data[0].media;
  //       playAudioRef.current = new Audio(
  //         media_type === "1"
  //           ? media
  //           : `${process.env.REACT_APP_BACKEND_URL}storage/sst/${media}`
  //       );
  //       let interval = playingInterval(stoppedPlayingInterval);
  //       return () => clearInterval(interval);
  //     }
  //   }
  // }, [
  //   playingCounterCount,
  //   postsByPage,
  //   stoppedPlayingInterval,
  //   page,
  //   loading,
  //   resetState,
  // ]);

  //pause the player when component unmounts
  // useEffect(() => {
  //   return () => {
  //     if (playAudioRef.current !== null) {
  //       playAudioRef.current.pause();
  //       playAudioRef.current = null;
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   if (
  //     playAudioRef.current !== undefined &&
  //     playAudioRef.current !== null &&
  //     playAudioRef.current !== ""
  //   ) {
  //     playAudioRef.current.onended = () => setIsStartCounting(true);
  //   }
  // });

  // useEffect(() => {
  //   let beginInterval = () => {
  //     if (
  //       timerCounterCount !== 0 &&
  //       status === "succeeded" &&
  //       postsByPage?.data?.data?.length !== 0 &&
  //       isStartCounting &&
  //       playAudioRef.current !== null
  //     ) {
  //       const interval = setInterval(() => {
  //         setTimerCounterCount((prev) => prev - 1);
  //       }, 1000);
  //       return interval;
  //     }
  //   };
  //   let interval = beginInterval();
  //   return () => clearInterval(interval);
  // }, [timerCounterCount, status, postsByPage, isStartCounting]);

  // useEffect(() => {
  //   if (timerCounterCount === 120) {
  //     let audio = new Audio(frontendURL + "/beep.mp3");
  //     audio.play();
  //   }
  // });

  //playing interval
  // let playingInterval = (flag) => {
  //   if (!flag && playAudioRef.current !== null) {
  //     const interval = setInterval(() => {
  //       setplayingCounterCount((prevplaying) => prevplaying - 1);
  //     }, 1000);
  //     return interval;
  //   }
  // };

  // useEffect(() => {
  //   if (playAudioRef.current !== "") {
  //     let interval = playingInterval(stoppedPlayingInterval);
  //     return () => clearInterval(interval);
  //   }
  // }, [playAudioRef, stoppedPlayingInterval]);

  //stop playing counter count
  // useEffect(() => {
  //   if (playingCounterCount < 1) {
  //     setStoppedPlayingInterval(true);
  //     // setPlayAudio(new Audio(postsByPage.data.data[0].media));
  //   }
  // }, [playingCounterCount, page, postsByPage]);

  // //start audio play
  // useEffect(() => {
  //   if (stoppedPlayingInterval && playAudioRef.current !== null) {
  //     setIsPlaying(true);
  //     const playAudiofun = () => {
  //       if (playAudioRef.current.pause) {
  //         playAudioRef.current.play();
  //       }
  //       playAudioRef.current.onended = () => {
  //         setPlayingStatus(false);
  //         setIsPlaying(false);
  //       };
  //     };
  //     playAudiofun();
  //   }
  // }, [stoppedPlayingInterval, playAudioRef, page]);

  // useEffect(() => {
  //   if (timerCounterCount === 0) {
  //     setTextBoxDisabled(true);
  //   }
  // }, [timerCounterCount]);

  let save_score = async () => {
    // setTimerCounterCount(0);
    setStopCount(true);
    setAnswerLoading(true);
    setTextBoxDisabled(true);
    setAnswerLoading(true);
    if (char !== undefined && char !== "" && char !== null) {
      const char_arr = char
        .trim()
        .replace(/\(([^)]*)\)/g, "$1") // Remove only the parentheses while retaining the text inside
        .replace(/[.,?'()]/g, " ") // Remove punctuation characters and any remaining parentheses
        .split(/\s+/)
        .filter((word) => word !== "");
      if (char_arr.length < 40) {
        setCheckStatus(true);
        setAnswerLoading(false);
        // alert("character is excedd")
        return;
      } else {
        setCheckStatus(false);
      }
      if (!checkStatus) {
        // calculate content
        let content_arr = postsByPage.data.data[0].content.split(/[ .,]+/);
        let keyword_length = postsByPage.data.data[0].keyword_length;
        let result = await CalculateScore(
          postsByPage.data.data[0].content,
          char,
          keyword_length > 0 ? keyword_length : content_arr.length,
          dictionary,
          "sst",
          postsByPage.data.data[0].content
        );
        if (result?.error === undefined || result?.error === null) {
          setContent(result.cal_content);
          setWordForm(result.form);
          setSpellCount(result.spellng_language_tool);
          setVocabulary(result.form);
          setGrammarMark(result.cal_grammar_mark);

          //for point contribution  in format content ,pronunciation,fluency
          setMistakeDetails(result?.mistakeDetails);
          setErrorCount(result.mistakeDetails?.length);
          setTestResultForComment(result?.textArrayForErrorDetails);
          setTestErrorOffset(result?.textErrorOffset);
          setReplacements(result?.replacements);
          let score =
            result.cal_content +
            result.form +
            result.form +
            result.cal_grammar_mark +
            result?.spellng_language_tool;
          let points = {
            content: result.cal_content,
            form: result.form,
            grammar: result.cal_grammar_mark,
            vocabulary: result.form,
            spelling: result?.spellng_language_tool,
            new_answer: true,
          };
          setOverallPoint(score);

          setAnswer(true);
          setAnswerLoading(false);

          let Id = localStorage.getItem("userId");
          let postId = postsByPage.data.data[0].id;
          let category = "sst";

          let token = getCookie("userToken");
          if (!token) this.props.navigate("/login");
          else {
            let config = { headers: { Authorization: "Bearer " + token } };
            try {
              axios.post(
                `${process.env.REACT_APP_BACKEND_ADMIN}s-mul-choice`,
                {
                  user_id: Id,
                  post_id: postId,
                  category: category,
                  user_answered: char,
                  overall_point: score,
                  points: JSON.stringify(points),
                  new_answer: true,
                },
                config
              );
            } catch (error) {
              setErrorStore(true);
              setAnswerLoading(false);
              alert("Store result error please retake the exam");
            }
          }
        } else {
          setErrorScoreCalculation(true);
          setAnswerLoading(false);
        }
      } else {
        setErrorScoreCalculation(true);
        setAnswerLoading(false);
      }

      // }
    } else {
      setCheckStatus(true);
      setAnswerLoading(false);
      return;
    }
  };

  useEffect(() => {
    if (errorScoreCalculation) {
      swal({
        title: "Warning",
        text: "Score calculation error.Please retake the exam",
        icon: "warning",
        buttons: true,
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnClickOutside: false,
      }).then((yes) => {
        if (yes) {
          reset();
        }
        setErrorScoreCalculation(false);
      });
    }
  });

  const checkWord = (event) => {
    let char = event.target.value;

    // const char_arr = char.split(" ");
    const char_arr = char
      .trim()
      .replace(/\(([^)]*)\)/g, "$1") // Remove only the parentheses while retaining the text inside
      .replace(/[.,?'()]/g, " ") // Remove punctuation characters and any remaining parentheses
      // .replace(/[.,?']/g, "")
      .split(/\s+/)
      .filter((word) => word !== "");

    setChar(char);
    setWordCount(char_arr.length);
  };

  //reset state for next & prev
  let reset = () => {
    let text = document.querySelector("#text-area");
    text.value = "";
    setValue("");
    setChar("");
    setShowAudioText(false);
    setStopCount(false);
    setWordCount(0);
    playAudioRef.current.pause();
    playAudioRef.current = null;
    setResetCount(true);
    setErrorScoreCalculation(false);
    setCheckBg("");
    setAnswerLoading(false);
    setAnswer(false);
    setErrorUpload(false);
    setErrorStore(false);
    setErrorScore(false);
    setStoppedPlayingInterval(false);
    setPlayingStatus(true);
    setplayingCounterCount(3);
    setIsPlaying(false);
    setCheckStatus(false);
    setResetState(true);
    setErrorScoreCalculation(false);
    // setTimerCounterCount(600);
    setIsStartCounting(false);
    setTextBoxDisabled(false);
    setTimeout(() => {
      setResetState(false);
    }, 2000);
  };

  //play pause for audio
  let playPause = () => {
    if (playAudioRef.current !== "") {
      if (playingCounterCount >= 1) {
        setplayingCounterCount(0);
        setStoppedPlayingInterval(true);
      }
      let currentPlaying = true;
      // Get state of song
      currentPlaying = isPlayingStatus;

      if (playAudioRef.current.currentTime >= playAudioRef.current.duration) {
        currentPlaying = false;
      }

      if (currentPlaying) {
        // Pause the song if it is playing
        playAudioRef.current.pause();
      } else {
        // Play the song if it is paused
        playAudioRef.current.play();
      }
      setIsPlayingStatus(!isPlayingStatus);
    }

    // Change the state of song
  };

  //audio time progress
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (playAudioRef.current !== null) {
  //       setCurrentAudio(() => playAudioRef.current.currentTime);
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [playAudioRef]);

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  const AnswerBlock = () => {
    return (
      <>
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
                  // backgroundColor: "#fff",
                  backgroundColor: "#fff",
                  borderRadius: "1rem",
                }}
              >
                <Box sx={{ width: "15%", minWidth: "8rem", margin: "0 auto" }}>
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      marginBottom: 5,
                    }}
                  >
                    Content
                  </h3>
                  <CircularProgressbar
                    value={content}
                    maxValue="2"
                    text={`${content}/2`}
                  />
                </Box>

                <Box sx={{ width: "15%", minWidth: "8rem", margin: "0 auto" }}>
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      marginBottom: 5,
                    }}
                  >
                    Form
                  </h3>
                  <CircularProgressbar
                    value={wordForm}
                    maxValue={2}
                    text={`${wordForm}/2`}
                  />
                </Box>
                <Box sx={{ width: "15%", minWidth: "8rem", margin: "0 auto" }}>
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      marginBottom: 5,
                    }}
                  >
                    Grammar
                  </h3>
                  <CircularProgressbar
                    value={grammarMark}
                    maxValue={2}
                    text={`${grammarMark}/2`}
                  />
                </Box>

                <Box sx={{ width: "15%", minWidth: "8rem", margin: "0 auto" }}>
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      marginBottom: 5,
                    }}
                  >
                    Vocabulary
                  </h3>
                  <CircularProgressbar
                    value={vocabulary}
                    maxValue={2}
                    text={`${vocabulary}/2`}
                  />
                </Box>

                <Box sx={{ width: "15%", minWidth: "8rem", margin: "0 auto" }}>
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      marginBottom: 5,
                    }}
                  >
                    Spelling
                  </h3>
                  <CircularProgressbar
                    value={spellCount}
                    maxValue={2}
                    text={`${spellCount}/2`}
                  />
                </Box>

                <br />
              </Box>
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
                    title=" Writing Comments"
                    sx={{
                      bgcolor: "gray",
                      textAlign: "left",
                      fontSize: 10,
                    }}
                  />

                  <CardContent>
                    <Box
                      sx={{
                        width: "100%",
                        margin: "0 auto",
                        display: "block",
                        textAlign: "left",
                      }}
                    >
                      {
                        <Typography
                          components="p"
                          style={{ whiteSpace: "pre-wrap" }}
                        >
                          {testResultForComment.map((word, index) =>
                            testErrorOffset?.includes(index) ? (
                              <LightTooltip
                                title={
                                  <ErrorTooltipContent
                                    error={
                                      mistakeDetails[
                                        testErrorOffset.indexOf(index)
                                      ]
                                    }
                                    replacements={
                                      replacements[
                                        testErrorOffset.indexOf(index)
                                      ]
                                    }
                                  />
                                }
                              >
                                <Typography
                                  key={index}
                                  variant="body1"
                                  sx={{
                                    color: testErrorOffset?.includes(index)
                                      ? "red"
                                      : word.color,
                                    display: "inline",
                                    padding: "1px",
                                    cursor: "pointer",
                                    borderRadius: 2,
                                  }}
                                >
                                  {word}
                                </Typography>
                              </LightTooltip>
                            ) : (
                              <Typography
                                key={index}
                                variant="body1"
                                sx={{
                                  bgcolor: word.color,
                                  display: "inline",
                                  padding: "1px",
                                  borderRadius: 5,
                                }}
                              >
                                {word}
                              </Typography>
                            )
                          )}
                          {testResultForComment?.length === 0 && <>{char}</>}
                        </Typography>
                      }
                    </Box>
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
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ width: "50%", margin: "0 auto" }}>
                          <Typography>Error Count : {errorCount}</Typography>
                          <Typography>Word Count : {wordCount}</Typography>
                          <Typography>
                            Error Density :{" "}
                            {((errorCount / wordCount) * 100).toFixed(2)} %
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            margin: "0 auto",
                            [theme.breakpoints.up("sm")]: {
                              width: "30%",
                              my: 2,
                            },
                            [theme.breakpoints.up("md")]: {
                              width: "30.33%",
                            },
                            [theme.breakpoints.up("lg")]: {
                              width: "15%",
                            },
                          }}
                        >
                          <h3
                            style={{
                              whiteSpace: "nowrap",
                              textAlign: "center",
                              marginBottom: 5,
                            }}
                          >
                            Overall Point
                          </h3>
                          <CircularProgressbar
                            value={overallPoint}
                            // styles={buildStyles({
                            //   // Colors
                            //   pathColor:
                            //     overallPoint >= 0
                            //       ? `rgba(102, 255, 199, ${8 / 10})`
                            //       : overallPoint >= 5
                            //       ? `rgba(255, 215, 0, ${overallPoint / 10})`
                            //       : `rgba(170, 0, 0, ${overallPoint / 10})`,
                            //   textColor:
                            //     overallPoint >= 8
                            //       ? `rgba(102, 255, 199, ${8 / 10})`
                            //       : overallPoint >= 5
                            //       ? `rgba(255, 215, 0, ${overallPoint / 10})`
                            //       : `rgba(170, 0, 0, ${overallPoint / 10})`,
                            // })}
                            // value={overallPoint}
                            maxValue={10}
                            text={`${overallPoint}/10`}
                          />
                        </Box>
                      </Box>
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
        category={"sst"}
        setPage={setPage}
        reset={reset}
        status={status}
        postsByPage={postsByPage}
        backPath={"/admin/listening"}
        navTitle={"Summarized Spoken Text"}
        categoryQuestion={
          "  You will hear a short audio. Write a summary for a fellow student who was not present at the Interview/Lecture. You should write 50-70 words. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points presented in the interview."
        }
        upload={save_score}
        retry={answer}
        page={page}
        totalPage={totalPage}
        error={errorUpload || errorStore || errorScore}
        disableReset={status === "succeeded" && !resetState ? false : true}
        disableSubmit={
          checkStatus
            ? true
            : !answer &&
              !answerLoading &&
              !errorScore &&
              !resetState &&
              !errorStore &&
              !errorUpload
            ? false
            : true
        }
        disableAudioText={
          status === "succeeded" && !resetState
            ? postsByPage?.data !== undefined && postsByPage?.data !== null
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
            : `${process.env.REACT_APP_BACKEND_URL}storage/sst/${postsByPage?.data?.data[0]?.media}`
        }
        answerTemplate={postsByPage?.data?.data[0]?.answer_template}
        disableAnswer={status === "succeeded" && !resetState ? false : true}
        answerBlock={() => <AnswerBlock />}
        answerLoading={answerLoading}
        // answer={answer}
        // answerTabs={() => (
        //   <AnswerTabs content={content} postsByPage={postsByPage} />
        // )}
      >
        <div className="card">
          <Box
            sx={{
              width: "90%",
              mx: "auto",
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ color: "#2196f3" }}>
              {status === "succeeded" &&
                postsByPage.data.data[0].category == "sst" &&
                postsByPage.data.data[0].title}
            </Typography>
            {/* <Box>
              <Typography>
                Duration{" "}
                {Math.floor(timerCounterCount / 60) < 10
                  ? "0" + Math.floor(timerCounterCount / 60)
                  : Math.floor(timerCounterCount / 60)}{" "}
                :
                {timerCounterCount % 60 < 10
                  ? "0" + Math.floor(timerCounterCount % 60)
                  : Math.floor(timerCounterCount % 60)}
              </Typography>
            </Box> */}
            <Timer
              status={status}
              stopCount={stopCount}
              count={600}
              resetCount={resetCount}
              setResetCount={setResetCount}
              postReady={postsByPage?.data?.data?.length !== 0}
            />
          </Box>
          <Box sx={{ margin: "0 auto", width: "100%", mb: 4 }}>
            {/* <TestPreparationAudioCard
              status={status}
              loading={loading}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              setPlayingStatus={setPlayingStatus}
              playingStatus={playingStatus}
              playingCounterCount={playingCounterCount}
              startPlayingCounterCount={3}
              playAudio={playAudioRef}
              playPause={playPause}
              stoppedPlayingInterval={stoppedPlayingInterval}
              currentAudio={currentAudio}
              category={"sst"}
              postsByPage={postsByPage}
            /> */}
            <AudioBox
              status={status}
              loading={loading}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              setPlayingStatus={setPlayingStatus}
              playingStatus={playingStatus}
              playingCounterCount={playingCounterCount}
              startPlayingCounterCount={3}
              playAudio={playAudioRef}
              playPause={playPause}
              stoppedPlayingInterval={stoppedPlayingInterval}
              category={"sst"}
              postsByPage={postsByPage}
              playAudioRef={playAudioRef}
              setIsStartCounting={setIsStartCounting}
              setplayingCounterCount={setplayingCounterCount}
              resetState={resetState}
              setStoppedPlayingInterval={setStoppedPlayingInterval}
              isPlayingStatus={isPlayingStatus}
              setIsPlayingStatus={setIsPlayingStatus}
            />

            <Box sx={{ margin: "0 auto", width: "100%", py: 2 }}>
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
                      {/* <FormGroup
                        sx={{ position:"relative",height:"auto",backgroundColor:"red" }}
                        >
                          <TextareaAutosize
                            aria-label="minimum height"
                            minRows={10}
                            placeholder="Write a Summary..."
                            style={{ width: "100%", fontSize: "1.2rem" }}
                            onChange={checkWord}
                            autoFocus
                          />
                        </FormGroup> */}

                      <TextareaAutosize
                        aria-label="minimum height"
                        id={"text-area"}
                        minRows={10}
                        spellCheck={false}
                        placeholder="Write a Summary..."
                        style={{
                          width: "100%",
                          fontSize: "1.2rem",
                          padding: "1rem",
                        }}
                        disabled={textBoxDisabled}
                        onChange={checkWord}
                        autoFocus
                      />

                      <Box>
                        <Typography variant="h6">
                          Word Count : {wordCount}
                        </Typography>
                      </Box>
                    </Box>

                    {checkStatus && (
                      <Typography
                        sx={{
                          textAlign: "center",
                          color: "red",
                          marginTop: 2,
                        }}
                      >
                        *Word count contains less than 40 words or more than 100
                        words. No further scoring.
                      </Typography>
                    )}
                  </>
                )
              ) : (
                <Typography sx={{ textAlign: "center", color: "red" }}>
                  Fail to fetch data
                </Typography>
              )}
            </Box>
          </Box>
        </div>
      </PracticeLayout>

      <DataForSstAnswerContext.Provider
        value={{
          originalContent: postsByPage?.data?.data[0]?.content,
          content: postsByPage?.data?.data[0]?.content,
          keyword_length: postsByPage?.data?.data[0]?.keyword_length,
        }}
      >
        <Box sx={{ width: "100%", p: 2 }}>
          <AnswerParentComponent
            postId={postsByPage.data?.data[0]?.id}
            type="Listening"
            category={"sst"}
          />
        </Box>
      </DataForSstAnswerContext.Provider>
    </>
  );
};

export default TestSST;
