import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchVisitors,FetchDailyPractice } from "../api/VisitorApi";

export const FetchVisitorsAsync = createAsyncThunk(
  "visitor",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchVisitors(path);
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

export const FetchDailyPracticeAsync = createAsyncThunk(
  "fetchDailyPractice",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchDailyPractice(path);
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
 