import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { createContext, useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByPageAsync } from "../../../../../redux/thunk/Posts";
import AnswerParentComponent from "../../../../../components/Backend/UserAnswerComponents/AnswerParent";
import TestPreparationAudioCard from "../../../../../components/Backend/TestCard/TestPreparationAudioCard";
import PracticeLayout from "../../../../../components/Backend/PracticeLayout/PracticeLayout";
import { getCookie } from "../../../../../Utils/GetCookies";
// import { fetchScoreCount } from "../../ScoreCountApi";
export const DataForFibAnswerContext = createContext();
const TestFIB = () => {
  let { postsByPage, loading, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  let postPath = "listening_test/fib";
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  //

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
  let [checkBg, setCheckBg] = useState("");
  let [checkArr, setCheckArr] = useState("");
  let [ansArr, setAnsArr] = useState("");
  let [answerArr, setAnswerArr] = useState([]);

  let [correct, setCorrect] = useState(0);
  let [inCorrect, setIncorrect] = useState(0);
  let [finalTest, setFinalTest] = useState("");
  //testarray
  let [testArray, setTestArray] = useState();
  let [testString, setTestString] = useState("");

  // checkstate for useEffect
  let [checkState, setCheckState] = useState(false);

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
      text = testString;
      text = text.split(" ");
      setTestArray(text);
    }
  }, [testString]);

  //end test//
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
        setAnswerTabCleanUp(true);
      }
    }
  }, [postsByPage, totalPage, content, testString, answerArr, testArray]);

  //get page data
  useEffect(() => {
    dispatch(fetchPostsByPageAsync({ path: postPath, page: page }));
  }, [dispatch, postPath, page]);

  //prepare answer for answer tabs;
  useEffect(() => {
    if (answerArr.length !== 0 && answerTabCleanUp) {
      setAnswerText("");
      answerArr.forEach((a, index) => {
        setAnswerText((prev) => (prev !== "" ? prev + " , " + a.name : a.name));
      });
      setAnswerCount(answerArr.length);

      setAnswerTabCleanUp(true);
    }
  }, [answerArr, answerTabCleanUp]);

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
        //       : `${process.env.REACT_APP_BACKEND_URL}storage/fib/${media}`
        //   )
        // );
        playAudioRef.current = new Audio(
          media_type === "1"
            ? media
            : `${process.env.REACT_APP_BACKEND_URL}storage/fib/${media}`
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

  // let controller = new AbortController();

  //reset state for next & prev
  let reset = () => {
    setResetState(true);
    playAudioRef.current.pause();
    playAudioRef.current = null;

    setCorrect("");

    setIncorrect("");
    setCheckState(false);
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

  // clickHandler
  const clickHandler = async () => {
    // if (response === 1) {
    let input = document.querySelectorAll(".inputBox");

    setCheckBg([]);
    setCheckArr([]);
    answerArr.forEach((ans, index) => {
      setCheckArr((prevArray) => [...prevArray, ans.name]);
    });
    setAnsArr([]);
    input.forEach((i) => {
      setAnsArr((prevArr) => [...prevArr, i.value.trim()]);
    });
    setCheckState(true);
    // }
  };

  //check ans & count
  useEffect(() => {
    const check = () => {
      setCorrect(0);
      setIncorrect(0);
      setFinalTest("");
      setCheckBg([]);
      ansArr.forEach((a, index) => {
        if (a === checkArr[index]) {
          setCorrect((prevCount) => prevCount + 1);
          setCheckBg((prevBg) => [...prevBg, 1]);
        } else {
          setCheckBg((prevBg) => [...prevBg, 0]);
        }
      });

      setAnswer(true);
      setCheckState(false);
    };
    if (checkState && ansArr.length !== 0 && ansArr !== undefined) {
      check();
    }
  }, [ansArr, checkArr, checkState]);

  //check bg useEffect
  useEffect(() => {
    if (checkBg !== undefined && checkBg.length !== 0) {
      let inputList = document.querySelectorAll(".inputBox");

      inputList.forEach((x, index) => {
        x.classList.add(checkBg[index] === 1 ? "bg1" : "bg0");
      });
    }
  }, [checkBg]);

  //final answer
  //calculate final score and storing
  useEffect(() => {
    if (answer) {
      setFinalTest(correct);
      setTestArray(testString.split(" "));

      if (finalTest !== "") {
        let overall_point;
        overall_point = finalTest;

        let Id = localStorage.getItem("userId");
        let postId = postsByPage.data.data[0].id;
        let category = "fib";

        let token = getCookie("userToken");
        let noAnswer = true;
        ansArr.forEach((a) => {
          if (a !== "") {
            noAnswer = false;
          }
        });

        if (!token) {
          this.props.navigate("/login");
        } else {
          let config = { headers: { Authorization: "Bearer " + token } };
          try {
            axios.post(
              `${backendURL}s-mul-choice`,
              {
                user_id: Id,
                post_id: postId,
                category: category,
                user_answered: noAnswer ? null : JSON.stringify(ansArr),
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
    correct,
    ansArr,
    inCorrect,
    answer,
    testString,
    finalTest,
    backendURL,
    postsByPage,
  ]);

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
                    maxValue={answerArr.length}
                    text={`${finalTest}/${answerArr.length}`}
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
        category={"fib"}
        setPage={setPage}
        reset={reset}
        status={status}
        postsByPage={postsByPage}
        backPath={"/admin/listening"}
        navTitle={"Fill In the Blank"}
        categoryQuestion={
          "  You will hear a recording. Type the missing words in each blank."
        }
        upload={clickHandler}
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
            : `${process.env.REACT_APP_BACKEND_URL}storage/fib/${postsByPage?.data?.data[0]?.media}`
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
            category={"fib"}
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
                postsByPage.data.data[0].category === "fib" ? (
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
                          sx={{  }}
                        >
                          <Typography variant="h5">
                            {postsByPage.data.data[0].title}
                          </Typography>
                        </Box> */}
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
                      ) : s.includes("$#") && answer === true ? (
                        <span
                          key={index.toString()}
                          id={index}
                          className="spanStyle"
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
      </PracticeLayout>

      <DataForFibAnswerContext.Provider
        value={{
          count: answerCount,
          answerText: answerText,
        }}
      >
        <Box sx={{ width: "100%", p: 2 }}>
          <AnswerParentComponent
            postId={postsByPage.data?.data[0]?.id}
            type="Listening"
            category={"fib"}
          />
        </Box>
      </DataForFibAnswerContext.Provider>
    </>
  );
};

export default TestFIB;
