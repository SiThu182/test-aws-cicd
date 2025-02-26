import React, { createContext, useEffect } from "react";
import { useState } from "react";

// import ASQtest from "./Speaking/ASQtest";
// import DItest from "./Speaking/DItest";
// import RAtest from "./Speaking/RAtest";
// import RLtest from "./Speaking/RLtest";
// import RStest from "./Speaking/RStest";
// import ReusabletTest from "./Speaking/ReusableTest";
import ReusableTest from "./Speaking/ReusableTest";
import ModalBox from "../../../../components/Backend/MockTest/ModalBox";
import DownloadAlertDialog from "../../../../components/Backend/MockTest/DownloadAlertDialog";
import { useParams } from "react-router-dom";

export const SaveContext = createContext();
function Speaking(props) {
  const {
    pause,
    setPause,
    setCategory,
    setIndex,
    speaking,
    speakingAnswer,
    currentPage,
    setCurrentPage,
    setSave,
    setError,
    setCurrentQuestionStart,
    error,
    isDownloading,
    setIsDownloading,
    checkAnswerState,
    setPassSaveDataState,
    passSaveDataState,
    setSpeakingState,
  } = props;
  const data = useParams();
  const [ra, setRa] = useState(true);
  const [rs, setRs] = useState(true);
  const [rl, setRl] = useState(true);
  const [di, setDi] = useState(true);
  const [asq, setAsq] = useState(true);
  const [currentCategory, setCurrentCategory] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [audioReadyStatus, setAudioReadyStatus] = useState();
  const [imageReadyStatus, setImageReadyStatus] = useState();
  const [downloadStart, setDownloadStart] = useState(true);

  const [rsAudio, setRsAudio] = useState([]);

  const [rlAudio, setRlAudio] = useState([]);

  const [asqAudio, setAsqAudio] = useState([]);
  const [diImage, setDiImage] = useState([]);

  useEffect(() => {
    setCategory(currentCategory);
    setIndex(currentIndex);
  }, [currentCategory, currentIndex, setCategory, setIndex]);

  //fetching audio data from audio url

  useEffect(() => {
    if (downloadStart && isDownloading) {
      setPause(true);

      setIsDownloading(true);
      setDownloadStart(false);
      setRsAudio([]);
      setRlAudio([]);
      setAsqAudio([]);
      setAudioReadyStatus("loading");
      setImageReadyStatus("loading");
      let rsAudioArray = [];
      let rlAudioArray = [];
      let asqAudioArray = [];
      let diImageArray = [];

      const fetchAudio = async (
        index,
        url,
        audioArray,
        setAudio,
        finish = false
      ) => {
        if (isDownloading) {
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
            setAudio((prev) => {
              let updateAudioArray = [...prev];
              updateAudioArray[index] = audioUrl;
              return updateAudioArray;
            });
            if (finish) {
              setAudioReadyStatus("finished");
            }
          } catch (error) {
            console.error(error);
            setAudioReadyStatus("failed");
            setPause(true);
            // Handle error, e.g., show an error message to the user
          }
        }
      };

      const fetchImage = async (
        index,
        url,
        imageArray,
        setImage,
        finish = false
      ) => {
        if (isDownloading) {
          try {
            const response = await fetch(url);

            if (!response.ok) {
              throw new Error(`Failed to fetch audio from source`);
            }

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            setImage((prev) => {
              let updateImageArray = [...prev];
              updateImageArray[index] = blobUrl;
              return updateImageArray;
            });
            if (finish) {
              setImageReadyStatus("finished");
            }
          } catch (error) {
            console.error(error);
            setImageReadyStatus("failed");
            setPause(true);
            // Handle error, e.g., show an error message to the user
          }
        }
      };

      for (let i = 0; i < speaking.rs.length; i++) {
        fetchAudio(
          i,
          process.env.REACT_APP_BACKEND_URL +
            "storage/rs/" +
            speaking.rs[i].media,
          rsAudioArray,
          setRsAudio
        );
      }
      for (let i = 0; i < speaking.rl.length; i++) {
        fetchAudio(
          i,
          process.env.REACT_APP_BACKEND_URL +
            "storage/rl/" +
            speaking.rl[i].media,
          rlAudioArray,
          setRlAudio
        );
      }
      for (let i = 0; i < speaking.asq.length; i++) {
        let finish = false;
        if (i === speaking.asq.length - 1) {
          finish = true;
        }
        fetchAudio(
          i,
          process.env.REACT_APP_BACKEND_URL +
            "storage/asq/" +
            speaking.asq[i].media,
          asqAudioArray,
          setAsqAudio,
          finish
        );
      }
      for (let i = 0; i < speaking.di.length; i++) {
        let finish = false;
        if (i === speaking.di.length - 1) {
          finish = true;
        }
        fetchImage(
          i,
          process.env.REACT_APP_BACKEND_URL +
            "storage/di/" +
            speaking.di[i].media,
          diImageArray,
          setDiImage,
          finish
        );
      }
    }
  }, [speaking, downloadStart, setPause, isDownloading, setIsDownloading]);

  useEffect(() => {
    if (
      rsAudio.length === speaking.rs.length &&
      rlAudio.length === speaking.rl.length &&
      asqAudio.length === speaking.asq.length &&
      diImage.length === speaking.di.length &&
      !rsAudio.includes(undefined) &&
      !rlAudio.includes(undefined) &&
      !asqAudio.includes(undefined) &&
      !diImage.includes(undefined) &&
      audioReadyStatus === "finished" &&
      imageReadyStatus === "finished"
    ) {
      //sorting check succeeded
      setAudioReadyStatus("succeeded");
      setImageReadyStatus("succeeded");
    }
  }, [
    audioReadyStatus,
    imageReadyStatus,
    setIsDownloading,
    rsAudio,
    rlAudio,
    asqAudio,
    diImage,
    speaking,
  ]);

  useEffect(() => {
    if (imageReadyStatus === "succeeded" && audioReadyStatus === "succeeded") {
      setIsDownloading(false);
      setPause(false);
    } else {
      setPause(true);
    }
  }, [imageReadyStatus, audioReadyStatus, setIsDownloading, setPause]);

  return (
    <>
      {(audioReadyStatus === "loading" ||
        imageReadyStatus === "loading" ||
        imageReadyStatus === "finished" ||
        audioReadyStatus === "finished" ||
        isDownloading) && (
        <ModalBox
          open={true}
          title={"Downloading Resources"}
          text={
            "Please wait a bit while we are downloading required resources."
          }
        />
      )}
      {(audioReadyStatus === "failed" || imageReadyStatus === "failed") && (
        <DownloadAlertDialog />
      )}

      {audioReadyStatus === "succeeded" &&
        imageReadyStatus === "succeeded" &&
        !isDownloading && (
          <>
            {ra && (
              <ReusableTest
                mockId={data.id}
                testPost={speaking.ra}
                answer={speakingAnswer?.ra}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setCategoryState={setRa}
                beginningCounterCountDuration={40}
                recordingCounterCountDuration={40}
                setPause={setPause}
                pause={pause}
                category="ra"
                setSave={setSave}
                setCurrentCategory={setCurrentCategory}
                setCurrentIndex={setCurrentIndex}
                setCurrentQuestionStart={setCurrentQuestionStart}
                passSaveDataState={passSaveDataState}
                setPassSaveDataState={setPassSaveDataState}
                error={error}
                setError={setError}
                checkAnswerState={checkAnswerState}
              ></ReusableTest>
            )}
            {!ra && rs && (
              <ReusableTest
                mockId={data.id}
                testPost={speaking.rs}
                answer={speakingAnswer?.rs}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setCategoryState={setRs}
                beginningCounterCountDuration={""}
                recordingCounterCountDuration={15}
                setPause={setPause}
                pause={pause}
                category="rs"
                audioArray={rsAudio}
                setSave={setSave}
                setCurrentCategory={setCurrentCategory}
                setCurrentIndex={setCurrentIndex}
                setCurrentQuestionStart={setCurrentQuestionStart}
                passSaveDataState={passSaveDataState}
                setPassSaveDataState={setPassSaveDataState}
                error={error}
                setError={setError}
                checkAnswerState={checkAnswerState}
              ></ReusableTest>
            )}

            {!rs && di && (
              <ReusableTest
                mockId={data.id}
                testPost={speaking.di}
                answer={speakingAnswer?.di}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setCategoryState={setDi}
                beginningCounterCountDuration={25}
                recordingCounterCountDuration={40}
                setPause={setPause}
                pause={pause}
                category="di"
                setSave={setSave}
                imageArray={diImage}
                setCurrentCategory={setCurrentCategory}
                setCurrentIndex={setCurrentIndex}
                setCurrentQuestionStart={setCurrentQuestionStart}
                passSaveDataState={passSaveDataState}
                setPassSaveDataState={setPassSaveDataState}
                error={error}
                setError={setError}
                checkAnswerState={checkAnswerState}
              ></ReusableTest>
            )}
            {!di && rl && (
              <ReusableTest
                mockId={data.id}
                testPost={speaking.rl}
                answer={speakingAnswer?.rl}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setCategoryState={setRl}
                beginningCounterCountDuration={""}
                setSave={setSave}
                recordingCounterCountDuration={40}
                setPause={setPause}
                pause={pause}
                category="rl"
                audioArray={rlAudio}
                setCurrentCategory={setCurrentCategory}
                setCurrentIndex={setCurrentIndex}
                setCurrentQuestionStart={setCurrentQuestionStart}
                passSaveDataState={passSaveDataState}
                setPassSaveDataState={setPassSaveDataState}
                error={error}
                setError={setError}
                checkAnswerState={checkAnswerState}
              ></ReusableTest>
            )}
            {!rl && asq && (
              <ReusableTest
                mockId={data.id}
                setSpeakingState={setSpeakingState}
                testPost={speaking.asq}
                setSave={setSave}
                answer={speakingAnswer?.asq}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setCategoryState={setAsq}
                beginningCounterCountDuration={""}
                recordingCounterCountDuration={10}
                setPause={setPause}
                pause={pause}
                category="asq"
                audioArray={asqAudio}
                setCurrentCategory={setCurrentCategory}
                setCurrentIndex={setCurrentIndex}
                setCurrentQuestionStart={setCurrentQuestionStart}
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

export default Speaking;
