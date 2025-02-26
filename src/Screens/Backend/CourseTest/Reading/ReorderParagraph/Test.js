// for drag and drop
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

import { Box, Typography } from "@mui/material";
// Grid version 1

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";

import { fetchPostsByPageAsync } from "../../../../../redux/thunk/Posts";
import BoardSection from "./BoardSection";
// import { INITIAL_TASKS } from "./data";
import TaskItem from "./TaskItem";
import { findBoardSectionContainer, initializeBoard } from "./utils/board";
import { getTaskById } from "./utils/tasks";
import AnswerParentComponent from "../../../../../components/Backend/UserAnswerComponents/AnswerParent";
import PracticeLayout from "../../../../../components/Backend/PracticeLayout/PracticeLayout";
import { getCookie } from "../../../../../Utils/GetCookies";
import CountUpTimer from "../../../../../components/Backend/PracticeComponents/WFDTimer";

// import { fetchScoreCount } from "../../ScoreCountApi";

export const DataForAnswerContext = createContext();
const TestRop = () => {
  let { postsByPage, status } = useSelector((state) => state.posts);
  // const tasks = INITIAL_TASKS;
  const [boardSections, setBoardSections] = useState();
  const [tasks, setTasks] = useState();
  const [stopCount, setStopCount] = useState(false);
  const [resetCount, setResetCount] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState(null);

  const dispatch = useDispatch();
  let postPath = "reading-test/rop";
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  const [answer, setAnswer] = useState(false);

  const [answerLoading, setAnswerLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [errorStore, setErrorStore] = useState(false);
  const [errorScore, setErrorScore] = useState(false);

  let [count, setCount] = useState(0);

  let [content, setContent] = useState("");
  let [title, setTitle] = useState("");

  //paging
  let [totalPage, setTotalPage] = useState("");
  let [pagePaginate, setPagePaginate] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [page, setPage] = useState(1);
  // const [items, setItems] = useState();

  //getTotal page
  useEffect(() => {
    if (
      postsByPage.data !== undefined &&
      postsByPage.data.data[0] !== undefined &&
      postsByPage.data.data[0].reorders !== undefined
    ) {
      setTotalPage(postsByPage.data.total);
      let i = 1;
      let Paginate = [];
      while (i <= totalPage) {
        Paginate.push(i);
        i++;
      }
      setPagePaginate(Paginate);
      setCurrentPage(postsByPage.data.current_page);
      if (postsByPage.data.data[0] === undefined) {
      } else {
        let initialBoardSections = initializeBoard(
          postsByPage.data.data[0].reorders
        );
        setBoardSections(initialBoardSections);
        setTasks(postsByPage.data.data[0].reorders);
        // setItems();

        setContent(postsByPage.data.data[0].content);
        setTitle(postsByPage.data.data[0].title);
      }
    }
  }, [setPagePaginate, postsByPage, totalPage]);
  //get page data
  useEffect(() => {
    dispatch(fetchPostsByPageAsync({ path: postPath, page: page }));
  }, [dispatch, postPath, page]);

  // let controller = new AbortController();
  let updateBgColorTask = (index) => {};

  function countNeighboringValues(array) {
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
        for (let j = 0; j < 2; j++) {
          let updatedBoardSections = { ...filteredBoardSection };
          let index = updatedBoardSections["Target"].findIndex(
            (obj) => obj.id === updatedBoardSections["Target"][i + j].id
          );

          // Update the color property of the object at index i
          updatedBoardSections["Target"][i + j] = {
            ...updatedBoardSections["Target"][i + j],
            correct: 1,
          };

          // Update the state with the modified boardSections
          setBoardSections(updatedBoardSections);
          filteredBoardSection = { ...updatedBoardSections };
        }

        count++;
      }
    }

    //check wrong value and add bg color

    for (let i = 0; i <= array.length - 1; i++) {
      if (filteredBoardSection["Target"][i].correct !== 1) {
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
  }

  //upload & get score
  let upload = async () => {
    // let Id = localStorage.getItem("userId");
    // let response = await fetchScoreCount(Id, 1);
    setStopCount(true);
    // if (response === 1) {
    let content_arr = content.split(",");

    let filteredBoardSection = { ...boardSections };
    filteredBoardSection.Target = boardSections.Target.filter(
      (value) => value !== undefined
    );
    filteredBoardSection.Source = boardSections.Source.filter(
      (value) => value !== undefined
    );

    console.log(filteredBoardSection);
    console.log(filteredBoardSection.Target.length);
    console.log(content_arr.length);
    // let count = 0;
    let overall_point = 0;
    let user_answer = [];
    let pre_score_check = [];
    for (let i = 0; i < content_arr.length; i++) {
      if (filteredBoardSection["Target"][i] !== undefined) {
        // pre_score_check.push(boardSections["Target"][i].para_number)
        user_answer.push(filteredBoardSection["Target"][i].para_number);
        // console.log(content_arr[i], boardSections["Target"][i].para_number);
        if (content_arr[i] == filteredBoardSection["Target"][i].para_number) {
          pre_score_check.push(true);
          // setCount((prevCount) => (prevCount += 1));
          // overall_point += 1;
        } else {
          pre_score_check.push(false);
        }
      }
    }

    overall_point = countNeighboringValues(pre_score_check);

    setCount(overall_point);
    setAnswerLoading(false);
    setAnswer(true);

    let Id = localStorage.getItem("userId");
    let postId = postsByPage.data.data[0].id;
    let category = "rop";

    let token = getCookie("userToken");
    if (!token) this.props.navigate("/login");
    else {
      let config = { headers: { Authorization: "Bearer " + token } };
      try {
        await axios.post(
          `${backendURL}r-score`,
          {
            user_id: Id,
            post_id: postId,
            category: category,
            overall_point: overall_point,
            user_answered:
              user_answer.length !== 0 ? JSON.stringify(user_answer) : null,
          },
          config
        );
      } catch (error) {
        setErrorStore(true);
        alert("Store result error please retake the exam");
      }
    }
    // }
  };

  //reset state for next & prev
  let reset = () => {
    let initialBoardSections = initializeBoard(
      postsByPage.data.data[0].reorders
    );
    setBoardSections(initialBoardSections);
    setCount(0);
    setResetCount(true);
    setStopCount(false);
    setAnswerLoading(false);
    setAnswer(false);
    setErrorUpload(false);
    setErrorStore(false);
    setErrorScore(false);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }) => {
    setActiveTaskId(active?.id);
  };

  const handleDragOver = ({ active, over }) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active?.id
    );
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
                <Box sx={{ width: "20%", margin: "0 auto" }}>
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      my: 2,
                    }}
                  >
                    Correct Answer
                  </h3>
                  <Typography
                    sx={{ backgroundColor: "#384450", color: "#fff", mt: 2 }}
                  >
                    {content}
                  </Typography>
                </Box>
                <br />
              </Box>
            </Box>
            {/* <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={() => reset()}>
                Try Again
              </Button>
            </Box> */}
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
        category={"rop"}
        setPage={setPage}
        reset={reset}
        status={status}
        postsByPage={postsByPage}
        backPath={"/admin/reading"}
        navTitle={"Reorder paragraph"}
        categoryQuestion={
          "  The text boxes in the left panel have been placed in a random order. Restore the original order by dragging the text boxes from the left panel to the right panel."
        }
        upload={upload}
        page={page}
        totalPage={totalPage}
        error={errorUpload || errorStore || errorScore}
        disableReset={status === "succeeded" ? false : true}
        disableSubmit={
          !answer && !errorScore && !errorStore && !errorUpload ? false : true
        }
        disablePrev={
          status === "succeeded" ? (currentPage === 1 ? true : false) : true
        }
        disableNext={
          status === "succeeded"
            ? currentPage === totalPage
              ? true
              : false
            : true
        }
        answerBlock={() => <AnswerBlock />}
        answerLoading={answerLoading}
        retry={answer}
        answerTemplate={content}
        disableAnswer={status === "succeeded" ? false : true}
        // answerTabs={() => (
        //   <AnswerTabs content={content} postsByPage={postsByPage} />
        // )}
      >
        <Box sx={{ my: 2 }}>
          <CountUpTimer
            status={status}
            count={0}
            stopCount={stopCount}
            resetCount={resetCount}
            setResetCount={setResetCount}
            postReady={postsByPage?.data?.data?.length !== 0}
          />
        </Box>

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
                      id={boardSectionKey}
                      checkAnswerState={null}
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
      </PracticeLayout>
      <DataForAnswerContext.Provider value={content}>
        <Box sx={{ width: "100%", p: 2 }}>
          <AnswerParentComponent
            postId={postsByPage.data?.data[0]?.id}
            type="Reading"
            category={"rop"}
          />
        </Box>
      </DataForAnswerContext.Provider>
    </>
  );
};

export default TestRop;
