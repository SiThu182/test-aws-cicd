import { Box, Typography } from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import React, { createContext, useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
// import { fetchPostsByPageAsync } from "recordrtc";
import { fetchPostsByPageAsync } from "../../../../../redux/thunk/Posts";
import AnswerParentComponent from "../../../../../components/Backend/UserAnswerComponents/AnswerParent";
import TestPreparationAudioCard from "../../../../../components/Backend/TestCard/TestPreparationAudioCard";
import PracticeLayout from "../../../../../components/Backend/PracticeLayout/PracticeLayout";
import { getCookie } from "../../../../../Utils/GetCookies";

// import { fetchScoreCount } from "../../ScoreCountApi";
export const DataForHiwAnswerContext = createContext();

const TestHIW = () => {
  let { postsByPage, loading, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  let postPath = "listening_test/hiw";
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  const [answer, setAnswer] = useState(false);
  // const [overall_result, setOverallResult] = useState([]);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [errorStore, setErrorStore] = useState(false);
  const [errorScore, setErrorScore] = useState(false);

  const [playingCounterCount, setplayingCounterCount] = useState(3);
  let [stoppedPlayingInterval, setStoppedPlayingInterval] = useState(false);
  let [playingStatus, setPlayingStatus] = useState(true);
  let [content, setContent] = useState("");
  // let [playAudio, setPlayAudio] = useState("");
  let playAudioRef = useRef(null);
  let [isPlaying, setIsPlaying] = useState(false);
  //paging
  let [totalPage, setTotalPage] = useState("");
  // let [pagePaginate, setPagePaginate] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [page, setPage] = useState(1);
  let [isPlayingStatus, setIsPlayingStatus] = useState(true);
  let [currentAudio, setCurrentAudio] = useState(0);

  //testing logic state
  let [clickArray, setClickArray] = useState([]);
  let [click, setClick] = useState(false);
  let [obj, setObj] = useState();
  let [x, setX] = useState(false);
  let [answerArr, setAnswerArr] = useState([]);
  let [sortedAns, setSortedAns] = useState([]);

  let [correct, setCorrect] = useState(0);
  let [inCorrect, setIncorrect] = useState(0);

  let [testAnswer, setTestAnswer] = useState(false);
  let [testCheck, setTestCheck] = useState([]);
  let [finalTest, setFinalTest] = useState("");
  //testarray
  let [testArray, setTestArray] = useState();
  let [testString, setTestString] = useState("");

  //for answer tabs
  let [answerCount, setAnswerCount] = useState(0);
  let [answerText, setAnswerText] = useState([]);
  let [answerTabCleanUp, setAnswerTabCleanUp] = useState(false);
  const [resetState, setResetState] = useState(false);
  //testing logic
  //useEffect for splitting content into array
  useEffect(() => {
    if (testString !== "") {
      let text;
      // text = testString.replace(/\([^()]*\)/g, "$");
      text = testString;
      text = text.split(" ");
      setTestArray(text);
    }
  }, [testString]);

  //click highlight handler
  const clickHandler = (value, index) => {
    setObj("");
    setX(false);
    let element = document.getElementById(index);

    if (element.style.borderRadius === "0.5rem") {
      element.removeAttribute("style");
    } else {
      element.style.backgroundColor = "#33eaff";
      element.style.borderRadius = "0.5rem";
      element.style.boxShadow = "0 0 1px 1px black";
      element.style.margin = "2px";
    }

    clickArray.forEach((c, i) => {
      return c.index === index ? setX(clickArray.indexOf(c)) : "";
    });
    setObj({ index: index, value: value });
    setClick(true);
  };

  //useEffect to store clicked value
  useEffect(() => {
    if (click) {
      if (x !== false) {
        clickArray.splice(x, 1);
      } else {
        setClickArray([...clickArray, obj]);
      }
      setClick(false);
    }
  }, [obj, click, clickArray, x]);

  // testing scoring
  const testScore = async () => {
    setTestAnswer(false);
    setAnswerLoading(true);
    setTestArray(testString.split(" "));
    setCorrect(0);
    setIncorrect(0);

    clickArray.forEach((test, index) => {
      if (sortedAns.includes(test.index)) {
        setCorrect((prevCount) => prevCount + 1);
      } else {
        setIncorrect((prevCount) => prevCount + 1);
      }
    });

    setTestCheck([]);
    clickArray.forEach((test) => {
      setTestCheck((prevCheck) => [...prevCheck, test.index]);
    });

    setTestAnswer(true);
    setAnswer(true);
    setAnswerLoading(false);
    // }
  };

  //calculate final score and storing
  useEffect(() => {
    if (answer) {
      setFinalTest(correct - inCorrect < 0 ? 0 : correct - inCorrect);
      if (finalTest !== "") {
        let overall_point;
        overall_point = finalTest;
        let Id = localStorage.getItem("userId");
        let postId = postsByPage.data.data[0].id;
        let category = "hiw";
        let userAnswer = "";
        clickArray.forEach((c) => {
          userAnswer = userAnswer === "" ? c.value : userAnswer + "," + c.value;
        });

        let token = getCookie("userToken");
        if (!token) this.props.navigate("/login");
        else {
          let config = { headers: { Authorization: "Bearer " + token } };
          try {
            axios.post(
              `${backendURL}s-mul-choice`,
              {
                user_id: Id,
                post_id: postId,
                category: category,
                user_answered: userAnswer,
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
  }, [
    testAnswer,
    postsByPage,
    backendURL,
    correct,
    inCorrect,
    finalTest,
    clickArray,
    testString,
    sortedAns,
    answer,
  ]);

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
      // setPagePaginate(Paginate);
      setCurrentPage(postsByPage.data.current_page);

      if (
        postsByPage.data.data[0] !== undefined &&
        postsByPage.data.data[0].answers !== undefined
      ) {
        //needs to replace with testArray
        let answer = postsByPage.data.data[0].answers;
        setAnswerArr([]);
        setAnswerArr(answer);
        setContent(postsByPage.data.data[0].title);
        setTestString(postsByPage.data.data[0].content);

        setSortedAns([]);
        let text;
        text = testString.replace(/\([^()]*\)/g, "$");
        text = text.split(" ");
        let tempArray = [];
        for (let i = 0; i < answerArr.length; i++) {
          for (let j = 0; j < text.length; j++) {
            if (answerArr[i].name === text[j] && text[j + 1].includes("$#")) {
              if (!tempArray.includes(j)) {
                tempArray.push(j);
              }
            }
          }
        }
        setSortedAns((prevAns) => [...prevAns, ...tempArray]);
        setAnswerTabCleanUp(true);
      }
    }
  }, [postsByPage, totalPage, content, testString, answerArr, testArray]);

  //get page data
  useEffect(() => {
    dispatch(fetchPostsByPageAsync({ path: postPath, page: page }));
  }, [dispatch, postPath, page]);

  //prepare answer for answer tabs
  useEffect(() => {
    if (answerTabCleanUp) {
      setAnswerText("");
      setAnswerCount(0);
      answerArr.forEach((a) => {
        setAnswerText((prev) => (prev !== "" ? prev + "," + a.name : a.name));
      });
      setAnswerCount(sortedAns.length);
      setAnswerTabCleanUp(false);
    }
  }, [sortedAns, answerTabCleanUp, answerArr]);

  //start playing counter count
  useEffect(() => {
    if (postsByPage.data !== undefined && loading === false && !resetState) {
      if (postsByPage.data.data[0] === undefined) {
      } else {
        let media_type = postsByPage.data.data[0].media_type;
        let media = postsByPage.data.data[0].media;
        // setPlayAudio(
        //   new Audio(
        //     media_type === "1"
        //       ? media
        //       : `${process.env.REACT_APP_BACKEND_URL}storage/hiw/${media}`
        //   )
        // );
        playAudioRef.current = new Audio(
          media_type === "1"
            ? media
            : `${process.env.REACT_APP_BACKEND_URL}storage/hiw/${media}`
        );
      }
      let interval = playingInterval(stoppedPlayingInterval);
      return () => clearInterval(interval);
    }
  }, [
    playingCounterCount,
    postsByPage,
    stoppedPlayingInterval,
    page,
    loading,
    resetState,
  ]);

  //playing interval
  let playingInterval = (flag) => {
    if (!flag) {
      const interval = setInterval(() => {
        setplayingCounterCount((prevplaying) => prevplaying - 1);
      }, 1000);
      return interval;
    }
  };

  //stop playing counter count
  useEffect(() => {
    if (playingCounterCount < 1) {
      setStoppedPlayingInterval(true);
      // setPlayAudio(new Audio(postsByPage.data.data[0].media));
    }
  }, [playingCounterCount, page, postsByPage]);

  //start audio play
  useEffect(() => {
    if (stoppedPlayingInterval && playAudioRef.current !== null) {
      setIsPlaying(true);
      const playAudiofun = () => {
        if (playAudioRef.current.pause) {
          playAudioRef.current.play();
        }
        playAudioRef.current.playbackRate = 1.2; // 1.5x speed
        playAudioRef.current.volume = 1.0; // Max volume (range is 0.0 to 1.0)
        
        playAudioRef.current.onended = () => {
          setPlayingStatus(false);
          setIsPlaying(false);
        };
      };
      playAudiofun();
    }
  }, [stoppedPlayingInterval, playAudioRef, page]);

  //pause the player when component unmounts
  useEffect(() => {
    return () => {
      if (playAudioRef.current !== null) {
        playAudioRef.current.pause();
        playAudioRef.current = null;
      }
    };
  }, []);

  //reset state for next & prev
  let reset = () => {
    playAudioRef.current.pause();
    playAudioRef.current = null;
    setCorrect("");
    setClickArray([]);
    setTestAnswer(false);
    setIncorrect("");
    setContent("");
    setFinalTest("");
    setTestArray([]);
    setTestString("");
    setAnswerLoading(false);
    setAnswer(false);
    setErrorUpload(false);
    setErrorStore(false);
    setErrorScore(false);
    setStoppedPlayingInterval(false);
    setPlayingStatus(true);
    setplayingCounterCount(3);
    setIsPlaying(false);
    setResetState(true);
    setTimeout(() => {
      setResetState(false);
    }, 2000);
  };

  //play pause for audio
  let playPause = () => {
    if (playAudioRef.current !== "") {
      if (playingCounterCount >= 1) {
        setplayingCounterCount(0);
        setStoppedPlayingInterval(true);
      }
      let currentPlaying = true;
      // Get state of song
      currentPlaying = isPlayingStatus;

      if (playAudioRef.current.currentTime >= playAudioRef.current.duration) {
        currentPlaying = false;
      }

      if (currentPlaying) {
        // Pause the song if it is playing
        playAudioRef.current.pause();
      } else {
        // Play the song if it is paused
        playAudioRef.current.play();
      }
      setIsPlayingStatus(!isPlayingStatus);
    }

    // Change the state of song
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (playAudioRef.current !== null) {
        setCurrentAudio(() => playAudioRef.current.currentTime);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [playAudioRef]);

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
                    value={finalTest < 0 ? 0 : finalTest}
                    maxValue={sortedAns.length}
                    text={`${finalTest}/${sortedAns.length}`}
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
        category={"hiw"}
        setPage={setPage}
        reset={reset}
        status={status}
        postsByPage={postsByPage}
        backPath={"/admin/listening"}
        navTitle={"Highlight Incorrect Words"}
        categoryQuestion={
          "  You will hear a recording. Below is a transcription of the recording. Some words in the transcription differ from what the speaker(s) said. Please click on the words that are different."
        }
        upload={testScore}
        retry={answer}
        page={page}
        totalPage={totalPage}
        error={errorUpload || errorStore || errorScore}
        disableReset={status === "succeeded" && !resetState ? false : true}
        disableSubmit={
          !answer && !errorScore && !errorStore && !errorUpload && !resetState
            ? false
            : true
        }
        disableAudioText={
          status === "succeeded"
            ? postsByPage?.data !== undefined &&
              postsByPage?.data !== null &&
              !resetState
              ? false
              : true
            : true
        }
        disablePrev={
          status === "succeeded" && !resetState
            ? currentPage === 1
              ? true
              : false
            : true
        }
        disableNext={
          status === "succeeded" && !resetState
            ? currentPage === totalPage
              ? true
              : false
            : true
        }
        audioText={
          status === "succeeded" ? postsByPage.data?.data[0]?.audio_text : null
        }
        audio={
          postsByPage?.data?.data[0]?.media_type === "1"
            ? postsByPage?.data?.data[0]?.media
            : `${process.env.REACT_APP_BACKEND_URL}storage/hiw/${postsByPage?.data?.data[0]?.media}`
        }
        answerTemplate={answerText}
        disableAnswer={status === "succeeded" && !resetState ? false : true}
        answerBlock={() => <AnswerBlock />}
        answerLoading={answerLoading}
        // answer={answer}
        // answerTabs={() => (
        //   <AnswerTabs content={content} postsByPage={postsByPage} />
        // )}
      >
        <>
          <TestPreparationAudioCard
            status={status}
            loading={loading}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setPlayingStatus={setPlayingStatus}
            playingStatus={playingStatus}
            playingCounterCount={playingCounterCount}
            startPlayingCounterCount={3}
            playAudio={playAudioRef}
            playPause={playPause}
            stoppedPlayingInterval={stoppedPlayingInterval}
            currentAudio={currentAudio}
            category={"hiw"}
            postsByPage={postsByPage}
          />
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
              ) : testArray !== undefined &&
                testArray.length !== 0 &&
                status === "succeeded" &&
                postsByPage.data.data[0].category == "hiw" ? (
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
                    {/* <Box
                          sx={{ color: "#2196f3", textDecoration: "underline" }}
                        >
                          <Typography variant="h5">
                            {postsByPage.data.data[0].title}
                          </Typography>
                        </Box> */}
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      {content}
                    </Typography>
                    {testArray.map((test, index) => (
                      <Typography
                        key={index}
                        sx={{ display: "inline-block", mr: 1 }}
                      >
                        {!test.includes("$#") && (
                          <span
                            key={index.toString()}
                            id={index}
                            className={
                              testAnswer
                                ? sortedAns.includes(index)
                                  ? testCheck.includes(index)
                                    ? "disable-text-selection checkBg"
                                    : "disable-text-selection correctBg"
                                  : testCheck.includes(index)
                                  ? "disable-text-selection wrongBg"
                                  : "disable-text-selection"
                                : "disable-text-selection"
                            } //css in style.css
                            style={{ cursor: "pointer" }}
                            onClick={() => clickHandler(test, index)}
                          >
                            {test}
                            {test === "'" ? "" : " "}
                          </span>
                        )}
                        {test.includes("$#") && answer && (
                          <span
                            key={index.toString()}
                            id={index}
                            className={
                              testAnswer
                                ? sortedAns.includes(index)
                                  ? testCheck.includes(index)
                                    ? "disable-text-selection checkBg"
                                    : "disable-text-selection correctBg"
                                  : testCheck.includes(index)
                                  ? "disable-text-selection wrongBg"
                                  : "disable-text-selection"
                                : "disable-text-selection"
                            } //css in style.css
                            style={{ cursor: "pointer" }}
                            onClick={() => clickHandler(test, index)}
                          >
                            ({test.replaceAll(/#\$|\$#/g, "")}){" "}
                          </span>
                        )}
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
            {/* testing logic */}
            {/* <>
                  test
                  <div>
                
                    {testArray !== undefined &&
                      testArray.map((test, index) => (
                        <>
                          {(test !== "$" || testAnswer) && (
                            <span
                              key={index.toString()}
                              id={index}
                              className={
                                testAnswer
                                  ? sortedAns.includes(index)
                                    ? testCheck.includes(index)
                                      ? "disable-text-selection checkBg"
                                      : "disable-text-selection correctBg"
                                    : testCheck.includes(index)
                                    ? "disable-text-selection wrongBg"
                                    : "disable-text-selection"
                                  : "disable-text-selection"
                              } //css in style.css
                              style={{ cursor: "pointer" }}
                              onClick={() => clickHandler(test, index)}
                            >
                              {test}
                              {test === "'" ? "" : " "}
                            </span>
                          )}
                        </>
                      ))}
                  </div>
                  {answerArr !== "" &&
                    answerArr !== undefined &&
                    answerArr.map((click, index) => (
                      <h2 key={index.toString()}>{click}</h2>
                    ))}
                  {sortedAns !== "" &&
                    sortedAns !== undefined &&
                    sortedAns.map((s, index) => (
                      <h2 key={index.toString()}>{s}</h2>
                    ))}
                  <Button variant="contained" onClick={testScore}>
                    Test Score
                  </Button>
                  <Typography>{testCheck}</Typography>
                  <Typography>final:{finalTest < 0 ? 0 : finalTest}</Typography>
                  <Typography>Correct:{correct}</Typography>
                  <Typography>Incorrect:{inCorrect}</Typography>
                </> */}
            {/* testing logic */}
          </Box>
        </>
      </PracticeLayout>

      <DataForHiwAnswerContext.Provider
        value={{
          count: answerCount,
          answerText: answerText,
        }}
      >
        <Box sx={{ width: "100%", p: 2 }}>
          <AnswerParentComponent
            postId={postsByPage.data?.data[0]?.id}
            type="Listening"
            category={"hiw"}
          />
        </Box>
      </DataForHiwAnswerContext.Provider>
    </>
  );
};

export default TestHIW;
