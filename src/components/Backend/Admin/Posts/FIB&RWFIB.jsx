import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  Collapse,
  FormControlLabel,
  IconButton,
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
import SelectInput from "./Form/SelectInput";
import { getCookie } from "../../../../Utils/GetCookies";

function FIBFormComponent(props) {
  const [loading, setLoading] = useState(false);
  // const [five, setFive] = useState(false);
  const [mc, setMc] = useState(false);
  const [option, setOption] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [editValue] = useState();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      choice:
        props.edit === "edit"
          ? props.editChoice !== undefined &&
            props.editSelect === "rfib" &&
            props.editChoice.map((data) => ({ name: data.name }))
          : [{ name: "" }],
      check:
        props.edit === "edit"
          ? props.editChoice !== undefined &&
            props.editSelect === "rfib" &&
            props.editChoice.map((data) => ({
              name: data.is_correct === "1" ? true : false,
            }))
          : [{ name: "" }],

      radioGroup:
        props.edit === "edit"
          ? props.editChoice !== undefined &&
            props.editSelect === "rwfib" &&
            props.editChoice.map((data) => ({ name: data.is_correct }))
          : [[{ name: "" }]],

      rwfibChoice:
        props.edit === "edit"
          ? props.editChoice !== undefined &&
            props.editSelect === "rwfib" &&
            props.editArr !== undefined &&
            props.editArr.flat().map((data) => ({
              name: data,
            }))
          : [[{ name: "" }], [{ name: "" }], [{ name: "" }], [{ name: "" }]],
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

  //answer for rwfib
  const {
    fields: fieldsList3,
    remove: removeList3,
    append: appendList3,
  } = useFieldArray({ control, name: "rwfibChoice" });

  const {
    fields: fieldsList4,
    remove: removeList4,
    append: appendList4,
  } = useFieldArray({ control, name: "radioGroup" });

  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "r-fib";
  // const path = props.addPath;

  const dataList = {
    category: "",
    title: "",
    content: "",
    name: [],
    isCorrect: [],
    media: "",
    media_type: "",
    isActive: 0,
    errors: [],
    question: [],
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

  //data get for edit section
  useEffect(() => {
    if (props.edit === "edit") {
      props.editSelect !== "rfib" ? forCommon() : forMc();
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
    formData.append("isActive", dataList.isActive);
    for (let i = 0; i < dataList.isCorrect.length; i++) {
      if (dataList.category === "rfib") {
        formData.append("name[]", dataList.name[i]);
      } else {
        formData.append("name[]", JSON.stringify(dataList.name[i]));
      }
    }

    for (let i = 0; i < dataList.isCorrect.length; i++) {
      formData.append("isCorrect[]", dataList.isCorrect[i]);
      if (dataList.category === "rwfib") {
        formData.append("que_number[]", dataList.question[i]);
      }
    }

    let token = await getCookie("userToken");

    let config = { headers: { Authorization: "Bearer " + token } };
    try {
      const res = await axios.post(`${backendURL}`, formData, config);
      //  success alert and clear input
      if (res.status === 301 || res.status === 200) {
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
    formData.append("content", dataList.content);
    formData.append("category", dataList.category);
    formData.append("isActive", dataList.isActive);
    formData.append("title", dataList.title);

    for (let i = 0; i < dataList.name.length; i++) {
      if (dataList.category === "rfib") {
        formData.append("name[]", dataList.name[i]);
      } else {
        formData.append("name[]", JSON.stringify(dataList.name[i]));
      }
    }

    for (let i = 0; i < dataList.isCorrect.length; i++) {
      formData.append("isCorrect[]", dataList.isCorrect[i]);
      if (dataList.category === "rwfib") {
        formData.append("que_number[]", dataList.question[i]);
      }
    }
    formData.append("_method", "PUT");
    let token = getCookie("userToken");
    let config = { headers: { Authorization: "Bearer " + token } };
    const res = await axios.post(`${backendURL}/${props.id}`, formData, config);
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
    dataList.errors = [];
    dataList.category = data.select;
    dataList.title = data.title;
    dataList.content = data.content;
    dataList.isActive = data.isActive;

    if (data.select === "rfib") {
      dataList.isCorrect = [];
      dataList.name = [];
      data.check.forEach(
        (c) =>
          (dataList.isCorrect = [
            ...dataList.isCorrect,
            c.name === true || c.name === 1 ? 1 : 0,
          ])
      );
      data.choice.forEach((c) => {
        dataList.name = [...dataList.name, c.name];
      });
    } else {
      dataList.isCorrect = [];
      dataList.name = [];
      dataList.question = [];
      data.radioGroup.forEach((c, index) => {
        dataList.isCorrect = [...dataList.isCorrect, c.name];
        dataList.question = [...dataList.question, index + 1];
      });

      for (let i = 0; i < data.rwfibChoice.length - 1; i += 4) {
        dataList.name = [
          ...dataList.name,
          [
            data.rwfibChoice[i].name,
            data.rwfibChoice[i + 1].name,
            data.rwfibChoice[i + 2].name,
            data.rwfibChoice[i + 3].name,
          ],
        ];
      }
    }

    props.edit === "edit" ? editPost() : addPost();
  };

  //fib add remove field
  const addField = () => {
    appendList1({ name: "" });
    appendList2({ name: "" });
  };

  const removeField = (index) => {
    removeList1(fieldsList1.length - 1);
    removeList2(fieldsList2.length - 1);
  };

  //rwfib
  const addField1 = () => {
    for (let i = 0; i < 4; i++) {
      appendList3({ name: "" });
    }
    appendList4({ name: "" });
  };

  const removeField1 = () => {
    for (let i = 0; i < 4; i++) {
      removeList3(fieldsList3.length - 1);
      removeList3(fieldsList3.length - 2);
      removeList3(fieldsList3.length - 3);
      removeList3(fieldsList3.length - 4);
    }
    removeList4(fieldsList4.length - 1);
  };

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
        {/* warning alert box for correct content */}
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
              When filling content for fill in the blank use # to use # in place
              that needs for blank
              <br />
              For example- "Hello there.This is missing words".In this blank
              word will be "missing". <br />
              For above example, correct input will be-"Hello there.This is #
              words". Remember to put correct ones first with check in each
              respective checkbox followed by other optional choices.
            </Alert>
            <Alert
              sx={{
                mb: 2,
                color: "red",
                fontSize: "1rem",
                bgcolor: "#ffea00",
                textAlign: "justify",
              }}
            >
              When fiilling content for R&W Fill in Blank, add correct answer
              and with check in respective checkboxes in order .<br />
              For example- "Hello there stranger.My name is John".In this blank
              word will be in place of "stranger","name","John". <br />
              For above example, correct input for content will be-"Hello there
              #.My # is #". For answer input ,we will get more options than
              blank numbers for its purpose is to choose and select only correct
              ones.
              <br />
              <br /> NOTE: The quotation marks in examples are not needed in
              actual input.
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

        <Box sx={{ my: 2 }}>
          <SelectInput
            name="select"
            control={control}
            defaultValue={props.edit !== "" ? props.editSelect : ""}
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
              { value: "rfib", name: " Fill in the Blank" },
              { value: "rwfib", name: "R&W Fill in the Blank" },
            ].map((c, index) => (
              <MenuItem
                key={index}
                value={c.value}
                onClick={() => (c.value === "rfib" ? forMc() : forCommon())}
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
              {!mc && (
                <Box sx={{}}>
                  {fieldsList4.map((field, index) => (
                    <Controller
                      key={field.id}
                      control={control}
                      name={`radioGroup[${index}].name`}
                      rules={{
                        required: {
                          value: true,
                          message: "*Needs to select one correct answer",
                        },
                      }}
                      render={({ field: { onChange } }) => (
                        <RadioGroup
                          onChange={(e) => onChange(e.target.value)}
                          defaultValue={props.edit === "edit" ? field.name : ""}
                        >
                          <Box sx={{ height: "136px", position: "relative" }}>
                            {!!errors?.radioGroup?.[index]?.name === true && (
                              <>
                                <small
                                  style={{
                                    color: "red",
                                    position: "absolute",
                                    right: "-13rem",
                                    top: "3rem",
                                  }}
                                >
                                  {errors.radioGroup[index].name.message}
                                </small>
                              </>
                            )}
                            <Radio
                              value="1"
                              sx={{
                                p: "",
                                mt: "5rem",
                              }}
                            ></Radio>
                          </Box>
                          <Box sx={{ height: "80px" }}>
                            <Radio
                              value="2"
                              sx={{
                                p: "",
                                mt: "1rem",
                                height: "80px",
                              }}
                            ></Radio>
                          </Box>
                          <Box sx={{ height: "80px" }}>
                            <Radio
                              value="3"
                              sx={{
                                p: "",
                                mt: "1rem",
                                height: "80px",
                              }}
                            ></Radio>
                          </Box>
                          <Box sx={{ height: "80px" }}>
                            <Radio
                              value="4"
                              sx={{
                                p: "",
                                mt: "1rem",
                                height: "80px",
                              }}
                            ></Radio>
                          </Box>
                        </RadioGroup>
                      )}
                    />
                  ))}
                </Box>
              )}

              {/* for fib */}
              <Box sx={{ width: "100%", height: "100%" }}>
                <Box sx={{ display: "flex" }}>
                  {mc === true && (
                    <Box>
                      {fieldsList2.map((field, index) => (
                        <Box
                          key={field.id}
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

                  {mc ? (
                    <>
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
                                    {!!errors?.choice?.[index]?.name ===
                                      true && (
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
                    </>
                  ) : (
                    <>
                      <Box sx={{ width: "100%" }}>
                        {fieldsList3.map((field, index) => (
                          <Box key={field.id}>
                            {(index + 1) % 4 === 1 ? (
                              <Typography sx={{ mt: "2rem" }}>
                                Question {Math.trunc((index + 1) / 4) + 1}
                              </Typography>
                            ) : (
                              ""
                            )}
                            <Controller
                              key={field.id}
                              name={`rwfibChoice[${index}].name`}
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
                                  error={!!errors?.rwfibChoice?.[index]?.name}
                                  label={
                                    <Typography variant="h5">
                                      Answer{" "}
                                      {(index + 1) % 4 === 0
                                        ? 4
                                        : (index + 1) % 4}
                                      {!!errors?.rwfibChoice?.[index]?.name ===
                                        true && (
                                        <small>
                                          {
                                            errors.rwfibChoice[index].name
                                              .message
                                          }
                                        </small>
                                      )}
                                    </Typography>
                                  }
                                  sx={{
                                    bgcolor: "rgb(231 239 254)",
                                    mt: "2rem",
                                  }}
                                />
                              )}
                            />
                          </Box>
                        ))}
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
              {/* for fib */}
              {/* for rw fib */}
              {/* for rw fib */}
            </Box>
            {errors.radioDynamic && (
              <Typography variant="p" color="red" textAlign={"left"}>
                {errors.radioDynamic.message}
              </Typography>
            )}
            <br />

            {mc ? (
              <>
                <Button variant="contained" sx={{ mr: 5 }} onClick={addField}>
                  Add
                </Button>

                {fieldsList2.length > 0 && (
                  <Button variant="contained" onClick={removeField}>
                    Remove
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button variant="contained" sx={{ mr: 5 }} onClick={addField1}>
                  Add
                </Button>
                {fieldsList3.length > 0 && (
                  <Button
                    variant="contained"
                    sx={{ mr: 5 }}
                    onClick={removeField1}
                  >
                    Remove
                  </Button>
                )}
              </>
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
            variant="contained"
            disabled={loading ? true : false}
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

export default FIBFormComponent;
