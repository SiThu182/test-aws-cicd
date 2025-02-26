import React from "react";
import { useSelector } from "react-redux";

import EditLayout from "../../../../components/Backend/Admin/Posts/EditLayout";

import MaterialTypeForm from "../../../../components/Backend/Admin/Posts/MaterialTypeForm";

const EditType = () => {
  const { editPost } = useSelector((state) => state.posts);

  return (
    <>
      <EditLayout
        title="Material Type"
        editSubheader={"  Edit Material Type"}
        path="material-types"
      >
        <MaterialTypeForm
          edit="edit"
          editPost={editPost}
          addPath={"material-types"}
          id={editPost.id}
        />
      </EditLayout>
    </>
  );
};

export default EditType;
