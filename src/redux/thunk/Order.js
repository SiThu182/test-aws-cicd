import { createAsyncThunk } from "@reduxjs/toolkit";

import { FetchPosts } from "../api/PostApi";

//speaking section post list async thunk
export const fetchOrdersAsync = createAsyncThunk(
  "posts/fetchOrders",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);

export const fetchAdminOrdersAsync = createAsyncThunk(
  "posts/fetchAdminOrders",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);

export const fetchCouponAsync = createAsyncThunk(
  "posts/fetchCouponAsync",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);

