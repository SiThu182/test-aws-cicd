import React from "react";
import ReusableTabs from "../../../../components/Backend/Admin/ReusableTabs";
import VideoRecording from "./List";
import VideoRecordingTypeList from "./TypeList";

const TabLists = React.memo(() => {
  return (
    <ReusableTabs
      labelArray={["Video Recording", "Recording Type"]}
      componentArray={[
        () => (
          <>
            <VideoRecording />
          </>
        ),
        () => (
          <>
            <VideoRecordingTypeList />
          </>
        ),
      ]}
    />
  );
});

export default TabLists;
