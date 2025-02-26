import React from "react";
import { useSelector } from "react-redux";

import VideoRecordingFormComponent from "../../../../components/Backend/Admin/Posts/VideoRecordingForm";

import EditLayout from "../../../../components/Backend/Admin/Posts/EditLayout";

const Edit = () => {
  const { editPost } = useSelector((state) => state.posts);

  return (
    <>
      <EditLayout
        title="Video Recording"
        editSubheader={"  Edit Video Recording"}
        path="video-recording"
      >
        <VideoRecordingFormComponent
          edit="edit"
          editPost={editPost}
          addPath={"video-recording"}
          id={editPost.id}
        ></VideoRecordingFormComponent>
      </EditLayout>
    </>
  );
};

export default Edit;
