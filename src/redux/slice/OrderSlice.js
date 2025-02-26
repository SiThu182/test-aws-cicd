import { createSlice } from "@reduxjs/toolkit";
import { fetchAdminOrdersAsync, fetchOrdersAsync, fetchCouponAsync } from "../thunk/Order";

const initialState = {
  orderList: [],
  couponList: [],
  couponListStatus: "",
  couponListError: null,


  status: "",
  error: null,
  adminOrderList: [],
  adminOrderListStatus: "",
  adminOrderListError: null,
};

const SaveNoteSlice = createSlice({
  name: "SaveNoteSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrdersAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.orderList = action.payload;
    });
    builder.addCase(fetchOrdersAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchAdminOrdersAsync.pending, (state) => {
      state.adminOrderListStatus = "loading";
    });
    builder.addCase(fetchAdminOrdersAsync.fulfilled, (state, action) => {
      state.adminOrderListStatus = "succeeded";
      state.adminOrderList = action.payload;
    });
    builder.addCase(fetchAdminOrdersAsync.rejected, (state, action) => {
      state.adminOrderListStatus = "failed";
      state.adminOrderListError = action.error.message;
    });
    builder.addCase(fetchCouponAsync.pending, (state) => {
      state.couponListStatus = "loading";
    });
    builder.addCase(fetchCouponAsync.fulfilled, (state, action) => {
      state.couponListStatus = "succeeded";
      state.couponList = action.payload;
    });
    builder.addCase(fetchCouponAsync.rejected, (state, action) => {
      state.couponListStatus = "failed";
      state.couponListError = action.error.message;
    });
  },
});

export default SaveNoteSlice.reducer;
