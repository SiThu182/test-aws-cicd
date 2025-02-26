import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchProductDetailReview } from "../api/ProductReviewApi";

//speaking section post list async thunk
export const fetchReviewAsync = createAsyncThunk(
  "posts/fetch-product-review",
  async (path) => {
    const response = await fetchProductDetailReview(path);
    return response.data.data;
  }
);
