import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchAllAnswers } from "../api/AnswerAndDiscussionApi";

export const fetchAllAnswersAsync = createAsyncThunk(
  "/fectchtotalCount",
  async ({ postId, page }) => {
    const response = await fetchAllAnswers(postId, page);
    return response.data;
  }
);
