import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListeningDetailAsync,

  // fetchMockTestDetailAsync,
  fetchReadingDetailAsync,
  fetchSpeakingDetailAsync,
  // fetchUserPlanDetailAsync,
  fetchWritingDetailAsync,
} from "../../../../redux/thunk/Dashboard";

import { Box, Button, Typography } from "@mui/material";
import DialogTable from "../../../../components/Backend/DialogwithTable/DialogTable";
import { colorCode } from "../../../../components/Colors/ReusableColorCode";

import MtScoreTableDashboard from "../../../../components/Backend/MockTest/MtScoreTableDashboard";
function PracticeMockTestDetail(props) {
  const { userId } = props;
  let {
    speakingPosts,

    readingPosts,
    writingPosts,
    listeningPosts,
    speakingDetailStatus,
    readingDetailStatus,
    writingDetailStatus,
    listeningDetailStatus,
    mockTestListStatus,

    mockTestTotalPage,
    // userPlanDetail,
    // userPlanDetailStatus,
  } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();

  const [startAssign, setStartAssign] = useState(false);

  const [startScore, setStartScore] = useState(false);
  const speakingPath = `student_scores/${userId}?type=speaking`;
  const readingPath = `student_scores/${userId}?type=reading`;
  const writingPath = `student_scores/${userId}?type=writing`;
  const listeningPath = `student_scores/${userId}?type=listening`;

  //score
  const [speakingScore, setSpeakingScore] = useState("");
  const [readingScore, setReadingScore] = useState("");
  const [writingScore, setWritingScore] = useState("");
  const [listeningScore, setListeningScore] = useState("");

  const [speakingOpen, setSpeakingOpen] = useState(false);
  const [writingOpen, setWritingOpen] = useState(false);
  const [readingOpen, setReadingOpen] = useState(false);
  const [listeningOpen, setListeningOpen] = useState(false);

  //const array for btn
  const sectionArray = ["Speaking", "Writing", "Reading", "Listening"];

  useEffect(() => {
    // dispatch(fetchPostsCountAsync({ path: postPath, user_id: userId }));
    dispatch(fetchSpeakingDetailAsync(speakingPath));
    dispatch(fetchReadingDetailAsync(readingPath));
    dispatch(fetchWritingDetailAsync(writingPath));
    dispatch(fetchListeningDetailAsync(listeningPath));

    setStartAssign(true);
    setStartScore(true);
  }, [dispatch, userId, speakingPath, readingPath, writingPath, listeningPath]);
  //FOR SCORE
  useEffect(() => {
    if (
      speakingDetailStatus === "succeeded" &&
      writingDetailStatus === "succeeded" &&
      readingDetailStatus === "succeeded" &&
      listeningDetailStatus === "succeeded" &&
      mockTestListStatus === "succeeded" &&
      startScore
    ) {
      setSpeakingScore(
        speakingPosts !== undefined && speakingPosts.length !== 0
          ? speakingPosts
          : 0
      );

      setReadingScore(
        readingPosts !== undefined && readingPosts.length !== 0
          ? readingPosts
          : 0
      );
      setWritingScore(
        writingPosts !== undefined && writingPosts.length !== 0
          ? writingPosts
          : 0
      );
      setListeningScore(
        listeningPosts !== undefined && listeningPosts.length !== 0
          ? listeningPosts
          : 0
      );
      setStartScore(false);
    }
  }, [
    speakingDetailStatus,
    mockTestListStatus,
    writingDetailStatus,
    readingDetailStatus,
    listeningDetailStatus,
    speakingPosts,
    readingPosts,
    writingPosts,
    listeningPosts,
    mockTestTotalPage,
    startScore,
  ]);

  const clickHandler = (section) => {
    switch (section) {
      case "Speaking":
        setSpeakingOpen(true);
        break;
      case "Writing":
        setWritingOpen(true);
        break;
      case "Reading":
        setReadingOpen(true);
        break;
      case "Listening":
        setListeningOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <Box>
      <Typography variant="h6">Practice&MockTestDetail</Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          p: 2,
          mt: 2,
          borderRadius: "1rem",
          boxShadow: 5,
        }}
      >
        {startAssign &&
          sectionArray.map((s, i) => (
            <Box key={i} sx={{ width: "20%" }}>
              <Button
                sx={{
                  color: "white",
                  width: "90%",
                  mr: 2,
                  backgroundColor:
                    s === "Speaking"
                      ? colorCode.scoreColor.scoreBlue
                      : s === "Reading"
                      ? colorCode.scoreColor.scoreYellow
                      : s === "Writing"
                      ? colorCode.scoreColor.scorePurple
                      : colorCode.scoreColor.scoreGrey,
                }}
                variant="contained"
                onClick={() => clickHandler(s)}
              >
                {s}
              </Button>
              <DialogTable
                open={
                  s === "Speaking"
                    ? speakingOpen
                    : s === "Reading"
                    ? readingOpen
                    : s === "Writing"
                    ? writingOpen
                    : listeningOpen
                }
                setOpen={
                  s === "Speaking"
                    ? setSpeakingOpen
                    : s === "Reading"
                    ? setReadingOpen
                    : s === "Writing"
                    ? setWritingOpen
                    : setListeningOpen
                }
                score={
                  s === "Speaking"
                    ? speakingScore === "" || speakingScore === 0
                      ? "0"
                      : speakingScore
                    : s === "Reading"
                    ? readingScore === "" || readingScore === 0
                      ? "0"
                      : readingScore
                    : s === "Writing"
                    ? writingScore === "" || writingScore === 0
                      ? "0"
                      : writingScore
                    : listeningScore === "" || listeningScore === 0
                    ? "0"
                    : listeningScore
                }
                status={
                  s === "Speaking"
                    ? speakingDetailStatus
                    : s === "Reading"
                    ? readingDetailStatus
                    : s === "Writing"
                    ? writingDetailStatus
                    : listeningDetailStatus
                }
                title={s}
              ></DialogTable>
            </Box>
          ))}
      </Box>
      <Box sx={{ width: "100%", mt: "2rem" }}>
        <Typography variant="h6">Mock Test Scores List</Typography>

        <MtScoreTableDashboard userId={userId}></MtScoreTableDashboard>
      </Box>
    </Box>
  );
}

export default PracticeMockTestDetail;
