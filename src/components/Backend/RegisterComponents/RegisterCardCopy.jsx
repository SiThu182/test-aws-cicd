import EmailIcon from "@mui/icons-material/Email";
import FlagIcon from "@mui/icons-material/Flag";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Divider,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../../features/auth/authActions";
import { fetchAllCountryAsync } from "../../../redux/thunk/Users";
// import { fetchUserAsync } from "../../../redux/thunk/users";
import Spinner from "../../Spinner";
import { FormStyle } from "../FormStyle";
import TextInput from "../Admin/Posts/Form/TextInput";

export default function MediaCard() {
  let { loading, userInfo, error } = useSelector((state) => state.auth);
  let { allCountry, allCountryStatus } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const password = watch("password", "");

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
    dispatch(registerUser(data));
  };
  return (
    <Box
      sx={{
        // backgroundColor: "rgb(231 239 254)",
        // width: "100%",
        // height: "100vh",
        // py: 4,
        ...FormStyle.bg,
      }}
    >
      {/* <Alert id="alert" onClose={() => close()}>
        This is a success alert — check it out!
      </Alert> */}
      <KeyboardBackspaceIcon
        sx={{ position: "absolute", top: 4, left: "1rem", cursor: "pointer" }}
        onClick={() => navigate(-1)}
      ></KeyboardBackspaceIcon>

      <Card
        sx={{
          // maxWidth: 380,
          // margin: "auto",
          // position: "relative",
          ...FormStyle.card,
          height: "auto",
        }}
      >
        <Box
          sx={{
            ...FormStyle.yellow,
          }}
        />
        <Box
          sx={{
            ...FormStyle.blue,
          }}
        />
        <Box
          sx={{
            ...FormStyle.red,
          }}
        />
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <img
            // src="http://localhost:3000/Image/AigmaLogo.png"
            src={process.env.REACT_APP_FRONTEND_URL + "Image/AigmaLogo.png"}
            alt="pte-logo"
            style={{
              ...FormStyle.img,
            }}
          />
        </Box>

        <CardContent
          sx={{
            // textAlign: "center",
            // "& .MuiTypography-p": {
            //   textAlign: "left",
            // },
            // marginBottom: "0.1rem",
            ...FormStyle.content,
          }}
        >
          <Divider></Divider>
          <Typography
            variant="h5"
            sx={{ ...FormStyle.formHeading }}
            color="text.secondary"
          >
            Register to start your journey
          </Typography>
          <form onSubmit={handleSubmit(submitForm)}>
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
            <Controller
              name="name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "*Name is required",
                },
              }}
              defaultValue=""
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  id="name"
                  type="name"
                  variant="outlined"
                  error={!!errors.email}
                  label="Name"
                  sx={{ bgcolor: "rgb(231 239 254)", width: "100%" }}
                  InputProps={{
                    endAdornment: (
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
            {/* name end */}
            {/* email start */}
            <Controller
              name="email"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "*email is required",
                },
              }}
              defaultValue=""
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  id="email"
                  type="email"
                  variant="outlined"
                  error={!!errors.email}
                  label="Email"
                  sx={{ my: 1, bgcolor: "rgb(231 239 254)", width: "100%" }}
                  InputProps={{
                    endAdornment: (
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
                    ),
                  }}
                />
              )}
            />
            {errors.email && (
              <Box>
                <Typography variant="p" color="red" textAlign={"left"}>
                  <small>{errors.email.message}</small>
                </Typography>
              </Box>
            )}
            <Controller
              name="country"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "*Country is required",
                },
              }}
              defaultValue=""
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  id="name"
                  select
                  variant="outlined"
                  error={!!errors.country}
                  label="Choose Country"
                  sx={{ bgcolor: "rgb(231 239 254)", width: "100%" }}
                  InputProps={{
                    endAdornment: (
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
                    ),
                  }}
                >
                  {allCountryStatus === "succeeded" &&
                    allCountry.data.map((c, index) => (
                      <MenuItem key={index} value={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
                </TextField>
              )}
            />
            {errors.country && (
              <Box sx={{ margin: 0, padding: 0 }}>
                <Typography variant="p" color="red">
                  <small>{errors.country.message}</small>
                </Typography>
              </Box>
            )}
            {/* name end */}
            <Controller
              name="password"
              control={control}
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
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
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
                    ),
                  }}
                  variant="outlined"
                  error={!!errors.password}
                  label="Password"
                  sx={{ my: 1, bgcolor: "rgb(231 239 254)", width: "100%" }}
                />
              )}
            />
            <Box>
              {(errors.password || error !== null) && (
                <Typography variant="p" color="red" textAlign={"left"}>
                  {errors.password ? (
                    <small>{errors.password.message}</small>
                  ) : (
                    ""
                  )}
                  <br />
                </Typography>
              )}
            </Box>
            <Controller
              name="confirm_password"
              control={control}
              rules={{
                required: {
                  value: true,

                  message: "*Confirm Password is required",
                },

                validate: (value) =>
                  value === password || "The passwords do not match",
              }}
              defaultValue=""
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ width: "25%" }}>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                          sx={{ mr: 9 }}
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
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
                    ),
                  }}
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  label="Confirm Password"
                  sx={{ my: 1, bgcolor: "rgb(231 239 254)", width: "100%" }}
                />
              )}
            />
            {(errors.confirm_password || error !== null) && (
              <Box>
                <Typography variant="p" color="red" textAlign={"left"}>
                  {errors.confirm_password ? (
                    <>
                      <small>{errors.confirm_password.message}</small>
                    </>
                  ) : (
                    ""
                  )}
                  <br />
                  {error.includes("Duplicate entry")
                    ? "Mail already taken ."
                    : "Server Error "}
                  {error === "Unauthorized!"
                    ? "Credentials not match.Please try again."
                    : ""}
                  {error === "timeout exceeded"
                    ? "Server busy,please try again later"
                    : ""}
                  {error === "Network Error"
                    ? "Check network & try again later"
                    : ""}
                </Typography>
              </Box>
            )}

            <Box sx={{ width: "100%", display: "flex" }}>
              <Button
                variant="contained"
                type="submit"
                className="button"
                // disabled={loading}
                sx={{ position: "absolute", right: 15 }}
              >
                {loading ? <Spinner /> : "Register"}
              </Button>
            </Box>
          </form>
        </CardContent>
        <CardActions
          sx={{
            ...FormStyle.cardAction,
            mt: 3.5,
          }}
        >
          {/* <Box
              sx={{
                ...FormStyle.terms,
              }}
            >
              <Typography
                sx={{
                  ...FormStyle.termsFont,
                }}
              >
                Terms & Condition
              </Typography>
              <p style={{ mx: "15px" }}> | </p>
              <Typography sx={{ ...FormStyle.termsFont }}>
                Privacy & Policy
              </Typography>
            </Box> */}
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
        </CardActions>
      </Card>
    </Box>
  );
}
