import React from "react";
import { useSelector } from "react-redux";

import EditLayout from "../../../../components/Backend/Admin/Posts/EditLayout";
import VideoRecordingTypeForm from "../../../../components/Backend/Admin/Posts/VideoRecordingTypeForm";

const EditType = () => {
  const { editPost } = useSelector((state) => state.posts);

  return (
    <>
      <EditLayout
        title="Video Recording Type"
        editSubheader={"  Edit Video Recording Type"}
        path="video-recording-type"
      >
        <VideoRecordingTypeForm
          edit="edit"
          editPost={editPost}
          addPath={"video-recording-type"}
          id={editPost.id}
        ></VideoRecordingTypeForm>
      </EditLayout>
    </>
  );
};

export default EditType;
