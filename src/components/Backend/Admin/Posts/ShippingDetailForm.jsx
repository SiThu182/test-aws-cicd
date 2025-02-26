import { Box, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { useNavigate, useParams } from "react-router-dom";
import { FormStyle } from "./FormStyle";
import TextInput from "./Form/TextInput";
import axios from "axios";
import { getCookie } from "../../../../Utils/GetCookies";
import swal from "sweetalert";
function ShippingDetailForm({ defaultValue = "", edit = "", editPost }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    // watch,
    formState: { errors },
  } = useForm();
  // let uploadFile = watch("uploadFile");
  // let select = watch("selectTypes");
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  const { id, editId } = useParams();
  const addPost = async (data) => {
    setLoading(true);
    let token = getCookie("userToken");
    let config = { headers: { Authorization: "Bearer " + token } };
    try {
      const res = await axios.post(
        `${backendURL}shipping-detail`,
        data,
        config
      );

      if (res.status === 200) {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          button: "OK!",
        });

        setLoading(false);
        navigate(-1);
      } else {
        swal({
          title: "Warning",
          text: res.data.message,
          icon: "warning",
          button: "OK!",
        });

        setLoading(false);
      }
    } catch (error) {
      swal({
        title: "Warning",
        text: error.message,
        icon: "warning",
        button: "OK!",
      });

      setLoading(false);
    }
  };
  const editPostAPI = async (request) => {
    setLoading(true);
    let token = getCookie("userToken");

    let config = { headers: { Authorization: "Bearer " + token } };
    try {
      const res = await axios.put(
        `${backendURL}shipping-detail/${editId}`,
        request,
        config
      );

      if (res.status === 200) {
        if (res.data.errors) {
          swal({
            title: "Warning",
            text: res.data.errors,
            icon: "warning",
            button: "OK!",
          });
        } else {
          swal({
            title: "Success",
            text: res.data.message,
            icon: "success",
            button: "OK!",
          });
          navigate(-1);
        }

        setLoading(false);
      } else {
        swal({
          title: "Warning",
          text: res.data.message,
          icon: "warning",
          button: "OK!",
        });

        setLoading(false);
      }
    } catch (error) {
      swal({
        title: "Warning",
        text: error.message,
        icon: "warning",
        button: "OK!",
      });
      setLoading(false);
    }
  };

  const saveType = (data) => {
    let request = {
      shipping_detail: data.shippingDetail,
      order_id: id,
      date: data.date,
    };
    edit === "edit" ? editPostAPI(request) : addPost(request);
  };

  // addPost(request, loading, setLoading, backendURL, navigate);
  return (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit(saveType)}>
        <Box sx={{ my: 1, width: "100%" }}>
          <TextInput
            name="shippingDetail"
            control={control}
            label="Shipping Detail"
            type="text"
            rules={{
              required: {
                value: true,
                message: "*Shipping Detail is required",
              },
            }}
            defaultValue={edit === "edit" ? editPost?.shipping_detail : ""}
            error={!!errors.shippingDetail}
            errorMessage={errors?.shippingDetail?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>
        <Box sx={{ my: 1, width: "100%" }}>
          <TextInput
            name="date"
            control={control}
            label="date"
            type="text"
            rules={{
              required: {
                value: true,
                message: "*date is required",
              },
            }}
            defaultValue={edit === "edit" ? editPost?.date : ""}
            error={!!errors.date}
            errorMessage={errors?.date?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>

        <Box display={"flex"} justifyContent="right">
          <Button
            id="btnSave"
            type="submit"
            variant="contained"
            disabled={loading ? true : false}
            sx={{
              color: "#000",
              bgcolor: "#2196f3",

              "&:hover": {
                bgcolor: "white",
              },
            }}
          >
            {loading ? (
              <CircularProgress
                sx={{ width: "50%", color: "white", m: "0 auto" }}
              ></CircularProgress>
            ) : edit !== "" ? (
              "Update"
            ) : (
              "Confirm"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ShippingDetailForm;
