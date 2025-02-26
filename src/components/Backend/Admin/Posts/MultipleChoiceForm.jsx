import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import TextInput from "./Form/TextInput";
import { FormStyle } from "./FormStyle";
import FormRadioGroup from "./Form/FormRadioGroup";
import FileInput from "./Form/FileInput";
import SelectInput from "./Form/SelectInput";
import { getCookie } from "../../../../Utils/GetCookies";

function FormComponent(props) {
  const [loading, setLoading] = useState(false);
  // const [five, setFive] = useState(false);
  const [mc, setMc] = useState(false);
  const [option, setOption] = useState(false);
  let [radio, setRadio] = useState([0]);
  const [multipleChoiceError, setMultipleChoiceError] = useState(false);

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      myRadio: props.edit === "edit" ? props.editMediaType : "1",
      choice:
        props.edit === "edit" &&
        props.editChoice !== undefined &&
        props.editChoice.map((data) => ({ name: data.name })),
      check:
        props.edit === "edit" &&
        props.editChoice !== undefined &&
        props.editChoice.map((data) => ({ name: data.isCorrect })),
    },
  });

  //for dynamic field for answer and check
  const {
    fields: fieldsList1,
    remove: removeList1,
    append: appendList1,
  } = useFieldArray({ control, name: "choice" });

  const {
    fields: fieldsList2,
    remove: removeList2,
    append: appendList2,
  } = useFieldArray({ control, name: "check" });

  const navigate = useNavigate();
  const radioValue = watch("myRadio");
  const media = watch("mediaLink");
  const mediaFile = watch("mediaFile");

  const select = watch("select");

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "l-mul-choice";
  const RbackendURL = process.env.REACT_APP_BACKEND_ADMIN + "r-mul-choice";
  // const path = props.addPath;

  const dataList = {
    category: "",
    title: "",
    content: "",
    name: [],
    isCorrect: [],
    media: "",
    media_type: "",
    errors: [],
    audio_text: "",
    question: "",
    isActive: 0,
  };

  //for mc needs to fix as they are not always 5
  const forMc = () => {
    // setFive(true);
    setOption(true);
    setMc(true);
  };

  // for common radio options
  const forCommon = () => {
    setOption(true);
    setMc(false);
  };

  const [editValue, setEditValue] = useState();

  //data get for edit section
  useEffect(() => {
    setRadio([]);

    if (props.edit === "edit") {
      props.editSelect !== "mc" && props.editSelect !== "rmc"
        ? forCommon()
        : forMc();
      if (props.editChoice !== undefined) {
        props.editChoice.forEach((c, index) => {
          if (c.isCorrect === 1) {
            setEditValue(index.toString());
          }

          setRadio((prevRadio) => [...prevRadio, index]);
        });
      }
    }
  }, [props.edit, props.editSelect, props.editChoice, editValue]);

  // add post function for create post
  const addPost = async () => {
    let btnSave = document.getElementById("btnSave");
    btnSave.disabled = true;
    setLoading(true);
    const formData = new FormData();
    formData.append("content", dataList.content);
    formData.append("category", dataList.category);
    formData.append("title", dataList.title);
    formData.append("media", dataList.media);
    formData.append("isActive", dataList.isActive);
    if (
      props.category !== "rmc" &&
      props.category !== "rsmc" &&
      props.category !== "r-mc-sa"
    ) {
      formData.append("audio_text", dataList.audio_text);
    } else {
      formData.append("question", dataList.question);
    }
    formData.append("media_type", dataList.media_type);
    for (let i = 0; i < dataList.isCorrect.length; i++) {
      formData.append("name[]", dataList.name[i]);
    }

    for (let i = 0; i < dataList.isCorrect.length; i++) {
      formData.append("isCorrect[]", dataList.isCorrect[i]);
    }

    let token = getCookie("userToken");

    let createURL =
      dataList.category !== "rmc" && dataList.category !== "rsmc"
        ? backendURL
        : RbackendURL;
    let config = { headers: { Authorization: "Bearer " + token } };
    try {
      const res = await axios.post(`${createURL}`, formData, config);
      //  success alert and clear input
      if (res.status === 201 || res.status === 200) {
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
        dataList.errors.push(res.message);
      }
      btnSave.innerText = "Add";
      btnSave.disabled = false;
    } catch (error) {
      alert(error.message);
    }
  };

  //edit post for update

  const editPost = async () => {
    let btnSave = document.getElementById("btnSave");
    btnSave.disabled = true;
    setLoading(true);
    const formData = new FormData();
    if (
      props.category !== "rmc" &&
      props.category !== "rsmc" &&
      props.category !== "r-mc-sa"
    ) {
      formData.append("audio_text", dataList.audio_text);
    } else {
      formData.append("question", dataList.question);
    }
    formData.append("content", dataList.content);
    formData.append("category", dataList.category);
    formData.append("title", dataList.title);
    formData.append("isActive", dataList.isActive);
    formData.append("media", dataList.media);
    formData.append("media_type", dataList.media_type);
    for (let i = 0; i < dataList.name.length; i++) {
      formData.append("name[]", dataList.name[i]);
    }

    for (let i = 0; i < dataList.isCorrect.length; i++) {
      formData.append("isCorrect[]", dataList.isCorrect[i]);
    }

    formData.append("_method", "PUT");

    let editURL =
      dataList.category !== "rmc" && dataList.category !== "rsmc"
        ? backendURL
        : RbackendURL;
    let token = await getCookie("userToken");
    let config = { headers: { Authorization: "Bearer " + token } };
    const res = await axios.post(`${editURL}/${props.id}`, formData, config);

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
      alert(res.message);
      dataList.errors.push(res);
    }
    btnSave.innerText = "Update";
    btnSave.disabled = false;
  };

  //submit handle input
  const saveType = (data) => {
    if (
      (fieldsList2.length < 1 && (select === "mc" || select === "rmc")) ||
      (fieldsList1.length < 1 && (select !== "mc" || select !== "rmc"))
    ) {
      setMultipleChoiceError(true);
    } else {
      setMultipleChoiceError(false);
      dataList.errors = [];
      dataList.category = data.select;
      dataList.title = data.title;
      dataList.media = data.media_type == "1" ? data.mediaLink : data.mediaFile;
      dataList.media_type = radioValue;
      dataList.isActive = data.isActive;
      dataList.content = data.content;
      if (
        props.category !== "rmc" &&
        props.category !== "rsmc" &&
        props.category !== "r-mc-sa"
      ) {
        dataList.audio_text = data.audioText;
      } else {
        dataList.question = data.question;
      }

      if (data.select === "mc" || data.select === "rmc") {
        dataList.isCorrect = [];
        data.check.forEach(
          (c) =>
            (dataList.isCorrect = [
              ...dataList.isCorrect,
              c.name === true || c.name === 1 ? 1 : 0,
            ])
        );
      } else {
        dataList.isCorrect = [];
        radio.forEach(
          (r) =>
            (dataList.isCorrect = [
              ...dataList.isCorrect,
              r.toString() === data.radioDynamic.toString() ? 1 : 0,
            ])
        );
      }

      dataList.name = [];
      data.choice.forEach((c) => {
        dataList.name = [...dataList.name, c.name];
      });

      props.edit === "edit" ? editPost() : addPost();
    }
  };

  let addRadio = () => {
    setRadio((prevRadio) => [...prevRadio, radio.length]);
  };

  let removeRadio = () => {
    radio.pop(radio.length);
    setRadio(radio.filter((r) => r !== radio.length));
  };

  const addField = () => {
    appendList1({ name: "" });
    appendList2({ name: "" });
    addRadio();
  };

  const removeField = (index) => {
    removeList1(index);
    removeList2(index);
    removeRadio();
  };

  const selectList1 = [
    { value: "smc", name: "Single Answer" },
    { value: "mc", name: "Multiple Answer" },
    { value: "hcs", name: "Highlight Correct Summary" },
    { value: "smw", name: "Select Missing Word" },
  ];
  const selectList2 = [
    { value: "rsmc", name: "Single Answer" },
    { value: "rmc", name: "Multiple Answer" },
  ];


  return (
    <>
      <form onSubmit={handleSubmit(saveType)}>
        {/* React hook form with material ui */}

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

        {/* media link */}
        {props.category !== "r-mc-sa" &&
        props.category !== "rmc" &&
        props.category !== "rsmc" ? (
          <>
            <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Media Link Type
              </FormLabel>
              <FormRadioGroup
                name="myRadio"
                control={control}
                defaultValue={
                  props.edit === "edit" ? props.editPost?.media_type : ""
                }
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
              {/* <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                control={
                  <Radio
                    {...register("myRadio")}
                    value="1"
                    checked={radioValue === "1"}
                  />
                }
                label="Input"
              />
              <FormControlLabel
                control={
                  <Radio
                    {...register("myRadio")}
                    value="2"
                    // checked = { props.editMediaType === "2"}
                    checked={radioValue === "2"}
                  />
                }
                label="File"
              />
            </RadioGroup> */}
            </Box>
            <Box>{props.editPost?.media_type == "2"}</Box>

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
                    props.edit === "edit" && props.editPost?.media_type == "1"
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
                        : `${process.env.REACT_APP_BACKEND_URL}storage/${
                            props.category === "mc-sa"
                              ? props.editSelect
                              : props.category
                          }/${props.editMedia}`
                      : ""
                  }
                  controls
                />
              </Box>
            )}
          </>
        ) : (
          <>
            <TextInput
              name="question"
              control={control}
              label="Question"
              type="text"
              rules={{
                required: {
                  value: true,
                  message: "*Question text is required",
                },
              }}
              defaultValue={props.edit === "edit" ? props.editQuestion : ""}
              error={!!errors.question}
              errorMessage={errors?.question?.message}
              inputStyle={FormStyle.inputStyle}
            />
          </>
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

        {/* audio text */}
        {props.category !== "r-mc-sa" &&
          props.category !== "rmc" &&
          props.category !== "rsmc" && (
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
          )}

        <Box sx={{ my: 2 }}>
          <SelectInput
            name="select"
            control={control}
            defaultValue={
              props.edit !== ""
                ? props.category === "mc-sa"
                  ? props.editSelect
                  : props.category
                : ""
            }
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
            {/* {props.category !== "r-mc-sa" ? (
              <> */}
            {props.category !== "r-mc-sa" &&
              props.category !== "rmc" &&
              props.category !== "rsmc" &&
              selectList1.map((c, index) => (
                <MenuItem
                  key={index}
                  value={c.value}
                  onClick={() => (c.value === "mc" ? forMc() : forCommon())}
                >
                  {c.name}
                </MenuItem>
              ))}
            {(props.category === "r-mc-sa" ||
              props.category === "rmc" ||
              props.category === "rsmc") &&
              selectList2.map((c, index) => (
                <MenuItem
                  key={index}
                  value={c.value}
                  onClick={() => (c.value === "rmc" ? forMc() : forCommon())}
                >
                  {c.name}
                </MenuItem>
              ))}
          </SelectInput>
        </Box>

        {errors.select && (
          <Typography variant="p" color="red" textAlign={"left"}>
            {errors.select.message}
          </Typography>
        )}

        {/* test useField for dynamic */}
        {option === true && (
          <>
            <Box sx={{ display: "flex" }}>
              {mc !== true && (
                <>
                  {/* test radio dynamic  */}

                  <Controller
                    control={control}
                    name="radioDynamic"
                    rules={{
                      required: {
                        value: true,
                        message: "*Needs to select one correct answer",
                      },
                    }}
                    defaultValue={props.edit === "edit" ? props.editRadio : ""}
                    render={({ field: { onChange } }) => (
                      <RadioGroup
                        onChange={(e) => onChange(e.target.value)}
                        defaultValue={
                          props.edit === "edit" ? props.editRadio : ""
                        }
                      >
                        {radio.map((r, index) => (
                          <Box key={index} sx={{ height: "80px" }}>
                            <Radio
                              value={r.toString()}
                              sx={{
                                p: "",
                                mt: "2rem",
                              }}
                            ></Radio>
                          </Box>
                        ))}
                      </RadioGroup>
                    )}
                  />
                </>
              )}

              <Box sx={{ width: "100%", height: "100%" }}>
                {/* one */}
                <Box sx={{ display: "flex" }}>
                  {mc === true && (
                    <Box>
                      {fieldsList2.map((field, index) => (
                        <Box
                          sx={{
                            width: "20%",
                            display: "block",
                            height: "80px",
                          }}
                          style={{
                            display: "block",
                            "& .MuiCheckboxroot": {
                              display: "block",
                            },
                          }}
                          key={field.id}
                        >
                          <Controller
                            key={field.id}
                            name={`check[${index}].name`}
                            control={control}
                            defaultValue={field.name}
                            render={({ field: { value, onChange } }) => (
                              <Checkbox
                                checked={value}
                                onChange={onChange}
                                sx={{ mt: 5 }}
                              />
                            )}
                          ></Controller>
                        </Box>
                      ))}
                    </Box>
                  )}

                  <Box sx={{ width: "100%" }}>
                    {fieldsList1.map((field, index) => (
                      <Controller
                        key={field.id}
                        name={`choice[${index}].name`}
                        control={control}
                        defaultValue={field.name} //insert props.content
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
                            label={
                              <Typography variant="h5">
                                Answer {index + 1}
                                {!!errors?.choice?.[index]?.name === true && (
                                  <small>
                                    {errors.choice[index].name.message}
                                  </small>
                                )}
                              </Typography>
                            }
                            sx={{ bgcolor: "rgb(231 239 254)", mt: "2rem" }}
                          />
                        )}
                      />
                    ))}
                  </Box>
                  {/* {errors.choice1 && (
                    <Box
                      sx={{
                        width: {
                          md: "20%",
                          sm: "40%",
                          xs: "100%",
                        },
                      }}
                    >
                      <Typography variant="p" color="red" textAlign={"left"}>
                        {errors.choice1.message}
                      </Typography>
                    </Box>
                  )} */}
                </Box>
              </Box>
            </Box>

            {fieldsList2.length < 1 &&
              (select === "mc" || select === "rmc") &&
              multipleChoiceError && (
                <Typography variant="p" color="red" textAlign={"left"}>
                  Need to add questions and answers.
                </Typography>
              )}
            {fieldsList1.length < 1 &&
              select !== "mc" &&
              select !== "rmc" &&
              multipleChoiceError && (
                <Typography variant="p" color="red" textAlign={"left"}>
                  Need to add questions and answers.
                </Typography>
              )}
            {errors.radioDynamic && (
              <Typography variant="p" color="red" textAlign={"left"}>
                {errors.radioDynamic.message}
              </Typography>
            )}
            <br />
            <Button variant="contained" sx={{ mr: 5 }} onClick={addField}>
              Add
            </Button>
            {fieldsList2.length > 0 && (
              <Button variant="contained" onClick={removeField}>
                Remove
              </Button>
            )}
          </>
        )}

        {/* test useField for dynamic */}

        {dataList.errors && <Typography>{dataList.errors[0]}</Typography>}

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
            disabled={loading ? true : false}
            variant="contained"
            sx={{
              color: "#000",
              bgcolor: "#2196f3",
              "&:hover": {
                bgcolor: "white",
              },
              width: "5.5rem",
              height: "2.5rem",
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
