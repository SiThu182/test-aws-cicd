import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
// import CloseIcon from "@mui/icons-material/Close";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import GradingIcon from "@mui/icons-material/Grading";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import InfoIcon from "@mui/icons-material/Info";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import LoginIcon from "@mui/icons-material/Login";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardComponent from "../../components/Backend/CardComponents/CardComponent";
import DialogTable from "../../components/Backend/DialogwithTable/DialogTable";
import MtDetail from "../../components/Backend/MockTest/MtDetailPage";
import PageTitle from "../../components/Backend/PageTitle";
import {
  fetchListeningDetailAsync,
  fetchMockTestDetailAsync,
  fetchMockTestListAsync,
  fetchReadingDetailAsync,
  fetchSpeakingDetailAsync,
  fetchUserPlanDetailAsync,
  fetchWritingDetailAsync,
} from "../../redux/thunk/Dashboard";
import { fetchPostsCountAsync } from "../../redux/thunk/Posts";
import UserPlan from "./DashboardUserPlan";
import { PageCard } from "./PageStyle";
import { setError } from "../../redux/slice/SystemInfoAlertSlice";
import TargetAndCountdown from "../../components/Backend/UserDashboardComponent/TargetAndCountdown";
import DailyStudyPlanComponent from "../../components/Backend/UserDashboardComponent/DailyStudyPlanComponent";
import DateCalendarServerRequest from "../../components/Backend/UserDashboardComponent/DateCalendar";
// import TargetAndCountdown from "../../components/Backend/UserDashboardComponent/TargetAndCountdown";
// import PracticeMockTestDetail from "./Members/User/PracticeMockTestDetail";

function Dashboard() {
  const { role, user } = useSelector((state) => state.user);
  let { postCount, postCountStatus } = useSelector((state) => state.posts);
  let {
    speakingPosts,
    mockTestPosts,
    readingPosts,
    writingPosts,
    listeningPosts,
    speakingDetailStatus,
    readingDetailStatus,
    writingDetailStatus,
    listeningDetailStatus,
    mockTestListStatus,
    mockTestDetailStatus,
    mockTestTotalPage,
    userPlanDetail,
    // userPlanDetailStatus,
    mtDetailPost,
  } = useSelector((state) => state.dashboard);

  let userId = localStorage.getItem("userId");

  const dispatch = useDispatch();

  let navigate = useNavigate();
  // let [userPlan, setUserPlan] = useState();
  // let [userPlanHistory, setUserPlanHistory] = useState();
  let [speakingCount, setSpeakingCount] = useState([]);
  let [startAssign, setStartAssign] = useState(false);
  let [startScore, setStartScore] = useState(false);
  let [detailAssign, setDetailAssign] = useState(false);
  let [raCount, setRaCount] = useState();
  let [rsCount, setRsCount] = useState();
  let [rlCount, setRlCount] = useState();
  let [diCount, setDiCount] = useState();
  let [asqCount, setAsqCount] = useState();
  let [writingCount, setWritingCount] = useState([]);
  let [weCount, setWeCount] = useState();
  let [swtCount, setSwtCount] = useState();
  let [readingCount, setReadingCount] = useState([]);
  let [rmcCount, setRmcCount] = useState();
  let [rsmcCount, setRsmcCount] = useState();
  let [rfibCount, setRfibCount] = useState();
  let [rwfibCount, setRwfibCount] = useState();
  let [ropCount, setRopCount] = useState();
  let [listeningCount, setListeningCount] = useState();
  let [mcCount, setMcCount] = useState();
  let [smcCount, setSmcCount] = useState();
  let [fibCount, setFibCount] = useState();
  let [hiwCount, setHiwCount] = useState();
  let [hcsCount, setHcsCount] = useState();
  let [smwCount, setSmwCount] = useState();
  let [sstCount, setSstCount] = useState();
  let [wfdCount, setWfdCount] = useState();
  let [wemailCount, setWemailCount] = useState();
  let [rtsCount, setRtsCount] = useState();
  let [collectAssign, setCollectAssign] = useState(false);

  let [speakingOpen, setSpeakingOpen] = useState(false);
  let [writingOpen, setWritingOpen] = useState(false);
  let [readingOpen, setReadingOpen] = useState(false);
  let [listeningOpen, setListeningOpen] = useState(false);
  //score
  let [speakingScore, setSpeakingScore] = useState("");
  let [readingScore, setReadingScore] = useState("");
  let [writingScore, setWritingScore] = useState("");
  let [listeningScore, setListeningScore] = useState("");
  //Mock test
  let [mtOpen, setMtOpen] = useState(false);
  let [page, setPage] = useState(1);
  let [totalPage, setTotalPage] = useState("");
  let [mtId, setMtId] = useState("");
  let [detailPost, setDetailPost] = useState("");
  let postPath = "student_status/";
  let { post_count, user_count } = postCount;
  // admin/student_status/{user_idi}?type=speaking
  let speakingPath = `student_scores/${userId}?type=speaking`;
  let readingPath = `student_scores/${userId}?type=reading`;
  let writingPath = `student_scores/${userId}?type=writing`;
  let listeningPath = `student_scores/${userId}?type=listening`;
  //Mock Test
  let mockTestPath = `mt-score-user/${userId}?page=${page}`;
  let mtDetailPath = `mt-score-user-detail/${userId}/${mtId}`;
  // const [open, setOpen] = React.useState(false);
  const clickHandler = () => {
    setSpeakingOpen(true);
  };

  const writingClickHandler = () => {
    setWritingOpen(true);
  };

  const readingClickHandler = () => {
    setReadingOpen(true);
  };

  const listeningClickHandler = () => {
    setListeningOpen(true);
  };
  const mtClickHandler = () => {
    setMtOpen(true);
  };

  let handleChange = (event, p) => {
    setPage(p);
  };
  let clickInfo = (id) => {
    setMtId(id);
    mtClickHandler();
    setDetailAssign(true);
  };
  useEffect(() => {
    dispatch(fetchUserPlanDetailAsync());
  }, [dispatch]);

  useEffect(() => {
    if (detailAssign) {
      dispatch(fetchMockTestDetailAsync(mtDetailPath));
      setDetailAssign(false);
    }
  }, [detailAssign, dispatch, mtDetailPath]);

  useEffect(() => {
    if (mockTestDetailStatus === "succeeded") {
      setDetailPost(mtDetailPost);
    }
  }, [mockTestDetailStatus, mtDetailPost]);

  useEffect(() => {
    dispatch(fetchPostsCountAsync({ path: postPath, user_id: userId }));
    dispatch(fetchSpeakingDetailAsync(speakingPath));
    dispatch(fetchReadingDetailAsync(readingPath));
    dispatch(fetchWritingDetailAsync(writingPath));
    dispatch(fetchListeningDetailAsync(listeningPath));
    dispatch(fetchMockTestListAsync(mockTestPath));

    setStartAssign(true);
    setStartScore(true);
  }, [
    dispatch,
    postPath,
    userId,
    speakingPath,
    readingPath,
    writingPath,
    listeningPath,
    mockTestPath,
    page,
  ]);

  useEffect(() => {
    if (postCountStatus === "succeeded" && startAssign) {
      // assignCount(post_count, user_count, speakingCount);
      //Speaking
      let assignCount = (obj, uobj, category) => {
        let totalValue, userValue;
        totalValue = obj.find((o) => o.category === category);
        userValue = uobj.find((u) => u.category === category);

        return [
          {
            category: category,
            total:
              totalValue === undefined || totalValue.c_count === undefined
                ? 0
                : totalValue.c_count,
            user:
              userValue === undefined || userValue.s_count === undefined
                ? 0
                : userValue.s_count,
          },
        ];
      };
      setRaCount(assignCount(post_count, user_count, "ra"));
      setRsCount(assignCount(post_count, user_count, "rs"));
      setRlCount(assignCount(post_count, user_count, "rl"));
      setDiCount(assignCount(post_count, user_count, "di"));
      setAsqCount(assignCount(post_count, user_count, "asq"));
      setRtsCount(assignCount(post_count, user_count, "rts"));
      // Writing
      setWeCount(assignCount(post_count, user_count, "we"));
      setSwtCount(assignCount(post_count, user_count, "swt"));
      setWemailCount(assignCount(post_count, user_count, "wemail"));
      //Reading
      setRmcCount(assignCount(post_count, user_count, "rmc"));
      setRsmcCount(assignCount(post_count, user_count, "rsmc"));
      setRfibCount(assignCount(post_count, user_count, "rfib"));
      setRwfibCount(assignCount(post_count, user_count, "rwfib"));
      setRopCount(assignCount(post_count, user_count, "rop"));

      //Listening
      setMcCount(assignCount(post_count, user_count, "mc"));
      setSmcCount(assignCount(post_count, user_count, "smc"));
      setFibCount(assignCount(post_count, user_count, "fib"));
      setHiwCount(assignCount(post_count, user_count, "hiw"));
      setSmwCount(assignCount(post_count, user_count, "smw"));
      setHcsCount(assignCount(post_count, user_count, "hcs"));
      setSstCount(assignCount(post_count, user_count, "sst"));
      setWfdCount(assignCount(post_count, user_count, "wfd"));

      setStartAssign(false);
      setCollectAssign(true);
    }
  }, [startAssign, post_count, user_count, postCountStatus]);

  useEffect(() => {
    if (collectAssign) {
      setSpeakingCount([
        raCount[0],
        rsCount[0],
        rlCount[0],
        diCount[0],
        asqCount[0],
        rtsCount[0],
      ]);
      setWritingCount([weCount[0], swtCount[0], wemailCount[0]]);
      setReadingCount([
        rsmcCount[0],
        rmcCount[0],
        rfibCount[0],
        rwfibCount[0],
        ropCount[0],
      ]);
      setListeningCount([
        smcCount[0],
        mcCount[0],
        fibCount[0],
        hiwCount[0],
        hcsCount[0],
        smwCount[0],
        sstCount[0],
        wfdCount[0],
      ]);
      setCollectAssign(false);
    }
  }, [
    collectAssign,
    raCount,
    rsCount,
    rtsCount,
    rlCount,
    diCount,
    asqCount,
    weCount,
    swtCount,
    rsmcCount,
    rmcCount,
    rfibCount,
    ropCount,
    rwfibCount,
    mcCount,
    smcCount,
    fibCount,
    hiwCount,
    hcsCount,
    wemailCount,
    smwCount,
    sstCount,
    wfdCount,
  ]);
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
      setTotalPage(mockTestTotalPage);

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
  const mobile = localStorage.getItem("mobile");
  const browser = localStorage.getItem("browser");

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
      {/* <PreSubscribed /> */}
      <UserPlan
        userPlan={userPlanDetail?.user_plan}
        planHistory={userPlanDetail?.plan_history}
        status={userPlanDetail.status}
        name={userPlanDetail.plan_name}
        user={user}
        userId={userId}
      ></UserPlan>
      <Box sx={{ width: "100%", my: 2 }}>
        <Divider variant="middle"></Divider>
      </Box>
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
      {/* <TargetAndCountdown /> */}
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
      <>
        <Box sx={{ width: "100%", my: 5 }}>
          <Divider variant="middle"></Divider>
        </Box>
        <Typography variant="h5">Practice Scores List</Typography>

        <Box
          sx={{
            display: "flex",
            // lg: "inline-block",

            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <Card
            sx={{
              ...PageCard.practiceScore,
            }}
          >
            <CardHeader
              sx={{ backgroundColor: "red", height: "4.5rem" }}
              action={
                <KeyboardVoiceIcon
                  sx={{
                    ...PageCard.iconFont,
                  }}
                ></KeyboardVoiceIcon>
              }
              title="Speaking"
              subheader="Progress"
            ></CardHeader>
            <CardContent>
              {speakingCount !== undefined && speakingCount.length === 6 ? (
                speakingCount.map((s, index) => (
                  <Box key={index}>
                    <Typography variant="body6" sx={{ ...PageCard.pScoreFont }}>
                      {s.category === "ra"
                        ? "Read Aloud"
                        : s.category === "rs"
                        ? "Repeat Sentence"
                        : s.category === "rl"
                        ? "Retell Lecture"
                        : s.category === "di"
                        ? "Describe Image"
                        : s.category === "asq"
                        ? "Answer Short Question"
                        : "Response to Situation(PTE Core)"}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {s.total !== 0 && (
                        <>
                          <LinearProgress
                            variant="determinate"
                            value={
                              (s.user === undefined ? 0 : s.user / s.total) *
                              100
                            }
                            sx={{
                              ...PageCard.ProgressAnimation,
                            }}
                          ></LinearProgress>
                          <Typography
                            sx={{ textAlign: "center", width: "30%" }}
                          >
                            {Math.floor(
                              (s.user === undefined ? 0 : s.user / s.total) *
                                100
                            )}
                            %
                          </Typography>
                        </>
                      )}

                      <small>{s.total === 0 && "no post yet"}</small>
                    </Box>
                  </Box>
                ))
              ) : (
                <CircularProgress></CircularProgress>
              )}
              {speakingPosts.length !== 0 &&
                speakingPosts !== "" &&
                speakingPosts !== 0 && (
                  <Box
                    sx={{
                      ...PageCard.ButtonBox,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ width: "10rem" }}
                      onClick={clickHandler}
                    >
                      <LoginIcon></LoginIcon>
                    </Button>
                  </Box>
                )}
            </CardContent>
          </Card>
          <DialogTable
            open={speakingOpen}
            setOpen={setSpeakingOpen}
            score={
              speakingScore === "" || speakingScore === 0 ? "0" : speakingScore
            }
            title={"Speaking"}
            status={speakingDetailStatus}
          ></DialogTable>
          <Card
            sx={{
              ...PageCard.practiceScore,
            }}
          >
            <CardHeader
              sx={{ backgroundColor: "yellow", height: "4.5rem" }}
              action={
                <DriveFileRenameOutlineIcon
                  sx={{ ...PageCard.iconFont }}
                ></DriveFileRenameOutlineIcon>
              }
              title="Writing"
              subheader="Progress"
            ></CardHeader>
            <CardContent>
              {writingCount !== undefined && writingCount.length === 3 ? (
                writingCount.map((s, index) => (
                  <Box key={index}>
                    <Typography variant="body6" sx={{ ...PageCard.pScoreFont }}>
                      {s.category === "we"
                        ? "Write Essay"
                        : s.category === "swt"
                        ? "Summarize Written Text"
                        : "Write email (PTE Core)"}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {s.total !== 0 && (
                        <>
                          <LinearProgress
                            variant="determinate"
                            value={
                              (s.user === undefined ? 0 : s.user / s.total) *
                              100
                            }
                            sx={{
                              ...PageCard.ProgressAnimation,
                            }}
                          ></LinearProgress>
                          <Typography
                            sx={{ textAlign: "center", width: "30%" }}
                          >
                            {Math.floor(
                              (s.user === undefined ? 0 : s.user / s.total) *
                                100
                            )}
                            %
                          </Typography>
                        </>
                      )}

                      <small>{s.total === 0 && "no post yet"}</small>
                    </Box>
                  </Box>
                ))
              ) : (
                <CircularProgress></CircularProgress>
              )}

              {writingPosts.length !== 0 &&
                writingPosts !== "" &&
                writingPosts !== 0 && (
                  <Box
                    sx={{
                      ...PageCard.ButtonBox,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ width: "10rem" }}
                      onClick={writingClickHandler}
                    >
                      <LoginIcon></LoginIcon>
                    </Button>
                  </Box>
                )}
            </CardContent>
          </Card>
          <DialogTable
            open={writingOpen}
            setOpen={setWritingOpen}
            score={
              writingScore === "" || writingScore === 0 ? "0" : writingScore
            }
            status={writingDetailStatus}
            title={"Writing"}
          ></DialogTable>
          <Card
            sx={{
              ...PageCard.practiceScore,
            }}
          >
            <CardHeader
              sx={{ backgroundColor: "yellowgreen", height: "4.5rem" }}
              action={
                <AutoStoriesIcon
                  sx={{ ...PageCard.iconFont }}
                ></AutoStoriesIcon>
              }
              title="Reading"
              subheader="Progress"
            ></CardHeader>
            <CardContent>
              {readingCount !== undefined && readingCount.length === 5 ? (
                readingCount.map((s, index) => (
                  <Box key={index}>
                    <Typography variant="body6" sx={{ ...PageCard.pScoreFont }}>
                      {s.category === "rsmc"
                        ? "Single Answer"
                        : s.category === "rmc"
                        ? "Multiple Answer"
                        : s.category === "rfib"
                        ? "Fill In The Blank"
                        : s.category === "rwfib"
                        ? "RW Fill in the Blank"
                        : s.category === "rop"
                        ? "Reorder Paragraph"
                        : ""}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {s.total !== 0 && (
                        <>
                          <LinearProgress
                            variant="determinate"
                            value={
                              (s.user === undefined ? 0 : s.user / s.total) *
                              100
                            }
                            sx={{
                              ...PageCard.ProgressAnimation,
                            }}
                          ></LinearProgress>
                          <Typography
                            sx={{ textAlign: "center", width: "30%" }}
                          >
                            {Math.floor(
                              (s.user === undefined ? 0 : s.user / s.total) *
                                100
                            )}
                            %
                          </Typography>
                        </>
                      )}

                      <small>{s.total === 0 && "no post yet"}</small>
                    </Box>
                  </Box>
                ))
              ) : (
                <CircularProgress></CircularProgress>
              )}
              {readingPosts.length !== 0 &&
                readingPosts !== "" &&
                readingPosts !== 0 && (
                  <Box
                    sx={{
                      ...PageCard.ButtonBox,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ width: "10rem" }}
                      onClick={readingClickHandler}
                    >
                      <LoginIcon></LoginIcon>
                    </Button>
                  </Box>
                )}
            </CardContent>
          </Card>
          <DialogTable
            open={readingOpen}
            setOpen={setReadingOpen}
            score={
              readingScore === "" || readingScore === 0 ? "0" : readingScore
            }
            title={"Reading"}
            status={readingDetailStatus}
          ></DialogTable>
          <Card
            sx={{
              ...PageCard.practiceScore,
            }}
          >
            <CardHeader
              sx={{ backgroundColor: "cyan", height: "4.5rem" }}
              action={
                <GraphicEqIcon sx={{ ...PageCard.iconFont }}></GraphicEqIcon>
              }
              title="Listening"
              subheader="Progress"
            ></CardHeader>
            <CardContent>
              {listeningCount !== undefined && listeningCount.length === 8 ? (
                listeningCount.map((s, index) => (
                  <Box key={index}>
                    <Typography variant="body6" sx={{ ...PageCard.pScoreFont }}>
                      {s.category === "smc"
                        ? "Single Answer"
                        : s.category === "mc"
                        ? "Multiple Answer"
                        : s.category === "fib"
                        ? "Fill In The Blank"
                        : s.category === "hiw"
                        ? "Highlight Incorrect Word"
                        : s.category === "hcs"
                        ? "Highlight Correct Summary"
                        : s.category === "smw"
                        ? "Select Missing Words"
                        : s.category === "sst"
                        ? "Summarized Spoken Text"
                        : "Write from Dictation"}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {s.total !== 0 && (
                        <>
                          <LinearProgress
                            variant="determinate"
                            value={
                              (s.user === undefined ? 0 : s.user / s.total) *
                              100
                            }
                            sx={{
                              ...PageCard.ProgressAnimation,
                            }}
                          ></LinearProgress>
                          <Typography
                            sx={{ textAlign: "center", width: "30%" }}
                          >
                            {Math.floor(
                              (s.user === undefined ? 0 : s.user / s.total) *
                                100
                            )}
                            %
                          </Typography>
                        </>
                      )}

                      <small>{s.total === 0 && "no post yet"}</small>
                    </Box>
                  </Box>
                ))
              ) : (
                <CircularProgress></CircularProgress>
              )}
              {listeningPosts.length !== 0 &&
                listeningPosts !== "" &&
                listeningPosts !== 0 && (
                  <Box
                    sx={{
                      ...PageCard.ButtonBox,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ width: "10rem" }}
                      onClick={listeningClickHandler}
                    >
                      <LoginIcon></LoginIcon>
                    </Button>
                  </Box>
                )}
            </CardContent>
          </Card>
          <DialogTable
            open={listeningOpen}
            setOpen={setListeningOpen}
            score={
              listeningScore === "" || listeningScore === 0
                ? "0"
                : listeningScore
            }
            title={"Listening"}
            status={listeningDetailStatus}
          ></DialogTable>
        </Box>
      </>
      <Box sx={{ width: "100%", my: 5 }}>
        <Divider variant="middle"></Divider>
      </Box>
      <Box sx={{ width: "100%", mt: "2rem" }}>
        <Typography variant="h5">Mock Test Scores List</Typography>
        <TableContainer
          component={Paper}
          sx={{
            ...PageCard.mtTable,
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
                <TableCell>No.</TableCell>
                <TableCell>Mock Test </TableCell>
                <TableCell>Speaking</TableCell>
                <TableCell>Reading</TableCell>
                <TableCell>Writing</TableCell>
                <TableCell>Listening</TableCell>
                <TableCell>Overall Point</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Retake</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTestPosts !== "" && mockTestPosts !== undefined ? (
                mockTestPosts.map((mt, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ width: "12.5%" }}>{index + 1}</TableCell>
                    <TableCell sx={{ width: "12.5%" }}>
                      {mt.mock_test.name}
                    </TableCell>
                    <TableCell sx={{ width: "12.5%" }}>
                      {mt.speaking === null ? 0 : mt.speaking}
                    </TableCell>
                    <TableCell sx={{ width: "12.5%" }}>
                      {mt.reading === null ? 0 : mt.reading}
                    </TableCell>
                    <TableCell sx={{ width: "12.5%" }}>
                      {mt.writing === null ? 0 : mt.writing}
                    </TableCell>
                    <TableCell sx={{ width: "12.5%" }}>
                      {mt.listening === null ? 0 : mt.listening}
                    </TableCell>
                    <TableCell sx={{ width: "12.5%" }}>
                      {mt.overall_point}
                    </TableCell>
                    <TableCell sx={{ width: "25%" }}>
                      {mt.status === 1 ? (
                        <Button
                          variant="contained"
                          disabled={
                            detailAssign && mtId === mt.id ? true : false
                          }
                          onClick={() => clickInfo(mt.id)}
                        >
                          {/* {detailAssign && mtId === mt.id ? (
                          <CircularProgress
                            sx={{ backgroundColor: "#ffff" }}
                          ></CircularProgress>
                        ) : (
                          <InfoIcon></InfoIcon>
                        )} */}
                          <InfoIcon></InfoIcon>
                        </Button>
                      ) : (
                        "Not Available"
                      )}
                    </TableCell>
                    <TableCell sx={{ width: "25%" }}>
                      {mt.status === 2 ? (
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "red" }}
                          disabled={
                            detailAssign && mtId === mt.id ? true : false
                          }
                          onClick={() =>
                            navigate(
                              "/mocktest/test/" + mt.id + "/" + mt.mt_type_id
                            )
                          }
                        >
                          {/* {detailAssign && mtId === mt.id ? (
                          <CircularProgress
                            sx={{ backgroundColor: "#ffff" }}
                          ></CircularProgress>
                        ) : (
                          <InfoIcon></InfoIcon>
                        )} */}
                          <ContentPasteGoIcon></ContentPasteGoIcon>
                        </Button>
                      ) : (
                        "Not Available"
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress></CircularProgress>
                  </Box>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {detailPost !== "" && detailPost !== undefined && mtOpen && (
          <MtDetail
            open={mtOpen}
            setOpen={setMtOpen}
            post={detailPost}
          ></MtDetail>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            my: 2,
          }}
        >
          {totalPage !== "" && totalPage !== undefined && (
            <Pagination
              size="large"
              count={parseInt(totalPage)}
              color="primary"
              page={page}
              onChange={handleChange}
            />
          )}
        </Box>
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
