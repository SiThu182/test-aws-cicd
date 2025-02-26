import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchBlog, FetchBlogDetail, FetchBlogFrontend } from "../api/BlogApi";

export const FetchBlogAsync = createAsyncThunk(
  "blog",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchBlog(path);
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

export const FetchBlogFrontendAsync = createAsyncThunk(
  "blog/frontend",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchBlogFrontend(path);
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

export const FetchBlogDetailAsync = createAsyncThunk(
  "blog/details",
  async ({ path, id }, { rejectWithValue }) => {
    try {
      const response = await FetchBlogDetail(path, id);
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
