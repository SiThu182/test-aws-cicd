import { Box, Button, TextareaAutosize, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Typo from "typo-js";

import { fetchPostsByPageAsync } from "../../../../../redux/thunk/Posts";
// import { grammar_check } from "../../ScoreCountApi";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useTheme } from "@mui/material/styles";
import AnswerParentComponent from "../../../../../components/Backend/UserAnswerComponents/AnswerParent";
import CalculateScore from "../../CalculationForWritingSections.js/CalculateScore";

import PracticeLayout from "../../../../../components/Backend/PracticeLayout/PracticeLayout";
import { getCookie } from "../../../../../Utils/GetCookies";

import ErrorTooltipContent from "../../../../../components/Backend/PracticeComponents/ErrorTooltipContent";
import LightTooltip from "../../../../../components/Backend/PracticeComponents/LightTooltip";
import Timer from "../../../../../components/Backend/PracticeComponents/Timer";
import { Speak } from "../../../../../Utils/TTS";
import DictionaryModal from "../../../../../components/DictionaryModal";
export const DataForWemailAnswerContext = createContext();

const TestWemail = () => {
  let { postsByPage, loading, status } = useSelector((state) => state.posts);
  // let { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let postPath = "reading-test/wemail";
  // const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  const [modalOpen, setModalOpen] = useState(false);
  const [dictWord, setDictWord] = useState("");
  //check auto play
  let frontendURL = process.env.REACT_APP_FRONTEND_URL;
  // const [timerCounterCount, setTimerCounterCount] = useState(540);
  const [textBoxDisabled, setTextBoxDisabled] = useState(false);
  const [value, setValue] = useState(1);
  // const [checkArray, setCheckArray] = useState([]);
  const [checkBg, setCheckBg] = useState([]);
  const [answer, setAnswer] = useState(false);
  // const [overall_result, setOverallResult] = useState([]);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [errorStore, setErrorStore] = useState(false);
  const [errorScore, setErrorScore] = useState(false);
  const [errorScoreCalculation, setErrorScoreCalculation] = useState(false);
  let [count, setCount] = useState(0);
  // let [contentArr, setContentArr] = useState();
  let [char, setChar] = useState();
  let [wordCount, setWordCount] = useState(0);
  const [wordForm, setWordForm] = useState(0);
  const [vocabulary, setVocabulary] = useState(0);
  // const [contentResult, setContentResult] = useState(0);

  //spelling check
  const [dictionary, setDictionary] = useState(null);
  // const [spellCount, setSpellCount] = useState();
  const [checkStatus, setCheckStatus] = useState(false);
  const [contentAns, setContentAns] = useState(0);
  const [grammarMark, setGrammarMark] = useState(0);
  const [conventionMark, setConventionMark] = useState(0);
  const [organizationMark, setOrganizationMark] = useState(0);
  const [overallPoint, setOverallPoint] = useState(0);
  const [spelling, setSpelling] = useState(0);
  const [mistakeDetails, setMistakeDetails] = useState();
  const [testResultForComment, setTestResultForComment] = useState([]);
  const [testErrorOffset, setTestErrorOffset] = useState([]);
  const [replacements, setReplacements] = useState([]);
  const [stopCount, setStopCount] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [resetCount, setResetCount] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const loadDictionary = async () => {
      const affData = await fetch(
        `${process.env.REACT_APP_FRONTEND_URL}/en_US.aff`
      ).then((res) => res.text());
      const wordsData = await fetch(
        `${process.env.REACT_APP_FRONTEND_URL}/en_US.dic`
      ).then((res) => res.text());
      const dictionary = new Typo("en_US", affData, wordsData);
      setDictionary(dictionary);
    };
    loadDictionary();
  }, []);

  let [content, setContent] = useState("");

  //paging
  let [totalPage, setTotalPage] = useState("");
  let [pagePaginate, setPagePaginate] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [page, setPage] = useState(1);

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
      if (postsByPage.data.data[0] === undefined) {
      } else {
        setContent(postsByPage.data.data[0].content);
      }
      setCurrentPage(postsByPage.data.current_page);
    }
  }, [setPagePaginate, postsByPage, totalPage]);

  //get page data
  useEffect(() => {
    dispatch(fetchPostsByPageAsync({ path: postPath, page: page }));
  }, [dispatch, postPath, page]);

  let save_score = async () => {
    //setTimerCounterCount(0);
    setStopCount(true);
    setTextBoxDisabled(true);
    if (char !== undefined && char !== "") {
      setAnswerLoading(true);

      // let id = userId;
      let content_arr = postsByPage.data.data[0].transcript.split(/[ .,]+/);
      let keyword_length = postsByPage.data.data[0].keyword_length;
      let result = await CalculateScore(
        postsByPage.data.data[0].transcript,
        char,
        keyword_length > 0 ? keyword_length : content_arr.length,
        dictionary,
        "wemail",
        content,
        postsByPage.data.data[0].email_type
      );
      if (result?.error === undefined || result?.error === null) {
        setContentAns(result.cal_content);
        setErrorCount(result.mistakeDetails?.length);
        setConventionMark(result.emailConventionPoints);
        setOrganizationMark(result.organizationalPoints);
        setSpelling(result.spellng_language_tool);
        setWordForm(result.form);
        setVocabulary(result.form);
        setStopCount(true);
        setGrammarMark(result.cal_grammar_mark);
        setMistakeDetails(result?.mistakeDetails);
        setTestResultForComment(result?.textArrayForErrorDetails);
        setTestErrorOffset(result?.textErrorOffset);
        setReplacements(result?.replacements);
        setOverallPoint(result.score);

        // setCount(0);
        // setCheckBg("");
        // for (let i = 0; i < checkArray.length; i++) {
        //   if (checkArray[i].isCorrect === 1) {
        //     setCheckBg(i);
        //   }
        // }

        // let overall_point = 0;
        let score = result.score;
        setAnswerLoading(false);
        setAnswer(true);

        //point array for content, form,grammar,vocabulary,spelling ,development structure & linguistic
        let points = {
          content: result.cal_content,
          form: result.form,
          grammar: result.cal_grammar_mark,
          vocabulary: result.form,
          spelling: result.spellng_language_tool,
          convention: result.emailConventionPoints,
          organization: result.organizationalPoints,
          new_answer: true,
        };

        let Id = localStorage.getItem("userId");
        let postId = postsByPage.data.data[0].id;
        let category = "wemail";

        let token = getCookie("userToken");
        if (!token) this.props.navigate("/login");
        else {
          let config = { headers: { Authorization: "Bearer " + token } };
          try {
            axios.post(
              `${process.env.REACT_APP_BACKEND_ADMIN}s-mul-choice`,
              {
                user_id: Id,
                post_id: postId,
                category: category,
                user_answered: char,
                overall_point: score,
                points: JSON.stringify(points),
              },
              config
            );
          } catch (error) {
            setErrorStore(true);
            setAnswerLoading(false);
            alert("Store result error please retake the exam");
          }
        }
      } else {
        setErrorScoreCalculation(true);
        setAnswerLoading(false);
      }
    } else {
      setAnswerLoading(false);
      setCheckStatus(true);
    }
  };

  useEffect(() => {
    if (errorScoreCalculation) {
      swal({
        title: "Warning",
        text: "Score calculation error.Please retake the exam",
        icon: "warning",
        buttons: true,
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnClickOutside: false,
      }).then((yes) => {
        if (yes) {
          reset();
        }
        setErrorScoreCalculation(false);
      });
    }
  });

  const checkWord = (event) => {
    let char = event.target.value;
    // const char_arr = char.split(" ");
    const char_arr = char
      .trim()
      .replace(/\(([^)]*)\)/g, "$1") // Remove only the parentheses while retaining the text inside
      .replace(/[.,?'()]/g, " ") // Remove punctuation characters and any remaining parentheses
      // .replace(/[.,?']/g, "")
      .split(/\s+/)
      .filter((word) => word !== "");
    setChar(char);
    setWordCount(char_arr.length);
  };

  //reset state for next & prev
  let reset = () => {
    let text = document.querySelector("#text-area");
    text.value = "";
    setValue("");
    setResetCount(true);
    setWordCount(0);
    setCount(0);
    setCheckBg("");
    setAnswerLoading(false);
    setAnswer(false);
    setErrorUpload(false);
    setErrorStore(false);
    setChar("");
    setErrorScore(false);
    setErrorScoreCalculation(false);
    setCheckStatus(false);
    setStopCount(false);
    // setTimerCounterCount(1200);
    setTextBoxDisabled(false);
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
                  borderRadius: "1rem 1rem  0rem 0rem",
                }}
              >
                <Box sx={{ width: "15%", margin: "0 auto" }}>
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      marginBottom: 5,
                    }}
                  >
                    Content
                  </h3>
                  <CircularProgressbar
                    value={contentAns}
                    maxValue="3"
                    text={`${contentAns}/3`}
                  />
                </Box>

                <Box sx={{ width: "15%", margin: "0 auto" }}>
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      marginBottom: 5,
                    }}
                  >
                    Form
                  </h3>
                  <CircularProgressbar
                    value={wordForm}
                    maxValue={2}
                    text={`${wordForm}/2`}
                  />
                </Box>
                <Box sx={{ width: "15%", margin: "0 auto" }}>
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      marginBottom: 5,
                    }}
                  >
                    Grammar
                  </h3>
                  <CircularProgressbar
                    value={grammarMark}
                    maxValue={2}
                    text={`${grammarMark}/2`}
                  />
                </Box>

                <Box sx={{ width: "15%", margin: "0 auto" }}>
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      marginBottom: 5,
                    }}
                  >
                    Vocabulary
                  </h3>
                  <CircularProgressbar
                    value={vocabulary}
                    maxValue={2}
                    text={`${vocabulary}/2`}
                  />
                </Box>
                {/* vocabulary(same as form ) is now used as spelling */}
                <Box sx={{ width: "15%", margin: "0 auto" }}>
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      marginBottom: 5,
                    }}
                  >
                    Spelling
                  </h3>
                  <CircularProgressbar
                    value={spelling}
                    maxValue={2}
                    text={`${spelling}/2`}
                  />
                </Box>

                <br />
              </Box>
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
                  alignItems: "center",
                  pl: {
                    md: 4,
                    sm: 0,
                    xs: 0,
                  },
                  py: 3,
                  backgroundColor: "#fff",
                  borderRadius: "1rem 1rem  0rem 0rem",
                }}
              >
                {/* General Linguistics is same as form */}
                <Box
                  sx={{ width: "15%", margin: "0 auto", textAlign: "center" }}
                >
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      marginBottom: 5,
                    }}
                  >
                    Email Convention
                  </h3>
                  <CircularProgressbar
                    value={conventionMark}
                    maxValue={2}
                    text={`${conventionMark}/2`}
                  />
                </Box>
                {/* DSC is same as form */}
                <Box
                  sx={{ width: "15%", margin: "0 auto", textAlign: "center" }}
                >
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      marginBottom: 5,
                    }}
                  >
                    organization
                  </h3>
                  <CircularProgressbar
                    value={organizationMark}
                    maxValue={2}
                    text={`${organizationMark}/2`}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "#fff",
                  padding: "  10px",
                  borderRadius: "0rem 0rem 1rem 1rem  ",
                }}
              >
                <Card>
                  <CardHeader
                    // titleTypographyProps={{variant:'h1' }}
                    title=" Writing Comments"
                    sx={{
                      bgcolor: "grey",
                      textAlign: "left",
                      fontSize: 10,
                    }}
                  />

                  <CardContent>
                    <Box
                      sx={{
                        width: "100%",
                        margin: "0 auto",
                        display: "block",
                        textAlign: "left",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      <Typography
                        components="p"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {testResultForComment.map((word, index) =>
                          testErrorOffset?.includes(index) ? (
                            <LightTooltip
                              title={
                                <ErrorTooltipContent
                                  error={
                                    mistakeDetails[
                                      testErrorOffset.indexOf(index)
                                    ]
                                  }
                                  replacements={
                                    replacements[testErrorOffset.indexOf(index)]
                                  }
                                ></ErrorTooltipContent>
                              }
                            >
                              <Typography
                                key={index}
                                variant="body1"
                                sx={{
                                  color: testErrorOffset?.includes(index)
                                    ? "red"
                                    : word.color,
                                  display: "inline",
                                  padding: "1px",
                                  cursor: "pointer",
                                  borderRadius: 2,
                                }}
                              >
                                {word}
                              </Typography>
                            </LightTooltip>
                          ) : (
                            <Typography
                              key={index}
                              variant="body1"
                              sx={{
                                bgcolor: word.color,
                                display: "inline",
                                padding: "1px",
                                borderRadius: 5,
                              }}
                            >
                              {word}
                            </Typography>
                          )
                        )}
                        {testResultForComment?.length === 0 && <>{char}</>}
                      </Typography>
                    </Box>
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
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ width: "50%", margin: "0 auto" }}>
                          <Typography>Error Count : {errorCount}</Typography>
                          <Typography>Word Count : {wordCount}</Typography>
                          <Typography>
                            Error Density :{" "}
                            {((errorCount / wordCount) * 100).toFixed(2)} %
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            margin: "0 auto",
                            [theme.breakpoints.up("sm")]: {
                              width: "30%",
                              my: 2,
                            },
                            [theme.breakpoints.up("md")]: {
                              width: "30.33%",
                            },
                            [theme.breakpoints.up("lg")]: {
                              width: "15%",
                            },
                          }}
                        >
                          <h3
                            style={{
                              whiteSpace: "nowrap",
                              textAlign: "center",
                              marginBottom: 5,
                            }}
                          >
                            Overall Point
                          </h3>
                          <CircularProgressbar
                            value={overallPoint}
                            maxValue={15}
                            text={`${overallPoint}/15`}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </>
        ) : (
          ""
        )}
        {answer === true || checkStatus === true ? (
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={() => reset()}>
              Try Again
            </Button>
          </Box>
        ) : (
          ""
        )}
      </>
    );
  };
  return (
    <>
      <PracticeLayout
        category={"we"}
        setPage={setPage}
        reset={reset}
        status={status}
        postsByPage={postsByPage}
        backPath={"/admin/writing"}
        navTitle={"Write Email"}
        categoryQuestion={
          "Read a description of a situation. Then write an e-mail about the situation. You will have 9 minutes. You should aim to write at least 100 words.Write Using complete sentence."
        }
        upload={save_score}
        page={page}
        totalPage={totalPage}
        error={errorUpload || errorStore || errorScore}
        disableReset={status === "succeeded" ? false : true}
        disableSubmit={
          checkStatus
            ? true
            : !answerLoading &&
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
        answerTemplate={postsByPage?.data?.data[0]?.answer_template}
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
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "#2196f3" }}>
                        {postsByPage.data.data[0].title}
                      </Typography>
                      {/* <Box>
                        <Typography>
                          Duration{" "}
                          {Math.floor(timerCounterCount / 60) < 10
                            ? "0" + Math.floor(timerCounterCount / 60)
                            : Math.floor(timerCounterCount / 60)}{" "}
                          :
                          {timerCounterCount % 60 < 10
                            ? "0" + Math.floor(timerCounterCount % 60)
                            : Math.floor(timerCounterCount % 60)}
                        </Typography>
                      </Box> */}
                      <Timer
                        status={status}
                        count={540}
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
              ) : (
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
                    {/* <Typography sx={{ my: 2, fontSize: "1.2rem" }}>
                          {content}
                        </Typography> */}
                    <TextareaAutosize
                      aria-label="minimum height"
                      id="text-area"
                      minRows={10}
                      spellCheck={false}
                      disabled={textBoxDisabled}
                      placeholder="Write a Summary..."
                      style={{
                        width: "100%",
                        fontSize: "1.2rem",
                        padding: "1rem",
                      }}
                      onChange={checkWord}
                      autoFocus
                    />
                    <Box>
                      <Typography variant="h6">
                        Word Count : {wordCount}
                      </Typography>
                    </Box>
                  </Box>

                  {checkStatus && (
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: "red",
                        marginTop: 2,
                      }}
                    >
                      *No answer. No further scoring.
                    </Typography>
                  )}
                </>
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
      <DataForWemailAnswerContext.Provider
        value={{
          originalContent: postsByPage?.data?.data[0]?.content,
          content: postsByPage?.data?.data[0]?.transcript,
          keyword_length: postsByPage?.data?.data[0]?.keyword_length,
          type: postsByPage?.data?.data[0]?.email_type,
        }}
      >
        <Box sx={{ width: "100%", p: 2 }}>
          <AnswerParentComponent
            postId={postsByPage.data?.data[0]?.id}
            type="Writing"
            category={"wemail"}
          />
        </Box>
      </DataForWemailAnswerContext.Provider>
    </>
  );
};

export default TestWemail;
