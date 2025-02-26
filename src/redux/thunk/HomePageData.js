import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchHomePageData } from "../api/HomePageApi";
// import { thunkCreator } from "./ReusableThunkCreator";

export const HomePageDataFetchAsync = createAsyncThunk(
  "home-page-data",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchHomePageData(path);
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

// export const HomePageDataFetchAsync = (path) =>
//   thunkCreator("home-page-data", path, FetchHomePageData);
