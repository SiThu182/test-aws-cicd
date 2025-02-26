import { Alert, Button, CircularProgress } from "@mui/material";
import AppBar from "@mui/material/AppBar";
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
import SwipeableViews from "react-swipeable-views";
import InfoIcon from "@mui/icons-material/Info";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import {
  fetchFullMockTestAsync,
  fetchListeningMockTestAsync,
  fetchReadingMockTestAsync,
  fetchSaveMockTestListAsync,
  fetchSpeakingMockTestAsync,
  fetchWritingMockTestAsync,
} from "../../../../redux/thunk/MockTest";
import Card from "./Card";
import CheckFeatures from "../../../../components/Backend/MockTest/CheckFeatures";

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

  const dispatch = useDispatch();
  const {
    fullMockTestStatus,
    fullMockTest,
    // fullMockTestError,
    speakingMockTestStatus,
    speakingMockTest,
    // speakingMockTestError,
    readingMockTestStatus,
    readingMockTest,
    // readingMockTestError,
    writingMockTestStatus,
    writingMockTest,
    // writingMockTestError,
    listeningMockTestStatus,
    listeningMockTest,
    saveMtList,
    saveMtListStatus,
    // listeningMockTestError,
  } = useSelector((state) => state.mockTest);

  const [fullMTStateCall, setFullMTStateCall] = useState(true);
  const [speakingMTStateCall, setSpeakingMTStateCall] = useState(true);
  const [readingMTStateCall, setReadingMTStateCall] = useState(true);
  const [writingMTStateCall, setWritingMTStateCall] = useState(true);
  const [listeningMTStateCall, setListeningMTStateCall] = useState(true);

  const [fullMtPage, setFullMtPage] = useState(1);
  const [speakingMtPage, setSpeakingMtPage] = useState(1);

  const [readingMtPage, setReadingMtPage] = useState(1);
  const [writingMtPage, setWritingMtPage] = useState(1);
  const [listeningMtPage, setListeningMtPage] = useState(1);
  const [saveMtListArray, setSaveMtListArray] = useState([]);
  const [showAlert, setShowAlert] = useState(true);
  const [show, setShow] = useState(true);
  let userId = localStorage.getItem("userId");
  const getItemsWithPrefix = (prefix) => {
    const keys = Object.keys(localStorage);

    //remove previous localstorage usage outside mock test
    const filteredKeys = keys.filter((key) => key.startsWith(prefix));
    // const savefilteredKeys = keys.filter((key) =>
    //   key.startsWith(userId + prefix)
    // );

    // const items = filteredKeys.reduce((result, key) => {
    //   result[key] = localStorage.getItem(key);
    //   return result;
    // }, {});

    // return items;

    filteredKeys.forEach((key) => {
      localStorage.removeItem(key);
    });
    // savefilteredKeys.forEach((key) => {
    //   localStorage.removeItem(key);
    // });
  };

  const prefix = "save";
  getItemsWithPrefix(prefix);
  useEffect(() => {
    if (fullMTStateCall === true) {
      dispatch(
        fetchFullMockTestAsync({
          path:
            "testing-mocktest?user_id=" +
            userId +
            "&mt_type_id=1&page=" +
            fullMtPage,
        })
      );
    }
    if (speakingMTStateCall === true) {
      dispatch(
        fetchSpeakingMockTestAsync({
          path:
            "testing-mocktest?user_id=" +
            userId +
            "&mt_type_id=3&page=" +
            speakingMtPage,
        })
      );
    }
    if (readingMTStateCall === true) {
      dispatch(
        fetchReadingMockTestAsync({
          path:
            "testing-mocktest?user_id=" +
            userId +
            "&mt_type_id=4&page=" +
            readingMtPage,
        })
      );
    }
    if (writingMTStateCall === true) {
      dispatch(
        fetchWritingMockTestAsync({
          path:
            "testing-mocktest?user_id=" +
            userId +
            "&mt_type_id=6&page=" +
            writingMtPage,
        })
      );
    }
    if (listeningMTStateCall === true) {
      dispatch(
        fetchListeningMockTestAsync({
          path:
            "testing-mocktest?user_id=" +
            userId +
            "&mt_type_id=5&page=" +
            listeningMtPage,
        })
      );
    }
    dispatch(fetchSaveMockTestListAsync());
    setFullMTStateCall(false);
    setSpeakingMTStateCall(false);
    setReadingMTStateCall(false);
    setWritingMTStateCall(false);
    setListeningMTStateCall(false);
  }, [
    dispatch,
    fullMTStateCall,
    fullMtPage,
    speakingMTStateCall,
    speakingMtPage,
    readingMTStateCall,
    readingMtPage,
    writingMTStateCall,
    writingMtPage,
    listeningMTStateCall,
    listeningMtPage,
    userId,
  ]);

  let fullMtPageHandler = (page) => {
    setFullMtPage(page);
    setFullMTStateCall(true);
  };

  let speakingMtPageHandler = (page) => {
    setSpeakingMtPage(page);
    setSpeakingMTStateCall(true);
  };
  let readingMtPageHandler = (page) => {
    setReadingMtPage(page);
    setReadingMTStateCall(true);
  };
  let writingMtPageHandler = (page) => {
    setWritingMtPage(page);
    setWritingMTStateCall(true);
  };
  let listeningMtPageHandler = (page) => {
    setListeningMtPage(page);
    setListeningMTStateCall(true);
  };

  useEffect(() => {
    if (saveMtListStatus === "succeeded") {
      setSaveMtListArray(saveMtList.map((s) => s.mt_id));
    }
  }, [saveMtList, saveMtListStatus]);

  return (
    <>
      <Box
        sx={{
          ml: "1.5rem",
          top: "1rem",
          position: "absolute",
          overflow: "visible",
          zIndex: 1500,
        }}
      >
        <Typography variant="h5" sx={{ ml: 1 }}>
          Mock Test
        </Typography>
      </Box>
      {showAlert && (
        <Alert
          severity="warning"
          onClose={() => setShowAlert(false)}
          sx={{
            width: "100%",
            mt: 2,
            color: "red",
          }}
        >
          The answer audio files for taken mock test will be deleted after 6
          months.The whole answer records will be deleted afte a year .
        </Alert>
      )}
      {show && <CheckFeatures show={show} setShow={setShow} />}

      <Box
        sx={{
          bgcolor: "rgb(231,239,254)",
          width: "100%",
          my: 2,
        }}
      >
        <AppBar
          position="static"
          sx={{
            color: "black",
            backgroundColor: "rgb(231,239,254)",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="Mock Test tabs"
          >
            <Tab label="Full Mock Test" {...a11yProps(0)} />
            <Tab label="Speaking Mock Test" {...a11yProps(1)} />
            <Tab label="Reading Mock Test" {...a11yProps(2)} />
            <Tab label="Listening Mock Test" {...a11yProps(3)} />
            <Tab label="Writing Mock Test" {...a11yProps(4)} />
            {/* {!show && (
              <Box
                sx={{
                  borderRadius: "50%",
                  my: "auto",
                }}
              >
                <Button onClick={() => setShow(true)}>
                  <SettingsSuggestIcon />
                </Button>
              </Box>
            )} */}
            {!showAlert && (
              <Box
                sx={{
                  borderRadius: "50%",
                  my: "auto",
                }}
              >
                <Button onClick={() => setShowAlert(true)}>
                  <InfoIcon />
                </Button>
              </Box>
            )}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {fullMockTestStatus === "loading" ||
            saveMtListStatus === "loading" ? (
              <Box sx={{ mx: "auto" }}>
                <CircularProgress></CircularProgress>
              </Box>
            ) : fullMockTestStatus === "failed" ||
              saveMtListStatus === "failed" ? (
              <Box>
                <Typography sx={{ color: "red" }}>Fail to fetch</Typography>
              </Box>
            ) : fullMockTestStatus === "succeeded" &&
              saveMtListStatus === "succeeded" ? (
              <>
                <Card
                  posts={fullMockTest}
                  pageHandler={fullMtPageHandler}
                  page={fullMtPage}
                  saveMtListArray={saveMtListArray}
                ></Card>
              </>
            ) : (
              ""
            )}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {speakingMockTestStatus === "loading" ||
            saveMtListStatus === "loading" ? (
              <Box sx={{ mx: "auto" }}>
                <CircularProgress></CircularProgress>
              </Box>
            ) : speakingMockTestStatus === "failed" ||
              saveMtListStatus === "failed" ? (
              <Box>
                <Typography sx={{ color: "red" }}>Fail to fetch</Typography>
              </Box>
            ) : speakingMockTestStatus === "succeeded" &&
              saveMtListStatus === "succeeded" ? (
              <>
                <Card
                  posts={speakingMockTest}
                  pageHandler={speakingMtPageHandler}
                  page={speakingMtPage}
                  saveMtListArray={saveMtListArray}
                ></Card>
              </>
            ) : (
              ""
            )}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            {readingMockTestStatus === "loading" ||
            saveMtListStatus === "loading" ? (
              <Box sx={{ mx: "auto" }}>
                <CircularProgress></CircularProgress>
              </Box>
            ) : readingMockTestStatus === "failed" ||
              saveMtListStatus === "failed" ? (
              <Box>
                <Typography sx={{ color: "red" }}>Fail to fetch</Typography>
              </Box>
            ) : readingMockTestStatus === "succeeded" &&
              saveMtListStatus === "succeeded" ? (
              <>
                <Card
                  posts={readingMockTest}
                  pageHandler={readingMtPageHandler}
                  page={readingMtPage}
                  saveMtListArray={saveMtListArray}
                ></Card>
              </>
            ) : (
              ""
            )}
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            {listeningMockTestStatus === "loading" ||
            saveMtListStatus === "loading" ? (
              <Box sx={{ mx: "auto" }}>
                <CircularProgress></CircularProgress>
              </Box>
            ) : listeningMockTestStatus === "failed" ||
              saveMtListStatus === "failed" ? (
              <Box>
                <Typography sx={{ color: "red" }}>Fail to fetch</Typography>
              </Box>
            ) : listeningMockTestStatus === "succeeded" &&
              saveMtListStatus === "succeeded" ? (
              <>
                <Card
                  posts={listeningMockTest}
                  pageHandler={listeningMtPageHandler}
                  page={listeningMtPage}
                  saveMtListArray={saveMtListArray}
                ></Card>
              </>
            ) : (
              ""
            )}
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            {writingMockTestStatus === "loading" ||
            saveMtListStatus === "loading" ? (
              <Box sx={{ mx: "auto" }}>
                <CircularProgress></CircularProgress>
              </Box>
            ) : writingMockTestStatus === "failed" ||
              saveMtListStatus === "failed" ? (
              <Box>
                <Typography sx={{ color: "red" }}>Fail to fetch</Typography>
              </Box>
            ) : writingMockTestStatus === "succeeded" &&
              saveMtListStatus === "succeeded" ? (
              <>
                <Card
                  posts={writingMockTest}
                  pageHandler={writingMtPageHandler}
                  page={writingMtPage}
                  saveMtListArray={saveMtListArray}
                ></Card>
              </>
            ) : (
              ""
            )}
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  );
}
