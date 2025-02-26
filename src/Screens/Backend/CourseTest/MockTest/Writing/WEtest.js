import {
  Box,
  Button,
  FormGroup,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Typo from "typo-js";

import { grammar_check } from "../../Writing/WriteEssay/GrammarCheck";

function WEtest(props) {
  let frontendURL = process.env.REACT_APP_FRONTEND_URL;
  const [timerCounterCount, setTimerCounterCount] = useState(1200);
  const [index, setIndex] = useState(0);
  const [storeData, setStoreData] = useState({
    post: [],
    score: [],
    answer: [],
  });
  let [char, setChar] = useState();
  let [wordCount, setWordCount] = useState(0);

  //spelling check
  const [dictionary, setDictionary] = useState(null);

  let mockId = useParams();
  let mockType = mockId.mt_type_id;
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

  const clickHandler = () => {
    setTimerCounterCount(0);
  };

  const reset = () => {
    let textBox = document.getElementById("weTextBox");
    textBox.value = "";
    setTimerCounterCount(1200);
  };

  const checkWord = (event) => {
    let char = event.target.value;
    const char_arr = char.split(" ");

    setChar(char);
    setWordCount(char_arr.length);
  };

  useEffect(() => {
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
  }, [timerCounterCount]);

  useEffect(() => {
    if (timerCounterCount === 120) {
      let audio = new Audio(frontendURL + "/beep.mp3");
      audio.play();
    }
  });
  useEffect(() => {
    if (timerCounterCount === 0) {
      setTimerCounterCount(1200);
      let save_score = async () => {
        let content_arr = props.wePost[index].content.split(/[ .,]+/);

        if (char !== "" && char !== undefined) {
          let char_arr = char.split(/[ .,-]+/);
          let overall_point = 0;
          var fullStopCount =
            char.match(/\./g) === null ? 0 : char.match(/\./g).length;

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
          //  setSpellCount(spellResult);

          //calculate form
          let form =
            overall_point > 200 && overall_point < 300
              ? 2
              : (overall_point > 120 && overall_point < 199) ||
                (overall_point > 301 && overall_point < 380)
              ? 1
              : 0;

          //grammar
          let grammar_point = 0;
          let sentence_arr = char.split(".");

          if (sentence_arr.length <= 1) {
            if (grammar_check(sentence_arr)) {
              grammar_point += 1;
            }
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
          }

          let grammar_percent;
          if (sentence_arr.length <= 1) {
            grammar_percent = (grammar_point / 1) * 100;
          } else {
            grammar_percent = (grammar_point / dot_with_sentence.length) * 100;
          }

          let cal_grammar_mark =
            grammar_percent > 80
              ? 2
              : grammar_percent < 80 && grammar_percent > 40
              ? 1
              : 0;

          storeData.post.push(
            props.wePost[index].id === undefined ? 123 : props.wePost[index].id
          );
          let score =
            cal_content + form + cal_grammar_mark + spellResult + spellResult;
          storeData.score.push(score);
          storeData.answer.push(char);
          setStoreData(storeData);
        } else {
          storeData.post.push(props.wePost[index].id);
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
          question_number: props.wePost.length,
        };
        localStorage.setItem("we", JSON.stringify(store));

        if (index === props.wePost.length - 1) {
          props.setWe(false);
          props.setWritingState(false);
          if (mockType !== "6") {
            props.setSectionA(false);
            props.setCounterState(true);
          }

          props.setCurrentPage(1);
        } else {
          props.setCurrentPage((prev) => prev + 1);
          setIndex((prev) => prev + 1);
          reset();
        }
      };
      save_score();
    }
  }, [timerCounterCount, char, mockType, storeData, dictionary, index, props]);

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
        <Box sx={{ backgroundColor: "rgb(231,239,254)", height: "100%" }}>
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
                You will have 20 minutes to plan, write and revise an essay
                about the topic below. Your response will be judged on how well
                you develop a position, organize your ideas, present supporting
                details, and control the elements of standard written English.
                You should write 200-300 words.
              </Typography>
            </Box>
            {/* Audio */}
            <Box
              sx={{
                width: "100%",
                height: "5vh",
                my: "0.3rem",
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

            <Box sx={{ margin: "0 auto", width: "100%", mb: 4 }}>
              <Box
                sx={{
                  p: 1,
                  backgroundColor: "whitesmoke",
                  borderRadius: "1rem",
                  boxShadow: 5,
                  height: "20vh",
                }}
              >
                <Typography variant="body5">
                  {props.wePost[index].content}
                </Typography>
              </Box>

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
                      id="weTextBox"
                      aria-label="minimum height"
                      spellCheck={false}
                      minRows={10}
                      placeholder="Write a Summary..."
                      style={{ width: "100%", fontSize: "1.2rem" }}
                      onChange={checkWord}
                    />
                  </FormGroup>
                  <Box>
                    <Typography variant="h6">
                      Word Count : {wordCount}
                    </Typography>
                  </Box>
                </Box>

                {/* {checkStatus && (
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "red",
                      marginTop: 2,
                    }}
                  >
                    *Word count contains less than 40 words or more than 100
                    words. No further scoring.
                  </Typography>
                )} */}
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
        >
          {index === props.wePost.length - 1 ? "Finish Section" : "Next"}
        </Button>
      </Box>
    </>
  );
}

export default WEtest;
