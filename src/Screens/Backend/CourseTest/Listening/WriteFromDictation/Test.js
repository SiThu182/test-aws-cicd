import { Box, TextareaAutosize, Typography } from "@mui/material";

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
import WFDTimer from "../../../../../components/Backend/PracticeComponents/WFDTimer";

// import { fetchScoreCount } from "../../ScoreCountApi";

export const DataForWfdAnswerContext = createContext();

const TestWFD = () => {
  let { postsByPage, loading, status } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  let postPath = "listening_test/wfd";
  const [timerCounterCount, setTimerCounterCount] = useState(0);
  const [value, setValue] = useState(1);
  const [checkArray, setCheckArray] = useState([]);
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

  let [count, setCount] = useState(0);
  let [contentArr, setContentArr] = useState();

  // let [content, setContent] = useState("");
  // let [playAudio, setPlayAudio] = useState("");
  let playAudioRef = useRef(null);

  let [isPlaying, setIsPlaying] = useState(false);

  //paging
  let [totalPage, setTotalPage] = useState("");
  let [pagePaginate, setPagePaginate] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [page, setPage] = useState(1);
  let [isPlayingStatus, setIsPlayingStatus] = useState(true);
  let [currentAudio, setCurrentAudio] = useState(0);
  let [char, setChar] = useState("");
  let [wordCount, setWordCount] = useState(0);
  let [showWord, setShowWord] = useState([]);
  const [resetState, setResetState] = useState(false);

  const [stopCount, setStopCount] = useState(false);
  const [resetCount, setResetCount] = useState(false);
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
        setCheckArray(postsByPage.data.data[0].mul_choices);
        // setContent(postsByPage.data.data[0].content);
        playAudioRef.current = null; //no data consider to remove after data entry
      }
      setCurrentPage(postsByPage.data.current_page);
    }
  }, [setPagePaginate, postsByPage, totalPage]);

  //get page data
  useEffect(() => {
    dispatch(fetchPostsByPageAsync({ path: postPath, page: page }));
  }, [dispatch, postPath, page]);

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
            : `${process.env.REACT_APP_BACKEND_URL}storage/wfd/${media}`
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

  //pause the player when component unmounts
  useEffect(() => {
    return () => {
      if (playAudioRef.current !== null) {
        playAudioRef.current.pause();
        playAudioRef.current = null;
      }
    };
  }, []);

  //playing interval
  let playingInterval = (flag) => {
    if (!flag && playAudioRef.current !== null) {
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

  // let controller = new AbortController();
  //upload & get score
  let save_score = async () => {
    // let Id = localStorage.getItem("userId");
    // let response = await fetchScoreCount(Id, 1);
    // if (response === 1) {
    setStopCount(true);
    const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/g;
    let content_arr = postsByPage.data.data[0].content
      .replace(specialCharactersRegex, "")
      .split(" ");
    setContentArr(content_arr);
    let char_arr = char.replace(specialCharactersRegex, "").split(" ");
    let overall_point = 0;

    content_arr.forEach((check_char) => {
      if (char_arr.includes(check_char)) {
        showWord.push({ name: check_char, color: "#16A085" }); // This would mutate the state, which is not allowed
        setShowWord(showWord);
        setCount((prevtotalCount) => prevtotalCount + 1);
        overall_point += 1;
      } else {
        showWord.push({ name: check_char, color: "#F21F21" }); // This would mutate the state, which is not allowed
        setShowWord(showWord);
      }
    });

    // setCount(0);
    // setCheckBg("");
    // for (let i = 0; i < checkArray.length; i++) {
    //   if (checkArray[i].isCorrect === 1) {
    //     setCheckBg(i);
    //   }
    // }

    // let overall_point = 0;

    setAnswerLoading(false);
    setAnswer(true);

    let Id = localStorage.getItem("userId");
    let postId = postsByPage.data.data[0].id;
    let category = "wfd";

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
            overall_point: overall_point,
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
    let text = document.querySelector("#text-area");
    text.value = "";
    setValue("");
    setStopCount(false);
    setResetCount(true);
    setWordCount(0);
    playAudioRef.current.pause();
    playAudioRef.current = null;
    setValue("");
    setCount(0);
    setChar("");
    setCheckBg("");
    setAnswerLoading(false);
    setAnswer(false);
    setErrorUpload(false);
    setErrorStore(false);
    setErrorScore(false);
    setStoppedPlayingInterval(false);
    setPlayingStatus(true);
    setplayingCounterCount(3);
    setIsPlaying(false);
    setShowWord([]);
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

  //audio time progress
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

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  const checkWord = (event) => {
    let char = event.target.value;
    // const char_arr = char.split(" ");

    let char_arr = char
      .trim()
      .replace(/\(([^)]*)\)/g, "$1") // Remove only the parentheses while retaining the text inside
      .replace(/[.,?'()]/g, " ") // Remove punctuation characters and any remaining parentheses
      // .replace(/[.,?']/g, "")
      .split(/\s+/)
      .filter((word) => word !== "");
    setChar(char);
    setWordCount(char_arr.length);
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
                <Box sx={{ width: "30%", margin: "0 auto" }}>
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
                    maxValue={contentArr.length}
                    text={`${count}/${contentArr.length}`}
                  />
                </Box>

                <br />

                <Box sx={{ width: "100%", margin: "0 auto", display: "block" }}>
                  {showWord.map((word, index) => (
                    <Typography
                      key={index}
                      variant="body1"
                      sx={{
                        bgcolor: word.color,
                        display: "inline-block",
                        padding: "4px 8px",
                        margin: "2px",
                        borderRadius: 5,
                      }}
                    >
                      {word.name}
                    </Typography>
                  ))}
                </Box>
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
        category={"wfd"}
        setPage={setPage}
        reset={reset}
        status={status}
        postsByPage={postsByPage}
        backPath={"/admin/listening"}
        navTitle={"Write From Dictation"}
        categoryQuestion={
          "   You will hear a sentence.Type the sentence in the box below exactly as you heard it.Write as much of the sentence as you can.You will hear the sentence only once."
        }
        upload={save_score}
        retry={answer}
        page={page}
        totalPage={totalPage}
        error={errorUpload || errorStore || errorScore}
        disableReset={status === "succeeded" && !resetState ? false : true}
        disableSubmit={
          !answer && !errorScore && !errorStore && !resetState && !errorUpload
            ? false
            : true
        }
        disableAudioText={
          status === "succeeded" && !resetState
            ? postsByPage?.data !== undefined && postsByPage?.data !== null
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
          status === "succeeded" ? postsByPage.data?.data[0]?.content : null
        }
        audio={
          postsByPage?.data?.data[0]?.media_type === "1"
            ? postsByPage?.data?.data[0]?.media
            : `${process.env.REACT_APP_BACKEND_URL}storage/wfd/${postsByPage?.data?.data[0]?.media}`
        }
        answerTemplate={postsByPage?.data?.data[0]?.content}
        disableAnswer={status === "succeeded" && !resetState ? false : true}
        answerBlock={() => <AnswerBlock />}
        answerLoading={answerLoading}
        // answer={answer}
        // answerTabs={() => (
        //   <AnswerTabs content={content} postsByPage={postsByPage} />
        // )}
      >
        <>
          <div className="card">
            <Box
              sx={{
                color: "#2196f3",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">
                {status === "succeeded" &&
                  postsByPage.data.data[0].category == "wfd" &&
                  postsByPage.data.data[0].title}
              </Typography>
              <WFDTimer
                status={status}
                count={0}
                stopCount={stopCount}
                resetCount={resetCount}
                setResetCount={setResetCount}
                postReady={
                  postsByPage?.data?.data?.length !== 0 &&
                  !isPlaying &&
                  !playingStatus
                }
              />
            </Box>
            <Box sx={{ margin: "0 auto", width: "100%", mb: 4 }}>
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
                category={"wfd"}
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
                          id={"text-area"}
                          aria-label="minimum height"
                          minRows={10}
                          placeholder="Write a Summary..."
                          spellCheck={false}
                          style={{
                            width: "100%",
                            fontSize: "1.2rem",
                            padding: "1rem",
                          }}
                          // value={char}
                          onChange={checkWord}
                        />
                        <Box>
                          <Typography variant="h6">
                            Word Count : {wordCount}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  )
                ) : (
                  <Typography sx={{ textAlign: "center", color: "red" }}>
                    Fail to fetch data
                  </Typography>
                )}
              </Box>
            </Box>
          </div>
        </>
      </PracticeLayout>

      <DataForWfdAnswerContext.Provider
        value={{
          content: postsByPage?.data?.data[0]?.content,
          keyword_length: postsByPage?.data?.data[0]?.keyword_length,
        }}
      >
        <Box sx={{ width: "100%", p: 2 }}>
          <AnswerParentComponent
            postId={postsByPage.data?.data[0]?.id}
            type="Listening"
            category={"wfd"}
          />
        </Box>
      </DataForWfdAnswerContext.Provider>
    </>
  );
};

export default TestWFD;
