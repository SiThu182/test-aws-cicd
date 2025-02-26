import { createSlice } from "@reduxjs/toolkit";
import { fetchAdminOrdersAsync, fetchOrdersAsync } from "../thunk/Order";
import { fetchReviewAsync } from "../thunk/ProductReview";

const initialState = {
  reviewList: [],
  status: "",
  error: null,
};

const ProductReviewSlice = createSlice({
  name: "ProductReviewSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReviewAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchReviewAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.reviewList = action.payload;
    });
    builder.addCase(fetchReviewAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default ProductReviewSlice.reducer;
