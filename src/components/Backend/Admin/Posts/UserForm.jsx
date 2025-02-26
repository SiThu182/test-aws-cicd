import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import en from "react-phone-number-input/locale/en";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { fetchAllCountryAsync } from "../../../../redux/thunk/Users";
import { FormStyle } from "./FormStyle";
import TextInput from "./Form/TextInput";
import FileInput from "./Form/FileInput";
import FormRadioGroup from "./Form/RadioGroup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { CountrySelect } from "../../../Formcomponents/CountrySelect";
import {
  isPossiblePhoneNumber,
  formatPhoneNumberIntl,
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input";
import { getCookie } from "../../../../Utils/GetCookies";
import { GenerateRandomPassword } from "../../../../Utils/PasswordGenerator";
import TipTapEditorWithToolbarAndBubbleMenu from "../../../Tiptap/TiptapEditor";

function UserForm(props) {
  const { role } = useSelector((state) => state.user);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      myRadio: props.edit === "edit" ? props.editPost.video_type : "",
    },
  });

  // const type = watch("subscriptionType");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const backendURL = `${process.env.REACT_APP_BACKEND_ADMIN}users`;

  const [fileUrl, setFileUrl] = useState();
  const [showPassword, setShowPassword] = React.useState(false);
  const [autoPassword, setAutoPassword] = React.useState();
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  //for edit smt count for each 4sections
  // const [defaultSmtCount, setDefaultSmtCount] = useState();

  const file = watch("fileUpload");
  const role_input = watch("role");
  const userType = watch("user_type");
  // const addVideo = watch("addVideo");
  // const radioValue = watch("myRadio");
  const password = watch("password");
  const countrySelect = watch("country");
  const passwordSetMethod = watch("passwordSetMethod");
  // const flexibleDate = watch("flexibleDate");

  useEffect(() => {
    dispatch(fetchAllCountryAsync());
  }, [dispatch]);

  useEffect(() => {
    if (props.edit === "edit") {
      setFileUrl(
        `${process.env.REACT_APP_BACKEND_URL}storage/user/${props.editPost.image}`
      );
    }
  }, [props, setValue]);

  useEffect(() => {
    if (file !== undefined && file !== "") {
      setFileUrl("");
      setFileUrl(URL.createObjectURL(file));
    }
  }, [file]);

  useEffect(() => {
    if (props.edit === "" && role === 3) {
      setValue("role", "2");
    }
  }, [props.edit, role, setValue]);

  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (
      props.edit === "edit" &&
      props.editPost?.phone !== null &&
      props.editPost?.phone !== undefined
    ) {
      const phoneNumber = props.editPost.phone.split(" ");
      phoneNumber.shift();
      const resultString = phoneNumber.join("");

      setValue("phone", resultString);
    }
  }, [props, setValue]);
  const addPost = async (request) => {
    setLoading(true);
    let token = getCookie("userToken");
    let config = { headers: { Authorization: "Bearer " + token } };
    try {
      const res = await axios.post(`${backendURL}`, request, config);

      if (res.status === 200) {
        if (res.data.errors) {
          swal({
            title: "Warning",
            text: res.data.errors.email[0],
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
          navigate(-1);
        }

        setLoading(false);
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
        if (res.data.errors) {
          swal({
            title: "Warning",
            text: res.data.errors.email[0],
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
          navigate(-1);
        }

        setLoading(false);
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
  const generatePassword = useCallback(() => {
    let generatePassword = GenerateRandomPassword();
    setValue("autoPassword", generatePassword);
  }, [setValue]);

  useEffect(() => {
    if (passwordSetMethod == 2) {
      generatePassword();
    }
  }, [passwordSetMethod, setValue, generatePassword]);

  const saveType = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("country", data.country);
    const labels = en;
    const country = getCountries().find(
      (country) => labels[country] === countrySelect
    );
    const countryCode = getCountryCallingCode(country);
    if (data.phone !== "" && data.phone !== null && data.phone !== undefined) {
      formData.append(
        "phone",
        formatPhoneNumberIntl("+" + countryCode + data.phone)
      );
    }

    if (data.fileUpload !== undefined) {
      formData.append("image", data.fileUpload);
    }
    if (props.edit !== "edit") {
      if (formData.passwordSetMethod != 1) {
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);
      } else {
        formData.append("password", data.autoPassword);
        formData.append("confirmPassword", data.autoPassword);
      }
    }
    formData.append("status", data.statusValue);
    formData.append("role_id", data.role);
    formData.append("ismart_type", data.ismart_type);
    if (data.role == "3") {
      formData.append("user_type", 1);
    } else {
      if (data["user_type"] == 2) {
        if (typeof data.startDate === "string") {
          formData.append("training_start_date", data.startDate);
        } else {
          formData.append(
            "training_start_date",
            data.startDate.format("YYYY-MM-DD ")
          );
        }

        if (typeof data.endDate === "string") {
          formData.append("training_end_date", data.endDate);
        } else {
          formData.append(
            "training_end_date",
            data.endDate.format("YYYY-MM-DD")
          );
        }
      }

      formData.append("user_type", data.user_type);
    }

    props.edit === "edit" ? editPost(formData) : addPost(formData);
  };

  const isValidatePhone = (value) => {
    if (value !== "") {
      const labels = en;
      const country = getCountries().find(
        (country) => labels[country] === countrySelect
      );
      const countryCode = getCountryCallingCode(country);

      const isValid = isPossiblePhoneNumber(
        "+" + countryCode + value
      ); /* perform your phone number validation logic here */

      // If the phone number is not valid, return an error message
      if (!isValid) {
        return "Phone number is not valid .Please check the select country if not selected, please select the country first and carefully check the phone number.";
      }

      // If the phone number is valid, return true
      return true;
    } else {
      return true;
    }
  };
  const ruleObj = {
    required: {
      value: true,
      message: "*Name is required",
    },
    minLength: {
      value: 5,
      message: "*Name must be at least 5 characters",
    },
  };

  let InputAdorement = () => {
    return (
      <InputAdornment
        position="end"
        sx={
          {
            // width: "25%",
          }
        }
      >
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
          sx={{ mr: 3 }}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
        <Box aria-label="lock icon">
          <LockIcon></LockIcon>
        </Box>
      </InputAdornment>
    );
  };

  let ConfirmInputAdorement = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowConfirmPassword}
          onMouseDown={handleMouseDownConfirmPassword}
          edge="end"
          sx={{ mr: 3 }}
        >
          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
        <Box aria-label="lock icon">
          <LockIcon></LockIcon>
        </Box>
      </InputAdornment>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(saveType)}>
        {/* name */}
        <Box sx={{ my: 2 }}>
          <TextInput
            name="name"
            control={control}
            label="Name"
            type="text"
            rules={ruleObj}
            defaultValue={props.edit === "edit" ? props.editPost.name : ""}
            error={!!errors.name}
            errorMessage={errors?.name?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>
        {/* email */}
        <Box sx={{ my: 2 }}>
          <TextInput
            name="email"
            control={control}
            label="Email"
            type="mail"
            rules={{
              required: {
                value: true,
                message: "*Email is required",
              },
            }}
            defaultValue={props.edit === "edit" ? props.editPost.email : ""}
            error={!!errors.email}
            errorMessage={errors?.email?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>

        <Box sx={{ my: 2 }}>
          <CountrySelect
            name="country"
            label="Choose Country"
            labels={en}
            defaultValue={props.edit === "edit" ? props.editPost.country : ""}
            control={control}
            error={!!errors.country}
            errorMessage={errors?.country?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>

        {/* phone */}
        <Box sx={{ my: 2 }}>
          <TextInput
            name="phone"
            control={control}
            label="Phone (Optional)"
            type={"tel"}
            rules={{
              required: {
                value: false,
              },
              validate: isValidatePhone,
            }}
            defaultValue={""}
            error={!!errors?.phone}
            errorMessage={errors?.phone?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>

        {/* Image */}
        <Box sx={{ my: 2 }}>
          <FormLabel sx={{ mr: 2 }}>Upload Image(Optional)</FormLabel>
          <FileInput
            name="fileUpload"
            control={control}
            acceptType={"image/*"}
            btnStyle={{ color: "white" }}
            error={errors.fileUpload}
            errorMessage={errors?.fileUpload?.message}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            borderRadius: "1rem",
            p: 1,
            backgroundColor: "white",
          }}
        >
          {fileUrl !== undefined && (
            <img
              src={fileUrl}
              style={{ width: "40%", height: "40%" }}
              alt="UploadImg"
            />
          )}
        </Box>
        {props.edit !== "edit" && (
          <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
            <Typography variant="h6">Password Set Method</Typography>
            <FormRadioGroup
              name="passwordSetMethod"
              control={control}
              defaultValue={""}
              rules={{
                required: {
                  value: true,
                  message: "*Choose one",
                },
              }}
              errorMessage={errors?.statusValue?.message}
            >
              {[
                { label: "Auto", value: 1 },
                { label: "Manual", value: 2 },
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
        {props.edit !== "edit" && passwordSetMethod == 2 && (
          <>
            <Box
              sx={{
                my: 2,
              }}
            >
              {/* src= {process.env.REACT_APP_FRONTEND_URL + "Image/Terms.png" }*/}

              <TextInput
                name="password"
                control={control}
                label="Password"
                type={showPassword ? "text" : "password"}
                rules={{
                  required: {
                    value: true,
                    message: "*password is required",
                  },
                  pattern: {
                    value:
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    message:
                      "Must contain minimum 8 characters with at least one upper ,one lower characters, one numbers & one special character",
                  },
                }}
                defaultValue=""
                error={!!errors?.password}
                errorMessage={errors?.password?.message}
                inputStyle={FormStyle.inputStyle}
                inputAdorement={<InputAdorement />}
              />
            </Box>

            <Box
              sx={{
                my: 2,
              }}
            >
              {/* src= {process.env.REACT_APP_FRONTEND_URL + "Image/Terms.png" }*/}

              <TextInput
                name="confirmPassword"
                control={control}
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                rules={{
                  required: {
                    value: true,
                    message: "*Confirm password is required",
                  },
                  validate: (value) =>
                    value === password || "The passwords do not match",
                }}
                defaultValue=""
                error={!!errors?.confirmPassword}
                errorMessage={errors?.confirmPassword?.message}
                inputStyle={FormStyle.inputStyle}
                inputAdorement={<ConfirmInputAdorement />}
              />
            </Box>
          </>
        )}
        {props.edit !== "edit" && passwordSetMethod == 1 && (
          <>
            <Box
              sx={{
                my: 2,
              }}
            >
              {/* src= {process.env.REACT_APP_FRONTEND_URL + "Image/Terms.png" }*/}

              <TextInput
                name="autoPassword"
                control={control}
                label="Password"
                type={showPassword ? "text" : "password"}
                rules={{
                  required: {
                    value: true,
                    message: "*password is required",
                  },
                  pattern: {
                    value:
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    message:
                      "Must contain minimum 8 characters with at least one upper ,one lower characters, one numbers & one special character",
                  },
                }}
                defaultValue=""
                error={!!errors?.password}
                errorMessage={errors?.password?.message}
                inputStyle={FormStyle.inputStyle}
                inputAdorement={<InputAdorement />}
              />
              <Button
                variant="contained"
                onClick={() => generatePassword()}
                sx={{ my: 2 }}
              >
                Regenerate Password
              </Button>
            </Box>
          </>
        )}
        {/* is active */}
        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Active Status</Typography>
          <FormRadioGroup
            name="statusValue"
            control={control}
            defaultValue={props.edit === "edit" ? props.editPost.status : ""}
            rules={{
              required: {
                value: true,
                message: "*Choose one",
              },
            }}
            errorMessage={errors?.statusValue?.message}
          >
            {[
              { label: "Active", value: 1 },
              { label: "Inactive", value: 2 },
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
        {/* Role id */}

        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Role</Typography>
          <FormRadioGroup
            name="role"
            control={control}
            defaultValue={props.edit === "edit" ? props.editPost.role_id : ""}
            rules={{
              required: {
                value: true,
                message: "*Choose one",
              },
            }}
            errorMessage={errors?.role?.message}
          >
            {[
              { label: "Admin", value: 3 },
              { label: "User", value: 2 },
            ].map((r, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio value={r.value} disabled={role !== 1 ? true : false} />
                }
                label={r.label}
              />
            ))}
          </FormRadioGroup>
        </Box>

        {role_input == "2" && (
          <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
            <Typography variant="h6">User Type</Typography>
            <FormRadioGroup
              name="user_type"
              control={control}
              defaultValue={
                props.edit === "edit" ? props.editPost.user_type : ""
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
                { label: "Smart Student", value: 2 },
                { label: "Teacher", value: 3 },
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

        {role_input == "2" && userType == "2" && (
          <>
            <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
              <Typography variant="h6">Ismart Student Type</Typography>
              <FormRadioGroup
                name="ismart_type"
                control={control}
                defaultValue={
                  props.edit === "edit"
                    ? props.editPost.ismart_student_type
                    : ""
                }
                rules={{
                  required: {
                    value: true,
                    message: "*Choose one",
                  },
                }}
                errorMessage={errors?.ismart_type?.message}
              >
                {[
                  { label: "VIP", value: "VIP" },
                  { label: "Normal", value: "Normal" },
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

            {/* training start date & end date */}
            <Box
              sx={{
                ...FormStyle.inputStyle,
                my: 2,
                p: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {/* */}
              <Box sx={{ my: 2, width: "40%" }}>
                <Controller
                  name="startDate"
                  control={control}
                  defaultValue={
                    props.edit === "edit"
                      ? props.editPost.training_start_date
                      : ""
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
                            ? dayjs(props.editPost.training_start_date)
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
              <Box sx={{ my: 2, width: "40%" }}>
                <Controller
                  name="endDate"
                  control={control}
                  defaultValue={
                    props.edit === "edit"
                      ? props.editPost.training_end_date
                      : ""
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
                        label={<Typography variant="h6">End Date</Typography>}
                        onChange={onChange}
                        error={!!errors.startDate}
                        defaultValue={
                          props.edit === "edit"
                            ? dayjs(props.editPost.training_end_date)
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
            </Box>
          </>
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
        {/* <TipTapEditorWithToolbarAndBubbleMenu /> */}
      </form>
    </>
  );
}

export default UserForm;
