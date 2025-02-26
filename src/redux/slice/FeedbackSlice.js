import { createSlice } from "@reduxjs/toolkit";
import {
  FetchFeedbacksAsync,
  FetchFeedbacksByTypeAsync,
} from "../thunk/Feedback";

let initialState = {
  feedbackList: "",
  feedbackListError: null,
  feedbackListStatus: null,
  feedbackListByType: "",
  feedbackListByTypeError: null,
  feedbackListByTypeStatus: null,
};

const FeedbackSlice = createSlice({
  name: "FeedbackSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(FetchFeedbacksAsync.pending, (state) => {
      state.feedbackListStatus = "loading";
      state.feedbackListError = null;
    });
    builder.addCase(FetchFeedbacksAsync.fulfilled, (state, action) => {
      state.feedbackListStatus = "succeeded";
      state.feedbackList = action.payload;
      state.feedbackListError = null;
    });

    builder.addCase(FetchFeedbacksAsync.rejected, (state, action) => {
      state.feedbackListStatus = "failed";
      state.feedbackListError = action.error.message;
    });

    builder.addCase(FetchFeedbacksByTypeAsync.pending, (state) => {
      state.feedbackListByTypeStatus = "loading";
      state.feedbackListByTypeError = null;
    });
    builder.addCase(FetchFeedbacksByTypeAsync.fulfilled, (state, action) => {
      state.feedbackListByTypeStatus = "succeeded";
      state.feedbackListByType = action.payload;
      state.feedbackListByTypeError = null;
    });

    builder.addCase(FetchFeedbacksByTypeAsync.rejected, (state, action) => {
      state.feedbackListByTypeStatus = "failed";
      state.feedbackListByTypeError = action.error.message;
    });
  },
});

export default FeedbackSlice.reducer;
