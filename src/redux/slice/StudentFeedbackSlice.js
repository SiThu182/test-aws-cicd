import { createSlice } from "@reduxjs/toolkit";
import { fetchTestPostListAsync } from "../thunk/SideDrawer";
import { FetchStudentFeedbackFrontendAsync } from "../thunk/Feedback";

let initialState = {
  feedbackStatus: null,
  feedback: {},
  feedbackError: null,
};

const SideDrawerSlice = createSlice({
  name: "SideDrawerSlice",
  initialState,
  reducer: {},

  extraReducers: (builder) => {
    builder.addCase(FetchStudentFeedbackFrontendAsync.pending, (state) => {
      state.feedbackStatus = "loading";
      state.feedbackStatusError = null;
    });
    builder.addCase(
      FetchStudentFeedbackFrontendAsync.fulfilled,
      (state, action) => {
        state.feedbackStatus = "succeeded";
        state.feedbackStatusError = null;
        state.feedback = action.payload;
      }
    );

    builder.addCase(
      FetchStudentFeedbackFrontendAsync.rejected,
      (state, action) => {
        state.feedbackStatus = "failed";
        state.feedbackStatusError = action.error.message;
      }
    );
  },
});

export default SideDrawerSlice.reducer;
