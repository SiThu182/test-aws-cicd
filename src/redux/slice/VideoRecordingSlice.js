import { createSlice } from "@reduxjs/toolkit";

import {
  fetchVideoToPlayAsync,
  fetchcActiveVideoRecordingListAsync,
  fetchcVideoRecordingAsync,
  fetchcVideoRecordingTypeAsync,
} from "../thunk/VideoRecording";

let initialState = {
  videoRecording: [],
  videoRecordingStatus: "",
  videoRecordingError: null,
  videoRecordingTypeList: [],
  videoRecordingTypeListStatus: "",
  videoRecordingTypeListError: null,
  activeVideoRecording: [],
  activeVideoRecordingStatus: "",
  activeVideoRecordingError: null,
  playVideoRecording: [],
  playVideoRecordingStatus: "",
  playVideoRecordingError: null,
};
const CourseSlice = createSlice({
  name: "VideoRecordingSlice",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchcVideoRecordingAsync.pending, (state) => {
      state.videoRecordingStatus = "loading";
      state.videoRecordingError = null;
    });
    builder.addCase(fetchcVideoRecordingAsync.fulfilled, (state, action) => {
      state.videoRecordingStatus = "succeeded";
      state.videoRecording = action.payload.data;
      state.videoRecordingError = null;
    });

    builder.addCase(fetchcVideoRecordingAsync.rejected, (state, action) => {
      state.videoRecordingStatus = "failed";
      state.videoRecordingError = action.error.message;
    });
    builder.addCase(fetchcActiveVideoRecordingListAsync.pending, (state) => {
      state.activeVideoRecordingStatus = "loading";
      state.activeVideoRecordingError = null;
    });
    builder.addCase(
      fetchcActiveVideoRecordingListAsync.fulfilled,
      (state, action) => {
        state.activeVideoRecordingStatus = "succeeded";
        state.activeVideoRecording = action.payload.data;
        state.activeVideoRecordingError = null;
      }
    );

    builder.addCase(
      fetchcActiveVideoRecordingListAsync.rejected,
      (state, action) => {
        state.activeVideoRecordingStatus = "failed";
        state.activeVideoRecordingError = action.error.message;
      }
    );
    builder.addCase(fetchVideoToPlayAsync.pending, (state) => {
      state.playVideoRecordingStatus = "loading";
      state.playVideoRecordingError = null;
    });
    builder.addCase(
      fetchVideoToPlayAsync.fulfilled,
      (state, action) => {
        state.playVideoRecordingStatus = "succeeded";
        state.playVideoRecording = action.payload.data;
        state.playVideoRecordingError = null;
      }
    );

    builder.addCase(
      fetchVideoToPlayAsync.rejected,
      (state, action) => {
        state.playVideoRecordingStatus = "failed";
        state.playVideoRecordingError = action.error.message;
      }
    );
      builder.addCase(fetchcVideoRecordingTypeAsync.pending, (state) => {
        state.videoRecordingTypeListStatus = "loading";
        state.videoRecordingTypeListError = null;
      });
      builder.addCase(fetchcVideoRecordingTypeAsync.fulfilled, (state, action) => {
        state.videoRecordingTypeListStatus = "succeeded";
        state.videoRecordingTypeList = action.payload.data;
        state.videoRecordingTypeListError = null;
      });

      builder.addCase(fetchcVideoRecordingTypeAsync.rejected, (state, action) => {
        state.videoRecordingTypeListStatus = "failed";
        state.videoRecordingTypeListError = action.error.message;
      });
  },
});

export default CourseSlice.reducer;
