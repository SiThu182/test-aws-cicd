import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import { fetchUserAsync } from "../../../redux/thunk/Users";
import { ProfileStyle } from "./ProfileStyle";
import { getCookie } from "../../../Utils/GetCookies";

function Security() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const handleClickShowOldPassword = () =>
    setShowOldPassword((showOldPassword) => !showOldPassword);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user === null) {
      let userId = localStorage.getItem("userId");
      dispatch(fetchUserAsync(userId));
    }
  }, [dispatch, user]);

  const {
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const password = watch("password", "");

  let dataList = {
    old_password: "",
    new_password: "",
    id: "",
  };

  const submitForm = (data) => {
    setLoading(true);
    let userId = localStorage.getItem("userId");

    dataList.id = userId;
    dataList.old_password = data.oldPassword;
    dataList.new_password = password;
    let token = getCookie("userToken");

    let config = { headers: { Authorization: "Bearer " + token } };
    try {
      axios
        .post(
          process.env.REACT_APP_BACKEND_ADMIN + "reset-user-password",
          dataList,
          config
        )
        .then((response) => {
          if (response.data.status === 1) {
            swal({
              title: "Success",
              text: response.data.message,
              icon: "success",
              button: "OK!",
              timer: 1500,
            });
            setLoading(false);
            reset();
          } else {
            swal({
              title: "Warning",
              text: response.data.message,
              icon: "danger",
              button: "OK!",
              timer: 1500,
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          swal({
            title: "Warning",
            text: error.message,
            icon: "warning",
            button: "OK!",
            timer: 1500,
          });
          setLoading(false);
        });
    } catch (error) {
      swal({
        title: "Warning",
        text: error.message,
        icon: "warning",
        button: "OK!",
        timer: 1500,
      });
      setLoading(false);
    }
  };
  return (
    <div>
      <Card
        sx={{
          mb: 3,

          // background:
          //   "linear-gradient(90deg, rgba(129,147,41,1) 0%, rgba(121,105,9,1) 0%, rgba(48,40,40,1) 0%, rgba(0,212,255,1) 100%)",
        }}
      >
        <CardHeader title="Security"></CardHeader>
      </Card>
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
          {user !== null && user?.data?.image !== null ? (
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
                src={
                  process.env.REACT_APP_BACKEND_URL +
                  "storage/user/" +
                  user.data.image
                }
                style={{ width: "100%", aspectRatio: 1, objectFit: "cover" }}
                alt="user_img"
              />
            </Box>
          ) : (
            <AccountCircleIcon sx={{ fontSize: "5rem" }}></AccountCircleIcon>
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
              <Controller
                name="oldPassword"
                control={control}
                rules={{
                  required: {
                    // value: true,
                    // message: "*Password is required",
                  },
                }}
                defaultValue=""
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" sx={{ width: "25%" }}>
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowOldPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            sx={{ mr: 9 }}
                          >
                            {showOldPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                          <Box
                            sx={{
                              ...ProfileStyle.inputIcon,
                            }}
                            aria-label="lock icon"
                          >
                            <LockIcon sx={{ color: "white", mb: 2 }}></LockIcon>
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    error={!!errors.oldPassword}
                    label="Old Password"
                    sx={{ my: 1, width: "100%" }}
                  />
                )}
              />
              <Box>
                {errors.oldPassword && (
                  <Typography variant="p" color="red" textAlign={"left"}>
                    {errors.oldPassword ? (
                      <small>{errors.oldPassword.message}</small>
                    ) : (
                      ""
                    )}
                    <br />
                  </Typography>
                )}
              </Box>
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
                              ...ProfileStyle.inputIcon,
                            }}
                            aria-label="lock icon"
                          >
                            <LockIcon sx={{ color: "white", mb: 2 }}></LockIcon>
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    error={!!errors.password}
                    label="New Password"
                    sx={{ my: 1, width: "100%" }}
                  />
                )}
              />
              <Box>
                {errors.password && (
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
                name="confirmPassword"
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
                              ...ProfileStyle.inputIcon,
                            }}
                            aria-label="lock icon"
                          >
                            <LockIcon sx={{ color: "white", mb: 2 }}></LockIcon>
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    fullWidth
                    error={!!errors.password}
                    label="Confirm New Password"
                    sx={{ my: 1, width: "100%" }}
                  />
                )}
              />
              {errors.confirmPassword && (
                <Box>
                  <Typography variant="p" color="red" textAlign={"left"}>
                    {errors.confirmPassword ? (
                      <>
                        <small>{errors.confirmPassword.message}</small>
                      </>
                    ) : (
                      ""
                    )}
                    <br />
                    {/* {error === "Unauthorized!"
                      ? "Credentials not match.Please try again."
                      : ""}
                    {error === "timeout exceeded"
                      ? "Server busy,please try again later"
                      : ""}
                    {error === "Network Error"
                      ? "Check network & try again later"
                      : ""} */}
                  </Typography>
                </Box>
              )}
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
    </div>
  );
}

export default Security;
