import EmailIcon from "@mui/icons-material/Email";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import FacebookLogin from "react-facebook-login";

// import  { LoginSocialGoogle } from 'reactjs-social-login';
// import { GoogleLoginButton } from "react-social-login-buttons";
// import {  IconGoogle } from "../../assets/icons"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Spinner from "../../Spinner";
import { socialLogin, userLogin } from "../../../features/auth/authActions";
import { FormStyle } from "../FormStyle";
import classes from "./LoginCard.css";
import TextInput from "../Admin/Posts/Form/TextInput";
import ReusableStepper from "../Stepper";

export default function MediaCard() {
  let { loading, userInfo, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const prevURL = localStorage.getItem("prevURL");

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const [login, setLogin] = React.useState(false);

  let [loggingIn, setLoggingIn] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (loggingIn) {
      if (error === null) {
        if (userInfo) {
          prevURL !== null ? navigate(-1) : navigate("/admin/dashboard");
          localStorage.removeItem("prevURL");
          setLoggingIn(false);
        }
      } else {
        setLoggingIn(false);
        reset();
      }
    }
  }, [navigate, userInfo, error, reset, loggingIn, prevURL]);

  const submitForm = (data) => {
    setLoggingIn(true);
    dispatch(userLogin(data));
  };

  let responseFacebook = (response) => {
    // Login failed
    if (response.status === "unknown") {
      swal({
        title: "Warning",
        text: "Login failed",
        icon: "warning",
        button: "OK!",
        timer: 1500,
      });
      navigate(0);

      return false;
    }
    // setData(response);
    // setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLoggingIn(true);
      dispatch(
        socialLogin({
          fb_token: response.accessToken,
          social_id: response.id,
          email: response.email,
          type: "facebook",
        })
      );
    } else {
      swal({
        title: "Warning",
        text: "Login failed",
        icon: "warning",
        button: "OK!",
        timer: 1500,
      });
      navigate(0);
    }
  };

  const responseGoogle = (credentialResponse) => {
    const googleId = credentialResponse?.profileObj?.sub;

    var obj = jwtDecode(credentialResponse.credential);
    console.group(obj.sub, "obj");
    var data = JSON.stringify(obj);

    if (obj.sub) {
      setLoggingIn(true);
      dispatch(
        socialLogin({
          fb_token: obj.jti,
          social_id: obj.sub,
          email: obj.email,
          type: "google",
          name: obj.name,
        })
      );
    } else {
      swal({
        title: "Warning",
        text: "Login failed",
        icon: "warning",
        button: "OK!",
        timer: 1500,
      });
      navigate(0);
    }
  };

  const onFailure = (response) => {
    // You can use the response object to authenticate the user on your server-side or perform any other desired actions.
  };

  return (
    <>
      <Box
        sx={{
          ...FormStyle.bg,
        }}
      >
        {/* <Alert id="alert" onClose={() => close()}>
        This is a success alert — check it out!
      </Alert> */}
        <KeyboardBackspaceIcon
          sx={{ position: "absolute", top: 4, left: "1rem", cursor: "pointer" }}
          onClick={() => navigate("/")}
        ></KeyboardBackspaceIcon>

        <Card
          sx={{
            ...FormStyle.card,
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

          <Box sx={{ display: "flex", height: "100%" }}>
            <Box sx={{ width: "50%", height: "100%", overflowY: "auto" }}>
              <Box sx={{ textAlign: "center", mt: 1 }}>
                <img
                  // src="http://localhost:3000/Image/AigmaLogo.png"
                  src={
                    process.env.REACT_APP_FRONTEND_URL + "Image/AigmaLogo.png"
                  }
                  alt="pte-logo"
                  style={{
                    width: "8rem",
                    margin: "0 auto",
                  }}
                />
              </Box>

              <CardContent
                sx={{
                  ...FormStyle.content,
                }}
              >
                <Divider></Divider>
                <Typography
                  variant="h5"
                  sx={{ ...FormStyle.formHeading }}
                  color="text.secondary"
                >
                  Sign in to start your session
                </Typography>
                <form onSubmit={handleSubmit(submitForm)}>
                  {/* React hook form with material ui */}
                  <Box sx={{ width: "80%", mx: "auto" }}>
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

                  <Box sx={{ width: "80%", mx: "auto" }}>
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
                      }}
                      defaultValue=""
                      error={!!errors?.password}
                      errorMessage={errors?.password?.message}
                      inputStyle={{ my: 1, bgcolor: "rgb(231 239 254)" }}
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

                  {error !== null && (
                    <Typography variant="p" color="red" textAlign={"left"}>
                      {error === "Unauthorized!"
                        ? "Credentials not match.Please try again."
                        : error === "notVerify"
                        ? "Your Email is not Verified! "
                        : ""}
                      {error === "timeout exceeded"
                        ? "Server busy,please try again later"
                        : ""}
                      {error === "Network Error"
                        ? "Check network & try again later"
                        : ""}
                    </Typography>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "80%",
                      mx: "auto",
                    }}
                  >
                    <Box>
                      <Controller
                        control={control}
                        name="remember_me"
                        render={({ field: { ref, ...field } }) => (
                          <Checkbox {...field} inputRef={ref} />
                        )}
                      />
                      <Typography variant="p">Remember Me</Typography>
                    </Box>
                    <Link
                      underline="none"
                      onClick={() => navigate("/forgotPassword")}
                      sx={{
                        mt: 1,
                        cursor: "pointer",
                        "&:hover": {
                          color: "black",
                        },
                      }}
                    >
                      <Typography variant="p" sx={{ pl: 0.5 }}>
                        Forgot Password
                      </Typography>
                    </Link>
                  </Box>

                  <Button
                    variant="contained"
                    type="submit"
                    className="button"
                    disabled={loading}
                    sx={
                      {
                        // position: "absolute",
                        // bottom: "4rem",
                        // right: "1rem",
                      }
                    }
                  >
                    {loading ? <Spinner /> : "Log In"}
                  </Button>
                </form>
              </CardContent>

              <CardActions
                sx={{
                  ...FormStyle.cardAction,
                }}
              >
                <Box
                  sx={{
                    ...FormStyle.cardFooter,
                  }}
                >
                  <Divider
                    sx={{
                      my: 1,
                    }}
                  >
                    <Chip label="OR" />
                  </Divider>
                  {/* <FacebookLogin
                appId="639781087735470"
                client_secret="e0dbb574cae60b36b7e109af43899d7a"
                // autoLoad={false}
                cssClass={classes.login_btn}
                fields="name,email,picture"
                scope="public_profile,email,user_friends"
                callback={responseFacebook}
                textButton="Login with Facebook"
                icon="fa-facebook"
                size="small"
              /> */}
                  <Box className="classes.login_btn" sx={{ mr: 4 }}>
                    <GoogleOAuthProvider
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    >
                      <div className="google-login-container">
                        <GoogleLogin
                          //  buttonText="Login with   Google"
                          onSuccess={responseGoogle}
                          onFailure={onFailure}
                          cookiePolicy={"single_host_origin"}
                          buttonProps={{ className: classes.login_btn }}
                          size="large"
                          sx={{ margin: 0 }}
                        />
                      </div>
                    </GoogleOAuthProvider>
                  </Box>

                  {/* <LoginSocialGoogle

client_id='166500777550-s12asv26srnroqd91df9oi941nlj1abe.apps.googleusercontent.com'

discoveryDocs='claims_supported'

access_type='offline'

onResolve={({provider, data}) => {



}}

onReject={({error}) => {



}}





>

   <GoogleLoginButton/>



</LoginSocialGoogle> */}
                </Box>
                {/* <Box
              sx={{
                ...FormStyle.terms,
              }}
            >
              <Typography sx={{ ...FormStyle.termsFont }}>
                Terms & Condition
              </Typography>
              <span>|</span>
              <Typography sx={{ ...FormStyle.termsFont }}>
                Privacy & Policy
              </Typography>
            </Box> */}
                <Link
                  underline="none"
                  onClick={() => navigate("/register")}
                  style={{ textAlign: "center" }}
                >
                  <Typography variant="p">
                    Don't have an account?
                    <span
                      style={{
                        textDecoration: "underline",
                        color: "rgb(182 32 35 )",
                        cursor: "pointer",
                      }}
                    >
                      Sign Up
                    </span>
                  </Typography>
                </Link>
              </CardActions>
            </Box>
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                  "radial-gradient(circle, rgba(146,178,255,0.6587885154061625) 37%, rgba(217,236,255,1) 61%)",
              }}
            >
              <ReusableStepper
                images={[
                  {
                    label: "AIGMA PTE AI",
                    imgPath:
                      process.env.REACT_APP_FRONTEND_URL +
                      "Image/LogIn_Info_Img.png",
                  },
                  {
                    label: "Black Friday Promotion",
                    imgPath:
                      process.env.REACT_APP_FRONTEND_URL +
                      "Image/LogIn_Info_Img (2).png",
                  },
                  {
                    label: "Aigma Ai",
                    imgPath:
                      process.env.REACT_APP_FRONTEND_URL +
                      "Image/LogIn_Info_Img (3).png",
                  },
                  {
                    label: "Black Friday",
                    imgPath:
                      process.env.REACT_APP_FRONTEND_URL +
                      "Image/LogIn_Info_Img.png",
                  },
                ]}
              />
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
}
