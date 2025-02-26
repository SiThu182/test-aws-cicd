import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import { updateUserData } from "../StoreDataFunctions";
import { useRef } from "react";
import { requestAudio } from "../../../../../customHooks/Permissions/RequestPermission";
import ErrrorBoundaryClass from "../../../../../components/ErrrorBoundaryClass";
import { MtErrorFallbackFunction } from "../../../../../components/ErrorFallbackFunction";
import { CircularProgressbar } from "react-circular-progressbar";
import { AdminCheckContext } from "../MockTest";
import { useParams } from "react-router-dom";
import { saveTempMt } from "../../../../../Utils/SaveTempMt";
function ReusableMutlipleAnswerTest(props) {
  const {
    category,
    testPost,
    answer,
    setCategoryState,
    setCurrentPage,
    setCurrentCategory,
    setCurrentIndex,
    passSaveDataState,
    setPassSaveDataState,
    setCurrentQuestionStart,
    error,
    setError,
    setSave,
    setPause,
    checkAnswerState,
    mockId,
  } = props;
  //audio
  const audioRef = useRef();
  const data = useParams();
  const [audio, setAudio] = useState();
  const [beginningStatus, setBeginningStatus] = useState(true);
  const checkByAdmin = useContext(AdminCheckContext);
  // const [countTotalAnswerState, setCountTotalAnswerState] = useState(true);
  const [timerCounterCount, setTimerCounterCount] = useState(600);

  const [index, setIndex] = useState(0);

  const [storeData, setStoreData] = useState();

  const [checkArray, setCheckArray] = useState([]);
  const [count, setCount] = useState(0);
  const [ans, setAns] = useState();
  const [minusCount, setMinusCount] = useState(0);
  const [testAnswer, setTestAnswer] = useState();
  //check answer
  const [answerArray, setAnswerArray] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [checkedState, setCheckedState] = useState("");
  const [finalScore, setFinalScore] = useState(0);
  const [checkBg, setCheckBg] = useState([]);
  const [dbSaveLoading, setDbSaveLoading] = useState(false);
  //for audio permission
  //checkPermission
  // useEffect(() => {
  //   requestAudio().catch(() => alert("No support Audio Permission"));
  // }, []);

  useEffect(() => {
    if (passSaveDataState) {
      let saveCategory = localStorage.getItem("saveCategory");
      let saveIndex = localStorage.getItem("saveIndex");

      if (saveCategory === category) {
        setIndex(parseInt(saveIndex));
        setCurrentIndex(saveIndex);

        setPassSaveDataState(false);
        setCurrentQuestionStart(true);
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
    if (!checkAnswerState && !passSaveDataState) {
      let userId = localStorage.getItem("userId");

      let saveStoreData = localStorage.getItem(userId + "saveMt" + mockId);
      saveStoreData = JSON.parse(saveStoreData);
      let getStoreData = JSON.parse(saveStoreData?.[category]);
      getStoreData.score = getStoreData.score.split(",");
      getStoreData.answer = JSON.parse(getStoreData.answer);

      setStoreData(getStoreData);
    }

    setCurrentCategory(category);
  }, [category, setCurrentCategory, checkAnswerState, passSaveDataState]);

  const onLoadedMetaData = () => {
    const audio = document.querySelector("#audio");

    audio.play();
  };

  const handleCheckedState = async (i) => {
    let updateState = await checkedState.map((item, index) => {
      return index === i ? !item : item;
    });
    setCheckedState(updateState);
    setAns(updateState);
  };

  const clickHandler = () => {
    if (ans !== undefined && checkAnswerState !== true) {
      checkArray.forEach((c) => {
        if (c.isCorrect === 1) {
          setTotalCount((prevtotalCount) => prevtotalCount + 1);
        }
      });
      checkArray.map((c, index) => {
        return c.isCorrect === 1 && ans[index] === true
          ? setCount((prevCount) => prevCount + 1)
          : "";
      });
      //check minus count
      checkArray.map((c, index) => {
        return ans[index] === true && c.isCorrect !== 1
          ? setMinusCount((prevMinusCount) => prevMinusCount + 1)
          : "";
      });
      setTestAnswer(true);
    }
    if (ans === undefined) {
      setTestAnswer(true);
    }
    if (checkAnswerState) {
      pageCondition();
    }
  };
  //pageCondition
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
      setCurrentPage((prev) => prev + 1);
      setCategoryState(false);
    } else {
      setIndex((prev) => prev + 1);
      setCurrentPage((prev) => prev + 1);
      reset();
    }
    setSave(true);
  }, [
    index,
    setPause,
    setCategoryState,
    checkAnswerState,
    data,
    setCurrentPage,
    testPost,
    setSave,
  ]);

  // calculate
  useEffect(() => {
    if (testAnswer && checkAnswerState !== true) {
      setTestAnswer(false);
      let overall_point = count - minusCount;
      // let totalPoint = totalCount;

      //for user answers

      storeData.score[index] = count - minusCount < 0 ? 0 : count - minusCount;

      storeData.answer[index] = ans !== null && ans !== undefined ? ans : "";

      setStoreData(storeData);

      //update the data in local storage
      setCurrentQuestionStart(true);
      let section;
      if (category === "rmc") {
        section = "Reading";
      } else {
        section = "Listening";
      }
      updateUserData(section, category, storeData, mockId);
      setPause(true);
      setDbSaveLoading(true);
      pageCondition();
    }
  }, [
    ans,
    pageCondition,
    mockId,
    setCurrentQuestionStart,
    // answer,
    count,
    category,
    index,
    setPause,
    minusCount,
    setCurrentPage,
    testPost,
    setCategoryState,
    props,
    storeData,
    totalCount,
    checkArray,
    testAnswer,
  ]);

  const reset = () => {
    setCount(0);
    setAns("");
    setFinalScore(0);
    setTotalCount(0);
    setBeginningStatus(true);
    setMinusCount(0);
    setTestAnswer(false);
    setTotalCount(0);
  };

  useEffect(() => {
    //
    setCheckArray(testPost[index].mul_choices);
    setCheckedState(new Array(testPost[index].mul_choices.length).fill(false));
    if (category === "mc") {
      if (testPost[index].media_type === "1") {
        setAudio(testPost[index].media);
      } else {
        setAudio(
          `${process.env.REACT_APP_BACKEND_URL}storage/${category}/${testPost[index].media}`
        );
      }
    }
  }, [index, testPost, category]);

  //check answer
  useEffect(() => {
    if (
      checkAnswerState &&
      answer !== undefined &&
      answer?.scores !== undefined
    ) {
      let bg = [];
      let score = answer.scores.split(",")[index];
      setFinalScore(score);
      setAnswerArray(JSON.parse(answer.answers));

      checkArray.map((c, i) => {
        return bg.push(c.isCorrect);
      });
      setTotalCount([]);
      checkArray.forEach((c) => {
        if (c.isCorrect === 1) {
          setTotalCount((prevtotalCount) => prevtotalCount * 1 + 1);
        }
      });
      setCheckBg(bg);
    }
  }, [checkAnswerState, checkArray, answer, index]);

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
                {category === "mc"
                  ? " Listen to the recording and answer the question by selecting all the correct responses. You will need to select more than one response."
                  : " Read the text and answer the multiple choice questions by selecting all the correct responses.You will need to select more than one response."}
              </Typography>
            </Box>
            {/* Audio */}
            {category === "mc" && (
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
            )}

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
                <Typography
                  variant="body3"
                  sx={{ fontSize: "1rem", lineHeight: "150%" }}
                >
                  {testPost[index].content}
                </Typography>
              </Box>

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
                  <Typography sx={{ my: 2, fontSize: "1.2rem" }}>
                    {/* {props.rmcPost.title} */}
                    {testPost[index]?.question}
                  </Typography>
                  <FormGroup>
                    {checkArray.map((c, id) => {
                      return (
                        <FormControlLabel
                          key={id}
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: "1rem",
                            },
                            "& .Mui-disabled": {
                              color: "black",
                            },
                            "& .MuiFormControlLabel-label.Mui-disabled": {
                              color: "black",
                            },
                            backgroundColor: checkAnswerState
                              ? checkBg !== undefined && checkBg.length !== 0
                                ? checkBg[id] === 1 &&
                                  answerArray[index]?.[id] === true
                                  ? "yellowgreen"
                                  : checkBg[id] === 1 &&
                                    !answerArray[index]?.[id]
                                  ? "yellow"
                                  : checkBg[id] !== 1 &&
                                    answerArray[index]?.[id]
                                  ? "red"
                                  : ""
                                : ""
                              : "",
                          }}
                          control={
                            <Checkbox
                              // checked={value === checkArray[0].name}
                              className="check test"
                              value={c.name}
                              checked={
                                checkAnswerState
                                  ? answerArray !== undefined &&
                                    answerArray[index] !== undefined
                                    ? answerArray[index]?.[id]
                                    : false
                                  : checkedState[id]
                              }
                              onChange={() => handleCheckedState(id)}
                              disabled={checkAnswerState}
                            />
                          }
                          label={c.name}
                        />
                      );
                    })}
                  </FormGroup>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {checkAnswerState && (
          <Box sx={{ p: 2 }}>
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
                    value={finalScore}
                    maxValue={totalCount}
                    text={`${finalScore}/${totalCount}`}
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
            onClick={() => clickHandler()}
            disabled={
              dbSaveLoading
                ? true
                : checkByAdmin === true
                ? false
                : category === "mc" && !checkAnswerState
                ? beginningStatus
                : false
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

export default ReusableMutlipleAnswerTest;
