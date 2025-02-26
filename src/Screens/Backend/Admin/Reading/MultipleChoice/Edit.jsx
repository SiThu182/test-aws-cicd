import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import MultipleChoiceForm from "../../../../../components/Backend/Admin/Posts/MultipleChoiceForm";
import { fetcheditPostsAsync } from "../../../../../redux/thunk/Posts";

const Edit = () => {
  const { editPost, editStatus, correctIndex } = useSelector(
    (state) => state.posts
  );

  const postId = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetcheditPostsAsync({ path: "r-mul-choice", id: postId.id }));
  }, [dispatch, postId.id]);

  // useEffect(() => {
  //   editPost !==undefined && editPost !==
  // })

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
          <Typography variant="h5">Multiple Choice</Typography>
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
            <MultipleChoiceForm
              category={editPost.category}
              addPath="posts-r-mc-sa"
              edit="edit"
              editTitle={editPost.title}
              editMedia={editPost.media}
              editMediaType={editPost.media_type}
              editSelect={editPost.category}
              editQuestion={editPost.question}
              editIsActive={editPost.isActive}
              editContent={editPost.content}
              editChoice={editPost.mul_choices}
              editTotal={editPost}
              id={postId.id}
              editRadio={correctIndex}
            ></MultipleChoiceForm>
          </>
        )}
      </Box>
    </>
  );
};

export default Edit;
