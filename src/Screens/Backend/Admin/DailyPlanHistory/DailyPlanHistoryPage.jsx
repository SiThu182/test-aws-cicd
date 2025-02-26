import React, { useEffect, useState } from "react";
import PageNavTitle from "../../../../components/Backend/PageTitle";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { GetTodayDateString } from "../../../../Utils/GetTodayDateString";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "./DailyPlan.css";

const UserPlanDetailText = ({ text, data }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "30%", display: "flex" }}>
        <Box sx={{ width: "80%" }}>{text}</Box>
        <Box sx={{ width: "20%" }}>:</Box>
      </Box>

      <Box sx={{ width: "50%" }}>{data}</Box>
    </Box>
  );
};

function DailyPlanHistoryPage() {
  let [history, setHistory] = useState();
  let [startDate, setStartDate] = useState();
  let [examDate, setExamDate] = useState();
  let [loading, setLoading] = useState(true);
  let [historyExist, setHistoryExist] = useState(true);
  let [userScore, setUserScore] = useState(0);
  let [userFinishedCount, setUserFinishedCount] = useState(0);
  let [studyPlanTargetCount, setStudyPlanTargetCount] = useState(0);
  let [targetScore, setTargetScore] = useState(0);
  useEffect(() => {
    let fetchPlanHistory = async () => {
      setLoading(true);
      let userId = localStorage.getItem("userId");
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const dateString = GetTodayDateString();
        let result = await axios.get(
          `${process.env.REACT_APP_BACKEND_ADMIN}get-latest-study-plan-daily-history/${userId}/${dateString}/${timezone}`
        );

        if (result.data.status === 1) {
          if (result.data.data !== null) {
            setHistory(result.data.data.daily_record_history);
            setStartDate(result.data.data.start_date);
            setExamDate(result.data.data.exam_date);

            setHistoryExist(true);
          } else {
            setHistoryExist(false);
            setLoading(false);
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchPlanHistory();
  }, []);

  useEffect(() => {
    const fetchUserScoreAndProgress = async () => {
      let userId = localStorage.getItem("userId");
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const dateString = GetTodayDateString();

      try {
        let result = await axios.get(
          `${process.env.REACT_APP_BACKEND_ADMIN}get-latest-study-plan-score/${userId}/${dateString}/${timezone}`
        );
        if (result.data.status == 1) {
          setUserScore(Math.round(result.data.data.user_score, 2));
          setUserFinishedCount(result.data.data.user_answer_records_count);
          setStudyPlanTargetCount(result.data.data.daily_plan_total_count);
          setTargetScore(result.data.data.target_score);
        }
      } catch (error) {}
    };
    fetchUserScoreAndProgress();
  }, []);

  const dateString = GetTodayDateString();

  return (
    <section style={{ width: "100%" }}>
      <PageNavTitle text={"Daily Plan history"} />
      {!loading &&
        historyExist &&
        history !== null &&
        history !== undefined && (
          <Box
            sx={{
              mt: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  borderRadius: "1rem",
                  p: 2,
                  flex: "1 1 calc(50% - 1rem)",

                  background: "white",
                  boxShadow: 4,
                }}
              >
                <UserPlanDetailText text="Start Date" data={startDate} />
                <UserPlanDetailText text="Exam Date" data={examDate} />
                <UserPlanDetailText
                  text="Plan Status"
                  data={
                    dateString < startDate
                      ? "not start yet"
                      : dateString <= examDate
                      ? "in progress"
                      : "finished"
                  }
                />
                <UserPlanDetailText
                  text="User Practice Count"
                  data={
                    userFinishedCount +
                    " (it can be different from daily plan as this count all practice that user has done whether or not it is in daily plan)"
                  }
                />

                <UserPlanDetailText
                  text="Target Practice Count"
                  data={
                    studyPlanTargetCount +
                    " (minimum count of all category in study plan to practice.)"
                  }
                />
              </Box>

              <Box
                sx={{
                  borderRadius: "1rem",
                  flex: "1 1 calc(50% - 1rem)",
                  display: "flex",
                  p: 2,
                  background: "white",
                  boxShadow: 4,
                  gap: "2rem",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: "10rem" }}>
                  <CircularProgressbar
                    value={userScore}
                    maxValue={90}
                    text={userScore}
                    styles={buildStyles({
                      pathColor: "#0CAFFF",
                      textColor: "#0CAFFF",
                    })}
                  />
                  <Typography sx={{ textAlign: "center", my: 2 }}>
                    User Score
                  </Typography>
                </Box>
                <Box sx={{ width: "10rem" }}>
                  <CircularProgressbar
                    value={
                      targetScore === "35-49"
                        ? 42
                        : targetScore === "50-64"
                        ? 57
                        : targetScore === "65-78"
                        ? 72
                        : targetScore === "79+"
                        ? 79
                        : 0
                    }
                    maxValue={90}
                    text={targetScore !== undefined ? targetScore : 0}
                    styles={buildStyles({
                      pathColor: "#0CAFFF",
                      textColor: "#0CAFFF",
                    })}
                  />
                  <Typography sx={{ textAlign: "center", my: 2 }}>
                    Target Score
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ minWidth: "75vw", mt: 2 }}>
              <TableContainer
                component={Paper}
                sx={{
                  my: 2,
                  // ...PageCard.mtTable,
                  "& .MuiTable-root": {
                    overflowX: "auto",
                  },
                }}
              >
                <Table
                  sx={{
                    "& .MuiTableHead-root .MuiTableRow-head": {
                      backgroundColor: "cyan",
                    },
                  }}
                >
                  <TableHead
                    sx={{
                      "& .MuiTableRow-head": {
                        backgroundColor: "cyan",
                        border: 0,
                        m: 0,
                      },
                    }}
                  >
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Assigned Plan</TableCell>
                      <TableCell>Finished Records</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(history).map((key, index) => (
                      <TableRow key={key}>
                        <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                          {key}
                        </TableCell>
                        <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                          <ul>
                            {Object.keys(history[key]["plan"]).map((c, i) => (
                              <li key={c}>
                                {c} : {history[key]["plan"][c]}
                              </li>
                            ))}
                          </ul>
                        </TableCell>
                        <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                          <ul>
                            {Object.keys(history[key]["user_record"]).map(
                              (c, i) => (
                                <li key={c}>
                                  {c} : {history[key]["user_record"][c]}
                                </li>
                              )
                            )}
                          </ul>
                        </TableCell>
                        <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                          {dateString === key &&
                          history[key]["status"] !== "finished"
                            ? "in progress"
                            : history[key]["status"]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        )}
      {loading && (
        <Box>
          <Typography>Loading ... </Typography>
        </Box>
      )}
      {!loading && !historyExist && (
        <Box>
          <Typography>No history yet ...</Typography>
        </Box>
      )}
    </section>
  );
}

export default DailyPlanHistoryPage;
