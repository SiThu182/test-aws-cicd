import { Box, Button, Typography, CircularProgress } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
// import { useParams } from "react-router-dom";
import { updateUserData } from "../StoreDataFunctions";
import { MtErrorFallbackFunction } from "../../../../../components/ErrorFallbackFunction";
import ErrrorBoundaryClass from "../../../../../components/ErrrorBoundaryClass";
import { CircularProgressbar } from "react-circular-progressbar";
import { saveTempMt } from "../../../../../Utils/SaveTempMt";
import { useParams } from "react-router-dom";
function RWFIBtest(props) {
  const {
    category,
    answer,
    testPost,
    setCategoryState,
    setCurrentPage,
    setReadingState,
    setCurrentCategory,
    setCurrentIndex,
    passSaveDataState,
    setPassSaveDataState,
    setCurrentQuestionStart,
    mockType,
    error,
    setSave,
    mockId,
    setPause,
    checkAnswerState,
    setError,
  } = props;
  const data = useParams();
  // const [countTotalAnswerState, setCountTotalAnswerState] = useState(true);
  const [timerCounterCount, setTimerCounterCount] = useState(600);
  const [index, setIndex] = useState(0);
  const [storeData, setStoreData] = useState();
  const [checkArray, setCheckArray] = useState([]);
  const [testAnswer, setTestAnswer] = useState(false);
  const [answerArr, setAnswerArr] = useState([]);
  const [isCorrect, setIsCorrect] = useState([]);
  let [count, setCount] = useState(0);
  // let [finalCount, setFinalCount] = useState(0);
  let [answerLoading, setAnswerLoading] = useState(false);
  let [content, setContent] = useState("");

  //checkanswer
  const [checkBg, setCheckBg] = useState([]);
  const [answerArray, setAnswerArray] = useState();
  const [dbSaveLoading, setDbSaveLoading] = useState(false);
  let [finalCount, setFinalCount] = useState(0);

  const checkHandler = () => {
    let x = document.querySelectorAll("[name='selectAns']");
    x.forEach((s) => setAnswerArr((prevAnsArr) => [...prevAnsArr, s.value]));

    setTestAnswer(false);
    setAnswerLoading(true);
  };

  // let mockId = useParams();
  // let mockType = mockId.mt_type_id;

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
    setCurrentQuestionStart,
    setPassSaveDataState,
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

  const clickHandler = () => {
    if (!checkAnswerState) {
      checkHandler();
      setStoreData(storeData);
    } else {
      pageCondition();
    }
  };

  //PAGE CONDITION
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
      // props.setCurrentPage((prev) => prev + 1);
      setCategoryState(false);
      setReadingState(false);
      setCurrentPage(1);
      if (mockType !== 4) {
        props.setSectionB(false);
        props.setCounterState(true);
        props.setCurrentPage(1);
        setCurrentCategory("sst");
      }
    } else {
      setIndex((prev) => prev + 1);
      setCurrentPage((prev) => prev + 1);
    }
    setSave(true);
  }, [
    index,
    setSave,
    data,
    setPause,
    checkAnswerState,
    mockType,
    props,
    setCategoryState,
    setCurrentPage,
    setReadingState,
    testPost,
  ]);

  useEffect(() => {
    if (answerLoading) {
      setCount(0);

      answerArr.forEach((a, index) => {
        if (a === isCorrect[0][index]) {
          setCount((prevCount) => prevCount + 1);
        }
      });

      setAnswerLoading(false);
      setTestAnswer(true);
    }
  }, [answerArr, answerLoading, isCorrect, testPost, storeData, count]);

  useEffect(() => {
    if (testAnswer) {
      //for user answers
      storeData.score[index] = count;
      storeData.answer[index] = answerArr;
      setStoreData(storeData);
      //update the data in local storage
      updateUserData("Reading", category, storeData, mockId);

      reset();
      setPause(true);
      setDbSaveLoading(true);
      pageCondition();
      setTestAnswer(false);
      setCurrentQuestionStart(true);
    }
  }, [
    testAnswer,
    mockId,
    pageCondition,
    props,
    setPause,
    testPost,
    setCategoryState,
    setCurrentPage,
    setCurrentQuestionStart,
    setReadingState,
    index,
    mockType,
    count,
    category,
    answerArr,
    isCorrect,
    storeData,
  ]);

  let reset = () => {
    let x = document.querySelectorAll("[name='selectAns']");

    x.forEach((s) => (s.value = ""));
    setAnswerArray();
  };
  // useEffect(() => {
  //   let beginInterval = () => {
  //     if (timerCounterCount !== 0) {
  //       const interval = setInterval(() => {
  //         setTimerCounterCount((prev) => prev - 1);
  //       }, 1000);
  //       return interval;
  //     }
  //   };
  //   let interval = beginInterval();
  //   return () => clearInterval(interval);
  // }, [timerCounterCount]);

  useEffect(() => {
    setCheckArray([]);
    setIsCorrect([]);
    setAnswerArr([]);
    if (
      testPost[index].answers !== undefined &&
      testPost[index].answers.length !== 0 &&
      testPost[index].answers[0].name.includes("[")
    ) {
      setCheckArray((prevArr) => [
        ...prevArr,
        testPost[index].answers.map((ans) => JSON.parse(ans.name)),
      ]);

      setIsCorrect((prevArr) => [
        ...prevArr,
        testPost[index].answers.map((ans) => ans.is_correct),
      ]);
    }
    setContent(testPost[index].content.split("#"));
    reset();
  }, [index, testPost]);

  //check answer
  useEffect(() => {
    if (
      checkAnswerState &&
      checkArray[0] !== undefined &&
      answer !== undefined &&
      content !== undefined &&
      answer?.scores !== undefined &&
      answer?.answers !== undefined
    ) {
      // let answerArr=JSON.parse

      setCheckBg([]);
      setFinalCount(0);

      checkArray[0].forEach((b, index) => {
        for (let i = 0; i < b.length; i++) {
          if (i + 1 === parseInt(isCorrect[0][index])) {
            setCheckBg((prevBg) => [...prevBg, b[i]]);
          }
        }
      });
      setFinalCount(answer.scores.split(",")[index]);
      let answerTest = JSON.parse(answer?.answers);
      let x = document.querySelectorAll("[name='selectAns']");

      x.forEach((s, i) => (s.value = JSON.parse(answer?.answers)[index][i]));
      setAnswerArray(answerTest[index]);
    }
  }, [checkAnswerState, answer, checkArray, index, isCorrect, content]);

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
            mt: "5rem",
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
                Below is a text with blanks. Click on each blank, a list of
                choices will appear. Select the appropriate answer choice for
                each blank.
              </Typography>
            </Box>

            <Box sx={{ margin: "0 auto", width: "100%", mb: 4 }}>
              <Box
                sx={{
                  my: 2,
                  p: 2,
                  backgroundColor: "whitesmoke",
                  borderRadius: "1rem",
                  boxShadow: 5,
                }}
              >
                {content !== undefined &&
                  content !== "" &&
                  content.map((c, index) => (
                    <span key={index}>
                      <Typography
                        key={index}
                        sx={{ my: 2, fontSize: "1rem", lineHeight: "150%" }}
                        variant="body5"
                      >
                        {c}
                      </Typography>
                      {index !== content.length - 1 && (
                        <select
                          name="selectAns"
                          style={{
                            display: "inline-block",
                            width: "10rem",
                            height: "2rem",
                            fontSize: "1.2rem",
                            borderRadius: "0.5rem",
                          }}
                          defaultValue={" "}
                        >
                          {/* {console.log(typeof answerArray[index])} */}

                          <option
                            value=" "
                            style={{ display: "none" }}
                          ></option>
                          {checkArray[0] !== undefined &&
                          checkArray[0][index] !== undefined &&
                          checkArray.length !== 0
                            ? checkArray[0][index].map((s, i) => (
                                <option
                                  key={i}
                                  style={{ fontSize: "1.2rem" }}
                                  value={(i + 1).toString()}
                                >
                                  {s}
                                </option>
                              ))
                            : ""}
                        </select>
                      )}
                      {checkAnswerState &&
                      checkBg !== undefined &&
                      index !== content.length - 1 ? (
                        <span style={{ color: "green" }}>
                          ({checkBg[index]})
                        </span>
                      ) : (
                        ""
                      )}
                    </span>
                  ))}
              </Box>
            </Box>
          </Box>
        </Box>
        {checkAnswerState &&
          isCorrect !== undefined &&
          isCorrect[0] !== undefined && (
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
                      value={finalCount}
                      maxValue={isCorrect[0]?.length}
                      text={`${finalCount}/${isCorrect[0].length}`}
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
            pb: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{ mr: "1rem", mb: "1rem" }}
            onClick={clickHandler}
            disabled={dbSaveLoading}
          >
            {dbSaveLoading ? (
              <CircularProgress size="1rem"></CircularProgress>
            ) : (
              ""
            )}
            {index === testPost.length - 1 ? "Finish Section" : "Next"}
          </Button>
        </Box>
      </>
    </ErrrorBoundaryClass>
  );
}

export default RWFIBtest;
