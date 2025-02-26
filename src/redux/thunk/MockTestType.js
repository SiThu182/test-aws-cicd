import { createAsyncThunk } from "@reduxjs/toolkit";

import { FetchMockTestType } from "../api/MockTestTypeApi";

export const fetchMockTestTypeAsync = createAsyncThunk(
  "/fectchMtType",
  async (path) => {
    const response = await FetchMockTestType(path);
    return response;
  }
);
