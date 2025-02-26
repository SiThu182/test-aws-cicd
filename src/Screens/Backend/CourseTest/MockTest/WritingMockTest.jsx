import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import FinishPage from "./FinishPage";

import Writing from "./Writing";
import ExitConfirmBox from "./ExitConfirmBox";
import useNetworkStatus from "../../../../customHooks/CheckNetwork/checkNetwork";
import swal from "sweetalert";
import { saveData, updateSavedData } from "./SaveDataFunction";
import { storeQuestionData } from "./StoreDataFunctions";
import useIsTabActive from "./ActiveTabCheck";
import TestInfoBar from "./TestInfoBar";

function WritingMockTest(props) {
  //editPost is used to get details of mock test
  const [open, setOpen] = useState(false);
  const online = useNetworkStatus();
  const hasRun = useRef(false);
  const [isStartOfTest, setIsStartOfTest] = useState(true);
  const [offline, setOffline] = useState(false);
  const [cleanUpState, setCleanUpState] = useState(true);
  const [cleanUpAnswerState, setCleanUpAnswerState] = useState(true);
  const [error, setError] = useState(false);
  // const navigate = useNavigate();
  let [loading, setLoading] = useState(true);

  let [duration, setDuration] = useState([0, 0, 0, 0]);

  let [pause, setPause] = useState(false);
  let [question, setQuestion] = useState({ 1: [], 2: [], 3: [], 4: [] });
  let [writing, setWriting] = useState();

  let [writingState, setWritingState] = useState(true);
  let [writingAnswer, setWritingAnswer] = useState();
  let [currentPage, setCurrentPage] = useState(1);
  let [counterDuration, setCounterDuration] = useState(0);
  let [timerDuration, setTimerDuration] = useState();
  const { editPost, editStatus } = useSelector((state) => state.posts);
  const { checkMockTest, checkMockTestStatus } = useSelector(
    (state) => state.mockTest
  );
  //save data detail in case of network failure
  const [category, setCategory] = useState("swt");
  const [index, setIndex] = useState(0);
  const tabActive = useIsTabActive();

  const [detailDuration, setDetailDuration] = useState();
  const [detailAnswer, setDetailAnswer] = useState("");

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
  }, [tabActive, open]);

  //save if no network detected during exam
  useEffect(() => {
    if (
      ((!online.isOnline && offline) || save || error) &&
      !props.checkAnswerState
    ) {
      let data = [];
      data["we"] = localStorage.getItem("we");
      data["swt"] = localStorage.getItem("swt");
      let userId = localStorage.getItem("userId");
      let currentCategoryData = localStorage.getItem(
        userId + "saveMt" + props.mockId + category
      );
      let currentSaveData = localStorage.getItem(
        userId + "saveMt" + props.mockId
      );
      let state = { writingState: writingState };
      if (currentCategoryData == null || currentCategoryData == undefined) {
        currentCategoryData = JSON.parse(currentSaveData);

        localStorage.setItem(
          userId + "saveMt" + props.mockId + category,
          currentCategoryData[category]
        );

        saveData(
          props.mockId,
          6,
          counterDuration,
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
          6,
          counterDuration,
          currentPage,
          state,
          category,
          index,
          null,
          detailAnswer,
          detailDuration,
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
    detailAnswer,
    detailDuration,
    category,
    index,
    writingState,
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

      let wPost = {
        we: [],
        swt: [],
      };

      editPost.data.mt_sections.map((mt) =>
        mt.language_type_id === 4
          ? mt.mt_section_details.map((md) => wPost[md.category].push(md.post))
          : ""
      );

      setWriting(wPost);
      if (!props.checkAnswerState) {
        storeQuestionData("writing", wPost);
      }

      setTimerDuration(duration[3] * 1);
      setCounterDuration(duration[3] * 1 * 60);
      setQuestion(question);
      let saveDataFile = localStorage.getItem(userId + "saveMt" + props.mockId);
      if (
        !props.saveProgressExist &&
        (saveDataFile === null || saveDataFile === undefined)
      ) {
        let data = [];
        data["we"] = localStorage.getItem("we");
        data["swt"] = localStorage.getItem("swt");
        let state = { writingState: writingState };
        let saveTime;
        saveTime = duration[3] * 1 * 60;

        saveData(
          props.mockId,
          6,
          saveTime,
          currentPage,
          state,
          category,
          index,
          data,
          detailAnswer,
          600
        );
      } else {
        setIsStartOfTest(false);
      }
      setLoading(false);
      return () => {
        setCleanUpState(false); // Optional: reset state on cleanup
      };
      //if save data present
    }
  }, [
    editStatus,
    editPost,
    props.checkAnswerState,
    duration,
    question,
    props.resumeByUserOutsideTest,
    props.mockId,
    resumeSaveTest,
    userId,
    useRef,
    cleanUpState,
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
      let saveResult = updateSavedData(saveData, 6, setPause);
      setCounterDuration(saveResult?.time);
      setCurrentPage(saveResult?.page);
      setWritingState(saveResult?.state.writingState);
      setPassSaveDataState(true);
      setResumeSaveTest(false);
      setPause(false);
      // localStorage.removeItem("saveMt" + props.mockId);
      // }
      // else {
      //   setPause(true);
      //   swal({
      //     title: "Resume Test From last Save",
      //     text: "Click 'Ok' to start from the save progress ,cancel will clear your save progress and start anew",
      //     icon: "info",
      //     buttons: true,
      //     dangerMode: true,
      //     closeOnClickOutside: false,
      //   }).then(async (ok) => {
      //     if (ok) {
      //       let saveResult = updateSavedData(saveData, 6);
      //       setCounterDuration(saveResult?.time);
      //       setCurrentPage(saveResult?.page);
      //       setWritingState(saveResult?.state.writingState);
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
        let ansWPost = {
          swt: [],
          we: [],
        };

        checkMockTest.mt_score_details.forEach((mtScore) => {
          if (mtScore.category === "we" || mtScore.category === "swt") {
            ansWPost[mtScore.category] = mtScore;
          }
        });
        setWritingAnswer(ansWPost);
        setCleanUpAnswerState(false);
      }
    }
  }, [
    props.checkAnswerState,
    checkMockTest,
    checkMockTestStatus,
    cleanUpAnswerState,
  ]);

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
      !loading &&
      writing !== undefined &&
      editStatus === "succeeded" &&
      !props.checkAnswerState
    )
      if (counterDuration == 0) {
        setWritingState(false);
      }
  }, [
    counterDuration,
    writing,
    editStatus,
    loading,
    timerDuration,
    props.checkAnswerState,
  ]);

  return (
    <>
      {writingState &&
        ((props.checkAnswerState && writingAnswer !== undefined) ||
          !props.checkAnswerState) &&
        !loading && (
          <>
            {writing !== undefined &&
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
                      title={"Score Test Writing"}
                      open={open}
                      value={(currentPage / question[4]) * 100}
                      pageIndicator={currentPage + " of " + question[4]}
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
                      mockTestType={7}
                    ></ExitConfirmBox>
                    <Writing
                      mockType={6}
                      offLine={offline}
                      writing={writing}
                      writingAnswer={writingAnswer}
                      setWritingState={setWritingState}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      setPause={setPause}
                      error={error}
                      setSave={setSave}
                      setError={setError}
                      setDetailDuration={setDetailDuration}
                      setDetailAnswer={setDetailAnswer}
                      pause={pause}
                      setCategory={setCategory}
                      setIndex={setIndex}
                      passSaveDataState={passSaveDataState}
                      checkAnswerState={props.checkAnswerState}
                      setPassSaveDataState={setPassSaveDataState}
                    ></Writing>
                  </>
                </Box>
              )}
          </>
        )}
      {!writingState && (
        <FinishPage
          checkAnswerState={props.checkAnswerState}
          mockTestId={props.mockId}
          mockTestType={6}
          handleClose={props.handleClose}
        ></FinishPage>
      )}
      {/* </Box> */}
    </>
  );
}

export default WritingMockTest;
