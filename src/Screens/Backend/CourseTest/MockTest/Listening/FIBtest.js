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

function FIBtest(props) {
  const audioRef = useRef();
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
    checkAnswerState,
    setError,
    mockId,
  } = props;
  const data = useParams();
  const checkByAdmin = useContext(AdminCheckContext);
  const [index, setIndex] = useState(0);
  const [beginningStatus, setBeginningStatus] = useState(true);
  const [storeData, setStoreData] = useState();
  //   let [count, setCount] = useState(0);
  const [ansArr, setAnsArr] = useState(""); //for user input
  const [answerArr, setAnswerArr] = useState([]); //original answer
  //testarray
  const [testArray, setTestArray] = useState();
  const [testString, setTestString] = useState("");
  const [checkArr, setCheckArr] = useState("");
  const [content, setContent] = useState("");
  const [audio, setAudio] = useState();
  // checkstate for useEffect
  const [checkState, setCheckState] = useState(false);
  const [testAnswer, setTestAnswer] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [finalTest, setFinalTest] = useState("");
  const [dbSaveLoading, setDbSaveLoading] = useState(false);

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

  const onLoadedMetaData = () => {
    const audio = document.querySelector("#audio");
    audio.play();
  };

  //page condition
  const pageCondition = useCallback(async () => {
    setPause(true);
    setDbSaveLoading(true);
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
    if (!checkAnswerState) {
      let input = document.querySelectorAll(".inputBox");

      input.forEach((i) => {});

      setCheckArr([]);
      answerArr.forEach((ans, index) => {
        setCheckArr((prevArray) => [...prevArray, ans.name]);
      });

      setAnsArr([]);
      input.forEach((i) => {
        setAnsArr((prevArr) => [...prevArr, i.value.trim()]);
      });
      setCheckState(true);
    } else {
      pageCondition();
    }
  };
  //check ans & count
  useEffect(() => {
    const check = () => {
      setCorrect(0);
      setFinalTest("");

      ansArr.forEach((a, index) => {
        if (a === checkArr[index]) {
          setCorrect((prevCount) => prevCount + 1);
        } else {
        }
      });

      setTestAnswer(true);
      setCheckState(false);
    };
    if (checkState && ansArr.length !== 0 && ansArr !== undefined) {
      check();
    }
  }, [ansArr, checkArr, checkState]);

  //calculate final score and storing
  useEffect(() => {
    if (testAnswer) {
      setFinalTest(correct);
      setTestArray(testString.split(" "));

      //for user answers
      storeData.score[index] = correct;
      storeData.answer[index] = ansArr;

      setStoreData(storeData);

      //update the data in local storage
      updateUserData("Listening", category, storeData, mockId);

      pageCondition();
      let x = document.querySelectorAll(".inputBox");
      x.forEach((x) => {
        x.value = "";
      });

      setTestAnswer(false);
      setCurrentQuestionStart(true);
      setBeginningStatus(true);
    }
  }, [
    correct,
    pageCondition,
    testAnswer,
    testString,
    setPause,
    setCurrentQuestionStart,
    finalTest,
    testPost,
    category,
    setCategoryState,
    setCurrentPage,
    index,
    props,
    storeData,
    ansArr,
    checkArr,
  ]);

  //checkPermission

  //audio
  useEffect(() => {
    let answer = testPost[index].answers;
    setAnswerArr([]);
    setAnswerArr(answer);
    setContent(testPost[index].title);
    setTestString(testPost[index].content);
    setAudio("");
    if (testPost[index].media_type === "1") {
      setAudio(testPost[index].media);
    } else {
      setAudio(
        `${process.env.REACT_APP_BACKEND_URL}storage/fib/${testPost[index].media}`
      );
    }
  }, [testPost, index]);

  useEffect(() => {
    if (testString !== "") {
      let text;
      text = testString;
      text = text.split(" ");
      setTestArray(text);
    }
  }, [testString]);

  useEffect(() => {
    if (
      checkAnswerState &&
      answer?.answers !== undefined &&
      answerArr !== undefined &&
      answerArr.length !== 0
    ) {
      let userAnswer = JSON.parse(answer?.answers);
      setFinalTest(0);
      answerArr.forEach((a, i) => {
        if (a.name === userAnswer[index][i]) {
          setFinalTest((prev) => prev + 1);
        }
      });
    }
  }, [answer, answerArr, checkAnswerState, index]);

  useEffect(() => {
    if (
      checkAnswerState &&
      testArray !== undefined &&
      answer !== undefined &&
      answer?.answers !== undefined
    ) {
      let x = document.querySelectorAll(".inputBox");
      let answerId = [];
      x.forEach((x, i) => {
        x.value = JSON.parse(answer?.answers)[index][i];

        x.value ===
        testArray[x.id * 1 + 1]
          .replaceAll(/#\$.*/g, "")
          .replaceAll(/#\$|\$#|,/g, "")
          ? (x.style.border = "2px solid green")
          : (x.style.border = "2px solid red");
        answerId.push(i);
      });
    }
  }, [answer, testArray, checkAnswerState, index]);

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
                You will hear a recording. Type the missing words in each blank.
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
              {testArray !== undefined &&
                testArray.length !== 0 &&
                answerArr !== undefined &&
                answerArr.length !== 0 && (
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
                      {testArray.map((s, index) => {
                        return !s.includes("$#") && s !== "#" ? (
                          <span
                            key={index.toString()}
                            id={index}
                            className="spanStyle"
                          >
                            {s}{" "}
                          </span>
                        ) : s === "#" ? (
                          <input
                            id={index}
                            type="text"
                            className="inputBox"
                            style={{
                              height: "2rem",
                              borderRadius: "0.5rem",
                              fontSize: "1.2rem",
                            }}
                            key={index.toString()}
                          ></input>
                        ) : s.includes("$#") && checkAnswerState ? (
                          <span
                            key={index.toString()}
                            id={index}
                            className="spanStyle"
                            style={{ color: "yellowgreen" }}
                          >
                            (
                            {s
                              .replaceAll(/#\$.*/g, "")
                              .replaceAll(/#\$|\$#/g, "")}
                            ){" "}
                          </span>
                        ) : (
                          ""
                        );
                      })}
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
                    maxValue={answerArr.length}
                    text={`${finalTest}/${answerArr.length}`}
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
                : checkByAdmin
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

export default FIBtest;
