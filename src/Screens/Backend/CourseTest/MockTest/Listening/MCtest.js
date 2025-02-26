// import { Box, Button, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useEffect } from "react";

// import { RecordRTCPromisesHandler } from "recordrtc";

function MCtest(props) {
  const audioRef = useRef();
  const [countTotalAnswerState, setCountTotalAnswerState] = useState(true);
  const [checkArray, setCheckArray] = useState([]);
  const [index, setIndex] = useState(0);
  const [minusCount, setMinusCount] = useState(0);
  let [count, setCount] = useState(0);
  // let [totalCount, setTotalCount] = useState(0);
  //   let [finalCount, setFinalCount] = useState(0);
  const [storeData, setStoreData] = useState({
    post: [],
    score: [],
    totalPoint: [],
    answer: [],
  });
  //   let [count, setCount] = useState(0);
  const [checkedState, setCheckedState] = useState("");
  const [check, setCheck] = useState(false);
  let [content, setContent] = useState("");
  const [audio, setAudio] = useState();
  let [ans, setAns] = useState("");
  let [answer, setAnswer] = useState(false);
  const [beginningStatus, setBeginningStatus] = useState(true);

  //check permission
  useEffect(() => {
    async function checkAudioPermission() {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => console.log("accepted audio permission"))
        .catch((err) => {
          alert(err + " ,Please allow audio permission");
          checkAudioPermission();
        });
    }

    checkAudioPermission();
    //  beginInterval()
    //  return () => clearInterval(timer)
  }, []);

  const clickHandler = () => {
    checkArray.forEach((c) => {
      if (c.isCorrect === 1) {
        // setTotalCount((prevtotalCount) => prevtotalCount + 1);//for total
      }
    });
    setAns(checkedState);
    setCheck(true);
   
  };

  //check
  useEffect(() => {
    if (ans !== "" && ans.length !== undefined && ans.length !== 0 && check) {
      //check correct count
      setCount(0);
      setMinusCount(0);

      checkArray.map((c, index) => {
        return c.isCorrect === 1 && ans[index] === true
          ? setCount((prevCount) => prevCount + 1)
          : 
            "";
      });

      //check minus count
      checkArray.map((c, index) => {
        return ans[index] === true && c.isCorrect !== 1
          ? setMinusCount((prevMinusCount) => prevMinusCount + 1)
          : "";
      });
    }
    setAnswer(true);
  }, [ans, checkArray, check]);

  //final score
  useEffect(() => {
    if (answer === true && check) {
      storeData.post.push(props.mcPost[index].id);
      //for user answers
      storeData.answer.push(ans);
      storeData.score.push(count - minusCount < 0 ? 0 : count - minusCount);

      setStoreData(storeData);
      let post = storeData.post.toString();
      let score = storeData.score.toString();
      let totalPoint = storeData.totalPoint.toString();
      let answer = JSON.stringify(storeData.answer);
      let store = {
        post: post,
        score: score,
        total_point: totalPoint,
        answer: answer,
        question_number: props.mcPost.length,
      };
      localStorage.setItem("mc", JSON.stringify(store));
      //   setFinalCount(count - minusCount < 0 ? 0 : count - minusCount);
      if (index === props.mcPost.length - 1) {
        props.setMc(false);
      }

      props.setCurrentPage((prev) => prev + 1);
      setIndex((prev) => prev + 1);

      setAnswer(false);
      setCheck(false);
      setAns("");
      setBeginningStatus(true);
    }
  }, [answer, storeData, index, props, check, count, minusCount, ans]);

  //count  total number of true answer in each post will only run once
  useEffect(() => {
    if (countTotalAnswerState) {
      props.mcPost.forEach((p, i) => {
        let correctCount = 0;
        p.mul_choices.forEach((c) => {
          if (c.isCorrect == 1) {
            correctCount += 1;
          }
        });
        storeData.totalPoint[i] = correctCount;
        setStoreData(storeData);
      });

      setCountTotalAnswerState(false);
    }
  }, [countTotalAnswerState, props.mcPost, storeData]);

  //audio
  useEffect(() => {
    if (props.mcPost !== undefined) {
      setAns("");
      setCheck(false);
      setAnswer(false);
      setCheckArray(props.mcPost[index].mul_choices);
      setContent(props.mcPost[index].content);
      setCheckedState(
        new Array(props.mcPost[index].mul_choices.length).fill(false)
      );
      setAudio("");

      if (props.mcPost[index].media_type === "1") {
        setAudio(props.mcPost[index].media);
      } else {
        setAudio(
          `${process.env.REACT_APP_BACKEND_URL}storage/mc/${props.mcPost[index].media}`
        );
      }
    }
  }, [props.mcPost, index, audio]);

  const handleCheckedState = (i) => {
    let updateState = checkedState.map((item, index) => {
      return index === i ? !item : item;
    });
    setCheckedState(updateState);
  };

  return (
    <>
      <Box
        sx={{
          mt: "2rem",
          px: {
            xs: 2,
            sm: 5,
            md: 10,
            lg: "10rem",
            xl: "20rem",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "2rem",
            p: 2,
            boxShadow: 5,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography variant="body5">
              Listen to the recording and answer the question by selecting all
              the correct responses. You will need to select more than one
              response.
            </Typography>
          </Box>
          {/* Audio */}
          <Box>
            {audio !== "" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: {
                      md: "30%",
                      sm: "50%",
                      xs: "100%",
                    },
                    boxShadow: 5,
                  }}
                  disabled={true}
                >
                  <audio
                    controls
                    ref={audioRef}
                    disabled
                    id="audio"
                    src={audio}
                    onEnded={() => setBeginningStatus(false)}
                    preload="metadata"
                    autoPlay
                  ></audio>
                </Button>
              </Box>
            )}
          </Box>

          <Box>
            {checkArray !== undefined && checkArray.length !== 0 && (
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
                              // backgroundColor:
                              //   checkBg[index] === 1 ? "yellow" : "",
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
                            label={c.name}
                          />
                        );
                      })}
                  </FormGroup>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          mt: 5,
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          sx={{ mr: "1rem", mb: "1rem" }}
          onClick={clickHandler}
          disabled={beginningStatus}
        >
          Next
        </Button>
      </Box>
    </>
  );
}

export default MCtest;
