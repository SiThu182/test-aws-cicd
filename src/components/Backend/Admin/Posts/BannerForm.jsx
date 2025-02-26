  import {
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { FormStyle } from "./FormStyle";
// import { useEffect } from "react";
// import FileInput from "./Form/FileInput";

import { getCookie } from "../../../../Utils/GetCookies";
import FileInput from "./Form/FileInput";
import FormLabel from "@mui/material/FormLabel";

function BannerForm(props) {
  const path = props.addPath;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  console.log(props.editPost, "Edit post data");
  // const languageTypeId = watch("languageType");
  const mediaFile = watch("mediaFile");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  // const [fileUrl, setFileUrl] = useState();
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  // const file = watch("fileUpload");

  //use effect for thumbnail
  // useEffect(() => {
  //   if (props.edit === "edit") {
  //     setFileUrl(
  //       `${process.env.REACT_APP_BACKEND_URL}storage/thumbnail/${props.editPost.thumbnail}`
  //     );
  //   }
  //   if (file !== undefined && file !== "") {
  //     setFileUrl("");
  //     setFileUrl(URL.createObjectURL(file));
  //   }
  // }, [props, file]);
  const addPost = async (data) => {
    setLoading(true);
    let token = getCookie("userToken");
    let config = { headers: { Authorization: "Bearer " + token } };
    try {
      const res = await axios.post(`${backendURL}${path}`, data, config);

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

  //edit post for update
  const editPost = async (data) => {
    setLoading(true);

    let token = getCookie("userToken");

    data.append("_method", "PUT");
    let config = { headers: { Authorization: "Bearer " + token } };
    const res = await axios.post(
      `${backendURL}${path}/${props.id}`,
      data,
      config
    );

    if (res.status === 200) {
      swal({
        title: "Success",
        text: res.data.message,
        icon: "success",
        button: "OK!",
        timer: 1500,
      });
      navigate(-1);
    } else {
      swal({
        title: "Warning",
        text: res.data.message,
        icon: "warning",
        button: "OK!",
        timer: 1500,
      });
      reset();
      setLoading(false);
    }
  };

  const saveType = (data) => {
    const formData = new FormData();
    formData.append("platform", data.platform);
    formData.append("image", data.mediaFile);

    // formData.append("thumbnail", data.fileUpload);

    props.edit === "edit" ? editPost(formData) : addPost(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(saveType)}>
        {/* React hook form with material ui */}

        <>
          <Box sx={{ my: 2 }}>
            <FormLabel sx={{ mr: 2 }}>Image </FormLabel>
            <FileInput
              name="mediaFile"
              control={control}
              // rules={{
              //   required: {
              //     value:
              //       props.edit === "edit"
              //         ? false
              //         : true,
              //     message: "*File is required",
              //   },
              // }}
              acceptType={"image/*"}
              btnStyle={{ color: "white" }}
              error={errors.mediaFile}
              errorMessage={errors?.mediaFile?.message}
            />
            {/* <Controller
                        name="mediaLink"
                        control={control}
                        defaultValue={props.edit === "edit" ? props.editMedia : null}
                        render={({ field: { onChange } }) => (
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={(event) => onChange(event.target.files[0])}
                        />
                        )}
                    /> */}
          </Box>
          {mediaFile !== undefined && mediaFile !== null && (
            <Box
              sx={{
                my: 2,
                backgroundColor: "white",
                width: "50%",
                borderRadius: "1rem",
                padding: 2,
              }}
            >
              <img
                src={
                  mediaFile !== null &&
                  mediaFile !== undefined &&
                  mediaFile !== ""
                    ? URL.createObjectURL(mediaFile)
                    : ""
                }
                style={{ width: "30%", height: "30%" }}
                alt="banner_image"
              />
            </Box>
          )}

          {props.edit === "edit" && (
            <Box
              sx={{
                my: 2,
                padding: 2,
                backgroundColor: "white",
                width: "50%",
                borderRadius: "1rem",
              }}
            >
              <Typography>Old Image {props.editPost.image}</Typography>
              <img
                src={
                  props.edit === "edit"
                    ? `${process.env.REACT_APP_BACKEND_URL}storage/${props.editPost?.image_url}`
                    : ""
                }
                style={{ width: "100%", height: "100%" }}
                alt="banner"
              />
            </Box>
          )}
        </>
        <Box sx={{ my: 2 }}>
          <Controller
            name="platform"
            control={control}
            defaultValue={props.edit === "edit" ? props.editPost.platform : ""}
            rules={{
              required: {
                value: true,
                message: "*Course Type is required",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="platform"
                select
                variant="outlined"
                error={!!errors.platform}
                label={<Typography variant="h6">Platform Type </Typography>}
                InputProps={{
                  sx: {
                    ...FormStyle.inputStyle,
                  },
                }}
                fullWidth
                helperText={errors?.platform?.message}
              >
                {["web", "mobile"].map((c, index) => (
                  <MenuItem key={index} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>

        {/* Image */}
        {/* <Box sx={{ my: 2 }}>
          <FormLabel sx={{ mr: 2 }}>Upload Image(Optional)</FormLabel>
          <FileInput
            name="fileUpload"
            rules={{
              required: {
                value: fileUrl !== undefined ? false : true,
                message: "*Required",
              },
            }}
            control={control}
            acceptType={"image/*"}
            btnStyle={{ color: "white" }}
            error={errors.fileUpload}
            errorMessage={errors?.fileUpload?.message}
          />
        </Box> */}

        {/* <Box
          sx={{
            width: "100%",
            borderRadius: "1rem",
            p: 1,
            backgroundColor: "white",
          }}
        >
          {fileUrl !== undefined && (
            <img src={fileUrl} style={{ width: "100%" }} alt="UploadImg" />
          )}
        </Box> */}
        <Button
          id="btnSave"
          type="submit"
          variant="contained"
          disabled={loading ? true : false}
          sx={{
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
          ) : props.edit !== "" ? (
            "Update"
          ) : (
            "Confirm"
          )}
        </Button>
      </form>
    </>
  );
}

export default BannerForm;
