import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import FormComponent from "../../../../components/Backend/Admin/Posts/SubscriptionForm";
import TrainingForm from "../../../../components/Backend/Admin/Posts/TrainingForm";
import { fetcheditPostsAsync } from "../../../../redux/thunk/Posts";
import BackButton from "../../../../components/Backend/BackButton";
import TrialAndPromotionForm from "../../../../components/Backend/Admin/Posts/TrialAndPromotionForm";

const Edit = (props) => {
  const { title } = props;
  const { editPost, editStatus } = useSelector((state) => state.posts);
  const postId = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetcheditPostsAsync({ path: "subscription-plan", id: postId.id }));
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
          <Typography variant="h5">Subscription {title}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 2 }}>
            Edit Post
          </Typography>
          <BackButton />
        </Box>
        {(editStatus === "loading" ||
          editStatus === "failed" ||
          editPost === undefined) && (
          <Box>
            <Typography variant="h5">{editStatus}</Typography>
          </Box>
        )}

        {editStatus === "succeeded" &&
          editPost !== undefined &&
          (title === "Training" ? (
            <TrainingForm
              addPath="subscription-plan"
              edit="edit"
              editPost={editPost}
              id={editPost.id}
            ></TrainingForm>
          ) : title === "Trial" || title === "Promotion" ? (
            <TrialAndPromotionForm
              addPath="subscription-plan"
              edit="edit"
              editPost={editPost}
              editPostIsActive={editPost.isActive}
              id={editPost.id}
            ></TrialAndPromotionForm>
          ) : (
            <FormComponent
              addPath="subscription-plan"
              edit="edit"
              editPost={editPost}
              id={editPost.id}
            ></FormComponent>
          ))}
      </Box>
    </>
  );
};

export default Edit;
