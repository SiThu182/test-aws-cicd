import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchPromotionPlan, FetchTrialPlan } from "../api/Trial&Promotion";

export const fetchTrialPlanAsync = createAsyncThunk(
  "fetch/trial-plan",
  async (path) => {
    const response = await FetchTrialPlan(path);
    return response.data.data;
  }
);

// normal plan
export const fetchPromotionPlanAsync = createAsyncThunk(
  "fetch/promotion-plan",
  async (path) => {
    const response = await FetchPromotionPlan(path);
    return response.data.data;
  }
);
