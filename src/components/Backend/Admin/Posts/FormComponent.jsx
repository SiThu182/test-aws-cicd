import {
  Button,
  CircularProgress,
  MenuItem,
  Typography,
  Collapse,
  IconButton,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";

import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import TextInput from "./Form/TextInput";
import { FormStyle } from "./FormStyle";
import SelectInput from "./Form/SelectInput";
import FileInput from "./Form/FileInput";
import FormRadioGroup from "./Form/FormRadioGroup";
import { getCookie } from "../../../../Utils/GetCookies";

function FormComponent(props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      myRadio: props.edit === "edit" ? props.editMediaType : "1",
    },
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  const path = props.addPath;

  const dataList = {
    category: "",
    title: "",
    content: "",
    media: "",
    media_type: "",
    select: "",
    keyword_length: "",
    audio_text: "",
    answer_template: "",
    isActive: 0,
    errors: [],
  };
  const [open, setOpen] = React.useState(true);

  const radioValue = watch("myRadio");
  const media = watch("mediaLink");
  const mediaFile = watch("mediaFile");

  const select = watch("select");
  // const [picture, setPicture] = useState(null);
  // const onChangePicture = (e) => {
  //   setPicture(URL.createObjectURL(e.target.files[0]));
  // };

  // add post function for create post
  const addPost = async () => {
    let btnSave = document.getElementById("btnSave");
    btnSave.disabled = true;
    setLoading(true);
    let token = await getCookie("userToken");

    const formData = new FormData();
    formData.append("content", dataList.content);
    if (
      props.category === "rl" ||
      props.category === "rts" ||
      props.category === "sst" ||
      select === "sst"
    ) {
      formData.append("audio_text", dataList.audio_text);
    }
    if (
      props.category === "rl" ||
      props.category === "rts" ||
      props.category === "sst" ||
      props.category === "di" ||
      select === "sst"
    ) {
      formData.append("answer_template", dataList.answer_template);
    }
    formData.append("category", dataList.category);
    formData.append("title", dataList.title);
    formData.append("isActive", dataList.isActive);
    formData.append("media", dataList.media);
    formData.append("media_type", dataList.media_type);
    formData.append("keyword_length", dataList.keyword_length);

    let config = { headers: { Authorization: "Bearer " + token } };
    const res = await axios.post(`${backendURL}${path}`, formData, config);

    if (res.status === 200) {
      swal({
        title: "Success",
        text: res.data.message,
        icon: "success",
        button: "OK!",
        timer: 1500,
      });
      navigate(-1);
      let title = document.querySelector("#title");
      let content = document.querySelector("#content");
      title.defaultValue = "";
      content.defaultValue = "";
    } else {
    }
    btnSave.innerText = "Add";
    btnSave.disabled = false;
  };

  //edit post for update
  const editPost = async () => {
    let btnSave = document.getElementById("btnSave");
    btnSave.disabled = true;
    setLoading(true);
    let token = await getCookie("userToken");
    const formData = new FormData();
    formData.append("content", dataList.content);
    formData.append("category", dataList.category);
    if (
      props.category === "rl" ||
      props.category === "rts" ||
      props.category === "sst" ||
      select === "sst"
    ) {
      formData.append("audio_text", dataList.audio_text);
    }
    if (
      props.category === "rl" ||
      props.category === "rts" ||
      props.category === "di" ||
      props.category === "sst" ||
      select === "sst"
    ) {
      formData.append("answer_template", dataList.answer_template);
    }
    formData.append("title", dataList.title);
    formData.append("media", dataList.media);
    formData.append("media_type", dataList.media_type);
    formData.append("keyword_length", dataList.keyword_length);
    formData.append("isActive", dataList.isActive);
    formData.append("_method", "PUT");

    let config = { headers: { Authorization: "Bearer " + token } };
    const res = await axios.post(
      `${backendURL}${path}/${props.id}`,
      formData,
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
      let title = document.querySelector("#title");
      let content = document.querySelector("#content");
      title.defaultValue = "";
      content.defaultValue = "";
    } else {
    }
    btnSave.innerText = "Update";
    btnSave.disabled = false;
  };

  const saveType = (data) => {
    dataList.title = data.title;
    dataList.content = data.content;
    dataList.keyword_length = data.keyword_length;

    dataList.media = data.media_type == "1" ? data.mediaLink : data.mediaFile;
    dataList.media_type = radioValue;
    dataList.isActive = data.isActive;
    if (data.select === undefined) {
      dataList.category = props.category;
    } else {
      dataList.category = data.select;
    }
    if (
      props.category === "rl" ||
      props.category === "rts" ||
      select === "sst" ||
      props.category === "sst"
    ) {
      dataList.audio_text = data.audioText;
    }

    if (
      props.category === "rl" ||
      props.category === "rts" ||
      props.category === "di" ||
      select === "sst"
    ) {
      dataList.answer_template = data.answerTemplate;
    }

    props.edit === "edit" ? editPost() : addPost();
  };

  return (
    <>
      <form onSubmit={handleSubmit(saveType)}>
        {/* React hook form with material ui */}
        {(props.category === "sst" ||
          props.category === "wfd" ||
          props.category === "") && (
          <Box sx={{ my: 2 }}>
            <SelectInput
              name="select"
              control={control}
              defaultValue={props.edit !== "" ? props.category : ""}
              rules={{
                required: {
                  value: true,
                  message: "Question Type required",
                },
              }}
              label="Question Type"
              inputStyle={FormStyle.inputStyle}
              error={!!errors.select}
              errorMessage={errors?.select?.message}
            >
              {[
                { value: "sst", name: "Summarized Spoken Text" },
                { value: "wfd", name: "Write From Dictation" },
              ].map((c, index) => (
                <MenuItem key={index} value={c.value}>
                  {c.name}
                </MenuItem>
              ))}
            </SelectInput>
          </Box>
        )}

        <Box sx={{ my: 1 }}>
          <TextInput
            name="title"
            control={control}
            label="Title"
            type="text"
            rules={{
              required: {
                value: true,
                message: "*Title is required",
              },
            }}
            defaultValue={props.edit === "edit" ? props.editTitle : ""}
            error={!!errors.title}
            errorMessage={errors?.title?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>

        <>
          <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Media Link Type
            </FormLabel>
            <FormRadioGroup
              name="myRadio"
              control={control}
              defaultValue={props.edit === "edit" ? props.editMediaType : ""}
              rules={{
                required: {
                  value: true,
                  message: "*Choose one",
                },
              }}
              errorMessage={errors?.user_type?.message}
            >
              {[
                { label: "Input", value: "1" },
                { label: "File", value: "2" },
              ].map((r, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Radio
                      value={r.value}
                      // checked={statusValue === "active"}
                    />
                  }
                  label={r.label}
                />
              ))}
            </FormRadioGroup>
          </Box>

          {radioValue === "1" ? (
            <Box sx={{ my: 2 }}>
              <TextInput
                name="mediaLink"
                control={control}
                label="Media Link"
                type="text"
                rules={{
                  required: {
                    value: true,
                    message: "*Link is required",
                  },
                }}
                defaultValue={
                  props.edit === "edit" && props.editMediaType == "1"
                    ? props.editMedia
                    : ""
                }
                error={!!errors.mediaLink}
                errorMessage={errors?.mediaLink?.message}
                inputStyle={FormStyle.inputStyle}
              />
            </Box>
          ) : (
            <Box sx={{ my: 2 }}>
              <FormLabel sx={{ mr: 2 }}>Upload Audio</FormLabel>
              <FileInput
                name="mediaFile"
                control={control}
                rules={{
                  required: {
                    value:
                      props.edit === "edit" && props.editMediaType == "2"
                        ? false
                        : true,
                    message: "*File is required",
                  },
                }}
                acceptType={props.category === "di" ? "image/*" : "audio/*"}
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
          )}
          {props.category !== "di" ? (
            <Box sx={{ my: 2 }}>
              {radioValue == "1" && <audio src={media} controls />}
              {radioValue == "2" && (
                <audio
                  src={
                    mediaFile !== null &&
                    mediaFile !== undefined &&
                    mediaFile !== ""
                      ? URL.createObjectURL(mediaFile)
                      : mediaFile
                  }
                  controls
                />
              )}
            </Box>
          ) : (
            <Box
              sx={{
                my: 2,
                backgroundColor: "white",
                width: "50%",
                borderRadius: "1rem",
                padding: 2,
              }}
            >
              {radioValue == "1" && (
                <img
                  src={media}
                  style={{ width: "100%", height: "100%" }}
                  alt="di"
                />
              )}
              {radioValue == "2" && (
                <img
                  src={
                    mediaFile !== null &&
                    mediaFile !== undefined &&
                    mediaFile !== "" &&
                    URL.createObjectURL(mediaFile)
                  }
                  style={{ width: "100%", height: "100%" }}
                  alt="di"
                />
              )}
            </Box>
          )}
          {props.edit === "edit" && props.category !== "di" && (
            <Box sx={{ my: 2 }}>
              <Typography>Old Audio</Typography>
              <audio
                src={
                  props.edit === "edit"
                    ? props.editMediaType === "1"
                      ? props.editMedia
                      : `${process.env.REACT_APP_BACKEND_URL}storage/${props.category}/${props.editMedia}`
                    : ""
                }
                controls
              />
            </Box>
          )}
          {props.edit === "edit" && props.category === "di" && (
            <Box
              sx={{
                my: 2,
                padding: 2,
                backgroundColor: "white",
                width: "50%",
                borderRadius: "1rem",
              }}
            >
              <Typography>Old Image</Typography>
              <img
                src={
                  props.edit === "edit"
                    ? props.editMediaType === "1"
                      ? props.editMedia
                      : `${process.env.REACT_APP_BACKEND_URL}storage/${props.category}/${props.editMedia}`
                    : ""
                }
                style={{ width: "100%", height: "100%" }}
                alt="di"
              />
            </Box>
          )}
        </>
        {(props.category === "rl" ||
          props.category === "rts" ||
          props.category === "di") && (
          <Box sx={{ width: "100%" }}>
            <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ color: "red", fontSize: "1rem", bgcolor: "#ffea00" }}
              >
                When filling content please make sure to add only keywords and
                main points that you want the test taker to say. Keyword length
                must be set around 60 or less than 60 if the content word count
                is less than that as maximum recognized word during 40 seconds
                is around that length. Please adjust keyword length and content
                word count as nearly as possible.
              </Alert>
            </Collapse>
            <Button
              disabled={open}
              variant="contained"
              onClick={() => {
                setOpen(true);
              }}
            >
              Re-open Alert Box
            </Button>
          </Box>
        )}
        <Box sx={{ my: 2 }}>
          <TextInput
            name="content"
            control={control}
            label="Content"
            type="text"
            rules={{
              required: {
                value: true,
                message: "*Content is required",
              },
            }}
            multiline={true}
            rows={6}
            defaultValue={props.edit === "edit" ? props.editContent : ""}
            error={!!errors.content}
            errorMessage={errors?.content?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>

        {(props.category === "rl" ||
          props.category === "rts" ||
          props.category === "sst" ||
          select === "sst") && (
          <>
            <Box sx={{ my: 2 }}>
              <TextInput
                name="audioText"
                control={control}
                label="Audio Text"
                type="text"
                rules={
                  {
                    // required: {
                    //   value: true,
                    //   message: "*Audio Text is required",
                    // },
                  }
                }
                multiline={true}
                rows={6}
                defaultValue={props.edit === "edit" ? props.editAudioText : ""}
                error={!!errors.audioText}
                errorMessage={errors?.audioText?.message}
                inputStyle={FormStyle.inputStyle}
              />
            </Box>
          </>
        )}

        {(props.category === "rl" ||
          props.category === "rts" ||
          props.category === "di" ||
          select === "sst" ||
          props.category === "sst") && (
          <>
            <Box sx={{ my: 2 }}>
              <Box sx={{ my: 2 }}>
                <TextInput
                  name="answerTemplate"
                  control={control}
                  label="Answer Template"
                  type="text"
                  rules={
                    {
                      // required: {
                      //   value: true,
                      //   message: "*Audio Text is required",
                      // },
                    }
                  }
                  multiline={true}
                  rows={6}
                  defaultValue={
                    props.edit === "edit" ? props.editAnswerTemplate : ""
                  }
                  error={!!errors.answerTemplate}
                  errorMessage={errors?.answerTemplate?.message}
                  inputStyle={FormStyle.inputStyle}
                />
              </Box>
            </Box>
          </>
        )}

        <Box sx={{ my: 2 }}>
          <TextInput
            name="keyword_length"
            control={control}
            label=" Possible length of keyword"
            type="number"
            rules={{
              required: {
                value: true,
                message: "*keyword length is required",
              },
            }}
            defaultValue={props.edit === "edit" ? props.editkeywordLength : 0}
            error={!!errors.keyword_length}
            errorMessage={errors?.keyword_length?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>

        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Active Status</Typography>
          <FormRadioGroup
            name="isActive"
            control={control}
            defaultValue={props.edit === "edit" ? props.editIsActive : ""}
            rules={{
              required: {
                value: true,
                message: "*Choose one",
              },
            }}
            errorMessage={errors?.isActive?.message}
          >
            {[
              { label: "Active", value: 1 },
              { label: "Inactive", value: 0 },
            ].map((r, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    value={r.value}
                    // checked={statusValue === "active"}
                  />
                }
                label={r.label}
              />
            ))}
          </FormRadioGroup>
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

export default FormComponent;
