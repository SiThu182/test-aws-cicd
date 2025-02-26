import {
  closestCorners,
  defaultDropAnimation,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";

import BoardSection from "../../Reading/ReorderParagraph/BoardSection";
import TaskItem from "../../Reading/ReorderParagraph/TaskItem";
import {
  findBoardSectionContainer,
  initializeBoard,
} from "../../Reading/ReorderParagraph/utils/board";
import { getTaskById } from "../../Reading/ReorderParagraph/utils/tasks";
import { updateUserData } from "../StoreDataFunctions";
import ErrrorBoundaryClass from "../../../../../components/ErrrorBoundaryClass";
import { MtErrorFallbackFunction } from "../../../../../components/ErrorFallbackFunction";
import { CircularProgressbar } from "react-circular-progressbar";
import { useParams } from "react-router-dom";
import { saveTempMt } from "../../../../../Utils/SaveTempMt";

function ROPtest(props) {
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
    checkAnswerState,
    error,
    setSave,
    mockId,
    setPause,
    setError,
  } = props;
  // const [countTotalAnswerState, setCountTotalAnswerState] = useState(true);
  const data = useParams();
  const [boardSections, setBoardSections] = useState();
  const [tasks, setTasks] = useState();
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [index, setIndex] = useState(0);
  const [storeData, setStoreData] = useState();

  let [count, setCount] = useState(0);
  const [cleanUpState, setCleanUpState] = useState(true);
  let [content, setContent] = useState("");
  // const [checkArray, setCheckArray] = useState([]);
  // const [storeAnswer, setStoreAnswer] = useState([]);
  //check answer
  // const [checkAnsArray, setCheckAnsArray] = useState([]);

  //update with save progress data
  const [dbSaveLoading, setDbSaveLoading] = useState(false);
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
      setCurrentCategory(category);
    }
  }, [category, setCurrentCategory, checkAnswerState]);

  //count  total number of true answer in each post will only run once
  // useEffect(() => {
  //   if (countTotalAnswerState) {
  //     props.ropPost.forEach((p, i) => {
  //       let correctCount = 0;
  //       correctCount = p.reorders.length;
  //       storeData.totalPoint[i] = correctCount;
  //       setStoreData(storeData);
  //     });
  //
  //     setCountTotalAnswerState(false);
  //   }
  // }, [countTotalAnswerState, props.ropPost, storeData]);

  const countNeighboringValues = useCallback(
    (array) => {
      let count = 0;
      let filteredBoardSection = { ...boardSections };
      filteredBoardSection.Target = boardSections.Target.filter(
        (value) => value !== undefined
      );
      filteredBoardSection.Source = boardSections.Source.filter(
        (value) => value !== undefined
      );
      // Create a copy of the state outside the loop
      //check correct value and add bg color
      for (let i = 0; i < array.length - 1; i++) {
        if (array[i] === true && array[i + 1] === true) {
          if (checkAnswerState) {
            for (let j = 0; j < 2; j++) {
              let updatedBoardSections = { ...filteredBoardSection };
              let index = updatedBoardSections["Target"].findIndex(
                (obj) => obj.id === updatedBoardSections["Target"][i + j].id
              );

              //  Update the color property of the object at index i
              updatedBoardSections["Target"][i + j] = {
                ...updatedBoardSections["Target"][i + j],
                correct: 1,
              };

              //  Update the state with the modified boardSections
              setBoardSections(updatedBoardSections);
              filteredBoardSection = { ...updatedBoardSections };
            }
          }

          count++;
        }
      }

      //  check wrong value and add bg color

      for (let i = 0; i <= array.length - 1; i++) {
        if (filteredBoardSection["Target"][i]?.correct !== 1) {
          let updatedBoardSections = { ...filteredBoardSection };
          let index = updatedBoardSections["Target"].findIndex(
            (obj) => obj.id === updatedBoardSections["Target"][i].id
          );

          // Update the color property of the object at index i
          updatedBoardSections["Target"][i] = {
            ...updatedBoardSections["Target"][i],
            correct: 2,
          };

          // Update the state with the modified boardSections
          setBoardSections(updatedBoardSections);
        }
      }

      return count;
    },
    [boardSections, checkAnswerState]
  );
  const clickHandler = async () => {
    if (checkAnswerState !== true) {
      setPause(true);
      setDbSaveLoading(true);
      let content_arr = content.split(",");

      let filteredBoardSection = { ...boardSections };
      filteredBoardSection.Target = boardSections.Target.filter(
        (value) => value !== undefined
      );
      filteredBoardSection.Source = boardSections.Source.filter(
        (value) => value !== undefined
      );

      let overall_point = 0;
      let answer = [];

      let pre_score_check = [];
      for (let i = 0; i < content_arr.length; i++) {
        if (filteredBoardSection["Target"][i] !== undefined) {
          // pre_score_check.push(filteredBoardSection["Target"][i].para_number)
          answer.push(filteredBoardSection["Target"][i].para_number);
          if (content_arr[i] == filteredBoardSection["Target"][i].para_number) {
            pre_score_check.push(true);
            // setCount((prevCount) => (prevCount += 1));
            // overall_point += 1;
          } else {
            pre_score_check.push(false);
          }
        }
      }

      //for user answers

      overall_point = countNeighboringValues(pre_score_check);
      storeData.score[index] = overall_point;
      storeData.answer[index] = answer;

      setStoreData(storeData);

      //update the data in local storage
      updateUserData("Reading", category, storeData, mockId);

      setCurrentQuestionStart(true);
      let updateDbSave = async () => {
        if (!checkAnswerState) {
          await saveTempMt(data.id, data.mt_type_id);
        }
      };

      await updateDbSave();
      setDbSaveLoading(false);
      setPause(false);
    }

    if (index === testPost.length - 1) {
      setCurrentPage((prev) => prev + 1);
      setCategoryState(false);
    } else {
      setIndex((prev) => prev + 1);
      setCurrentPage((prev) => prev + 1);
      setCleanUpState(true);
      setBoardSections();
      setCount(0);
    }
    setSave(true);
  };

  useEffect(() => {
    if (
      testPost[index].reorders !== "" &&
      testPost[index].reorders !== undefined
    ) {
      let initialBoardSections;
      let boardArray;
      if (checkAnswerState && answer?.ans !== undefined) {
        boardArray = answer.ans[index];
        initialBoardSections = initializeBoard(boardArray);
      } else {
        initialBoardSections = initializeBoard(testPost[index].reorders);
      }
      setBoardSections(initialBoardSections);
      setTasks(testPost[index].reorders);
      setContent(testPost[index].content);
    }
  }, [index, testPost, checkAnswerState, answer]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }) => {
    setActiveTaskId(active.id);
  };

  const handleDragOver = ({ active, over }) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(boardSections, active.id);
    const overContainer = findBoardSectionContainer(boardSections, over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item?.id === active?.id
      );
      const overIndex = overItems.findIndex((item) => item?.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item?.id !== active?.id
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }) => {
    const activeContainer = findBoardSectionContainer(boardSections, active.id);
    const overContainer = findBoardSectionContainer(boardSections, over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task?.id === active?.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task?.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveTaskId(null);
  };

  const dropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;

  useEffect(() => {
    if (
      checkAnswerState &&
      boardSections !== undefined &&
      boardSections["Target"] !== undefined &&
      cleanUpState
    ) {
      let overall_point = 0;
      // let ansswerArray = JSON.parse(answer.answers);
      let content_arr = content.split(",");

      // setCount(answer.scores.split(",")[index]);
      let pre_score_check = [];
      for (let i = 0; i < content_arr.length; i++) {
        if (boardSections["Target"][i] !== undefined) {
          // pre_score_check.push(boardSections["Target"][i].para_number)

          if (content_arr[i] == boardSections["Target"][i].para_number) {
            pre_score_check.push(true);
            // setCount((prevCount) => (prevCount += 1));
            // overall_point += 1;
          } else {
            pre_score_check.push(false);
          }
        }
      }

      //for user answers

      overall_point = countNeighboringValues(pre_score_check);
      setCount(overall_point);
      setCleanUpState(false);
    }
  }, [
    answer,
    checkAnswerState,
    cleanUpState,
    index,
    countNeighboringValues,
    content,
    boardSections,
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
                The text boxes in the left panel have been placed in a random
                order. Restore the original order by dragging the text boxes
                from the left panel to the right panel.
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
                  <Container>
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCorners}
                      onDragStart={handleDragStart}
                      onDragOver={handleDragOver}
                      onDragEnd={handleDragEnd}
                    >
                      <Grid container spacing={4}>
                        {boardSections !== undefined &&
                          Object.keys(boardSections).length !== 0 &&
                          Object.keys(boardSections).map((boardSectionKey) => (
                            <Grid item xs={6} key={boardSectionKey}>
                              <BoardSection
                                checkAnswerState={checkAnswerState}
                                id={boardSectionKey}
                                title={boardSectionKey}
                                tasks={boardSections[boardSectionKey]}
                              />
                            </Grid>
                          ))}
                        <DragOverlay dropAnimation={dropAnimation}>
                          {task ? <TaskItem task={task} /> : null}
                        </DragOverlay>
                      </Grid>
                    </DndContext>
                  </Container>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {checkAnswerState && (
          <>
            {answer.ans !== undefined && (
              <Box
                sx={{
                  m: 2,
                  p: 2,
                  backgroundColor: "white",
                  borderRadius: "1rem",
                }}
              >
                <Typography variant="h6" sx={{ textDecoration: "underline" }}>
                  Correct Order
                </Typography>
                {testPost[index].content.split(",").map((t, i) => (
                  <Box>
                    <Typography>
                      {testPost[index].reorders.map((r) =>
                        parseInt(t) === r.para_number ? r.name : ""
                      )}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

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
                      maxValue={content.split(",").length - 1}
                      text={`${count}/${content.split(",").length - 1}`}
                    />
                  </Box>
                  <br />
                </Box>
              </Box>
            </Box>
          </>
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

export default ROPtest;
