import React, { useEffect, useState } from "react";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
// import CloseIcon from "@mui/icons-material/Close";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import GradingIcon from "@mui/icons-material/Grading";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import CancelIcon from "@mui/icons-material/Cancel";
// import MessengerCustomerChat from "react-messenger-customer-chat";
import {
  Box,
  //   Button,
  //   Card,
  //   CardContent,
  //   CardHeader,
  //   CircularProgress,
  Divider,
  Typography,
  Pagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import CardComponent from "../../components/Backend/CardComponents/CardComponent";
import PageTitle from "../../components/Backend/PageTitle";

import { PageCard } from "./PageStyle";
import PieChart from "../../components/Chart/PieChart";
import {
  FetchVisitorsAsync,
  FetchDailyPracticeAsync,
} from "../../redux/thunk/Visitor";
import { setError } from "../../redux/slice/SystemInfoAlertSlice";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TargetAndCountdown from "../../components/Backend/UserDashboardComponent/TargetAndCountdown";
import DailyStudyPlanComponent from "../../components/Backend/UserDashboardComponent/DailyStudyPlanComponent";
import DateCalendarServerRequest from "../../components/Backend/UserDashboardComponent/DateCalendar";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function Dashboard() {
  const { role, user } = useSelector((state) => state.user);
  const {
    visitorList,
    visitorListStatus,
    userType,
    dailyTransactions,
    countryType,
  } = useSelector((state) => state.visitor);

  const { dailyPracticeList } = useSelector((state) => state.dailyPractice);
  // const { filterStatus, setFilterStatus } = useState();

  // let userId = localStorage.getItem("userId");

  const dispatch = useDispatch();

  // let navigate = useNavigate();
  let postPath = "visitors";
  const mobile = localStorage.getItem("mobile");
  const browser = localStorage.getItem("browser");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  let [page, setPage] = useState(1);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // Ensure end date is not before the new start date
    if (endDate !== null && date > endDate) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    // Ensure end date is not before the start date
    if (startDate !== null && date < startDate) {
      setEndDate(startDate);
      alert("End date cannot be before the start date");
    } else {
      setEndDate(date);
    }
  };

  let dateFormat = (val_date) => {
    // const formattedDate = date.toLocaleDateString('en-US', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    // }).replace(/\//g, '-');
    let date = new Date(val_date);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    return formattedDate;
  };

  useEffect(() => {
    if (endDate) {
      postPath =
        "visitors?start_date=" +
        dateFormat(startDate) +
        "&end_date=" +
        dateFormat(endDate);
    }
    dispatch(FetchVisitorsAsync({ path: postPath }));
    dispatch(FetchDailyPracticeAsync({ path: "daily-practice-check" }));
  }, [dispatch, postPath, endDate]);

  let dailyPracticePath;
  useEffect(() => {
    if (page) {
      dailyPracticePath = "daily-practice-check?page=" + page;
    } else {
      dailyPracticePath = "daily-practice-check";
    }

    dispatch(FetchDailyPracticeAsync({ path: dailyPracticePath }));
  }, [dispatch, dailyPracticePath, page]);

  const chartOptions = {
    legend: {
      display: true, // Set to true to display the legend
      position: "top", // Choose the legend position (e.g., 'top', 'bottom', 'left', 'right')
    },
  };

  let handleChange = (event, p) => {
    setPage(p);
  };
  return (
    <>
      <PageTitle text={"Dashboard"}></PageTitle>
      {(mobile == true ||
        browser === "Firefox" ||
        browser.includes("Opera")) && (
        <>
          <Box sx={{ width: "100%", mt: 2 }} className="unsupported-alert-box">
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#ff3d00",
                color: "white",
                my: 2,
                borderRadius: "0.5rem",
                p: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  cursor: "pointer",
                }}
              >
                <CancelIcon
                  variant="contained"
                  sx={{
                    backgroundColor: "#ff3d00",
                    "&:hover": {
                      backgroundColor: "darkred",
                    },
                  }}
                  onClick={() => {
                    let box = document.querySelector(".unsupported-alert-box");
                    box.style.display = "none";
                    let text = document.querySelector(".alert-text");
                    dispatch(setError({ state: 1, error: text.textContent }));
                  }}
                ></CancelIcon>
              </Box>
              <Box className="alert-text">
                {" "}
                {mobile
                  ? "You are using with mobile device .Currently the speech recognition for mobile browser are not supported well yet. We suggest you try chrome on desktop "
                  : ""}
                {browser === "Firefox" || browser.includes("Opera")
                  ? "You are using with unsupported browser *" +
                    browser +
                    " .Currently the speech recognition for some browsers are not supported well yet. We suggest you try chrome on desktop . "
                  : ""}
              </Box>
            </Box>
          </Box>
        </>
      )}

      <Box
        component={"section"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          my: 1,
          gap: 2,
          flexDirection: "flex-start",
        }}
      >
        <TargetAndCountdown />

        <DailyStudyPlanComponent />

        <DateCalendarServerRequest />
      </Box>

      <Box sx={{ width: "100%", my: 2 }}>
        <Divider variant="middle"></Divider>
      </Box>

      {role === null || role === "" ? (
        <></>
      ) : (
        <>
          <CardComponent title="Speaking" number="5" path="/admin/speaking">
            <KeyboardVoiceIcon
              sx={{ fontSize: "2.5rem", marginLeft: "3rem" }}
            ></KeyboardVoiceIcon>
            <Typography
              variant="h5"
              sx={{
                ...PageCard.cardFont,
              }}
            >
              <small>Ai Scoring</small>
            </Typography>
          </CardComponent>
          {/* speaking card */}

          {/* writing card */}
          <CardComponent title="Writing" path="/admin/writing" number="2">
            <DriveFileRenameOutlineIcon
              sx={{ fontSize: "2.5rem", marginLeft: "3rem" }}
            ></DriveFileRenameOutlineIcon>
            <Typography
              variant="h5"
              sx={{
                ...PageCard.cardFont,
              }}
            >
              <small>Ai Scoring</small>
            </Typography>
          </CardComponent>
          {/* writing card */}

          {/* reading card */}
          <CardComponent title="Reading" number="5" path="/admin/reading">
            <AutoStoriesIcon sx={{ fontSize: "2.5rem" }}></AutoStoriesIcon>
          </CardComponent>
          {/* reading card */}

          {/* listening card */}
          <CardComponent title="Listening" number="8" path="/admin/listening">
            <GraphicEqIcon sx={{ fontSize: "2.5rem" }}></GraphicEqIcon>
          </CardComponent>
          {/* listening card */}
        </>
      )}

      {/* Mock test card */}
      <CardComponent title="Mock Test" number="5" path="/mocktest/tabs">
        <GradingIcon sx={{ fontSize: "2.5rem" }}></GradingIcon>
      </CardComponent>
      {/* Mock test card */}

      <Box sx={{ width: "100%", my: 2 }}>
        <Divider variant="middle"></Divider>
      </Box>
      {/* filter date range */}
      <Box sx={{ mb: 1, mx: 2 }}>
        <label>Start Date: </label>
        <DatePicker
          showIcon
          selected={startDate}
          dateFormat="yyyy/MM/dd"
          onChange={(date) => handleStartDateChange(date)}
        />
      </Box>
      <Box>
        <label>End Date&nbsp; : </label>
        <DatePicker
          showIcon
          selected={endDate}
          dateFormat="yyyy/MM/dd"
          onChange={(date) => handleEndDateChange(date)}
        />
      </Box>
      {/* filter date range */}

      <Box sx={{ width: "100%", my: 2 }}>
        <Divider variant="middle"></Divider>
      </Box>

      {visitorListStatus === "succeeded" && (
        <Box
          sx={{
            width: "45%",
            m: 2,
            bgcolor: "#199CE5",
            "@media screen and (max-width: 480px)": {
              width: "100%",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              bgcolor: "#199CE5",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" sx={{ m: 1 }}>
              <small>Visitor Analytic</small>
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              my: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <PieChart data={visitorList} title="Visitors" />
          </Box>
        </Box>
      )}
      {visitorListStatus === "succeeded" && (
        <Box
          sx={{
            width: "48%",
            m: 2,
            bgcolor: "#199CE5",
            "@media screen and (max-width: 480px)": {
              width: "100%",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              bgcolor: "#199CE5",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">
              <small>Users</small>
            </Typography>
            <Typography variant="h5">
              <small>Filter</small>
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              my: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <PieChart data={userType} title="Total User" />
          </Box>
        </Box>
      )}
      {visitorListStatus === "succeeded" && (
        <Box
          sx={{
            width: "48%",
            m: 2,
            bgcolor: "#199CE5",
            "@media screen and (max-width: 480px)": {
              width: "100%",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              bgcolor: "#199CE5",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">
              <small>Users</small>
            </Typography>
            <Typography variant="h5">
              <small>Filter</small>
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              my: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <PieChart data={countryType} title="Country" status={true} />
          </Box>
        </Box>
      )}

      <Box
        sx={{
          width: "45%",
          m: 2,
          // bgcolor: "#199CE5",
          "@media screen and (max-width: 480px)": {
            width: "100%",
          },
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead sx={{ bgcolor: "#199CE5", color: "white" }}>
              <TableRow>
                <TableCell variant="h6" sx={{ color: "white" }}>
                  Latest Transaction
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dailyTransactions.length > 0 ? (
                dailyTransactions.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.user.name}</TableCell>
                    <TableCell>{row.user.email}</TableCell>

                    <TableCell>
                      <Typography
                        variant="body1"
                        sx={{
                          bgcolor:
                            row?.payment_status == 2
                              ? "red"
                              : row?.payment_status == 1
                              ? "green"
                              : "orange",
                          textAlign: "center",
                          borderRadius: 1,
                        }}
                      >
                        {" "}
                        {row?.payment_status == 2
                          ? "cancel"
                          : row?.payment_status == 1
                          ? "Confrim"
                          : "waiting"}{" "}
                      </Typography>
                    </TableCell>
                    <TableCell>{row?.subscription_plan?.name}</TableCell>
                  </TableRow>
                ))
              ) : (
                <p sx={{ margin: "10px" }}>no transaction data today</p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box
        sx={{
          width: "45%",
          m: 2,
          bgcolor: "#199CE5",
          "@media screen and (max-width: 480px)": {
            width: "100%",
          },
        }}
      >
        <h6></h6>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead sx={{ bgcolor: "#199CE5", color: "white" }}>
              <TableRow sx={{ color: "white", width: "100%" }}>
                <TableCell variant="h6" sx={{ color: "white" }} colSpan={3}>
                  Daily Practice Record
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="h6" sx={{ color: "white" }}>
                  Username
                </TableCell>
                <TableCell variant="h6" sx={{ color: "white" }}>
                  Practice Count
                </TableCell>
                <TableCell variant="h6" sx={{ color: "white" }}>
                  Category
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dailyPracticeList.data !== undefined
                ? dailyPracticeList.data.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{ color: "black" }}>
                        {row.username}
                      </TableCell>
                      <TableCell sx={{ color: "black" }}>{row.count}</TableCell>
                      <TableCell sx={{ color: "black" }}>
                        {row.category}
                      </TableCell>

                      {/* <TableCell sx={{ color: "white" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        bgcolor:
                          row?.payment_status == 2
                            ? "red"
                            : row?.payment_status == 1
                            ? "green"
                            : "orange",
                        textAlign: "center",
                        borderRadius: 1,
                      }}
                    >
                      {" "}
                      {row?.payment_status == 2
                        ? "cancel"
                        : row?.payment_status == 1
                        ? "Confrim"
                        : "waiting"}{" "}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {row.subscription_plan.name}
                  </TableCell> */}
                    </TableRow>
                  ))
                : "no practice data today"}
            </TableBody>
          </Table>

          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              my: 2,
            }}
          >
            <Pagination
              size="large"
              count={dailyPracticeList.last_page}
              color="primary"
              page={page}
              onChange={handleChange}
            />
          </Box>
        </TableContainer>
      </Box>

      

      {/* <Box>
        <MessengerCustomerChat
          pageId="100823749735658"
          appId="639781087735470"
        />
      </Box> */}
    </>
  );
}

export default Dashboard;
