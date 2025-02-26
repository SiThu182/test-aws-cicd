import { createSlice } from "@reduxjs/toolkit";
import { HomePageDataFetchAsync } from "../thunk/HomePageData";

let initialState = {
  CountListFetchStatus: null,
  CountListFetchError: null,
  totalFullMtCount: 0,
  totalSectionalMtCount: 0,
  totalQuestionCount: 0,
};

const HomePageDataSlice = createSlice({
  name: "HomePageDataSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(HomePageDataFetchAsync.pending, (state) => {
      state.CountListFetchStatus = "loading";
      state.CountListFetchError = null;
    });
    builder.addCase(HomePageDataFetchAsync.fulfilled, (state, action) => {
      state.CountListFetchStatus = "succeeded";
      state.totalQuestionCount = action.payload.question_count;
      state.totalFullMtCount = action.payload.full_mt_count;
      state.totalSectionalMtCount = action.payload.sectional_mt_count;
      state.CountListFetchError = null;
    });

    builder.addCase(HomePageDataFetchAsync.rejected, (state, action) => {
      state.CountListFetchStatus = "failed";
      state.CountListFetchError = action.error.message;
    });
  },
});

export default HomePageDataSlice.reducer;
