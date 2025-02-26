import {
  Box,
  FormControlLabel,
  FormGroup,
  Radio,
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
export const DataForRsmcAnswerContext = createContext();
const TestSCAns = () => {
  let { postsByPage, loading, status } = useSelector((state) => state.posts);
  let char = "A";
  const dispatch = useDispatch();
  let postPath = "reading-test/rsmc";
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  const [value, setValue] = useState(1);
  const [checkArray, setCheckArray] = useState([]);
  const [checkBg, setCheckBg] = useState([]);
  const [answer, setAnswer] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dictWord, setDictWord] = useState("");
  const [answerLoading, setAnswerLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [errorStore, setErrorStore] = useState(false);
  const [errorScore, setErrorScore] = useState(false);

  let [count, setCount] = useState(0);

  let [content, setContent] = useState("");
  let [title, setTitle] = useState("");
  let [question, setQuestion] = useState("");

  //paging
  let [totalPage, setTotalPage] = useState("");
  let [pagePaginate, setPagePaginate] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [page, setPage] = useState(1);
  const [stopCount, setStopCount] = useState(false);
  const [resetCount, setResetCount] = useState(false);
  //send correct answer to answer tabs
  let [correctValue, setCorrectValue] = useState();

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
        setContent(postsByPage.data.data[0].content);
        setTitle(postsByPage.data.data[0].title);
        setQuestion(
          postsByPage.data.data[0].question !== null
            ? postsByPage.data.data[0].question
            : ""
        );
      }
    }
  }, [setPagePaginate, postsByPage, totalPage]);

  useEffect(() => {
    if (checkArray !== undefined && checkArray?.length !== 0) {
      for (let i = 0; i < checkArray.length; i++) {
        if (checkArray[i].isCorrect === 1) {
          setCorrectValue(checkArray[i].name);
        }
      }
    }
  }, [checkArray]);

  //get page data
  useEffect(() => {
    dispatch(fetchPostsByPageAsync({ path: postPath, page: page }));
  }, [dispatch, postPath, page]);

  // let controller = new AbortController();
  //upload & get score
  let upload = async () => {
    setAnswerLoading(true);
    let Id = localStorage.getItem("userId");
    setStopCount(true);
    setCount(0);
    setCheckBg("");
    for (let i = 0; i < checkArray.length; i++) {
      if (checkArray[i].isCorrect === 1) {
        setCheckBg(i);
      }
    }
    let overall_point = 0;
    let valueId = "";
    checkArray.forEach((c, i) => {
      if (c.name === value && c.isCorrect === 1) {
        setCount(1);
        overall_point = 1;
      }
      if (c.name === value) {
        valueId = i;
      }
    });

    setAnswerLoading(false);
    setAnswer(true);

    let postId = postsByPage.data.data[0].id;
    let category = "rsmc";

    let token = getCookie("userToken");
    if (!token) this.props.navigate("/login");
    else {
      let config = { headers: { Authorization: "Bearer " + token } };
      let userAnswer = String.fromCharCode(char.charCodeAt(0) + valueId);
      try {
        await axios.post(
          `${backendURL}s-mul-choice`,
          {
            user_id: Id,
            post_id: postId,
            category: category,
            overall_point: overall_point,
            user_answered: valueId === "" ? null : userAnswer,
          },
          config
        );
      } catch (error) {
        setErrorStore(true);
        alert("Store result error please retake the exam");
      }
    }
  };

  //reset state for next & prev
  let reset = () => {
    setCount(0);
    setValue("");
    setCheckBg("");
    setAnswerLoading(false);
    setAnswer(false);
    setErrorUpload(false);
    setErrorStore(false);
    setErrorScore(false);
    setStopCount(false);
    setResetCount(true);
  };
  let next = () => {
    setPage(page * 1 + 1);
    reset();
  };

  let prev = () => {
    setPage(page - 1);
    reset();
  };
  //paginate with select drop down

  let goToPage = (e) => {
    reset();
    setPage(e.target.value);
  };
  let option = "";

  if (status === "loading") {
    option = (
      <>
        <option>Loading</option>
      </>
    );
  }
  if (status === "failed") {
    option = (
      <>
        <option>Fail to fetch data</option>
      </>
    );
  } else {
    option = pagePaginate.map((item, index) => {
      return (
        <option
          key={index}
          value={item}
          style={{ textAlign: "center", marginLeft: "0.5rem" }}
        >
          {item}/{totalPage}
        </option>
      );
    });
  }
  const handleChange = (event) => {
    setValue(event.target.value);
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
                    value={count}
                    maxValue={1}
                    text={`${count}/1`}
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
        category={"rsmc"}
        setPage={setPage}
        reset={reset}
        status={status}
        postsByPage={postsByPage}
        backPath={"/admin/reading"}
        navTitle={"Reading Single Answer Multiple Choice"}
        categoryQuestion={
          "Read the text and answer the multiple-choice question by selecting the correct response. Only one response is correct."
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
        answerTemplate={correctValue}
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
                          Speak(e.target.innerText);
                          setDictWord(e.target.innerText);
                          setModalOpen(true);
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
                      {checkArray.map((c, index) => {
                        return (
                          <FormControlLabel
                            key={index}
                            sx={{
                              backgroundColor:
                                checkBg === index ? "yellow" : "",
                              my: 0.2,
                            }}
                            control={
                              <Radio
                                checked={value === c.name}
                                value={c.name}
                                onChange={handleChange}
                              />
                            }
                            label={
                              String.fromCharCode(char.charCodeAt(0) + index) +
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
        </>
        <DictionaryModal
          word={dictWord}
          open={modalOpen}
          setOpen={setModalOpen}
        />
      </PracticeLayout>
      <DataForRsmcAnswerContext.Provider value={correctValue}>
        <Box sx={{ width: "100%", p: 2 }}>
          <AnswerParentComponent
            postId={postsByPage.data?.data[0]?.id}
            type="Reading"
            category={"rsmc"}
            correctValue={correctValue}
          />
        </Box>
      </DataForRsmcAnswerContext.Provider>
    </>
  );
};

export default TestSCAns;
