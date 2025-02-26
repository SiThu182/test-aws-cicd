import { createAsyncThunk } from "@reduxjs/toolkit";

export const thunkCreator = (thunkPath, routePath, apiCall) => {
  const thunk = createAsyncThunk(
    thunkPath,
    async ({ path }, { rejectWithValue }) => {
      try {
        const response = await apiCall(path);
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
  return thunk(routePath);
};
