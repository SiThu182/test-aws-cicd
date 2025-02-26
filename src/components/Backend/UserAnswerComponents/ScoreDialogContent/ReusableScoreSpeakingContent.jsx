import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { DataForRaAnswerContext } from "../../../../Screens/Backend/CourseTest/Speaking/ReadAloud/Test";
import { DataForDiAnswerContext } from "../../../../Screens/Backend/CourseTest/Speaking/DescribeImage/Test";
import { DataForReusableSpeakingComponent } from "../../../../Screens/Backend/CourseTest/Speaking/ReusableComponent";

import { CalculatorScore } from "../../../../Screens/Backend/CourseTest/Speaking/CalculatorScore";

function ReusableScoreSpeakingContent({
  points,
  overallPoint,
  rec_duration,
  keyword_length,
  category,
  userAnswer,
}) {
  let [showWord, setShowWord] = useState([]);
  let [cleanState, setCleanState] = useState(true);
  const [content, setContent] = useState(0);
  const [fluency, setFluency] = useState(0);
  const [pronunciation, setPronunciation] = useState(0);
  const raAnswerContent = useContext(DataForRaAnswerContext);
  const diAnswerContent = useContext(DataForDiAnswerContext);
  const reusableAnswerContent = useContext(DataForReusableSpeakingComponent);

  useEffect(() => {
    if (
      ((category === "ra" &&
        raAnswerContent !== null &&
        raAnswerContent !== undefined) ||
        (category === "di" &&
          diAnswerContent !== null &&
          diAnswerContent !== undefined) ||
        (category !== "ra" &&
          category !== "di" &&
          reusableAnswerContent !== null &&
          reusableAnswerContent !== undefined)) &&
      userAnswer !== null &&
      userAnswer !== undefined &&
      cleanState
    ) {
      setCleanState(false);
      let content =
        category === "ra"
          ? raAnswerContent
          : category === "di"
          ? diAnswerContent
          : reusableAnswerContent;
      if (points === null) {
        let result = CalculatorScore(
          content,
          userAnswer,
          rec_duration,
          category,
          null,
          keyword_length
        );
        setContent(
          category === "asq"
            ? result.category
            : result.content_ninety < 10
            ? 10
            : result.content_ninety
        );
        setFluency(result.fluency_ninety < 10 ? 10 : result.fluency_ninety);
        setPronunciation(
          result.pronunciation_ninety < 10 ? 10 : result.pronunciation_ninety
        );
      }

      let content_arr = content
        .split(/[(),\s]+/)
        .filter(Boolean)
        .map((content) => content.replace(/\./g, "").trim());
      let char_arr = userAnswer
        .split(/[(),\s]+/)
        .filter(Boolean)
        .map((user_recognize_words) =>
          user_recognize_words.replace(/\./g, "").trim()
        );
      let lowercase_content_arr = content_arr.map((content) =>
        content.toLowerCase()
      );
      let lowercase_char_arr = char_arr.map((char) => char.toLowerCase());
      let word = [];
      lowercase_content_arr.forEach((check_char, index) => {
        if (lowercase_char_arr.includes(check_char)) {
          let indexToRemove = lowercase_char_arr.findIndex((item) =>
            item.includes(check_char)
          );
          lowercase_char_arr.splice(indexToRemove, 1);
          word.push({ name: check_char, color: "#16A085" });
          setShowWord(word);
        } else {
          word.push({ name: check_char, color: "#F21F21" });
          setShowWord(word);
        }
      });
    }
  }, [
    raAnswerContent,
    keyword_length,
    points,
    rec_duration,
    userAnswer,
    cleanState,
    category,
    diAnswerContent,
    reusableAnswerContent,
  ]);

  const BoxLayout = ({ points, content }) => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          p: 1,
          borderBottom: content === "pronunciation" ? "" : "2px solid gray",
        }}
      >
        <Box
          sx={{
            width: "30%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "5rem",
              mr: 2,
            }}
          >
            <CircularProgressbar
              style={{ width: "5rem" }}
              value={points.toFixed(0)}
              maxValue={content === "content" && category === "asq" ? 1 : 90}
              text={`${points.toFixed(0)}/${
                content === "content" && category === "asq" ? 1 : 90
              }`}
            />
            <Typography sx={{ textAlign: "center" }}> {content}</Typography>
          </Box>

          {/* <CircularProgress
            value={points}
            maxValue={maxValue}
            text={`${points}/2`}
          ></CircularProgress> */}
        </Box>
        <span
          style={{ width: "2px", height: "100%", backgroundColor: "red" }}
        ></span>
        <Box sx={{ width: "70%", fontWeight: "600" }}>
          {category !== "asq" ? (
            content === "content" ? (
              points >= 70 ? (
                <Box
                  sx={{
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                    ml: 2,
                  }}
                >
                  <Typography variant="h6">
                    Your content is great ! . Keep it up.
                  </Typography>
                </Box>
              ) : points >= 30 ? (
                <Box sx={{ ml: 2 }}>
                  <Typography>To ensure a good score in the content</Typography>
                  <ol>
                    <li>Not leaving out any words </li>
                    <li>No replacing the words</li>
                    <li>Speak clearly </li>
                    {/* <li>Seek help at Telegram (t.me/aigmapteai)</li> */}
                  </ol>
                </Box>
              ) : (
                <Box sx={{ ml: 2 }}>
                  <Typography>
                    A low score in the content may be caused by:lose scoring for
                    leaving out words, replacing words in the text with new
                    ones, or inserting new ones.
                  </Typography>
                </Box>
              )
            ) : content === "fluency" ? (
              points >= 70 ? (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    ml: 2,
                  }}
                >
                  <Typography variant="h6">
                    Your fluency is great ! . Keep it up.
                  </Typography>
                </Box>
              ) : points >= 30 ? (
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6">
                    To ensure a good score in fluency, you need:
                  </Typography>

                  <ol>
                    <li>a continuous speech</li>
                    <li>an average speed with clear recognizable speech</li>
                    <li>the speech should be smooth with proper phrasing.</li>
                    {/* <li>Seek help at Telegram (t.me/aigmapteai)</li> */}
                  </ol>
                </Box>
              ) : (
                <Box sx={{ ml: 2 }}>
                  <Typography>
                    A low score in fluency may be caused by:
                  </Typography>
                  <ol>
                    <li>hesitate</li>
                    <li>fumble with the words/</li>
                    <li>speaking too slow or too fast</li>
                    <li>a discontinuous speech</li>
                    {/* <li>Seek help at Telegram (t.me/aigmapteai)</li> */}
                  </ol>
                </Box>
              )
            ) : content === "pronunciation" ? (
              points >= 70 ? (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    ml: 2,
                  }}
                >
                  <Typography variant="h6">
                    Your pronunciation is great ! . Keep it up.
                  </Typography>
                </Box>
              ) : points >= 30 ? (
                <Box sx={{ ml: 2 }}>
                  <Typography>
                    To ensure a good score in pronunciation, you need:
                  </Typography>
                  <ol>
                    <li>a clear speech with correct pronunciation</li>
                    <li>a smooth tone, without frequent stresses</li>
                    <li>a continuous speech, with reasonable pauses</li>
                    {/* <li>Seek help at Telegram (t.me/aigmapteai)</li> */}
                  </ol>
                </Box>
              ) : (
                <Box sx={{ ml: 2 }}>
                  <Typography>
                    A low score in pronunciation may be caused by:
                  </Typography>
                  <ol>
                    <li>unrecognizable pronunciation</li>
                    <li>speaking too fast / slow</li>
                    <li>speaking with too many pauses</li>
                    <li>speaking with a heavy tone, too many stresses</li>
                    {/* <li>Seek help at Telegram (t.me/aigmapteai)</li> */}
                  </ol>
                </Box>
              )
            ) : points >= 70 ? (
              <Box
                sx={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  ml: 2,
                }}
              >
                <Typography variant="h6">
                  Your appropriacy is great ! . Keep it up.
                </Typography>
              </Box>
            ) : points >= 30 ? (
              <Box sx={{ ml: 2 }}>
                <Typography>
                  To ensure a good score in the appropriacy
                </Typography>
                <ol>
                  <li>Not leaving out any intended or focused words </li>
                  <li>No replacing the words</li>
                  <li>Speak clearly </li>
                  {/* <li>Seek help at Telegram (t.me/aigmapteai)</li> */}
                </ol>
              </Box>
            ) : (
              <Box sx={{ ml: 2 }}>
                <Typography>
                  A low score in the appropriacy may be caused by:lose scoring for
                  leaving out key words or points, replacing words in the text with new ones,
                  or inserting new ones.
                </Typography>
              </Box>
            )
          ) : (
            ""
          )}
        </Box>
        <Divider />
      </Box>
    );
  };
  return (
    <>
      <Box sx={{ border: "2px solid gray", borderRadius: "1rem", p: 1 }}>
        {category !== "rts" ? (
          <BoxLayout
            points={
              points?.content !== null && points?.content !== undefined
                ? points?.content
                : content
            }
            content={"content"}
          />
        ) : (
          <BoxLayout
            points={
              points?.appropriacy !== null && points?.appropriacy !== undefined
                ? points?.appropriacy
                : content
            }
            content={"Appropriacy"}
          />
        )}

        {category !== "asq" && (
          <>
            <BoxLayout
              points={
                points?.fluency !== null && points?.fluency !== undefined
                  ? points?.fluency
                  : fluency
              }
              content={"fluency"}
            />
            <BoxLayout
              points={
                points?.pronunciation !== null &&
                points?.pronunciation !== undefined
                  ? points?.pronunciation
                  : pronunciation
              }
              content={"pronunciation"}
            />
          </>
        )}
      </Box>
      {(category === "ra" || category === "rs") && (
        <>
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              backgroundColor: "#fff",
              padding: "  10px",
              borderRadius: "0rem 0rem 1rem 1rem  ",
            }}
          >
            <Card>
              <CardHeader
                // titleTypographyProps={{variant:'h1' }}
                title={
                  <>
                    Pronunciation
                    <span
                      style={{
                        backgroundColor: "#16A085",
                        padding: "4px 8px",
                        margin: "3px",
                        borderRadius: 5,
                        fontSize: "15px",
                        color: "#fff",
                      }}
                    >
                      Good
                    </span>
                    <span
                      style={{
                        backgroundColor: "#F21F21",
                        padding: "4px 8px",
                        margin: "3px",
                        borderRadius: 5,
                        fontSize: "15px",
                        color: "#fff",
                      }}
                    >
                      Poor
                    </span>
                  </>
                }
                sx={{
                  bgcolor: "gray",
                  textAlign: "left",
                  fontSize: 10,
                }}
              />

              <CardContent>
                <Box sx={{ width: "100%", margin: "0 auto" }}>
                  {showWord.map((word, index) => (
                    <Typography
                      key={index}
                      variant="body1"
                      sx={{
                        bgcolor: word.color,
                        display: "inline-block",
                        padding: "2px 3px",
                        margin: "2px",
                        borderRadius: 5,
                        color: "#fff",
                      }}
                    >
                      {word.name}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </>
      )}

      {/* <Box
        sx={{
          width: "100%",
          textAlign: "center",
          backgroundColor: "#fff",
          padding: "  10px",
          borderRadius: "0rem 0rem 1rem 1rem  ",
        }}
      >
        <Card>
          <CardHeader
            // titleTypographyProps={{variant:'h1' }}
            title="Overall Point"
            sx={{
              bgcolor: "gray",
              textAlign: "left",
              fontSize: 10,
            }}
          />

          <CardContent>
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
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    margin: "0 auto",
                    [theme.breakpoints.up("sm")]: {
                      width: "30%",
                      my: 2,
                    },
                    [theme.breakpoints.up("md")]: {
                      width: "30.33%",
                    },
                    [theme.breakpoints.up("lg")]: {
                      width: "15%",
                    },
                  }}
                >
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      marginBottom: 5,
                    }}
                  >
                    Overall Point
                  </h3>
                  <CircularProgressbar
                    value={overallPoint}
                    // styles={buildStyles({
                    //   // Colors
                    //   pathColor:
                    //     overallPoint >= 0
                    //       ? `rgba(102, 255, 199, ${8 / 10})`
                    //       : overallPoint >= 5
                    //       ? `rgba(255, 215, 0, ${overallPoint / 10})`
                    //       : `rgba(170, 0, 0, ${overallPoint / 10})`,
                    //   textColor:
                    //     overallPoint >= 8
                    //       ? `rgba(102, 255, 199, ${8 / 10})`
                    //       : overallPoint >= 5
                    //       ? `rgba(255, 215, 0, ${overallPoint / 10})`
                    //       : `rgba(170, 0, 0, ${overallPoint / 10})`,
                    // })}
                    // value={overallPoint}
                    maxValue={90}
                    text={overallPoint + "/" + 90}
                  />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box> */}
    </>
  );
}

export default ReusableScoreSpeakingContent;
