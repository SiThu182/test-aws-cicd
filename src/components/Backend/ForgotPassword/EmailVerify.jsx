import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EmailIcon from "@mui/icons-material/Email";
import { InputAdornment, TextField, Link, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import * as React from "react";
import { useEffect } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { emailVerify } from "../../../features/auth/authActions";
// import { fetchUserAsync } from "../../../redux/thunk/users";
import { FormStyle } from "../FormStyle";
import ReusableLayout from "./ReusableLayout";
import Spinner from "../../Spinner";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextInput from "../Admin/Posts/Form/TextInput";

export default function EmailVerify() {
  let { rpLoading, userInfo, rpError } = useSelector((state) => state.auth);
  let { resetPassword } = useParams();
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  let [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  //  redirect authenticated user to profile screen
  useEffect(() => {
    if (clicked) {
      if (rpError === null) {
        if (userInfo) {
          navigate("/admin/dashboard");
          setClicked(false);
        }
      } else {
        reset();
        setClicked(false);
      }
    }
  }, [navigate, clicked, userInfo, rpError, reset]);

  const submitForm = (data) => {
    setClicked(true);

    dispatch(
      emailVerify({
        ...data,
        reset: resetPassword === "reset-password" ? true : false,
      })
    );
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
  return (
    <ReusableLayout
      title="Email Verification"
      loading={rpLoading}
      backPath="/logIn"
    >
      <form onSubmit={handleSubmit(submitForm)} style={{ padding: "0 2rem" }}>
        {/* React hook form with material ui */}

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

        {resetPassword === "reset-password" && (
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
        )}
        <Box sx={{ width: "100%", display: "flex" }}>
          <Button
            variant="contained"
            type="submit"
            className="button"
            disabled={rpLoading}
            sx={{ position: "absolute", right: 15 }}
          >
            {rpLoading ? <Spinner /> : "Verify"}
          </Button>
        </Box>
        <Box sx={{ textAlign: "left" }}>
          <Link
            underline="none"
            onClick={() => navigate("/resend/verification-code")}
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "black",
              },
            }}
          >
            <Typography variant="p" sx={{ pl: 0.5 }}>
              Resend Verification Code
            </Typography>
          </Link>
        </Box>
      </form>
    </ReusableLayout>
  );
}
