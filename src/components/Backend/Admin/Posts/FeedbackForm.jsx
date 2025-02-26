import {
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
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
import useVideoRecordingTypes from "../../../../customHooks/VideoRecordingType/useVideoRecordingType";
import SelectInput from "../../../Formcomponents/SelectInput";
import { getCookie } from "../../../../Utils/GetCookies";
import FileInput from "./Form/FileInput";
import FormLabel from "@mui/material/FormLabel";
import TextAreaInput from "../../../Formcomponents/TextAreaInput";

function FeedbackFormComponent(props) {
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
  const mediaFile = watch("mediaFile");
  const thumbnail = watch("thumbnail");

  const type = watch("type");
  const chooseVideoType = watch("videoType");
  const videoFile = watch("videoUpload");
  const videoUrl = watch("url");
  console.log(videoFile);
  console.log("video file");
  const [feedback, setFeedback] = useState([]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  // const [fileUrl, setFileUrl] = useState();
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  const feedbackType = [
    { id: "Feedback", name: "Feedback" },
    { id: "Score Card", name: "Score Card" },
    { id: "Stories", name: "Stories" },
  ];

  const videoType = [
    { id: "1", name: "Video Upload" },
    { id: "2", name: "Url" },
  ];

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
    formData.append("name", data.name);

    if (data.description !== undefined) {
      formData.append("description", data.description);
    }
    if (data.url !== undefined) {
      formData.append("url", data.url);
    }
    formData.append("type", data.type);
    formData.append("is_active", data.statusValue);
    formData.append("media", data.mediaFile);
    if (
      props.edit === "edit" &&
      (data.thumbnail === undefined || data.thumbnail === null)
    ) {
    } else {
      formData.append("thumbnail", data.thumbnail);
    }

    if (data.videoUpload != undefined) {
      formData.append("vd_file", data.videoUpload);
    }

    console.log(data.videoUpload);

    // formData.append("thumbnail", data.fileUpload);

    props.edit === "edit" ? editPost(formData) : addPost(formData);
  };

  console.log(type, chooseVideoType, "type & choose video type");

  useEffect(() => {
    if (props.edit == "edit") {
      setFeedback(props.editPost);
    }
  }, [props.editPost, props, feedback]);

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
        {(props.detailView || type === "Feedback") && (
          <Box sx={{ my: 2 }}>
            <TextAreaInput
              control={control}
              errors={errors}
              name={"description"}
              defaultValue={
                props.edit === "edit" ? props.editPost?.description : ""
              }
              label={"Description"}
              textInputStyle={FormStyle.inputStyle}
            />
          </Box>
        )}
        {!props.detailView && (
          <Box sx={{ my: 2 }}>
            <SelectInput
              name={"type"}
              label={"Select One"}
              control={control}
              defaultValue={props.edit === "edit" ? props.editPost?.type : ""}
              errors={errors}
              selectArray={feedbackType.length > 0 ? feedbackType : ""}
            />
          </Box>
        )}

        {type == "Stories" ? (
          <>
            <Box sx={{ my: 2 }}>
              <SelectInput
                name={"videoType"}
                label={"Select One"}
                control={control}
                defaultValue={
                  props.edit === "edit"
                    ? props.editPost?.url != "undefined" &&
                      props.editPost?.url !== null
                      ? "2"
                      : "1"
                    : ""
                }
                errors={errors}
                selectArray={videoType}
              />
            </Box>

            {chooseVideoType === "1" && (
              <Box sx={{ my: 2 }}>
                <FormLabel sx={{ mr: 2 }}>Video Upload </FormLabel>
                <FileInput
                  name="videoUpload"
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
                  acceptType={"video/*"}
                  btnStyle={{ color: "white" }}
                  error={errors.videoUpload}
                  errorMessage={errors?.videoUpload?.message}
                />
              </Box>
            )}
            {chooseVideoType === "2" && (
              <Box sx={{ my: 2 }}>
                <Controller
                  name="url"
                  control={control}
                  defaultValue={
                    props.edit === "edit" ? props.editPost.video_link : ""
                  } //insert props.title
                  // rules={{
                  // required: {
                  //     value: true,
                  //     message: "*Video Link is required",
                  // },
                  // }}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      id="url"
                      type="text"
                      fullWidth
                      error={!!errors.url}
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
            )}
            {type == "Stories" &&
              chooseVideoType !== "" &&
              (videoFile != undefined || videoUrl != undefined) && (
                <Box
                  sx={{
                    my: 2,
                    padding: 2,
                    backgroundColor: "white",
                    width: "50%",
                    borderRadius: "1rem",
                  }}
                >
                  <Typography>Video </Typography>
                  <video
                    src={
                      videoFile != undefined &&
                      props.editPost?.vd_file !== null &&
                      chooseVideoType == 1
                        ? URL.createObjectURL(videoFile)
                        : videoUrl
                    }
                    style={{ width: "100%", height: "100%" }}
                    alt="thumbnail"
                    controls
                  />
                </Box>
              )}

            <Box sx={{ my: 2 }}>
              <FormLabel sx={{ mr: 2 }}>Thumbnail </FormLabel>
              <FileInput
                name="thumbnail"
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
                error={errors.thumbnail}
                errorMessage={errors?.thumbnail?.message}
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
            {thumbnail !== null &&
              thumbnail !== undefined &&
              thumbnail !== "" && (
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
                      thumbnail !== null &&
                      thumbnail !== undefined &&
                      thumbnail !== ""
                        ? URL.createObjectURL(thumbnail)
                        : ""
                    }
                    style={{ width: "30%", height: "30%" }}
                    alt="Thumbnail"
                  />
                </Box>
              )}

            {props.edit === "edit" && props.editPost?.thumbnail && (
              <Box
                sx={{
                  my: 2,
                  padding: 2,
                  backgroundColor: "white",
                  width: "50%",
                  borderRadius: "1rem",
                }}
              >
                <Typography>
                  Old Thumbnail {props.editPost.thumbnail}
                </Typography>
                <img
                  src={
                    props.edit === "edit"
                      ? `${process.env.REACT_APP_BACKEND_URL}storage/${props.editPost?.thumbnail}`
                      : ""
                  }
                  style={{ width: "100%", height: "100%" }}
                  alt="thumbnail"
                />
              </Box>
            )}
            {props.editPost?.type == "Stories" &&
              ((props.editPost?.vd_file != undefined &&
                props.editPost?.vd_file !== null) ||
                (props.editPost?.url != undefined &&
                  props.editPost?.url !== null)) && (
                <Box
                  sx={{
                    my: 2,
                    padding: 2,
                    backgroundColor: "white",
                    width: "50%",
                    borderRadius: "1rem",
                  }}
                >
                  <Typography>Old Video </Typography>
                  <video
                    src={
                      props.editPost?.vd_file != undefined &&
                      props.editPost?.vd_file !== null
                        ? `${process.env.REACT_APP_BACKEND_URL}storage/${props.editPost?.vd_file}`
                        : props.editPost?.url
                    }
                    style={{ width: "100%", height: "100%" }}
                    alt="thumbnail"
                    controls
                  />
                </Box>
              )}
          </>
        ) : (
          !props.detailView && (
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
              {mediaFile !== null &&
                mediaFile !== undefined &&
                mediaFile !== "" && (
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
                      alt="feedback_image"
                    />
                  </Box>
                )}

              {props.edit === "edit" && props.editPost.image && (
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
                        ? `${process.env.REACT_APP_BACKEND_URL}storage/${props.editPost?.image}`
                        : ""
                    }
                    style={{ width: "100%", height: "100%" }}
                    alt="di"
                  />
                </Box>
              )}
            </>
          )
        )}

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
        {/* is active */}
        {!props.detailView && (
          <>
            <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
              <Typography variant="h6">Status</Typography>
              <Controller
                name="statusValue"
                control={control}
                defaultValue={
                  props.edit === "edit" ? props.editPost.isActive : ""
                } //insert props.description
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
          </>
        )}
      </form>
    </>
  );
}

export default FeedbackFormComponent;
