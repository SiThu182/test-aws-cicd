import {
  Box,
  Button,
  FormGroup,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Typo from "typo-js";

import { grammar_check } from "../../Writing/WriteEssay/GrammarCheck";

function SSTtest(props) {
  let frontendURL = process.env.REACT_APP_FRONTEND_URL;
  let textBox = useRef(null);
  const [timerCounterCount, setTimerCounterCount] = useState(600);
  const [counter, setCounter] = useState(false);

  const [index, setIndex] = useState(0);

  const [storeData, setStoreData] = useState({
    post: [],
    score: [],
    answer: [],
  });
  const [audio, setAudio] = useState("");
  const [beginningStatus, setBeginningStatus] = useState(true);
  let [contentArr, setContentArr] = useState();
  let [char, setChar] = useState();
  let [wordCount, setWordCount] = useState(0);

  //spelling check
  const [dictionary, setDictionary] = useState(null);

  // let [currentAudio, setCurrentAudio] = useState(0);

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
  useEffect(() => {
    const loadDictionary = async () => {
      const affData = await fetch(
        `${process.env.REACT_APP_FRONTEND_URL}/en_US.aff`
      ).then((res) => res.text());
      const wordsData = await fetch(
        `${process.env.REACT_APP_FRONTEND_URL}/en_US.aff`
      ).then((res) => res.text());
      const dictionary = new Typo("en_US", affData, wordsData);
      setDictionary(dictionary);
    };
    loadDictionary();
  }, []);

  //audio end handler
  const audioEndHandler = () => {
    setCounter(true);
    setBeginningStatus(false);
  };

  const clickHandler = () => {
    // if (index === props.sstPost.length - 1) {
    //   props.setSst(false);
    //
    //   props.setCurrentPage((prev) => prev + 1);
    // }

    setTimerCounterCount(0);
  };

  const reset = () => {
    let textBox = document.getElementById("sstTextBox");
    textBox.value = "";
    setTimerCounterCount(600);
    setBeginningStatus(true);
  };

  const checkWord = (event) => {
    let char = event.target.value;
    const char_arr = char.split(" ");

    setChar(char);
    setWordCount(char_arr.length);
  };

  useEffect(() => {
    if (props.sstPost[index].media_type === "1") {
      setAudio(props.sstPost[index].media);
    } else {
      setAudio(
        `${process.env.REACT_APP_BACKEND_URL}storage/sst/${props.sstPost[index].media}`
      );
    }
  }, [index, props, audio, props.currentPage]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (audio !== "" && audio !== undefined) {
  //       const newTime = audio.currentTime;
  //       // setCurrentTime(newTime);
  //       setCurrentAudio(newTime);
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [audio]);

  useEffect(() => {
    if (counter) {
      let beginInterval = () => {
        if (timerCounterCount !== 0) {
          const interval = setInterval(() => {
            setTimerCounterCount((prev) => prev - 1);
          }, 1000);
          return interval;
        }
      };
      let interval = beginInterval();
      return () => clearInterval(interval);
    }
  }, [timerCounterCount, counter]);

  useEffect(() => {
    if (timerCounterCount === 120) {
      let audio = new Audio(frontendURL + "/beep.mp3");
      audio.play();
    }
  });
  useEffect(() => {
    if (timerCounterCount === 0) {
      let save_score = async () => {
        if (char !== undefined && char !== "") {
          let content_arr = props.sstPost[index].content.split(/[ .,]+/);
          setContentArr(content_arr);
          let char_arr = char.split(/[ .,-]+/);

          let overall_point = 0;
          var fullStopCount =
            char.match(/\./g) === null ? 0 : char.match(/\./g).length;

          // calculate content
          char_arr.forEach((check_char) => {
            if (content_arr.includes(check_char)) {
              overall_point += 1;
            }
          });

          let content_presentage = parseInt(
            (overall_point / content_arr.length) * 100
          );

          let cal_content =
            content_presentage <= 100 && content_presentage >= 80
              ? 2
              : content_presentage < 80 && content_presentage >= 50
              ? 1
              : 0;

          //spelling check

          // filtered_array = [item for item in array if not isinstance(item, (int, float))]
          // let filteredArray = char_arr.filter(item => typeof item !== 'number');
          const rm_number_from_char_arr = char_arr.filter((item) =>
            isNaN(item)
          );

          const misspelled = rm_number_from_char_arr.filter(
            (word) => !dictionary.check(word)
          );
          let spellResult =
            misspelled.length === 0 ? 2 : misspelled.length === 1 ? 1 : 0;

          //calculate form
          let form;
          form =
            overall_point > 50 && overall_point < 70
              ? 2
              : (char_arr.length > 40 && char_arr.length < 49) ||
                (char_arr.length > 71 && char_arr.length < 100)
              ? 1
              : 0;
          //grammar
          let grammar_point = 0;
          let sentence_arr = char.split(".");

          let grammarLength = 0;
          if (sentence_arr.length <= 1) {
            if (grammar_check(sentence_arr[0])) {
              grammar_point += 1;
            }
            grammarLength = 1;
          } else {
            // add full stop each array

            var dot_with_sentence = sentence_arr.map((element, index) => {
              if (index === sentence_arr.length - 1) {
                if (char.endsWith(".")) {
                  return element.trim() + ".";
                } else {
                  return element;
                }
              } else {
                return element.trim() + ".";
              }
            });

            for (let i = 0; i < dot_with_sentence.length; i++) {
              if (grammar_check(dot_with_sentence[i])) {
                grammar_point += 1;
              }
            }
            grammarLength = dot_with_sentence.length;
          }

          let grammar_percent = (grammar_point / grammarLength) * 100;
          let cal_grammar_mark =
            grammar_percent > 80
              ? 2
              : grammar_percent < 80 && grammar_percent > 40
              ? 1
              : 0;
          let score = cal_content + form + cal_grammar_mark + form + form;
          storeData.post.push(props.sstPost[index].id);
          storeData.score.push(score);
          storeData.answer.push(char);
          setStoreData(storeData);
        } else {
          storeData.post.push(props.sstPost[index].id);
          storeData.score.push(0);
          storeData.answer.push("");
          setStoreData(storeData);
        }
        let post = storeData.post.toString();
        let score = storeData.score.toString();
        let answer = JSON.stringify(storeData.answer);
        let store = {
          post: post,
          score: score,
          answer: answer,
          question_number: props.sstPost.length,
        };
        localStorage.setItem("sst", JSON.stringify(store));

        if (index === props.sstPost.length - 1) {
          props.setSst(false);
        }

        props.setCurrentPage((prev) => prev + 1);
        setIndex((prev) => prev + 1);
        reset();
      };
      save_score();
    }
  }, [
    timerCounterCount,
    char,
    contentArr,
    storeData,
    dictionary,
    index,
    props,
  ]);

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
              Read the passage below and summarize it using one senetence. Type
              your response in the box at the bottom of the screen. You have 10
              minutes to finish this task. Your response will be judged on the
              quality of your writing and on how well your response present the
              key points in the passage.
            </Typography>
          </Box>
          {/* Audio */}
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
                    disabled
                    id="audio"
                    src={audio}
                    onEnded={() => audioEndHandler()}
                    preload="metadata"
                    autoPlay
                  ></audio>
                </Button>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "5vh",

              mx: "auto",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Box>
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
            </Box>
          </Box>

          <Box sx={{ margin: "0 auto", width: "100%" }}>
            {/* <Box
              sx={{
                p: 1,
                backgroundColor: "whitesmoke",
                borderRadius: "1rem",
                boxShadow: 5,
              }}
            >
              <Typography variant="body5">
                {props.sstPost[index].content}
              </Typography>
            </Box> */}

            <Box sx={{ margin: "0 auto", width: "100%", py: 2 }}>
              <Box
                sx={{
                  width: "100%",
                  margin: "0 auto",

                  borderRadius: "0.5rem",
                  padding: 1,
                  boxShadow: 1,
                }}
              >
                {/* <Typography sx={{ my: 2, fontSize: "1.2rem" }}>
                          {content}
                        </Typography> */}
                <FormGroup>
                  <TextareaAutosize
                    id="sstTextBox"
                    spellCheck={false}
                    ref={textBox}
                    aria-label="minimum height"
                    minRows={5}
                    placeholder="Write a Summary..."
                    style={{ width: "100%", fontSize: "1.2rem" }}
                    onChange={checkWord}
                  />
                </FormGroup>
                <Box>
                  <Typography variant="h6">Word Count : {wordCount}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          mt: 5,
          pb: 2,
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          sx={{ mr: "1rem", mb: "1rem" }}
          onClick={clickHandler}
          // disabled={beginningStatus}
        >
          Next
        </Button>
      </Box>
    </>
  );
}

export default SSTtest;
