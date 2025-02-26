import EmailIcon from "@mui/icons-material/Email";
import FlagIcon from "@mui/icons-material/Flag";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import en from "react-phone-number-input/locale/en";
import { IconButton, InputAdornment, Link } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  isPossiblePhoneNumber,
  formatPhoneNumberIntl,
  getCountryCallingCode,
} from "react-phone-number-input";
import { registerUser } from "../../../features/auth/authActions";
import { fetchAllCountryAsync } from "../../../redux/thunk/Users";
// import { fetchUserAsync } from "../../../redux/thunk/users";
import Spinner from "../../Spinner";
import { FormStyle } from "../FormStyle";
import ReusableLayout from "../LogInComponents/ReusableLayout";
import TextInput from "../Admin/Posts/Form/TextInput";
import { CountrySelect } from "../../Formcomponents/CountrySelect";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { getCountries } from "react-phone-number-input";
export default function MediaCard() {
  let { loading, userInfo, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const password = watch("password", "");
  const countrySelect = watch("country");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCountryAsync());
  }, [dispatch]);

  //  redirect authenticated user to profile screen
  useEffect(() => {
    if (error === null && userInfo?.status === 1) {
      if (userInfo) {
        navigate("/verifymail");
      }
    } else {
      reset();
    }
  }, [navigate, userInfo, error, reset]);

  const submitForm = (data) => {
    const labels = en;
    const country = getCountries().find(
      (country) => labels[country] === countrySelect
    );
    const countryCode = getCountryCallingCode(country);

    data.phone = formatPhoneNumberIntl("+" + countryCode + data.phone);

    dispatch(registerUser(data));
  };

  const ActionSection = () => {
    return (
      <Link
        underline="none"
        onClick={() => navigate("/logIn")}
        style={{ textAlign: "center" }}
      >
        <Typography variant="p">
          Already have an account?
          <span
            style={{
              textDecoration: "underline",
              color: "rgb(182 32 35 )",
              cursor: "pointer",
            }}
          >
            Sign in
          </span>
        </Typography>
      </Link>
    );
  };

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
    <ReusableLayout
      form={
        <form onSubmit={handleSubmit(submitForm)} style={{ width: "80%" }}>
          {/* React hook form with material ui */}
          {/* userName start*/}
          <Box sx={{ width: "100%" }}>
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
              defaultValue={""}
              error={!!errors.name}
              errorMessage={errors?.name?.message}
              inputStyle={{
                my: 1,
                bgcolor: "rgb(231 239 254)",
              }}
              inputAdorement={
                <InputAdornment position="end" sx={{ width: "25%" }}>
                  <Box
                    sx={{
                      ...FormStyle.inputIcon,
                    }}
                    aria-label="lock icon"
                  >
                    <PersonIcon></PersonIcon>
                  </Box>
                </InputAdornment>
              }
            />
          </Box>
          {/* name end */}
          {/* email start */}
          <Box sx={{ width: "100%" }}>
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
              defaultValue={""}
              error={!!errors.email}
              errorMessage={errors?.email?.message}
              inputStyle={{
                my: 1,
                bgcolor: "rgb(231 239 254)",
              }}
              inputAdorement={
                <InputAdornment position="end" sx={{ width: "25%" }}>
                  <Box
                    sx={{
                      ...FormStyle.inputIcon,
                    }}
                    aria-label="lock icon"
                  >
                    <EmailIcon></EmailIcon>
                  </Box>
                </InputAdornment>
              }
            />
          </Box>

          <Box sx={{ width: "100%" }}>
            <CountrySelect
              name="country"
              label="Choose Country"
              labels={en}
              defaultValue={""}
              control={control}
              error={!!errors.country}
              errorMessage={errors?.country?.message}
              inputStyle={{ bgcolor: "rgb(231 239 254)", width: "100%" }}
              inputAdorement={
                <InputAdornment position="end" sx={{ width: "25%" }}>
                  <Box
                    sx={{
                      ...FormStyle.inputIcon,
                    }}
                    aria-label="lock icon"
                  >
                    <FlagIcon></FlagIcon>
                  </Box>
                </InputAdornment>
              }
            />
          </Box>

          <Box
            sx={{
              width: "100%",
            }}
          >
            {/* src= {process.env.REACT_APP_FRONTEND_URL + "Image/Terms.png" }*/}
            <TextInput
              name="phone"
              control={control}
              label="Phone"
              type={"tel"}
              rules={{
                required: {
                  value: true,
                  message: "*Phone number is required",
                },
                validate: isValidatePhone,
              }}
              defaultValue=""
              error={!!errors?.phone}
              errorMessage={errors?.phone?.message}
              inputStyle={{ my: 1, bgcolor: "rgb(231 239 254)", width: "100%" }}
              inputAdorement={
                <InputAdornment position="end" sx={{ width: "25%" }}>
                  <Box
                    sx={{
                      ...FormStyle.inputIcon,
                    }}
                    aria-label="lock icon"
                  >
                    <PhoneAndroidIcon></PhoneAndroidIcon>
                  </Box>
                </InputAdornment>
              }
            />
          </Box>
          <Box
            sx={{
              width: "100%",
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
                  message: "*Password is required",
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
              inputStyle={{ my: 1, bgcolor: "rgb(231 239 254)", width: "100%" }}
              inputAdorement={
                <InputAdornment position="end" sx={{ width: "25%" }}>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{ mr: 9 }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  <Box
                    sx={{
                      ...FormStyle.inputIcon,
                    }}
                    aria-label="lock icon"
                  >
                    <LockIcon></LockIcon>
                  </Box>
                </InputAdornment>
              }
            />
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            {/* src= {process.env.REACT_APP_FRONTEND_URL + "Image/Terms.png" }*/}

            <TextInput
              name="confirm_password"
              control={control}
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              rules={{
                required: {
                  value: true,
                  message: "*Confirm Password is required",
                },
                validate: (value) =>
                  value === password || "The passwords do not match",
              }}
              defaultValue=""
              error={!!errors?.confirm_password}
              errorMessage={errors?.confirm_password?.message}
              inputStyle={{ my: 1, bgcolor: "rgb(231 239 254)", width: "100%" }}
              inputAdorement={
                <InputAdornment position="end" sx={{ width: "25%" }}>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    edge="end"
                    sx={{ mr: 9 }}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  <Box
                    sx={{
                      ...FormStyle.inputIcon,
                    }}
                    aria-label="lock icon"
                  >
                    <LockIcon></LockIcon>
                  </Box>
                </InputAdornment>
              }
            />
          </Box>
          {error !== null && (
            <Box>
              {/* <Typography variant="p" color="red" textAlign={"left"}>
                {error.includes("Duplicate entry")
                  ? "Mail already taken ."
                  : error}
                {error === "Unauthorized!"
                  ? "Credentials not match.Please try again."
                  : ""}
                {error === "timeout exceeded"
                  ? "Server busy,please try again later"
                  : ""}
                {error === "Network Error"
                  ? "Check network & try again later"
                  : ""}
              </Typography> */}
            </Box>
          )}
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              type="submit"
              className="button"
              // disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <Spinner /> : "Register"}
            </Button>
          </Box>
        </form>
      }
      actions={<ActionSection />}
      images={[
        // {
        //   label: "10 Day Trial",
        //   imgPath:
        //     process.env.REACT_APP_FRONTEND_URL + "Image/10day-ads-trial.png",
        // },
        // {
        //   label: "AIGMA PTE AI",
        //   imgPath:
        //     process.env.REACT_APP_FRONTEND_URL + "Image/LogIn_Info_Img.png",
        // },

        {
          label: "Aigma Ai",
          imgPath:
            process.env.REACT_APP_FRONTEND_URL + "Image/LogIn_Info_Img (3).png",
        },
        {
          label: "Black Friday",
          imgPath:
            process.env.REACT_APP_FRONTEND_URL + "Image/LogIn_Info_Img (4).png",
        },
      ]}
    />
  );
}
