import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetPassword } from "../../../features/auth/authActions";
// import { fetchUserAsync } from "../../../redux/thunk/users";
import Spinner from "../../Spinner";
import { FormStyle } from "../FormStyle";
import ReusableLayout from "./ReusableLayout";

export default function MediaCard() {
  let { rpLoading, userInfo, rpError } = useSelector((state) => state.auth);

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
  let [clicked, setClicked] = useState(false);
  const password = watch("password", "");

  const navigate = useNavigate();

  //  redirect authenticated user to profile screen
  useEffect(() => {
    if (clicked) {
      if (rpError === null) {
        navigate("/logIn");
        setClicked(false);
      } else {
        reset();
        setClicked(false);
      }
    }
  }, [navigate, clicked, userInfo, rpError, reset]);

  const submitForm = (data) => {
    setClicked(true);

    dispatch(resetPassword(data));
  };
  return (
    <ReusableLayout title={"Reset Your Password"} backPath={"/forgotPassword"}>
      <form onSubmit={handleSubmit(submitForm)}>
        {/* React hook form with material ui */}

        <Controller
          name="security_code"
          control={control}
          rules={{
            required: {
              value: true,
              message: "*code is required",
            },
          }}
          defaultValue=""
          render={({ field: { ref, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              id="code"
              type="number"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              label="Code"
              sx={{ my: 1, bgcolor: "rgb(231 239 254)" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ width: "25%" }}>
                    <Box
                      sx={{
                        ...FormStyle.inputIcon,
                      }}
                      aria-label="lock icon"
                    >
                      <ConfirmationNumberIcon></ConfirmationNumberIcon>
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        {errors.code && (
          <Typography variant="p" color="red" textAlign={"left"}>
            <small>{errors.code.message}</small>
          </Typography>
        )}

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
              fullWidth
              error={!!errors.email}
              label="Email"
              sx={{ my: 1, bgcolor: "rgb(231 239 254)" }}
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
          <Typography variant="p" color="red" textAlign={"left"}>
            <small>{errors.email.message}</small>
          </Typography>
        )}

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
              id="resetPassword"
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
              label="Reset Password"
              sx={{ my: 1, bgcolor: "rgb(231 239 254)", width: "100%" }}
            />
          )}
        />
        <Box>
          {(errors.password || rpError !== null) && (
            <Typography variant="p" color="red" textAlign={"left"}>
              {errors.password ? <small>{errors.password.message}</small> : ""}
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
            // pattern: {
            //   value:
            //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/,
            //   message:
            //     "Must contain minimum 8 characters with at least one upper ,one lower characters, one numbers & one special character",
            // },

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
                ),
              }}
              variant="outlined"
              fullWidth
              error={!!errors.confirmPassword}
              label="Confirm Reset Password"
              sx={{ my: 1, bgcolor: "rgb(231 239 254)", width: "100%" }}
            />
          )}
        />
        {(errors.confirmPassword || rpError !== null) && (
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

              {rpError === "Unauthorized!"
                ? "Credentials not match.Please try again."
                : ""}
              {rpError === "timeout exceeded"
                ? "Server busy,please try again later"
                : ""}
              {rpError === "Network Error"
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
            disabled={rpLoading}
            sx={{ position: "absolute", right: 15 }}
          >
            {rpLoading ? <Spinner /> : "Reset"}
          </Button>
        </Box>
      </form>
    </ReusableLayout>
  );
}
