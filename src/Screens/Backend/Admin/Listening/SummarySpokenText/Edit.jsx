import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BackButton from "../../../../../components/Backend/BackButton";
import FormComponent from "../../../../../components/Backend/Admin/Posts/FormComponent";
import { fetcheditPostsAsync } from "../../../../../redux/thunk/Posts";

const Edit = () => {
  const { editPost, editStatus } = useSelector((state) => state.posts);
  const postId = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetcheditPostsAsync({ path: "posts-rl", id: postId.id }));
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
          <Typography variant="h5">SST & WFD</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 2 }}>
            Edit Post
          </Typography>
          <BackButton />
        </Box>
        {(editStatus === "loading" || editStatus === "failed") && (
          <Box>
            <Typography variant="h5">{editStatus}</Typography>
          </Box>
        )}

        {editStatus === "succeeded" && (
          <>
            <FormComponent
              // category="rl"
              addPath="post-sst-wfd"
              edit="edit"
              editTitle={editPost.title}
              editAudioText={editPost.audio_text}
              editMedia={editPost.media}
              editContent={editPost.content}
              id={postId.id}
              editMediaType={editPost.media_type}
              category={editPost.category}
              editkeywordLength={editPost.keyword_length}
              editAnswerTemplate={editPost.answer_template}
              editIsActive={editPost.isActive}
            ></FormComponent>
          </>
        )}
      </Box>
    </>
  );
};

export default Edit;
