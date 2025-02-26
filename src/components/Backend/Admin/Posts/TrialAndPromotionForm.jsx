import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { FormStyle } from "./FormStyle";
import TextInput from "./Form/TextInput";
import FormRadioGroup from "./Form/RadioGroup";
import { getCookie } from "../../../../Utils/GetCookies";

function TrialAndPromotionForm(props) {
  const {
    handleSubmit,
    control,

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
  const mtUnlimitedStatus = watch("mtUnlimitedStatus");
  // const discountStatus = watch("discountStatus");

  // const languageTypeId = watch("languageType");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [pUnlimitedStatus, setPUnlimitedStatus] = useState(
    props.editPost.limited_status
  );
  const [mockTestUnlimitedStatus, setMockTestUnlimitedStatus] = useState(
    props.editPost.mt_limited_status
  );

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  const path = props.addPath;

  useEffect(() => {
    if (props.editPost !== null) {
      setPUnlimitedStatus(props.editPost?.limited_status);
      setMockTestUnlimitedStatus(props.editPost?.mt_limited_status);
    }
  }, [props.editPost]);

  useEffect(() => {
    setPUnlimitedStatus(uStatus);
  }, [uStatus]);

  useEffect(() => {
    setMockTestUnlimitedStatus(mtUnlimitedStatus);
  }, [mtUnlimitedStatus]);
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
    fees: 0,
    oversea_fees: 0,
    discount_status: 0,
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
    frontend_status: 0,
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
    dataList.plan_type_id = props.editPost.plan_type_id;

    let description = [];
    data.description.forEach((d) => {
      description = [...description, d.name];
    });
    dataList.description = JSON.stringify(description);

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
              minLength: {
                value: 5,
                message: "*Name must be at least 5 characters",
              },
            }}
            defaultValue={props.edit === "edit" ? props.editPost.name : ""}
            error={!!errors.name}
            errorMessage={errors?.name?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>
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
        {uStatus == "0" && (
          <Box sx={{ my: 2 }}>
            <TextInput
              name="scoreTime"
              control={control}
              label="Score Tokens"
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
              errorMessage={errors.scoreTime?.message}
              inputStyle={FormStyle.inputStyle}
            />
          </Box>
        )}
        {uStatus == "1" && (
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

        {mtUnlimitedStatus == "0" && (
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
        {mtUnlimitedStatus == "1" && (
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
              <TextInput
                key={field.id}
                name={`description[${index}].name`}
                control={control}
                label={
                  <Typography variant="h5">
                    Description {index + 1}
                    {!!errors?.description?.[index]?.name === true && (
                      <small>{errors.description?.[index]?.name.message}</small>
                    )}
                  </Typography>
                }
                type="text"
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
                defaultValue={field.name}
                error={!!errors?.description?.[index]?.name}
                errorMessage={errors.description?.[index]?.name.messagee}
                inputStyle={(FormStyle.inputStyle, { my: 2 })}
              />
            ))}
          </Box>
        </Box>
        {/* add or remove btn */}
        {fieldList.length < 5 && (
          <Button variant="contained" sx={{ mr: 5, mt: 2 }} onClick={addField}>
            Add
          </Button>
        )}

        <Button variant="contained" sx={{ mt: 2 }} onClick={removeField}>
          Remove
        </Button>
        {/* type */}

        {/* is active */}
        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Subscription Status</Typography>
          <Controller
            name="statusValue"
            control={control}
            defaultValue={props.edit === "edit" ? props.editPostIsActive : ""} //insert props.description
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
                      value={0}
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

export default TrialAndPromotionForm;
