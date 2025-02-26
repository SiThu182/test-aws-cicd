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

function WFDtest(props) {
  //   const [timerCounterCount, setTimerCounterCount] = useState(600);
  //   const [counter, setCounter] = useState(false);

  const [index, setIndex] = useState(0);
  const [next, setNext] = useState(false);
  const [storeData, setStoreData] = useState({
    post: [],
    score: [],
    answer: [],
  });
  // const [checkArray, setCheckArray] = useState([]);
  const [audio, setAudio] = useState();
  const [beginningStatus, setBeginningStatus] = useState(true);

  let [char, setChar] = useState();
  let [wordCount, setWordCount] = useState(0);

  let [showWord, setShowWord] = useState([]);

  //spelling check
  const [dictionary, setDictionary] = useState(null);
  let mockId = useParams();
  let mockType = mockId.mt_type_id;

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

  
  const clickHandler = () => {
    setNext(true);
  };

  const checkWord = (event) => {
    let char = event.target.value;
    const char_arr = char.split(" ");
    setChar(char);
    setWordCount(char_arr.length);
  };

  useEffect(() => {
    // setCheckArray(props.wfdPost[index].mul_choices);
    if (props.wfdPost[index].media_type === "1") {
      setAudio(props.wfdPost[index].media);
    } else {
      setAudio(
        `${process.env.REACT_APP_BACKEND_URL}storage/wfd/${props.wfdPost[index].media}`
      );
    }
  }, [index, props]);

  useEffect(() => {
    if (next) {
      let save_score = async () => {
        let content_arr = props.wfdPost[index].content.split(" ");

        if (char !== "" && char !== undefined) {
          let char_arr = char.split(" ");
          let overall_point = 0;

          content_arr.forEach((check_char) => {
            if (char_arr.includes(check_char)) {
              // showWord.push({ name: check_char, color: "#16A085" }); // This would mutate the state, which is not allowed
              // setShowWord(showWord);
              // setCount((prevtotalCount) => prevtotalCount + 1);
              overall_point += 1;
            } else {
              // showWord.push({ name: check_char, color: "#F21F21" }); // This would mutate the state, which is not allowed
              setShowWord(showWord);
            }
          });
          let content_presentage = (overall_point / content_arr.length) * 100;

          let content;
          switch (true) {
            case content_presentage > 85:
              content = 12;

              break;

            case content_presentage > 70 && content_presentage <= 85:
              content = 11;

              break;

            case content_presentage > 50 && content_presentage <= 70:
              content = 9;

              break;

            case content_presentage > 30 && content_presentage <= 50:
              content = 6;

              break;

            case content_presentage <= 30 && content_presentage > 10:
              content = 3;

              break;

            default:
              content = 0;

              break;
          }
          storeData.post.push(props.wfdPost[index].id);
          storeData.score.push(content);
          storeData.answer.push(char);
          setStoreData(storeData);
          //
        } else {
          storeData.post.push(props.wfdPost[index].id);
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
          question_number: props.wfdPost.length,
        };
        localStorage.setItem("wfd", JSON.stringify(store));
        let textBox = document.getElementById("wfdTextBox");
        textBox.value = "";

        if (index === props.wfdPost.length - 1) {
          props.setWfd(false);
          props.setListeningState(false);
          if (mockType !== "5") {
            props.setSectionC(false);
            props.setCounterState(true);
          }
        }

        props.setCurrentPage((prev) => prev + 1);
        setIndex((prev) => prev + 1);
      };
      save_score();
      setNext(false);
      setBeginningStatus(true);
    }
  }, [next, storeData, char, mockType, showWord, dictionary, index, props]);

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
                You will hear a sentence.Type the sentence in the box below
                exactly as you heard it.Write as much of the sentence as you
                can.You will hear the sentence only once.
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
                      preload="metadata"
                      onEnded={() => setBeginningStatus(false)}
                      autoPlay
                    ></audio>
                  </Button>
                </Box>
              )}
            </Box>

            <Box sx={{ margin: "0 auto", width: "100%", mb: 4 }}>
              {/* <Box
                sx={{
                  p: 1,
                  backgroundColor: "whitesmoke",
                  borderRadius: "1rem",
                  boxShadow: 5,
                }}
              >
                <Typography variant="body5">
                  {props.wfdPost[index].content}
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
                      id="wfdTextBox"
                      spellCheck={false}
                      aria-label="minimum height"
                      minRows={5}
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
          disabled={beginningStatus}
        >
          Next
        </Button>
      </Box>
    </>
  );
}

export default WFDtest;
