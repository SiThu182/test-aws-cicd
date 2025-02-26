import {
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  FormLabel,
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
import useVideoRecordingTypes from "../../../../customHooks/VideoRecordingType/useVideoRecordingType";
import SelectInput from "../../../Formcomponents/SelectInput";
import { getCookie } from "../../../../Utils/GetCookies";
import FileInput from "./Form/FileInput";

function VideoRecordingFormComponent(props) {
  const path = props.addPath;
  const videoRecordingTypes = useVideoRecordingTypes();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  // const languageTypeId = watch("languageType");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState();
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  const file = watch("fileUpload");

  // use effect for thumbnail
  useEffect(() => {
    if (props.edit === "edit") {
      setFileUrl(
        `${process.env.REACT_APP_BACKEND_URL}storage/${props.editPost.thumbnail}`
      );
    }
    if (file !== undefined && file !== "") {
      setFileUrl("");
      setFileUrl(URL.createObjectURL(file));
    }
  }, [props, file]);
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

    try {
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
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("video_link", data.videoLink);
    formData.append("video_recording_type_id", data.type);
    formData.append("isActive", data.statusValue);
    formData.append("thumbnail", data.fileUpload);

    props.edit === "edit" ? editPost(formData) : addPost(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(saveType)}>
        {/* React hook form with material ui */}
        {/* name */}
        <Box sx={{ my: 2 }}>
          <Controller
            name="name"
            control={control}
            defaultValue={props.edit === "edit" ? props.editPost.name : ""} //insert props.title
            rules={{
              required: {
                value: true,
                message: "*Name is required",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="name"
                type="text"
                fullWidth
                error={!!errors.name}
                label="Name"
                helperText={errors?.name?.message}
                InputProps={{
                  sx: {
                    ...FormStyle.inputStyle,
                  },
                }}
              />
            )}
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <SelectInput
            name={"type"}
            label={"Select One"}
            control={control}
            defaultValue={
              props.edit === "edit"
                ? props.editPost?.video_recording_type_id
                : ""
            }
            errors={errors}
            selectArray={
              videoRecordingTypes.types !== null
                ? videoRecordingTypes.types?.data
                : ""
            }
          />
        </Box>

        {/* video link */}
        <Box sx={{ my: 2 }}>
          <Controller
            name="videoLink"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost.video_link : ""
            } //insert props.title
            rules={{
              required: {
                value: true,
                message: "*Video Link is required",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="videoLink"
                type="text"
                fullWidth
                error={!!errors.videoLink}
                label="Video Link"
                helperText={errors?.vidoeLink?.message}
                InputProps={{
                  sx: {
                    ...FormStyle.inputStyle,
                  },
                }}
              />
            )}
          />
        </Box>
        {/* Image */}
        <Box sx={{ my: 2 }}>
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
        </Box>

        <Box
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
        </Box>
        {/* is active */}
        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Status</Typography>
          <Controller
            name="statusValue"
            control={control}
            defaultValue={props.edit === "edit" ? props.editPost.isActive : ""} //insert props.description
            rules={{
              required: {
                value: true,
                message: "*Choose one",
              },
            }}
            render={({ field: { value, onChange } }) => (
              <RadioGroup
                name="row-radio-buttons-group"
                value={value}
                onChange={onChange}
              >
                <FormControlLabel
                  control={<Radio value={1} />}
                  label="Active"
                />
                <FormControlLabel
                  control={<Radio value={2} />}
                  label="Inactive"
                />
                <Typography sx={{ fontSize: "1rem", color: "red" }}>
                  {errors?.statusValue?.message}
                </Typography>
              </RadioGroup>
            )}
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
            ) : props.edit !== "" ? (
              "Update"
            ) : (
              "Confirm"
            )}
          </Button>
        </Box>
      </form>
    </>
  );
}

export default VideoRecordingFormComponent;
