import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { FormStyle } from "./FormStyle";
import TextInput from "./Form/TextInput";
import FormRadioGroup from "./Form/FormRadioGroup";
import { getCookie } from "../../../../Utils/GetCookies";

function TrainingForm(props) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      description:
        props.edit === "edit" &&
        props.editPost.description !== null &&
        JSON.parse(props.editPost.description).map((data) => ({
          name: data,
        })),
    },
  });

  const uStatus = watch("unlimitedStatus");

  const discountStatus = watch("discountStatus");
  const mtUnlimitedStatus = watch("mtUnlimitedStatus");
  // const languageTypeId = watch("languageType");
  // React to changes or initial values after the first render
  useEffect(() => {
    if (props.edit === "edit") {
      setValue("unlimitedStatus", props.editPost.limited_status);
      setValue("mtUnlimitedStatus", props.editPost.mt_limited_status);
    }
  }, [props, setValue]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  const path = props.addPath;

  const {
    fields: fieldList,
    remove: removeList,
    append: appendList,
  } = useFieldArray({ control, name: "description" });

  const addField = () => {
    appendList({ name: "" });
  };

  const removeField = () => {
    removeList(fieldList.length - 1);
  };

  const dataList = {
    name: "",
    fees: "",
    oversea_fees: "",
    discount_status: "",
    discount_percent: 0,
    discount_number: 0,
    video_recording: 1,
    description: "",
    scoring_count: 0,
    isActive: "",
    mocktest_count: 0,
    plan_type_id: 9,
    language_type_id: null,
    mini_mocktest_count: 0,
    sectional_mocktest_count: 0,
    limited_status: null,
    mt_limited_status: null,
    number_of_day: 0,
    mt_number_of_day: 0,
    frontend_status: 1,
    plan_order: null,
  };

  const addPost = async () => {
    setLoading(true);

    let token = getCookie("userToken");

    let config = { headers: { Authorization: "Bearer " + token } };

    try {
      const res = await axios.post(`${backendURL}${path}`, dataList, config);

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
  const editPost = async () => {
    setLoading(true);

    let token = getCookie("userToken");

    let config = { headers: { Authorization: "Bearer " + token } };
    const res = await axios.put(
      `${backendURL}${path}/${props.id}`,
      dataList,
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
    dataList.name = data.name;
    dataList.fees = parseInt(data.fees);
    if (discountStatus == 1) {
      dataList.discount_status = 1;
      dataList.discount_percent = data.discountPercent;
      dataList.discount_number = data.discountNumber;
    } else {
      dataList.discount_status = 0;
    }
    dataList.oversea_fees = parseInt(data.overseaFees);
    dataList.description = data.description;

    dataList.limited_status = parseInt(data.unlimitedStatus);

    if (data.unlimitedStatus == "1") {
      dataList.number_of_day = parseInt(data.days);
    }

    if (data.unlimitedStatus == "0") {
      dataList.scoring_count = parseInt(data.scoreTime);
    }

    dataList.mt_limited_status = parseInt(data.mtUnlimitedStatus);

    if (data.mtUnlimitedStatus == "1") {
      dataList.mt_number_of_day = parseInt(data.mtDays);
    }

    if (data.mtUnlimitedStatus == "0") {
      dataList.mocktest_count = parseInt(data.mtCount);
    }
    dataList.isActive = parseInt(data.statusValue);

    let description = [];
    data.description.forEach((d) => {
      description = [...description, d.name];
    });
    dataList.description = JSON.stringify(description);
    dataList.plan_order = data.planOrder;
    dataList.video_recording = data.videoRecording;
    dataList.training_type = props.editPost?.training_type;

    props.edit === "edit" ? editPost() : addPost();
  };

  return (
    <>
      <form onSubmit={handleSubmit(saveType)}>
        {/* React hook form with material ui */}
        {/* name */}
        <Box sx={{ my: 2 }}>
          <TextInput
            name="name"
            control={control}
            label="Name"
            type="text"
            rules={{
              required: {
                value: true,
                message: "*Name is required",
              },
            }}
            defaultValue={props.edit === "edit" ? props.editPost.name : ""} //insert props.title
            error={!!errors.name}
            errorMessage={errors?.name?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>
        {/* fees */}
        <Box sx={{ my: 2 }}>
          <TextInput
            name="fees"
            control={control}
            label="Fees"
            type="number"
            rules={{
              required: {
                value: true,
                message: "*Fees is required",
              },
            }}
            defaultValue={props.edit === "edit" ? props.editPost.fees : ""}
            error={!!errors.fees}
            errorMessage={errors?.fees?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>

        {/*oversea fees */}
        <Box sx={{ my: 2 }}>
          <TextInput
            name="overseaFees"
            control={control}
            label="Oversea Fees"
            type="number"
            rules={{
              required: {
                value: true,
                message: "*Oversea fees is required",
              },
            }}
            defaultValue={
              props.edit === "edit" ? props.editPost.oversea_fees : ""
            }
            error={!!errors.overseaFees}
            errorMessage={errors?.overseaFees?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>

        {/* Discount Status */}
        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Discount Status</Typography>

          <FormRadioGroup
            name="discountStatus"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost?.discount_status : ""
            }
            rules={{
              required: {
                value: true,
                message: "*Choose one",
              },
            }}
            errorMessage={errors?.discountStatus?.message}
          >
            {[
              { label: "Yes", value: 1 },
              { label: "No", value: 0 },
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
        {discountStatus == 1 && (
          <>
            {/*discount fees */}

            <Box sx={{ my: 2 }}>
              <TextInput
                name="discountPercent"
                control={control}
                label="Discount Percent"
                type="number"
                rules={{
                  required: {
                    value: true,
                    message:
                      "*Discount percent is required & must be within 0-100",
                  },
                  min: {
                    value: 0,
                    message: "Must not be empty or (-)",
                  },
                  max: {
                    value: 100,
                    message: "Must not be grater than 100",
                  },
                }}
                defaultValue={
                  props.edit === "edit" ? props.editPost.discount_percent : ""
                }
                error={!!errors.discountPercent}
                errorMessage={errors?.discountPercent?.message}
                inputStyle={FormStyle.inputStyle}
              />
            </Box>

            {/*number of discount  */}
            <Box sx={{ my: 2 }}>
              <TextInput
                name="discountNumber"
                control={control}
                label="Number of Discount"
                type="number"
                rules={{
                  required: {
                    value: true,
                    message: "*Discount number is required",
                  },
                }}
                defaultValue={
                  props.edit === "edit" ? props.editPost.discount_number : ""
                }
                error={!!errors.discountNumber}
                errorMessage={errors?.discountNumber?.message}
                inputStyle={FormStyle.inputStyle}
              />
            </Box>
          </>
        )}

        {/* unlimited status */}

        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Unlimited Status</Typography>
          <FormRadioGroup
            name="unlimitedStatus"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost.limited_status : ""
            }
            rules={{
              required: {
                value: true,
                message: "*Choose one",
              },
            }}
            errorMessage={errors?.unlimitedStatus?.message}
          >
            {[
              { label: "Yes", value: 1 },
              { label: "No", value: 0 },
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

        {/* mt count */}

        {/* score count */}
        {uStatus == 0 && (
          <Box sx={{ my: 2 }}>
            <TextInput
              name="scoreTime"
              control={control}
              label="Score Token"
              type="number"
              rules={{
                required: {
                  value: true,
                  message: "*scoreTime is required",
                },
              }}
              defaultValue={
                props.edit === "edit" ? props.editPost.scoring_count : ""
              }
              error={!!errors.scoreTime}
              errorMessage={errors?.scoreTime?.message}
              inputStyle={FormStyle.inputStyle}
            />
          </Box>
        )}
        {uStatus == 1 && (
          <>
            {/* day */}
            <Box sx={{ my: 2 }}>
              <TextInput
                name="days"
                control={control}
                label="Days"
                type="number"
                rules={{
                  required: {
                    value: true,
                    message: "*Day is required",
                  },
                }}
                defaultValue={
                  props.edit === "edit" ? props.editPost.number_of_day : ""
                }
                error={!!errors.days}
                errorMessage={errors?.days?.message}
                inputStyle={FormStyle.inputStyle}
              />
            </Box>

            {/* day */}
          </>
        )}

        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Mock Test Unlimited Status</Typography>
          <FormRadioGroup
            name="mtUnlimitedStatus"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost.mt_limited_status : ""
            }
            rules={{
              required: {
                value: true,
                message: "*Choose one",
              },
            }}
            errorMessage={errors?.mtUnlimitedStatus?.message}
          >
            {[
              { label: "Yes", value: 1 },
              { label: "No", value: 0 },
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
        {mtUnlimitedStatus == 0 && (
          <Box sx={{ my: 2 }}>
            <Controller
              name="mtCount"
              control={control}
              defaultValue={
                props.edit === "edit" ? props.editPost.mocktest_count : ""
              } //insert props.title
              rules={{
                required: {
                  value: true,
                  message: "*mtCount is required",
                },
              }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  id="mtCount"
                  type="number"
                  fullWidth
                  error={!!errors.mtCount}
                  label={<Typography variant="h6">Mock Test Count</Typography>}
                  InputProps={{
                    sx: {
                      ...FormStyle.inputStyle,
                    },
                  }}
                  helperText={errors?.mtCount?.message}
                />
              )}
            />
          </Box>
        )}
        {mtUnlimitedStatus == 1 && (
          <Box sx={{ my: 2 }}>
            <Controller
              name="mtDays"
              control={control}
              defaultValue={
                props.edit === "edit" ? props.editPost.mt_number_of_day : ""
              } //insert props.title
              rules={{
                required: {
                  value: true,
                  message: "*Mock test Day is required",
                },
              }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  id="days"
                  type="number"
                  fullWidth
                  error={!!errors.mtDays}
                  label={<Typography variant="h6">Mock test Days</Typography>}
                  InputProps={{
                    sx: {
                      ...FormStyle.inputStyle,
                    },
                  }}
                  helperText={errors?.mtDays?.message}
                />
              )}
            />
          </Box>
        )}
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "1rem",
            p: 2,
          }}
        >
          <Typography variant="h6">Description</Typography>

          <Box sx={{ width: "100%", mb: 2 }}>
            {fieldList.map((field, index) => (
              <Controller
                key={field.id}
                name={`description[${index}].name`}
                control={control}
                defaultValue={field.name} //insert props.content
                rules={{
                  required: {
                    value: true,
                    message: "*Description is required",
                  },
                  maxLength: {
                    value: 70,
                    message: "The sentence must not exceeds 70 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id={`description[${index}].name`}
                    type="text"
                    variant="standard"
                    fullWidth
                    size="large"
                    error={!!errors?.description?.[index]?.name}
                    label={
                      <Typography variant="h5">
                        Description {index + 1}
                        {!!errors?.description?.[index]?.name === true && (
                          <small>
                            {errors.description?.[index]?.name.message}
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
        </Box>
        {/* add or remove btn */}
        {fieldList.length < 5 && (
          <Button variant="contained" sx={{ mr: 5 }} onClick={addField}>
            Add
          </Button>
        )}

        <Button variant="contained" onClick={removeField}>
          Remove
        </Button>
        {/* type */}
        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">
            Training Type -{" "}
            {props.editPost.training_type === 1 ? "Group" : "Individual"}{" "}
          </Typography>
          {/* <Controller
            name="trainingType"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost.training_type : ""
            } //insert props.description
            rules={{
              required: {
                value: true,
                message: "*Choose one",
              },
            }}
            render={({ field: { value, onChange } }) => (
              <RadioGroup
                // row
                // aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={onChange}
              >
                <FormControlLabel
                  control={
                    <Radio
                      value={0}
                      // checked={statusValue === "active"}
                    />
                  }
                  label="Group"
                />
                <FormControlLabel
                  control={
                    <Radio
                      value={1}
                      // checked = { props.editMediaType === "2"}
                      // checked={statusValue === "inactive"}
                    />
                  }
                  label="Individual"
                />
                <Typography sx={{ fontSize: "1rem", color: "red" }}>
                  {errors?.trainingType?.message}
                </Typography>
              </RadioGroup>
            )}
           /> */}
        </Box>
        {/* order */}
        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Plan Order for display</Typography>
          <Controller
            name="planOrder"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost.plan_order : ""
            } //insert props.description
            rules={{
              required: {
                value: true,
                message: "*Choose one",
              },
            }}
            render={({ field: { value, onChange } }) => (
              <RadioGroup
                // row
                // aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={onChange}
              >
                <FormControlLabel
                  control={
                    <Radio
                      value={1}
                      // checked={statusValue === "active"}
                    />
                  }
                  label="1"
                />
                <FormControlLabel
                  control={
                    <Radio
                      value={2}
                      // checked = { props.editMediaType === "2"}
                      // checked={statusValue === "inactive"}
                    />
                  }
                  label="2"
                />
                <FormControlLabel
                  control={
                    <Radio
                      value={3}
                      // checked = { props.editMediaType === "2"}
                      // checked={statusValue === "inactive"}
                    />
                  }
                  label="3"
                />
                <Typography sx={{ fontSize: "1rem", color: "red" }}>
                  {errors?.planOrder?.message}
                </Typography>
              </RadioGroup>
            )}
          />
        </Box>
        {/* video recording */}
        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Video Recording</Typography>
          <Controller
            name="videoRecording"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost.video_recording : ""
            } //insert props.description
            rules={{
              required: {
                value: true,
                message: "*Choose one",
              },
            }}
            render={({ field: { value, onChange } }) => (
              <RadioGroup
                // row
                // aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={onChange}
              >
                <FormControlLabel
                  control={
                    <Radio
                      value={1}
                      // checked={statusValue === "active"}
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  control={
                    <Radio
                      value={0}
                      // checked = { props.editMediaType === "2"}
                      // checked={statusValue === "inactive"}
                    />
                  }
                  label="No"
                />
                <Typography sx={{ fontSize: "1rem", color: "red" }}>
                  {errors?.videoRecording?.message}
                </Typography>
              </RadioGroup>
            )}
          />
        </Box>

        {/* is active */}
        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Subscription Status</Typography>
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
                // row
                // aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={onChange}
              >
                <FormControlLabel
                  control={
                    <Radio
                      value={1}
                      // checked={statusValue === "active"}
                    />
                  }
                  label="Active"
                />
                <FormControlLabel
                  control={
                    <Radio
                      value={2}
                      // checked = { props.editMediaType === "2"}
                      // checked={statusValue === "inactive"}
                    />
                  }
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

export default TrainingForm;
