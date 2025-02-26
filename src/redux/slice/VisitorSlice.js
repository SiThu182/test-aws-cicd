import { createSlice } from "@reduxjs/toolkit";
import { FetchVisitorsAsync,FetchDailyPracticeAsync } from "../thunk/Visitor";

let initialState = {
  visitorList: [],
  visitorListError: "",
  visitorListStatus: "",
  userType: [],
  countryType: [],

  dailyTransactions: [],
  dailyActivityLogs:[]
};

const VisitorSlice = createSlice({
  name: "VisitorSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(FetchVisitorsAsync.pending, (state) => {
      state.visitorListStatus = "loading";
    });
    builder.addCase(FetchVisitorsAsync.fulfilled, (state, action) => {
      state.visitorListStatus = "succeeded";
      state.visitorList = action.payload["visitor"];
      state.userType = action.payload["userType"];
      state.countryType = action.payload["countryType"];

      state.dailyTransactions = action.payload["dailyTransactions"];
     

    });

    builder.addCase(FetchVisitorsAsync.rejected, (state, action) => {
      state.VisitorListStatus = "failed";
      state.VisitorListError = action.error.message;
    });
    builder.addCase(FetchDailyPracticeAsync.pending, (state) => {
      state.visitorListStatus = "loading";
    });
    builder.addCase(FetchDailyPracticeAsync.fulfilled, (state, action) => {
      state.visitorListStatus = "succeeded";
      state.dailyActivityLogs = action.payload["daily_activity_logs"];

    });

    builder.addCase(FetchDailyPracticeAsync.rejected, (state, action) => {
      state.VisitorListStatus = "failed";
      state.VisitorListError = action.error.message;
    });

  },
});

export default VisitorSlice.reducer;
