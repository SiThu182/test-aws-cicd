import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  FetchMaterialTypes,
  FetchMaterials,
  FetchMaterialsFrontend,
} from "../api/MaterialDownloadApi";

export const FetchMaterialsAsync = createAsyncThunk(
  "materials",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchMaterials(path);
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

export const FetchUserGuideAsync = createAsyncThunk(
  "user-guide",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchMaterialsFrontend(path);
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

export const FetchMaterialTypesAsync = createAsyncThunk(
  "material-types",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchMaterialTypes(path);
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

export const FetchMaterialsFrontendAsync = createAsyncThunk(
  "materials/frontend",
  async ({ path }, { rejectWithValue }) => {
    try {
      const response = await FetchMaterialsFrontend(path);
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
