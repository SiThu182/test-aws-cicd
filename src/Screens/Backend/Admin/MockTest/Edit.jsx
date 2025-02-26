import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import MockTestTabs from "../../../../components/Backend/Admin/Posts/MockTest";
import { fetcheditPostsAsync } from "../../../../redux/thunk/Posts";
import BackButton from "../../../../components/Backend/BackButton";

function Edit() {
  const { editPost, editStatus } = useSelector((state) => state.posts);
  const postId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [chooseType, setChooseType] = useState("");
  let [defaultValue, setDefaultValue] = React.useState([
    false,
    false,
    false,
    false,
  ]);
  useEffect(() => {
    dispatch(fetcheditPostsAsync({ path: "mocktest", id: postId.id }));
  }, [dispatch, postId.id]);

  useEffect(() => {
    if (editPost !== undefined && editPost.mt_sections !== undefined) {
      editPost.mt_sections.forEach((ms) => {
        defaultValue[ms.language_type_id - 1] = ms.duration;
        setChooseType(editPost.mt_type_id);
      });
      setDefaultValue(defaultValue);
    }
  }, [defaultValue, editPost]);
  return (
    <>
      <Box
        className="container-fluid"
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          mt: 1,
        }}
      >
        <div className="card">
          <BackButton />
        </div>
      </Box>
      {(editStatus === "loading" || editStatus === "failed") && (
        <Box>
          <Typography variant="h5">{editStatus}</Typography>
        </Box>
      )}
      {editStatus === "succeeded" && (
        <>
          <MockTestTabs
            edit="edit"
            editPost={editPost}
            name={editPost.name}
            editId={postId.id}
            defaultValue={defaultValue}
            chooseType={chooseType}
          ></MockTestTabs>
        </>
      )}
    </>
  );
}

export default Edit;
