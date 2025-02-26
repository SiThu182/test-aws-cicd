import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import useNetworkStatus from "../../../../customHooks/CheckNetwork/checkNetwork";
import swal from "sweetalert";
import { saveData, updateSavedData } from "./SaveDataFunction";
import { storeQuestionData } from "./StoreDataFunctions";
import useIsTabActive from "./ActiveTabCheck";
import FinishPage from "./FinishPage";
import Listening from "./Listening";
import ExitConfirmBox from "./ExitConfirmBox";
import TestInfoBar from "./TestInfoBar";

function ListeningMockTest(props) {
  const { editPost, editStatus } = useSelector((state) => state.posts);
  const { checkMockTest, checkMockTestStatus } = useSelector(
    (state) => state.mockTest
  );
  //editPost is used to get details of mock test
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const hasRun = useRef(false);
  const [isStartOfTest, setIsStartOfTest] = useState(true);
  const online = useNetworkStatus();
  const [offline, setOffline] = useState(false);
  const [cleanUpState, setCleanUpState] = useState(true);
  const [cleanUpAnswerState, setCleanUpAnswerState] = useState(true);
  const [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);

  let [duration, setDuration] = useState([0, 0, 0, 0]);

  let [pause, setPause] = useState(false);
  let [question, setQuestion] = useState({ 1: [], 2: [], 3: [], 4: [] });
  let [listening, setListening] = useState();
  let [listeningAnswer, setListeningAnswer] = useState();
  let [listeningState, setListeningState] = useState(true);
  let [currentPage, setCurrentPage] = useState(1);
  // let [sectionATimer, setSectionATimer] = useState(true);
  let [counterDuration, setCounterDuration] = useState(0);
  let [timerDuration, setTimerDuration] = useState();
  //save data detail in case of network failure
  const [category, setCategory] = useState("sst");
  const [index, setIndex] = useState(0);
  const tabActive = useIsTabActive();
  //each test start time (to start the post from when user start to answer in case of network failure )
  let [currentQuestionStart, setCurrentQuestionStart] = useState(true);
  let [currentQuestionStartTime, setCurrentQuestionStartTime] = useState(0);
  let [cancel, setCancel] = useState(false);

  //get savedata if exist
  const [resumeSaveTest, setResumeSaveTest] = useState(true);
  //pass the save data to child component state
  const [passSaveDataState, setPassSaveDataState] = useState(false);
  const [save, setSave] = useState(false);

  //downloading required resource
  const [isDownloading, setIsDownloading] = useState(true);

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
  }, [tabActive, open]);

  //save if no network detected during exam
  useEffect(() => {
    if (
      ((!online.isOnline && offline) || save || error) &&
      !currentQuestionStart &&
      !props.checkAnswerState
    ) {
      let data = {};
      data["smc"] = localStorage.getItem("smc");
      data["mc"] = localStorage.getItem("mc");
      data["hcs"] = localStorage.getItem("hcs");
      data["hiw"] = localStorage.getItem("hiw");
      data["smw"] = localStorage.getItem("smw");
      data["fib"] = localStorage.getItem("fib");
      data["sst"] = localStorage.getItem("sst");
      data["wfd"] = localStorage.getItem("wfd");
      let currentCategoryData = localStorage.getItem(
        userId + "saveMt" + props.mockId + category
      );
      let currentSaveData = localStorage.getItem(
        userId + "saveMt" + props.mockId
      );
      let state = { listeningState: listeningState };
      // let saveTime;
      // if (category === "wfd" || category === "sst") {
      //   saveTime = counterDuration;
      // } else {
      //   saveTime = currentQuestionStartTime;
      // }
      //
      if (currentCategoryData == null || currentCategoryData == undefined) {
        currentCategoryData = JSON.parse(currentSaveData);

        localStorage.setItem(
          userId + "saveMt" + props.mockId + category,
          currentCategoryData[category]
        );

        saveData(
          props.mockId,
          5,
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
          5,
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
          // detailAnswer,
          // detailDuration
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
            setCancel(false);
            window.location.reload();
          } else {
            setCancel(true);
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
    // detailAnswer,
    // detailDuration,
    currentQuestionStartTime,
    category,
    index,
    listeningState,
    userId,
    currentQuestionStart,
    currentPage,
  ]);

  //refuse to connect the internet (by accident)****
  useEffect(() => {
    if (cancel) {
      const interval = setTimeout(() => {
        if (!online.isOnline) {
          setOffline(true);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [cancel, online]);

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

      let lPost = {
        smc: [],
        mc: [],
        fib: [],
        hcs: [],
        hiw: [],
        smw: [],
        sst: [],
        wfd: [],
      };

      editPost.data.mt_sections.map((mt) =>
        mt.language_type_id === 3
          ? mt.mt_section_details.map((md) => lPost[md.category].push(md.post))
          : ""
      );
      setTimerDuration(duration[2] * 1);
      setCounterDuration(duration[2] * 1 * 60);
      setListening(lPost);
      if (!props.checkAnswerState) {
        storeQuestionData("listening", lPost);
      }
      setQuestion(question);
      let saveDataFile = localStorage.getItem(userId + "saveMt" + props.mockId);
      if (
        !props.saveProgressExist &&
        (saveDataFile === null || saveDataFile === undefined)
      ) {
        let data = {};
        data["smc"] = localStorage.getItem("smc");
        data["mc"] = localStorage.getItem("mc");
        data["hcs"] = localStorage.getItem("hcs");
        data["hiw"] = localStorage.getItem("hiw");
        data["smw"] = localStorage.getItem("smw");
        data["fib"] = localStorage.getItem("fib");
        data["sst"] = localStorage.getItem("sst");
        data["wfd"] = localStorage.getItem("wfd");
        let state = { listeningState: listeningState };
        let saveTime;
        saveTime = duration[2] * 1 * 60;

        console.log("saving data");

        saveData(
          props.mockId,
          5,
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
    question,
    props.mockId,
    resumeSaveTest,
    cleanUpState,
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
  //       text: "Click 'Ok' to start from the save progress ,cancel will clear your save progress and start anew",
  //       icon: "info",
  //       buttons: true,
  //       dangerMode: true,
  //       closeOnClickOutside: false,
  //     }).then(async (ok) => {
  //       if (ok) {
  //         let saveResult = updateSavedData(saveData, 5);
  //         setCounterDuration(saveResult?.time);
  //         setCurrentPage(saveResult?.page);
  //         setListeningState(saveResult?.state.listeningState);
  //         setPassSaveDataState(true);
  //         setResumeSaveTest(false);
  //         setPause(false);
  //         // localStorage.removeItem("saveMt" + props.mockId);
  //       } else {
  //         localStorage.removeItem("saveMt" + props.mockId);
  //         setResumeSaveTest(false);
  //         setPause(false);
  //         window.location.reload();
  //       }
  //     });
  //   }
  // }, [props.checkAnswerState, props.mockId, resumeSaveTest, isDownloading]);

  //useEffect for check answer state and assigning state

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
      let saveResult = updateSavedData(saveData, 5, setPause);
      setCounterDuration(saveResult?.time);
      setCurrentPage(saveResult?.page);
      setListeningState(saveResult?.state.listeningState);
      setPassSaveDataState(true);
      setResumeSaveTest(false);

      // localStorage.removeItem("saveMt" + props.mockId);
      //}
      // else {
      //   swal({
      //     title: "Resume Test From last Save",
      //     text: "Click 'Ok' to start from the save progress ,cancel will clear your save progress and start anew",
      //     icon: "info",
      //     buttons: true,
      //     dangerMode: true,
      //     closeOnClickOutside: false,
      //   }).then(async (ok) => {
      //     if (ok) {
      //       let saveResult = updateSavedData(saveData, 5);
      //       setCounterDuration(saveResult?.time);
      //       setCurrentPage(saveResult?.page);
      //       setListeningState(saveResult?.state.listeningState);
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
    isDownloading,
    props.resumeByUserOutsideTest,
    isStartOfTest,
    userId,
  ]);

  useEffect(() => {
    if (props.checkAnswerState) {
      if (
        checkMockTestStatus === "succeeded" &&
        checkMockTest !== undefined &&
        cleanUpAnswerState
      ) {
        let ansLPost = {
          smc: [],
          mc: [],
          fib: [],
          hcs: [],
          hiw: [],
          smw: [],
          sst: [],
          wfd: [],
        };

        checkMockTest.mt_score_details.forEach((mtScore) => {
          if (
            mtScore.category === "smc" ||
            mtScore.category === "mc" ||
            mtScore.category === "fib" ||
            mtScore.category === "hcs" ||
            mtScore.category === "hiw" ||
            mtScore.category === "smw" ||
            mtScore.category === "sst" ||
            mtScore.category === "wfd"
          ) {
            ansLPost[mtScore.category] = mtScore;
          }
        });

        setListeningAnswer(ansLPost);
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
    // if (!micTest && !micTest1 && !intro)
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
      editStatus === "succeeded" &&
      !loading &&
      listening !== undefined &&
      !props.checkAnswerState
    ) {
      if (counterDuration == 0) {
        setListeningState(false);
      }
    }
  }, [
    counterDuration,
    loading,
    editStatus,
    timerDuration,
    listening,
    props.checkAnswerState,
  ]);

  return (
    <>
      {/* <Box
        sx={{
          ...MtStyle.mtContainer,
        }}
      > */}
      {listeningState &&
        ((props.checkAnswerState && listeningAnswer !== undefined) ||
          !props.checkAnswerState) &&
        !loading && (
          <>
            {listening !== undefined &&
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
                      title={"Score Test Listening"}
                      open={open}
                      value={(currentPage / question[3]) * 100}
                      pageIndicator={currentPage + " of " + question[3]}
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
                      mockTestType={5}
                    ></ExitConfirmBox>

                    <Listening
                      mockType={5}
                      mockId={props.mockId}
                      offLine={offline}
                      listening={listening}
                      listeningAnswer={listeningAnswer}
                      setListeningState={setListeningState}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      setPause={setPause}
                      error={error}
                      setSave={setSave}
                      setError={setError}
                      // setDetailDuration={setDetailDuration}
                      // setDetailAnswer={setDetailAnswer}
                      setCurrentQuestionStart={setCurrentQuestionStart}
                      pause={pause}
                      setIsDownloading={setIsDownloading}
                      setCategory={setCategory}
                      setIndex={setIndex}
                      checkAnswerState={props.checkAnswerState}
                      passSaveDataState={passSaveDataState}
                      setPassSaveDataState={setPassSaveDataState}
                    ></Listening>
                  </>
                </Box>
              )}
          </>
        )}
      {!listeningState && (
        <FinishPage
          checkAnswerState={props.checkAnswerState}
          mockTestId={props.mockId}
          mockTestType={5}
          handleClose={props.handleClose}
        ></FinishPage>
      )}
    </>
  );
}

export default ListeningMockTest;
