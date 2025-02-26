import {
  Box,
  FormControlLabel,
  FormGroup,
  Radio,
  Typography,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";

// import { fetchPostsByPageAsync } from "recordrtc";

import { fetchPostsByPageAsync } from "../../../../redux/thunk/Posts";
import AnswerParentComponent from "../../../../components/Backend/UserAnswerComponents/AnswerParent";
import TestPreparationAudioCard from "../../../../components/Backend/TestCard/TestPreparationAudioCard";
import PracticeLayout from "../../../../components/Backend/PracticeLayout/PracticeLayout";
import { getCookie } from "../../../../Utils/GetCookies";

// import { fetchScoreCount } from "../ScoreCountApi";

export const DataForListeningSingleAnswerContext = createContext();

const ReusableTest = (props) => {
  let { postsByPage, loading, status } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  let postPath = props.path;
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  //check auto play

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

  let char = "A";
  let [count, setCount] = useState(0);

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

  //send correct answer to answer tabs
  let [correctValue, setCorrectValue] = useState();
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
      if (postsByPage.data.data[0] === undefined) {
      } else {
        setCheckArray(postsByPage.data.data[0].mul_choices);
        setContent(postsByPage.data.data[0].content);
      }
    }
  }, [postsByPage, totalPage]);

  //get page data
  useEffect(() => {
    dispatch(fetchPostsByPageAsync({ path: postPath, page: page }));
  }, [dispatch, postPath, page]);

  useEffect(() => {
    if (checkArray !== undefined && checkArray?.length !== 0) {
      for (let i = 0; i < checkArray.length; i++) {
        if (checkArray[i].isCorrect === 1) {
          setCorrectValue(String.fromCharCode(char.charCodeAt(0) + i));
        }
      }
    }
  }, [checkArray, char]);

  //playing interval
  let playingInterval = useCallback(
    (flag) => {
      if (!flag && playAudioRef.current !== null) {
        const interval = setInterval(() => {
          setplayingCounterCount((prevplaying) => prevplaying - 1);
        }, 1000);
        return interval;
      }
    },
    [playAudioRef]
  );

  //Assign value & start playing counter count
  useEffect(() => {
    if (postsByPage.data !== undefined && loading === false && !resetState) {
      if (postsByPage.data.data[0] === undefined) {
      } else {
        let media_type = postsByPage.data.data[0].media_type;
        let media = postsByPage.data.data[0].media;

        playAudioRef.current = new Audio(
          media_type === "1"
            ? media
            : `${process.env.REACT_APP_BACKEND_URL}storage/${props.category}/${media}`
        );
        console.log(playAudioRef.current);
        let interval = playingInterval(stoppedPlayingInterval);
        return () => clearInterval(interval);
      }
    }
  }, [
    playingCounterCount,
    postsByPage,
    playingInterval,
    props,
    stoppedPlayingInterval,
    page,
    loading,
    resetState,
  ]);

  //stop playing counter count
  useEffect(() => {
    if (playingCounterCount < 1) {
      setStoppedPlayingInterval(true);
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
  let upload = async () => {
    let Id = localStorage.getItem("userId");
    // let response = await fetchScoreCount(Id, 1);

    // if (response === 1) {
    setAnswerLoading(true);
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
        valueId = parseInt(i);
      }
    });
    let userAnswer = String.fromCharCode(char.charCodeAt(0) + valueId);
    setAnswerLoading(false);
    setAnswer(true);

    let postId = postsByPage.data.data[0].id;
    let category = props.category;

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
            user_answered: valueId === "" ? null : userAnswer,
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
    playAudioRef.current.pause();
    playAudioRef = null;
    setCount(0);
    setValue("");
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
    setResetState(true);
    setTimeout(() => {
      setResetState(false);
    }, 2000);
  };

  //pause the player when component unmounts
  useEffect(() => {
    return () => {
      if (playAudioRef.current !== null) {
        playAudioRef.current.pause();
        playAudioRef.current = null;
      }
    };
  }, [postsByPage]);

  //play pause for audio
  let playPause = () => {
    if (playAudioRef.current !== "" && playAudioRef.current !== null) {
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
  }, [playAudioRef.currentTime, playAudioRef]);

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

                {/* 
                <Box sx={{ width: "10%", margin: "0 auto" }}>
                  <h3
                    style={{ whiteSpace: "nowrap", textAlign: "center", my: 2 }}
                  >
                    Fluency
                  </h3>
                  <CircularProgressbar
                    value={
                      (overall_result.number_of_recognized_words * 37) /
                      overall_result.length_of_recording_in_sec
                    }
                    maxValue={
                      (overall_result.number_of_words_in_post * 37) / 37
                    }
                    text={(overall_result.number_of_words_in_post * 37) / 37}
                  />
                </Box>

                <Box sx={{ width: "10%", margin: "0 auto" }}>
                  <h3 style={{ whiteSpace: "nowrap" }}>Content</h3>
                  <CircularProgressbar
                    value={overall_result.number_of_recognized_words}
                    maxValue={overall_result.number_of_words_in_post}
                    text={`${overall_result.number_of_recognized_words}/${overall_result.number_of_words_in_post}`}
                  />
                </Box>

                <Box sx={{ width: "10%", margin: "0 auto" }}>
                  <h3 style={{ whiteSpace: "nowrap" }}>Final</h3>
                  <CircularProgressbar
                    value={overall_result.overall_points}
                    maxValue={90}
                    text={`${overall_result.overall_points.toFixed(2)}`}
                  />
                </Box> */}
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
        category={props.category}
        setPage={setPage}
        reset={reset}
        status={status}
        postsByPage={postsByPage}
        backPath={"/admin/listening"}
        navTitle={
          props.category === "smc"
            ? " Multiple Choice Single Answer"
            : props.category === "hcs"
            ? "Highlight Correct Summary"
            : "Select Missing Word"
        }
        categoryQuestion={
          props.category === "smc"
            ? " Listen to the recording and answer the multiple-choice question by selecting the correct response. Only one response is correct."
            : props.category === "hcs"
            ? "You will hear a recording. Click on the paragraph that best relates to the recording."
            : "You will hear a recording of a lecture. At the end of the recording the last word or group of words has been replaced by a beep. Select the correct option to complete the recording."
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
            : `${process.env.REACT_APP_BACKEND_URL}storage/${props.category}/${postsByPage?.data?.data[0]?.media}`
        }
        answerTemplate={correctValue}
        disableAnswer={status === "succeeded" && !resetState ? false : true}
        answerBlock={() => <AnswerBlock />}
        answerLoading={answerLoading}
        // answer={answer}
        // answerTabs={() => (
        //   <AnswerTabs content={content} postsByPage={postsByPage} />
        // )}
      >
        <>
          <Box sx={{ color: "#2196f3" }}>
            <Typography variant="h6">
              {status === "succeeded" &&
              postsByPage.data.data[0].category === props.category
                ? postsByPage.data.data[0].title
                : ""}
            </Typography>
          </Box>
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
            category={props.category}
            postsByPage={postsByPage}
          />

          <Box sx={{ margin: "0 auto", width: "100%", p: 1 }}>
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
                postsByPage.data.data[0].category === props.category ? (
                <>
                  <Box
                    sx={{
                      width: "90%",
                      margin: "0 auto",

                      borderRadius: "0.5rem",
                      p: 0.2,
                      boxShadow: 1,
                    }}
                  >
                    <Typography sx={{ my: 1, fontSize: "1.2rem" }}>
                      {props.category === "smc" && content}
                    </Typography>
                    <FormGroup>
                      {checkArray.map((c, index) => {
                        return (
                          <FormControlLabel
                            key={index}
                            sx={{
                              backgroundColor:
                                checkBg === index ? "yellow" : "",
                              my: 0.5,
                              ml: 1,
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

      <DataForListeningSingleAnswerContext.Provider value={correctValue}>
        <Box sx={{ width: "100%", p: 2 }}>
          <AnswerParentComponent
            postId={postsByPage.data?.data[0]?.id}
            type="Listening"
            category={props.category}
            correctValue={correctValue}
          />
        </Box>
      </DataForListeningSingleAnswerContext.Provider>
    </>
  );
};

export default ReusableTest;
