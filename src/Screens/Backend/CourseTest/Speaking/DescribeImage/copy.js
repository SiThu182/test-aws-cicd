import { Box, Button, LinearProgress, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import { RecordRTCPromisesHandler } from "recordrtc";

import { fetchPostsByPageAsync } from "../../../../redux/thunk/Posts";
import { getCookie } from "../../../../../Utils/GetCookies";

let initialState = {
  msg: "Init",
  counterDelay: 1000, // 1 sec
  beginningCount: 35,
  recordingCount: 37,
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
const TestDI = () => {
  const { postsByPage, loading, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  let postPath = "get-test-post-di";
  const backendURL = "https://ptebackend.aigma.com.au/admin/";

  //State
  const [state, setState] = useState(initialState);
  let [recorder, setRecorder] = useState();
  const [beginningCounterCount, setBeginningCounterCount] = useState(25);
  let [stoppedBeginInterval, setStoppedBeginInterval] = useState(false);
  const [recordingCounterCount, setRecordingCounterCount] = useState(0);
  const [stoppedRecordInterval, setStoppedRecordInterval] = useState(false);
  const [blobUrl, setBlobUrl] = useState("");
  const [answer, setAnswer] = useState(false);
  const [overall_result, setOverallResult] = useState([]);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [errorStore, setErrorStore] = useState(false);
  const [errorScore, setErrorScore] = useState(false);

  let [isBlocked, setIsBlocking] = useState(false);
  let [isStatusBeginning, setIsStatusBeginning] = useState(false);
  let [isStatusRecording, setIsStatusRecording] = useState(false);
  let [audio, setAudio] = useState(
    new Audio("https://pteadmin.smartedumm.com/beep-01a.mp3")
  );
  let [isFinish, setIsFinish] = useState(false);
  let [page, setPage] = useState(1);
  const [blob, setBlob] = useState("");
  let [totalPage, setTotalPage] = useState("");
  let [pagePaginate, setPagePaginate] = useState([]);

  //get post
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
    }
  }, [setPagePaginate, postsByPage, totalPage]);

  //start begin interval
  useEffect(() => {
    //begin interval
    let beginInterval = (flag) => {
      if (!flag) {
        const interval = setInterval(() => {
          setBeginningCounterCount((prevBegin) => prevBegin - 1);
        }, 1000);
        return interval;
      }
    };
    if (postsByPage.data !== undefined && loading === false) {
      setIsStatusBeginning(true);
      let interval = beginInterval(stoppedBeginInterval);

      return () => clearInterval(interval);
    }
  }, [
    stoppedBeginInterval,
    isStatusBeginning,
    postsByPage,
    beginningCounterCount,
    loading,
  ]);

  //stop begin interval
  useEffect(() => {
    let start = () => {
      setIsStatusBeginning(false);
      setIsStatusRecording(true);
      audio.play();
      if (state.isRecording) {
        return;
      }
      if (isBlocked) {
      } else {
        let recordingIncrement;
        recorder.startRecording();
        setState({ isRecording: true, recordingCounterCount: 1 });
        let recordingInterval = setInterval(
          recordingIncrement,
          state.counterDelay
        );
        setStoppedRecordInterval(false);
        // setStatus(true)
        setStoppedBeginInterval(true);
      }
    };
    if (beginningCounterCount < 1) {
      setStoppedBeginInterval(true);
      start();
    }
  }, [
    beginningCounterCount.isBlocked,
    recorder,
    audio,
    beginningCounterCount,
    isBlocked,
    state,
    stoppedBeginInterval,
    stoppedRecordInterval,
  ]);

  //Record start
  useEffect(() => {
    if (stoppedBeginInterval) {
      let recordInterval = (flag) => {
        if (!flag) {
          const interval = setInterval(() => {
            setRecordingCounterCount((preCount) => preCount + 1);
          }, 1000);
          return interval;
        }
      };
      let interval = recordInterval(stoppedRecordInterval);

      return () => clearInterval(interval);
    }
  }, [stoppedRecordInterval, stoppedBeginInterval, recordingCounterCount]);

  //stop record
  useEffect(() => {
    // save audio
    let save_audio = async () => {
      await recorder.stopRecording();

      let blob = await recorder.getBlob();
      // this.setState({msg:'stop recording'})
      const blobURL = URL.createObjectURL(blob);
      setBlobUrl(blobURL);
      setBlob(blob);
      setIsFinish(true);
    };
    let recordingCount = 40;
    if (recordingCounterCount === recordingCount) {
      // setState({})
      setStoppedRecordInterval(true);
      save_audio();
    }
  }, [recordingCounterCount, recorder]);

  //record end

  //check permission
  useEffect(() => {
    async function checkAudioPermission() {
      try {
        let stream = await navigator.mediaDevices.getUserMedia(
          { audio: true },
          () => {
            setIsBlocking(false);
          },
          () => {
            setIsBlocking(true);
          }
        );

        setRecorder(new RecordRTCPromisesHandler(stream, { type: "audio" }));
        // state.audio.play();
        // counter();
        // beginInterval()
      } catch (error) {
        console.error("Error checking audio permission:", error);
      }
    }

    checkAudioPermission();
  }, []);

  let controller = new AbortController();
  //upload & get score
  let upload = async () => {
    setAnswerLoading(true);

    var formData = new FormData();

    formData.append("audio", blob, "tmp.mp3");

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
                  `${backendURL}scores-di`,
                  {
                    ...overall_result,
                    ...{
                      post_id: postsByPage.data.data[0].post_id,
                      category: "di",
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

  let skip = () => {
    setBeginningCounterCount(0);
  };
  let finish = () => {
    setRecordingCounterCount(40);
  };

  let reset = () => {
    if (stoppedBeginInterval === true && stoppedRecordInterval === false) {
      recorder.stopRecording();
    }
    setIsFinish(false);
    setState({ isRecording: false });
    setAnswerLoading(false);
    setAnswer(false);

    setStoppedBeginInterval(false);
    setErrorUpload(false);
    setErrorStore(false);
    setErrorScore(false);
    setStoppedRecordInterval(false);
    setBeginningCounterCount(25);
    setRecordingCounterCount(0);
    setIsStatusBeginning(false);
    setIsStatusRecording(false);
  };
  let next = () => {
    reset();
    setPage(page + 1);
  };

  let prev = () => {
    setPage(page - 1);
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

  return (
    <>
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
            Describe Image
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
        </Box>

        <Box
          className="container-fluid"
          sx={{ p: "0.1rem", bgcolor: "#fff", borderRadius: "1rem" }}
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
                DI
                {status === "succeeded"
                  ? postsByPage.data.current_page >= 10
                    ? postsByPage.data.current_page
                    : "0" + postsByPage.data.current_page
                  : "..."}
              </span>{" "}
              Look at the graph below. In 25 seconds, please speak into the
              microphone and describe in detail what the graph is showing. You
              will have 40 seconds to give your response.
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box sx={{ margin: "0 auto", height: "50vh", py: 1 }}>
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
                    postsByPage.data && (
                      <img
                        alt="PTE_TEST_img"
                        src={postsByPage.data.data[0].media}
                        style={{
                          backgroundColor: "#000",
                          height: "100%",
                          width: "100%",
                          marginLeft: "1rem",
                        }}
                      />
                    )
                  )
                ) : (
                  <Typography sx={{ color: "red", textAlign: "center" }}>
                    Fail to fetch data
                  </Typography>
                )}
              </Box>
              <Box sx={{ margin: "0 auto", width: "30%" }}>
                <Card sx={{ margin: "0 auto", width: "90%" }}>
                  <CardHeader
                    title={
                      isFinish ? (
                        <Typography sx={{ textAlign: "center" }}>
                          Finished
                        </Typography>
                      ) : state.isRecording ? (
                        <Typography sx={{ textAlign: "center" }}>
                          Recording... 00:
                          {recordingCounterCount < 10
                            ? "0" + recordingCounterCount
                            : recordingCounterCount}{" "}
                          seconds
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
                  <CardContent>
                    {state.isRecording === true && (
                      <>
                        <LinearProgress
                          variant="determinate"
                          sx={{
                            height: 10,
                            marginBottom: "1.5rem",
                            borderRadius: 5,
                          }}
                          value={(recordingCounterCount / 40) * 100}
                        />
                      </>
                    )}

                    {isFinish ? (
                      <audio
                        src={blobUrl}
                        style={{
                          width: "100%",

                          height: "1rem",
                        }}
                        controls
                      ></audio>
                    ) : state.isRecording ? (
                      <Box sx={{ textAlign: "center" }}>
                        <Button
                          variant="contained"
                          style={{ margin: "0 auto" }}
                          onClick={() => finish()}
                        >
                          Finish
                        </Button>
                      </Box>
                    ) : (
                      <Box sx={{ textAlign: "center" }}>
                        <Button
                          variant="contained"
                          style={{ margin: "0 auto" }}
                          disabled={
                            loading === false && status === "succeeded"
                              ? false
                              : true
                          }
                          onClick={() => skip()}
                        >
                          Skip
                        </Button>
                      </Box>
                    )}
                    <br></br>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </div>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
          <Box>
            <Button
              variant="contained"
              onClick={() => upload()}
              disabled={
                isFinish && !errorScore && !errorStore && !errorUpload
                  ? false
                  : true
              }
            >
              Answer
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={() => prev()}
              sx={{ mr: 1 }}
              disabled={
                status === "succeeded"
                  ? postsByPage.data.current_page === 1
                    ? true
                    : false
                  : ""
              }
            >
              Prev
            </Button>
            <select
              style={{
                marginRight: "0.5rem",
                boxShadow: "0 0 0.1rem #000",
                borderRadius: "1rem",
              }}
              onChange={(e) => goToPage(e)}
            >
              {option}
            </select>
            <Button
              variant="contained"
              disabled={
                status === "succeeded"
                  ? postsByPage.data.current_page === totalPage
                    ? true
                    : false
                  : ""
              }
              onClick={() => next()}
            >
              Next
            </Button>
          </Box>
        </Box>

        {answerLoading && (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <CircularProgress />
          </Box>
        )}

        {(errorUpload || errorStore || errorScore) && (
          <Box
            sx={{ width: "100%", textAlign: "center", backgroundColor: "#fff" }}
          >
            <Typography sx={{ textAlign: "center", color: "red" }}>
              Error please retake test after checking your Internet and Mic .
            </Typography>
          </Box>
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

export default TestDI;
