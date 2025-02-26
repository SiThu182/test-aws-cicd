import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

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

// import { fetchCount } from "../../ScoreCountApi";
export const DataForMcAnswerContext = createContext();
const TestMCAns = () => {
  let { postsByPage, loading, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const postPath = "listening_test/mc";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  const [checkedState, setCheckedState] = useState("");
  //answer array

  //check auto play
  // let [isBlocked, setIsBlocking] = useState(false);
  // let [recorder, setRecorder] = useState();
  // const [value] = useState(1);
  const char = "A";
  const [checkArray, setCheckArray] = useState([]);
  const [minusCount, setMinusCount] = useState(0);
  const [checkBg, setCheckBg] = useState([]);
  const [answer, setAnswer] = useState(false);
  // const [overall_result, setOverallResult] = useState([]);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [errorStore, setErrorStore] = useState(false);
  const [errorScore, setErrorScore] = useState(false);

  const [playingCounterCount, setplayingCounterCount] = useState(3);
  let [stoppedPlayingInterval, setStoppedPlayingInterval] = useState(false);
  let [playingStatus, setPlayingStatus] = useState(true);
  let [totalPage, setTotalPage] = useState("");
  // let [pagePaginate, setPagePaginate] = useState([]);

  let [count, setCount] = useState(0);
  let [totalCount, setTotalCount] = useState(0);
  let [finalCount, setFinalCount] = useState(0);
  let [currentPage, setCurrentPage] = useState(1);
  let [content, setContent] = useState("");
  // let [playAudio, setPlayAudio] = useState("");
  let playAudioRef = useRef(null);
  let [ans, setAns] = useState("");

  let [isPlaying, setIsPlaying] = useState(false);

  let [page, setPage] = useState(1);
  let [isPlayingStatus, setIsPlayingStatus] = useState(true);
  let [currentAudio, setCurrentAudio] = useState(0);

  //for answer tabs
  const [answerTabCleanUp, setAnswerTabCleanUp] = useState(false);
  let [answerCount, setAnswerCount] = useState(0);
  let [answerText, setAnswerText] = useState([]);
  const [resetState, setResetState] = useState(false);
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
        postsByPage.data.data[0].mul_choices !== undefined
      ) {
        setCheckArray(postsByPage.data.data[0].mul_choices);
        setContent(postsByPage.data.data[0].content);
        setCheckedState(
          new Array(postsByPage.data.data[0].mul_choices.length).fill(false)
        );
        setAnswerTabCleanUp(true);
      }
    }
  }, [postsByPage, totalPage]);

  //get page data
  useEffect(() => {
    dispatch(fetchPostsByPageAsync({ path: postPath, page: page }));
  }, [dispatch, postPath, page]);

  //prepare answer count for answer tabs
  useEffect(() => {
    if (
      checkArray !== undefined &&
      checkArray?.length !== 0 &&
      answerTabCleanUp
    ) {
      let answerInLetter = "";
      setAnswerCount(0);
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

  //start playing counter count
  useEffect(() => {
    if (postsByPage.data !== undefined && loading === false && !resetState) {
      if (postsByPage.data.data[0] === undefined) {
      } else {
        let media_type = postsByPage.data.data[0].media_type;
        let media = postsByPage.data.data[0].media;
        playAudioRef.current = new Audio(
          media_type === "1"
            ? media
            : `${process.env.REACT_APP_BACKEND_URL}storage/mc/${media}`
        );
        let interval = playingInterval(stoppedPlayingInterval);
        return () => clearInterval(interval);
      }
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
    }
  }, [playingCounterCount, page]);

  //start audio play
  useEffect(() => {
    if (stoppedPlayingInterval && playAudioRef.current !== "") {
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

  //reset state for next & prev
  let reset = () => {
    playAudioRef.current.pause();
    playAudioRef.current = null;
    setResetState(true);
    setCheckedState("");
    setCheckedState(
      new Array(postsByPage.data.data[0].mul_choices.length).fill(false)
    );

    setCount(0);
    setCheckBg("");
    setAnswerLoading(false);
    setAnswer(false);

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
    setStoppedPlayingInterval(false);
    setPlayingStatus(true);
    setplayingCounterCount(3);
    setIsPlaying(false);
    setTimeout(() => {
      setResetState(false);
    }, 2000);
  };

  //play pause audio
  let playPause = () => {
    // Get state of song
    if (playAudioRef.current !== "") {
      if (playingCounterCount >= 1) {
        setplayingCounterCount(0);
        setStoppedPlayingInterval(true);
      }
      let currentPlaying = isPlayingStatus;

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
    // let Id = localStorage.getItem("userId");
    // let response = await fetchScoreCount(Id, 1);

    // if (response === 1) {
    setAnswerLoading(true);
    setAnswer(false);
    setCount(0);
    setMinusCount(0);
    setFinalCount("");
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
    // trigger useEffect for check

    //
    // }
  };
  useEffect(() => {
    if (ans !== "" && ans.length !== undefined && ans.length !== 0) {
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
    if (answer === true && finalCount === "") {
      setFinalCount(count - minusCount < 0 ? 0 : count - minusCount);
    }
  }, [answer, setFinalCount, finalCount, count, minusCount]);

  useEffect(() => {
    if (answer === true && finalCount !== "") {
      let Id = localStorage.getItem("userId");
      let postId = postsByPage.data.data[0].id;
      let category = "mc";
      let token = getCookie("userToken");
      if (!token) this.props.navigate("/login");
      else {
        let config = { headers: { Authorization: "Bearer " + token } };

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
              user_answered: userAnswer,
              overall_point: finalCount,
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
        category={"mc"}
        setPage={setPage}
        reset={reset}
        status={status}
        postsByPage={postsByPage}
        backPath={"/admin/listening"}
        navTitle={" Multiple Choice Multiple Answer"}
        categoryQuestion={
          " Listen to the recording and answer the question by selecting all the correct responses. You will need to select more than one response."
        }
        upload={upload}
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
            : `${process.env.REACT_APP_BACKEND_URL}storage/mc/${postsByPage?.data?.data[0]?.media}`
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
            category={"mc"}
            postsByPage={postsByPage}
          />
          <Box sx={{ color: "#2196f3" }}>
            <Typography variant="h5">
              {status === "succeeded" &&
                postsByPage.data.data[0].category == "mc" &&
                postsByPage.data.data[0].title}
            </Typography>
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
              ) : checkArray !== undefined &&
                checkArray.length !== 0 &&
                status === "succeeded" &&
                postsByPage.data.data[0].category == "mc" ? (
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
                      {content}
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

      <DataForMcAnswerContext.Provider
        value={{
          count: answerCount,
          answerText: answerText,
        }}
      >
        <Box sx={{ width: "100%", p: 2 }}>
          <AnswerParentComponent
            postId={postsByPage.data?.data[0]?.id}
            type="Listening"
            category={"mc"}
          />
        </Box>
      </DataForMcAnswerContext.Provider>
    </>
  );
};

export default TestMCAns;
