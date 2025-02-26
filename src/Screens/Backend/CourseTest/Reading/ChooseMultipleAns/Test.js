import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
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
export const DataForRmcAnswerContext = createContext();

const TestMCAns = () => {
  let { postsByPage, loading, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  let postPath = "reading-test/rmc";
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  const [checkedState, setCheckedState] = useState("");
  const char = "A";
  const [modalOpen, setModalOpen] = useState(false);
  const [dictWord, setDictWord] = useState("");
  //answer array

  // const [value] = useState(1);
  const [checkArray, setCheckArray] = useState([]);
  const [stopCount, setStopCount] = useState(false);
  const [resetCount, setResetCount] = useState(false);
  const [minusCount, setMinusCount] = useState(0);
  const [checkBg, setCheckBg] = useState([]);
  const [answer, setAnswer] = useState(false);
  // const [overall_result, setOverallResult] = useState([]);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [errorStore, setErrorStore] = useState(false);
  const [errorScore, setErrorScore] = useState(false);

  let [totalPage, setTotalPage] = useState("");
  let [pagePaginate, setPagePaginate] = useState([]);

  let [count, setCount] = useState(0);
  let [totalCount, setTotalCount] = useState(0);
  let [finalCount, setFinalCount] = useState(0);
  let [currentPage, setCurrentPage] = useState(1);
  let [content, setContent] = useState("");
  let [title, setTitle] = useState("");
  let [question, setQuestion] = useState("");
  let [ans, setAns] = useState("");
  let [page, setPage] = useState(1);

  //for answer tabs
  const [answerTabCleanUp, setAnswerTabCleanUp] = useState(false);
  let [answerCount, setAnswerCount] = useState(0);
  let [answerText, setAnswerText] = useState([]);

  //get page data
  useEffect(() => {
    dispatch(fetchPostsByPageAsync({ path: postPath, page: page }));
  }, [dispatch, postPath, page]);

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
      if (
        postsByPage.data.data[0] !== undefined &&
        postsByPage.data.data[0].mul_choices !== undefined
      ) {
        setCheckArray(postsByPage.data.data[0].mul_choices);
        setContent(postsByPage.data.data[0].content);
        setTitle(postsByPage.data.data[0].title);
        setQuestion(
          postsByPage.data.data[0].question !== null
            ? postsByPage.data.data[0].question
            : ""
        );
        setCheckedState(
          new Array(postsByPage.data.data[0].mul_choices.length).fill(false)
        );
        setAnswerTabCleanUp(true);
      }
    }
  }, [setPagePaginate, postsByPage, totalPage]);

  //prepare answer count for answer tabs
  useEffect(() => {
    if (
      checkArray !== undefined &&
      checkArray?.length !== 0 &&
      answerTabCleanUp
    ) {
      let answerInLetter = "";
      checkArray.forEach((c, i) => {
        if (c.isCorrect === 1) {
          setAnswerCount((prev) => prev + 1);
          answerInLetter =
            answerInLetter.length !== 0
              ? answerInLetter +
                "," +
                String.fromCharCode(char.charCodeAt(0) + i)
              : String.fromCharCode(char.charCodeAt(0) + i);
          setAnswerText(answerInLetter);
        }
      });

      setAnswerTabCleanUp(false);
    }
  }, [checkArray, answerTabCleanUp]);

  //reset state for next & prev
  let reset = () => {
    setCheckedState("");

    setCheckedState(
      new Array(postsByPage.data.data[0].mul_choices.length).fill(false)
    );
    setCount(0);
    setCheckBg("");
    setAnswerCount(0);
    setStopCount(false);
    setAnswerLoading(false);
    setResetCount(true);
    setAnswer(false);
    //reset answer and check bg
    // setCheckedState(0);
    setAns("");
    setCheckBg([]);
    setCount(0);
    setMinusCount(0);
    setFinalCount(0);
    setCheckBg([]);
    setTotalCount(0);
    setErrorUpload(false);
    setErrorStore(false);
    setErrorScore(false);
  };
  //Score related
  //checked state handle update
  const handleCheckedState = (i) => {
    let updateState = checkedState.map((item, index) => {
      return index === i ? !item : item;
    });
    setCheckedState(updateState);
  };

  // get score
  let upload = async () => {
    setAnswerLoading(true);
    setStopCount(true);
    // let Id = localStorage.getItem("userId");
    // let response = await fetchScoreCount(Id, 1);

    // if (response === 1) {
    setAnswer(false);
    setCount(0);
    setMinusCount(0);
    setFinalCount(0);
    setCheckBg([]);
    setTotalCount(0);

    checkArray.forEach((c) => {
      if (c.isCorrect === 1) {
        setTotalCount((prevtotalCount) => prevtotalCount + 1);
      }
    });
    // check total correct for bg change
    let bg = [];
    checkArray.map((c, i) => {
      return bg.push(c.isCorrect);
    });
    setCheckBg(bg);
    setAns(checkedState);
  };
  useEffect(() => {
    if (ans !== "" && ans.length !== undefined && ans.length !== 0) {
      console.log(ans, "user answer");
      //check correct count

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
      setAnswerLoading(false);
      setAnswer(true);
    }
  }, [ans, checkArray]);

  useEffect(() => {
    if (answer === true) {
      setFinalCount(count - minusCount < 0 ? 0 : count - minusCount);
    }
  }, [answer, setFinalCount, finalCount, count, minusCount]);

  useEffect(() => {
    if (answer === true) {
      let Id = localStorage.getItem("userId");
      let postId = postsByPage.data.data[0].id;
      let category = "rmc";
      let token = getCookie("userToken");
      if (!token) this.props.navigate("/login");
      else {
        let config = { headers: { Authorization: "Bearer " + token } };
        //get user answer
        let userAnswer = "";
        ans.forEach((a, i) => {
          if (ans[i] === true) {
            userAnswer =
              userAnswer.length !== 0
                ? userAnswer + "," + String.fromCharCode(char.charCodeAt(0) + i)
                : String.fromCharCode(char.charCodeAt(0) + i);
          }
        });

        try {
          axios.post(
            `${backendURL}s-mul-choice`,
            {
              user_id: Id,
              post_id: postId,
              category: category,
              overall_point: finalCount,
              user_answered: userAnswer,
            },
            config
          );
        } catch (error) {
          setErrorStore(true);
          alert("Store result error please retake the exam");
        }
      }
    }
  }, [answer, totalCount, postsByPage, finalCount, backendURL, ans]);

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
                    maxValue={totalCount}
                    text={`${finalCount}/${totalCount}`}
                  />
                </Box>

                <br />
              </Box>
            </Box>
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
        category={"rmc"}
        setPage={setPage}
        reset={reset}
        status={status}
        postsByPage={postsByPage}
        backPath={"/admin/reading"}
        navTitle={"Reading Multiple Answer Multiple Choice"}
        categoryQuestion={
          " Read the text and answer the question by selecting all the correct responses. You will need to select more than one response."
        }
        upload={upload}
        page={page}
        totalPage={totalPage}
        error={errorStore}
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
                <>
                  <Box
                    sx={{
                      width: "90%",
                      margin: "0 auto",
                      textAlign: "justify",
                      borderRadius: "0.5rem",
                      padding: 1,
                      boxShadow: 1,
                    }}
                  >
                    <Box
                      sx={{
                        color: "#2196f3",
                        my: 2,
                        ml: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography variant="h6">{title}</Typography>
                      <CountUpTimer
                        status={status}
                        count={0}
                        stopCount={stopCount}
                        resetCount={resetCount}
                        setResetCount={setResetCount}
                        postReady={postsByPage?.data?.data?.length !== 0}
                      />
                    </Box>
                    {content.split(" ").map((word, index) => (
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
                          setDictWord(e.target.innerText);
                          setModalOpen(true);
                          Speak(e.target.innerText);
                        }}
                      >
                        {word}{" "}
                      </Typography>
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
              ) : checkArray !== undefined && checkArray.length !== 0 ? (
                <>
                  <Box
                    sx={{
                      width: "90%",
                      margin: "0 auto",

                      borderRadius: "0.5rem",
                      padding: 1,
                      boxShadow: 1,
                    }}
                  >
                    <Typography sx={{ my: 2, fontSize: "1.2rem" }}>
                      {question}
                    </Typography>

                    <FormGroup>
                      {checkedState !== "" &&
                        checkArray.map((c, index) => {
                          return (
                            <FormControlLabel
                              key={index}
                              sx={{
                                backgroundColor:
                                  checkBg[index] === 1 ? "yellow" : "",
                                my: 0.2,
                              }}
                              control={
                                <Checkbox
                                  // checked={value === checkArray[0].name}
                                  className="check test"
                                  value={c.name}
                                  checked={checkedState[index]}
                                  onChange={() => handleCheckedState(index)}
                                />
                              }
                              label={
                                String.fromCharCode(
                                  char.charCodeAt(0) + index
                                ) +
                                "." +
                                c.name
                              }
                            />
                          );
                        })}
                    </FormGroup>
                  </Box>
                </>
              ) : (
                <Box>
                  {/* ""needs to replace */}
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
                    <Typography variant="h5">This is question</Typography>
                    <FormControlLabel
                      sx={{
                        my: 0.2,
                      }}
                      control={
                        <Checkbox
                          // checked={value === checkArray[0].name}
                          className="check test"
                        />
                      }
                      label="testing check"
                    />
                    <FormControlLabel
                      sx={{
                        my: 0.2,
                      }}
                      control={
                        <Checkbox
                          // checked={value === checkArray[0].name}
                          className="check test"
                        />
                      }
                      label="testing check"
                    />
                    <FormControlLabel
                      sx={{
                        my: 0.2,
                      }}
                      control={
                        <Checkbox
                          // checked={value === checkArray[0].name}
                          className="check test"
                        />
                      }
                      label="testing check"
                    />
                  </Box>
                </Box>
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
      <DataForRmcAnswerContext.Provider
        value={{
          count: answerCount,
          answerText: answerText,
        }}
      >
        <Box sx={{ width: "100%", p: 2 }}>
          <AnswerParentComponent
            postId={postsByPage.data?.data[0]?.id}
            type="Reading"
            category={"rmc"}
          />
        </Box>
      </DataForRmcAnswerContext.Provider>
    </>
  );
};

export default TestMCAns;
