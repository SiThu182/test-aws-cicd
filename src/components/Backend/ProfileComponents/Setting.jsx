import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
// import ImageIcon from "@mui/icons-material/Image";
import PersonIcon from "@mui/icons-material/Person";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  FormLabel,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import {
  fetchAllCountryAsync,
  fetchUserAsync,
} from "../../../redux/thunk/Users";
import en from "react-phone-number-input/locale/en";
import {
  isPossiblePhoneNumber,
  formatPhoneNumberIntl,
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input";
import { ProfileStyle } from "./ProfileStyle";
import { CountrySelect } from "../../Formcomponents/CountrySelect";
import TextInput from "../Admin/Posts/Form/TextInput";
import { getCookie } from "../../../Utils/GetCookies";

function Setting() {
  const backendURL = `${process.env.REACT_APP_BACKEND_ADMIN}users`;
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const [fileUrl, setFileUrl] = React.useState();
  const { user, status, allCountry } = useSelector((state) => state.user);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const countrySelect = watch("country");
  // const file = watch("file");

  useEffect(() => {
    if (user?.data?.phone !== null && user?.data?.phone !== undefined) {
      const phoneNumber = user?.data?.phone.split(" ");
      phoneNumber.shift();
      const resultString = phoneNumber.join("");

      setValue("phone", resultString);
    }
  }, [user, setValue]);

  const submitForm = async (data) => {
    setLoading(true);

    let token = getCookie("userToken");
    let id = localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("country", data.country);
    if (data.phone !== "" && data.phone !== null && data.phone !== undefined) {
      const labels = en;
      const country = getCountries().find(
        (country) => labels[country] === countrySelect
      );
      const countryCode = getCountryCallingCode(country);
      formData.append(
        "phone",
        formatPhoneNumberIntl("+" + countryCode + data.phone)
      );
    }

    formData.append("user_type", user?.data?.user_type);

    if (data.file !== undefined) {
      formData.append("image", data.file);
    }
    formData.append("_method", "PUT");
    let config = { headers: { Authorization: "Bearer " + token } };
    try {
      const res = await axios.post(`${backendURL}/${id}`, formData, config);

      if (res.status === 200) {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          button: "OK!",
          timer: 1500,
        }).then(() => {
          dispatch(fetchUserAsync(id));
        });
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

  useEffect(() => {
    if (user === null) {
      let userId = localStorage.getItem("userId");
      dispatch(fetchUserAsync(userId));
    }
    if (allCountry === null) {
      dispatch(fetchAllCountryAsync());
    }
    if (user?.data?.image !== null) {
      setFileUrl(
        `${process.env.REACT_APP_BACKEND_URL}storage/user/${user?.data?.image}`
      );
    }
  }, [allCountry, dispatch, user]);

  const isValidatePhone = (value) => {
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
      return "Phone number is not valid .Please check the select country if not selected, please select the country first .";
    }

    // If the phone number is valid, return true
    return true;
  };
  return (
    <div>
      <Card
        sx={{
          mb: 2,
          backdropFilter: "blur(50px)",
          // background:
          //   "linear-gradient(90deg, rgba(129,147,41,1) 0%, rgba(121,105,9,1) 0%, rgba(48,40,40,1) 0%, rgba(0,212,255,1) 100%)",
        }}
      >
        <CardHeader title="User Setting"></CardHeader>
      </Card>
      {user !== null && (
        <Box
          sx={{
            ...ProfileStyle.cardBox,
            // background:
            //   "linear-gradient(90deg, rgba(129,147,41,1) 0%, rgba(121,105,9,1) 0%, rgba(48,40,40,1) 0%, rgba(0,212,255,1) 100%)",
          }}
        >
          <Box
            sx={{
              ...ProfileStyle.accountImg,
            }}
          >
            {/* <img src="" alt="" srcset="" /> */}
            {user.data.image !== null ? (
              <Box
                sx={{
                  borderRadius: "50%",
                  width: "5rem",
                  overflow: "hidden",
                  height: "5rem",
                  boxShadow: 5,
                  bordr: "2px solid black",
                }}
              >
                <img
                  src={fileUrl}
                  style={{ width: "100%", aspectRatio: 1, objectFit: "cover" }}
                  alt="user_img"
                />
              </Box>
            ) : (
              <AccountCircleIcon sx={{ fontSize: "7rem" }}></AccountCircleIcon>
            )}
          </Box>
          <Box
            sx={{
              ...ProfileStyle.accountInfo,
            }}
          >
            <form onSubmit={handleSubmit(submitForm)} style={{ width: "100%" }}>
              {/* React hook form with material ui */}
              <Box sx={{ width: "100%" }}>
                {/* userName start*/}
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "*Name is required",
                    },
                  }}
                  defaultValue={user.data.name}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      id="name"
                      type="name"
                      variant="outlined"
                      error={!!errors.email}
                      label="Name"
                      sx={{ width: "100%" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ width: "25%" }}>
                            <Box
                              sx={{
                                ...ProfileStyle.inputIcon,
                              }}
                              aria-label="lock icon"
                            >
                              <PersonIcon
                                sx={{ color: "white", mb: 2 }}
                              ></PersonIcon>
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                {errors.name && (
                  <Box sx={{ margin: 0, padding: 0 }}>
                    <Typography variant="p" color="red">
                      <small>{errors.name.message}</small>
                    </Typography>
                  </Box>
                )}
                {/* country start*/}
                <CountrySelect
                  name="country"
                  label="Choose Country"
                  labels={en}
                  defaultValue={user.data.country}
                  control={control}
                  error={!!errors.country}
                  errorMessage={errors?.country?.message}
                  inputStyle={{ my: 1, width: "100%" }}
                  inputAdorement={
                    <InputAdornment position="end" sx={{ width: "25%" }}>
                      <Box
                        sx={{
                          ...ProfileStyle.inputIcon,
                        }}
                        aria-label="lock icon"
                      >
                        <PersonIcon sx={{ color: "white", mb: 2 }}></PersonIcon>
                      </Box>
                    </InputAdornment>
                  }
                />

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
                  defaultValue=""
                  error={!!errors?.phone}
                  errorMessage={errors?.phone?.message}
                  inputStyle={{ my: 1, width: "100%" }}
                  inputAdorement={
                    <InputAdornment position="end" sx={{ width: "25%" }}>
                      <Box
                        sx={{
                          ...ProfileStyle.inputIcon,
                        }}
                      >
                        <PhoneAndroidIcon
                          sx={{ color: "white", mb: 1 }}
                        ></PhoneAndroidIcon>
                      </Box>
                    </InputAdornment>
                  }
                />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "*email is required",
                    },
                  }}
                  defaultValue={user.data.email}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      id="email"
                      type="email"
                      fullWidth
                      variant="outlined"
                      error={!!errors.email}
                      label="Email"
                      sx={{ my: 1, width: "100%" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ width: "25%" }}>
                            <Box
                              sx={{
                                ...ProfileStyle.inputIcon,
                              }}
                              aria-label="lock icon"
                            >
                              <EmailIcon
                                sx={{ color: "white", mb: 2 }}
                              ></EmailIcon>
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                {errors.email && (
                  <Typography variant="p" color="red" textAlign={"left"}>
                    <small>{errors.email.message}</small>
                  </Typography>
                )}
                {/* Image */}
                <Box sx={{ my: 2 }}>
                  <FormLabel sx={{ mr: 2 }}>Upload Image(Optional)</FormLabel>
                  <Controller
                    name="file"
                    control={control}
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
                            color: "white",
                            backgroundColor: "black",
                            // ...enrollStyle.inputStyle,
                          }}
                        >
                          Upload Image
                        </Button>
                      </label>
                    )}
                  />
                  {errors.file && (
                    <Typography variant="p" color="red" textAlign={"left"}>
                      <small>{errors.file.message}</small>
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box display={"flex"} justifyContent="right">
                <Button
                  id="btnSave"
                  type="submit"
                  variant="contained"
                  disabled={loading ? true : false}
                  sx={{
                    color: "white",
                    bgcolor: "black",
                    "&:hover": {
                      bgcolor: "white",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress
                      sx={{ width: "50%", color: "white", m: "0 auto" }}
                    ></CircularProgress>
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      )}
      {status === "loading" ? (
        <>
          <CircularProgress></CircularProgress>
        </>
      ) : status === "failed" ? (
        <Typography>Failed .Try reloading</Typography>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Setting;
