import { createAsyncThunk } from "@reduxjs/toolkit";

import { FetchPosts } from "../api/PostApi";
import { FetchRelatedProductApi, FetchShopApi } from "../api/ShopApi";

//speaking section post list async thunk
export const fetchProductListAsync = createAsyncThunk(
  "posts/fetchproductlist-frontend",
  async (path) => {
    const response = await FetchShopApi(path);
    return response.data.data;
  }
);

export const fetchRelatedProductListAsync = createAsyncThunk(
  "posts/fetchrelatedproductlist-frontend",
  async (path) => {
    const response = await FetchRelatedProductApi(path);
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
