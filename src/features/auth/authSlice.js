import { createSlice } from "@reduxjs/toolkit";

import {
  emailVerify,
  registerUser,
  resetPassword,
  socialLogin,
  userLogin,
} from "./authActions";
import { getCookie } from "../../Utils/GetCookies";
import { deleteCookie } from "../../Utils/DeleteCookies";
import { Crisp } from "crisp-sdk-web";

// initialize userToken from local storage
const userToken = getCookie("userToken") ? getCookie("userToken") : null;

// let isAuthenticated = userToken !== null ? true : false;
const initialState = {
  loading: false,
  fpLoading: false,
  rpLoading: false,
  userInfo: null,
  userToken,
  error: null,
  fpError: null,
  rpError: null,
  success: false,
  users: [],
  posts: [],
  status: "",
  id: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      deleteCookie("userToken"); // delete token  from cookies
      localStorage.removeItem("userId"); // delete userId from storage
      // localStorage.removeItem("country"); //delete userCountry from storage
      console.log("remove userid ");

      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      Crisp.setTokenId(); // 1. Clear the token value
      Crisp.session.reset(); // 2. Unbind the current session
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      if (payload.status === 1) {
        state.loading = false;
        state.userInfo = payload;

        state.userToken = payload.token;
        state.status = "login";
        state.id = payload.id;
      }
      if (payload.status === 0) {
        state.loading = false;
        state.userInfo = null;
        state.userToken = null;
        state.error = payload.message;
      }
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // register user
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful

      state.userInfo = payload;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // reset Password
    builder.addCase(resetPassword.pending, (state) => {
      state.rpLoading = true;
      state.rpError = null;
    });
    builder.addCase(resetPassword.fulfilled, (state, { payload }) => {
      state.rpLoading = false;
      state.success = true; // registration successful

      state.userInfo = payload;
    });
    builder.addCase(resetPassword.rejected, (state, { payload }) => {
      state.rpLoading = false;
      state.rpError = payload;
    });

    //social login
    builder.addCase(socialLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(socialLogin.fulfilled, (state, { payload }) => {
      if (payload.status === 1) {
        state.loading = false;
        state.userInfo = payload;

        state.userToken = payload.token;
        state.status = "login";
        state.id = payload.id;
      }
      if (payload.status === 0) {
        state.loading = false;
        state.userInfo = null;
        state.userToken = null;
        state.error = payload.message;
      }
    });
    builder.addCase(socialLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //email verify
    builder.addCase(emailVerify.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(emailVerify.fulfilled, (state, { payload }) => {
      if (payload.status === 1) {
        state.loading = false;
        state.userInfo = payload;

        state.userToken = payload.token;
        state.status = "login";
        state.id = payload.id;
      }
      if (payload.status === 0) {
        state.loading = false;
        state.userInfo = null;
        state.userToken = null;
        state.error = payload.message;
      }
    });
    builder.addCase(emailVerify.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
