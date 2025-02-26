import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchActivityLogList } from "../api/ActivityLogApi";

export const fetchActivityLogListAsync = createAsyncThunk(
  "/fectchtotalCount",
  async ({ userId, page }) => {

    const response = await fetchActivityLogList(userId, page);
    return response.data.data;
  }
);
