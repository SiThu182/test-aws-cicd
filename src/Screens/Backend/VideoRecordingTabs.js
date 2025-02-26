import React, { useEffect, useState } from "react";
import ReusableTabs from "../../components/Backend/Admin/ReusableTabs";
import useVideoRecordingTypes from "../../customHooks/VideoRecordingType/useVideoRecordingType";
import VideoRecording from "./VideoRecording";

function VideoRecordingTabs() {
  const videoRecordingTypes = useVideoRecordingTypes();
  const [labelArray, setLabelArray] = useState([]);
  const [componentArray, setComponentArray] = useState([]);
  const [cleanUpState, setCleanUpState] = useState(true);
  useEffect(() => {
    const labels = [];
    const components = [];
    if (videoRecordingTypes?.types?.data !== undefined && cleanUpState) {
      videoRecordingTypes?.types?.data.forEach((type) => {
        labels.push(type.name);
        components.push(() => <VideoRecording typeId={type.id} />);
        setLabelArray(labels);
        setComponentArray(components);
      });
      setCleanUpState(false);
    }
  }, [videoRecordingTypes, cleanUpState]);

  return (
    <>
      {!cleanUpState &&
      labelArray.length !== 0 &&
      componentArray.length !== 0 ? (
        <ReusableTabs labelArray={labelArray} componentArray={componentArray} />
      ) : !cleanUpState &&
        labelArray.length === 0 &&
        componentArray.length === 0 ? (
        <>No Video yet...</>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}

export default VideoRecordingTabs;
