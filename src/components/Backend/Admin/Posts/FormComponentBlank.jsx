import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";

import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import SelectInput from "./Form/SelectInput";
import { FormStyle } from "./FormStyle";
import TextInput from "./Form/TextInput";
import FormRadioGroup from "./Form/FormRadioGroup";
import FileInput from "./Form/FileInput";
import { getCookie } from "../../../../Utils/GetCookies";

function FormComponentBlank(props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      myRadio: props.edit === "edit" ? props.editMediaType : "1",
      choice:
        props.edit === "edit"
          ? props.editAnswer !== undefined &&
            props.editAnswer.map((data) => ({ name: data.name }))
          : [{ name: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "choice",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [paraNumber, setParaNumber] = useState(0);

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  const path = props.addPath;

  const dataList = {
    category: "",
    title: "",
    content: "",
    media: "",
    media_type: "",
    select: "",
    transcript: "",
    audio_text: "",
    answer_template: "",
    isActive: 0,
    errors: [],
    emailType: null,
  };

  const radioValue = watch("myRadio");
  const selectType = watch("select");
  const media = watch("mediaLink");
  const mediaFile = watch("mediaFile");

  useEffect(() => {
    if (props.edit === "edit" && props.category === "wemail") {
      setValue("select", "wemail");
    }
  }, [props, setValue]);

  // add post function for create post
  const addPost = async () => {
    let btnSave = document.getElementById("btnSave");
    btnSave.disabled = true;
    setLoading(true);
    let token = await getCookie("userToken");

    const formData = new FormData();
    formData.append("content", dataList.content);
    formData.append("category", dataList.category);
    formData.append("title", dataList.title);
    formData.append("transcript", dataList.transcript);
    formData.append("keyword_length", dataList.keyword_length);
    formData.append("isActive", dataList.isActive);
    if (selectType === "wemail") {
      formData.append("email_type", dataList.emailType ? "formal" : "informal");
    }
    if (props.category === "fib" || props.category === "hiw") {
      formData.append("audio_text", dataList.audio_text);
    }
    if (
      props.category === "swt" ||
      props.category === "we" ||
      selectType === "wemail"
    ) {
      formData.append("answer_template", dataList.answer_template);
    }

    if (props.category !== "rop") {
      formData.append("media", dataList.media);
      formData.append("media_type", dataList.media_type);
    }
    for (let i = 0; i < dataList.name.length; i++) {
      formData.append("name[]", dataList.name[i].name);
      formData.append("para_number[]", i + 1);
    }

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
      alert(res);
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
    if (props.category === "fib" || props.category === "hiw") {
      formData.append("audio_text", dataList.audio_text);
    }

    if (selectType === "wemail") {
      formData.append("email_type", dataList.emailType ? "formal" : "informal");
    }
    formData.append("category", dataList.category);
    formData.append("title", dataList.title);
    formData.append("transcript", dataList.transcript);
    formData.append("keyword_length", dataList.keyword_length);
    formData.append("isActive", dataList.isActive);
    if (
      props.category === "swt" ||
      props.category === "we" ||
      selectType === "wemail"
    ) {
      formData.append("answer_template", dataList.answer_template);
    }

    if (props.category !== "rop") {
      formData.append("media", dataList.media);
      formData.append("media_type", dataList.media_type);
    }

    for (let i = 0; i < dataList.name.length; i++) {
      formData.append("name[]", dataList.name[i].name);
      formData.append("para_number[]", i + 1);
    }
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
    if (props.category === "rop") {
      dataList.category = props.category;
    } else if (
      props.category === "swt" ||
      props.category === "we" ||
      props.category === "wemail"
    ) {
      dataList.category = data.select;
      dataList.transcript = data.transcript;

      dataList.keyword_length = data.keyword_length;
      dataList.answer_template = data.answerTemplate;
    } else {
      dataList.media = data.media_type == "1" ? data.mediaLink : data.mediaFile;
      dataList.media_type = radioValue;
      dataList.category = data.select;
    }
    dataList.isActive = data.isActive;
    dataList.name = data.choice;
    if (props.category === "fib" || props.category === "hiw") {
      dataList.audio_text = data.audioText;
    }
    if (props.category === "wemail") {
      dataList.emailType = data.emailType;
    }
    props.edit === "edit" ? editPost() : addPost();
  };

  const addField = () => {
    append({ name: "" });
    setParaNumber(paraNumber + 1);
  };

  const removeField = (index) => {
    remove(index);
    setParaNumber(paraNumber - 1);
  };

  return (
    <>
      <form onSubmit={handleSubmit(saveType)}>
        {/* React hook form with material ui */}
        {(props.category === "fib" || props.category === "hiw") && (
          <Box sx={{ my: 2 }}>
            <SelectInput
              name="select"
              control={control}
              defaultValue={props.edit !== "" ? props.category : ""}
              rules={{
                required: {
                  value: true,
                  message: `Question Type required ${fields}`,
                },
              }}
              label="Question Type"
              inputStyle={FormStyle.inputStyle}
              error={!!errors.select}
              errorMessage={errors?.select?.message}
            >
              {[
                { value: "fib", name: "Fill In The Blank" },
                { value: "hiw", name: "Highlight Incorrect Word" },
              ].map((c, index) => (
                <MenuItem key={index} value={c.value}>
                  {c.name}
                </MenuItem>
              ))}
            </SelectInput>
          </Box>
        )}

        {/* {props.category} */}
        {(props.category === "swt" ||
          props.category === "we" ||
          props.category === "wemail") && (
          <Box sx={{ my: 2 }}>
            <SelectInput
              name="select"
              control={control}
              defaultValue={props.edit !== "" ? props.category : ""}
              rules={{
                required: {
                  value: true,
                  message: `Question Type required ${fields}`,
                },
              }}
              label="Question Type"
              inputStyle={FormStyle.inputStyle}
              error={!!errors.select}
              errorMessage={errors?.select?.message}
            >
              {[
                { value: "swt", name: "Summarized Written Text" },
                { value: "we", name: "Write Essay" },
                { value: "wemail", name: "Write Email" },
              ].map((c, index) => (
                <MenuItem key={index} value={c.value}>
                  {c.name}
                </MenuItem>
              ))}
            </SelectInput>
          </Box>
        )}

        {errors.select && (
          <Typography variant="p" color="red" textAlign={"left"}>
            {errors.select.message}
          </Typography>
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
        {(props.category === "fib" || props.category === "hiw") && (
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
                      value:
                        props.edit === "edit" && props.editMediaType == "1"
                          ? false
                          : true,
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
                  acceptType={"audio/*"}
                  btnStyle={{ color: "white" }}
                  error={errors.mediaFile}
                  errorMessage={errors?.mediaFile?.message}
                />
              </Box>
            )}
            {radioValue == "1" && (
              <Box sx={{ my: 2 }}>
                <audio src={media} controls />
              </Box>
            )}
            {radioValue == "2" && (
              <Box sx={{ my: 2 }}>
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
              </Box>
            )}
            {props.edit === "edit" && (
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
          </>
        )}
        {/* warning alert box for correct content */}
        {(props.category === "fib" || props.category === "hiw") && (
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
                When filling content for Highlight Incorrect Words, use $# #$ to
                enclose correct answer .<br />
                For example- "Hello there.This is missing correct words".In this
                incorrect word will be "missing" and correct will be correct.{" "}
                <br />
                For above example, correct input will be-"Hello there.This is
                missing $#correct#$ words".*For the answer input only incorrect
                word will be used.In this case,answer input will be missing.
                <br />
                Note : please do not put any special characters or punctuation
                marks between the incorrect words and missing correct word.
                <br />
                NOTE: It will not cause error but it is best to leave a space
                after correct word for example "Hello this is missing
                $#correct#$ ."
              </Alert>
              <Alert
                sx={{
                  mb: 2,
                  color: "red",
                  fontSize: "1rem",
                  bgcolor: "#ffea00",
                }}
              >
                When fiilling content for Fill in Blank, use $# #$ to enclose
                correct answer and use # in place that needs for blank .<br />
                For example- "Hello there.This is missing words".In this blank
                word will be in place of "missing". <br />
                For above example, correct input will be-" Hello there.This is #
                $#missing#$ words ".
                <br />
                NOTE: The quotation marks in examples are not needed in actual
                input.
                <br />
                NOTE: Please be sure to leave a space after blank . For example:
                "Hello this is # $#missing#$ ."leave a space between full stop
                and #$ .
              </Alert>
              <Alert
                sx={{
                  mb: 2,
                  color: "red",
                  fontSize: "1rem",
                  bgcolor: "#ffea00",
                }}
              >
                Regarding keyword length in writing , we only make sure to limit
                how many words if we are to expected from keywords of content or
                transcript in writing if the length or word counts of those
                fields are greater than the limited word count .If there are
                less than the limited words ,you can leave it as default 0
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
        {/* warning alert box for correct content */}
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

        {/* audio text */}
        {(props.category === "fib" || props.category === "hiw") && (
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

        {(props.category === "swt" ||
          props.category === "we" ||
          props.category === "wemail") && (
          <>
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
          </>
        )}
        {(props.category !== "swt" && props.category !== "we") ||
          (!["we", "swt", "wemail"].includes(selectType) && (
            <>
              <Box sx={{ display: "flex", my: 2 }}>
                {((selectType === "wemail" && fields.length !== 3) ||
                  selectType !== "wemail") && (
                  <Button type="button" variant="contained" onClick={addField}>
                    Add Answer
                  </Button>
                )}

                {fields.length > 1 && (
                  <Button
                    sx={{ mx: 1 }}
                    type="button"
                    variant="contained"
                    onClick={() => removeField(fields.length - 1)}
                  >
                    Remove Answer
                  </Button>
                )}
              </Box>

              <Box sx={{ width: "100%" }}>
                {fields.map((field, index) => (
                  <Controller
                    key={field.id}
                    name={`choice[${index}].name`}
                    control={control}
                    defaultValue={field.name}
                    rules={{
                      required: {
                        value: true,
                        message: "*Choice is required",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id={`choice${index}`}
                        type="text"
                        variant="standard"
                        fullWidth
                        size="large"
                        error={!!errors?.choice?.[index]?.name}
                        label={`${
                          selectType === "wemail" ? "Theme" : "Answer"
                        } ${index + 1}`}
                        sx={{ bgcolor: "rgb(231 239 254)", mt: "1rem" }}
                      />
                    )}
                  />
                ))}
              </Box>
            </>
          ))}
        {(["we", "swt", "wemail"].includes(selectType) ||
          ["we", "swt", "wemail"].includes(props.category)) && (
          <>
            {/* warning alert box for correct tranascript */}
            <Box sx={{ my: 2 }}>
              <TextInput
                name="transcript"
                control={control}
                label="Transcript"
                type="text"
                rules={{
                  required: {
                    value: true,
                    message: "*Transcript is required",
                  },
                }}
                multiline={true}
                rows={6}
                defaultValue={props.edit === "edit" ? props.editTranscript : ""}
                error={!!errors.transcript}
                errorMessage={errors?.transcript?.message}
                inputStyle={FormStyle.inputStyle}
              />
            </Box>

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
                defaultValue={
                  props.edit === "edit" ? props.editkeywordLength : 0
                }
                error={!!errors.keyword_length}
                errorMessage={errors?.keyword_length?.message}
                inputStyle={FormStyle.inputStyle}
              />
            </Box>
          </>
        )}

        {selectType === "wemail" && (
          <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
            <Typography variant="h6">Email Type</Typography>
            <FormRadioGroup
              name="emailType"
              control={control}
              defaultValue={
                props.edit === "edit"
                  ? props.editEmailType === "formal"
                    ? 1
                    : 0
                  : ""
              }
              rules={{
                required: {
                  value: true,
                  message: "*Choose one",
                },
              }}
              errorMessage={errors?.isActive?.message}
            >
              {[
                { label: "Formal", value: 1 },
                { label: "Informal", value: 0 },
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
        )}

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

        <Box sx={{ display: "flex", my: 2 }} justifyContent="right">
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

export default FormComponentBlank;
