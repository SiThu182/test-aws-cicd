import { createSlice } from "@reduxjs/toolkit";
import {
  FetchRecordingCourseAsync,
  FetchRecordingCourseDetailAsync,
  FetchRecordingCourseFrontendAsync,
} from "../thunk/RecordingCourse";

let initialState = {
  recordingCourseList: "",
  recordingCourseListError: "",
  recordingCourseListStatus: "",
  recordingCourseFrontend: "",
  recordingCourseFrontendError: "",
  recordingCourseFrontendStatus: "",
  recordingCourseFrontendDetail: "",
  recordingCourseFrontendDetailError: "",
  recordingCourseFrontendDetailStatus: "",
};

const RecordingCourseSlice = createSlice({
  name: "RecordingCourseSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(FetchRecordingCourseAsync.pending, (state) => {
      state.recordingCourseListStatus = "loading";
    });
    builder.addCase(FetchRecordingCourseAsync.fulfilled, (state, action) => {
      state.recordingCourseListStatus = "succeeded";
      state.recordingCourseList = action.payload;
    });

    builder.addCase(FetchRecordingCourseAsync.rejected, (state, action) => {
      state.recordingCourseListStatus = "failed";
      state.recordingCourseListError = action.error.message;
    });
    builder.addCase(FetchRecordingCourseFrontendAsync.pending, (state) => {
      state.recordingCourseFrontendStatus = "loading";
    });
    builder.addCase(FetchRecordingCourseFrontendAsync.fulfilled, (state, action) => {
      state.recordingCourseFrontendStatus = "succeeded";
      state.recordingCourseFrontend = action.payload;
    });

    builder.addCase(FetchRecordingCourseFrontendAsync.rejected, (state, action) => {
      state.recordingCourseFrontendStatus = "failed";
      state.recordingCourseFrontendError = action.error.message;
    });
    builder.addCase(FetchRecordingCourseDetailAsync.pending, (state) => {
      state.recordingCourseFrontendDetailStatus = "loading";
    });
    builder.addCase(FetchRecordingCourseDetailAsync.fulfilled, (state, action) => {
      state.recordingCourseFrontendDetailStatus = "succeeded";
      state.recordingCourseFrontendDetail = action.payload;
    });

    builder.addCase(FetchRecordingCourseDetailAsync.rejected, (state, action) => {
      state.recordingCourseFrontendDetailStatus = "failed";
      state.recordingCourseFrontendDetailError = action.error.message;
    });
  },
});

export default RecordingCourseSlice.reducer;
