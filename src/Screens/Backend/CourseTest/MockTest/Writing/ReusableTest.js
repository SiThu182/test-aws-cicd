import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormGroup,
  CircularProgress,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import { AdminCheckContext } from "../MockTest";
import Typo from "typo-js";
import swal from "sweetalert";
// import { grammar_check } from "../../Writing/WriteEssay/GrammarCheck";
import { updateUserData } from "../StoreDataFunctions";
import { requestAudio } from "../../../../../customHooks/Permissions/RequestPermission";
import { MtErrorFallbackFunction } from "../../../../../components/ErrorFallbackFunction";
import ErrrorBoundaryClass from "../../../../../components/ErrrorBoundaryClass";
import { useTheme } from "@emotion/react";
import { CircularProgressbar } from "react-circular-progressbar";
import CalculateScore from "../../CalculationForWritingSections.js/CalculateScore";
import { saveTempMt } from "../../../../../Utils/SaveTempMt";
import { useParams } from "react-router-dom";

function ReusableTest(props) {
  const {
    mockType,
    answer,
    timerCounterDuration,
    setDetailAnswer,
    setDetailDuration,
    testPost,
    category,
    setCategoryState,
    setCurrentPage,
    pause,
    setPause,
    mockId,
    setWritingState,
    setListeningState,
    setCurrentCategory,
    passSaveDataState,
    setPassSaveDataState,
    currentIndex,
    setCurrentIndex,
    setCurrentQuestionStart,
    error,
    setError,
    setSave,
    checkAnswerState,
  } = props;
  const data = useParams();
  const theme = useTheme();
  const checkByAdmin = useContext(AdminCheckContext);
  const [timerCounterCount, setTimerCounterCount] =
    useState(timerCounterDuration);
  const [counter, setCounter] = useState(false);

  const [index, setIndex] = useState(0);
  const [storeData, setStoreData] = useState();

  //check answer const
  const [spelling, setSpelling] = useState(0);
  const [wordForm, setWordForm] = useState(0);
  const [vocabulary, setVocabulary] = useState(0);
  const [contentAns, setContentAns] = useState(0);
  const [overallPoint, setOverallPoint] = useState(0);
  const [grammarMark, setGrammarMark] = useState(0);
  const [dbSaveLoading, setDbSaveLoading] = useState(false);
  const [calculationLoading, setCalculationLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [pageCleanUp, setPageCleanUp] = useState(true);
  //for audio
  const [audio, setAudio] = useState("");
  const [beginningStatus, setBeginningStatus] = useState(true);
  // let [contentArr, setContentArr] = useState();
  //for wfd
  const [next, setNext] = useState(false);
  let frontendURL = process.env.REACT_APP_FRONTEND_URL;
  let [char, setChar] = useState();
  let [wordCount, setWordCount] = useState(0);
  const [text, setText] = useState("");
  //spelling check
  const [dictionary, setDictionary] = useState(null);

  //for audio permission
  //checkPermission
  useEffect(() => {
    requestAudio().catch(() => alert("No support Audio Permission"));
  }, []);

  //set audio
  useEffect(() => {
    if (category === "sst" || category === "wfd")
      if (testPost.media_type === "1") {
        setAudio(testPost[index].media);
      } else {
        setAudio(
          `${process.env.REACT_APP_BACKEND_URL}storage/${category}/${testPost[index].media}`
        );
      }
  }, [index, props, audio, category, testPost, props.currentPage]);

  //audio end handler
  const audioEndHandler = () => {
    setCounter(true);
    setBeginningStatus(false);
  };

  const onLoadedMetaData = () => {
    const audio = document.querySelector("#audio");
    audio.play();
  };

  //get set data from local storage and set current state
  useEffect(() => {
    if (!checkAnswerState && !passSaveDataState) {
      let userId = localStorage.getItem("userId");

      let saveStoreData = localStorage.getItem(userId + "saveMt" + mockId);
      saveStoreData = JSON.parse(saveStoreData);
      let getStoreData = JSON.parse(saveStoreData?.[category]);
      getStoreData.score = getStoreData.score.split(",");
      getStoreData.answer = JSON.parse(getStoreData.answer);
      getStoreData.points = JSON.parse(getStoreData.points);

      setStoreData(getStoreData);
      setCurrentCategory(category);
      if (category === "sst" || category === "wfd") {
        setCurrentQuestionStart(true);
      }
    }
  }, [
    category,
    setCurrentCategory,
    passSaveDataState,
    checkAnswerState,
    setCurrentQuestionStart,
  ]);

  //SET TO store index if save data exist
  //tracking index
  //tracking answer and time in case of no internet

  useEffect(() => {
    if (passSaveDataState) {
      let saveCategory = localStorage.getItem("saveCategory");
      let saveIndex = localStorage.getItem("saveIndex");
      if (category === "sst" || category === "wfd") {
        setCurrentQuestionStart(true);
      }

      if (saveCategory == category) {
        setIndex(parseInt(saveIndex));
        setCurrentIndex(saveIndex);
        setPassSaveDataState(false);
        if (category === "swt" || category === "we") {
          setTimerCounterCount(localStorage.getItem("detailDuration"));
          let textBox = document.getElementById("textBox");
          setText(localStorage.getItem("detailAnswer"));
          let char = localStorage.getItem("detailAnswer");
          const char_arr = char.split(" ");

          setChar(char);
          setWordCount(char_arr.length);
        }

        setTimeout(() => {
          localStorage.removeItem("saveCategory");
          localStorage.removeItem("saveIndex");
          localStorage.removeItem("detailDuration");
          localStorage.removeItem("detailAnswer");
        }, 2500);
      } else {
        setCategoryState(false);
      }
    }
    setCurrentIndex(index);
  }, [
    index,
    setCurrentIndex,
    setCurrentQuestionStart,
    currentIndex,
    setPassSaveDataState,
    passSaveDataState,
    category,
    setCategoryState,
  ]);

  //save answer every second
  useEffect(() => {
    if (
      !passSaveDataState &&
      !checkAnswerState &&
      (category === "we" || category === "swt")
    ) {
      let textBox = document.getElementById("textBox");
      setDetailAnswer(textBox.value);
      setDetailDuration(timerCounterCount);
    }
  }, [
    timerCounterCount,
    checkAnswerState,
    category,
    setDetailAnswer,
    setDetailDuration,
    passSaveDataState,
  ]);

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

  //reset answer
  const reset = useCallback(() => {
    let textBox = document.getElementById("textBox");
    // textBox.value = "";
    textBox.focus();
    setWordCount(0);
    setGrammarMark(0);
    setPageCleanUp(true);
    setContentAns(0);
    setWordForm(0);
    setVocabulary(0);
    setSpelling(0);
    setChar("");
    setText("");
    setGrammarMark(0);
    setContentAns(0);
    setWordForm(0);
    setVocabulary(0);
    setSpelling(0);

    setTimerCounterCount(timerCounterDuration);
    setNext(false);
    setBeginningStatus(true);
  }, [timerCounterDuration]);

  const checkWord = (event) => {
    let char = event.target.value;
    setText(event.target.value);
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

  useEffect(() => {
    let beginInterval = (pause) => {
      if (timerCounterCount !== 0 && !pause && !checkAnswerState) {
        if (category === "sst") {
          if (counter) {
            const interval = setInterval(() => {
              setTimerCounterCount((prev) => prev - 1);
            }, 1000);
            return interval;
          }
        } else {
          const interval = setInterval(() => {
            setTimerCounterCount((prev) => prev - 1);
          }, 1000);
          return interval;
        }
      }
    };
    let interval = beginInterval(pause);
    return () => clearInterval(interval);
  }, [timerCounterCount, pause, category, counter, checkAnswerState]);

  useEffect(() => {
    if (timerCounterCount === 120) {
      let audio = new Audio(frontendURL + "/beep.mp3");
      audio.play();
    }
  });
  const clickHandler = () => {
    setTimerCounterCount(0);
    setNext(true);
    if (checkAnswerState) {
      pageCondition();
    }
  };

  //page Condition
  const pageCondition = useCallback(async () => {
    if (pageCleanUp) {
      setPageCleanUp(false);
      setPause(true);
      setDbSaveLoading(true);
      setCalculationLoading(false);
      let updateDbSave = async () => {
        if (!checkAnswerState) {
          await saveTempMt(data.id, data.mt_type_id);
        }
      };

      await updateDbSave();
      if (!checkAnswerState) {
        let section;
        if (category === "we" || category === "swt") {
          section = "Writing";
        } else {
          section = "Listening";
        }
        updateUserData(section, category, storeData, mockId);

        if (category === "sst" || category === "wfd") {
          setCurrentQuestionStart(true);
        }
      }

      //page change
      if (index === props.testPost.length - 1) {
        if (category === "we" || category === "wfd") {
          setCategoryState(false);

          category === "we" ? setWritingState(false) : setListeningState(false);
          if (mockType !== 6 && category === "we") {
            props.setSectionA(false);
            props.setCounterState(true);
            props.setCurrentPage(1);
            setCurrentCategory("rsmc");
          }
          if (mockType !== 5 && category === "wfd") {
            props.setSectionC(false);
            props.setCounterState(true);
            props.setCurrentPage(1);
          }
        } else {
          setCategoryState(false);
          setCurrentPage((prev) => prev + 1);
        }
      } else {
        setCurrentPage((prev) => prev + 1);
        setIndex((prev) => prev + 1);
        reset();
      }
      setDbSaveLoading(false);
      setCalculationLoading(false);
      setPause(false);
      setSave(true);
    }
  }, [
    category,
    pageCleanUp,
    setSave,
    checkAnswerState,
    index,
    mockType,
    setPause,
    props,
    data,
    reset,
    setCategoryState,
    setListeningState,
    setWritingState,
    setCurrentQuestionStart,
    setCurrentPage,
    storeData,
  ]);

  const save_score = useCallback(async () => {
    let content_arr;
    setPause(true);
    setCalculationLoading(true);
    if (category === "we" || category === "swt") {
      content_arr = testPost[index].transcript
        .split(/[\(\),\s]+/)
        .filter(Boolean)
        .map((transcript) => transcript.replace(/\./g, "").trim());
    } else {
      content_arr = testPost[index].content.split(/[ .,]+/);
    }
    let keyword_length = testPost[index].keyword_length;
    // let content_kw_length =
    //   keyword_length > 0 ? keyword_length : content_arr.length;

    if (char !== "" && char !== undefined) {
      let score;
      let points;
      if (category !== "wfd") {
        let result = await CalculateScore(
          category === "sst"
            ? testPost[index].content
            : testPost[index].transcript,
          char,
          keyword_length > 0 ? keyword_length : content_arr.length,
          dictionary,
          category,
          testPost[index]?.content
        );

        if (result?.error !== undefined && result?.error !== null) {
          if (!checkAnswerState) {
            swal({
              title: "Sending grammar check to server went wrong .",
              text: "You can retry after reloading .Press okay to reload ,your current progress is saved .Cancel will continue the test but your answer will not be correct.",
              icon: "error",
              buttons: true,
              dangerMode: true,
              closeOnClickOutside: false,
            }).then((ok) => {
              if (ok) {
                window.location.reload();
              } else {
                if (!checkAnswerState) {
                  storeData.score[index] = 0;
                  storeData.answer[index][0] = char;
                }
                setCalculationLoading(false);
                pageCondition();
                return;
              }
            });
            return;
          } else {
            setOverallPoint(0);
            setContentAns(0);
            setCalculationLoading(false);
            return;
          }
        }
        if (category === "swt") {
          score =
            result?.cal_content +
            result?.form +
            result?.cal_grammar_mark +
            result?.voca_score;
          points = {
            content: result?.cal_content,
            form: result?.form,
            grammar: result?.cal_grammar_mark,
            vocabulary: result?.voca_score,
          };
        } else if (category === "sst") {
          score =
            result?.cal_content +
            result?.form +
            result?.cal_grammar_mark +
            result?.voca_score +
            result?.spelling;
          points = {
            content: result?.cal_content,
            form: result?.form,
            grammar: result?.cal_grammar_mark,
            vocabulary: result?.voca_score,
            spelling: result?.spelling,
          };
        } else if (category === "we") {
          score =
            result?.cal_content +
            result?.form +
            result.cal_grammar_mark +
            result?.spelling +
            3 * result?.form;
          points = {
            content: result?.cal_content,
            form: result?.form,
            grammar: result.cal_grammar_mark,
            spelling: result?.spelling,
            vocabulary: result?.form,
            dsc: result?.form,
            linguistic: result?.form,
          };
        }

        setGrammarMark(result?.cal_grammar_mark);
        setContentAns(result?.cal_content);
        setWordForm(result?.form);
        setVocabulary(category === "swt" ? result?.voca_score : result?.form);
        setSpelling(result?.spelling);
        if (score === undefined) {
          setOverallPoint(0);
        } else {
          setOverallPoint(score);
        }
      } else {
        const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/g;
        let char_arr = char.replace(specialCharactersRegex, "").split(" ");

        content_arr = testPost[index].content
          .replace(specialCharactersRegex, "")
          .split(" ");
        let overall_point = 0;
        content_arr.forEach((check_char) => {
          if (char_arr.includes(check_char)) {
            // showWord.push({ name: check_char, color: "#16A085" }); // This would mutate the state, which is not allowed
            // setShowWord(showWord);
            // setCount((prevtotalCount) => prevtotalCount + 1);
            overall_point += 1;
          } else {
            // showWord.push({ name: check_char, color: "#F21F21" }); // This would mutate the state, which is not allowed
            // setShowWord(showWord);
          }
        });
        score = ((overall_point / content_arr.length) * 12).toFixed(0);

        points = {
          content: score,
        };
        setOverallPoint(score);
        setContentAns(score);
        setCalculationLoading(false);
      }
      setCalculationLoading(false);
      if (!checkAnswerState) {
        storeData.score[index] = score;
        storeData.answer[index][0] = char;
        storeData.points[index] = points;
      }
      if (!checkAnswerState) {
        pageCondition();
      }
    } else {
      setOverallPoint(0);

      setContentAns(0);
      if (!checkAnswerState) {
        storeData.score[index] = 0;
        storeData.answer[index][0] = "";

        pageCondition();
      }
      setCalculationLoading(false);
    }
  }, [
    category,
    char,
    pageCondition,
    dictionary,
    index,
    storeData,
    setPause,

    testPost,
    checkAnswerState,
  ]);

  useEffect(() => {
    if (
      checkAnswerState &&
      answer !== undefined &&
      answer?.answers !== undefined
    ) {
      let answerArray = JSON.parse(answer.answers);
      setText(answerArray[index][0]);
    }
  }, [checkAnswerState, answer, index]); //for check answer
  useEffect(() => {
    if (
      checkAnswerState &&
      answer !== undefined &&
      answer?.answers !== undefined
    ) {
      // let textBox = document.getElementById("textBox");

      let answerArray = JSON.parse(answer.answers);
      // textBox.value = answerArray[index][0];
      let char = answerArray[index][0];
      const char_arr =
        char === ""
          ? ""
          : char
              .trim()
              .replace(/[.,?']/g, "")
              .split(/\s+/)
              .filter((word) => word !== "");
      setChar(char);
      setWordCount(char_arr === "" ? 0 : char_arr.length);
      if (dictionary !== null) {
        save_score();
      }
    }
  }, [checkAnswerState, answer, index, save_score, dictionary]);

  //for test answer
  useEffect(() => {
    const executeEffect = async () => {
      if (timerCounterCount === 0 || (category === "wfd" && next)) {
        if (!checkAnswerState) {
          setTimerCounterCount(timerCounterDuration);

          await save_score(); // Await the async function
        }
      }
    };
    executeEffect();
  }, [
    timerCounterCount,
    checkAnswerState,

    save_score,
    char,
    setCurrentQuestionStart,
    next,
    mockType,
    storeData,
    dictionary,
    index,
    props,
    category,
    setCategoryState,
    reset,
    testPost,
    timerCounterDuration,
    setWritingState,
    setListeningState,
    setCurrentPage,
  ]);

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
            mt: "2rem",
            px: checkAnswerState
              ? 2
              : {
                  xs: 2,
                  sm: 5,
                  md: 10,
                  lg: "10rem",
                  xl: "20rem",
                },
          }}
        >
          <Box sx={{ backgroundColor: "rgb(231,239,254)", height: "100%" }}>
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
                  {category === "we"
                    ? "You will have 20 minutes to plan, write and revise an essay about the topic below. Your response will be judged on how well you develop a position, organize your ideas, present supporting details, and control the elements of standard written English. You should write 200-300 words."
                    : category === "swt"
                    ? "Read the passage below and summarize it using one senetence of 5 to 75 words.Type your response in the box at the bottom of the screen. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response present the key points in the passage."
                    : category === "sst"
                    ? "You will hear a short audio. Write a summary for a fellow student who was not present at the Interview/Lecture. You should write 50-70 words. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points presented in the interview."
                    : " You will hear a sentence.Type the sentence in the box below exactly as you heard it.Write as much of the sentence as you an.You will hear the sentence only once."}
                </Typography>
              </Box>
              {/* Audio */}
              {(category === "wfd" || category === "sst") && (
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
                        disabled={!checkAnswerState}
                      >
                        <audio
                          controls
                          disabled
                          id="audio"
                          src={audio}
                          onEnded={() =>
                            category === "wfd"
                              ? setBeginningStatus(false)
                              : audioEndHandler()
                          }
                          preload="metadata"
                          onLoadedMetadata={onLoadedMetaData}
                          // autoPlay
                        ></audio>
                      </Button>
                    </Box>
                  )}
                </Box>
              )}

              {category !== "wfd" && (
                <Box
                  sx={{
                    width: "100%",
                    height: "5vh",
                    my: "0.3rem",
                    mx: "auto",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box>
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
                  </Box>
                </Box>
              )}

              <Box sx={{ margin: "0 auto", width: "100%", mb: 4 }}>
                {(category === "swt" || category === "we") && (
                  <Box
                    sx={{
                      p: 1,
                      backgroundColor: "whitesmoke",
                      borderRadius: "1rem",
                      boxShadow: 5,
                      height: category === "we" ? "20vh" : "auto",
                    }}
                  >
                    <Typography variant="body5">
                      {testPost[index].content}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ margin: "0 auto", width: "100%", py: 2 }}>
                  <Box
                    sx={{
                      width: "100%",
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
                      <TextareaAutosize
                        id="textBox"
                        aria-label="minimum height"
                        spellCheck={false}
                        minRows={10}
                        value={text}
                        placeholder={
                          category !== "wfd"
                            ? "Write a Summary..."
                            : "Write here ..."
                        }
                        style={{
                          width: "100%",
                          fontSize: "1.2rem",
                          padding: "1rem",
                        }}
                        disabled={checkAnswerState ? true : false}
                        autoFocus
                        onChange={checkWord}
                      />
                    </FormGroup>
                    <Box>
                      <Typography variant="h6">
                        Word Count : {wordCount}
                      </Typography>
                    </Box>
                  </Box>

                  {/* {checkStatus && (
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
                  )} */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {calculationLoading && checkAnswerState && (
          <Box sx={{ my: 2, p: 2, display: "flex" }}>
            <Typography variant="h4">Getting calculation result</Typography>
            <CircularProgress
              sx={{ width: "20%", color: "blue" }}
            ></CircularProgress>
          </Box>
        )}

        {!calculationLoading && props.checkAnswerState && (
          <Box sx={{ px: 2 }}>
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
                  alignItems: "center",
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
                <Box sx={{ width: "15%", margin: "0 auto" }}>
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
                    value={contentAns}
                    maxValue={
                      category === "wfd" ? 12 : category === "we" ? 3 : 2
                    }
                    text={`${contentAns}/${
                      category === "wfd" ? 12 : category === "we" ? 3 : 2
                    }`}
                  />
                </Box>

                <br />
                {category !== "wfd" && (
                  <>
                    <Box sx={{ width: "15%", margin: "0 auto" }}>
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
                        maxValue={category === "swt" ? 1 : 2}
                        text={`${wordForm}/${category === "swt" ? 1 : 2}`}
                      />
                    </Box>
                    <Box sx={{ width: "15%", margin: "0 auto" }}>
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
                    {/* vocabulary is now used as spelling */}
                    {category !== "swt" && (
                      <Box sx={{ width: "15%", margin: "0 auto" }}>
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
                          value={spelling}
                          maxValue={2}
                          text={`${spelling}/2`}
                        />
                      </Box>
                    )}

                    {/* vocabulary is same as form */}
                    <Box sx={{ width: "15%", margin: "0 auto" }}>
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
                  </>
                )}
              </Box>
              {category === "we" && (
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
                  {/* General Linguistics is same as form */}
                  <Box
                    sx={{ width: "15%", margin: "0 auto", textAlign: "center" }}
                  >
                    <h3
                      style={{
                        whiteSpace: "nowrap",
                        textAlign: "center",
                        marginBottom: 5,
                      }}
                    >
                      General <br /> Linguistic Range
                    </h3>
                    <CircularProgressbar
                      value={wordForm}
                      maxValue={2}
                      text={`${wordForm}/2`}
                    />
                  </Box>
                  {/* DSC is same as form */}
                  <Box
                    sx={{ width: "15%", margin: "0 auto", textAlign: "center" }}
                  >
                    <h3
                      style={{
                        whiteSpace: "nowrap",
                        textAlign: "center",
                        marginBottom: 5,
                      }}
                    >
                      Development,
                      <br /> structure and coherence
                    </h3>
                    <CircularProgressbar
                      value={wordForm}
                      maxValue={2}
                      text={`${wordForm}/2`}
                    />
                  </Box>
                </Box>
              )}
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
                      bgcolor: "grey",
                      textAlign: "left",
                      fontSize: 10,
                    }}
                  />

                  <CardContent>
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
                            value={`${
                              category === "wfd" ? contentAns : overallPoint
                            }`}
                            maxValue={`${
                              category === "wfd"
                                ? 12
                                : category === "we"
                                ? 15
                                : category === "swt"
                                ? 7
                                : category === "sst"
                                ? 10
                                : ""
                            }`}
                            text={`${
                              category === "wfd" ? contentAns : overallPoint
                            }/${
                              category === "wfd"
                                ? 12
                                : category === "we"
                                ? 15
                                : category === "swt"
                                ? 7
                                : category === "sst"
                                ? 10
                                : ""
                            }`}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            mt: 5,
            pb: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{ mr: "1rem", mb: "1rem" }}
            onClick={clickHandler}
            disabled={
              dbSaveLoading || calculationLoading
                ? true
                : checkByAdmin === true
                ? false
                : (category === "wfd" || category === "sst") &&
                  !checkAnswerState
                ? beginningStatus
                : false
            }
          >
            {dbSaveLoading ? (
              <CircularProgress size="1rem"></CircularProgress>
            ) : (
              ""
            )}
            {(category === "we" || category === "wfd") &&
            index === testPost.length - 1
              ? "Finish Section"
              : "Next"}
          </Button>
        </Box>
      </>
    </ErrrorBoundaryClass>
  );
}

export default ReusableTest;
