import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchShippingDetailApi } from "../api/ShippingDetailApi";



//speaking section post list async thunk
export const fetchShippingDetailListAsync = createAsyncThunk(
  "posts/fetchproductlist-frontend",
  async (path) => {
    const response = await FetchShippingDetailApi(path);
    return response.data.data;
  }
);
