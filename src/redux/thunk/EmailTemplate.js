import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchEmailTemp, FetchEmailTempDetail, FetchEmailTempFrontend } from "../api/EmailTemplateApi";

export const FetchEmailTempAsync = createAsyncThunk(
  "email_template",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchEmailTemp(path);
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

export const FetchEmailTempFrontendAsync = createAsyncThunk(
  "email_template/frontend",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchEmailTempFrontend(path);
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

export const FetchEmailTempDetailAsync = createAsyncThunk(
  "email_template/details",
  async ({ path, id }, { rejectWithValue }) => {
    try {
      const response = await FetchEmailTempDetail(path, id);
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
