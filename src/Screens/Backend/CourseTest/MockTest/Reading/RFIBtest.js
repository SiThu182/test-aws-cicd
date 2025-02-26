import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";

import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import { updateUserData } from "../StoreDataFunctions";
import ErrrorBoundaryClass from "../../../../../components/ErrrorBoundaryClass";
import { MtErrorFallbackFunction } from "../../../../../components/ErrorFallbackFunction";
import { CircularProgressbar } from "react-circular-progressbar";
import { useParams } from "react-router-dom";
import { saveTempMt } from "../../../../../Utils/SaveTempMt";

function RFIBtest(props) {
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
    mockId,
    setError,
    setSave,
    setPause,
    checkAnswerState,
  } = props;
  // const [countTotalAnswerState, setCountTotalAnswerState] = useState(true);
  const data = useParams();
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  const [index, setIndex] = useState(0);

  const [storeData, setStoreData] = useState();
  const [checkArray, setCheckArray] = useState([]);
  const [dropArray, setDropArray] = useState([]);
  const [dragArray, setDragArray] = useState([]);
  let [content, setContent] = useState("");
  const [count, setCount] = useState(0);
  const [ans, setAns] = useState();
  const [minusCount, setMinusCount] = useState(0);
  const [testAnswer, setTestAnswer] = useState();
  const [totalCount, setTotalCount] = useState(0);

  //check answer
  const [answerArray, setAnswerArray] = useState();

  //smooth transition
  const [stateControl, setStateControl] = useState(false);
  const [dbSaveLoading, setDbSaveLoading] = useState(false);
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
    setCurrentQuestionStart,
    setCurrentIndex,
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
    }
    setCurrentCategory(category);
  }, [checkAnswerState, category, mockId, setCurrentCategory]);

  useEffect(() => {
    if (stateControl) {
      setDropArray(dropArray);
      setStateControl(false);
    }
  }, [stateControl, dropArray, checkArray]);

  function handleDragEnd({ active, over }) {
    //s for start and e for end

    let sid = over === null ? null : over.id;
    let eid = active.id;

    let exist = sid !== null ? sid.toString().indexOf("drag") : "";
    let existArr = eid !== null ? dropArray.includes(eid) : "";

    if (sid !== null && exist === -1 && !existArr) {
      dropArray.splice(sid, 1, eid);
      setStateControl(true);
    }
    if (sid === null && existArr) {
      let s = dropArray.indexOf(eid);
      dropArray.splice(s, 1, 0);
      setStateControl(true);
    }
    if (sid !== null && existArr) {
      let s = dropArray.indexOf(eid);
      dropArray.splice(s, 1, dropArray[sid]);
      dropArray.splice(sid, 1, eid);
      setStateControl(true);
    }
  }

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
    setCategoryState,
    setCurrentPage,
    checkAnswerState,
    data,
    setPause,
    testPost,
  ]);

  const clickHandler = () => {
    if (!checkAnswerState) {
      setCount(0);
      setTotalCount(0);
      checkArray.forEach((c, index) => {
        if (c !== "" && c === dropArray[index]) {
          setCount((prev) => prev + 1);
        }
        if (c !== "") {
          setTotalCount((prev) => prev + 1);
        }
      });

      setTestAnswer(true);
    } else {
      pageCondition();
    }
  };

  // calculate
  useEffect(() => {
    if (testAnswer) {
      let overall_point = count;
      // let totalPoint = totalCount;

      //for user answers
      storeData.score[index] = overall_point < 0 ? 0 : overall_point;
      storeData.answer[index] = dropArray;

      setStoreData(storeData);
      //update the data in local storage
      updateUserData("Reading", category, storeData, mockId);
      setCurrentQuestionStart(true);
      setPause(true);
      setDbSaveLoading(true);
      pageCondition();
    }
  }, [
    ans,
    mockId,
    pageCondition,
    testAnswer,
    count,
    setCurrentQuestionStart,
    category,
    setPause,
    setCategoryState,
    setCurrentPage,
    index,
    minusCount,
    testPost,
    storeData,
    totalCount,
    checkArray,
    dropArray,
  ]);

  const reset = () => {
    setCount(0);
    setAns("");
    setMinusCount(0);
    setTestAnswer(false);
    setTotalCount(0);
  };

  useEffect(() => {
    // if (props.rfibPost[index].answer !== undefined) {
    setDragArray([]);
    setCheckArray([]);
    testPost[index].answers.forEach((ans) => {
      setCheckArray((prev) => [
        ...prev,
        ans.is_correct === "1" ? ans.name : "",
      ]);

      setDragArray((prev) =>
        [...prev, ans.name]
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      );
    });

    setDropArray(new Array(testPost[index].answers.length - 1).fill(0));
    setContent(testPost[index].content.split("#"));
  }, [index, testPost]);

  useEffect(() => {
    if (
      checkAnswerState &&
      answer !== undefined &&
      answer?.answers !== undefined
    ) {
      let answerArr = JSON.parse(answer.answers);
      // let count =

      setDropArray(answerArr[index]);
      setTotalCount(answer.total_points.split(",")[index]);
      setCount(answer.scores.split(",")[index]);
    }
  }, [checkAnswerState, answer, index]);

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
                In the texts below some words are missing.Drag word from the box
                below to the appropriate place in the text.To undo an answer
                choice,drag the word back to the box below to the text.
              </Typography>
            </Box>

            <Box sx={{ margin: "0 auto", width: "100%", mb: 4 }}>
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
                  <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                    {content !== undefined &&
                      content !== "" &&
                      dropArray.length !== 0 && (
                        <>
                          <Box
                            sx={{
                              width: "90%",
                              margin: "0 auto",
                              textAlign: "justify",
                              borderRadius: "0.5rem",
                              lineHeight: "220%",
                              padding: 1,
                              boxShadow: 1,
                            }}
                          >
                            {content.map((c, id) => (
                              <span key={id}>
                                <Typography
                                  variant="body5"
                                  sx={{
                                    my: 2,
                                    fontSize: "1rem",
                                    lineHeight: "150%",
                                  }}
                                >
                                  {c}
                                </Typography>
                                {id !== content.length - 1 && (
                                  <span>
                                    <Droppable
                                      id={id}
                                      index={id}
                                      key={id}
                                      className={
                                        checkAnswerState
                                          ? checkArray[id] !== "" &&
                                            dropArray[id] === checkArray[id]
                                            ? "drop correct"
                                            : "drop false"
                                          : "drop"
                                      }
                                    >
                                      {dropArray[id] !== 0 ? (
                                        <Draggable
                                          id={dropArray[id]}
                                          className="inDrop"
                                        >
                                          {dropArray[id]}
                                        </Draggable>
                                      ) : (
                                        "Drop here"
                                      )}
                                    </Droppable>
                                  </span>
                                )}
                                {checkAnswerState && checkArray[id] !== "" && (
                                  <Typography
                                    variant="span"
                                    sx={{
                                      color: "yellowgreen",
                                      fontSize: "1.2rem",
                                    }}
                                  >
                                    ({checkArray[id]})
                                  </Typography>
                                )}
                              </span>
                            ))}
                          </Box>

                          <Box
                            sx={{
                              width: "90%",
                              margin: "0 auto",

                              borderRadius: "0.5rem",
                              padding: 1,
                              boxShadow: 5,
                            }}
                          >
                            {dragArray.map(
                              (d, index) =>
                                !dropArray.includes(d) && (
                                  <Draggable id={d} index={index} key={index}>
                                    {d}
                                  </Draggable>
                                )
                            )}
                          </Box>
                        </>
                      )}
                  </DndContext>
                </Box>
              </Box>
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
                    value={count}
                    maxValue={totalCount}
                    text={`${count}/${totalCount}`}
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
            Next
          </Button>
        </Box>
      </>
    </ErrrorBoundaryClass>
  );
}

export default RFIBtest;
