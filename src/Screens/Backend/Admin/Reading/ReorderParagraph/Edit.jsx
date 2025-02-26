import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import FormComponentBlank from "../../../../../components/Backend/Admin/Posts/FormComponentBlank";

import { fetcheditPostsAsync } from "../../../../../redux/thunk/Posts";

const Edit = () => {
  const { editPost, editStatus, correctIndex } = useSelector(
    (state) => state.posts
  );

  const postId = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetcheditPostsAsync({ path: "posts-rop", id: postId.id }));
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
          <Typography variant="h5">Reorder Paragraph</Typography>
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
            <FormComponentBlank
              category="rop"
              addPath="posts-rop"
              edit="edit"
              editTitle={editPost.title}
              editSelect={editPost.category}
              editIsActive={editPost.isActive}
              editContent={editPost.content}
              editAnswer={editPost.reorders}
              id={postId.id}
            ></FormComponentBlank>
          </>
        )}
      </Box>
    </>
  );
};

export default Edit;
