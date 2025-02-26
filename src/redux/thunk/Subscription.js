import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  FetchPlanTypesFrontend,
  FetchShowFrontendCount,
  FetchSubscriptionPlan,
  FetchSubscriptionPlanFrontend,
  FetchSubscriptionPlanRegisterDetail,
  FetchSubscriptionPlanRegisterList,
  FetchSubscriptionType,
  FetchTotalAmountRegistration,
  FetchTrainingPlanFrontend,
  SubscriptionPlanRegisterFrontend,
} from "../api/SubscriptionApi";

export const fetchSubscriptionTypeAsync = createAsyncThunk(
  "subscription/fetchType",
  async (path) => {
    const response = await FetchSubscriptionType(path);
    return response.data.data;
  }
);

// normal plan
export const fetchSubscriptionPlanAsync = createAsyncThunk(
  "subscription/fetchsubscriptionplan",
  async (path) => {
    const response = await FetchSubscriptionPlan(path);
    return response.data.data;
  }
);
//training plan
export const fetchTrainingPlanAsync = createAsyncThunk(
  "subscription/fetchtrainingplan",
  async (path) => {
    const response = await FetchSubscriptionPlan(path);
    return response.data.data;
  }
);

//front end plan and shop
export const fetchSubscriptionPlanFrontendAsync = createAsyncThunk(
  "subscription/fetchsubscriptionplanfrontend",
  async () => {
    const response = await FetchSubscriptionPlanFrontend("subscription-plan");
    return response.data.data;
  }
);
export const fetchIndividualTrainingPlanFrontendAsync = createAsyncThunk(
  "subscription/fetchindividualtraininglanfrontend",
  async () => {
    const response = await FetchTrainingPlanFrontend(2);
    return response.data.data;
  }
);
export const fetchGroupTrainingPlanFrontendAsync = createAsyncThunk(
  "subscription/fetchgrouptrainingplanfrontend",
  async () => {
    const response = await FetchTrainingPlanFrontend(1);
    return response.data.data;
  }
);
//not use start
//frontend practice
export const fetchPracticePlanFrontendAsync = createAsyncThunk(
  "subscription/fetchpraticeplanfrontend",
  async () => {
    const response = await FetchPlanTypesFrontend(
      "subscription-plan-by-plantype",
      { plan_type: "1" }
    );
    return response.data.data;
  }
);
//frontend mt
export const fetchMockTestPlanFrontendAsync = createAsyncThunk(
  "subscription/fetchmocktestplanfrontend",
  async () => {
    const response = await FetchPlanTypesFrontend(
      "subscription-plan-by-plantype",
      { plan_type: "2" }
    );
    return response.data.data;
  }
);
//frontend sectional
export const fetchSectionalMockTestPlanFrontendAsync = createAsyncThunk(
  "subscription/fetchsectionalmocktestplanfrontend",
  async () => {
    const response = await FetchPlanTypesFrontend(
      "subscription-plan-by-plantype",
      { plan_type: "4" }
    );
    return response.data.data;
  }
);
//frontendpractice mt
export const fetchPracticeMockTestPlanFrontendAsync = createAsyncThunk(
  "subscription/fetchpracticemocktestplanfrontend",
  async () => {
    const response = await FetchPlanTypesFrontend(
      "subscription-plan-by-plantype",
      { plan_type: "5" }
    );
    return response.data.data;
  }
);
//frontend practice mt sectional
export const fetchPracticeMockTestSectionalMockTestPlanFrontendAsync =
  createAsyncThunk(
    "subscription/fetchpracticemocktestsectionalmocktestplanfrontend",
    async () => {
      const response = await FetchPlanTypesFrontend(
        "subscription-plan-by-plantype",
        { plan_type: "8" }
      );
      return response.data.data;
    }
  );
//not use end

//register plan
export const SubscriptionPlanListAsync = createAsyncThunk(
  "subscription/fetchsubscriptionplanlist",
  async (path) => {
    const response = await FetchSubscriptionPlanRegisterList(path);
    return response.data;
  }
);
//total amount or registration
export const registrationTotalAmountAsync = createAsyncThunk(
  "registration/total-amount",
  async (path) => {
    const response = await FetchTotalAmountRegistration(path);
    return response.data.data;
  }
);

export const SubscriptionPlanRegisterAsync = createAsyncThunk(
  "subscription/register",
  async ({ path, postData }, { rejectWithValue }) => {
    try {
      const response = await SubscriptionPlanRegisterFrontend(path, postData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchSubscriptionRegisterDetailAsync = createAsyncThunk(
  "course/fetchsubscriptiondetail",
  async (routeData) => {
    const { path, id } = routeData;

    const response = await FetchSubscriptionPlanRegisterDetail(path, id);
    return response.data;
  }
);

export const fetchShowFrontendCountAsync = createAsyncThunk(
  "subscription-showFrontend-count",
  async (path, { rejectWithValue }) => {
    try {
      const response = await FetchShowFrontendCount(
        "subscription-plan-frontend-count"
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
