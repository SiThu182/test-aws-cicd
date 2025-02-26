import { createSlice } from "@reduxjs/toolkit";
import { FetchDailyPracticeAsync } from "../thunk/Visitor";

let initialState = {
  dailyPracticeList: [],
  practiceListError: "",
  practiceListStatus: "",
 
};

const DailyPracticeSlice = createSlice({
  name: "DailyPracticeSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(FetchDailyPracticeAsync.pending, (state) => {
        state.visitorListStatus = "loading";
      });
    builder.addCase(FetchDailyPracticeAsync.fulfilled, (state, action) => {
      state.practiceListStatus = "succeeded";
      state.dailyPracticeList = action.payload;

    });

    builder.addCase(FetchDailyPracticeAsync.rejected, (state, action) => {
      state.practiceListStatus = "failed";
      state.practiceListError = action.error.message;
    });

  },
});

export default DailyPracticeSlice.reducer;
