import { createSlice } from "@reduxjs/toolkit";
import {
  FetchEmailTempAsync,
  FetchEmailTempDetailAsync,
  FetchEmailTempFrontendAsync,
} from "../thunk/EmailTemplate";

let initialState = {
  emailTempList: "",
  emailTempListError: "",
  emailTempListStatus: "",
  emailTempListFrontend: "",
  emailTempListFrontendError: "",
  emailTempListFrontendStatus: "",
  emailTempListFrontendDetail: "",
  emailTempListFrontendDetailError: "",
  emailTempListFrontendDetailStatus: "",
};

const EmailTempSlice = createSlice({
  name: "EmailTempSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(FetchEmailTempAsync.pending, (state) => {
      state.emailTempListStatus = "loading";
    });
    builder.addCase(FetchEmailTempAsync.fulfilled, (state, action) => {
      state.emailTempListStatus = "succeeded";
      state.emailTempList = action.payload;
    });

    builder.addCase(FetchEmailTempAsync.rejected, (state, action) => {
      state.emailTempListStatus = "failed";
      state.emailTempListError = action.error.message;
    });
    builder.addCase(FetchEmailTempDetailAsync.pending, (state) => {
      state.emailTempListFrontendStatus = "loading";
    });
    builder.addCase(FetchEmailTempDetailAsync.fulfilled, (state, action) => {
      state.emailTempListFrontendStatus = "succeeded";
      state.emailTempListFrontend = action.payload;
    });

    builder.addCase(FetchEmailTempDetailAsync.rejected, (state, action) => {
      state.emailTempListFrontendStatus = "failed";
      state.emailTempListFrontendError = action.error.message;
    });
    builder.addCase(FetchEmailTempFrontendAsync.pending, (state) => {
      state.emailTempListFrontendDetailStatus = "loading";
    });
    builder.addCase(FetchEmailTempFrontendAsync.fulfilled, (state, action) => {
      state.emailTempListFrontendDetailStatus = "succeeded";
      state.emailTempListFrontendDetail = action.payload;
    });

    builder.addCase(FetchEmailTempFrontendAsync.rejected, (state, action) => {
      state.emailTempListFrontendDetailStatus = "failed";
      state.emailTempListFrontendDetailError = action.error.message;
    });
  },
});

export default EmailTempSlice.reducer;
