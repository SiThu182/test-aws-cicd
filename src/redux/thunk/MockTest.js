import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  FetchAudioMockTest,
  FetchCheckMockTest,
  FetchMockTestList,
  FetchSaveMockTestList,
  FetchTempMockTestList,
} from "../api/MockTestApi";

export const fetchFullMockTestAsync = createAsyncThunk(
  "fullmocktest/tab",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchMockTestList(path);
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

export const fetchSpeakingMockTestAsync = createAsyncThunk(
  "speakingmocktest/tab",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchMockTestList(path);
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

export const fetchReadingMockTestAsync = createAsyncThunk(
  "readingmocktest/tab",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchMockTestList(path);
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

export const fetchWritingMockTestAsync = createAsyncThunk(
  "writingmocktest/tab",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchMockTestList(path);
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

export const fetchListeningMockTestAsync = createAsyncThunk(
  "listeningmocktest/tab",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchMockTestList(path);
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

export const fetchCheckMockTestAsync = createAsyncThunk(
  "checkmocktest",
  async (id, { rejectWithValue }) => {
    try {
      const response = await FetchCheckMockTest(id);
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

export const fetchAudioMockTestAsync = createAsyncThunk(
  "audio-mocktest",
  async (data, { rejectWithValue }) => {
    try {
      const response = await FetchAudioMockTest(data);
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

export const fetchSaveMockTestListAsync = createAsyncThunk(
  "save-mocktest-progress",
  async (data, { rejectWithValue }) => {
    try {
      const response = await FetchSaveMockTestList(data);
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

export const fetchTempMockTestListAsync = createAsyncThunk(
  "temp-mocktest-progress-list",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchTempMockTestList(path);
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
