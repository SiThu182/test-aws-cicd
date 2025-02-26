import { createSlice } from "@reduxjs/toolkit";

import {
  fetchListeningDetailAsync,
  fetchMockTestDetailAsync,
  fetchMockTestListAsync,
  fetchReadingDetailAsync,
  fetchSpeakingDetailAsync,
  fetchUserPlanDetailAsync,
  fetchWritingDetailAsync,
} from "../thunk/Dashboard";

const initialState = {
  speakingDetailStatus: "",
  writingDetailStatus: "",
  readingDetailStatus: "",
  listeningDetailStatus: "",
  mockTestListStatus: "",
  mockTestDetailStatus: "",
  userPlanDetailStatus: "",
  userInfo: null,
  error: null,
  postId: "",
  speakingPosts: [],
  speakingTotalPage: "",
  writingPosts: [],
  writingTotalPage: "",
  readingPosts: [],
  readingTotalPage: "",
  listeningPosts: [],
  listeningTotalPage: "",
  mockTestPosts: [],
  mockTestTotalPage: "",
  mtDetailPost: [],
  userPlanDetail: [],
};

const DashboardSlice = createSlice({
  name: "DashboardSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSpeakingDetailAsync.pending, (state) => {
      state.speakingDetailStatus = "loading";
    });
    builder.addCase(fetchSpeakingDetailAsync.fulfilled, (state, action) => {
      state.speakingDetailStatus = "succeeded";
      state.speakingPosts = action.payload;
      state.totalPage =
        action.payload !== undefined &&
        action.payload.last_page !== undefined &&
        action.payload.last_page !== ""
          ? action.payload.last_page
          : undefined;
    });

    builder.addCase(fetchSpeakingDetailAsync.rejected, (state, action) => {
      state.speakingDetailStatus = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchWritingDetailAsync.pending, (state) => {
      state.writingDetailStatus = "loading";
    });
    builder.addCase(fetchWritingDetailAsync.fulfilled, (state, action) => {
      state.writingDetailStatus = "succeeded";
      state.writingPosts = action.payload;
      state.writingTotalPage =
        action.payload !== undefined &&
        action.payload.last_page !== undefined &&
        action.payload.last_page !== ""
          ? action.payload.last_page
          : undefined;
    });

    builder.addCase(fetchWritingDetailAsync.rejected, (state, action) => {
      state.writingDetailStatus = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchReadingDetailAsync.pending, (state) => {
      state.readingDetailStatus = "loading";
    });
    builder.addCase(fetchReadingDetailAsync.fulfilled, (state, action) => {
      state.readingDetailStatus = "succeeded";
      state.readingPosts = action.payload;
      state.readingTotalPage =
        action.payload !== undefined &&
        action.payload.last_page !== undefined &&
        action.payload.last_page !== ""
          ? action.payload.last_page
          : undefined;
    });

    builder.addCase(fetchReadingDetailAsync.rejected, (state, action) => {
      state.readingDetailStatus = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchListeningDetailAsync.pending, (state) => {
      state.listeningDetailStatus = "loading";
    });
    builder.addCase(fetchListeningDetailAsync.fulfilled, (state, action) => {
      state.listeningDetailStatus = "succeeded";
      state.listeningPosts = action.payload;
      state.listeningTotalPage =
        action.payload !== undefined &&
        action.payload.last_page !== undefined &&
        action.payload.last_page !== ""
          ? action.payload.last_page
          : undefined;
    });
    builder.addCase(fetchListeningDetailAsync.rejected, (state, action) => {
      state.listeningDetailStatus = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchMockTestListAsync.pending, (state) => {
      state.mockTestListStatus = "loading";
    });
    builder.addCase(fetchMockTestListAsync.fulfilled, (state, action) => {
      state.mockTestListStatus = "succeeded";
      
      state.mockTestPosts = action.payload.data;
      state.mockTestTotalPage =
        action.payload !== undefined &&
        action.payload.last_page !== undefined &&
        action.payload.last_page !== ""
          ? action.payload.last_page
          : undefined;
    
    });
    builder.addCase(fetchMockTestListAsync.rejected, (state, action) => {
      state.mockTestListStatus = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchMockTestDetailAsync.pending, (state) => {
      state.mockTestDetailStatus = "loading";
    });
    builder.addCase(fetchMockTestDetailAsync.fulfilled, (state, action) => {
      state.mockTestDetailStatus = "succeeded";
   
      state.mtDetailPost = action.payload;
    });
    builder.addCase(fetchMockTestDetailAsync.rejected, (state, action) => {
      state.mockTestDetailStatus = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchUserPlanDetailAsync.pending, (state) => {
      state.userPlanDetailStatus = "loading";
    });
    builder.addCase(fetchUserPlanDetailAsync.fulfilled, (state, action) => {
      state.userPlanDetailStatus = "succeeded";
  
      state.userPlanDetail = action.payload;
    });
    builder.addCase(fetchUserPlanDetailAsync.rejected, (state, action) => {
      state.userPlanDetailStatus = "failed";
      state.error = action.error.message;
    });
  },
});

export default DashboardSlice.reducer;
