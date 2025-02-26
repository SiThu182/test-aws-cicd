import { createSlice } from "@reduxjs/toolkit";

import { fetchShippingDetailListAsync } from "../thunk/ShippingDetail";

const initialState = {
  shippingDetailList: [],
  status: "",
  error: null,
};

const ShippingDetailSlice = createSlice({
  name: "ProductReviewSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShippingDetailListAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchShippingDetailListAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.shippingDetailList = action.payload;
    });
    builder.addCase(fetchShippingDetailListAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default ShippingDetailSlice.reducer;
