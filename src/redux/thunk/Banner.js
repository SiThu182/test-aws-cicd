import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchBanner, FetchBannerFrontend } from "../api/BannerApi";

export const FetchBannerAsync = createAsyncThunk(
  "banner",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchBanner(path);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const FetchBannerFrontendAsync = createAsyncThunk(
  "banner-frontend",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchBannerFrontend(path);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
