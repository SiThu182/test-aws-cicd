import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PauseIcon from "@mui/icons-material/Pause";
import CardHeader from "@mui/material/CardHeader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchPostsByPageAsync } from "../../../../../redux/thunk/Posts";

import "react-circular-progressbar/dist/styles.css";
import SwipeableSideDrawer from "../../../../../components/Backend/SideDrawer/SideDrawer";
import { getCookie } from "../../../../../Utils/GetCookies";

let initialState = {
  msg: "Init",
  counterDelay: 1000, // 1 sec
  beginningCount: 35,

  beginningCounterCount: 10,
  // beginningCounterText: '10',
  recordingCounterCount: 1,
  recordingCounterText: "01",
  isStatusBeginning: true,
  isStatusRecording: false,

  stoppedBeginInterval: false,
  stoppedRecordInterval: false,

  isRecording: false, //false
  isFinish: false,
  blobURL: "",
  blob: null,
  isBlocked: false,
  page: 1,
  dPrev: false,
  dNext: false,
  answer: false,
  answerLoading: false,
  overall_result: [],
  btn_disable: true,
  selectedFile: null,
  audio: new Audio("https://pteadmin.smartedumm.com/beep-01a.mp3"),
};
const TestSCAns = () => {
  const { postsByPage, loading, status } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  let postPath = "listening_test/smc";
  const backendURL = "https://ptebackend.aigma.com.au/admin/";

  //State
  const [state, setState] = useState(initialState);

  const [check1, setCheck1] = useState(0);
  const [check2, setCheck2] = useState(0);
  const [check3, setCheck3] = useState(0);
  const [check4, setCheck4] = useState(0);
  const [checkArray, setCheckArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [beginningCounterCount, setBeginningCounterCount] = useState(7);
  let [stoppedBeginInterval, setStoppedBeginInterval] = useState(false);

  //  const [stoppedRecordInterval,setStoppedRecordInterval] = useState(true);
  // const [blobUrl, setBlobUrl] = useState("");
  const [answer, setAnswer] = useState(false);
  const [overall_result, setOverallResult] = useState([]);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [errorStore, setErrorStore] = useState(false);
  const [errorScore, setErrorScore] = useState(false);

  // let [isBlocked, setIsBlocking] = useState(false);
  let [isStatusBeginning, setIsStatusBeginning] = useState(true);
  // let [isStatusRecording, setIsStatusRecording] = useState(false);
  let [totalPage, setTotalPage] = useState("");
  let [pagePaginate, setPagePaginate] = useState([]);
  let [content, setContent] = useState("");
  let [playAudio, setPlayAudio] = useState(
    new Audio("https://pteadmin.smartedumm.com/beep-01a.mp3")
  );
  let [isPlayingStatus, setIsPlayingStatus] = useState(true);
  let [currentAudio, setCurrentAudio] = useState(0);
  let [isPlaying, setIsPlaying] = useState(false);
  const [playingCounterCount, setplayingCounterCount] = useState(5);
  let [stoppedPlayingInterval, setStoppedPlayingInterval] = useState(false);
  let [playingStatus, setPlayingStatus] = useState(true);

  let [audio, setAudio] = useState(
    new Audio("https://pteadmin.smartedumm.com/beep-01a.mp3")
  );

  let [isFinish, setIsFinish] = useState(false);

  const [page, setPage] = useState(1);

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
      setCurrentPage(postsByPage.data.current_page);
      setCheckArray(postsByPage.data.data[0].mul_choices);
      setContent(postsByPage.data.data[0].content);
    }
  }, [setPagePaginate, postsByPage, totalPage]);

  //get page data
  useEffect(() => {
    dispatch(fetchPostsByPageAsync({ path: postPath, page: page }));
  }, [dispatch, postPath, page, setPage]);

  //start playing counter count
  useEffect(() => {
    if (postsByPage.data !== undefined && loading === false) {
      let interval = playingInterval(stoppedPlayingInterval);
      return () => clearInterval(interval);
    }
  }, [playingCounterCount, postsByPage, stoppedPlayingInterval, page, loading]);

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
      setPlayAudio(new Audio(postsByPage.data.data[0].media));

      // setState({})
      //   start();//another stop & state changes
    }
  }, [playingCounterCount, page]);

  //start audio play
  useEffect(() => {
    if (stoppedPlayingInterval) {
      setIsPlaying(true);
      const playAudiofun = () => {
        playAudio.play();
        playAudio.onended = () => {
          setPlayingStatus(false);
          setIsPlaying(false);
        };
      };
      playAudiofun();
      return () => {
        playAudio.pause();
      };
    }
  }, [stoppedPlayingInterval, playAudio, page]);

  let controller = new AbortController();
  //upload & get score
  let upload = async () => {
    setAnswerLoading(true);

    var formData = new FormData();

    formData.append("audio", "tmp.mp3");

    try {
      const res = await axios.post(`${backendURL}recording`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        try {
          const res_score = await axios.post(
            `${backendURL}score/${postsByPage.data.data[0].post_id}`,
            { url: res.data.url },
            { signal: controller.signal }
          );

          if (res_score.status === 200) {
            let res_array = JSON.parse(res_score.data["response"]);
            const overall_result = res_array[1].overall_result_data[0];

            setAnswer(true);
            setOverallResult(overall_result);
            setAnswerLoading(false);

            // Store data in our db
            let token = await getCookie("userToken");
            if (!token) this.props.navigate("/login");
            else {
              let config = { headers: { Authorization: "Bearer " + token } };
              try {
                const res_store = await axios.post(
                  `${backendURL}scores-ra`,
                  {
                    ...overall_result,
                    ...{
                      post_id: postsByPage.data.data[0].post_id,
                      category: "ra",
                      user_id: user.data.id,
                    },
                  },
                  config
                );
              } catch (error) {
                setErrorStore(true);
                alert("Store result error please retake the exam");
              }
            }
          } else {
            alert(res.status);
            setAnswerLoading(false);
          }
        } catch (error) {
          setErrorScore(true);
          setAnswerLoading(false);
        }
      }
    } catch (error) {
      alert(error.toJSON().message);
      setAnswerLoading(false);
      setErrorUpload(true);
    }
  };

  //reset state for nxt & prev
  let reset = () => {
    setIsFinish(false);
    setState({ isRecording: false });
    setAnswerLoading(false);
    setAnswer(false);
    setCheck1(0);
    setCheck2(0);
    setCheck3(0);
    setCheck4(0);

    setErrorUpload(false);
    setErrorStore(false);
    setErrorScore(false);
    setStoppedPlayingInterval(false);
    setIsStatusBeginning(false);
    setPlayingStatus(true);
    setplayingCounterCount(3);
    setIsPlaying(false);
  };

  let next = () => {
    reset();
    setPage(page * 1 + 1);
    // dispatch(fetchPostsByPageAsync);
  };

  let prev = () => {
    // dispatch(resetPostsByPage);
    reset();
    setPage(page - 1);
    // dispatch(fetchPostsByPageAsync);
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
          selected={page === item ? true : false}
          style={{ textAlign: "center", marginLeft: "0.5rem" }}
        >
          {item}/{totalPage}
        </option>
      );
    });
  }

  let playPause = () => {
    let currentPlaying = true;
    // Get state of song
    currentPlaying = isPlayingStatus;

    if (playAudio.currentTime >= playAudio.duration) {
      currentPlaying = false;
    }

    if (currentPlaying) {
      // Pause the song if it is playing
      playAudio.pause();
    } else {
      // Play the song if it is paused
      playAudio.play();
    }
    setIsPlayingStatus(!isPlayingStatus);

    // Change the state of song
    // this.setState({ isPlaying: !isPlaying });
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = playAudio.currentTime;
      // setCurrentTime(newTime);
      setCurrentAudio(newTime);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [playAudio.currentTime, playAudio]);

  // get user ans:
  let ansValue = [];
  let x = () => {
    ansValue = [];
    ansValue.push(check1, check2, check3, check4);

    alert(ansValue);
  };

  //handleChange
  const handleChange1 = () => {
    if (check1 === 0) {
      setCheck1(1);
    } else {
      setCheck1(0);
    }
  };
  const handleChange2 = () => {
    if (check2 === 0) {
      setCheck2(1);
    } else {
      setCheck2(0);
    }
  };
  const handleChange3 = () => {
    if (check3 === 0) {
      setCheck3(1);
    } else {
      setCheck3(0);
    }
  };
  const handleChange4 = () => {
    if (check4 === 0) {
      setCheck4(1);
    } else {
      setCheck4(0);
    }
  };

  return (
    <>
      <SwipeableSideDrawer
        category={"mc"}
        setPost={setPage}
        reset={reset}
        status={status}
        currentPage={currentPage}
      />
      <Box id="main" sx={{ width: "100%", p: 2 }}>
        <Box
          sx={{
            ml: "0.5rem",
            top: "1rem",
            position: "absolute",
            overflow: "visible",
            zIndex: 1500,
          }}
        >
          <Typography variant="h5" sx={{ ml: 1 }}>
            Multiple Choice
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1.5,
            ml: "1rem",
          }}
        >
          <Typography variant="h5">Test</Typography>
          <Box className="container-fluid">
            <div className="card">
              <Link
                style={{
                  textDecoration: "none",

                  display: "flex",
                }}
                to={"/admin/listening"}
              >
                <Button
                  variant="contained"
                  // onClick={() => navigate("/admin/speaking")}

                  sx={{
                    bgcolor: "#2196f3",

                    "&:hover": {
                      bgcolor: "white",
                    },
                    color: "#000",
                  }}
                >
                  <ArrowBackIcon></ArrowBackIcon> Back
                </Button>
              </Link>
            </div>
          </Box>
        </Box>

        <Box
          className="container-fluid"
          sx={{
            p: "0.5rem",
            bgcolor: "#fff",
            borderRadius: "1rem",
            boxShadow: 2,
          }}
        >
          <div className="card">
            <Typography sx={{ my: 2, fontSize: "1.2rem" }}>
              <span
                style={{
                  backgroundColor: "#4dabf5",
                  color: "white",
                  borderRadius: "0.3rem",
                  padding: "0.3rem",
                }}
              >
                LSA
                {status === "succeeded"
                  ? currentPage >= 10
                    ? currentPage
                    : "0" + currentPage
                  : "..."}
              </span>{" "}
              Listen to the recording and answer the multiple-choice question by
              selecting the correct response. Only one response is correct.
            </Typography>

            <Box sx={{ margin: "0 auto", width: "100%" }}>
              <Card sx={{ margin: "0 auto", width: "60%" }}>
                <CardHeader
                  title={
                    playingStatus ? (
                      isPlaying ? (
                        <Typography sx={{ textAlign: "center" }}>
                          Playing
                        </Typography>
                      ) : (
                        <Typography sx={{ textAlign: "center" }}>
                          Beginning in... 00:0{playingCounterCount} seconds
                        </Typography>
                      )
                    ) : (
                      <Typography sx={{ textAlign: "center" }}>
                        Finished
                      </Typography>
                    )
                  }
                />
                <hr></hr>
                <CardContent>
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
                        <Grid container spacing={2}>
                          <Grid item xs={1}>
                            <button onClick={playPause}>
                              <PauseIcon></PauseIcon>
                            </button>
                          </Grid>
                          <Grid item xs={11}>
                            <LinearProgress
                              variant="determinate"
                              sx={{
                                height: 10,
                                borderRadius: 5,
                                marginTop: "0.8rem",
                                //  display: 'inline',
                              }}
                              value={(currentAudio / playAudio.duration) * 100}
                            />
                          </Grid>
                        </Grid>
                      </>
                    )
                  ) : (
                    status === "failed" && (
                      <Typography sx={{ textAlign: "center", color: "red" }}>
                        Fail to fetch data
                      </Typography>
                    )
                  )}

                  <br></br>
                </CardContent>
              </Card>
              {/* <Card sx={{ margin: "0 auto", width: "60%" }}>
                <CardHeader
                  title={
                    isFinish ? (
                      <Typography sx={{ textAlign: "center" }}>
                        Finished
                      </Typography>
                    ) : (
                      <Typography sx={{ textAlign: "center" }}>
                        Beginning in 00:
                        {beginningCounterCount < 10
                          ? "0" + beginningCounterCount
                          : beginningCounterCount}{" "}
                        seconds
                      </Typography>
                    )
                  }
                />
                <hr></hr>
              </Card> */}

              <Box sx={{ margin: "0 auto", width: "100%", py: 4 }}>
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
                          {content}
                        </Typography>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                className="check test"
                                value={check1}
                                onChange={handleChange1}
                              />
                            }
                            label={checkArray[0].name}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                className="check"
                                value={check2}
                                onChange={handleChange2}
                              />
                            }
                            label={checkArray[1].name}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                className="check"
                                value={check3}
                                onChange={handleChange3}
                              />
                            }
                            label={checkArray[2].name}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                className="check"
                                value={check4}
                                onChange={handleChange4}
                              />
                            }
                            label={checkArray[3].name}
                          />
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
            </Box>
          </div>
        </Box>
        <Box>
          <Button variant="contained" onClick={x}>
            Check input
          </Button>
        </Box>
        <P
          submit={upload}
          next={next}
          prev={prev}
          option={option}
          goToPage={goToPage}
          category={"ra"}
          page={page}
          disableReset={status === "succeeded" ? false : true}
          disableSubmit={
            status === "succeeded"
              ? !isFinish ||
                answerLoading ||
                retry ||
                errorScore ||
                errorStore ||
                errorUpload
                ? true
                : false
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
        />

        {answerLoading && (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <CircularProgress />
          </Box>
        )}

        {(errorUpload || errorStore || errorScore) && (
          <>
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <Typography sx={{ textAlign: "center", color: "red", p: 2 }}>
                Something went wrong.Please retake test after checking your
                Internet and Mic .
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right", mt: 3 }}>
              <Button variant="contained" onClick={() => reset()}>
                Retake
              </Button>
            </Box>
          </>
        )}

        {answer ? (
          <>
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
                    Pronunciation
                  </h3>
                  <CircularProgressbar
                    value={overall_result.number_of_recognized_words}
                    maxValue={overall_result.number_of_words_in_post}
                    text={`${overall_result.number_of_recognized_words}/${overall_result.number_of_words_in_post}`}
                  />
                </Box>

                <Box sx={{ width: "10%", margin: "0 auto" }}>
                  <h3
                    style={{ whiteSpace: "nowrap", textAlign: "center", my: 2 }}
                  >
                    Fluency
                  </h3>
                  <CircularProgressbar
                    value={
                      (overall_result.number_of_recognized_words * 40) /
                      overall_result.length_of_recording_in_sec
                    }
                    maxValue={
                      (overall_result.number_of_words_in_post * 40) / 40
                    }
                    text={(overall_result.number_of_words_in_post * 40) / 40}
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
                </Box>
                <br />
              </Box>
            </Box>
          </>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default TestSCAns;
