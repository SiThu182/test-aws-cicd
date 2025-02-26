import { createSlice } from "@reduxjs/toolkit";
import { fetchActivityLogListAsync } from "../thunk/ActivityLog";

let initialState = {
  activityLog: null,
  activityLogStatus: null,
  activityLogError: null,
};

const ActivityLogSlice = createSlice({
  name: "ActivityLogSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActivityLogListAsync.pending, (state) => {
      state.activityLogStatus = "loading";
      state.activityLogError = null;
    });
    builder.addCase(fetchActivityLogListAsync.fulfilled, (state, action) => {
      state.activityLogStatus = "succeeded";
      state.activityLogError = null;
      state.activityLog = action.payload;
    });

    builder.addCase(fetchActivityLogListAsync.rejected, (state, action) => {
      state.activityLogStatus = "failed";
      state.activityLogError = action.error.message;
    });
  },
});

export default ActivityLogSlice.reducer;
