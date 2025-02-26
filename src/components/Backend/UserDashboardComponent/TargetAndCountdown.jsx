import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Modal,
  Skeleton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import DateCalendarServerRequest from "./DateCalendar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import dayjs from "dayjs";
import axios from "axios";

import swal from "sweetalert";
import { getCookie } from "../../../Utils/GetCookies";
import { GenerateStudyPlan } from "../../../Utils/CheckStudyPlanProgress";
import { generateDailyPlan } from "../../../Utils/GenerateDailyPlan";
// const ExamCountdown = React.memo(() => {
//   return <DateCalendarServerRequest />;
// });

const TargetScore = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [score, setScore] = useState("");
  const [value, setValue] = useState();
  const [startDateValue, setStartDateValue] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (scoreValue) => {
    setAnchorEl(null);
    setScore(scoreValue);
  };

  const [countdown, setCountdown] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchStudyPlan, setFetchStudyPlan] = useState(false);
  const [errorFetching, setErrorFetching] = useState(false);
  const [studyPlanExist, setStudyPlanExist] = useState(false);
  // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  useEffect(() => {
    if (value !== null) {
      const calculateCountdown = () => {
        const now = new Date();
        const downtime = new Date(value);
        const downtimeDate = new Date(downtime);
        const timeDifference = downtimeDate.getTime() - now.getTime();

        return Math.max(Math.floor(timeDifference / 1000), 0);
      };
      setCountdown(calculateCountdown);
    }
  }, [value]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  let userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchStudyPlan = async () => {
      try {
        let token = getCookie("userToken");
        setFetchStudyPlan(true);
        let config = { headers: { Authorization: "Bearer " + token } };
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_ADMIN}get-latest-study-plan/${userId}}`,
          config
        );

        if (response.data.status === 1) {
          setErrorFetching(false);
          if (
            response?.data.data !== null &&
            response?.data.data !== undefined
          ) {
            setScore(response?.data.data.target_score);
            setValue(dayjs(response?.data.data?.exam_date?.toString()));
            setStartDateValue(
              dayjs(response?.data.data?.start_date?.toString())
            );
            setStudyPlanExist(true);
          }
        }
      } catch (error) {
        setErrorFetching(true);
      } finally {
        setFetchStudyPlan(false);
      }
    };
    if (userId !== null && userId !== undefined) fetchStudyPlan();
  }, [userId]);

  const formatTime = (totalSeconds) => {
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const onClickGenerate = async () => {
    if (
      startDateValue !== null &&
      startDateValue !== undefined &&
      startDateValue < value &&
      value !== null
    ) {
      // const exam_date = value;
      // const target_score = score;
      const user_id = localStorage.getItem("userId");
      // setLoading(true);
      const plan = await GenerateStudyPlan(startDateValue, value, score);

      let dailyPlan;
      let extraDailyPlan;

      if (plan.days > 30) {
        extraDailyPlan = await generateDailyPlan(
          plan.extraDays,
          plan.extraDailyPlan,
          plan.categoryArrayForExtraDays
        );
      }
      dailyPlan = await generateDailyPlan(
        plan.days > 30 ? 30 : plan.days,
        plan.dailyPlan,
        plan.categoryArray
      );

      if (plan === -1) {
        swal({
          title: "Error ",
          text: "Exam date must not be within a week to generate study plan.",
          icon: "error",
          buttons: true,
          dangerMode: true,
          timer: 2000,
        });
      } else {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_ADMIN}generate-study-plan`,
            {
              exam_date: dayjs(plan.examDate).format("YYYY-MM-DD"),
              start_date: dayjs(plan.startDate).format("YYYY-MM-DD"),
              target_score: score,
              user_id: user_id,
              daily_plan: dailyPlan,
              extra_daily_plan: extraDailyPlan,
              days: plan.days,
            }
          );
          if (response.data.status === 1) {
            swal({
              title: "Success Alert",
              text: "Study plan successfully generated.Click 'OK' to reload system to apply changes to study plan.",
              icon: "success",
              buttons: true,
              // dangerMode: true,
            }).then((ok) => {
              if (ok) {
                window.location.reload();
              }
            });
          }
        } catch (error) {
          swal({
            title: "Error",
            text: "Fail to generate study plan",
            icon: "error",
            // buttons: true,
            // dangerMode: true,
            timer: 2000,
          });
        } finally {
          setLoading(false);
        }
      }
    } else {
      swal({
        title: "Error",
        text: "Choose both start date and exam date for study plan and start date must be less than exam date .",
        icon: "error",
        buttons: true,
        dangerMode: true,
      });
    }
  };
  const planExistAlert = async () => {
    swal({
      title: "Warning",
      text: "You already have plan .Do you want to create a new one? Current one will be lost.",
      icon: "info",
      buttons: true,
      // dangerMode: true,
    }).then((yes) => {
      if (yes) {
        onClickGenerate();
      }
    });
  };

  return (
    <Box
      sx={{
        borderRadius: "2rem",
        boxShadow: 4,
        minWidth: "300px",
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: 2 }}>
        {fetchStudyPlan ? (
          <Skeleton variant="rectangular" width={"100%"} height={"100%"}>
            <Typography>.</Typography>
          </Skeleton>
        ) : (
          <Typography variant="h5" component={"h5"}>
            Target Score
          </Typography>
        )}
        <div>
          <Button
            id="basic-button"
            variant="outlined"
            sx={{ my: 2, mx: "auto", width: "100%" }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            disabled={open}
          >
            {fetchStudyPlan ? (
              <Skeleton variant="rectangular" width={"100%"} height={"100%"}>
                <Typography>.</Typography>
              </Skeleton>
            ) : (
              <>Choose your target score</>
            )}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleClose("35-49")}>35-49</MenuItem>
            <MenuItem onClick={() => handleClose("50-64")}>50-64</MenuItem>
            <MenuItem onClick={() => handleClose("65-78")}>65-78</MenuItem>
            <MenuItem onClick={() => handleClose("79+")}>79+</MenuItem>
          </Menu>
        </div>
        <Box sx={{ width: "30%", mx: "auto" }}>
          {fetchStudyPlan ? (
            <Skeleton variant="circular" width={80} height={80} />
          ) : (
            <CircularProgressbar
              value={
                score === "35-49"
                  ? 42
                  : score === "50-64"
                  ? 57
                  : score === "65-78"
                  ? 72
                  : score === "79+"
                  ? 79
                  : 0
              }
              maxValue={90}
              text={score == "" ? 0.0 : score}
              styles={buildStyles({
                pathColor: "#0CAFFF",
                textColor: "#0CAFFF",
              })}
            />
          )}
        </Box>
      </Box>
      {fetchStudyPlan ? (
        <Skeleton variant="rectangular" width={"100%"}>
          <Typography sx={{ color: "black", ml: 2 }} variant="h6">
            .
          </Typography>
        </Skeleton>
      ) : (
        <Typography sx={{ color: "black", ml: 2 }} variant="h6">
          Exam Countdown{" "}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#0CAFFF",
            borderRadius: "2rem",
            boxShadow: 5,

            px: 2,
            width: "90%",
            cursor: "pointer",
            "&:hover": {
              "&.MuiButtonBase-root": {
                background: "rgba(12,195,295,1)",
                color: "black",
              },
            },
          }}
          onClick={() => setModalOpen(true)}
        >
          {fetchStudyPlan ? (
            <Skeleton variant="rectangular" width={"100%"}>
              <Typography
                variant="p"
                style={{ color: "white", fontWeight: 700 }}
              >
                .
              </Typography>
            </Skeleton>
          ) : (
            <Typography variant="p" style={{ color: "white", fontWeight: 700 }}>
              {formatTime(countdown)}.
            </Typography>
          )}
        </Button>
      </Box>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                backgroundColor: "whitesmoke",
                borderRadius: "1rem",
                p: 2,
                boxShadow: 5,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <CancelIcon
                  onClick={() => setModalOpen(false)}
                  sx={{
                    textAlign: "right",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#0CAFFF",
                    },
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
                <Box>
                  <Typography variant="h5">
                    Choose your Study Plan Start Date{" "}
                  </Typography>
                  <DateCalendar
                    disablePast
                    value={startDateValue}
                    onChange={(newValue) => setStartDateValue(newValue)}
                  />
                </Box>

                <Box>
                  <Typography variant="h5">Choose your exam date </Typography>
                  <DateCalendar
                    disablePast
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </Box>
              </Box>
            </Box>
          </LocalizationProvider>
        </Box>
      </Modal>
      {fetchStudyPlan && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <Skeleton variant="rectangular" width={"50%"}>
            <Typography variant="p" style={{ color: "white", fontWeight: 700 }}>
              .
            </Typography>
          </Skeleton>
        </Box>
      )}
      {value !== null && score !== "" && !fetchStudyPlan && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {errorFetching && (
            <Typography>
              Error fetching the study plan or progress .Refresh to load again
            </Typography>
          )}
          {!errorFetching && (
            <Button
              sx={{
                backgroundColor: "#0CAFFF",
                boxShadow: 5,
                my: 1,
              }}
              disabled={loading}
              onClick={() =>
                studyPlanExist ? planExistAlert() : onClickGenerate()
              }
            >
              <Typography
                variant="p"
                style={{ color: "white", fontWeight: 700 }}
              >
                Generate Study Plan
              </Typography>
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

const TargetAndCountdown = React.memo(() => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 5,
          height: "100%",
          flexWrap: "wrap",
        }}
      >
        <TargetScore />
      </Box>
    </Box>
  );
});

export default TargetAndCountdown;
