import { Box } from "@mui/material";
import React, { createContext, useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FinishPage from "./FinishPage";
// import Intro from "./Intro";
import Listening from "./Listening";
import Reading from "./Reading";
import Speaking from "./Speaking";
import Writing from "./Writing";
import ExitConfirmBox from "./ExitConfirmBox";
import useNetworkStatus from "../../../../customHooks/CheckNetwork/checkNetwork";
import { saveData, updateSavedData } from "./SaveDataFunction";
import swal from "sweetalert";
import { storeQuestionData } from "./StoreDataFunctions";
import ErrrorBoundaryClass from "../../../../components/ErrrorBoundaryClass";
import { MtErrorFallbackFunction } from "../../../../components/ErrorFallbackFunction";
import TestInfoBar from "./TestInfoBar";

export const SaveContext = createContext();

function Test(props) {
  const { editPost, editStatus } = useSelector((state) => state.posts);
  const { checkMockTest, checkMockTestStatus } = useSelector(
    (state) => state.mockTest
  );
  //editPost is used to get details of mock test
  // const navigate = useNavigate();
  //check internet connection
  const hasRun = useRef(false);
  const online = useNetworkStatus();
  const [offline, setOffline] = useState(true);
  const [open, setOpen] = useState(false);
  const [cleanUpState, setCleanUpState] = useState(true);
  const [cleanUpAnswerState, setCleanUpAnswerState] = useState(true);
  //   let [intro, setIntro] = useState(true);
  //   let [micTest, setMicTest] = useState(true);
  //   let [micTest1, setMicTest1] = useState(true);
  let [loading, setLoading] = useState(true);
  let [sectionA, setSectionA] = useState(true);
  let [sectionB, setSectionB] = useState(true);
  let [sectionC, setSectionC] = useState(true);
  let [duration, setDuration] = useState([0, 0, 0, 0]);

  let [sectionADuration, setSectionADuration] = useState(0);
  let [sectionBDuration, setSectionBDuration] = useState(0);
  let [sectionCDuration, setSectionCDuration] = useState(0);
  // let [timerStatus, setTimerStatus] = useState(false);
  let [pause, setPause] = useState(false);
  let [question, setQuestion] = useState({ 1: [], 2: [], 3: [], 4: [] });
  let [speaking, setSpeaking] = useState();
  let [writing, setWriting] = useState();
  let [reading, setReading] = useState();
  let [listening, setListening] = useState();
  let [speakingAnswer, setSpeakingAnswer] = useState();
  let [writingAnswer, setWritingAnswer] = useState();
  let [readingAnswer, setReadingAnswer] = useState();
  let [listeningAnswer, setListeningAnswer] = useState();
  let [speakingState, setSpeakingState] = useState(true);
  let [writingState, setWritingState] = useState(true);
  let [readingState, setReadingState] = useState(true);
  let [listeningState, setListeningState] = useState(true);

  let [currentPage, setCurrentPage] = useState(1);
  // let [sectionATimer, setSectionATimer] = useState(true);
  let [counterDuration, setCounterDuration] = useState(0);
  let [counterState, setCounterState] = useState(false);
  let [timerDuration, setTimerDuration] = useState();

  //each test start time (to start the post from when user start to answer in case of network failure )
  let [currentQuestionStart, setCurrentQuestionStart] = useState(true);
  let [currentQuestionStartTime, setCurrentQuestionStartTime] = useState(0);

  //save data in case of network failure
  let [category, setCategory] = useState("ra");
  let [index, setIndex] = useState(0);
  const [saveCounterState, setSaveCounterState] = useState();
  const [detailDuration, setDetailDuration] = useState();
  const [detailAnswer, setDetailAnswer] = useState();
  //get savedata if exist
  const [resumeSaveTest, setResumeSaveTest] = useState(true);
  //pass the save data to child component state
  const [passSaveDataState, setPassSaveDataState] = useState(false);

  const [error, setError] = useState(false);
  const [save, setSave] = useState(false);
  const [isStartOfTest, setIsStartOfTest] = useState(true);
  //downloading required resource
  const [isDownloading, setIsDownloading] = useState(true);
  const [isTestStart, setIsTestStart] = useState(true);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (online.isOnline === false && !props.checkAnswerState) {
      // saveData()
      setOffline(true);
    }
  }, [online, props]);
  // sessionStorage.setItem("error", error + "error");
  //check exit box
  useEffect(() => {
    if (!open) {
      setPause(false);
    } else {
      setPause(true);
    }
  }, [open]);

  // save if no network detected during exam
  // offline is from useNetworkStatus hook
  // error from error fall back rare but catch in case of unexpected error
  // save from save and exist function
  // checkanswer state is false where there is no prior save answer

  useEffect(() => {
    if (
      ((!online.isOnline && offline) || error || save) &&
      !currentQuestionStart &&
      !props.checkAnswerState
    ) {
      let state = {
        speakingState: speakingState,
        readingState: readingState,
        writingState: writingState,
        listeningState: listeningState,
      };

      let saveTime;

      if (category === "we" || category === "swt") {
        saveTime = counterDuration;
      } else {
        saveTime = currentQuestionStartTime;
      }

      let userId = localStorage.getItem("userId");

      let currentSaveData = localStorage.getItem(
        userId + "saveMt" + props.mockId
      );
      let currentCategory = category;
      let currentDetailAnswer = detailAnswer;
      let currentDetailDuration = detailDuration;

      if (
        (currentCategory == null || currentCategory == undefined) &&
        (currentPage == 1 || !speakingState)
      ) {
        if (sectionA && !speakingState) {
          setCategory("swt");
          saveTime = currentQuestionStartTime;
          currentCategory = "swt";
          currentDetailAnswer = detailAnswer === "" ? "" : detailAnswer;
          currentDetailDuration =
            detailDuration === undefined || detailDuration == null
              ? 600
              : detailDuration;
        }
        if (!sectionA && sectionB && sectionC) {
          setCategory("rsmc");
          currentCategory = "rsmc";
        } else if (!sectionA && !sectionB && sectionC) {
          setCategory("sst");
          currentCategory = "sst";
          currentDetailAnswer = detailAnswer === "" ? "" : detailAnswer;
          currentDetailDuration =
            detailDuration === undefined || detailDuration == null
              ? 600
              : detailDuration;
        }
      }

      let currentCategoryData = localStorage.getItem(
        userId + "saveMt" + props.mockId + currentCategory
      );

      if (currentCategoryData == null || currentCategoryData == undefined) {
        currentCategoryData = JSON.parse(currentSaveData);

        localStorage.setItem(
          userId + "saveMt" + props.mockId + currentCategory,
          currentCategoryData[currentCategory]
        );

        saveData(
          props.mockId,
          1,
          saveTime,
          currentPage,
          state,
          currentCategory,
          index,
          null,
          currentDetailAnswer,
          currentDetailDuration,
          currentCategoryData[currentCategory],
          currentSaveData
        );
      } else {
        saveData(
          props.mockId,
          1,
          saveTime,
          currentPage,
          state,
          currentCategory,
          index,
          null,
          currentDetailAnswer,
          currentDetailDuration,
          currentCategoryData,
          currentSaveData
        );
      }
      if (!["swt", "we"].includes(currentCategory)) {
        setDetailAnswer("");
        setDetailDuration(0);
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
    offline,
    save,
    props.mockId,
    props,
    error,
    counterDuration,
    currentQuestionStartTime,
    category,
    detailAnswer,
    detailDuration,
    index,
    speakingState,
    currentQuestionStart,
    readingState,
    writingState,
    listeningState,
    currentPage,
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
      let post = {
        ra: [],
        rs: [],
        rl: [],
        di: [],
        asq: [],
      };

      let wPost = {
        we: [],
        swt: [],
      };

      let rPost = {
        rsmc: [],
        rmc: [],
        rfib: [],
        rwfib: [],
        rop: [],
      };

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
        mt.language_type_id === 1
          ? mt.mt_section_details.map((md) => post[md.category].push(md.post))
          : ""
      );

      editPost.data.mt_sections.map((mt) =>
        mt.language_type_id === 4
          ? mt.mt_section_details.map((md) => wPost[md.category].push(md.post))
          : ""
      );

      editPost.data.mt_sections.map((mt) =>
        mt.language_type_id === 2
          ? mt.mt_section_details.map((md) => rPost[md.category].push(md.post))
          : ""
      );
      editPost.data.mt_sections.map((mt) =>
        mt.language_type_id === 3
          ? mt.mt_section_details.map((md) => lPost[md.category].push(md.post))
          : ""
      );

      setSpeaking(post);
      setWriting(wPost);
      setReading(rPost);
      setListening(lPost);

      setQuestion(question);
      if (!props.checkAnswerState) {
        storeQuestionData("speaking", post);
        storeQuestionData("writing", wPost);
        storeQuestionData("reading", rPost);
        storeQuestionData("listening", lPost);
      }

      // setTotlaDuration(duration.reduce((a, b) => a * 1 + b * 1, 0));
      setSectionADuration(duration[0] * 1 + duration[3] * 1);
      setTimerDuration(duration[0] * 1 + duration[3] * 1);
      setCounterDuration((duration[0] * 1 + duration[3] * 1) * 60);
      setSectionBDuration(duration[1]);
      setSectionCDuration(duration[2]);

      let saveDataFile = localStorage.getItem(userId + "saveMt" + props.mockId);
      if (
        !props.saveProgressExist &&
        (saveDataFile === null || saveDataFile === undefined)
      ) {
        let allCategory = [
          "ra",
          "rs",
          "di",
          "asq",
          "rl",
          "we",
          "swt",
          "rmc",
          "rsmc",
          "rfib",
          "rwfib",
          "rop",
          "smc",
          "mc",
          "fib",
          "hiw",
          "hcs",
          "smw",
          "sst",
          "wfd",
        ];
        let data = {};
        allCategory.forEach((c) => {
          data[c] = localStorage.getItem(c);
        });

        let state = {
          speakingState: speakingState,
          readingState: readingState,
          writingState: writingState,
          listeningState: listeningState,
        };

        let saveTime;
        saveTime = (duration[0] * 1 + duration[3] * 1) * 60;

        console.log("saving data");

        saveData(
          props.mockId,
          1,
          saveTime,
          currentPage,
          state,
          category,
          index,
          data,
          detailAnswer,
          detailDuration
        );
      } else {
        setIsStartOfTest(false);
      }
      setLoading(false);
      setIsTestStart(false);
      return () => {
        setCleanUpState(false); // Optional: reset state on cleanup
      };
    }
  }, [
    editStatus,
    editPost,
    sectionC,
    question,
    checkMockTest,
    checkMockTestStatus,
    props.mockId,
    resumeSaveTest,
    props.saveProgressExist,
    cleanUpState,
    hasRun,
  ]);

  useEffect(() => {
    let saveData = localStorage.getItem(userId + "saveMt" + props.mockId);

    if (
      saveData !== null &&
      saveData !== undefined &&
      resumeSaveTest &&
      !props.checkAnswerState &&
      !isDownloading &&
      sectionC &&
      !isStartOfTest
    ) {
      // if (props.resumeByUserOutsideTest == 1) {

      setPause(true);
      let saveResult = updateSavedData(saveData, 1, setPause);

      setCounterDuration(saveResult?.time);
      setCurrentPage(saveResult?.page);
      setSpeakingState(saveResult?.state.speakingState);
      setWritingState(saveResult?.state.writingState);
      setReadingState(saveResult?.state.readingState);
      setListeningState(saveResult?.state.listeningState);

      if (
        saveResult?.state.writingState === false &&
        saveResult?.state.readingState === true
      ) {
        setCounterState(true);
        setSectionA(false);
        setSaveCounterState(true);
      }
      if (
        saveResult?.state.readingState === false &&
        saveResult?.state.listeningState === true
      ) {
        setCounterState(true);
        setSectionA(false);
        setSectionB(false);
        setSaveCounterState(true);
      }
      if (saveResult?.state.listeningState === false) {
        setSectionA(false);
        setSectionB(false);
        setSaveCounterState(true);
        setSectionC(false);
      }
      // setSaveCounterState(false);

      setPassSaveDataState(true);
      setResumeSaveTest(false);

      // localStorage.removeItem("saveMt" + props.mockId);
      // } else {
      //   setPause(true);
      //   swal({
      //     title: "Resume Test From last Save",
      //     text: "Click 'Ok' to start from the save progress ,cancel will clear your save progress.",
      //     icon: "info",
      //     buttons: true,
      //     dangerMode: true,
      //     closeOnClickOutside: false,
      //   }).then(async (ok) => {
      //     if (ok) {
      //       let saveResult = updateSavedData(saveData, 1);
      //       setCounterDuration(saveResult?.time);
      //       setCurrentPage(saveResult?.page);
      //       setSpeakingState(saveResult?.state.speakingState);
      //       setWritingState(saveResult?.state.writingState);
      //       setReadingState(saveResult?.state.readingState);
      //       setListeningState(saveResult?.state.listeningState);

      //       if (
      //         saveResult?.state.writingState === false &&
      //         saveResult?.state.readingState === true
      //       ) {
      //         setCounterState(true);
      //         setSectionA(false);
      //         setSaveCounterState(true);
      //       }
      //       if (
      //         saveResult?.state.readingState === false &&
      //         saveResult?.state.listeningState === true
      //       ) {
      //         setCounterState(true);
      //         setSectionA(false);
      //         setSectionB(false);
      //         setSaveCounterState(true);
      //       }
      //       if (saveResult?.state.listeningState === false) {
      //         setSectionA(false);
      //         setSectionB(false);
      //         setSaveCounterState(true);
      //         setSectionC(false);
      //       }
      //       // setSaveCounterState(false);

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
    isDownloading,
    props.checkAnswerState,
    props.mockId,
    resumeSaveTest,
    userId,
    props.saveProgressExist,
    sectionC,
    isTestStart,
    props.resumeByUserOutsideTest,
  ]);

  //reload save resume alert box
  // useEffect(() => {
  //   let saveData = localStorage.getItem("saveMt" + props.mockId);
  //   if (
  //     saveData !== null &&
  //     saveData !== undefined &&
  //     resumeSaveTest &&
  //     !props.checkAnswerState &&
  //     !isDownloading &&
  //     sectionC
  //   ) {
  //     setPause(true);
  //     swal({
  //       title: "Resume Test From last Save",
  //       text: "Click 'Ok' to start from the save progress ,cancel will clear your save progress.",
  //       icon: "info",
  //       buttons: true,
  //       dangerMode: true,
  //       closeOnClickOutside: false,
  //     }).then(async (ok) => {
  //       if (ok) {
  //         let saveResult = updateSavedData(saveData, 1);
  //         setCounterDuration(saveResult?.time);
  //         setCurrentPage(saveResult?.page);
  //         setSpeakingState(saveResult?.state.speakingState);
  //         setWritingState(saveResult?.state.writingState);
  //         setReadingState(saveResult?.state.readingState);
  //         setListeningState(saveResult?.state.listeningState);

  //         if (
  //           saveResult?.state.writingState === false &&
  //           saveResult?.state.readingState === true
  //         ) {
  //           setCounterState(true);
  //           setSectionA(false);
  //           setSaveCounterState(true);
  //         }
  //         if (
  //           saveResult?.state.readingState === false &&
  //           saveResult?.state.listeningState === true
  //         ) {
  //           setCounterState(true);
  //           setSectionA(false);
  //           setSectionB(false);
  //           setSaveCounterState(true);
  //         }
  //         if (saveResult?.state.listeningState === false) {
  //           setSectionA(false);
  //           setSectionB(false);
  //           setSaveCounterState(true);
  //           setSectionC(false);
  //         }
  //         // setSaveCounterState(false);

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
  // }, [
  //   isDownloading,
  //   props.checkAnswerState,
  //   props.mockId,
  //   resumeSaveTest,
  //   sectionC,
  // ]);

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
        let ansWPost = {
          swt: [],
          we: [],
        };
        let ansRPost = {
          rsmc: [],
          rmc: [],
          rfib: [],
          rwfib: [],
          rop: [],
        };
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
            mtScore.category === "ra" ||
            mtScore.category === "rs" ||
            mtScore.category === "rl" ||
            mtScore.category === "di" ||
            mtScore.category === "asq"
          ) {
            ansPost[mtScore.category] = mtScore;
          }
        });
        checkMockTest.mt_score_details.forEach((mtScore) => {
          if (mtScore.category === "we" || mtScore.category === "swt") {
            ansWPost[mtScore.category] = mtScore;
          }
        });
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

        setSpeakingAnswer(ansPost);
        setWritingAnswer(ansWPost);
        setListeningAnswer(ansLPost);
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
    if (!loading && editStatus === "succeeded" && !props.checkAnswerState) {
      if (
        counterDuration === 0 ||
        (!sectionA && sectionB && sectionC && counterState)
      ) {
        setCounterState(false);
        if (saveCounterState) {
          setSaveCounterState(false);
        } else {
          setCounterDuration(sectionBDuration * 60);
        }

        setTimerDuration(sectionBDuration);
      }
      if (
        counterDuration === 0 ||
        (!sectionA && !sectionB && sectionC && counterState)
      ) {
        setCounterState(false);
        if (saveCounterState) {
          setSaveCounterState(false);
        } else {
          setCounterDuration(sectionCDuration * 60);
        }
        setTimerDuration(sectionCDuration);
      }
    }
  }, [
    counterState,
    props,
    saveCounterState,
    counterDuration,
    sectionADuration,
    sectionBDuration,
    sectionCDuration,
    timerDuration,
    sectionA,
    sectionB,
    sectionC,
    loading,
    editStatus,
  ]);

  return (
    <>
      {sectionC &&
        speaking !== undefined &&
        reading !== undefined &&
        writing !== undefined &&
        listening !== undefined &&
        ((props.checkAnswerState &&
          speakingAnswer !== undefined &&
          readingAnswer !== undefined &&
          writingAnswer !== undefined &&
          listeningAnswer !== undefined) ||
          !props.checkAnswerState) &&
        !loading && (
          <Box
            sx={{
              width: props.checkAnswerState ? "100%" : "100vw",
              height: "auto",
            }}
          >
            <>
              <TestInfoBar
                title={
                  "Scored Test " +
                  (sectionA
                    ? "Section A"
                    : sectionB
                    ? "Section B"
                    : sectionC
                    ? "Section C"
                    : "")
                }
                open={open}
                value={
                  (currentPage /
                    (sectionA
                      ? question[1] * 1 + question[4] * 1
                      : sectionB
                      ? question[2]
                      : sectionC
                      ? question[3]
                      : "")) *
                  100
                }
                pageIndicator={
                  currentPage +
                  " of " +
                  (sectionA
                    ? question[1] * 1 + question[4] * 1
                    : sectionB
                    ? question[2]
                    : sectionC
                    ? question[3]
                    : "")
                }
                setOpen={setOpen}
                counterDuration={counterDuration}
                timerDuration={timerDuration}
              />

              {/* exit confirm box */}
              {props.checkAnswerState !== true && (
                <ExitConfirmBox
                  open={open}
                  setOpen={setOpen}
                  setSave={setSave}
                  mockTestType={props.mockTestType}
                ></ExitConfirmBox>
              )}

              {speakingState && (
                <ErrrorBoundaryClass
                  fallback={
                    <MtErrorFallbackFunction
                      error={error}
                      setError={setError}
                    ></MtErrorFallbackFunction>
                  }
                >
                  <Speaking
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
                    setCurrentQuestionStart={setCurrentQuestionStart}
                    passSaveDataState={passSaveDataState}
                    setPassSaveDataState={setPassSaveDataState}
                    error={error}
                    isDownloading={isDownloading}
                    setIsDownloading={setIsDownloading}
                    checkAnswerState={props.checkAnswerState}
                    setError={setError}
                  ></Speaking>
                </ErrrorBoundaryClass>
              )}
              {!speakingState && writingState && (
                <ErrrorBoundaryClass
                  fallback={
                    <MtErrorFallbackFunction
                      error={error}
                      setError={setError}
                    ></MtErrorFallbackFunction>
                  }
                >
                  <Writing
                    mockId={props.mockId}
                    setCounterState={setCounterState}
                    setSectionA={setSectionA}
                    setWritingState={setWritingState}
                    writing={writing}
                    writingAnswer={writingAnswer}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setPause={setPause}
                    setSave={setSave}
                    setCurrentQuestionStart={setCurrentQuestionStart}
                    setDetailDuration={setDetailDuration}
                    setDetailAnswer={setDetailAnswer}
                    pause={pause}
                    error={error}
                    setError={setError}
                    setCategory={setCategory}
                    setIndex={setIndex}
                    passSaveDataState={passSaveDataState}
                    setPassSaveDataState={setPassSaveDataState}
                    checkAnswerState={props.checkAnswerState}
                  ></Writing>
                </ErrrorBoundaryClass>
              )}
              {!writingState && readingState && (
                <ErrrorBoundaryClass
                  fallback={
                    <MtErrorFallbackFunction
                      error={error}
                      setError={setError}
                    ></MtErrorFallbackFunction>
                  }
                >
                  <Reading
                    mockId={props.mockId}
                    mockType={1}
                    setCounterState={setCounterState}
                    setSectionB={setSectionB}
                    setReadingState={setReadingState}
                    reading={reading}
                    setSave={setSave}
                    readingAnswer={readingAnswer}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setPause={setPause}
                    setCategory={setCategory}
                    setIndex={setIndex}
                    error={error}
                    setError={setError}
                    setCurrentQuestionStart={setCurrentQuestionStart}
                    passSaveDataState={passSaveDataState}
                    setPassSaveDataState={setPassSaveDataState}
                    checkAnswerState={props.checkAnswerState}
                  ></Reading>
                </ErrrorBoundaryClass>
              )}
              {!readingState && listeningState && (
                <ErrrorBoundaryClass
                  fallback={
                    <MtErrorFallbackFunction
                      error={error}
                      setError={setError}
                    ></MtErrorFallbackFunction>
                  }
                >
                  <Listening
                    mockType={1}
                    mockId={props.mockId}
                    setCounterState={setCounterState}
                    setSectionC={setSectionC}
                    setListeningState={setListeningState}
                    listening={listening}
                    listeningAnswer={listeningAnswer}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    offLine={offline}
                    setSave={setSave}
                    // setIsDownloading={setIsDownloading}
                    setPause={setPause}
                    setDetailDuration={setDetailDuration}
                    setDetailAnswer={setDetailAnswer}
                    setCurrentQuestionStart={setCurrentQuestionStart}
                    pause={pause}
                    error={error}
                    setError={setError}
                    setCategory={setCategory}
                    setIndex={setIndex}
                    checkAnswerState={props.checkAnswerState}
                    passSaveDataState={passSaveDataState}
                    setPassSaveDataState={setPassSaveDataState}
                  ></Listening>
                </ErrrorBoundaryClass>
              )}
            </>
          </Box>
        )}

      {!sectionC && (
        <FinishPage
          checkAnswerState={props.checkAnswerState}
          mockTestId={editPost.data.id}
          mockTestType={props.mockTestType}
          handleClose={props.handleClose}
        ></FinishPage>
      )}
      {/* </Box> */}
    </>
  );
}

export default Test;
