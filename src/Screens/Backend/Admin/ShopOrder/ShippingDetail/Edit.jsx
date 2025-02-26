import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetcheditPostsAsync } from "../../../../../redux/thunk/Posts";
import BackButton from "../../../../../components/Backend/BackButton";
import ShippingDetailForm from "../../../../../components/Backend/Admin/Posts/ShippingDetailForm";

const Edit = () => {
  const { editPost, editStatus } = useSelector((state) => state.posts);
  const postId = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetcheditPostsAsync({ path: "shipping-detail", id: postId.editId })
    );
  }, [dispatch, postId.editId]);

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
          <Typography variant="h5">Email Template</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 2 }}>
            Edit
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
            <ShippingDetailForm
              edit="edit"
              editPost={editPost}
              editId={editPost?.id}
            ></ShippingDetailForm>
          </>
        )}
      </Box>
    </>
  );
};

export default Edit;
