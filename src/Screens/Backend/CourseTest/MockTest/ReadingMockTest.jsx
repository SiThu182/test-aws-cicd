import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import useNetworkStatus from "../../../../customHooks/CheckNetwork/checkNetwork";
import FinishPage from "./FinishPage";

import Reading from "./Reading";
import ExitConfirmBox from "./ExitConfirmBox";
import swal from "sweetalert";
import { saveData, updateSavedData } from "./SaveDataFunction";
import { storeQuestionData } from "./StoreDataFunctions";
import TestInfoBar from "./TestInfoBar";
// import useIsTabActive from "./ActiveTabCheck";

function ReadingMockTest(props) {
  // const tabActive = useIsTabActive();
  const { editPost, editStatus } = useSelector((state) => state.posts);
  const { checkMockTest, checkMockTestStatus } = useSelector(
    (state) => state.mockTest
  );
  const online = useNetworkStatus();
  const [offline, setOffline] = useState(false);
  const [cleanUpState, setCleanUpState] = useState(true);
  const [cleanUpAnswerState, setCleanUpAnswerState] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  //editPost is used to get details of mock test
  // const navigate = useNavigate();
  const hasRun = useRef(false);
  const [isStartOfTest, setIsStartOfTest] = useState(true);
  let [loading, setLoading] = useState(true);
  let [duration, setDuration] = useState([0, 0, 0, 0]);
  let [pause, setPause] = useState(false);
  let [question, setQuestion] = useState({ 1: [], 2: [], 3: [], 4: [] });
  let [reading, setReading] = useState();
  let [readingAnswer, setReadingAnswer] = useState();
  let [readingState, setReadingState] = useState(true);

  let [currentPage, setCurrentPage] = useState(1);
  // let [sectionATimer, setSectionATimer] = useState(true);
  let [counterDuration, setCounterDuration] = useState(0);

  let [timerDuration, setTimerDuration] = useState();
  //each test start time (to start the post from when user start to answer in case of network failure )
  let [currentQuestionStart, setCurrentQuestionStart] = useState(true);
  let [currentQuestionStartTime, setCurrentQuestionStartTime] = useState(0);

  //save data in case of network failure
  let [category, setCategory] = useState("rsmc");
  let [index, setIndex] = useState(0);
  //get savedata if exist
  const [resumeSaveTest, setResumeSaveTest] = useState(true);
  //pass the save data to child component state
  const [passSaveDataState, setPassSaveDataState] = useState(false);

  //save function trigger
  const [save, setSave] = useState(false);

  const userId = localStorage.getItem("userId");
  //check network status
  useEffect(() => {
    if (online.isOnline === false && !props.checkAnswerState) {
      setOffline(true);
    }
  }, [online, props.checkAnswerState]);

  //check tab is active or not
  useEffect(() => {
    if (!open) {
      setPause(false);
    } else {
      setPause(true);
    }
  }, [open]);

  console.log(category, "current category");

  //save if no network detected during exam
  useEffect(() => {
    if (
      ((!online.isOnline && offline) || save || error) &&
      !currentQuestionStart &&
      !props.checkAnswerState
    ) {
      let data = {};
      data["rsmc"] = localStorage.getItem("rsmc");
      data["rmc"] = localStorage.getItem("rmc");
      data["rfib"] = localStorage.getItem("rfib");
      data["rwfib"] = localStorage.getItem("rwfib");
      data["rop"] = localStorage.getItem("rop");
      let userId = localStorage.getItem("userId");
      let currentCategoryData = localStorage.getItem(
        userId + "saveMt" + props.mockId + category
      );
      let currentSaveData = localStorage.getItem(
        userId + "saveMt" + props.mockId
      );
      let state = { readingState: readingState };
      console.log(currentCategoryData);

      if (currentCategoryData == null || currentCategoryData == undefined) {
        currentCategoryData = JSON.parse(currentSaveData);

        localStorage.setItem(
          userId + "saveMt" + props.mockId + category,
          currentCategoryData[category]
        );

        saveData(
          props.mockId,
          4,
          currentQuestionStartTime,
          currentPage,
          state,
          category,
          index,
          null,
          "",
          null,
          currentCategoryData[category],
          currentSaveData
        );
      } else {
        saveData(
          props.mockId,
          4,
          currentQuestionStartTime,
          currentPage,
          state,
          category,
          index,
          null,
          "",
          null,
          currentCategoryData,
          currentSaveData
        );
      }

      if (save || error) {
      } else {
        setPause(true);
        swal({
          title: "No Internet",
          text: "No Internet connection .You current progress is saved .Please connect to internet and press ok ",
          icon: "error",
          buttons: true,
          dangerMode: true,
          closeOnClickOutside: false,
        }).then((ok) => {
          if (ok) {
            window.location.reload();
          } else {
            setPause(false);
          }
        });
      }
    }
  }, [
    online,
    save,
    props.checkAnswerState,
    error,
    offline,
    props.mockId,
    counterDuration,
    currentQuestionStartTime,
    category,
    index,
    readingState,
    currentPage,
    currentQuestionStart,
  ]);

  useEffect(() => {
    if (
      editStatus === "succeeded" &&
      editPost !== undefined &&
      editPost.data !== undefined &&
      cleanUpState &&
      !hasRun.current
    ) {
      hasRun.current = true;
      editPost.data.mt_sections.map(
        (mt) => (duration[mt.language_type_id - 1] = mt.duration)
      );
      setQuestion(0);
      editPost.data.mt_sections.map((mt) =>
        question[mt.language_type_id].length === 0
          ? question[mt.language_type_id].push(mt.mt_section_details.length * 1)
          : ""
      );
      setDuration(duration);

      let rPost = {
        rsmc: [],
        rmc: [],
        rfib: [],
        rwfib: [],
        rop: [],
      };

      editPost.data.mt_sections.map((mt) =>
        mt.language_type_id === 2
          ? mt.mt_section_details.map((md) => rPost[md.category].push(md.post))
          : ""
      );
      setReading(rPost);
      setQuestion(question);
      if (!props.checkAnswerState) {
        storeQuestionData("reading", rPost);
      }
      setTimerDuration(duration[1] * 1);
      setCounterDuration(duration[1] * 1 * 60);

      setQuestion(question);
      //if save data present
      let saveDataFile = localStorage.getItem(userId + "saveMt" + props.mockId);
      if (
        !props.saveProgressExist &&
        (saveDataFile === null || saveDataFile === undefined)
      ) {
        let data = {};
        data["rsmc"] = localStorage.getItem("rsmc");
        data["rmc"] = localStorage.getItem("rmc");
        data["rfib"] = localStorage.getItem("rfib");
        data["rwfib"] = localStorage.getItem("rwfib");
        data["rop"] = localStorage.getItem("rop");

        let state = { readingState: readingState };
        let saveTime;
        saveTime = duration[1] * 1 * 60;

        saveData(
          props.mockId,
          4,
          saveTime,
          currentPage,
          state,
          category,
          index,
          data
        );
      } else {
        setIsStartOfTest(false);
      }
      setLoading(false);
      return () => {
        setCleanUpState(false); // Optional: reset state on cleanup
      };
    }
  }, [
    editStatus,
    props.checkAnswerState,
    editPost,
    duration,
    props.resumeByUserOutsideTest,
    question,
    userId,
    isStartOfTest,
    loading,
    cleanUpState,
    props.mockId,
    hasRun,
    resumeSaveTest,
  ]);

  useEffect(() => {
    let saveData = localStorage.getItem(userId + "saveMt" + props.mockId);
    if (
      saveData !== null &&
      saveData !== undefined &&
      resumeSaveTest &&
      !props.checkAnswerState &&
      !isStartOfTest
    ) {
      // if (props.resumeByUserOutsideTest == 1) {
      setPause(true);
      let saveResult = updateSavedData(saveData, 4, setPause);
      setCounterDuration(saveResult?.time);
      setCurrentPage(saveResult?.page);
      setReadingState(saveResult?.state.readingState);
      setPassSaveDataState(true);
      setResumeSaveTest(false);

      // localStorage.removeItem("saveMt" + props.mockId);
      // }
      // else {
      //   setPause(true);
      //   swal({
      //     title: "Resume Test From last Save",
      //     text: "Click 'Ok' to start from the save progress ,cancel will clear your save progress  and start anew",
      //     icon: "info",
      //     buttons: true,
      //     dangerMode: true,
      //     closeOnClickOutside: false,
      //   }).then(async (ok) => {
      //     if (ok) {
      //       let saveResult = updateSavedData(saveData, 4);
      //       setCounterDuration(saveResult?.time);
      //       setCurrentPage(saveResult?.page);
      //       setReadingState(saveResult?.state.readingState);
      //       setPassSaveDataState(true);
      //       setResumeSaveTest(false);
      //       setPause(false);
      //       // localStorage.removeItem("saveMt" + props.mockId);
      //     } else {
      //       localStorage.removeItem("saveMt" + props.mockId);
      //       setResumeSaveTest(false);
      //       setPause(false);
      //       window.location.reload();
      //     }
      //   });
      // }
    }
  }, [
    props.checkAnswerState,
    props.mockId,
    resumeSaveTest,
    isStartOfTest,
    props.resumeByUserOutsideTest,
    userId,
  ]);

  //useEffect for check answer state and assigning state
  useEffect(() => {
    if (props.checkAnswerState) {
      if (
        checkMockTestStatus === "succeeded" &&
        checkMockTest !== undefined &&
        cleanUpAnswerState
      ) {
        let ansRPost = {
          rsmc: [],
          rmc: [],
          rfib: [],
          rwfib: [],
          rop: [],
        };

        checkMockTest.mt_score_details.forEach((mtScore) => {
          if (
            mtScore.category === "rsmc" ||
            mtScore.category === "rmc" ||
            mtScore.category === "rfib" ||
            mtScore.category === "rwfib" ||
            mtScore.category === "rop"
          ) {
            ansRPost[mtScore.category] = mtScore;
          }
        });

        setReadingAnswer(ansRPost);
        setCleanUpAnswerState(false);
      }
    }
  }, [
    props.checkAnswerState,
    checkMockTest,
    checkMockTestStatus,
    cleanUpAnswerState,
  ]);

  //catch each question start time
  useEffect(() => {
    if (currentQuestionStart) {
      setCurrentQuestionStartTime(counterDuration);
      setCurrentQuestionStart(false);
    }
  }, [currentQuestionStart, counterDuration]);
  useEffect(() => {
    if (editStatus === "succeeded" && !loading && !props.checkAnswerState) {
      let durationInterval = (pause) => {
        if (!pause) {
          const interval = setInterval(() => {
            setCounterDuration((prev) => prev * 1 - 1);
          }, 1000);
          return interval;
        }
      };
      let interval = durationInterval(pause);
      return () => clearInterval(interval);
    }
  }, [editStatus, counterDuration, pause, loading, props.checkAnswerState]);

  useEffect(() => {
    if (
      !loading &&
      reading !== undefined &&
      editStatus === "succeeded" &&
      !props.checkAnswerState
    )
      if (counterDuration == 0) {
        setReadingState(false);
      }
  }, [
    counterDuration,
    reading,
    loading,
    editStatus,
    timerDuration,
    readingState,
    props.checkAnswerState,
  ]);

  return (
    <>
      {readingState &&
        ((props.checkAnswerState && readingAnswer !== undefined) ||
          !props.checkAnswerState) &&
        !loading && (
          <>
            {reading !== undefined &&
              editStatus === "succeeded" &&
              !loading && (
                <Box
                  sx={{
                    width: props.checkAnswerState ? "100%" : "100vw",
                    height: "auto",
                  }}
                >
                  <>
                    <TestInfoBar
                      title={"Score Test Reading"}
                      open={open}
                      value={(currentPage / question[2]) * 100}
                      pageIndicator={currentPage + " of " + question[2]}
                      setOpen={setOpen}
                      counterDuration={counterDuration}
                      timerDuration={timerDuration}
                      checkAnswerState={props.checkAnswerState}
                    />
                    {/* exit confirm box */}

                    <ExitConfirmBox
                      open={open}
                      setOpen={setOpen}
                      setSave={setSave}
                      mockId={props.mockId}
                      mockTestType={4}
                    ></ExitConfirmBox>

                    <Reading
                      mockType={4}
                      mockId={props.mockId}
                      error={error}
                      setSave={setSave}
                      setError={setError}
                      reading={reading}
                      readingAnswer={readingAnswer}
                      setReadingState={setReadingState}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      setPause={setPause}
                      setCategory={setCategory}
                      setIndex={setIndex}
                      setCurrentQuestionStart={setCurrentQuestionStart}
                      passSaveDataState={passSaveDataState}
                      checkAnswerState={props.checkAnswerState}
                      setPassSaveDataState={setPassSaveDataState}
                    ></Reading>
                  </>
                </Box>
              )}
          </>
        )}
      {!readingState && (
        <FinishPage
          checkAnswerState={props.checkAnswerState}
          mockTestId={props.mockId}
          mockTestType={4}
          handleClose={props.handleClose}
        ></FinishPage>
      )}
      {/* </Box> */}
    </>
  );
}

export default ReadingMockTest;
