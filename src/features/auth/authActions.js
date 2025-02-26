import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import swal from "sweetalert";

const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
// const backendURL = 'http://127.0.0.1:5000'

// Function to set a cookie with an expiry date
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  const path = "Path=/"; // Use Path=/ for site-wide cookies
  document.cookie = name + "=" + value + "; " + expires + "; " + path;
}

// Usage: Set a cookie with the name "exampleCookie" and value "exampleValue" that expires in 10 days

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password, remember_me }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.get("https://ipapi.co/json/");

      const { data } = await axios.post(
        `${backendURL}login`,
        { email, password, remember_me, user_type: "desktop", ip: res.data.ip },
        config
      );

      if (data.status === 1) {
        swal({
          title: "Success",
          text: data.message,
          icon: "success",
          button: "OK!",
          timer: 2000,
        });
        // store user's token in local storage
        sessionStorage.setItem("userToken", data.token);
        localStorage.setItem("userId", data.id);
      } else {
        swal({
          title: "Warning",
          text: data.message,
          icon: "warning",
          button: "OK!",
          timer: 2000,
        });
        return rejectWithValue(data.message);
      }
      console.log(data, "data token");
      // store user's token in local storage
      // sessionStorage.setItem("userToken", data.token);
      setCookie("userToken", data.token, 10);
      localStorage.setItem("userId", data.id);

      return data;
    } catch (error) {
      // return custom error message from API if any
      swal({
        title: "Warning",
        text: error.message,
        icon: "warning",
        button: "OK!",
      });
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    { name, email, password, phone, confirm_password, country },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };


      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}register`,
        { name, email, phone, password, confirm_password, country },
        config
      );

      if (data.status === 1) {
        swal({
          title: "Success",
          text: data.message,
          icon: "success",
          button: "OK!",
          timer: 2000,
        });
      } else {
        swal({
          title: "Warning",
          text: data.message,
          icon: "warning",
          button: "OK!",
          timer: 2000,
        });
      }

      // sessionStorage.setItem("userToken", data.token);
      setCookie("userToken", data.token, 10);
      localStorage.setItem("userId", data.id);

      return data;
    } catch (error) {
      if (error) {
        rejectWithValue(error.message);
        return swal({
          title: "Error",
          text:
            error?.response?.data !== null &&
            error?.response?.data !== undefined
              ? error?.response?.data?.developer_message.includes(
                  "Duplicate entry"
                )
                ? "Email Taken"
                : error?.response?.data?.developer_message
              : error.message,
          icon: "error",
          button: "OK!",
        });
        // return rejectWithValue(error.response.data.developer_message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (
    { security_code, email, password, confirmPassword },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}reset-password`,
        { security_code, email, password, confirmPassword },
        config
      );

      swal({
        title: "Success",
        text: data.message,
        icon: "success",
        button: "OK!",
        timer: 2000,
      });

      // sessionStorage.setItem("userToken", data.token);
      setCookie("userToken", data.token, 10);
      localStorage.setItem("userId", data.id);

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const socialLogin = createAsyncThunk(
  "user/social-login",
  async ({ fb_token, social_id, email, type, name }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      // let type = "facebook";

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}social-login`,
        { fb_token, social_id, type, email, name },
        config
      );

      // store user's token in local storage
      // sessionStorage.setItem("userToken", data.token);
      setCookie("userToken", data.token, 10);
      localStorage.setItem("userId", data.id);

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const emailVerify = createAsyncThunk(
  "user/email",
  async ({ security_code, email, password, reset }, { rejectWithValue }) => {
    console.log(reset, "reset");
    console.log(password, "pw");

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}email-verify`,
        { security_code, email, reset_password: reset, password: password },
        config
      );

      if (data.status === 1) {
        swal({
          title: "Success",
          text: data.message,
          icon: "success",
          button: "OK!",
          timer: 2000,
        });

        // sessionStorage.setItem("userToken", data.token);
        setCookie("userToken", data.token, 10);
        console.log("setting cookies");

        localStorage.setItem("userId", data.id);
        console.log("userId setting");
      } else {
        swal({
          title: "Error",
          text: data.message,
          icon: "error",
          button: "OK!",
          timer: 2000,
        });
      }

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
