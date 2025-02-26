import React, { useEffect } from "react";

import FeedbackFormComponent from "../../../../components/Backend/Admin/Posts/FeedbackForm";
import { fetcheditPostsAsync } from "../../../../redux/thunk/Posts";

import { useDispatch, useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";
import BackButton from "../../../../components/Backend/BackButton";

import { useParams } from "react-router-dom";

const Edit = () => {
  const { editPost, editStatus } = useSelector((state) => state.posts);
  const postId = useParams();

  const dispatch = useDispatch();
  const pathName = window.location.pathname;

  useEffect(() => {
    dispatch(fetcheditPostsAsync({ path: "student-feedbacks", id: postId.id }));
  }, [dispatch, postId.id]);

  return (
    <>
      <Box id="main" sx={{ width: "100%", p: 4 }}>
        <Box
          sx={{
            top: "1rem",
            position: "absolute",

            overflow: "visible",
            zIndex: 1500,
          }}
        >
          <Typography variant="h5">Edit Student Feedback Form</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 2 }}>
            {pathName.includes("/admin/user-feedback/edit")
              ? "Detail Feedback"
              : "Edit student"}
          </Typography>
          <BackButton />
        </Box>
        {(editStatus === "loading" || editStatus === "failed") && (
          <Box>
            <Typography variant="h5">{editStatus}</Typography>
          </Box>
        )}
        {editStatus === "succeeded" && (
          <FeedbackFormComponent
            edit="edit"
            editPost={editPost}
            addPath={"student-feedbacks"}
            id={editPost.id}
            detailView={false}
          ></FeedbackFormComponent>
        )}
      </Box>
    </>
  );
};

export default Edit;
