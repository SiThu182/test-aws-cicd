import { createSlice } from "@reduxjs/toolkit";

import { fetchListeningCountAsync, fetchReadingCountAsync, 
  fetchSpeakingCountAsync, fetchTotalCountAsync, fetchWritingCountAsync
  } from "../thunk/Count";

let initialState = {
  totalCount: "",
  speakingCount: "",
  readingCount: "",
  writingCount: "",
  listeningCount: "",
  speakingStatus: "",
  readingStatus: "",
  writingStatus: "",
  listeningStatus: "",
  totalStatus: "",
  listeningError: "",
  totalError: "",
  speakingError: "",
  writingError: "",
  readingError: "",
};

const CountSlice = createSlice({
  name: "DashboardSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {

     builder.addCase(fetchTotalCountAsync.pending, (state) => {
       state.totalStatus = "loading";
     });
     builder.addCase(fetchTotalCountAsync.fulfilled, (state, action) => {
       state.totalStatus = "succeeded";
       state.totalCount = action.payload;
     });

     builder.addCase(fetchTotalCountAsync.rejected, (state, action) => {
       state.totalStatus = "failed";
       state.totalError = action.error.message;
     });
    builder.addCase(fetchSpeakingCountAsync.pending, (state) => {
      state.speakingStatus = "loading";
    });
    builder.addCase(fetchSpeakingCountAsync.fulfilled, (state, action) => {
      state.speakingStatus = "succeeded";
      state.speakingCount = action.payload;
    });

    builder.addCase(fetchSpeakingCountAsync.rejected, (state, action) => {
      state.speakingStatus = "failed";
      state.speakingError = action.error.message;
    });
    builder.addCase(fetchWritingCountAsync.pending, (state) => {
      state.writingStatus = "loading";
    });
    builder.addCase(fetchWritingCountAsync.fulfilled, (state, action) => {
      state.writingStatus = "succeeded";
      state.writingCount = action.payload;
    });

    builder.addCase(fetchWritingCountAsync.rejected, (state, action) => {
      state.writingStatus = "failed";
      state.writingError = action.error.message;
    });
    builder.addCase(fetchReadingCountAsync.pending, (state) => {
      state.readingStatus = "loading";
    });
    builder.addCase(fetchReadingCountAsync.fulfilled, (state, action) => {
      state.readingStatus = "succeeded";
      state.readingCount = action.payload;
    });

    builder.addCase(fetchReadingCountAsync.rejected, (state, action) => {
      state.readingStatus = "failed";
      state.readingError = action.error.message;
    });
    builder.addCase(fetchListeningCountAsync.pending, (state) => {
      state.listeningStatus = "loading";
    });
    builder.addCase(fetchListeningCountAsync.fulfilled, (state, action) => {
      state.listeningStatus = "succeeded";
      state.listeningCount = action.payload;
    });

    builder.addCase(fetchListeningCountAsync.rejected, (state, action) => {
      state.listeningStatus = "failed";
      state.listeningError = action.error.message;
    });
  },
});

export default CountSlice.reducer;
