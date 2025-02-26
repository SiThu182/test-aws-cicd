import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  FetchUserAddresses,
  FetchUserPlanDetailFromAdminSide,
  fetchAllCountry,
  fetchAllUser,
  fetchUser,
  fetchUserDetails,
} from "../api/UserApi";

export const fetchUserAsync = createAsyncThunk(
  "users/fetchUser",
  async (userId) => {
    const response = await fetchUser(userId);
    return response.data;
  }
);

export const fetchUserDetailsAsync = createAsyncThunk(
  "users/fetchUserDetails",
  async (userId) => {
    const response = await fetchUserDetails(userId);
    return response.data;
  }
);

export const fetchAllUserAsync = createAsyncThunk("users", async (path) => {
  const response = await fetchAllUser(path);
  return response.data;
});

export const fetchAllCountryAsync = createAsyncThunk("country", async () => {
  const response = await fetchAllCountry();
  return response.data;
});

export const fetchUserPlanDetailFromAdminPanelAsync = createAsyncThunk(
  "posts/fetchUserPlanDetailFromAdminPanel",
  async (id) => {
    const response = await FetchUserPlanDetailFromAdminSide(id);
    return response.data;
  }
);

export const fetchUserAddressesAsync = createAsyncThunk(
  "posts/fetchUserAddressesAsync",
  async (id) => {
    const response = await FetchUserAddresses(id);
    return response.data;
  }
);

