import { createSlice } from "@reduxjs/toolkit";

import { fetchMockTestTypeAsync } from "../thunk/MockTestType";

const initialState = {
  types: [],
  status: "",
  error: null,
};

const MtTypeSlice = createSlice({
  name: "MtTypeSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMockTestTypeAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMockTestTypeAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.types = action.payload;
    });
    builder.addCase(fetchMockTestTypeAsync.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default MtTypeSlice.reducer;
