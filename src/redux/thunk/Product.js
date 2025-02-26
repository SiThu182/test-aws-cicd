import { createAsyncThunk } from "@reduxjs/toolkit";

import { FetchPosts } from "../api/PostApi";
import { fetchProductDetailFrontend } from "../api/Product";

//speaking section post list async thunk
export const fetchSuppliersAsync = createAsyncThunk(
  "posts/fetchSuppliers",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);

export const fetchProductCategoriesAsync = createAsyncThunk(
  "posts/fetchcategories",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);

export const fetchsAsync = createAsyncThunk(
  "posts/fetchAdminOrders",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);

export const fetchProductListAsync = createAsyncThunk(
  "product/fetch",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);

export const fetchProductDetailFrontendAsync = createAsyncThunk(
  "product-detail-frontend/fetch",
  async (id) => {
    const response = await fetchProductDetailFrontend(id);
    return response.data.data;
  }
);
