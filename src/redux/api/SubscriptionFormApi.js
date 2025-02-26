import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
const backendAPI = process.env.REACT_APP_BACKEND_API;
export const SubscriptionPlan = createAsyncThunk(
  "subscription/plan",
  async ({ request, requestType }, { rejectWithValue }) => {
    const navigate = useNavigate();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (requestType === "add") {
        const { data } = await axios.post(
          `${backendURL}subscription-plan`,
          request,
          config
        );

        swal({
          title: "Success",
          text: data.message,
          icon: "success",
          button: "OK!",
          timer: 2000,
        });

        navigate(-1);

        return data;
      } else {
        const { data } = await axios.put(
          `${backendURL}subscription-plan`,
          request,
          config
        );

        swal({
          title: "Success",
          text: data.message,
          icon: "success",
          button: "OK!",
          timer: 2000,
        });

        navigate(-1);

        return data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

