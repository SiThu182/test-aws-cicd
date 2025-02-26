import { Button } from "@mui/material";
// import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";

import Layout from "../../components/Layout/Frontend/Layout";
import {
  fetchFullMockTestFrontendAsync,
  fetchListeningMockTestFrontendAsync,
  fetchReadingMockTestFrontendAsync,
  fetchSpeakingMockTestFrontendAsync,
  fetchWritingMockTestFrontendAsync,
} from "../../redux/thunk/MockTestFrontend";
import MockTest from "./MockTest";
import { fetchSaveMockTestListAsync } from "../../redux/thunk/MockTest";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const navigate = useNavigate();
  const {
    fullMockTestFrontend,
    fullMockTestFrontendStatus,

    speakingMockTestFrontend,
    speakingMockTestFrontendStatus,

    readingMockTestFrontend,
    readingMockTestFrontendStatus,

    writingMockTestFrontend,
    writingMockTestFrontendStatus,

    listeningMockTestFrontend,
    listeningMockTestFrontendStatus,
  } = useSelector((state) => state.mtFrontend);
  const {
    saveMtList,
    saveMtListStatus,
    // listeningMockTestError,
  } = useSelector((state) => state.mockTest);

  let [fullMockTest, setFullMockTest] = useState([]);
  let [speakingMockTest, setSpeakingMockTest] = useState([]);
  let [readingMockTest, setReadingMockTest] = useState([]);
  let [writingMockTest, setWritingMockTest] = useState([]);
  let [listeningMockTest, setListeningMockTest] = useState([]);
  let [fullMockTestPage, setFullMockTestPage] = useState(1);
  let [speakingPage, setSpeakingPage] = useState(1);
  let [readingPage, setReadingPage] = useState(1);
  let [writingPage, setWritingPage] = useState(1);
  let [listeningPage, setListeningPage] = useState(1);

  let [fullMockTestFetchState, setFullMockTestFetchState] = useState(false);
  let [speakingMockTestFetchState, setSpeakingMockTestFetchState] =
    useState(false);
  let [readingMockTestFetchState, setReadingMockTestFetchState] =
    useState(false);
  let [writingMockTestFetchState, setWritingMockTestFetchState] =
    useState(false);
  let [listeningMockTestFetchState, setListeningMockTestFetchState] =
    useState(false);

  let [fullMockTestAssign, setFullMockTestAssign] = useState(false);
  let [speakingMockTestAssign, setSpeakingMockTestAssign] = useState(false);
  let [readingMockTestAssign, setReadingMockTestAssign] = useState(false);
  let [writingMockTestAssign, setWritingMockTestAssign] = useState(false);
  let [listeningMockTestAssign, setListeningMockTestAssign] = useState(false);
  const [saveMtListArray, setSaveMtListArray] = useState([]);
  const dispatch = useDispatch();
  let userId = localStorage.getItem("userId");
  React.useEffect(() => {
    if (fullMockTestFrontendStatus === null || fullMockTestFetchState) {
      dispatch(
        fetchFullMockTestFrontendAsync({
          path: "user_id=" + userId + "&mt_type_id=1&page=" + fullMockTestPage,
        })
      );
      setFullMockTestFetchState(false);
      setFullMockTestAssign(true);
    }
    if (speakingMockTestFrontendStatus === null || speakingMockTestFetchState) {
      dispatch(
        fetchSpeakingMockTestFrontendAsync({
          path: "user_id=" + userId + "&mt_type_id=3&page=" + speakingPage,
        })
      );
      setSpeakingMockTestFetchState(false);
      setSpeakingMockTestAssign(true);
    }
    if (readingMockTestFrontendStatus === null || readingMockTestFetchState) {
      dispatch(
        fetchReadingMockTestFrontendAsync({
          path: "user_id=" + userId + "&mt_type_id=4&page=" + readingPage,
        })
      );
      setReadingMockTestFetchState(false);
      setReadingMockTestAssign(true);
    }
    if (writingMockTestFrontendStatus === null || writingMockTestFetchState) {
      dispatch(
        fetchWritingMockTestFrontendAsync({
          path: "user_id=" + userId + "&mt_type_id=6&page=" + writingPage,
        })
      );
      setWritingMockTestFetchState(false);
      setWritingMockTestAssign(true);
    }
    if (
      listeningMockTestFrontendStatus === null ||
      listeningMockTestFetchState
    ) {
      dispatch(
        fetchListeningMockTestFrontendAsync({
          path: "user_id=" + userId + "&mt_type_id=5&page=" + listeningPage,
        })
      );
      setListeningMockTestFetchState(false);
      setListeningMockTestAssign(true);
    }
    dispatch(fetchSaveMockTestListAsync());
  }, [
    dispatch,
    fullMockTestPage,
    userId,
    fullMockTestFetchState,
    speakingMockTestFetchState,
    readingMockTestFetchState,
    writingMockTestFetchState,
    listeningMockTestFetchState,
    fullMockTestFrontendStatus,
    speakingMockTestFrontendStatus,
    readingMockTestFrontendStatus,
    listeningMockTestFrontendStatus,
    writingMockTestFrontendStatus,
    speakingPage,
    readingPage,
    writingPage,
    listeningPage,
  ]);

  useEffect(() => {
    if (saveMtListStatus === "succeeded") {
      setSaveMtListArray(saveMtList.map((s) => s.mt_id));
    }
  }, [saveMtList, saveMtListStatus]);

  useEffect(() => {
    let assignMockTest = (mt, mtId) => {
      let result = [];
      mt.data.forEach((p) => {
        result = [
          ...result,
          [
            p.name,
            "/mocktest/test/" + p.id + "/" + mtId,
            p?.status,
            "/admin/dashboard",
          ],
        ];
      });

      return result;
    };
    if (fullMockTestFrontendStatus === "succeeded" && fullMockTestAssign) {
      setFullMockTest([]);
      setFullMockTest(assignMockTest(fullMockTestFrontend, 1));
      setFullMockTestAssign(false);
    }
    if (
      speakingMockTestFrontendStatus === "succeeded" &&
      speakingMockTestAssign
    ) {
      setSpeakingMockTest([]);
      setSpeakingMockTest(assignMockTest(speakingMockTestFrontend, 3));
      setSpeakingMockTestAssign(false);
    }
    if (
      readingMockTestFrontendStatus === "succeeded" &&
      readingMockTestAssign
    ) {
      setReadingMockTest([]);
      setReadingMockTest(assignMockTest(readingMockTestFrontend, 4));
      setReadingMockTestAssign(false);
    }
    if (
      listeningMockTestFrontendStatus === "succeeded" &&
      listeningMockTestAssign
    ) {
      setListeningMockTest([]);
      setListeningMockTest(assignMockTest(listeningMockTestFrontend, 5));
      setListeningMockTestAssign(false);
    }
    if (
      writingMockTestFrontendStatus === "succeeded" &&
      writingMockTestAssign
    ) {
      setWritingMockTest([]);
      setWritingMockTest(assignMockTest(writingMockTestFrontend, 6));
      setWritingMockTestAssign(false);
    }
  }, [
    fullMockTestFrontend,
    fullMockTestFrontendStatus,
    speakingMockTestFrontendStatus,
    readingMockTestFrontendStatus,
    listeningMockTestFrontendStatus,
    writingMockTestFrontendStatus,
    speakingMockTestFrontend,
    readingMockTestFrontend,
    writingMockTestFrontend,
    listeningMockTestFrontend,
    fullMockTestAssign,
    speakingMockTestAssign,
    readingMockTestAssign,
    writingMockTestAssign,
    listeningMockTestAssign,
  ]);

  let handleFullMockTestPageChange = (event, p) => {
    setFullMockTestPage(p);
    setFullMockTestFetchState(true);
  };

  let handleSpeakingPageChange = (event, p) => {
    setSpeakingPage(p);
    setSpeakingMockTestFetchState(true);
  };
  let handleReadingPageChange = (event, p) => {
    setReadingPage(p);
    setReadingMockTestFetchState(true);
  };
  let handleWritingPageChange = (event, p) => {
    setWritingPage(p);
    setWritingMockTestFetchState(true);
  };
  let handleListeningPageChange = (event, p) => {
    setListeningPage(p);
    setListeningMockTestFetchState(true);
  };

  let fetchStateFunction = () => {
    setFullMockTestFetchState(true);
    setSpeakingMockTestFetchState(true);
    setReadingMockTestFetchState(true);
    setListeningMockTestFetchState(true);
    setWritingMockTestFetchState(true);
  };

  return (
    <Layout speaking="reading">
      <Box sx={{ bgcolor: "rgb(231 239 254)", height: "auto" }}>
        <Box
          sx={{
            px: {
              xs: 1,
              sm: 14,
            },
            py: 5,
          }}
        >
          <Typography variant="h5" color="initial">
            Your Mock Test -Practise Progress
          </Typography>
          <Typography variant="p" color="initial">
            Last attempts - 0
          </Typography>
        </Box>

        <Box sx={{ bgcolor: "rgb(231 239 254)", width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Full Mock Test" {...a11yProps(0)} />
            <Tab label="Speaking Mock Test" {...a11yProps(1)} />
            <Tab label="Reading Mock Test" {...a11yProps(2)} />
            <Tab label="Listening Mock Test" {...a11yProps(3)} />
            <Tab label="Writing Mock Test" {...a11yProps(4)} />
          </Tabs>

          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <MockTest
                title="Full"
                page={fullMockTestPage}
                mockTestFrontend={fullMockTestFrontend}
                handleChange={handleFullMockTestPageChange}
                mockTestFrontendStatus={fullMockTestFrontendStatus}
                tests={fullMockTest}
                fetchState={fullMockTestFetchState}
                setFetchState={fetchStateFunction}
                saveMtList={saveMtListArray}
              ></MockTest>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <MockTest
                title="Speaking"
                page={speakingPage}
                mockTestFrontend={speakingMockTestFrontend}
                handleChange={handleSpeakingPageChange}
                mockTestFrontendStatus={speakingMockTestFrontendStatus}
                tests={speakingMockTest}
                fetchState={speakingMockTestFetchState}
                setFetchState={fetchStateFunction}
                saveMtList={saveMtListArray}
              ></MockTest>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <MockTest
                title="Reading"
                page={readingPage}
                mockTestFrontend={readingMockTestFrontend}
                handleChange={handleReadingPageChange}
                mockTestFrontendStatus={readingMockTestFrontendStatus}
                tests={readingMockTest}
                fetchState={readingMockTestFetchState}
                setFetchState={fetchStateFunction}
                saveMtList={saveMtListArray}
              ></MockTest>
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <MockTest
                title="Listening"
                page={listeningPage}
                mockTestFrontend={listeningMockTestFrontend}
                handleChange={handleListeningPageChange}
                mockTestFrontendStatus={listeningMockTestFrontendStatus}
                tests={listeningMockTest}
                fetchState={listeningMockTestFetchState}
                setFetchState={fetchStateFunction}
                saveMtList={saveMtListArray}
              ></MockTest>
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>
              <MockTest
                title="Writing"
                page={writingPage}
                mockTestFrontend={writingMockTestFrontend}
                handleChange={handleWritingPageChange}
                mockTestFrontendStatus={writingMockTestFrontendStatus}
                tests={writingMockTest}
                fetchState={writingMockTestFetchState}
                setFetchState={fetchStateFunction}
                saveMtList={saveMtListArray}
              ></MockTest>
            </TabPanel>
          </SwipeableViews>
        </Box>

        <Box sx={{ width: "50%", mx: "auto", pb: "2rem" }}>
          <Button
            variant="contained"
            size="large"
            sx={{ width: "100%", backgroundColor: "rgb(22 86 196)" }}
            onClick={() => navigate("/mocktest/tabs")}
          >
            Start Practicing
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
