import {
  Button,
  Checkbox,
  CircularProgress,
  MenuItem,
  Alert,
  IconButton,
  Collapse,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { fetchCourseTypeAsync } from "../../../../redux/thunk/Course";
import { FormStyle } from "./FormStyle";
import { getCookie } from "../../../../Utils/GetCookies";

function CourseFormComponent(props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      myRadio: props.edit === "edit" ? props.editMediaType : "",
      week:
        props.edit === "edit" &&
        props.studyWeek !== undefined &&
        props.studyWeek !== null
          ? props.studyWeek.map((w, index) => ({
              Sunday: w.days.includes("Sunday"),
              Monday: w.days.includes("Monday"),
              Tuesday: w.days.includes("Tuesday"),
              Wednesday: w.days.includes("Wednesday"),
              Thursday: w.days.includes("Thursday"),
              Friday: w.days.includes("Friday"),
              Saturday: w.days.includes("Saturday"),
              Sundaydescription: w.days.includes("Sunday")
                ? w.day_description[w.days.indexOf("Sunday")].join("\n")
                : "",

              Mondaydescription: w.days.includes("Monday")
                ? w.day_description[w.days.indexOf("Monday")].join("\n")
                : "",
              Tuesdaydescription: w.days.includes("Tuesday")
                ? w.day_description[w.days.indexOf("Tuesay")].join("\n")
                : "",
              Wednesdaydescription: w.days.includes("Wednesday")
                ? w.day_description[w.days.indexOf("Wednesday")].join("\n")
                : "",
              Thursdaydescription: w.days.includes("Thursday")
                ? w.day_description[w.days.indexOf("Thursday")].join("\n")
                : "",
              Fridaydescription: w.days.includes("Friday")
                ? w.day_description[w.days.indexOf("Friday")].join("\n")
                : "",
              Saturdaydescription: w.days.includes("Saturday")
                ? w.day_description[w.days.indexOf("Saturday")].join("\n")
                : "",
              time: w.time,
              name: w.name,
            }))
          : [{}],
    },
  });

  const { courseType, courseStatus } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  const [startFetch, setStartFetch] = useState(true);

  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dataList = {
    name: "",
    fees: "",
    oversea_fees: "",
    course_type_id: "",
    description: "",
    start_date: "",
    study_day: null,
    duration: "",
    isActive: "",
    study_time: null,
    accept_student_no: "",
    flexible_date: "",
    discount_status: "",
    discount_percent: null,
    discount_number: null,
    installment_plan: "",
    installment_fees: null,
    mocktest_count: null,
    study_weeks: [],
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "week",
  });
  const [open, setOpen] = React.useState(true);
  const filedsWatch = useWatch({
    control, // Pass the control object to useWatch
    name: "week",
    defaultValue: fields,
  });

  const addField = () => {
    append({
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
    });
  };

  const removeField = (index) => {
    remove(index);
  };

  useEffect(() => {
    if (startFetch) {
      dispatch(fetchCourseTypeAsync("course-types"));
      setStartFetch(false);
    }
    // dispatch(fetchCourseTypeAsync("course-types"));
  }, [startFetch, dispatch]);
  const path =
    props.edit === "edit"
      ? props.addPath + "/" + props.editPost.id
      : props.addPath;

  // const radioValue = watch("myRadio");
  // const statusValue = watch("statusValue");
  // const date = watch("startDate");
  const flexibleDate = watch("flexibleDate");
  const discountStatus = watch("discountStatus");
  const installmentStatus = watch("installmentStatus");
  const courseTypeId = watch("courseType");

  // add post function for create post
  const addPost = async () => {
    setLoading(true);
    let token = await getCookie("userToken");

    let config = { headers: { Authorization: "Bearer " + token } };
    const res = await axios
      .post(`${backendURL}${path}`, dataList, config)
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx

          swal({
            title: "Warning",
            text: error.message,
            icon: "warning",
            button: "OK!",
            timer: 1500,
          });
          setLoading(false);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js

          swal({
            title: "Warning",
            text: error.message,
            icon: "warning",
            button: "OK!",
            timer: 1500,
          });
          setLoading(false);
        } else {
          // Something happened in setting up the request that triggered an Error

          swal({
            title: "Warning",
            text: error.message,
            icon: "warning",
            button: "OK!",
            timer: 1500,
          });
          setLoading(false);
        }
      });

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
      setLoading(false);
    }
  };
  const editPost = async () => {
    setLoading(true);
    let token = await getCookie("userToken");

    let config = { headers: { Authorization: "Bearer " + token } };
    const res = await axios
      .put(`${backendURL}${path}`, dataList, config)
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx

          swal({
            title: "Warning",
            text: error.message,
            icon: "warning",
            button: "OK!",
            timer: 1500,
          });
          setLoading(false);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          swal({
            title: "Warning",
            text: error.message,
            icon: "warning",
            button: "OK!",
            timer: 1500,
          });
          setLoading(false);
        } else {
          // Something happened in setting up the request that triggered an Error
          swal({
            title: "Warning",
            text: error.message,
            icon: "warning",
            button: "OK!",
            timer: 1500,
          });
          setLoading(false);
        }
      });

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
      setLoading(false);
    }
  };

  const saveType = (data) => {
    dataList.name = data.name;
    dataList.fees = data.fees;
    dataList.oversea_fees = data.overseaFees;
    dataList.description = data.description;
    dataList.course_type_id = data.courseType;

    data.week.forEach((w, index) => {
      let studyWeeks = {
        week_name: "",
        days: [],
        dayDescription: [],
        time: "",
      };
      studyWeeks["week_name"] = w.name;
      Object.entries(w).forEach(([key, value]) => {
        if (value === true) {
          studyWeeks["days"].push(key);
          studyWeeks["dayDescription"].push(
            w[key + "description"].split("\n").filter((item) => item !== "")
          );
        }
      });
      studyWeeks["time"] = w.time;
      dataList.study_weeks[index] = studyWeeks;
    });

    if (courseTypeId === 1) {
      dataList.mocktest_count = data.mockTest;
    }

    // if (data.myRadio === "2") {
    //   dataList.subscription_plan_id = data.subscription;
    // }
    dataList.flexible_date = parseInt(data.flexibleDate);
    if (flexibleDate == 0) {
      let studyDay = [];
      for (const key in data) {
        if (key.includes("day") && data[key] === true) {
          studyDay.push(key);
        }
      }
      dataList.study_day = JSON.stringify(studyDay);
      dataList.study_time = data.studyTime;
      if (typeof data.startDate === "string") {
        dataList.start_date = data.startDate;
      } else {
        dataList.start_date = data.startDate.format("YYYY-MM-DD");
      }
    }

    if (discountStatus == 1) {
      dataList.discount_status = 1;
      dataList.discount_percent = parseInt(data.discountPercent);
      dataList.discount_number = parseInt(data.numberOfDiscount);
    } else {
      dataList.discount_status = 0;
    }
    dataList.installment_plan = parseInt(data.installmentStatus);
    if (installmentStatus == 1) {
      dataList.installment_fees = parseInt(data.installmentFees);
    }
    dataList.duration = data.duration;
    dataList.isActive = parseInt(data.statusValue);
    dataList.accept_student_no = parseInt(data.studentNumber);

    props.edit === "edit" ? editPost() : addPost();
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
              maxLength: {
                value: 60,
                message: "*Name must be within 60 characters",
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
              // <TextField
              //   {...field}
              //   inputRef={ref}
              //   id="name"
              //   type="text"
              //   variant="outlined"
              //   fullWidth
              //   error={!!errors.name}
              //   label={<Typography variant="h6">Name</Typography>}
              //   sx={{ my: 1, bgcolor: "rgb(231 239 254)" }}
              //   helperText={errors?.name?.message}
              // />
            )}
          />
        </Box>

        {/* Installment plan */}
        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Installment plan</Typography>
          <Controller
            name="installmentStatus"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost?.installment_plan : ""
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
                  {errors?.installmentStatus?.message}
                </Typography>
              </RadioGroup>
            )}
          />
        </Box>
        {/*installment fees */}
        {installmentStatus == 1 && (
          <Box sx={{ my: 2 }}>
            <Controller
              name="installmentFees"
              control={control}
              defaultValue={
                props.edit === "edit" ? props.editPost.installment_fees : ""
              } //insert props.title
              rules={{
                required: {
                  value: true,
                  message: "*Installment Fees is required",
                },
              }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  id="installmentFees"
                  type="number"
                  fullWidth
                  error={!!errors.installment_fees}
                  label={<Typography variant="h6">Installment Fees</Typography>}
                  InputProps={{
                    sx: {
                      ...FormStyle.inputStyle,
                    },
                  }}
                  helperText={errors?.installment_fees?.message}
                />
              )}
            />
          </Box>
        )}

        {/* fees */}
        <Box sx={{ my: 2 }}>
          <Controller
            name="fees"
            control={control}
            defaultValue={props.edit === "edit" ? props.editPost.fees : ""} //insert props.title
            rules={{
              required: {
                value: true,
                message: "*Fees is required",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="fees"
                type="number"
                fullWidth
                error={!!errors.fees}
                label={<Typography variant="h6">Fees</Typography>}
                InputProps={{
                  sx: {
                    ...FormStyle.inputStyle,
                  },
                }}
                helperText={errors?.fees?.message}
              />
            )}
          />
        </Box>
        {/*oversea fees */}
        <Box sx={{ my: 2 }}>
          <Controller
            name="overseaFees"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost.oversea_fees : ""
            } //insert props.title
            rules={{
              required: {
                value: true,
                message: "*Oversea Fees is required",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="overseaFees"
                type="number"
                fullWidth
                error={!!errors.overseaFees}
                label={
                  <Typography variant="h6">Oversea Fees in AUD</Typography>
                }
                InputProps={{
                  sx: {
                    ...FormStyle.inputStyle,
                  },
                }}
                helperText={errors?.overseaFees?.message}
              />
            )}
          />
        </Box>
        {/* Discount Status */}
        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Discount Status</Typography>
          <Controller
            name="discountStatus"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost?.discount_status : ""
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
                  {errors?.discountStatus?.message}
                </Typography>
              </RadioGroup>
            )}
          />
        </Box>
        {discountStatus == 1 && (
          <>
            {/*discount fees */}

            <Box sx={{ my: 2 }}>
              <Controller
                name="discountPercent"
                control={control}
                defaultValue={
                  props.edit === "edit" ? props.editPost.discount_percent : ""
                } //insert props.title
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
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    id="discountPercent"
                    type="number"
                    fullWidth
                    error={!!errors.discountPercent}
                    label={
                      <Typography variant="h6">Discount Percent</Typography>
                    }
                    InputProps={{
                      sx: {
                        ...FormStyle.inputStyle,
                      },
                    }}
                    helperText={errors?.discountPercent?.message}
                  />
                )}
              />
            </Box>

            {/*number of discount  */}
            <Box sx={{ my: 2 }}>
              <Controller
                name="numberOfDiscount"
                control={control}
                defaultValue={
                  props.edit === "edit" ? props.editPost.discount_number : ""
                } //insert props.title
                rules={{
                  required: {
                    value: true,
                    message: "*Discount number is required",
                  },
                }}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    id="discountNumber"
                    type="number"
                    fullWidth
                    error={!!errors.numberOfDiscount}
                    label={
                      <Typography variant="h6">Number of Discount</Typography>
                    }
                    InputProps={{
                      sx: {
                        ...FormStyle.inputStyle,
                      },
                    }}
                    helperText={errors?.numberOfDiscount?.message}
                  />
                )}
              />
            </Box>
          </>
        )}

        {/* course TYPE */}
        <Box sx={{ my: 2 }}>
          {courseStatus === "succeeded" && courseType !== undefined && (
            <Controller
              name="courseType"
              control={control}
              defaultValue={
                props.edit === "edit" ? props.editPost.course_type_id : ""
              }
              rules={{
                required: {
                  value: true,
                  message: "*Course Type is required",
                },
              }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  id="courseType"
                  select
                  variant="outlined"
                  error={!!errors.courseType}
                  label={<Typography variant="h6">Course Type </Typography>}
                  InputProps={{
                    sx: {
                      ...FormStyle.inputStyle,
                    },
                  }}
                  fullWidth
                  helperText={errors?.courseType?.message}
                >
                  {courseStatus === "succeeded" && courseType !== undefined ? (
                    courseType.map((c, index) => (
                      <MenuItem key={index} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
                </TextField>
              )}
            />
          )}
        </Box>
        {/*mock test count */}
        {courseTypeId === 1 && (
          <Box sx={{ my: 2 }}>
            <Controller
              name="mockTest"
              control={control}
              defaultValue={
                props.edit === "edit" ? props.editPost.mocktest_count : ""
              } //insert props.title
              rules={{
                required: {
                  value: true,
                  message: "*Mock Test Count is required",
                },
              }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  id="mocktest"
                  type="number"
                  fullWidth
                  error={!!errors.mockTest}
                  label={<Typography variant="h6">Mock Test</Typography>}
                  InputProps={{
                    sx: {
                      ...FormStyle.inputStyle,
                    },
                  }}
                  helperText={errors?.mockTest?.message}
                />
              )}
            />
          </Box>
        )}
        {/* description */}
        <Box sx={{ my: 2 }}>
          <Controller
            name="description"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost.description : ""
            } //insert props.description
            rules={{
              required: {
                value: true,
                message: "*Description is required",
              },
              maxLength: {
                value: 60,
                message: "*Description must be within 60 characters",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="description"
                type="text"
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                error={!!errors.description}
                label={<Typography variant="h6">Description </Typography>}
                InputProps={{
                  sx: {
                    ...FormStyle.inputStyle,
                  },
                }}
                helperText={errors?.description?.message}
              />
            )}
          />
        </Box>

        {/* flexible date */}
        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Flexible Date</Typography>
          <Controller
            name="flexibleDate"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost?.flexible_date : ""
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
                  {errors?.unlimitedStatus?.message}
                </Typography>
              </RadioGroup>
            )}
          />
        </Box>
        {/* start date & duration */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {flexibleDate == "0" && (
            <Box sx={{ my: 2, width: "40%" }}>
              <Controller
                name="startDate"
                control={control}
                defaultValue={
                  props.edit === "edit" ? props.editPost.start_date : ""
                } //insert props.description
                rules={{
                  required: {
                    value: true,
                    message: "*Date is required",
                  },
                }}
                render={({ field: { onChange } }) => (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        border: 0,
                        backgroundColor: "black",
                      },
                      "& .MuiInputBase-root ": {
                        backgroundColor: "black",
                      },
                    }}
                  >
                    {/* <DateCalendar
                  label="Start Date"
                  selected={value}
                  onChange={onChange}
                /> */}
                    <DatePicker
                      format="YYYY-MM-DD"
                      label={<Typography variant="h6">Start Date</Typography>}
                      onChange={onChange}
                      error={!!errors.startDate}
                      defaultValue={
                        props.edit === "edit"
                          ? dayjs(props.editPost.start_date)
                          : ""
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: !!errors.startDate,
                          helperText: errors?.startDate?.message,
                        },
                      }}
                      sx={{
                        borderRadius: "1rem",
                        "& .MuiInputBase-root ": {
                          ...FormStyle.inputStyle,
                        },

                        "& .MuiOutlinedInput-root": {
                          borderRadius: "inherit",
                        },
                      }}
                      // disablePast
                    ></DatePicker>
                  </LocalizationProvider>
                )}
              />
            </Box>
          )}

          <Box sx={{ my: 2, width: "40%" }}>
            <Controller
              name="duration"
              control={control}
              //insert props.description
              defaultValue={
                props.edit === "edit" ? props.editPost.duration : ""
              }
              rules={{
                required: {
                  value: true,
                  message: "*Duration is required",
                },
              }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  id="duration"
                  type="text"
                  variant="outlined"
                  fullWidth
                  error={!!errors.duration}
                  label={<Typography variant="h6">Duration</Typography>}
                  InputProps={{
                    sx: {
                      ...FormStyle.inputStyle,
                    },
                  }}
                  helperText={errors?.duration?.message}
                />
              )}
            />
          </Box>
        </Box>

        {/* study days */}
        {((props.edit === "edit" &&
          props.editPost?.flexible_date === 0 &&
          props.editPost?.study_day !== undefined) ||
          flexibleDate === "0") && (
          <>
            <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
              <Typography variant="h6">Study days</Typography>
              {week.map((day, index) => (
                <Controller
                  key={index}
                  name={day}
                  control={control}
                  defaultValue={
                    props.edit === "edit"
                      ? props.editPost?.study_day !== null
                        ? (props.editPost?.study_day).includes(day)
                        : false
                      : false
                  }
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      label={day}
                      control={<Checkbox checked={value} onChange={onChange} />}
                    ></FormControlLabel>
                  )}
                ></Controller>
              ))}
            </Box>
            {/* study time */}
            <Box sx={{ my: 2 }}>
              <Controller
                name="studyTime"
                control={control}
                defaultValue={
                  props.edit === "edit" ? props.editPost.study_time : ""
                } //insert props.title
                rules={{
                  required: {
                    value: true,
                    message: "*Time is required",
                  },
                }}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    id="studyTime"
                    type="text"
                    fullWidth
                    error={!!errors.studyTime}
                    label={<Typography variant="h6">Study Time</Typography>}
                    helperText={errors?.studyTime?.message}
                    InputProps={{
                      sx: {
                        ...FormStyle.inputStyle,
                      },
                    }}
                  />
                )}
              />
            </Box>
          </>
        )}

        {/* accept_student_number*/}
        <Box sx={{ my: 2 }}>
          <Controller
            name="studentNumber"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost.accept_student_no : ""
            } //insert props.title
            rules={{
              required: {
                value: true,
                message: "*Accept student number is required",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="studentNumber"
                type="number"
                fullWidth
                error={!!errors.studentNumber}
                label={
                  <Typography variant="h6">Accept Student Number</Typography>
                }
                InputProps={{
                  sx: {
                    ...FormStyle.inputStyle,
                  },
                }}
                helperText={errors?.studentNumber?.message}
              />
            )}
          />
        </Box>

        {/* SUBSCRIPTION PLAN */}

        {/* <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Add subscription plan?</Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              control={
                <Radio
                  {...register("myRadio", { required: true })}
                  value="1"
                  checked={radioValue === "1"}
                />
              }
              label="Yes"
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
              label="No"
            />
          </RadioGroup>
        </Box>

        {radioValue === "1" && (
          <Box sx={{ my: 2 }}>
            <Controller
              name="subscription"
              control={control}
              defaultValue={props.edit === "edit" ? props.editSubscription : ""} //insert props.content
              rules={{
                required: {
                  value: true,
                  message: "*subscription is required",
                },
              }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  id="subscription"
                  select
                  variant="outlined"
                  error={!!errors.subscription}
                  label={
                    <Typography variant="h6">Subscription plan</Typography>
                  }
                  InputProps={{
                    sx: { ...FormStyle.inputStyle },
                  }}
                  fullWidth
                  helperText={errors?.subscription?.message}
                >
                  <MenuItem value="1">Plan 1</MenuItem>
                  <MenuItem value="2">Plan 2</MenuItem>
                  <MenuItem value="3">Plan 3</MenuItem>
                </TextField>
              )}
            />
          </Box>
        )} */}

        <Box sx={{ width: "100%" }}>
          {fields.length > 0 && (
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
                  sx={{
                    mb: 2,
                    color: "red",
                    fontSize: "1rem",
                    bgcolor: "#ffea00",
                  }}
                >
                  Please be sure to press enter to skip to new line after each
                  infromation if you are adding{" "}
                  <span style={{ fontWeight: "bold" }}>Day Description </span>
                  <br />
                  for example:
                  <br />
                  Read Aloud
                  <br />
                  Repeat Sentence
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
          {fields.map((field, index) => (
            <Box key={field.id} sx={{ py: 2 }}>
              <Typography variant="h5">Study Week {index + 1}</Typography>

              <Box sx={{ my: 2 }}>
                <Controller
                  name={`week[${index}].name`}
                  control={control}
                  defaultValue={
                    props.edit === "edit" ? props.editPost.name : ""
                  } //insert props.title
                  rules={{
                    required: {
                      value: true,
                      message: "*Week Name is required",
                    },
                  }}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      id="name"
                      type="text"
                      fullWidth
                      error={!!errors?.week?.[index]?.name}
                      label="Week Name (e.g:Week-1 or Week2-3)"
                      helperText={errors?.week?.[index]?.name?.message}
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
                <Controller
                  name={`week[${index}].time`}
                  control={control}
                  defaultValue={
                    props.edit === "edit" ? props.editPost.name : ""
                  } //insert props.title
                  rules={{
                    required: {
                      value: true,
                      message: "*Time is required",
                    },
                  }}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      id="name"
                      type="text"
                      fullWidth
                      error={!!errors?.week?.[index]?.time}
                      label="Class time (e.g:8am-10am or 7pm-9pm)"
                      helperText={errors?.week?.[index]?.time?.message}
                      InputProps={{
                        sx: {
                          ...FormStyle.inputStyle,
                        },
                      }}
                    />
                  )}
                />
              </Box>

              {week.map((day, id) => (
                <Box key={id}>
                  <Box sx={{ width: "100%" }}>
                    <Controller
                      key={id}
                      name={`week[${index}].${day}`}
                      control={control}
                      defaultValue={field.name}
                      render={({ field: { value, onChange } }) => (
                        <FormControlLabel
                          label={day}
                          control={
                            <Checkbox checked={value} onChange={onChange} />
                          }
                        ></FormControlLabel>
                      )}
                    ></Controller>
                  </Box>

                  {filedsWatch?.[index]?.[day] === true && (
                    <Box sx={{ width: "100%" }}>
                      <Controller
                        name={`week[${index}].${day}description`}
                        control={control}
                        defaultValue={props.edit === "edit" ? "" : ""} //insert props.description
                        rules={{
                          required: {
                            value: true,
                            message: "*List description is required",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            onChange={(e) => {
                              const lines = e.target.value.split("\n");
                              const truncatedLines = lines.map((line) =>
                                line.slice(0, 40)
                              );
                              const truncatedValue = truncatedLines.join("\n");
                              if (lines?.length > 7) {
                                const sliceArray = truncatedLines.slice(0, 7);
                                const sliceValue = sliceArray.join("\n");
                                return field.onChange(sliceValue);
                              } else {
                                return field.onChange(truncatedValue);
                              }
                            }}
                            id="dayDescription"
                            type="text"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={6}
                            error={!!errors.description}
                            label={
                              <Typography
                                variant="h6"
                                sx={{ whiteSpace: "pre-wrap" }}
                              >
                                Day Description(max 40 characters per each
                                line.maximum 7 lines)
                              </Typography>
                            }
                            InputProps={{
                              sx: {
                                ...FormStyle.inputStyle,
                              },
                            }}
                            helperText={errors?.description?.message}
                          />
                        )}
                      />
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", my: 2 }}>
          <Button type="button" variant="contained" onClick={addField}>
            Add Week
          </Button>

          {fields.length > 1 && (
            <Button
              sx={{ mx: 1 }}
              type="button"
              variant="contained"
              onClick={() => removeField(fields.length - 1)}
            >
              Remove Week
            </Button>
          )}
        </Box>
        {/* is active */}
        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Course Status</Typography>
          <Controller
            name="statusValue"
            control={control}
            defaultValue={props.edit === "edit" ? props.editPost.isActive : ""}
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
                defaultValue={
                  props.edit === "edit" ? props.editPost.isActive : ""
                }
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

export default CourseFormComponent;
