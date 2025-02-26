import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";

import { fetchPostsByPageAsync } from "../../../../../redux/thunk/Posts";
// import { Draggable } from "../../ScoreCountApi";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import AnswerParentComponent from "../../../../../components/Backend/UserAnswerComponents/AnswerParent";

import PracticeLayout from "../../../../../components/Backend/PracticeLayout/PracticeLayout";
import { getCookie } from "../../../../../Utils/GetCookies";
import { Speak } from "../../../../../Utils/TTS";
import CountUpTimer from "../../../../../components/Backend/PracticeComponents/WFDTimer";
import DictionaryModal from "../../../../../components/DictionaryModal";

export const DataForRfibAnswerContext = createContext();

const TestFIB = () => {
  let { postsByPage, loading, status } = useSelector((state) => state.posts);
  const [stopCount, setStopCount] = useState(false);
  const [resetCount, setResetCount] = useState(false);
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  const dispatch = useDispatch();
  let postPath = "reading-test/rfib";
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  const [modalOpen, setModalOpen] = useState(false);
  const [dictWord, setDictWord] = useState("");
  const [checkArray, setCheckArray] = useState([]);
  const [dropArray, setDropArray] = useState([]);
  const [dragArray, setDragArray] = useState([]);
  const [stateControl, setStateControl] = useState(false);

  const [answer, setAnswer] = useState(false);

  const [answerLoading, setAnswerLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [errorStore, setErrorStore] = useState(false);
  const [errorScore, setErrorScore] = useState(false);

  let [count, setCount] = useState(0);
  let [totalCount, setTotalCount] = useState("");

  let [content, setContent] = useState("");
  let [title, setTitle] = useState("");

  //paging
  let [totalPage, setTotalPage] = useState("");
  let [pagePaginate, setPagePaginate] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [page, setPage] = useState(1);
  //for answer tabs
  let [answerCount, setAnswerCount] = useState(0);
  let [answerText, setAnswerText] = useState([]);
  let [answerTabCleanUp, setAnswerTabCleanUp] = useState(false);

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
      setPagePaginate(Paginate);
      setCurrentPage(postsByPage.data.current_page);
      if (postsByPage.data.data[0] === undefined) {
      } else {
        setCheckArray(postsByPage.data.data[0].mul_choices);
        if (
          postsByPage.data.data[0].answers !== undefined &&
          postsByPage.data.data[0].answers.length !== 0
        ) {
          setDragArray([]);
          setCheckArray([]);
          postsByPage.data.data[0].answers.forEach((ans) => {
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

          setDropArray(
            new Array(postsByPage.data.data[0].answers.length - 1).fill(0)
          );
          setAnswerTabCleanUp(true);
        }

        setContent(postsByPage.data.data[0].content.split("#"));
        setTitle(postsByPage.data.data[0].title);
      }
    }
  }, [setPagePaginate, postsByPage, totalPage]);
  //get page data
  useEffect(() => {
    dispatch(fetchPostsByPageAsync({ path: postPath, page: page }));
  }, [dispatch, postPath, page]);

  //prepare answer for answer tabs
  useEffect(() => {
    if (answerTabCleanUp) {
      setAnswerText("");
      setAnswerCount(0);
      postsByPage?.data?.data[0]?.answers.forEach((ans) => {
        if (ans.is_correct === "1") {
          setAnswerText((prev) =>
            prev !== "" ? prev + " , " + ans.name : ans.name
          );
          setAnswerCount((prev) => prev + 1);
        }
      });
      setAnswerTabCleanUp(false);
    }
  }, [postsByPage, answerTabCleanUp]);

  // let controller = new AbortController();
  //upload & get score
  let upload = async () => {
    setAnswerLoading(true);
    setStopCount(true);
    setCount(0);
    setTotalCount(0);
    //check correct count
    checkArray.forEach((c, index) => {
      if (c !== "" && c === dropArray[index]) {
        setCount((prev) => prev + 1);
      }
      if (c !== "") {
        setTotalCount((prev) => prev + 1);
      }
    });

    setAnswerLoading(false);
    setAnswer(true);
  };
  //final answer
  useEffect(() => {
    if (answer) {
      let Id = localStorage.getItem("userId");
      let postId = postsByPage.data.data[0].id;
      let category = "rfib";
      let overall_point = count;

      let userAnswer = dropArray;

      userAnswer = userAnswer.slice(0, totalCount);
      let noAnswer = true;
      userAnswer.forEach((u) => {
        if (u !== 0) {
          noAnswer = false;
        }
      });

      let token = getCookie("userToken");
      if (!token) this.props.navigate("/login");
      else {
        let config = { headers: { Authorization: "Bearer " + token } };
        try {
          axios.post(
            `${backendURL}r-score`,
            {
              user_id: Id,
              post_id: postId,
              category: category,
              overall_point: overall_point,
              user_answered: noAnswer ? null : JSON.stringify(userAnswer),
            },
            config
          );
        } catch (error) {
          setErrorStore(true);
          alert("Store result error please retake the exam");
        }
      }
    }
  }, [answer, count, postsByPage, backendURL]);

  //reset state for next & prev
  let reset = () => {
    setCount(0);
    setResetCount(true);
    setStopCount(false);
    setDragArray([]);

    postsByPage.data.data[0].answers.forEach((ans) => {
      setDragArray((prev) =>
        [...prev, ans.name]
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      );
    });

    setDropArray(
      new Array(postsByPage.data.data[0].answers.length - 1).fill(0)
    );

    setAnswerLoading(false);
    setAnswer(false);
    setErrorUpload(false);
    setErrorStore(false);
    setErrorScore(false);
    setAnswerText("");
    setAnswerCount(0);
  };

  useEffect(() => {
    if (stateControl) {
      setDropArray(dropArray);

      setStateControl(false);
    }
  }, [stateControl, dropArray, checkArray]);
  function handleDragEnd({ active, over }) {
    let sid = over === null ? null : over.id;
    let eid = active.id;

    let exist = sid !== null ? sid.toString().indexOf("drag") : "";
    let existArr = eid !== null ? dropArray.includes(eid) : "";

    if (sid !== null && exist === -1 && !existArr) {
      // let x = ["orange", "a", "b", "c"];
      // x.splice(1, 1, "hello");

      // indexArr.splice(sid, 1, index);
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
                    maxValue={totalCount}
                    text={`${count}/${totalCount}`}
                  />
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
        category={"rfib"}
        setPage={setPage}
        reset={reset}
        status={status}
        postsByPage={postsByPage}
        backPath={"/admin/reading"}
        navTitle={"Reading Fill in the Blank"}
        categoryQuestion={
          "  Read the text and answer the multiple-choice question by selecting the correct response. Only one response is correct."
        }
        upload={upload}
        page={page}
        totalPage={totalPage}
        error={errorUpload || errorStore || errorScore}
        disableReset={status === "succeeded" ? false : true}
        disableSubmit={
          !answerLoading &&
          !answer &&
          !errorScore &&
          !errorStore &&
          !errorUpload
            ? false
            : true
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
        answerTemplate={answerText}
        disableAnswer={status === "succeeded" ? false : true}
        // answerTabs={() => (
        //   <AnswerTabs content={content} postsByPage={postsByPage} />
        // )}
      >
        <>
          <Box
            className="container-fluid"
            sx={{
              p: "0.5rem",
              bgcolor: "#fff",
              borderRadius: "1rem",
              boxShadow: 2,
            }}
          >
            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
              <div className="card">
                <Box sx={{ margin: "0 auto", width: "100%", bgColor: "blue" }}>
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
                    ) : content !== undefined && content !== "" ? (
                      // &&
                      //   dropArray.length !== 0
                      //   content !== undefined && content !== "" //need to replace the actual logic
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
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                              color: "#2196f3",
                            }}
                          >
                            <Typography variant="h6">
                              {postsByPage?.data?.data[0]?.title}
                            </Typography>
                            <CountUpTimer
                              status={status}
                              count={0}
                              stopCount={stopCount}
                              resetCount={resetCount}
                              setResetCount={setResetCount}
                              postReady={postsByPage?.data?.data?.length !== 0}
                            />
                          </Box>
                          {content.map((c, index) => (
                            <span key={index}>
                              {c.split(" ").map((word, index) => (
                                <Typography
                                  variant="body5"
                                  key={index}
                                  sx={{
                                    fontSize: "1.2rem",
                                    whiteSpace: "pre-wrap",
                                    "&:hover": {
                                      background: "#edff34",
                                    },
                                    cursor: "pointer",
                                  }}
                                  onClick={(e) => {
                                    Speak(e.target.innerText);
                                    setDictWord(e.target.innerText);
                                    setModalOpen(true);
                                  }}
                                >
                                  {word}{" "}
                                </Typography>
                              ))}

                              {index !== content.length - 1 && (
                                <span>
                                  <Droppable
                                    id={index}
                                    index={index}
                                    key={index}
                                    className={
                                      answer
                                        ? checkArray[index] !== "" &&
                                          dropArray[index] === checkArray[index]
                                          ? "drop correct"
                                          : "drop false"
                                        : "drop"
                                    }
                                  >
                                    {dropArray[index] !== 0 ? (
                                      <Draggable
                                        id={dropArray[index]}
                                        className="inDrop"
                                      >
                                        {dropArray[index]}
                                      </Draggable>
                                    ) : (
                                      "Drop here"
                                    )}
                                  </Droppable>
                                </span>
                              )}
                              {answer && checkArray[index] !== "" && (
                                <Typography
                                  variant="span"
                                  sx={{
                                    color: "yellowgreen",
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  ({checkArray[index]})
                                </Typography>
                              )}
                            </span>
                          ))}
                        </Box>
                      </>
                    ) : (
                      ""
                    )
                  ) : (
                    <Typography sx={{ textAlign: "center", color: "red" }}>
                      Fail to fetch data
                    </Typography>
                  )}
                </Box>

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
                    ) : dropArray !== undefined ? (
                      <>
                        <Box
                          sx={{
                            width: "90%",
                            margin: "0 auto",

                            borderRadius: "0.5rem",
                            padding: 1,
                            boxShadow: 5,
                          }}
                        >
                          {dragArray?.map((d, index) =>
                            !dropArray.includes(d) ? (
                              <Draggable id={d} index={index} key={index}>
                                {d}
                              </Draggable>
                            ) : (
                              ""
                            )
                          )}
                        </Box>
                      </>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "90%",
                          margin: "0 auto",

                          borderRadius: "0.5rem",
                          padding: 1,
                          boxShadow: 1,
                        }}
                      >
                        {/* "" needs to replace */}
                        <Typography variant="h5">""</Typography>
                      </Box>
                    )
                  ) : (
                    <Typography sx={{ textAlign: "center", color: "red" }}>
                      Fail to fetch data
                    </Typography>
                  )}
                </Box>
              </div>
            </DndContext>
          </Box>
        </>
        <DictionaryModal
          word={dictWord}
          open={modalOpen}
          setOpen={setModalOpen}
        />
      </PracticeLayout>
      <DataForRfibAnswerContext.Provider
        value={{
          count: answerCount,
          answerText: answerText,
        }}
      >
        <Box sx={{ width: "100%", p: 2 }}>
          <AnswerParentComponent
            postId={postsByPage.data?.data[0]?.id}
            type="Reading"
            category={"rfib"}
          />
        </Box>
      </DataForRfibAnswerContext.Provider>
    </>
  );
};

export default TestFIB;
