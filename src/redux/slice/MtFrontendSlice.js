import { createSlice } from "@reduxjs/toolkit";

import { fetchFullMockTestFrontendAsync, fetchListeningMockTestFrontendAsync, fetchReadingMockTestFrontendAsync, fetchSpeakingMockTestFrontendAsync, fetchWritingMockTestFrontendAsync } from "../thunk/MockTestFrontend";

const initialState = {
  fullMockTestFrontendStatus: null,
  fullMockTestFrontend: null,
  fullMockTestFrontendError: null,
  speakingMockTestFrontendStatus: null,
  speakingMockTestFrontend: null,
  speakingMockTestFrontendError: null,
  readingMockTestFrontendStatus: null,
  readingMockTestFrontend: null,
  readingMockTestFrontendError: null,
  writingMockTestFrontendStatus: null,
  writingMockTestFrontend: null,
  writingMockTestFrontendError: null,
  listeningMockTestFrontendStatus: null,
  listeningMockTestFrontend: null,
  listeningMockTestFrontendError: null,
};

const MtFrontendSlice = createSlice({
  name: "MtFrontendSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    //full mock test
    builder.addCase(fetchFullMockTestFrontendAsync.pending, (state) => {
      state.fullMockTestFrontendStatus = "loading";
    });
    builder.addCase(
      fetchFullMockTestFrontendAsync.fulfilled,
      (state, action) => {
        state.fullMockTestFrontendStatus = "succeeded";
        state.fullMockTestFrontend = action.payload;
      }
    );
    builder.addCase(
      fetchFullMockTestFrontendAsync.rejected,
      (state, action) => {
        state.fullMockTestFrontendStatus = "failed";
        state.fullMockTestFrontendError = action.error.message;
      }
    );
    //speaking mock test
    builder.addCase(fetchSpeakingMockTestFrontendAsync.pending, (state) => {
      state.speakingMockTestFrontendStatus = "loading";
    });
    builder.addCase(
      fetchSpeakingMockTestFrontendAsync.fulfilled,
      (state, action) => {
        state.speakingMockTestFrontendStatus = "succeeded";
        state.speakingMockTestFrontend = action.payload;
      }
    );
    builder.addCase(
      fetchSpeakingMockTestFrontendAsync.rejected,
      (state, action) => {
        state.speakingMockTestFrontendStatus = "failed";
        state.speakingMockTestFrontendError = action.error.message;
      }
    );
    //Reading
    builder.addCase(fetchReadingMockTestFrontendAsync.pending, (state) => {
      state.readingMockTestFrontendStatus = "loading";
    });
    builder.addCase(
      fetchReadingMockTestFrontendAsync.fulfilled,
      (state, action) => {
        state.readingMockTestFrontendStatus = "succeeded";
        state.readingMockTestFrontend = action.payload;
      }
    );
    builder.addCase(
      fetchReadingMockTestFrontendAsync.rejected,
      (state, action) => {
        state.readingMockTestFrontendStatus = "failed";
        state.readingMockTestFrontendError = action.error.message;
      }
    );
    //Writing
    builder.addCase(fetchWritingMockTestFrontendAsync.pending, (state) => {
      state.writingMockTestFrontendStatus = "loading";
    });
    builder.addCase(
      fetchWritingMockTestFrontendAsync.fulfilled,
      (state, action) => {
        state.writingMockTestFrontendStatus = "succeeded";
        state.writingMockTestFrontend = action.payload;
      }
    );
    builder.addCase(
      fetchWritingMockTestFrontendAsync.rejected,
      (state, action) => {
        state.writingMockTestFrontendStatus = "failed";
        state.writingMockTestFrontendError = action.error.message;
      }
    );
    //Writing
    builder.addCase(fetchListeningMockTestFrontendAsync.pending, (state) => {
      state.listeningMockTestFrontendStatus = "loading";
    });
    builder.addCase(
      fetchListeningMockTestFrontendAsync.fulfilled,
      (state, action) => {
        state.listeningMockTestFrontendStatus = "succeeded";
        state.listeningMockTestFrontend = action.payload;
      }
    );
    builder.addCase(
      fetchListeningMockTestFrontendAsync.rejected,
      (state, action) => {
        state.listeningMockTestFrontendStatus = "failed";
        state.listeningMockTestFrontendError = action.error.message;
      }
    );
  },
});

export default MtFrontendSlice.reducer;
