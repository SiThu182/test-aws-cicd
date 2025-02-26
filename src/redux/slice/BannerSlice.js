import { createSlice } from "@reduxjs/toolkit";
import { FetchBannerAsync, FetchBannerFrontendAsync } from "../thunk/Banner";

let initialState = {
  bannerList: "",
  bannerListError: null,
  bannerListStatus: "",
  bannerListFrontend: "",
  bannerListFrontendError: null,
  bannerListFrontendStatus: "",
};

const BannerSlice = createSlice({
  name: "BannerSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(FetchBannerAsync.pending, (state) => {
      state.bannerListStatus = "loading";
      state.bannerListError = null;
    });
    builder.addCase(FetchBannerAsync.fulfilled, (state, action) => {
      state.bannerListStatus = "succeeded";
      state.bannerList = action.payload;
    });

    builder.addCase(FetchBannerAsync.rejected, (state, action) => {
      state.bannerListStatus = "failed";
      state.bannerListError = action.error.message;
    });
    builder.addCase(FetchBannerFrontendAsync.pending, (state) => {
      state.bannerListFrontendStatus = "loading";
      state.bannerListFrontendError = null;
    });
    builder.addCase(FetchBannerFrontendAsync.fulfilled, (state, action) => {
      state.bannerListFrontendStatus = "succeeded";
      state.bannerListFrontend = action.payload;
    });

    builder.addCase(FetchBannerFrontendAsync.rejected, (state, action) => {
      state.bannerListFrontendStatus = "failed";
      state.bannerListFrontendError = action.error.message;
    });
  },
});

export default BannerSlice.reducer;
