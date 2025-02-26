import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetcheditPostsAsync } from "../../../../redux/thunk/Posts";
import BackButton from "../../../../components/Backend/BackButton";
import BannerForm from "../../../../components/Backend/Admin/Posts/BannerForm";
import DiscountCouponForm from "../../../../components/Backend/Admin/Posts/DiscountForm";

const DiscountEdit = () => {
  const { editPost, editStatus } = useSelector((state) => state.posts);
  const postId = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetcheditPostsAsync({ path: "coupon-percents", id: postId.id }));
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
          <Typography variant="h5">Discount</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 2 }}>
            Edit Discount
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
            <DiscountCouponForm
              edit="edit"
              editPost={editPost}
              id={editPost.id}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default DiscountEdit;
