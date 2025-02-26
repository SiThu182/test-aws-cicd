// import { Box, Button, Typography } from "@mui/icons-material";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import React, { useCallback, useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { requestAudio } from "../../../../../customHooks/Permissions/RequestPermission";
import { updateUserData } from "../StoreDataFunctions";
import ErrrorBoundaryClass from "../../../../../components/ErrrorBoundaryClass";
import { MtErrorFallbackFunction } from "../../../../../components/ErrorFallbackFunction";
import { CircularProgressbar } from "react-circular-progressbar";
import { AdminCheckContext } from "../MockTest";
import { useParams } from "react-router-dom";
import { saveTempMt } from "../../../../../Utils/SaveTempMt";
// import { RecordRTCPromisesHandler } from "recordrtc";

function HIWtest(props) {
  const {
    category,
    answer,
    testPost,
    setCategoryState,
    setCurrentPage,
    setCurrentCategory,
    setCurrentIndex,
    passSaveDataState,
    setPassSaveDataState,
    setCurrentQuestionStart,
    error,
    setSave,
    setPause,
    setError,
    checkAnswerState,
    mockId,
  } = props;
  const data = useParams();
  const checkByAdmin = useContext(AdminCheckContext);
  const audioRef = useRef();
  const [index, setIndex] = useState(0);

  const [storeData, setStoreData] = useState();
  //   let [count, setCount] = useState(0);

  // let [testCheck, setTestCheck] = useState([]);
  let [testString, setTestString] = useState("");
  let [testArray, setTestArray] = useState();
  let [sortedAns, setSortedAns] = useState([]);
  let [content, setContent] = useState("");
  let [answerArr, setAnswerArr] = useState([]);
  const [audio, setAudio] = useState();
  const [testAnswer, setTestAnswer] = useState(false);
  let [clickArray, setClickArray] = useState([]);

  let [click, setClick] = useState(false);
  let [obj, setObj] = useState();
  let [x, setX] = useState(false);
  let [correct, setCorrect] = useState(0);
  let [inCorrect, setIncorrect] = useState(0);
  let [finalTest, setFinalTest] = useState("");
  const [beginningStatus, setBeginningStatus] = useState(true);
  const [dbSaveLoading, setDbSaveLoading] = useState(false);
  //check answer

  const [answerIndex, setAnswerIndex] = useState("");
  //for audio permission
  //checkPermission
  useEffect(() => {
    requestAudio().catch(() => alert("No support Audio Permission"));
  }, []);
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
    setCurrentIndex,
    setPassSaveDataState,
    setCurrentQuestionStart,
    passSaveDataState,
    category,
    setCategoryState,
  ]);

  //get set data from local storage and set current state
  useEffect(() => {
    if (!checkAnswerState) {
      let userId = localStorage.getItem("userId");

      let saveStoreData = localStorage.getItem(userId + "saveMt" + mockId);
      saveStoreData = JSON.parse(saveStoreData);
      let getStoreData = JSON.parse(saveStoreData?.[category]);

      getStoreData.score = getStoreData.score.split(",");
      getStoreData.answer = JSON.parse(getStoreData.answer);

      setStoreData(getStoreData);
      setCurrentCategory(category);
    }
  }, [category, setCurrentCategory, checkAnswerState]);

  const onLoadedMetaData = () => {
    const audio = document.querySelector("#audio");

    audio.play();
  };

  //click highlight handler
  const clickHighlightHandler = (value, index) => {
    setObj("");
    setX(false);
    let element = document.getElementById(index);

    if (element.style.borderRadius === "0.5rem") {
      element.removeAttribute("style");
    } else {
      element.style.backgroundColor = "#33eaff";
      element.style.borderRadius = "0.5rem";
      element.style.boxShadow = "0 0 1px 1px black";
      element.style.margin = "2px";
    }

    clickArray.forEach((c, i) => {
      return c.index === index ? setX(clickArray.indexOf(c)) : "";
    });
    setObj({ index: index, value: value });
    setClick(true);
  };
  useEffect(() => {
    if (click) {
      if (x !== false) {
        clickArray.splice(x, 1);
      } else {
        setClickArray([...clickArray, obj]);
      }
      setClick(false);
    }
  }, [obj, click, clickArray, x]);

  //page condition
  const pageCondition = useCallback(async () => {
    let updateDbSave = async () => {
      if (!checkAnswerState) {
        await saveTempMt(data.id, data.mt_type_id);
      }
    };

    await updateDbSave();
    setDbSaveLoading(false);
    setPause(false);
    if (index === testPost.length - 1) {
      setCategoryState(false);
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage((prev) => prev + 1);
      setIndex((prev) => prev + 1);
    }
    setSave(true);
  }, [
    index,
    setCategoryState,
    data,
    setPause,
    checkAnswerState,
    setCurrentPage,
    testPost,
    setSave,
  ]);

  const clickHandler = () => {
    // let overall_point = 0;
    // checkArray.forEach((c) => {
    //   if (c.name === value && c.isCorrect === 1) {
    //     overall_point += 1;
    //   }
    // });

    // storeData.score.push(overall_point);
    // storeData.post.push(props.hiwPost.id);
    // setStoreData(storeData);
    //
    if (!checkAnswerState) {
      setTestArray(testString.split(" "));
      setCorrect(0);
      setIncorrect(0);

      clickArray.forEach((test, index) => {
        if (sortedAns.includes(test.index)) {
          setCorrect((prevCount) => prevCount + 1);
        } else {
          setIncorrect((prevCount) => prevCount + 1);
        }
      });

      setTestAnswer(true);
    } else {
      pageCondition();
    }
  };

  useEffect(() => {
    if (testAnswer) {
      setFinalTest(correct - inCorrect < 0 ? 0 : correct - inCorrect);

      //for user answer
      storeData.score[index] =
        correct - inCorrect < 0 ? 0 : correct - inCorrect;
      storeData.answer[index] = clickArray;

      setStoreData(storeData);
      updateUserData("Listening", category, storeData, mockId);

      //
      setPause(true);
      setDbSaveLoading(true);
      pageCondition();
      setTestAnswer(false);
      setCurrentQuestionStart(true);
      setBeginningStatus(true);
    }
  }, [
    correct,
    mockId,
    pageCondition,
    setCategoryState,
    setCurrentQuestionStart,
    setCurrentPage,
    testPost,
    setPause,
    inCorrect,
    category,
    finalTest,
    index,
    props,
    testAnswer,
    storeData,
    clickArray,
    sortedAns,
  ]);

  //audio
  useEffect(() => {
    let answer = testPost[index].answers;
    setClickArray([]);
    setAnswerArr([]);
    setAnswerArr(answer);
    setContent(testPost[index].title);
    setTestString(testPost[index].content);
    setSortedAns([]);
    let text;
    text = testString.replace(/\([^()]*\)/g, "$");
    text = text.split(" ");
    for (let i = 0; i < answerArr.length; i++) {
      for (let j = 0; j < text.length; j++) {
        if (answerArr[i].name === text[j] && text[j + 1].includes("$#")) {
          setSortedAns((prevAns) => [...prevAns, j]);
        }
      }
    }
    setAudio("");

    if (testPost[index].media_type === "1") {
      setAudio(testPost[index].media);
    } else {
      setAudio(
        `${process.env.REACT_APP_BACKEND_URL}storage/${category}/${testPost[index].media}`
      );
    }
  }, [testPost, answerArr, testString, index, category]);

  //useEffect for splitting content into array
  useEffect(() => {
    if (testString !== "") {
      let text;
      // text = testString.replace(/\([^()]*\)/g, "$");
      text = testString;
      text = text.split(" ");
      setTestArray(text);

      let elements = document.getElementsByClassName("bgReset");

      for (let index = 0; index < elements.length; index++) {
        elements[index].removeAttribute("style");
      }
    }
  }, [testString]);

  //check answer
  useEffect(() => {
    if (
      checkAnswerState &&
      testArray !== undefined &&
      testArray.length !== 0 &&
      answer !== undefined &&
      answer?.answers !== undefined &&
      answer?.scores !== undefined
    ) {
      let checkAnswer = JSON.parse(answer.answers)[index];

      setAnswerIndex([]);
      checkAnswer.forEach((c, i) => {
        setAnswerIndex((prev) => [...prev, c.index]);
      });
      setFinalTest(answer.scores.split(",")[index]);
    }
  }, [checkAnswerState, answer, index, testArray]);

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
                You will hear a recording. Below is a transcription of the
                recording. Some words in the transcription differ from what the
                speaker(s) said. Please click on the words that are different.
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
                    disabled={!checkAnswerState}
                  >
                    <audio
                      controls
                      ref={audioRef}
                      disabled
                      id="audio"
                      src={audio}
                      onEnded={() => setBeginningStatus(false)}
                      preload="metadata"
                      onLoadedMetadata={onLoadedMetaData}
                    ></audio>
                  </Button>
                </Box>
              )}
            </Box>

            <Box>
              {testArray !== undefined && testArray.length !== 0 && (
                <>
                  <Box
                    sx={{
                      width: "90%",
                      margin: "0 auto",
                      borderRadius: "0.5rem",
                      padding: 2,
                      boxShadow: 1,
                      textAlign: "justify",
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      {content}
                    </Typography>
                    {testArray.map((test, index) => (
                      <Typography
                        key={index}
                        sx={{ display: "inline-block", mr: 1 }}
                      >
                        {!test.includes("$#") && (
                          <>
                            <span
                              id={index}
                              // className="bgReset"
                              className={
                                checkAnswerState
                                  ? sortedAns.includes(index)
                                    ? answerIndex.includes(index)
                                      ? "disable-text-selection correctBg"
                                      : "disable-text-selection checkBg"
                                    : answerIndex.includes(index)
                                    ? "disable-text-selection wrongBg"
                                    : "disable-text-selection"
                                  : "bgReset"
                              } //css in style.css
                              style={{ cursor: "pointer" }}
                              onClick={() => clickHighlightHandler(test, index)}
                            >
                              {test + " "}
                              {test === "'" ? "" : " "}
                            </span>
                          </>
                        )}
                        {test.includes("$#") && checkAnswerState && (
                          <span
                            key={index.toString()}
                            id={index}
                            className={
                              checkAnswerState
                                ? sortedAns.includes(index)
                                  ? answerIndex.includes(index)
                                    ? "disable-text-selection checkBg"
                                    : "disable-text-selection correctBg"
                                  : !sortedAns.includes(index) &&
                                    answerIndex.includes(index)
                                  ? "disable-text-selection wrongBg"
                                  : "disable-text-selection"
                                : "disable-text-selection"
                            } //css in style.css
                            style={{ cursor: "pointer", color: "green" }}
                            onClick={() => clickHandler(test, index)}
                          >
                            ({test.replaceAll(/#\$|\$#/g, "")}){" "}
                          </span>
                        )}
                      </Typography>
                    ))}
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
        {checkAnswerState && (
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
                <Box sx={{ width: "10%", margin: "0 auto" }}>
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      my: 2,
                    }}
                  >
                    Mark
                  </h3>
                  <CircularProgressbar
                    value={finalTest < 0 ? 0 : finalTest}
                    maxValue={sortedAns.length}
                    text={`${finalTest}/${sortedAns.length}`}
                  />
                </Box>

                <br />
              </Box>
            </Box>
          </Box>
        )}

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
            disabled={
              dbSaveLoading
                ? true
                : checkByAdmin === true
                ? false
                : checkAnswerState
                ? false
                : beginningStatus
            }
          >
            {dbSaveLoading ? (
              <CircularProgress size="1rem"></CircularProgress>
            ) : (
              ""
            )}
            Next
          </Button>
        </Box>
      </>
    </ErrrorBoundaryClass>
  );
}

export default HIWtest;
