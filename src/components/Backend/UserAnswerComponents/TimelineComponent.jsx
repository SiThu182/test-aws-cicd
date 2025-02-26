import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { TimelineOppositeContent } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import ScoreDialog from "./ScoreDialog";
import { DataForRsmcAnswerContext } from "../../../Screens/Backend/CourseTest/Reading/ChooseSingleAns/Test";
import FormatErrorLine from "../FormatErrorLine";

export default function LeftPositionedTimeline(props) {
  const { data, type, category } = props;
  const [open, setOpen] = React.useState(false);
  const [userAnswer, setUserAnswer] = React.useState();
  const correctValue = React.useContext(DataForRsmcAnswerContext);

  const MultipleChoiceBoxLayout = ({ mcUserAnswer, mcCorrectValue }) => {
    return (
      <Box
        sx={{
          width: "100%",
          border: "1px solid black",
          boxShadow: 3,
          borderRadius: 2,
          mr: 1,
          p: 1,
        }}
      >
        <Typography>User Answer :</Typography>
        <Typography>{mcUserAnswer}</Typography>
      </Box>
    );
  };

  return (
    <>
      {data !== null &&
        data !== undefined &&
        data?.length !== 0 &&
        data.map((d, i) => (
          <Timeline
            key={i}
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.1,
              },
              p: 0,
            }}
          >
            <TimelineItem sx={{ width: "100%" }}>
              <TimelineOppositeContent>
                <Box
                  sx={{
                    width: {
                      xs: "2rem",
                      md: "3rem",
                    },
                    height: {
                      xs: "2rem",
                      md: "3rem",
                    },
                    borderRadius: "50%",
                    boxShadow: 3,
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {d.image !== null ? (
                    <img
                      src={
                        process.env.REACT_APP_BACKEND_URL +
                        "storage/user/" +
                        d.image
                      }
                      style={{ width: "100%" }}
                      alt="user_img"
                    />
                  ) : (
                    <Avatar sx={{ mt: 0.4 }}></Avatar>
                  )}
                </Box>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  color={
                    d.user_answered === null || d?.ai_reading === null
                      ? "error"
                      : "success"
                  }
                />
                {i !== data.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Card sx={{ minWidth: "50px" }}>
                  <CardHeader
                    title={
                      <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="p" sx={{ fontSize: "1rem" }}>
                          {d.username} | Time -{" "}
                          {new Date(d.created_at).toDateString()}
                        </Typography>
                        <Button
                          variant="contained"
                          size={"small"}
                          disabled={
                            (d?.points !== null && d?.points !== undefined) ||
                            (![
                              "ra",
                              "rl",
                              "rs",
                              "di",
                              "asq",
                              "we",
                              "swt",
                              "sst",
                            ].includes(category) &&
                              d?.overall_point !== null) ||
                            category == "wfd"
                              ? false
                              : true
                          }
                          onClick={() => {
                            setOpen(true);
                            setUserAnswer({
                              userAnswer:
                                type === "Speaking"
                                  ? d.user_transcript
                                  : d.user_answered,
                              point: d.overall_point,
                              recordingSecond: d.length_of_recording_in_sec,
                              keyword_length: d.keyword_length,
                              point_detail:
                                type === "Writing" ||
                                type === "Speaking" ||
                                category === "sst"
                                  ? d.points
                                  : null,
                            });
                          }}
                        >
                          Score
                        </Button>
                      </Box>
                    }
                    sx={{
                      backgroundColor: "gray",
                      padding: 0.5,
                      color: "white",
                    }}
                  ></CardHeader>
                  <CardContent>
                    <Box>
                      {type === "Speaking" && (
                        <audio
                          src={
                            process.env.REACT_APP_BACKEND_URL +
                            "storage" +
                            d.ai_reading
                          }
                          style={{ width: "100%" }}
                          controls
                        ></audio>
                      )}
                      {type === "Writing" && (
                        <Typography sx={{ textWrap: "wrap" }}>
                          {d.user_answered
                            ?.trim()
                            ?.split(" ")
                            ?.map((word, index) => (
                              <Typography
                                key={index}
                                variant="p"
                                sx={{
                                  bgcolor: word.color,
                                  display: "inline-block",

                                  marginLeft: "4px",
                                  borderRadius: 5,
                                }}
                              >
                                {word !== "" ? word : <FormatErrorLine />}
                              </Typography>
                            ))}{" "}
                        </Typography>
                      )}
                      {type === "Reading" && (
                        <>
                          {category === "rsmc" && (
                            <>
                              <MultipleChoiceBoxLayout
                                mcUserAnswer={
                                  d.user_answered !== null ? (
                                    d.user_answered
                                  ) : (
                                    <span>(Answer not avaialble)</span>
                                  )
                                }
                                mcCorrectValue={correctValue}
                              ></MultipleChoiceBoxLayout>
                            </>
                          )}
                          {category === "rmc" && (
                            <MultipleChoiceBoxLayout
                              mcUserAnswer={
                                d.user_answered !== null ? (
                                  d.user_answered
                                ) : (
                                  <span>(Answer not avaialble)</span>
                                )
                              }
                              mcCorrectValue={correctValue}
                            ></MultipleChoiceBoxLayout>
                          )}
                          {category === "rfib" && (
                            <MultipleChoiceBoxLayout
                              mcUserAnswer={
                                d.user_answered !== null ? (
                                  JSON.parse(d.user_answered).map((a, i) =>
                                    a !== 0 ? (
                                      <span key={i}>
                                        {a}
                                        {i !==
                                        JSON.parse(d.user_answered).length - 1
                                          ? ","
                                          : ""}
                                      </span>
                                    ) : i !==
                                      JSON.parse(d.user_answered).length - 1 ? (
                                      "No Answer,"
                                    ) : (
                                      "No Answer"
                                    )
                                  )
                                ) : (
                                  <span>(Answer not avaialble)</span>
                                )
                              }
                              mcCorrectValue={correctValue}
                            ></MultipleChoiceBoxLayout>
                          )}
                          {category === "rwfib" && (
                            <MultipleChoiceBoxLayout
                              mcUserAnswer={
                                d.user_answered !== null ? (
                                  JSON.parse(d.user_answered).map((a, i) =>
                                    a !== 0 ? (
                                      <span key={i}>
                                        {a}
                                        {i !==
                                        JSON.parse(d.user_answered).length - 1
                                          ? ","
                                          : ""}
                                      </span>
                                    ) : (
                                      ""
                                    )
                                  )
                                ) : (
                                  <span>(Answer not avaialble)</span>
                                )
                              }
                              mcCorrectValue={correctValue}
                            ></MultipleChoiceBoxLayout>
                          )}
                          {category === "rop" && (
                            <MultipleChoiceBoxLayout
                              mcUserAnswer={
                                d.user_answered !== null ? (
                                  JSON.parse(d.user_answered).map((a, i) =>
                                    a !== 0 ? (
                                      <span key={i}>
                                        {a}
                                        {i !==
                                        JSON.parse(d.user_answered).length - 1
                                          ? ","
                                          : ""}
                                      </span>
                                    ) : (
                                      ""
                                    )
                                  )
                                ) : (
                                  <span>(Answer not avaialble)</span>
                                )
                              }
                              mcCorrectValue={correctValue}
                            ></MultipleChoiceBoxLayout>
                          )}
                        </>
                      )}
                      {type === "Listening" && (
                        <>
                          {(category === "smc" ||
                            category === "hcs" ||
                            category === "smw") && (
                            <>
                              <MultipleChoiceBoxLayout
                                mcUserAnswer={
                                  d.user_answered !== null ? (
                                    d.user_answered
                                  ) : (
                                    <span>(Answer not avaialble)</span>
                                  )
                                }
                                mcCorrectValue={correctValue}
                              ></MultipleChoiceBoxLayout>
                            </>
                          )}
                          {category === "mc" && (
                            <MultipleChoiceBoxLayout
                              mcUserAnswer={
                                d.user_answered !== null ? (
                                  d.user_answered
                                ) : (
                                  <span>(Answer not avaialble)</span>
                                )
                              }
                              mcCorrectValue={correctValue}
                            ></MultipleChoiceBoxLayout>
                          )}
                          {category === "fib" && (
                            <MultipleChoiceBoxLayout
                              mcUserAnswer={
                                d.user_answered !== null ? (
                                  JSON.parse(d.user_answered).map((a, i) =>
                                    a !== "" ? (
                                      <span key={i}>
                                        {a}
                                        {i !==
                                        JSON.parse(d.user_answered).length - 1
                                          ? ","
                                          : ""}
                                      </span>
                                    ) : (
                                      ""
                                    )
                                  )
                                ) : (
                                  <span>(Answer not avaialble)</span>
                                )
                              }
                              mcCorrectValue={correctValue}
                            ></MultipleChoiceBoxLayout>
                          )}
                          {category === "hiw" && (
                            <MultipleChoiceBoxLayout
                              mcUserAnswer={
                                d.user_answered !== null ? (
                                  d.user_answered
                                ) : (
                                  <span>(Answer not avaialble)</span>
                                )
                              }
                              mcCorrectValue={correctValue}
                            ></MultipleChoiceBoxLayout>
                          )}
                          {(category === "wfd" || category === "sst") && (
                            <Typography sx={{ whiteSpace: "pre-wrap" }}>
                              {d.user_answered
                                ?.trim()
                                ?.split(" ")
                                ?.map((word, index) => (
                                  <Typography
                                    key={index}
                                    variant="p"
                                    sx={{
                                      bgcolor: word.color,
                                      display: "inline-block",

                                      margin: "1px",
                                      borderRadius: 5,
                                    }}
                                  >
                                    {word !== "" ? word : <FormatErrorLine />}
                                  </Typography>
                                ))}
                            </Typography>
                          )}
                        </>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        ))}

      <>
        <ScoreDialog
          open={open}
          setOpen={setOpen}
          userAnswer={userAnswer}
          category={category}
        ></ScoreDialog>
      </>
    </>
  );
}
