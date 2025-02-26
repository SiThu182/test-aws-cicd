import {
  Button,
  CircularProgress,
  FormHelperText,
  // FormHelperText,
  FormLabel,
  MenuItem,
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

function EmailTemplateForm(props) {
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

  const backendURL = `${process.env.REACT_APP_BACKEND_ADMIN}email-template`;

  const [fileUrlHeader, setFileUrlHeader] = useState();
  const [fileUrlFooter, setFileUrlFooter] = useState();

  const [videoUrl, setVideoUrl] = useState();
  //for edit smt count for each 4sections
  // const [defaultSmtCount, setDefaultSmtCount] = useState();

  const fileHeader = watch("fileUploadHeader");
  const fileFooter = watch("fileUploadFooter");

  const addVideo = watch("addVideo");
  const radioValue = watch("myRadio");

  const video = watch("video");

  const quillRef = useRef();

  useEffect(() => {
    if (props.edit === "edit") {
      setFileUrlHeader(
        `${process.env.REACT_APP_BACKEND_URL}storage/email_template/${props.editPost.img_header}`
      );
      setFileUrlFooter(
        `${process.env.REACT_APP_BACKEND_URL}storage/email_template/${props.editPost.img_footer}`
      );

      // if (props.editPost.video_type === 1) {
      //   setVideoUrl(
      //     `${process.env.REACT_APP_BACKEND_URL}storage/blog/${props.editPost.video}`
      //   );
      //   setValue("addVideo", "1");
      //   setValue("myRadio", "1");
      // } else if (props.editPost.video_type === 2) {
      //   setVideoUrl(props.editPost.youtube_url);
      //   setValue("addVideo", "1");
      //   setValue("myRadio", "2");
      // } else {
      //   setValue("addVideo", "2");
      // }

      let delta = JSON.parse(props.editPost.body_text);
      let editor = quillRef.current.getEditor();
      editor.setContents(delta?.ops);
    }
  }, [props, setValue]);

  useEffect(() => {
    if (fileHeader !== undefined && fileHeader !== "") {
      setFileUrlHeader("");
      setFileUrlHeader(URL.createObjectURL(fileHeader));
    }
    if (fileFooter !== undefined && fileFooter !== "") {
      setFileUrlFooter("");
      setFileUrlFooter(URL.createObjectURL(fileFooter));
    }
  }, [fileHeader, fileFooter]);

  // useEffect(() => {
  //   if (video !== undefined && video !== "" && video !== null) {
  //     setVideoUrl("");
  //     setVideoUrl(URL.createObjectURL(video));
  //   }
  // }, [video]);

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
      formData.append("name", data.name);
      if (props.edit === "edit" && data.fileUploadHeader === undefined) {
        formData.append("img_header", fileUrlHeader);
      } else {
        formData.append("img_header", data.fileUploadHeader);
      }

      if (props.edit === "edit" && data.fileUploadFooter === undefined) {
        formData.append("img_footer", fileUrlFooter);
      } else {
        formData.append("img_footer", data.fileUploadFooter);
      }

      formData.append("body_text", JSON.stringify(editText.getContents()));
      formData.append("subject", data.subject);
      formData.append(
        "template_type",
        props.shopEmailTemplate ? 3 : data.template_type
      );

      // if (addVideo === "1") {
      //   formData.append("video_type", data.myRadio);
      //   if (radioValue === "1") {
      //     props.edit === "edit" && data.video === undefined
      //       ? formData.append("video", props.editPost.video)
      //       : formData.append("video", data.video);
      //   } else {
      //     props.edit === "edit" && data.mediaLink === undefined
      //       ? formData.append("youtube_url", props.editPost.youtube_url)
      //       : formData.append("youtube_url", data.mediaLink);
      //   }
      // }

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
                label={<Typography variant="h6">Name</Typography>}
                InputProps={{
                  sx: {
                    ...FormStyle.inputStyle,
                  },
                }}
                helperText={errors?.name?.message}
              />
            )}
          />
        </Box>
        {/* subject */}
        <Box sx={{ my: 2 }}>
          <Controller
            name="subject"
            control={control}
            defaultValue={props.edit === "edit" ? props.editPost.subject : ""} //insert props.title
            rules={{
              required: {
                value: true,
                message: "*Subject is required",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="subject"
                type="text"
                fullWidth
                error={!!errors.subject}
                label={<Typography variant="h6">Subject</Typography>}
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
        {/* Image Header */}
        <Box sx={{ my: 3 }}>
          <FormLabel sx={{ mr: 2 }}>Upload Header Image</FormLabel>
          <Controller
            name="fileUploadHeader"
            control={control}
            rules={{
              required: {
                value: props.edit === "edit" ? false : true,
                message: "*Required file",
              },
            }}
            render={({ field: { onChange } }) => (
              <label htmlFor="file-photo-header">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="file-photo-header"
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
          {errors.fileUploadHeader && (
            <Typography variant="p" color="red" textAlign={"left"}>
              <small>{errors.fileUploadHeader.message}</small>
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
          {fileUrlHeader !== undefined && (
            <img
              src={fileUrlHeader}
              style={{ width: "100%" }}
              alt="UploadHeaderImg"
            />
          )}
        </Box>
        {/* Image Footer */}

        <Box sx={{ my: 3 }}>
          <FormLabel sx={{ mr: 2 }}>Upload Footer Image</FormLabel>
          <Controller
            name="fileUploadFooter"
            control={control}
            rules={{
              required: {
                value: props.edit === "edit" ? false : true,
                message: "*Required file",
              },
            }}
            render={({ field: { onChange } }) => (
              <label htmlFor="file-photo-footer">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="file-photo-footer"
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
          {errors.fileUploadFooter && (
            <Typography variant="p" color="red" textAlign={"left"}>
              <small>{errors.fileUploadFooter.message}</small>
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: "30%",
            borderRadius: "1rem",
            p: 1,
            backgroundColor: "white",
            mb: 2,
          }}
        >
          {fileUrlFooter !== undefined && (
            <img
              src={fileUrlFooter}
              style={{ width: "100%" }}
              alt="UploadFooterImg"
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
        {!props.shopEmailTemplate && (
          <Box sx={{ my: 2 }}>
            <Controller
              name="template_type"
              control={control}
              defaultValue={
                props.edit === "edit" ? props.editPost.template_type : ""
              }
              rules={{
                required: {
                  value: true,
                  message: "*Template Type is required",
                },
              }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  id="template_type"
                  select
                  variant="outlined"
                  error={!!errors.template_type}
                  label={<Typography variant="h6">Template Type </Typography>}
                  InputProps={{
                    sx: {
                      ...FormStyle.inputStyle,
                    },
                  }}
                  fullWidth
                  helperText={errors?.template_type?.message}
                >
                  <MenuItem value={1}>Simple</MenuItem>
                  <MenuItem value={2}>Information</MenuItem>
                </TextField>
              )}
            />
          </Box>
        )}

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

export default EmailTemplateForm;
