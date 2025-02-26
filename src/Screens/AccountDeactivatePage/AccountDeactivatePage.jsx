import EmailIcon from "@mui/icons-material/Email";
import { InputAdornment, TextField } from "@mui/material";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Spinner from "../../components/Spinner";
import { FormStyle } from "../../components/Backend/FormStyle";
import ReusableLayout from "../../components/Backend/ForgotPassword/ReusableLayout";

export default function AccountDeactivatePage() {
  // let { loading, error } = useSelector((state) => state.auth);
  let [loading, setLoading] = useState(false);
  let [errorSend, setError] = useState();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // redirect authenticated user to profile screen

  const submitForm = (data) => {
    let emailSend = async () => {
      let res;
      setLoading(true);

      try {
        res = await axios.post(
          `${process.env.REACT_APP_BACKEND_API}reactivate-account-mail-send`,
          {
            email: data.email,
            // name: data.name,
          }
        );
        if (res.data.status === 1) {
          setLoading(false);
          swal({
            title: "Success",
            text: res.data.message,
            icon: "success",
            button: "OK!",
          });

          navigate("/account-reactivate");
        } else {
          setLoading(false);
          swal({
            title: "Warning",
            text: res.data.message,
            icon: "warning",
            button: "OK!",
            // timer: 3000,
          }).then(() => navigate(0));
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
        swal({
          title: "Error",
          text: res.data.message,
          icon: "error",
          button: "OK!",
          // timer: 3000,
        }).then(() => navigate(0));
      }
    };
    emailSend();
    // navigate("/passwordReset");
  };
  return (
    <>
      <ReusableLayout
        title={
          "Your Account has been deactivated due to inactivity for more than 2 months"
        }
        backPath="/logIn"
      >
        <>
          <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
            If you want to reactivate your account well, then we’ll email you
            instructions to reactivate your account.
          </Typography>

          <form onSubmit={handleSubmit(submitForm)}>
            {/* React hook form with material ui */}
            {/* userName start*/}

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
            {errorSend && (
              <Typography variant="p" color="red" textAlign={"center"}>
                {errorSend === "Unauthorized!"
                  ? "Credentials not match.Please try again."
                  : ""}
                {errorSend === "timeout exceeded"
                  ? "Server busy,please try again later"
                  : ""}
                {errorSend === "Network Error"
                  ? "Check network & try again later"
                  : ""}
              </Typography>
            )}

            <Button
              variant="contained"
              type="submit"
              className="button"
              disabled={loading}
              sx={{
                position: "absolute",
                bottom: "4rem",
                right: "1rem",
              }}
            >
              {loading ? <Spinner /> : "Send Reactivate Link"}
            </Button>
          </form>
        </>
      </ReusableLayout>
    </>
  );
}
