import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAudioMockTestAsync,
  fetchCheckMockTestAsync,
  fetchFullMockTestAsync,
  fetchListeningMockTestAsync,
  fetchReadingMockTestAsync,
  fetchSaveMockTestListAsync,
  fetchSpeakingMockTestAsync,
  fetchTempMockTestListAsync,
  fetchWritingMockTestAsync,
} from "../thunk/MockTest";

const initialState = {
  types: [],
  fullMockTestStatus: null,
  fulMockTest: null,
  fullMockTestError: null,
  speakingMockTestStatus: null,
  speakingMockTest: null,
  speakingMockTestError: null,
  readingMockTestStatus: null,
  readingMockTest: null,
  readingMockTestError: null,
  listeningMockTestStatus: null,
  listeningMockTest: null,
  listeningMockTestError: null,
  writingMockTestStatus: null,
  writingMockTest: null,
  writingMockTestError: null,
  checkMockTestStatus: null,
  checkMockTest: null,
  checkMockTestError: null,
  audioMockTestStatus: null,
  audioMockTest: null,
  audioMockTestError: null,
  saveMtList: [],
  saveMtListStatus: null,
  saveMtListError: null,
  tempMtList: [],
  tempMtListStatus: null,
  tempMtListError: null,
};

const MtSlice = createSlice({
  name: "MtSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFullMockTestAsync.pending, (state) => {
      state.fullMockTestStatus = "loading";
    });
    builder.addCase(fetchFullMockTestAsync.fulfilled, (state, action) => {
      state.fullMockTestStatus = "succeeded";
      state.fullMockTest = action.payload;
    });
    builder.addCase(fetchFullMockTestAsync.rejected, (state, action) => {
      state.fullMockTestStatus = "failed";
      state.fullMockTestError = action.error.message;
    });
    builder.addCase(fetchSpeakingMockTestAsync.pending, (state) => {
      state.speakingMockTestStatus = "loading";
    });
    builder.addCase(fetchSpeakingMockTestAsync.fulfilled, (state, action) => {
      state.speakingMockTestStatus = "succeeded";
      state.speakingMockTest = action.payload;
    });
    builder.addCase(fetchSpeakingMockTestAsync.rejected, (state, action) => {
      state.speakingMockTestStatus = "failed";
      state.speakingMockTestError = action.error.message;
    });
    builder.addCase(fetchReadingMockTestAsync.pending, (state) => {
      state.readingMockTestStatus = "loading";
    });
    builder.addCase(fetchReadingMockTestAsync.fulfilled, (state, action) => {
      state.readingMockTestStatus = "succeeded";
      state.readingMockTest = action.payload;
    });
    builder.addCase(fetchReadingMockTestAsync.rejected, (state, action) => {
      state.readingMockTestStatus = "failed";
      state.readingMockTestError = action.error.message;
    });
    builder.addCase(fetchWritingMockTestAsync.pending, (state) => {
      state.writingMockTestStatus = "loading";
    });
    builder.addCase(fetchWritingMockTestAsync.fulfilled, (state, action) => {
      state.writingMockTestStatus = "succeeded";
      state.writingMockTest = action.payload;
    });
    builder.addCase(fetchWritingMockTestAsync.rejected, (state, action) => {
      state.writingMockTestStatus = "failed";
      state.writingMockTestError = action.error.message;
    });
    builder.addCase(fetchListeningMockTestAsync.pending, (state) => {
      state.listeningMockTestStatus = "loading";
    });
    builder.addCase(fetchListeningMockTestAsync.fulfilled, (state, action) => {
      state.listeningMockTestStatus = "succeeded";
      state.listeningMockTest = action.payload;
    });
    builder.addCase(fetchListeningMockTestAsync.rejected, (state, action) => {
      state.listeningMockTestStatus = "failed";
      state.listeningMockTestError = action.error.message;
    });
    builder.addCase(fetchCheckMockTestAsync.pending, (state) => {
      state.checkMockTestStatus = "loading";
    });
    builder.addCase(fetchCheckMockTestAsync.fulfilled, (state, action) => {
      state.checkMockTestStatus = "succeeded";
      state.checkMockTest = action.payload;
    });
    builder.addCase(fetchCheckMockTestAsync.rejected, (state, action) => {
      state.checkMockTestStatus = "failed";
      state.checkMockTestError = action.error.message;
    });
    builder.addCase(fetchAudioMockTestAsync.pending, (state) => {
      state.audioMockTestStatus = "loading";
    });
    builder.addCase(fetchAudioMockTestAsync.fulfilled, (state, action) => {
      state.audioMockTestStatus = "succeeded";
      state.audioMockTest = action.payload;
    });
    builder.addCase(fetchAudioMockTestAsync.rejected, (state, action) => {
      state.audioMockTestStatus = "failed";
      state.audioMockTestError = action.error.message;
    });

    builder.addCase(fetchSaveMockTestListAsync.pending, (state) => {
      state.saveMtListStatus = "loading";
    });
    builder.addCase(fetchSaveMockTestListAsync.fulfilled, (state, action) => {
      state.saveMtListStatus = "succeeded";
      state.saveMtList = action.payload;
    });
    builder.addCase(fetchSaveMockTestListAsync.rejected, (state, action) => {
      state.saveMtListStatus = "failed";
      state.saveMtListError = action.error.message;
    });

    builder.addCase(fetchTempMockTestListAsync.pending, (state) => {
      state.tempMtListStatus = "loading";
    });
    builder.addCase(fetchTempMockTestListAsync.fulfilled, (state, action) => {
      state.tempMtListStatus = "succeeded";
      state.tempMtList = action.payload;
    });
    builder.addCase(fetchTempMockTestListAsync.rejected, (state, action) => {
      state.tempMtListStatus = "failed";
      state.tempMtListError = action.error.message;
    });
  },
});

export default MtSlice.reducer;
