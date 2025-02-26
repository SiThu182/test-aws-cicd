import { createAsyncThunk } from "@reduxjs/toolkit";

import { FetchMockTestFrontend } from "../api/MockTestFrontendApi";

export const fetchFullMockTestFrontendAsync = createAsyncThunk(
  "fullmocktest/tab",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchMockTestFrontend(path);
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

export const fetchSpeakingMockTestFrontendAsync = createAsyncThunk(
  "speakingmocktest/tab",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchMockTestFrontend(path);
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

export const fetchReadingMockTestFrontendAsync = createAsyncThunk(
  "redingmocktest/tab",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchMockTestFrontend(path);
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
export const fetchWritingMockTestFrontendAsync = createAsyncThunk(
  "writingmocktest/tab",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchMockTestFrontend(path);
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

export const fetchListeningMockTestFrontendAsync = createAsyncThunk(
  "listeningmocktest/tab",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchMockTestFrontend(path);
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