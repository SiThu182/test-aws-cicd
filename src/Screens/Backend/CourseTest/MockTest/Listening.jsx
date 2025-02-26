import React, { useEffect } from "react";
import { useState } from "react";
import FIBtest from "./Listening/FIBtest.js";
import HIWtest from "./Listening/HIWtest.js";
import ReusableTest from "./Writing/ReusableTest.js";
import ReusableMutlipleAnswerTest from "./Reading/ReusableMutlipleAnswerTest.js.js";
import ReusableSingleAnswerTest from "./Reading/ReusableSingleAnswerTest.js";

import ModalBox from "../../../../components/Backend/MockTest/ModalBox.jsx";
import DownloadAlertDialog from "../../../../components/Backend/MockTest/DownloadAlertDialog.jsx";
import { useParams } from "react-router-dom";
function Listening(props) {
  const data = useParams();
  const {
    pause,
    setPause,
    setCategory,
    setIndex,
    listeningAnswer,
    listening,
    mockType,
    setCounterState,
    currentPage,
    setCurrentPage,
    setSave,
    setError,
    setCurrentQuestionStart,
    error,

    setIsDownloading,
    checkAnswerState,
    setPassSaveDataState,
    passSaveDataState,
    setListeningState,
    setSectionC,
    mockId,
  } = props;
  let [smc, setSmc] = useState(true);
  let [mc, setMc] = useState(true);
  let [hcs, setHcs] = useState(true);
  let [smw, setSmw] = useState(true);
  let [hiw, setHiw] = useState(true);
  let [fib, setFib] = useState(true);
  let [sst, setSst] = useState(true);
  let [wfd, setWfd] = useState(true);

  const [currentCategory, setCurrentCategory] = useState();
  const [currentIndex, setCurrentIndex] = useState();

  const [downloadStart, setDownloadStart] = useState(true);

  const [smcAudio, setSmcAudio] = useState([]);
  const [mcAudio, setMcAudio] = useState([]);
  const [hcsAudio, setHcsAudio] = useState([]);
  const [smwAudio, setSmwAudio] = useState([]);
  const [hiwAudio, setHiwAudio] = useState([]);
  const [fibAudio, setFibAudio] = useState([]);
  const [sstAudio, setSstAudio] = useState([]);
  const [wfdAudio, setWfdAudio] = useState([]);

  const [audioReadyStatus, setAudioReadyStatus] = useState();
  useEffect(() => {
    setCategory(currentCategory);
    setIndex(currentIndex);
  }, [currentCategory, currentIndex, setIndex, setCategory]);

  //fetching audio data from audio url
  useEffect(() => {
    if (downloadStart) {
      setDownloadStart(false);
      if (mockType != 1) {
        setIsDownloading(true);
      }

      setSmcAudio([]);
      setMcAudio([]);
      setHiwAudio([]);
      setFibAudio([]);
      setHcsAudio([]);
      setFibAudio([]);
      setSstAudio([]);
      setWfdAudio([]);
      setAudioReadyStatus("loading");
      let smcAudioArray = [];
      let mcAudioArray = [];
      let hcsAudioArray = [];
      let hiwAudioArray = [];
      let smwAudioArray = [];
      let fibAudioArray = [];
      let sstAudioArray = [];
      let wfdAudioArray = [];

      const fetchAudio = async (
        index,
        url,
        audioArray,
        setAudio,
        finish = false
      ) => {
        try {
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`Failed to fetch audio from source`);
          }

          const audioData = await response.arrayBuffer();
          const audioBlob = new Blob([audioData], {
            type: response.headers.get("content-type"),
          });

          let audioUrl = URL.createObjectURL(audioBlob);
          audioArray[index] = audioUrl;
          setAudio((prev) => {
            let updateAudioArray = [...prev];
            updateAudioArray[index] = audioUrl;
            return updateAudioArray;
          });
          if (finish) {
            setAudioReadyStatus("finished");
          }
        } catch (error) {
          setAudioReadyStatus("failed");

          // Handle error, e.g., show an error message to the user
        }
      };

      for (let i = 0; i < listening.sst.length; i++) {
        fetchAudio(
          i,
          process.env.REACT_APP_BACKEND_URL +
            "storage/sst/" +
            listening.sst[i].media,
          sstAudioArray,
          setSstAudio
        );
      }
      for (let i = 0; i < listening.smc.length; i++) {
        fetchAudio(
          i,
          process.env.REACT_APP_BACKEND_URL +
            "storage/smc/" +
            listening.smc[i].media,
          smcAudioArray,
          setSmcAudio
        );
      }
      for (let i = 0; i < listening.mc.length; i++) {
        fetchAudio(
          i,
          process.env.REACT_APP_BACKEND_URL +
            "storage/mc/" +
            listening.mc[i].media,
          mcAudioArray,
          setMcAudio
        );
      }
      for (let i = 0; i < listening.hiw.length; i++) {
        fetchAudio(
          i,
          process.env.REACT_APP_BACKEND_URL +
            "storage/hiw/" +
            listening.hiw[i].media,
          hiwAudioArray,
          setHiwAudio
        );
      }
      for (let i = 0; i < listening.hcs.length; i++) {
        fetchAudio(
          i,
          process.env.REACT_APP_BACKEND_URL +
            "storage/hcs/" +
            listening.hcs[i].media,
          hcsAudioArray,
          setHcsAudio
        );
      }
      for (let i = 0; i < listening.smw.length; i++) {
        fetchAudio(
          i,
          process.env.REACT_APP_BACKEND_URL +
            "storage/smw/" +
            listening.smw[i].media,
          smwAudioArray,
          setSmwAudio
        );
      }
      for (let i = 0; i < listening.fib.length; i++) {
        fetchAudio(
          i,
          process.env.REACT_APP_BACKEND_URL +
            "storage/fib/" +
            listening.fib[i].media,
          fibAudioArray,
          setFibAudio
        );
      }
      for (let i = 0; i < listening.wfd.length; i++) {
        let finish;

        if (i === listening.wfd.length - 1) {
          finish = true;
        }
        fetchAudio(
          i,
          process.env.REACT_APP_BACKEND_URL +
            "storage/wfd/" +
            listening.wfd[i].media,
          wfdAudioArray,
          setWfdAudio,
          finish
        );
      }
    }
  }, [mockType, listening, downloadStart, setPause, setIsDownloading]);

  useEffect(() => {
    if (
      smcAudio.length === listening.smc.length &&
      mcAudio.length === listening.mc.length &&
      hcsAudio.length === listening.hcs.length &&
      smwAudio.length === listening.smw.length &&
      fibAudio.length === listening.fib.length &&
      hiwAudio.length === listening.hiw.length &&
      sstAudio.length === listening.sst.length &&
      wfdAudio.length === listening.wfd.length &&
      !smcAudio.includes(undefined) &&
      !mcAudio.includes(undefined) &&
      !hcsAudio.includes(undefined) &&
      !smwAudio.includes(undefined) &&
      !fibAudio.includes(undefined) &&
      !hiwAudio.includes(undefined) &&
      !sstAudio.includes(undefined) &&
      !wfdAudio.includes(undefined) &&
      audioReadyStatus === "finished"
    ) {
      //sorting check succeeded
      setAudioReadyStatus("succeeded");
      if (mockType != 1) {
        setIsDownloading(false);
      }
    }
  }, [
    setPause,
    audioReadyStatus,
    setIsDownloading,
    fibAudio,
    mcAudio,
    smcAudio,
    hcsAudio,
    smwAudio,
    hiwAudio,
    sstAudio,
    wfdAudio,
    listening,
    mockType,
  ]);

  useEffect(() => {
    if (audioReadyStatus !== "succeeded") {
      setPause(true);
    } else {
      setPause(false);
    }
  }, [audioReadyStatus, setPause]);

  return (
    <>
      {(audioReadyStatus === "loading" || audioReadyStatus === "finished") && (
        <ModalBox
          open={true}
          title={"Downloading Resources"}
          text={
            "Please wait a bit while we are downloading required resources."
          }
        />
      )}
      {audioReadyStatus === "failed" && <DownloadAlertDialog />}

      {audioReadyStatus === "succeeded" && (
        <>
          {sst && (
            <ReusableTest
              testPost={listening.sst}
              answer={listeningAnswer?.sst}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCategoryState={setSst}
              mockId={data.id}
              timerCounterDuration={600}
              setCurrentQuestionStart={setCurrentQuestionStart}
              // setDetailDuration={setDetailDuration}
              // detailDuration={detailDuration}
              // setDetailAnswer={setDetailAnswer}
              // detailAnswer={detailAnswer}
              setPause={setPause}
              pause={pause}
              category="sst"
              audioArray={sstAudio}
              setSave={setSave}
              setCurrentCategory={setCurrentCategory}
              setCurrentIndex={setCurrentIndex}
              passSaveDataState={passSaveDataState}
              setPassSaveDataState={setPassSaveDataState}
              error={error}
              setError={setError}
              checkAnswerState={checkAnswerState}
            ></ReusableTest>
          )}
          {!sst && mc && (
            <ReusableMutlipleAnswerTest
              testPost={listening.mc}
              answer={listeningAnswer?.mc}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCategoryState={setMc}
              category="mc"
              mockId={data.id}
              audioArray={mcAudio}
              setPause={setPause}
              setSave={setSave}
              setCurrentCategory={setCurrentCategory}
              setCurrentIndex={setCurrentIndex}
              setCurrentQuestionStart={setCurrentQuestionStart}
              passSaveDataState={passSaveDataState}
              setPassSaveDataState={setPassSaveDataState}
              error={error}
              setError={setError}
              checkAnswerState={checkAnswerState}
            ></ReusableMutlipleAnswerTest>
          )}
          {!mc && fib && (
            <FIBtest
              testPost={listening.fib}
              answer={listeningAnswer?.fib}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCategoryState={setFib}
              category="fib"
              audioArray={fibAudio}
              mockId={data.id}
              setSave={setSave}
              setCurrentCategory={setCurrentCategory}
              setCurrentIndex={setCurrentIndex}
              setCurrentQuestionStart={setCurrentQuestionStart}
              passSaveDataState={passSaveDataState}
              setPassSaveDataState={setPassSaveDataState}
              error={error}
              setError={setError}
              setPause={setPause}
              checkAnswerState={checkAnswerState}
            ></FIBtest>
          )}
          {!fib && hcs && (
            <ReusableSingleAnswerTest
              testPost={listening.hcs}
              answer={listeningAnswer?.hcs}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCategoryState={setHcs}
              mockId={data.id}
              category="hcs"
              audioArray={hcsAudio}
              setSave={setSave}
              setCurrentCategory={setCurrentCategory}
              setCurrentIndex={setCurrentIndex}
              setCurrentQuestionStart={setCurrentQuestionStart}
              passSaveDataState={passSaveDataState}
              setPassSaveDataState={setPassSaveDataState}
              error={error}
              setError={setError}
              setPause={setPause}
              checkAnswerState={checkAnswerState}
            ></ReusableSingleAnswerTest>
          )}
          {!hcs && smc && (
            <ReusableSingleAnswerTest
              testPost={listening.smc}
              answer={listeningAnswer?.smc}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCategoryState={setSmc}
              category="smc"
              mockId={data.id}
              audioArray={smcAudio}
              setSave={setSave}
              setCurrentCategory={setCurrentCategory}
              setCurrentIndex={setCurrentIndex}
              setCurrentQuestionStart={setCurrentQuestionStart}
              passSaveDataState={passSaveDataState}
              setPassSaveDataState={setPassSaveDataState}
              error={error}
              setError={setError}
              setPause={setPause}
              checkAnswerState={checkAnswerState}
            ></ReusableSingleAnswerTest>
          )}

          {!smc && smw && (
            <ReusableSingleAnswerTest
              testPost={listening.smw}
              answer={listeningAnswer?.smw}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCategoryState={setSmw}
              category="smw"
              mockId={data.id}
              audioArray={smwAudio}
              setSave={setSave}
              setCurrentCategory={setCurrentCategory}
              setCurrentIndex={setCurrentIndex}
              setCurrentQuestionStart={setCurrentQuestionStart}
              passSaveDataState={passSaveDataState}
              setPassSaveDataState={setPassSaveDataState}
              error={error}
              setError={setError}
              setPause={setPause}
              checkAnswerState={checkAnswerState}
            ></ReusableSingleAnswerTest>
          )}
          {!smw && hiw && (
            <HIWtest
              testPost={listening.hiw}
              answer={listeningAnswer?.hiw}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCategoryState={setHiw}
              category="hiw"
              mockId={data.id}
              audioArray={hiwAudio}
              setSave={setSave}
              setCurrentCategory={setCurrentCategory}
              setCurrentIndex={setCurrentIndex}
              setCurrentQuestionStart={setCurrentQuestionStart}
              passSaveDataState={passSaveDataState}
              setPassSaveDataState={setPassSaveDataState}
              error={error}
              setError={setError}
              setPause={setPause}
              checkAnswerState={checkAnswerState}
            ></HIWtest>
          )}
          {!hiw && wfd && (
            <ReusableTest
              mockType={mockType}
              testPost={listening.wfd}
              answer={listeningAnswer?.wfd}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCategoryState={setWfd}
              timerCounterDuration={""}
              mockId={data.id}
              setCurrentQuestionStart={setCurrentQuestionStart}
              // setDetailDuration={setDetailDuration}
              // detailDuration={detailDuration}
              // setDetailAnswer={setDetailAnswer}
              // detailAnswer={detailAnswer}
              setSectionC={setSectionC}
              setCounterState={setCounterState}
              setListeningState={setListeningState}
              setPause={setPause}
              pause={pause}
              category="wfd"
              audioArray={wfdAudio}
              setSave={setSave}
              setCurrentCategory={setCurrentCategory}
              setCurrentIndex={setCurrentIndex}
              passSaveDataState={passSaveDataState}
              setPassSaveDataState={setPassSaveDataState}
              error={error}
              setError={setError}
              checkAnswerState={checkAnswerState}
            ></ReusableTest>
          )}
        </>
      )}
    </>
  );
}

export default Listening;
