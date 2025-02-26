import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import MultipleChoiceForm from "../../../../../components/Backend/Admin/Posts/MultipleChoiceForm";
import { fetcheditPostsAsync } from "../../../../../redux/thunk/Posts";

const Edit = () => {
  const { editPost, editStatus } = useSelector((state) => state.posts);
  const postId = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetcheditPostsAsync({ path: "posts-di", id: postId.id }));
  }, [dispatch, postId.id]);

  //   let handleInput = (e) => {
  //     alert("add ");
  //   };

  //   let saveType = async (e) => {
  //     alert("save");
  //     // let token = await localStorage.getItem('token');
  //     // if(!token) props.navigate('/login');
  //     // else {
  //     //     let config = {headers: {Authorization: 'Bearer ' + token}}

  //     //     e.preventDefault();
  //     //     let btnSave = document.getElementById('btnSave');
  //     //     btnSave.disabled = true;
  //     //     btnSave.innerText = 'Saving...';

  //     //     const res = await axios.post(process.env.REACT_APP_BACKEND + 'posts-ra', state, config);

  //     //     if(res.editStatus === 200)
  //     //     {
  //     //         swal({
  //     //             title: "Success",
  //     //             text: res.data.message,
  //     //             icon: "success",
  //     //             button: "OK!",
  //     //             timer: 1500,
  //     //         });
  //     //         props.navigate('/post-ra');
  //     //         setState({
  //     //             name: '',
  //     //         })
  //     //     }
  //     //     else
  //     //     {

  //     //         // setState({
  //     //         //     errors: res.data.errors,
  //     //         // })
  //     //     }
  //     //     btnSave.innerText = 'Save';
  //     //     btnSave.disabled = false;
  //     // }
  //   };
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
          <Typography variant="h5">MC Single Answer</Typography>
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
              category="mc-sa"
              addPath="posts-mc-sa"
              edit="edit"
              editTitle={editPost.title}
              editAudioText={editPost.audio_text}
              editMedia={editPost.media}
              // editContent={editPost.content}
              editSelect="mc"
              id={postId.id}
            ></MultipleChoiceForm>
          </>
        )}
      </Box>
    </>
  );
};

export default Edit;
