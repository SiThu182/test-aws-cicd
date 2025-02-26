import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  FetchActiveVideoRecording,
  FetchVideoRecording,
  FetchVideoRecordingType,
  FetchVideoToPlay,
} from "../api/VideoRecordingApi";

export const fetchcVideoRecordingAsync = createAsyncThunk(
  "/fetchVideoRecording",
  async ({ path }) => {
    const response = await FetchVideoRecording({ path });

    return response.data;
  }
);

export const fetchcActiveVideoRecordingListAsync = createAsyncThunk(
  "/fetchActiveVideoRecordingList",
  async (path) => {
    const response = await FetchActiveVideoRecording(path);

    return response.data;
  }
);

export const fetchVideoToPlayAsync = createAsyncThunk(
  "/fetchVideotoPlay",
  async (path) => {
    const response = await FetchVideoToPlay(path);

    return response.data;
  }
);


export const fetchcVideoRecordingTypeAsync = createAsyncThunk(
  "/fetchVideoRecordingType",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchVideoRecordingType(path);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);