import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPromotionPlanAsync,
  fetchTrialPlanAsync,
} from "../thunk/Trial&Promotion";

let initialState = {
  trialPlan: [],
  trialPlanStatus: "",
  trialPlanError: null,
  promotionPlan: [],
  promotionPlanStatus: "",
  promotionPlanError: null,
};
const TrialAndPromotionSlice = createSlice({
  name: "trialAndPromotionSlice",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchTrialPlanAsync.pending, (state) => {
      state.trialPlanStatus = "loading";
      state.trialPlanError = null;
    });
    builder.addCase(fetchTrialPlanAsync.fulfilled, (state, action) => {
      state.trialPlanStatus = "succeeded";
      state.trialPlan = action.payload;
      state.trialPlanError = null;
    });

    builder.addCase(fetchTrialPlanAsync.rejected, (state, action) => {
      state.trialPlanStatus = "failed";
      state.trialPlanError = action.error.message;
    });
    builder.addCase(fetchPromotionPlanAsync.pending, (state) => {
      state.promotionPlanStatus = "loading";
      state.promotionPlanError = null;
    });
    builder.addCase(fetchPromotionPlanAsync.fulfilled, (state, action) => {
      state.promotionPlanStatus = "succeeded";
      state.promotionPlan = action.payload;
      state.promotionPlanError = null;
    });

    builder.addCase(fetchPromotionPlanAsync.rejected, (state, action) => {
      state.promotionPlanStatus = "failed";
      state.promotionPlanError = action.error.message;
    });
  },
});

export default TrialAndPromotionSlice.reducer;
