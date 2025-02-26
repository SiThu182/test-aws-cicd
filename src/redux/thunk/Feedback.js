import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchFeedbacks,
  FetchStudentFeedbackFrontend,
} from "../api/FeedbackApi";

export const FetchFeedbacksAsync = createAsyncThunk(
  "feedbacks",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchFeedbacks(path);
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

export const FetchStudentFeedbackFrontendAsync = createAsyncThunk(
  "/frontend-student-feedback",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchStudentFeedbackFrontend(path);
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

export const FetchFeedbacksByTypeAsync = createAsyncThunk(
  "/frontend-student-feedback",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchStudentFeedbackFrontend(path);
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
