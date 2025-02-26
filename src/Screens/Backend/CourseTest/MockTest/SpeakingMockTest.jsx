import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import useNetworkStatus from "../../../../customHooks/CheckNetwork/checkNetwork";
import ExitConfirmBox from "./ExitConfirmBox";
// import { useNavigate } from "react-router-dom";

import FinishPage from "./FinishPage";

import Speaking from "./Speaking";
import { storeQuestionData } from "./StoreDataFunctions";
import swal from "sweetalert";
import { saveData, updateSavedData } from "./SaveDataFunction";
import TestInfoBar from "./TestInfoBar";

// import useIsTabActive from "./ActiveTabCheck";

function SpeakingMockTest(props) {
  const { editPost, editStatus } = useSelector((state) => state.posts);
  const { checkMockTest, checkMockTestStatus } = useSelector(
    (state) => state.mockTest
  );
  const hasRun = useRef(false);
  const [isStartOfTest, setIsStartOfTest] = useState(true);
  const online = useNetworkStatus();
  // const tabActive = useIsTabActive();
  const [offline, setOffline] = useState(false);

  const [cleanUpState, setCleanUpState] = useState(true);
  const [cleanUpAnswerState, setCleanUpAnswerState] = useState(true);
  const [error, setError] = useState(false);
  //editPost is used to get details of mock test
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  let [loading, setLoading] = useState(true);

  let [duration, setDuration] = useState([0, 0, 0, 0]);

  let [pause, setPause] = useState(false);
  let [question, setQuestion] = useState({ 1: [], 2: [], 3: [], 4: [] });
  let [speaking, setSpeaking] = useState();
  let [speakingAnswer, setSpeakingAnswer] = useState();
  let [speakingState, setSpeakingState] = useState(true);
  let [currentPage, setCurrentPage] = useState(1);
  // let [sectionATimer, setSectionATimer] = useState(true);
  let [counterDuration, setCounterDuration] = useState(0);
  let [timerDuration, setTimerDuration] = useState();
  //each test start time (to start the post from when user start to answer in case of network failure )
  let [currentQuestionStart, setCurrentQuestionStart] = useState(true);
  let [currentQuestionStartTime, setCurrentQuestionStartTime] = useState(0);

  //save data in case of network failure
  let [category, setCategory] = useState("ra");
  let [index, setIndex] = useState(0);

  //get savedata if exist
  const [resumeSaveTest, setResumeSaveTest] = useState(true);

  //pass the save data to child component state
  const [passSaveDataState, setPassSaveDataState] = useState(false);
  //save progress in various condition like reload ,exit and audio failed
  const [save, setSave] = useState(false);

  //downloading required resource
  const [isDownloading, setIsDownloading] = useState(true);
  const userId = localStorage.getItem("userId");
  //check network status
  useEffect(() => {
    if (online.isOnline === false && !props.checkAnswerState) {
      setOffline(true);
    }
  }, [online, props]);

  //check exit box
  useEffect(() => {
    if (!open) {
      setPause(false);
    } else {
      setPause(true);
    }
  }, [open]);

  //save if no network detected during exam
  useEffect(() => {
    if (
      ((!online.isOnline && offline) || save || error) &&
      !currentQuestionStart &&
      !props.checkAnswerState
    ) {
      let userId = localStorage.getItem("userId");
      let currentCategoryData = localStorage.getItem(
        userId + "saveMt" + props.mockId + category
      );
      let currentSaveData = localStorage.getItem(
        userId + "saveMt" + props.mockId
      );
      let state = { speakingState: speakingState };
      if (currentCategoryData == null || currentCategoryData == undefined) {
        currentCategoryData = JSON.parse(currentSaveData);

        localStorage.setItem(
          userId + "saveMt" + props.mockId + category,
          currentCategoryData[category]
        );

        saveData(
          props.mockId,
          3,
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
          3,
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

      if (error || save) {
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
    error,
    save,
    props.checkAnswerState,
    offline,
    props.mockId,
    counterDuration,
    currentQuestionStartTime,
    category,
    index,
    speakingState,
    currentPage,
    currentQuestionStart,
  ]);

  useEffect(() => {
    //normal post and data assign flow
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
      let post = {
        ra: [],
        rs: [],
        rl: [],
        di: [],
        asq: [],
      };

      editPost.data.mt_sections.map((mt) =>
        mt.language_type_id === 1
          ? mt.mt_section_details.map((md) => post[md.category].push(md.post))
          : ""
      );

      setTimerDuration(duration[0] * 1);
      setCounterDuration(duration[0] * 1 * 60);
      setSpeaking(post);
      if (!props.checkAnswerState) {
        storeQuestionData("speaking", post);
      }

      setQuestion(question);
      //if save data present
      let saveDataFile = localStorage.getItem(userId + "saveMt" + props.mockId);
      if (
        !props.saveProgressExist &&
        (saveDataFile === null || saveDataFile === undefined)
      ) {
        let allCategory = ["ra", "rs", "di", "asq", "rl"];
        let data = {};
        allCategory.forEach((c) => {
          data[c] = localStorage.getItem(c);
        });

        let state = {
          speakingState: speakingState,
        };

        let saveTime;
        saveTime = duration[0] * 1 * 60;

        console.log("saving data");

        saveData(
          props.mockId,
          3,
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
    editPost,
    duration,
    question,
    props.mockId,
    resumeSaveTest,
    cleanUpState,
    props.checkAnswerState,
  ]);

  // useEffect(() => {
  //   let saveData = localStorage.getItem("saveMt" + props.mockId);
  //   if (
  //     saveData !== null &&
  //     saveData !== undefined &&
  //     resumeSaveTest &&
  //     !props.checkAnswerState &&
  //     !isDownloading
  //   ) {
  //     setPause(true);
  //     swal({
  //       title: "Resume Test From last Save",
  //       text: "Click 'Ok' to start from the save progress ,cancel will clear your save progress and start anew.",
  //       icon: "info",
  //       buttons: true,
  //       dangerMode: true,
  //       closeOnClickOutside: false,
  //     }).then(async (ok) => {
  //       if (ok) {
  //         let saveResult = updateSavedData(saveData, 3);
  //         setCounterDuration(saveResult?.time);
  //         setCurrentPage(saveResult?.page);
  //         setSpeakingState(saveResult?.state.speakingState);
  //         setPassSaveDataState(true);
  //         setResumeSaveTest(false);
  //         setPause(false);

  //         // localStorage.removeItem("saveMt" + props.mockId);
  //       } else {
  //         localStorage.removeItem("saveMt" + props.mockId);
  //         setResumeSaveTest(false);
  //         window.location.reload();
  //         setPause(false);
  //       }
  //     });
  //   }
  // }, [props.checkAnswerState, props.mockId, resumeSaveTest, isDownloading]);

  useEffect(() => {
    let saveData = localStorage.getItem(userId + "saveMt" + props.mockId);
    if (
      saveData !== null &&
      saveData !== undefined &&
      resumeSaveTest &&
      !props.checkAnswerState &&
      !isDownloading &&
      !isStartOfTest
    ) {
      // if (props.resumeByUserOutsideTest == 1) {
      setPause(true);
      let saveResult = updateSavedData(saveData, 3, setPause);
      setCounterDuration(saveResult?.time);
      setCurrentPage(saveResult?.page);
      setSpeakingState(saveResult?.state.speakingState);
      setPassSaveDataState(true);
      setResumeSaveTest(false);

      // localStorage.removeItem("saveMt" + props.mockId);
      //}
      // else {
      //   setPause(true);
      //   swal({
      //     title: "Resume Test From last Save",
      //     text: "Click 'Ok' to start from the save progress ,cancel will clear your save progress and start anew.",
      //     icon: "info",
      //     buttons: true,
      //     dangerMode: true,
      //     closeOnClickOutside: false,
      //   }).then(async (ok) => {
      //     if (ok) {
      //       let saveResult = updateSavedData(saveData, 3);
      //       setCounterDuration(saveResult?.time);
      //       setCurrentPage(saveResult?.page);
      //       setSpeakingState(saveResult?.state.speakingState);
      //       setPassSaveDataState(true);
      //       setResumeSaveTest(false);
      //       setPause(false);

      //       // localStorage.removeItem("saveMt" + props.mockId);
      //     } else {
      //       localStorage.removeItem("saveMt" + props.mockId);
      //       setResumeSaveTest(false);
      //       window.location.reload();
      //       setPause(false);
      //     }
      //   });
      // }
    }
  }, [
    props.checkAnswerState,
    props.mockId,
    resumeSaveTest,
    isDownloading,
    props.resumeByUserOutsideTest,
    userId,
    isStartOfTest,
  ]);

  //useEffect for check answer state and assigning state
  useEffect(() => {
    if (props.checkAnswerState) {
      if (
        checkMockTestStatus === "succeeded" &&
        checkMockTest !== undefined &&
        cleanUpAnswerState
      ) {
        let ansPost = {
          ra: [],
          rs: [],
          rl: [],
          di: [],
          asq: [],
        };

        checkMockTest.mt_score_details.forEach((mtScore) => {
          if (
            mtScore.category === "ra" ||
            mtScore.category === "rs" ||
            mtScore.category === "rl" ||
            mtScore.category === "di" ||
            mtScore.category === "asq"
          ) {
            ansPost[mtScore.category] = mtScore;
          }
        });
        setCleanUpAnswerState(false);
        setSpeakingAnswer(ansPost);
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
      speaking !== undefined &&
      editStatus === "succeeded" &&
      !props.checkAnswerState
    ) {
      if (counterDuration == 0) {
        setSpeakingState(false);
      }
    }
  }, [
    counterDuration,
    props.checkAnswerState,
    speakingState,
    timerDuration,
    loading,
    editStatus,
    speaking,
  ]);

  console.log(
    speakingState,
    props.checkAnswerState && speakingAnswer !== undefined,
    !props.checkAnswerState,
    !loading
  );

  console.log(
    speakingState &&
      ((props.checkAnswerState && speakingAnswer !== undefined) ||
        !props.checkAnswerState) &&
      !loading
  );

  return (
    <>
      {speakingState &&
        ((props.checkAnswerState && speakingAnswer !== undefined) ||
          !props.checkAnswerState) &&
        !loading && (
          <>
            {speaking !== undefined &&
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
                      title={"Score Test Speaking"}
                      open={open}
                      value={(currentPage / question[1]) * 100}
                      pageIndicator={currentPage + " of " + question[1]}
                      setOpen={setOpen}
                      counterDuration={counterDuration}
                      timerDuration={timerDuration}
                      checkAnswerState={props.checkAnswerState}
                    />
                    {/* exit confirm box */}
                    <ExitConfirmBox
                      open={open}
                      setSave={setSave}
                      setOpen={setOpen}
                      mockId={props.mockId}
                      mockTestType={3}
                    ></ExitConfirmBox>

                    <Speaking
                      // offLine={offline}
                      speaking={speaking}
                      mockId={props.mockId}
                      speakingAnswer={speakingAnswer}
                      setSpeakingState={setSpeakingState}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      setPause={setPause}
                      pause={pause}
                      setSave={setSave}
                      setCategory={setCategory}
                      setIndex={setIndex}
                      error={error}
                      isDownloading={isDownloading}
                      setIsDownloading={setIsDownloading}
                      setError={setError}
                      setCurrentQuestionStart={setCurrentQuestionStart}
                      passSaveDataState={passSaveDataState}
                      checkAnswerState={props.checkAnswerState}
                      setPassSaveDataState={setPassSaveDataState}
                    ></Speaking>
                  </>
                </Box>
              )}
          </>
        )}
      {!speakingState && (
        <FinishPage
          checkAnswerState={props.checkAnswerState}
          mockTestId={props.mockId}
          mockTestType={3}
          handleClose={props.handleClose}
        ></FinishPage>
      )}
    </>
  );
}

export default SpeakingMockTest;
