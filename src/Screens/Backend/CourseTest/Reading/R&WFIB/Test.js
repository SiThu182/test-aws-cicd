import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";

import { fetchPostsByPageAsync } from "../../../../../redux/thunk/Posts";
import AnswerParentComponent from "../../../../../components/Backend/UserAnswerComponents/AnswerParent";

import PracticeLayout from "../../../../../components/Backend/PracticeLayout/PracticeLayout";
import { getCookie } from "../../../../../Utils/GetCookies";
import { Speak } from "../../../../../Utils/TTS";
import CountUpTimer from "../../../../../components/Backend/PracticeComponents/WFDTimer";
import DictionaryModal from "../../../../../components/DictionaryModal";
// import { fetchScoreCount } from "../../ScoreCountApi";

export const DataForRwfibAnswerContext = createContext();

const TestRWFIB = () => {
  let { postsByPage, loading, status } = useSelector((state) => state.posts);
  const [stopCount, setStopCount] = useState(false);
  const [resetCount, setResetCount] = useState(false);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [dictWord, setDictWord] = useState("");
  let postPath = "reading-test/rwfib";
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  const [checkArray, setCheckArray] = useState([]);
  const [checkBg, setCheckBg] = useState([]);
  const [checkStyle, setCheckStyle] = useState([]);
  const [answer, setAnswer] = useState(false);

  const [answerArr, setAnswerArr] = useState([]);
  const [isCorrect, setIsCorrect] = useState([]);

  const [answerLoading, setAnswerLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [errorStore, setErrorStore] = useState(false);
  const [errorScore, setErrorScore] = useState(false);

  let [count, setCount] = useState(0);
  let [finalCount, setFinalCount] = useState(0);

  let [content, setContent] = useState("");
  // let [title, setTitle] = useState("");

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
        setCheckArray([]);
        setIsCorrect([]);
        if (
          postsByPage.data.data[0].answers !== undefined &&
          postsByPage.data.data[0].answers.length !== 0 &&
          postsByPage.data.data[0].answers[0].name.includes("[")
        ) {
          setCheckArray((prevArr) => [
            ...prevArr,
            postsByPage.data.data[0].answers.map((ans) => JSON.parse(ans.name)),
          ]);

          setIsCorrect((prevArr) => [
            ...prevArr,
            postsByPage.data.data[0].answers.map((ans) => ans.is_correct),
          ]);
        }
        setContent(postsByPage.data.data[0].content.split("#"));
        // setTitle(postsByPage.data.data[0].title);
        setAnswerTabCleanUp(true);
      }
    }
  }, [setPagePaginate, postsByPage, totalPage]);

  //prepare answer for answer tabs;
  useEffect(() => {
    if (checkArray.length !== 0 && answerTabCleanUp) {
      setAnswerText("");
      checkArray[0].forEach((b, index) => {
        for (let i = 0; i < b.length; i++) {
          if (i + 1 === parseInt(isCorrect[0][index])) {
            setAnswerText((prev) =>
              prev !== ""
                ? prev + " , " + checkArray[0][index][i]
                : checkArray[0][index][i]
            );
          }
        }
      });
      setAnswerCount(checkArray[0].length);

      setAnswerTabCleanUp(true);
    }
  }, [checkArray, answerTabCleanUp, isCorrect]);

  //get page data
  useEffect(() => {
    dispatch(fetchPostsByPageAsync({ path: postPath, page: page }));
  }, [dispatch, postPath, page]);

  // let controller = new AbortController();

  const checkHandler = () => {
    setAnswer(false);
    setAnswerLoading(true);

    let x = document.querySelectorAll("[name='selectAns']");
    x.forEach((s) => setAnswerArr((prevAnsArr) => [...prevAnsArr, s.value]));

    checkArray[0].forEach((b, index) => {
      for (let i = 0; i < b.length; i++) {
        if (i + 1 === parseInt(isCorrect[0][index])) {
          setCheckBg((prevBg) => [...prevBg, b[i]]);
        }
      }
    });
  };

  useEffect(() => {
    if (answerLoading) {
      setCount(0);
      setCheckStyle([]);

      answerArr.forEach((a, index) => {
        if (a === isCorrect[0][index]) {
          setCount((prevCount) => prevCount + 1);
          setCheckStyle((prevArr) => [...prevArr, true]);
        } else {
          setCheckStyle((prevArr) => [...prevArr, false]);
        }
      });

      setAnswerLoading(false);
      setAnswer(true);
    }
  }, [answerArr, answerLoading, isCorrect]);

  useEffect(() => {
    setFinalCount("");
    if (answer) {
      setFinalCount(count);
      if (finalCount !== "") {
        let overall_point = finalCount;
        let Id = localStorage.getItem("userId");
        let postId = postsByPage.data.data[0].id;
        let category = "rwfib";

        let token = getCookie("userToken");
        if (!token) this.props.navigate("/login");
        else {
          let config = { headers: { Authorization: "Bearer " + token } };
          try {
            let userAnswer = [];
            checkArray[0].forEach((b, index) => {
              for (let i = 0; i < b.length; i++) {
                if (i + 1 === parseInt(answerArr[index])) {
                  userAnswer.push(checkArray[0][index][i]);
                }
              }
            });

            axios.post(
              `${backendURL}r-score`,
              {
                user_id: Id,
                post_id: postId,
                category: category,
                user_answered:
                  userAnswer.length === 0 ? null : JSON.stringify(userAnswer),
                overall_point: overall_point,
              },
              config
            );
          } catch (error) {
            setErrorStore(true);
            alert("Store result error please retake the exam");
          }
        }
      }
    }
  }, [answer, finalCount, postsByPage, backendURL, count]);
  //upload & get score
  let upload = async () => {
    // let Id = localStorage.getItem("userId");
    // let response = await fetchScoreCount(Id, 1);
    setStopCount(true);
    // if (response === 1) {
    checkHandler();
    // }
  };

  //reset state for next & prev
  let reset = () => {
    setCount(0);
    setResetCount(true);
    setStopCount(false);
    setCheckBg("");
    setAnswerArr([]);
    setCheckStyle([]);
    // setTitle("");
    setCount("");
    setAnswerLoading(false);
    setAnswer(false);
    setErrorUpload(false);
    setErrorStore(false);
    setErrorScore(false);
    let x = document.querySelectorAll("[name='selectAns']");
    x.forEach((s) => (s.value = " "));
  };

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
                    value={finalCount}
                    maxValue={isCorrect[0].length}
                    text={`${finalCount}/${isCorrect[0].length}`}
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
        category={"rwfib"}
        setPage={setPage}
        reset={reset}
        status={status}
        postsByPage={postsByPage}
        backPath={"/admin/reading"}
        navTitle={"R&W in the Blank"}
        categoryQuestion={
          " Below is a text with blanks. Click on each blank, a list of choices will appear. Select the appropriate answer choice for each blank."
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
                //   content !== undefined && content !== "" //need to replace the actual logic
                <>
                  <Box
                    sx={{
                      width: "90%",
                      margin: "0 auto",
                      textAlign: "justify",
                      borderRadius: "0.5rem",
                      lineHeight: "2.5rem",
                      padding: 1,
                      boxShadow: 1,
                    }}
                  >
                    <Box
                      sx={{
                        color: "#2196f3",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography variant="h6">
                        {postsByPage.data.data[0].title}
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
                            variant="span"
                            key={index}
                            sx={{
                              fontSize: "1.2rem",

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
                            // defaultValue=" "
                            className={
                              answer
                                ? checkStyle[index] === true //style.css
                                  ? "correct"
                                  : "false"
                                : ""
                            }
                          >
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
                        {answer && index !== content.length - 1 ? (
                          <span style={{ color: "green" }}>
                            ({checkBg[index]})
                          </span>
                        ) : (
                          ""
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
        </>
        <DictionaryModal
          word={dictWord}
          open={modalOpen}
          setOpen={setModalOpen}
        />
      </PracticeLayout>
      <DataForRwfibAnswerContext.Provider
        value={{
          count: answerCount,
          answerText: answerText,
        }}
      >
        <Box sx={{ width: "100%", p: 2 }}>
          <AnswerParentComponent
            postId={postsByPage.data?.data[0]?.id}
            type="Reading"
            category={"rwfib"}
          />
        </Box>
      </DataForRwfibAnswerContext.Provider>
    </>
  );
};

export default TestRWFIB;
