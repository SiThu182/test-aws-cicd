import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchCount } from "../api/CountApi";

export const fetchTotalCountAsync = createAsyncThunk(
  "/fectchtotalCount",
  async (path) => {
    const response = await fetchCount(path);
    return response;
  }
);


export const fetchSpeakingCountAsync = createAsyncThunk(
  "/fectchSpeakingCount",
  async (path) => {
    const response = await fetchCount(path);
    return response;
  }
);

export const fetchWritingCountAsync = createAsyncThunk(
  "/fectchWritingCount",
  async (path) => {
    const response = await fetchCount(path);
    return response;
  }
);

export const fetchReadingCountAsync = createAsyncThunk(
  "/fectchReadingCount",
  async (path) => {
    const response = await fetchCount(path);
    return response;
  }
);

export const fetchListeningCountAsync = createAsyncThunk(
  "/fectchListeningCount",
  async (path) => {
    const response = await fetchCount(path);
    return response;
  }
);

