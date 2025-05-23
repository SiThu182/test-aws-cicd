import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import FormComponent from "../../../../../components/Backend/Admin/Posts/FormComponent";
import { fetcheditPostsAsync } from "../../../../../redux/thunk/Posts";

const Edit = () => {
  const { editPost, editStatus } = useSelector((state) => state.posts);
  const postId = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetcheditPostsAsync({ path: "posts-di", id: postId.id }));
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
          <Typography variant="h5">Describe Image </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 2 }}>
            Edit Post
          </Typography>
          <Box className="container-fluid">
            <div className="card">
              <Link
                onClick={() => {
                  navigate(-1);
                }}
                style={{
                  textDecoration: "none",

                  display: "flex",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#2196f3",
                    color: "#000",

                    "&:hover": {
                      bgcolor: "white",
                    },
                    mb: 2,
                  }}
                >
                  <ArrowBackIcon></ArrowBackIcon> Back
                </Button>
              </Link>
            </div>
          </Box>
        </Box>

        {(editStatus === "loading" || editStatus === "failed") && (
          <Box>
            <Typography variant="h5">{editStatus}</Typography>
          </Box>
        )}

        {editStatus === "succeeded" && (
          <>
            <FormComponent
              category="di"
              addPath="posts-di"
              edit="edit"
              editTitle={editPost.title}
              editAudioText={editPost.audio_text}
              editAnswerTemplate={editPost.answer_template}
              editMedia={editPost.media}
              editContent={editPost.content}
              editkeywordLength={editPost.keyword_length}
              id={postId.id}
              editMediaType={editPost.media_type}
              editIsActive={editPost.isActive}
            ></FormComponent>
          </>
        )}
      </Box>
    </>
  );
};

export default Edit;
