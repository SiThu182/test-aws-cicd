import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  // FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { FormStyle } from "./FormStyle";

import "./TextEditor.css";

import QuillEditor from "./QuillEditor";
import { getCookie } from "../../../../Utils/GetCookies";

function BlogForm(props) {
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      myRadio: props.edit === "edit" ? props.editPost.video_type : "",
    },
  });

  // const type = watch("subscriptionType");

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const backendURL = `${process.env.REACT_APP_BACKEND_ADMIN}blogs`;

  const [fileUrl, setFileUrl] = useState();
  const [videoUrl, setVideoUrl] = useState();
  //for edit smt count for each 4sections
  // const [defaultSmtCount, setDefaultSmtCount] = useState();

  const file = watch("fileUpload");
  const addVideo = watch("addVideo");
  const radioValue = watch("myRadio");

  const video = watch("video");

  const quillRef = useRef();

  useEffect(() => {
    if (props.edit === "edit") {
      setFileUrl(
        `${process.env.REACT_APP_BACKEND_URL}storage/blog/${props.editPost.image}`
      );

      if (props.editPost.video_type === 1) {
        setVideoUrl(
          `${process.env.REACT_APP_BACKEND_URL}storage/blog/${props.editPost.video}`
        );
        setValue("addVideo", "1");
        setValue("myRadio", "1");
      } else if (props.editPost.video_type === 2) {
        setVideoUrl(props.editPost.youtube_url);
        setValue("addVideo", "1");
        setValue("myRadio", "2");
      } else {
        setValue("addVideo", "2");
      }

      let delta = JSON.parse(props.editPost.content);
      let editor = quillRef.current.getEditor();
      editor.setContents(delta?.ops);
    }
  }, [props, setValue]);

  useEffect(() => {
    if (file !== undefined && file !== "") {
      setFileUrl("");
      setFileUrl(URL.createObjectURL(file));
    }
  }, [file]);

  useEffect(() => {
    if (video !== undefined && video !== "" && video !== null) {
      setVideoUrl("");
      setVideoUrl(URL.createObjectURL(video));
    }
  }, [video]);

  const addPost = async (request) => {
    setLoading(true);
    let token = await getCookie("userToken");

    let config = { headers: { Authorization: "Bearer " + token } };

    try {
      const res = await axios.post(`${backendURL}`, request, config);

      if (res.status === 200) {
        if (res.data.errors) {
          swal({
            title: "Warning",
            text: res.data.errors[0],
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
        }

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
  const editPost = async (request) => {
    setLoading(true);
    let token = getCookie("userToken");

    request.append("_method", "PUT");
    let config = { headers: { Authorization: "Bearer " + token } };
    try {
      const res = await axios.post(
        `${backendURL}/${props.id}`,
        request,
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
    const editText = quillRef.current.getEditor();
    const text = editText.getLength();
    if (text === 1) {
      return;
    } else {
      const formData = new FormData();
      formData.append("title", data.title);
      if (props.edit === "edit" && data.fileUpload === undefined) {
        formData.append("image", fileUrl);
      } else {
        formData.append("image", data.fileUpload);
      }

      formData.append("content", JSON.stringify(editText.getContents()));
      formData.append("category_id", 1);

      if (addVideo === "1") {
        formData.append("video_type", data.myRadio);
        if (radioValue === "1") {
          props.edit === "edit" && data.video === undefined
            ? formData.append("video", props.editPost.video)
            : formData.append("video", data.video);
        } else {
          props.edit === "edit" && data.mediaLink === undefined
            ? formData.append("youtube_url", props.editPost.youtube_url)
            : formData.append("youtube_url", data.mediaLink);
        }
      }

      props.edit === "edit" ? editPost(formData) : addPost(formData);
      // }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(saveType)}>
        {/* React hook form with material ui */}
        {/* name */}
        {/* <Box sx={{ my: 2 }}>
          <Controller
            name="name"
            control={control}
            defaultValue={props.edit === "edit" ? "" : ""} //insert props.title
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
        </Box> */}
        {/* title */}
        <Box sx={{ my: 2 }}>
          <Controller
            name="title"
            control={control}
            defaultValue={props.edit === "edit" ? props.editPost.title : ""} //insert props.title
            rules={{
              required: {
                value: true,
                message: "*Title is required",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="title"
                type="text"
                fullWidth
                error={!!errors.title}
                label={<Typography variant="h6">Title</Typography>}
                InputProps={{
                  sx: {
                    ...FormStyle.inputStyle,
                  },
                }}
                helperText={errors?.title?.message}
              />
            )}
          />
        </Box>
        {/* Image */}
        <Box sx={{ my: 3 }}>
          <FormLabel sx={{ mr: 2 }}>Upload Image</FormLabel>
          <Controller
            name="fileUpload"
            control={control}
            rules={{
              required: {
                value: props.edit === "edit" ? false : true,
                message: "*Required file",
              },
            }}
            render={({ field: { onChange } }) => (
              <label htmlFor="file-photo">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="file-photo"
                  onChange={(event) => onChange(event.target.files[0])}
                  type="file"
                />
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    color: "black",
                    // ...enrollStyle.inputStyle,
                  }}
                >
                  Upload Image
                </Button>
              </label>
            )}
          />
          {errors.fileUpload && (
            <Typography variant="p" color="red" textAlign={"left"}>
              <small>{errors.fileUpload.message}</small>
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: "30%",
            borderRadius: "1rem",
            p: 1,
            backgroundColor: "white",
          }}
        >
          {fileUrl !== undefined && (
            <img src={fileUrl} style={{ width: "100%" }} alt="UploadImg" />
          )}
        </Box>
        {/* Add Video */}
        <Box sx={{ my: 2 }}>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Add Video
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              control={
                <Radio
                  {...register("addVideo")}
                  value="1"
                  // checked = { props.editMediaType === "2"}
                  checked={addVideo === "1"}
                />
              }
              label="Yes"
            />
            <FormControlLabel
              control={
                <Radio
                  {...register("addVideo")}
                  value="2"
                  checked={addVideo === "2"}
                />
              }
              label="No"
            />
          </RadioGroup>
        </Box>
        {/* Video Type */}
        {addVideo === "1" && (
          <Box sx={{ my: 2 }}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Video Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                control={
                  <Radio
                    {...register("myRadio")}
                    value="1"
                    // checked = { props.editMediaType === "2"}
                    checked={radioValue === "1"}
                  />
                }
                label="File"
              />
              <FormControlLabel
                control={
                  <Radio
                    {...register("myRadio")}
                    value="2"
                    checked={radioValue === "2"}
                  />
                }
                label="Youtube Video Link"
              />
            </RadioGroup>
          </Box>
        )}
        {addVideo === "1" &&
          radioValue !== "" &&
          (radioValue === "2" ? (
            <Box sx={{ my: 2 }}>
              <Controller
                name="mediaLink"
                control={control}
                defaultValue={
                  props.edit === "edit" ? "" : "Enter youtube video link"
                } //insert props.content
                rules={{
                  required: {
                    value: props.edit === "edit" ? false : true,
                    message: "*Link is required",
                  },
                }}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    id="mediaLink"
                    type="text"
                    variant="outlined"
                    error={!!errors.mediaLink}
                    label={
                      <Typography variant="h5">Youtube Video Link</Typography>
                    }
                    sx={{ my: 1, bgcolor: "rgb(231 239 254)" }}
                    style={{ width: "100%" }}
                  />
                )}
              />
            </Box>
          ) : (
            <Box sx={{ my: 2 }}>
              <FormLabel sx={{ mr: 2 }}>Upload Video</FormLabel>
              <Controller
                name="video"
                control={control}
                rules={{
                  required: {
                    value: props.edit === "edit" ? false : true,
                    message: "*Required video file",
                  },
                }}
                render={({ field: { onChange } }) => (
                  <label htmlFor="video-file">
                    <input
                      accept="video/*"
                      style={{ display: "none" }}
                      id="video-file"
                      onChange={(event) => onChange(event.target.files[0])}
                      type="file"
                    />
                    <Button
                      variant="contained"
                      component="span"
                      sx={{
                        color: "black",
                        // ...enrollStyle.inputStyle,
                      }}
                    >
                      Upload Video
                    </Button>
                  </label>
                )}
              />
              {errors.video && (
                <Typography variant="p" color="red" textAlign={"left"}>
                  <small>{errors.video.message}</small>
                </Typography>
              )}
            </Box>
          ))}
        {errors.mediaLink && (
          <Typography variant="p" color="red" textAlign={"left"}>
            {errors.mediaLink.message}
          </Typography>
        )}
        <Box
          sx={{
            width: "100%",
            borderRadius: "1rem",
            p: 1,
            mb: 2,
            backgroundColor: "white",
          }}
        >
          {videoUrl !== undefined && (
            <video
              controls
              autoPlay={false}
              style={{ width: "100%" }}
              alt="UploadVideo"
              src={videoUrl}
            />
          )}
        </Box>
        {/* description */}

        <QuillEditor quillRef={quillRef} />

        {quillRef?.current?.getEditor()?.getLength() == 1 && (
          <FormHelperText sx={{ color: "red" }}>
            *Description Required
          </FormHelperText>
        )}

        {/* <Box>
          <FormHelperText sx={{ color: "red" }}>
            {text === "" || text === "<p><br></p>" ? "*Needs description" : ""}
          </FormHelperText>
        </Box> */}
        {/* category */}
        <Box sx={{ my: 2 }}>
          <Controller
            name="category"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost.category_id : ""
            }
            rules={{
              required: {
                value: true,
                message: "*Category Type is required",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="category"
                select
                variant="outlined"
                error={!!errors.category}
                label={<Typography variant="h6">Category Type </Typography>}
                InputProps={{
                  sx: {
                    ...FormStyle.inputStyle,
                  },
                }}
                fullWidth
                helperText={errors?.category?.message}
              >
                <MenuItem value={1}>CATEGORY</MenuItem>
                <MenuItem value={2}>CATEGORY</MenuItem>
              </TextField>
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

export default BlogForm;
