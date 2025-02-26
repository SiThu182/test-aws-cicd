import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  systemErrorStatus: null,
  systemWarningStatus: null,
  systemInfoStatus: null,
  systemError: [],
  systemInfo: [],
  systemWarning: [],
};

const InfoAlertSlice = createSlice({
  name: "InfoAlertSlice",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.systemErrorStatus = action.payload.state;
      action.payload.error !== null
        ? !state.systemError.includes(action.payload.error) &&
          state.systemError.push(action.payload.error)
        : (state.systemError = []);
    },
  },
});
export const { setError } = InfoAlertSlice.actions;
export default InfoAlertSlice.reducer;
