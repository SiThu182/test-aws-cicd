import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  FetchListeningDetail,
  FetchMockTestDetail,
  FetchMockTestList,
  FetchReadingDetail,
  FetchSpeakingDetail,
  FetchUserPlanDetail,
  FetchWritingDetail,
} from "../api/DashboardApi";

export const fetchSpeakingDetailAsync = createAsyncThunk(
  "posts/fetchSpeakingDetails",
  async (path) => {
    const response = await FetchSpeakingDetail(path);

    return response.data.data;
  }
);
export const fetchWritingDetailAsync = createAsyncThunk(
  "posts/fetchWritingDetails",
  async (path) => {
    const response = await FetchWritingDetail(path);
    return response.data.data;
  }
);
export const fetchReadingDetailAsync = createAsyncThunk(
  "posts/fetchReadingDetails",
  async (path) => {
    const response = await FetchReadingDetail(path);
    return response.data.data;
  }
);
export const fetchListeningDetailAsync = createAsyncThunk(
  "posts/fetchListeningDetails",
  async (path) => {
    const response = await FetchListeningDetail(path);
    return response.data.data;
  }
);
export const fetchMockTestListAsync = createAsyncThunk(
  "posts/fetchMockTestList",
  async (path) => {
    const response = await FetchMockTestList(path);
    return response.data.data;
  }
);
export const fetchMockTestDetailAsync = createAsyncThunk(
  "posts/fetchMockTestDetail",
  async (path) => {
    const response = await FetchMockTestDetail(path);
    return response.data.data;
  }
);
export const fetchUserPlanDetailAsync = createAsyncThunk(
  "posts/fetchUserPlanDetail",
  async () => {
    const response = await FetchUserPlanDetail();
    return response.data;
  }
);
