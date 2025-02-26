import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Radio,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { updateUserData } from "../StoreDataFunctions";
import { requestAudio } from "../../../../../customHooks/Permissions/RequestPermission";
import ErrrorBoundaryClass from "../../../../../components/ErrrorBoundaryClass";
import { MtErrorFallbackFunction } from "../../../../../components/ErrorFallbackFunction";
import { CircularProgressbar } from "react-circular-progressbar";
import { AdminCheckContext } from "../MockTest";
import { saveTempMt } from "../../../../../Utils/SaveTempMt";
import { useParams } from "react-router-dom";

function ReusableSingleAnswerTest(props) {
  const {
    category,
    answer,
    testPost,
    setCategoryState,
    setCurrentPage,
    mockId,
    setCurrentCategory,
    setCurrentIndex,
    passSaveDataState,
    setPassSaveDataState,
    error,
    setError,
    setSave,
    setCurrentQuestionStart,
    checkAnswerState,
    setPause,
  } = props;
  //audio related section;
  const data = useParams();
  const audioRef = useRef();
  const [audio, setAudio] = useState();
  const [beginningStatus, setBeginningStatus] = useState(true);
  const [checkBg, setCheckBg] = useState([]);
  let [count, setCount] = useState(0);
  // const [timerCounterCount, setTimerCounterCount] = useState(600);
  const [index, setIndex] = useState(0);
  const [storeData, setStoreData] = useState();
  const [value, setValue] = useState(1);
  const [checkArray, setCheckArray] = useState([]);
  const checkByAdmin = useContext(AdminCheckContext);
  const [dbSaveLoading, setDbSaveLoading] = useState(false);
  //for audio permission
  //checkPermission
  // useEffect(() => {
  //   requestAudio().catch(() => alert("No support Audio Permission"));
  // }, []);
  //update with save progress data

  useEffect(() => {
    if (passSaveDataState) {
      let saveCategory = localStorage.getItem("saveCategory");
      let saveIndex = localStorage.getItem("saveIndex");

      if (saveCategory == category) {
        setCurrentQuestionStart(true);
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
      getStoreData.answer = getStoreData.answer.split(",");
      setCurrentQuestionStart(true);

      setStoreData(getStoreData);
    }

    setCurrentCategory(category);
  }, [
    category,
    mockId,
    setCurrentCategory,
    setCurrentQuestionStart,
    checkAnswerState,
  ]);

  const onLoadedMetaData = () => {
    const audio = document.querySelector("#audio");

    audio.play();
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const clickHandler = () => {
    if (!checkAnswerState) {
      let overall_point = 0;
      let chooseIndex;
      checkArray.forEach((c, index) => {
        if (c.name === value && c.isCorrect === 1) {
          overall_point = 1;
        }
        if (c.name === value) {
          chooseIndex = index;
        }
      });

      storeData.score[index] = overall_point;
      storeData.answer[index] = chooseIndex !== null ? chooseIndex : "";
      setStoreData(storeData);

      //update the data in local storage
      let section;
      if (category !== "rsmc") {
        section = "Listening";
      } else {
        section = "Reading";
      }
      updateUserData(section, category, storeData, mockId);
    }
    setPause(true);
    setDbSaveLoading(true);
    pageCondition();
  };

  const pageCondition = async () => {
    let updateDbSave = async () => {
      if (!checkAnswerState) {
        await saveTempMt(data.id, data.mt_type_id);
      }
    };

    await updateDbSave();
    if (index === testPost.length - 1) {
      setCurrentPage((prev) => prev + 1);
      setCategoryState(false);
    } else {
      setIndex((prev) => prev + 1);
      setCurrentPage((prev) => prev + 1);
    }
    setDbSaveLoading(false);
    setPause(false);
    setCurrentQuestionStart(true);
    setSave(true);
  };

  //for check answers
  useEffect(() => {
    if (
      checkAnswerState &&
      answer !== undefined &&
      answer?.scores !== undefined
    ) {
      let answerScore = parseInt(answer.scores.split(",")[index]);
      answerScore === 1 ? setCount(1) : setCount(0);

      for (let i = 0; i < checkArray.length; i++) {
        if (checkArray[i].isCorrect === 1) {
          setCheckBg(i);
        }
      }
    }
  }, [checkAnswerState, answer, index, checkBg, checkArray]);

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
    setCheckArray(testPost[index].mul_choices);
    if (category !== "rsmc") {
      setAudio("");

      if (testPost[index].media_type === "1") {
        setAudio(testPost[index].media);
      } else {
        setAudio(
          `${process.env.REACT_APP_BACKEND_URL}storage/${category}/${testPost[index].media}`
        );
      }
    }
  }, [index, testPost, category]);

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
                {category === "rsmc"
                  ? "Read the text and answer the multiple choice questions by selecting the correct response.Only one response is correct."
                  : category === "hcs"
                  ? " You will hear a recording. Click on the paragraph that best relates to the recording."
                  : category === "smw"
                  ? " You will hear a recording of a lecture. At the end of the recording the last word or group of words has been replaced by a beep. Select the correct option to complete the recording."
                  : "Listen to the recording and answer the multiple-choice question by selecting the correct response. Only one response is correct."}
              </Typography>
              {/* Audio */}
              {category !== "rsmc" && (
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
                          // autoPlay
                        ></audio>
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </Box>

            <Box sx={{ margin: "0 auto", width: "100%", mb: 4 }}>
              {(category === "rsmc" || category === "smc") && (
                <Box
                  sx={{
                    my: 2,
                    p: 1,
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
                  <Typography sx={{ my: 2, fontSize: "1.2rem" }}>
                    {/* {props.rsmcPost.title} */}
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
                              ? checkBg !== undefined &&
                                answer?.answers !== undefined
                                ? checkBg === id &&
                                  checkBg ===
                                    parseInt(answer?.answers?.split(",")[index])
                                  ? "yellowgreen"
                                  : checkBg === id &&
                                    checkBg !==
                                      parseInt(
                                        answer?.answers.split(",")[index]
                                      )
                                  ? "yellow"
                                  : id ===
                                      parseInt(
                                        answer?.answers.split(",")[index]
                                      ) &&
                                    checkBg !==
                                      parseInt(
                                        answer?.answers.split(",")[index]
                                      )
                                  ? "red"
                                  : ""
                                : ""
                              : "",
                            my: 0.2,
                          }}
                          control={
                            <Radio
                              checked={
                                checkAnswerState
                                  ? answer?.answers !== undefined
                                    ? id ===
                                        parseInt(
                                          answer.answers.split(",")[index]
                                        ) ||
                                      value === answer.answers.split(",")[index]
                                    : false
                                  : value === c.name
                              }
                              value={c.name}
                              onChange={handleChange}
                              disabled={checkAnswerState}
                              sx={{ fontSize: "1rem", lineHeight: "150%" }}
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
                    value={count}
                    maxValue={1}
                    text={`${count}/1`}
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
            disabled={
              dbSaveLoading
                ? true
                : checkByAdmin === true
                ? false
                : category !== "rsmc" && beginningStatus && !checkAnswerState
                ? true
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

export default ReusableSingleAnswerTest;
