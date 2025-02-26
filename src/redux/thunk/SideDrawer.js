import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTestPostList } from "../api/SideDrawerApi";

export const fetchTestPostListAsync = createAsyncThunk(
  "/fectch-test-post-list",
  async ({ path }) => {
    const response = await fetchTestPostList(path);
    return response.data;
  }
);
