import { useTheme } from "@emotion/react";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { DataForSwtAnswerContext } from "../../../../Screens/Backend/CourseTest/Writing/SWT/Test";
import { DataForWeAnswerContext } from "../../../../Screens/Backend/CourseTest/Writing/WriteEssay/Test";
import CalculateScore from "../../../../Screens/Backend/CourseTest/CalculationForWritingSections.js/CalculateScore";
import Typo from "typo-js";
import { DataForSstAnswerContext } from "../../../../Screens/Backend/CourseTest/Listening/SummarizeSpokenText/Test";
import { DataForWfdAnswerContext } from "../../../../Screens/Backend/CourseTest/Listening/WriteFromDictation/Test";
import { DataForWemailAnswerContext } from "../../../../Screens/Backend/CourseTest/Writing/WriteEmail/Test";
import LightTooltip from "../../PracticeComponents/LightTooltip";
import ErrorTooltipContent from "../../PracticeComponents/ErrorTooltipContent";

// import {LightTooltip} from "../"
function ReusableScoreWritingContent({
  userAnswer,
  points,
  overallPoint,
  category,
}) {
  const theme = useTheme();
  const [showWord, setShowWord] = useState([]);
  const [cleanUpForShowWord, setCleanUpForShowWord] = useState(true);
  const [dictionary, setDictionary] = useState(null);
  const [content, setContent] = useState(0);
  const [form, setForm] = useState(0);
  const [vocabulary, setVocabulary] = useState(0);
  const [grammar, setGrammar] = useState(0);
  const [spelling, setSpelling] = useState(0);
  const [dsc, setDsc] = useState(0);
  const [convention, setConvention] = useState(0);
  const [organization, setOrganization] = useState(0);
  const [linguistic, setLinguistic] = useState(0);
  const [score, setScore] = useState(0);
  const Swtcontext = useContext(DataForSwtAnswerContext);
  const Wecontext = useContext(DataForWeAnswerContext);
  const Sstcontext = useContext(DataForSstAnswerContext);
  const Wfdcontext = useContext(DataForWfdAnswerContext);
  const Wemailcontext = useContext(DataForWemailAnswerContext);
  const [cleanState, setCleanState] = useState(true);
  const [mistakeDetails, setMistakeDetails] = useState([]);
  const [testResultForComment, setTestResultForComment] = useState([]);
  const [testErrorOffset, setTestErrorOffset] = useState([]);
  const [replacements, setReplacements] = useState([]);
  const maxValue =
    category === "we" || category === "wemail"
      ? 15
      : category === "swt"
      ? 7
      : category === "wfd"
      ? Wfdcontext.content.split(" ").length
      : 10;

  useEffect(() => {
    const loadDictionary = async () => {
      const affData = await fetch(
        `${process.env.REACT_APP_FRONTEND_URL}/en_US.aff`
      ).then((res) => res.text());
      const wordsData = await fetch(
        `${process.env.REACT_APP_FRONTEND_URL}/en_US.dic`
      ).then((res) => res.text());
      const dictionary = new Typo("en_US", affData, wordsData);
      setDictionary(dictionary);
    };
    loadDictionary();
  }, []);

  useEffect(() => {
    if (
      category === "wfd" &&
      userAnswer !== null &&
      userAnswer !== undefined &&
      cleanUpForShowWord
    ) {
      const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/g;
      let content_arr = Wfdcontext.content
        .replace(specialCharactersRegex, "")
        .split(" ");
      let char_arr = userAnswer.replace(specialCharactersRegex, "").split(" ");
      let word = [];

      content_arr.forEach((check_char) => {
        if (char_arr.includes(check_char)) {
          word.push({ name: check_char, color: "#16A085" }); // This would mutate the state, which is not allowed
          setShowWord(word);
        } else {
          word.push({ name: check_char, color: "#F21F21" }); // This would mutate the state, which is not allowed
          setShowWord(word);
        }
      });
      setCleanUpForShowWord(false);
    }
  }, [Wfdcontext, category, showWord, userAnswer, cleanUpForShowWord]);

  useEffect(() => {
    if (
      (points === null &&
        overallPoint !== null &&
        overallPoint !== undefined &&
        dictionary !== null &&
        cleanState) ||
      (points?.new_answer == true && cleanState && dictionary !== null)
    ) {
      setCleanState(false);

      if (category !== "wfd") {
        let content =
          category === "we"
            ? Wecontext?.content
            : category === "swt"
            ? Swtcontext?.content
            : category === "sst"
            ? Sstcontext.content
            : Wemailcontext.content;
        let keyword_length =
          category === "we"
            ? Wecontext?.keyword_length
            : category === "swt"
            ? Swtcontext?.keyword_length
            : category === "sst"
            ? Sstcontext?.keyword_length
            : Wemailcontext?.keyword_length;
        let content_arr = content.split(/[ .,]+/);
        let originalContent =
          category === "we"
            ? Wecontext?.originalContent
            : category === "swt"
            ? Swtcontext?.originalContent
            : category === "sst"
            ? Sstcontext?.originalContent
            : Wemailcontext?.originalContent;
        const calculateScore = async () => {
          let result = await CalculateScore(
            content,
            userAnswer,
            keyword_length > 0 ? keyword_length : content_arr.length,
            dictionary,
            category,
            originalContent,
            category === "wemail" ? Wemailcontext?.type : ""
          );

          setMistakeDetails(result?.mistakeDetails);
          setTestResultForComment(result?.textArrayForErrorDetails);
          setTestErrorOffset(result?.textErrorOffset);
          setReplacements(result?.replacements);

          setScore(result.score);
          setContent(result.cal_content);
          setForm(result.form);
          setGrammar(result.cal_grammar_mark);
          setSpelling(result.spellng_language_tool);
          if (category === "sst") {
            setSpelling(result.spellng_language_tool);
          }
          setVocabulary(result.form);
          if (category === "swt") {
            setVocabulary(result.voca_score);
          }

          setDsc(result.form);
          setConvention(result?.emailConventionPoints);
          setOrganization(result?.organizationalPoints);
          setLinguistic(result.form);
        };
        calculateScore();
      }
      if (category === "wfd") {
        Wfdcontext.content.split(" ").forEach((check_char) => {
          if (userAnswer.includes(check_char)) {
            setScore((prev) => prev + 1);
          }
        });
        setCleanState(false);
      }
    }
  }, [
    points,
    overallPoint,
    Swtcontext,

    Sstcontext,
    Wfdcontext,
    cleanState,
    Wecontext,
    Wemailcontext,
    category,
    dictionary,
    userAnswer,
  ]);

  const ProgressbarBox = ({ value, maxValue, title }) => {
    return (
      <Box
        sx={{
          width: "15%",
          minWidth: "5rem",
          maxWidth: "15rem",
          margin: "0 auto",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: 5,
            height: "30%",
          }}
        >
          {title}
        </h3>
        <Box sx={{ height: "70%" }}>
          <CircularProgressbar
            value={value}
            maxValue={maxValue}
            text={`${value}/${maxValue}`}
          />
        </Box>
      </Box>
    );
  };

  const containerStyle = {
    display: {
      md: "flex",
      xs: "column",
    },
    width: "100%",
    margin: "0 auto",
    justifyContent: {
      md: "space-evenly",
      sm: "center",
      xs: "center",
    },
    border: "1px solid gray",
    boxShadow: 5,
    alignItems: "center",
    pl: {
      md: 4,
      sm: 0,
      xs: 0,
    },
    py: 3,
    backgroundColor: "#fff",
    borderRadius: "1rem 1rem  0rem 0rem",
  };
  return (
    <>
      <Box sx={{ width: "100%", textAlign: "center", padding: "  10px" }}>
        {category !== "wfd" &&
          testResultForComment !== undefined &&
          testResultForComment !== null &&
          testErrorOffset !== null &&
          mistakeDetails !== null && (
            <Card
              sx={{
                textAlign: "left",
                padding: "10px",
                mb: 4,
              }}
            >
              <Typography components="p" style={{ whiteSpace: "pre-wrap" }}>
                {testResultForComment?.map((word, index) =>
                  testErrorOffset?.includes(index) ? (
                    <LightTooltip
                      title={
                        <ErrorTooltipContent
                          error={mistakeDetails[testErrorOffset.indexOf(index)]}
                          replacements={
                            replacements[testErrorOffset.indexOf(index)]
                          }
                        ></ErrorTooltipContent>
                      }
                    >
                      <Typography
                        key={index}
                        variant="body1"
                        sx={{
                          color: testErrorOffset?.includes(index)
                            ? "red"
                            : word.color,
                          display: "inline",
                          padding: "1px",
                          cursor: "pointer",
                          borderRadius: 2,
                        }}
                      >
                        {word}
                      </Typography>
                    </LightTooltip>
                  ) : (
                    <Typography
                      key={index}
                      variant="body1"
                      sx={{
                        bgcolor: word.color,
                        display: "inline",
                        padding: "1px",
                        borderRadius: 5,
                      }}
                    >
                      {word}
                    </Typography>
                  )
                )}
                {testResultForComment?.length === 0 && <>{userAnswer}</>}
              </Typography>
            </Card>
          )}

        <Card
          sx={{
            containerStyle,
          }}
        >
          {category !== "wfd" && (
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <ProgressbarBox
                title={"Content"}
                value={
                  points?.content !== null && points?.content !== undefined
                    ? points?.content
                    : content
                }
                maxValue={category === "we" ? 3 : 2}
              />
              <ProgressbarBox
                title={"Form"}
                value={
                  points?.form !== null && points?.form !== undefined
                    ? points?.form
                    : form
                }
                maxValue={category === "swt" ? 1 : 2}
              />
              <ProgressbarBox
                title={"Grammar"}
                value={
                  points?.grammar !== null && points?.grammar !== undefined
                    ? points?.grammar
                    : grammar
                }
                maxValue={2}
              />
              <ProgressbarBox
                title={"Vocabulary"}
                value={
                  points?.vocabulary !== null &&
                  points?.vocabulary !== undefined
                    ? points?.vocabulary
                    : vocabulary
                }
                maxValue={2}
              />
            </Box>
          )}

          <br />
        </Card>

        <Card sx={{ containerStyle, padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexGrow: 1,
              alignItems: "center",
            }}
          >
            {(category === "sst" ||
              category === "we" ||
              category === "wemail") && (
              <>
                <ProgressbarBox
                  title={"Spelling"}
                  value={
                    points?.spelling !== null && points?.spelling !== undefined
                      ? points?.spelling
                      : spelling
                  }
                  maxValue={2}
                />
              </>
            )}

            {category === "we" && (
              <>
                <ProgressbarBox
                  title={"General Linguistic Range"}
                  value={
                    points?.dsc !== null && points?.dsc !== undefined
                      ? points?.dsc
                      : dsc
                  }
                  maxValue={2}
                />

                {/* DSC is same as form */}
                <ProgressbarBox
                  title={"Development, structure and coherence"}
                  value={
                    points?.linguistic !== null &&
                    points?.linguistic !== undefined
                      ? points?.linguistic
                      : linguistic
                  }
                  maxValue={2}
                />
              </>
            )}
            {category === "wemail" && (
              <>
                <ProgressbarBox
                  title={"Email Convention"}
                  value={
                    points?.convention !== null &&
                    points?.convention !== undefined
                      ? points?.convention
                      : convention
                  }
                  maxValue={2}
                />

                {/* email organization */}
                <ProgressbarBox
                  title={"Organization"}
                  value={
                    points?.organization !== null &&
                    points?.organization !== undefined
                      ? points?.organization
                      : organization
                  }
                  maxValue={2}
                />
              </>
            )}
          </Box>
        </Card>

        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            backgroundColor: "#fff",
            marginTop: 5,
            borderRadius: "0rem 0rem 1rem 1rem  ",
          }}
        >
          <Card>
            <CardHeader
              // titleTypographyProps={{variant:'h1' }}
              title=" Writing Overall Point"
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
                      maxWidth: "15rem",
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
                      value={
                        points?.content !== null &&
                        points?.content !== undefined
                          ? overallPoint
                          : score
                      }
                      maxValue={maxValue}
                      text={
                        points?.content !== null &&
                        points?.content !== undefined
                          ? overallPoint
                          : score + "/" + maxValue
                      }
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        {category === "wfd" && (
          <>
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                backgroundColor: "#fff",
                padding: "10px",
                borderRadius: "0rem 0rem 1rem 1rem  ",
              }}
            >
              <Card>
                <CardHeader
                  // titleTypographyProps={{variant:'h1' }}
                  title={
                    <>
                      Content
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
      </Box>
    </>
  );
}

export default ReusableScoreWritingContent;
