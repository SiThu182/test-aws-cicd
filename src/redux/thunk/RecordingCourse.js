import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchRecordingCourse,FetchRecordingCourseFrontend,FetchRecordingCourseDetail } from "../api/RecordingCourseApi";

export const FetchRecordingCourseAsync = createAsyncThunk(
  "recording_course/backend",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchRecordingCourse(path);
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

export const FetchRecordingCourseFrontendAsync = createAsyncThunk(
  "recording_course/frontend",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchRecordingCourseFrontend(path);
      console.log(response, "<<<response thunk");
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

export const FetchRecordingCourseDetailAsync = createAsyncThunk(
  "recording_course/details",
  async ({ path, id }, { rejectWithValue }) => {
    try {
      const response = await FetchRecordingCourseDetail(path, id);
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
