import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

import { fetchCourseFrontendAsync } from "../../redux/thunk/Course";
import { fetchSubscriptionPlanFrontendAsync } from "../../redux/thunk/Subscription";
import { fetchAllCountryAsync } from "../../redux/thunk/Users";
import enrollStyle from "./EnrollStyle";

function EnrollForm() {
  const para = useParams();
  const dispatch = useDispatch();
  const country = localStorage.getItem("country");
  const { subscriptionFrontendStatus, subscriptionFrontend } = useSelector(
    (state) => state.subscription
  );
  const { allCountry, allCountryStatus } = useSelector((state) => state.user);
  const { courseFrontendStatus, courseFrontend } = useSelector(
    (state) => state.course
  );
  const [coursePlan, setCoursePlan] = useState();
  const [showSubscription, setShowSubscription] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState();
  const [selectSubscriptionPlan, setSelectSubscriptionPlan] = useState();
  const [assign, setAssign] = useState(true);
  const [courseFees, setCourseFees] = useState();

  const [installmentFeesAssign, setInstallmentFeesAssign] = useState();
  const [installment, setInstallment] = useState();
  const [discount, setDiscount] = useState();
  const [subPlanDiscount, setSubPlanDiscount] = useState();
  const [course, setCourse] = useState();
  const [planFees, setPlanFees] = useState();

  const [plan, setPlan] = useState();
  const coursePath = "courses";
  const subscriptionPath = "subscription-plan";
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [registeredDialogBox, setRegisteredDialogBox] = useState(false);
  const [registeredCode, setRegisteredCode] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [registerFormData, setRegisterFormData] = useState();
  const [registerLoading, setRegisterLoading] = useState(false);
  const backendURL = process.env.REACT_APP_BACKEND_API;
  const [isUser, setIsUser] = useState();
  const path = "online-course-register";
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,

    watch,
  } = useForm();
  const navigate = useNavigate();
  // let course = watch("course");
  // let fees = watch("fees");
  let radio = watch("levelTest");
  let payment = watch("payment");

  let bank = watch("bank");
  let type = watch("type");
  let email = watch("email");
  let code = watch("code");
  let transaction = watch("transactionUpload");
  let file = watch("fileUpload");
  let lvlTestUpload = watch("lvlTestUpload");
  const password = watch("password", "");
  const cPassword = watch("confirmPassword", "");
  const countryInput = watch("country");

  useEffect(() => {
    dispatch(fetchCourseFrontendAsync(coursePath));
    dispatch(fetchSubscriptionPlanFrontendAsync(subscriptionPath));
    dispatch(fetchAllCountryAsync());
    setAssign(true);
  }, [coursePath, dispatch, subscriptionPath]);

  useEffect(() => {
    if (
      assign &&
      courseFrontendStatus === "succeeded" &&
      subscriptionFrontendStatus === "succeeded"
    ) {
      setCoursePlan(courseFrontend);
      setSubscriptionPlan(subscriptionFrontend);
    }
  }, [
    assign,
    courseFrontend,
    courseFrontendStatus,
    subscriptionFrontendStatus,
    subscriptionFrontend,
  ]);

  //default course
  useEffect(() => {
    if (para !== undefined) {
      para.name === "pte"
        ? setShowSubscription(true)
        : setShowSubscription(false);
    }
  }, [para]);

  useEffect(() => {
    if (para !== undefined && coursePlan !== undefined && coursePlan !== "") {
      let defaultCourse = coursePlan.filter((c) => para.id === c.id.toString());
      let defaultFees = 0;
      if (country !== "MMK") {
        defaultFees =
          country === "USD"
            ? (defaultCourse[0].oversea_fees * 0.67).toFixed(2)
            : country === "SGD"
            ? (defaultCourse[0].oversea_fees * 0.9).toFixed(2)
            : country === "THB"
            ? (defaultCourse[0].oversea_fees * 24.63).toFixed(2)
            : country === "NZD"
            ? (defaultCourse[0].oversea_fees * 1.09).toFixed(2)
            : defaultCourse[0].oversea_fees;
      } else {
        defaultFees = defaultCourse[0].fees;
      }
      if (country === "Myanmar" && defaultCourse[0].installment_plan === 1) {
        setInstallment(true);
      } else {
        setInstallment(false);
      }
      if (defaultCourse[0].discount_status === 1) {
        setDiscount(true);

        setCourseFees(
          defaultFees - (defaultFees * defaultCourse[0]?.discount_percent) / 100
        );

        setValue(
          "fees",
          defaultFees - (defaultFees * defaultCourse[0]?.discount_percent) / 100
        );
      } else {
        setCourseFees(defaultFees);
        setValue("fees", defaultFees);
      }
      setCourse(defaultCourse[0].name);
    }
  }, [coursePlan, para, setValue, country]);

  //course click
  const courseClickHandler = (typeId, name) => {
    setCourseFees();
    //show subscripiton plan based on course type
    if (typeId === 1) {
      setShowSubscription(true);
    } else {
      setShowSubscription(false);
    }
    let course = coursePlan.filter((c) => name === c.name);
    let courseFees = 0;
    if (country !== "MMK") {
      courseFees =
        country === "USD"
          ? (course[0].oversea_fees * 0.67).toFixed(2)
          : country === "SGD"
          ? (course[0].oversea_fees * 0.9).toFixed(2)
          : country === "THB"
          ? (course[0].oversea_fees * 24.63).toFixed(2)
          : country === "NZD"
          ? (course[0].oversea_fees * 1.09).toFixed(2)
          : course[0].oversea_fees;
    } else {
      courseFees = course[0].fees;
    }
    // country !== "Myanmar" ? course[0].oversea_fees : course[0].fees;
    //toggle display on installment plan based on installment status
    if (course[0]?.installment_plan === 1) {
      setInstallment(true);
    } else {
      setInstallment(false);
    }
    //assign fees based on installment (previous or not ) and discount status (present or not )
    if (course[0]?.discount_status === 1 && installmentStatus !== "Yes") {
      setDiscount(true);
      setCourseFees(
        courseFees - (courseFees * course[0]?.discount_percent) / 100
      );
      setCourse(name);
      setValue(
        "fees",
        courseFees -
          (courseFees * course[0]?.discount_percent) / 100 +
          (planFees !== undefined ? planFees : 0)
      );
    } else {
      setDiscount(false);
      setCourseFees(courseFees);
      setCourse(name);
      setValue("fees", courseFees + (planFees !== undefined ? planFees : 0));
    }
  };
  // const fees = watch("fees");

  const installmentStatus = watch("installmentStatus");
  //course installment
  useEffect(() => {
    if (para !== undefined && coursePlan !== undefined && coursePlan !== "") {
      if (installmentStatus === "Yes") {
        let installmentFees = coursePlan.filter((c) => course === c.name);
        setCourseFees(installmentFees[0].installment_fees);
        setInstallmentFeesAssign(true);
      }
      if (installmentStatus === "No") {
        let installmentFees = coursePlan.filter((c) => course === c.name);
        if (discount) {
          setCourseFees(
            installmentFees[0].fees -
              (installmentFees[0].fees * installmentFees[0].discount_percent) /
                100
          );
          setInstallmentFeesAssign(true);
        } else {
          setCourseFees(installmentFees[0].fees);
          setInstallmentFeesAssign(true);
        }
      }
    }
  }, [coursePlan, installmentStatus, course, para, discount]);

  useEffect(() => {
    if (installmentFeesAssign) {
      setValue("fees", courseFees + (planFees !== undefined ? planFees : 0));
      setInstallmentFeesAssign(false);
    }
  }, [setValue, installmentFeesAssign, courseFees, planFees]);

  //subscription click
  const subClickHandler = (name, id, selectSubPlan) => {
    setPlan(name);
    setSelectSubscriptionPlan(selectSubPlan);
    let subPlan = subscriptionPlan.filter((s) => id === s.id);
    let subPlanFees = 0;
    if (country !== "MMK") {
      subPlanFees =
        country === "USD"
          ? (subPlan[0]?.oversea_fees * 0.67).toFixed(2)
          : country === "SGD"
          ? (subPlan[0]?.oversea_fees * 0.9).toFixed(2)
          : country === "THB"
          ? (subPlan[0]?.oversea_fees * 24.63).toFixed(2)
          : country === "NZD"
          ? (subPlan[0]?.oversea_fees * 1.09).toFixed(2)
          : subPlan[0]?.oversea_fees;
    } else {
      subPlanFees = subPlan[0].fees;
    }

    if (subPlan[0]?.discount_status === 1) {
      setSubPlanDiscount(true);
      setPlanFees(
        subPlanFees - (subPlanFees * subPlan[0].discount_percent) / 100
      );
      let total =
        courseFees +
        (subPlanFees - (subPlanFees * subPlan[0].discount_percent) / 100);
      setValue("fees", total);
    } else {
      setSubPlanDiscount(false);
      setPlanFees(subPlanFees);
      let total = parseInt(courseFees) + parseInt(subPlanFees);
      setValue("fees", total);
    }
  };

  const clearSubPlan = () => {
    setSelectSubscriptionPlan();
    setPlan();
    setPlanFees();
    setSubPlanDiscount();
    setValue("subscription", "");
  };
  //terms
  const handleClose = () => {
    setOpen(false);
  };

  let acceptFunction = () => {
    setValue("check", true);
    setOpen(false);
  };
  let declineFunction = () => {
    setValue("check", false);
    setOpen(false);
  };
  //addional new register user for pte site
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
  const registeredHandleClose = () => {
    setRegisteredDialogBox(false);
    setRegisteredCode(false);
    localStorage.removeItem("code");
  };

  const registerFunction = () => {
    //setIsUser(1);

    const request = {
      email: email,
    };
    if (!registeredCode) {
      setRegisterLoading(true);
      try {
        axios
          .post(`${process.env.REACT_APP_BACKEND_API}sent-verify-code`, request)
          .then((response) => {
            if (response.data.status === 1) {
              localStorage.setItem("code", response.data.code);
              // setRegisteredDialogBox(false);
              setRegisteredCode(true);
              setRegisterLoading(false);
              swal({
                title: "Success",
                text: "Verification code sent to your email address.If might take a while in some cicumstance please patiently check the inbox",
                icon: "success",
                button: "OK!",
                allowOutsideClick: false,
                closeOnClickOutside: false,
              });
            } else {
              swal({
                title: "Danger",
                text: response.data.message,
                icon: "error",
                button: "OK!",
                allowOutsideClick: false,
                closeOnClickOutside: false,
              });
            }
          });
      } catch (error) {
        swal({
          title: "Warning",
          text: error.message,
          icon: "warning",
          button: "OK!",
          allowOutsideClick: false,
          closeOnClickOutside: false,
        });
        setRegisterLoading(false);
      }
    } else {
      if (parseInt(code) === parseInt(localStorage.getItem("code"))) {
        setIsUser(1);

        setRegisteredDialogBox(false);
        localStorage.removeItem("code");
      } else {
        swal({
          title: "Warning",
          text: "Code not matched.Please check your email carefully and enter again",
          icon: "warning",
          button: "OK!",
          allowOutsideClick: false,
          closeOnClickOutside: false,
        });
      }
    }
  };

  // let check = watch("check");
  // let upload = watch("fileUpload");
  // let aName = watch("accountName");

  useEffect(() => {
    if (
      (bank === "KBZ" || bank === "AYA") &&
      (type === "special" || type === "normal")
    ) {
      setValue("accountName", "Daw Hsu Latt Htun");
    }

    if (bank === "CB" && (type === "special" || type === "normal")) {
      setValue("accountName", "Hsu Latt Htun");
    }

    if (type === "pay") {
      setValue("accountName", "Hsu Latt Htun");
    }

    if (bank === "KBZ") {
      if (type === "special") {
        setValue("accountNumber", "3515-1123-7001-1410-1");
      }

      if (type === "normal") {
        setValue("accountNumber", "2373-0123-70011410-1");
      }

      if (type === "pay") {
        setValue("accountNumber", "09-968706444");
      }
    }

    if (bank === "CB") {
      if (type === "special") {
        setValue("accountNumber", "0143-1009-0000-2224");
      }

      if (type === "normal") {
        setValue("accountNumber", "0109-6005-0012-9917");
      }

      if (type === "pay") {
        setValue("accountNumber", "09-968706444");
      }
    }

    if (bank === "AYA") {
      if (type === "special") {
      }
      setValue("accountNumber", "200-4825-571");
      if (type === "normal") {
        setValue("accountNumber", "4002-9027-482");
      }
    }
  }, [bank, setValue, type]);

  let saveType = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    formData.append("course_name", course);
    formData.append("course_id", data.course);
    formData.append("course_fees", courseFees);
    let currency = localStorage.getItem("country");
    formData.append("currency", country);
    formData.append("course_type", para.name === "pte" ? 1 : null);
    if (installmentStatus === "Yes") {
      formData.append("installment_plan", 1);
      formData.append("discount_status", 0);
    } else {
      //discount status is solely for course
      if (discount) {
        formData.append("discount_status", 1);
      } else {
        formData.append("discount_status", 0);
      }
      formData.append("installment_plan", 0);
    }
    if (radio === "Yes") {
      formData.append("eng_lvl_test", data.fileUpload);
    } else {
      formData.append("eng_lvl_test", data.lvlTestUpload);
    }
    if (showSubscription) {
      formData.append("sub_plan_id", data.subscription);
      formData.append("plan_fees", planFees);
      formData.append("plan_name", plan);
    }
    if (country !== "MMK") {
      setValue("payment", "digital");
      formData.append("payment_method", "digital");
      formData.append("provider_name", "stripe");
    } else {
      formData.append("payment_method", data.payment);
      if (data.payment === "digital") {
        formData.append("provider_name", "stripe");
      } else {
        formData.append("bank_type", data.bank);
        formData.append("payment_type", data.type);
        formData.append("transaction", data.transactionUpload);
      }
    }

    if (showSubscription) {
      setLoading(true);
      try {
        const checkEmail = await axios.get(
          `${backendURL}check-user/${data.email}`
        );

        if (checkEmail.data.have_user === 0) {
          setRegisteredDialogBox(true);
          setRegisterFormData(formData);
          setLoading(false);
        } else {
          setIsUser(0);
          formData.append("isUser", 0);
          registerForm(formData);
        }
      } catch (error) {
        swal({
          title: "Warning",
          text: error.message,
          icon: "warning",
          button: "OK!",
          allowOutsideClick: false,
          closeOnClickOutside: false,
        });
        setLoading(false);
      }
    } else {
      setLoading(true);
      registerForm(formData);
    }
  };
  let registerForm = useCallback(
    async (request) => {
      setLoading(true);

      const res = await axios
        .post(`${backendURL}${path}`, request)
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            swal({
              title: "Warning",
              text: error.message,
              icon: "warning",
              button: "OK!",
              allowOutsideClick: false,
              closeOnClickOutside: false,
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
              allowOutsideClick: false,
              closeOnClickOutside: false,
            });
            setLoading(false);
          } else {
            // Something happened in setting up the request that triggered an Error

            swal({
              title: "Warning",
              text: error.message,
              icon: "warning",
              button: "OK!",
              allowOutsideClick: false,
              closeOnClickOutside: false,
            });
            setLoading(false);
          }
        });

      if ((res.status === 200 || res.status === 201) && !res.data.errors) {
        //redirect payment page
        if (res.data.payment_method === "digital") {
          window.location.href = res.data.payment_url;
        } else {
          swal({
            title: "Success",
            text: "Enroll register Succesfully",
            icon: "success",
            button: "OK",
            allowOutsideClick: false,
            closeOnClickOutside: false,
          }).then(() => {
            navigate("/");
          });
        }

        //
        // let sitePath = localStorage.getItem("path");
        //   if (sitePath === "smartedu") {
        //     window.location.href = "https://smarteduglobe.com";
        //     localStorage.removeItem("path");
        //   } else {
        // navigate("/");
        // }
        // swal({
        //   title: "Success",
        //   text: "Request Succesfully",
        //   icon: "success",
        //   button: "OK!",
        //   allowOutsideClick: false,
        //   closeOnClickOutside: false,
        // }).then(() => {

        // });

        // reset();
      } else {
        swal({
          title: "Warning",
          text: res.data.message,
          icon: "warning",
          button: "OK!",
          allowOutsideClick: false,
          closeOnClickOutside: false,
        });
        setLoading(false);
        reset();
      }
    },
    [backendURL, reset, path, navigate]
  );

  // for new account register
  useEffect(() => {
    if (isUser === 1) {
      let formData = registerFormData;
      formData.append("password", password);
      formData.append("country", country);
      formData.append("isUser", 1);
      registerForm(formData);
      setIsUser("");
    }
  }, [isUser, password, registerFormData, registerForm, country]);

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          overflowY: "scroll",
          backgroundColor: "#e1f5fe",
          display: "flex",
          py: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "1rem",
            width: {
              xs: "100vw",
              md: "60vw",
              xl: "60vw",
            },

            m: "auto",

            boxShadow: 5,
            py: 1,
          }}
        >
          {/* <Box
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "5rem",
              height: "5rem",
              background:
                "linear-gradient(29deg, rgba(158,158,159,1) 0%, rgba(144,167,255,1) 0%, rgba(104,236,237,1) 36%, rgba(245,245,245,1) 87%)",
              //   background:
              //     "linear-gradient(29deg, rgba(194,186,239,1) 52%, rgba(151,199,255,1) 75%)",
              mx: "auto",
              my: 2,
              borderRadius: "50%",
              backgroundColor: "red",
              boxShadow: 4,
            }}
          >
            <i
              className="fa-solid fa-mitten fa-bounce "
              style={{
                // color: "#0066b2",
                color: "#5386df",

                fontSize: "3rem",
              }}
            ></i>
          </Box> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                height: "2px",
                transform: "rotate(180deg)",
                background:
                  "linear-gradient(29deg, rgba(158,158,159,1) 0%, rgba(144,167,255,1) 0%, rgba(104,236,237,1) 6%, rgba(245,245,245,1) 87%)",
                width: "20%",
              }}
            ></span>
            <i
              className="fa-solid fa-clover fa-spin"
              style={{ color: "#66FF00" }}
            ></i>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", width: "60%", fontWeight: "600" }}
            >
              Welcome to Enroll form
            </Typography>
            <i
              className="fa-solid fa-clover fa-spin"
              //   style={{ color: "#ceb4ee" }}
              style={{ color: "#66FF00" }}
            ></i>
            <span
              style={{
                height: "2px",

                background:
                  "linear-gradient(29deg, rgba(158,158,159,1) 0%, rgba(144,167,255,1) 0%, rgba(104,236,237,1) 6%, rgba(245,245,245,1) 87%)",
                width: "20%",
              }}
            ></span>
          </Box>
          <form onSubmit={handleSubmit(saveType)}>
            <Box
              sx={{
                mt: "0.5rem",
                display: "flex",
                justifyContent: "space-between",
                mx: "auto",
                alignItem: "center",
              }}
            >
              <Box sx={{ width: "45%", mx: "auto" }}>
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
                      type="text"
                      fullWidth
                      error={!!errors.name}
                      label="Name"
                      helperText="*Enter name"
                      size="small"
                      sx={{
                        my: 1,
                      }}
                      InputProps={{
                        sx: {
                          ...enrollStyle.inputStyle,
                        },
                        endAdornment: (
                          <InputAdornment position="end" sx={{ width: "25%" }}>
                            <Box sx={{}} aria-label="lock icon">
                              <i
                                className="fa-solid fa-user"
                                style={{ color: "#5386df" }}
                              ></i>
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                {errors.name && (
                  <Typography variant="p" color="red" textAlign={"left"}>
                    <small>{errors.name.message}</small>
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "45%", mx: "auto" }}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "*Email is required",
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
                      size="small"
                      helperText="*Enter Email"
                      sx={{
                        my: 1,
                      }}
                      InputProps={{
                        sx: {
                          ...enrollStyle.inputStyle,
                        },
                        endAdornment: (
                          <InputAdornment position="end" sx={{ width: "25%" }}>
                            <Box sx={{}} aria-label="lock icon">
                              <i
                                className="fa-solid fa-envelope"
                                style={{ color: "#5386df" }}
                              ></i>
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
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mx: "auto",
                alignItem: "center",
              }}
            >
              <Box sx={{ width: "45%", mx: "auto" }}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "*Telegram Phone number is required",
                    },
                  }}
                  defaultValue=""
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      id="phone"
                      type="phone"
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors.phone}
                      label="Phone"
                      helperText="*Enter Telegram Phone Number"
                      sx={{
                        my: 1,
                      }}
                      InputProps={{
                        sx: {
                          ...enrollStyle.inputStyle,
                        },
                        endAdornment: (
                          <InputAdornment position="end" sx={{ width: "25%" }}>
                            <Box sx={{}} aria-label="lock icon">
                              <i
                                className="fa-brands fa-telegram"
                                style={{ color: "#5386df" }}
                              ></i>
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                {errors.phone && (
                  <Typography variant="p" color="red" textAlign={"left"}>
                    <small>{errors.phone.message}</small>
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "45%", mx: "auto" }}>
                <Controller
                  name="course"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "*Choose one course",
                    },
                  }}
                  defaultValue={
                    para !== undefined && para.id !== undefined ? para.id : ""
                  }
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      select
                      inputRef={ref}
                      id="course"
                      type="course"
                      variant="outlined"
                      fullWidth
                      error={!!errors.course}
                      label="Course"
                      size="small"
                      helperText="*Please Choose one course"
                      sx={{
                        my: 1,
                      }}
                      InputProps={{
                        sx: {
                          ...enrollStyle.inputStyle,
                        },
                        startAdornment: (
                          <InputAdornment position="end" sx={{ width: "25%" }}>
                            <Box sx={{}} aria-label="lock icon">
                              <i
                                className="fa-solid fa-layer-group"
                                style={{ color: "#5386df" }}
                              ></i>
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    >
                      {courseFrontendStatus === "succeeded" &&
                      coursePlan !== undefined ? (
                        coursePlan.map((c, index) => (
                          <MenuItem
                            key={index}
                            value={c.id}
                            onClick={() =>
                              courseClickHandler(c.course_type_id, c.name)
                            }
                          >
                            {c.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value={para.id}></MenuItem>
                      )}
                    </TextField>
                  )}
                />

                {errors.course && (
                  <Typography variant="p" color="red" textAlign={"left"}>
                    <small>{errors.course.message}</small>
                  </Typography>
                )}
              </Box>
            </Box>
            {/* Installment plan */}
            {installment && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mx: "auto",
                  alignItem: "center",
                }}
              >
                <Box
                  sx={{
                    width: "45%",
                    mx: "auto",
                    textAlign: "center",
                  }}
                >
                  <FormControl>
                    <Typography id="demo-radio-buttons-group-label">
                      Choose Installment Plan ?
                    </Typography>
                  </FormControl>
                  <Controller
                    name="installmentStatus"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "*Choose yes or no",
                      },
                    }}
                    defaultValue=""
                    render={({ field: { onChange } }) => (
                      <RadioGroup
                        onChange={(e) => onChange(e.target.value)}
                        defaultValue={""}
                      >
                        <Box sx={{ height: "45px" }}>
                          <FormControlLabel
                            value="Yes"
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="No"
                            control={<Radio />}
                            label="No"
                          />
                        </Box>
                      </RadioGroup>
                    )}
                  />
                  {errors.installmentStatus && (
                    <Typography variant="p" color="red" textAlign={"left"}>
                      <small>{errors.installmentStatus.message}</small>
                    </Typography>
                  )}
                </Box>
              </Box>
            )}

            {showSubscription && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mx: "auto",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: "45%", mx: "auto" }}>
                  <Controller
                    name="subscription"
                    control={control}
                    rules={{
                      required: {
                        // value: true,
                        // message: "*Subscription plan",
                      },
                    }}
                    defaultValue=""
                    render={({ field: { ref, ...field } }) => (
                      <TextField
                        {...field}
                        select
                        inputRef={ref}
                        id="subscription"
                        type="subscription"
                        variant="outlined"
                        fullWidth
                        error={!!errors.subscription}
                        label="Subscription plan"
                        size="small"
                        helperText="Subscription plan for portal access"
                        sx={{
                          my: 1,
                        }}
                        InputProps={{
                          sx: {
                            ...enrollStyle.inputStyle,
                          },
                          startAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ width: "25%" }}
                            >
                              <Box sx={{}} aria-label="lock icon">
                                <i
                                  className="fa-solid fa-tag"
                                  style={{ color: "#5386df" }}
                                ></i>
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                      >
                        {subscriptionFrontendStatus === "succeeded" &&
                        subscriptionPlan !== undefined ? (
                          subscriptionPlan.map((s, index) => (
                            <MenuItem
                              key={index}
                              onClick={() => subClickHandler(s.name, s.id, s)}
                              value={s.id}
                            >
                              {s.name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem></MenuItem>
                        )}
                      </TextField>
                    )}
                  />

                  {errors.subscription && (
                    <Typography variant="p" color="red" textAlign={"left"}>
                      <small>{errors.subscription.message}</small>
                    </Typography>
                  )}
                </Box>
                {selectSubscriptionPlan !== null &&
                  selectSubscriptionPlan !== undefined && (
                    <Box sx={{ width: "45%", mx: "auto" }}>
                      <Box
                        sx={{
                          bgcolor: "rgb(225 245 254)",
                          borderRadius: "2rem",
                          boxShadow: 3,
                          p: 1,
                          my: 1,
                          position: "relative",
                        }}
                      >
                        <Box
                          sx={{
                            border: "2px dotted navy",
                            borderRadius: "1rem",
                            p: 1,
                            backgroundColor: "white",
                          }}
                        >
                          <CloseIcon
                            onClick={() => clearSubPlan()}
                            sx={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              cursor: "pointer",
                            }}
                          ></CloseIcon>
                          {selectSubscriptionPlan?.name}
                          {(selectSubscriptionPlan?.plan_type_id === 1 ||
                            selectSubscriptionPlan?.plan_type_id === 5 ||
                            selectSubscriptionPlan?.plan_type_id === 8) && (
                            <Typography
                              variant="h6"
                              sx={{ fontSize: "0.8rem" }}
                            >
                              {selectSubscriptionPlan?.limited_status === 1 ? (
                                <span style={{ color: "red" }}>unlimited </span>
                              ) : (
                                <span style={{ color: "red" }}>limited </span>
                              )}{" "}
                              practice
                              {selectSubscriptionPlan?.limited_status === 1 ? (
                                <span>
                                  for {selectSubscriptionPlan.number_of_day}{" "}
                                  days
                                </span>
                              ) : (
                                "with " +
                                selectSubscriptionPlan?.scoring_count +
                                " scoring count"
                              )}
                            </Typography>
                          )}

                          {(selectSubscriptionPlan?.plan_type_id === 1 ||
                            selectSubscriptionPlan?.plan_type_id === 2 ||
                            selectSubscriptionPlan?.plan_type_id === 5 ||
                            selectSubscriptionPlan?.plan_type_id === 8) && (
                            <Typography
                              variant="h6"
                              sx={{ fontSize: "0.8rem" }}
                            >
                              {selectSubscriptionPlan?.mocktest_count} Ai
                              Scoring Mock test based on
                              <span style={{ color: "red" }}> real-world </span>
                              test questions
                            </Typography>
                          )}

                          {(selectSubscriptionPlan?.plan_type_id === 4 ||
                            selectSubscriptionPlan?.plan_type_id === 8) && (
                            <Typography
                              variant="h6"
                              sx={{ fontSize: "0.8rem" }}
                            >
                              {JSON.parse(
                                selectSubscriptionPlan?.language_type_id
                              ).map((l, index) => (
                                <Typography key={index}>
                                  {" "}
                                  {l === 1
                                    ? "Speaking Mock Test +" +
                                      JSON.parse(
                                        selectSubscriptionPlan?.sectional_mocktest_count
                                      )[index]
                                    : l === 2
                                    ? "Reading Mock Test +" +
                                      JSON.parse(
                                        selectSubscriptionPlan?.sectional_mocktest_count
                                      )[index]
                                    : l === 4
                                    ? "Writing Mock Test +" +
                                      JSON.parse(
                                        selectSubscriptionPlan?.sectional_mocktest_count
                                      )[index]
                                    : l === 3
                                    ? "Listeninng MockTest +" +
                                      JSON.parse(
                                        selectSubscriptionPlan?.sectional_mocktest_count
                                      )[index]
                                    : ""}
                                </Typography>
                              ))}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                      <FormHelperText>
                        Subcription plan's details
                      </FormHelperText>
                    </Box>
                  )}
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mx: "auto",
                alignItem: "center",
              }}
            >
              <Box
                sx={{
                  width: "45%",
                  mx: "auto",
                  textAlign: "center",
                }}
              >
                <FormControl>
                  <Typography id="demo-radio-buttons-group-label">
                    Have you taken English level test?
                  </Typography>
                </FormControl>
                <Controller
                  name="levelTest"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "*Choose yes or no",
                    },
                  }}
                  defaultValue=""
                  render={({ field: { onChange } }) => (
                    <RadioGroup
                      onChange={(e) => onChange(e.target.value)}
                      defaultValue={""}
                    >
                      <Box sx={{ height: "45px" }}>
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="No"
                        />
                      </Box>
                    </RadioGroup>
                  )}
                />
                {errors.levelTest && (
                  <Typography variant="p" color="red" textAlign={"left"}>
                    <small>{errors.levelTest.message}</small>
                  </Typography>
                )}
              </Box>
              {radio === "Yes" && (
                <Box
                  sx={{
                    width: "45%",
                    mx: "auto",
                  }}
                >
                  <Typography>Upload result screenshot</Typography>
                  <Controller
                    name="fileUpload"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "*Required file",
                      },
                    }}
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
                            color: "black",
                            ...enrollStyle.inputStyle,
                          }}
                        >
                          Upload
                        </Button>
                        <Typography>
                          {file !== undefined && file !== null ? file.name : ""}
                        </Typography>
                      </label>
                    )}
                  />
                  {errors.fileUpload && (
                    <Typography variant="p" color="red" textAlign={"left"}>
                      <small>{errors.fileUpload.message}</small>
                    </Typography>
                  )}
                </Box>
              )}

              {radio === "No" && (
                <Box
                  sx={{
                    height: "3rem",

                    width: "45%",

                    mx: "auto",
                  }}
                >
                  <Typography>Take test & upload result screenshot</Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ width: "45%" }}>
                      <Button
                        variant="contained"
                        fullWidth
                        target="_blank"
                        href=" https://learnenglish.britishcouncil.org/online-english-level-test"
                        sx={{
                          ...enrollStyle.inputStyle,
                          color: "black",
                          "&:hover": {
                            bgcolor: "white",
                          },
                        }}
                      >
                        Take Test
                      </Button>
                    </Box>
                    <Box sx={{ width: "45%" }}>
                      <Controller
                        name="lvlTestUpload"
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "*Required file",
                          },
                        }}
                        render={({ field: { onChange } }) => (
                          <label htmlFor="leveltest-photo">
                            <input
                              accept="image/*"
                              style={{ display: "none" }}
                              id="leveltest-photo"
                              onChange={(event) =>
                                onChange(event.target.files[0])
                              }
                              type="file"
                            />
                            <Button
                              variant="contained"
                              component="span"
                              sx={{
                                color: "black",
                                ...enrollStyle.inputStyle,
                              }}
                            >
                              Upload
                            </Button>
                            <Typography>
                              {lvlTestUpload !== undefined &&
                              lvlTestUpload !== null
                                ? lvlTestUpload.name
                                : ""}
                            </Typography>
                          </label>
                        )}
                      />

                      {errors.lvlTestUpload && (
                        <Typography variant="p" color="red" textAlign={"left"}>
                          <small>{errors.lvlTestUpload.message}</small>
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
            <Divider sx={{ width: "60%", mx: "auto", my: 2 }}></Divider>
            {country === "MMK" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mx: "auto",
                  alignItem: "center",
                }}
              >
                {country === "MMK" && (
                  <Box
                    sx={{
                      width: "100%",
                      mx: "auto",
                      textAlign: "center",
                    }}
                  >
                    <FormControl>
                      <FormLabel
                        id="demo-radio-buttons-group-label"
                        sx={{ color: "black" }}
                      >
                        Choose your payment method.
                      </FormLabel>
                    </FormControl>
                    <Controller
                      name="payment"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "*Choose payment methods",
                        },
                      }}
                      defaultValue=""
                      render={({ field: { onChange } }) => (
                        <RadioGroup
                          onChange={(e) => onChange(e.target.value)}
                          defaultValue={""}
                        >
                          <Box>
                            <FormControlLabel
                              value="manual"
                              control={<Radio />}
                              label="Manual Payment"
                            />
                            <FormControlLabel
                              value="digital"
                              control={<Radio />}
                              label="Digital Payment"
                            />
                          </Box>
                        </RadioGroup>
                      )}
                    />
                    {errors.payment && (
                      <Typography variant="p" color="red" textAlign={"left"}>
                        <small>{errors.payment.message}</small>
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mx: "auto",
                alignItem: "center",
              }}
            >
              {payment === "manual" && (
                <Box
                  sx={{
                    width: "45%",
                    mx: "auto",
                  }}
                >
                  <Controller
                    name="bank"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "*Bank is required",
                      },
                    }}
                    size="small"
                    defaultValue=""
                    render={({ field: { ref, ...field } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        id="bank"
                        select
                        variant="outlined"
                        fullWidth
                        error={!!errors.fees}
                        label="Bank"
                        helperText="*Choose Bank"
                        size="small"
                        sx={{
                          my: 1,
                        }}
                        InputProps={{
                          sx: {
                            ...enrollStyle.inputStyle,
                          },
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ width: "25%" }}
                            >
                              <Box sx={{}} aria-label="lock icon">
                                <i
                                  className="fa-solid fa-building-columns"
                                  style={{ color: "#5386df" }}
                                ></i>
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                      >
                        <MenuItem value={"KBZ"}>KBZ</MenuItem>
                        <MenuItem value={"CB"}>CB</MenuItem>
                        <MenuItem value={"AYA"}>AYA</MenuItem>
                      </TextField>
                    )}
                  />
                  {errors.bank && (
                    <Typography variant="p" color="red" textAlign={"left"}>
                      <small>{errors.bank.message}</small>
                    </Typography>
                  )}
                </Box>
              )}

              {payment === "digital" && (
                <Box
                  sx={{
                    width: "45%",
                    mx: "auto",
                    textAlign: "center",
                  }}
                ></Box>
              )}

              {payment !== "" &&
                payment !== "digital" &&
                bank !== "" &&
                payment !== undefined &&
                bank !== undefined && (
                  <Box
                    sx={{
                      width: "45%",
                      mx: "auto",
                    }}
                  >
                    <Controller
                      name="type"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "*Account type is required",
                        },
                      }}
                      defaultValue=""
                      render={({ field: { ref, ...field } }) => (
                        <TextField
                          {...field}
                          inputRef={ref}
                          id="type"
                          select
                          variant="outlined"
                          fullWidth
                          error={!!errors.type}
                          label="Account Type"
                          helperText="*Choose type"
                          size="small"
                          sx={{
                            my: 1,
                          }}
                          InputProps={{
                            sx: {
                              ...enrollStyle.inputStyle,
                            },
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                sx={{ width: "25%" }}
                              >
                                <Box sx={{}} aria-label="lock icon">
                                  <i
                                    className="fa-solid fa-money-check-dollar"
                                    style={{ color: "#5386df" }}
                                  ></i>
                                </Box>
                              </InputAdornment>
                            ),
                          }}
                        >
                          <MenuItem value={"special"}>Special</MenuItem>
                          <MenuItem value={"normal"}>Normal</MenuItem>
                          <MenuItem value={"pay"}>
                            {bank === "KBZ"
                              ? "KBZ pay"
                              : bank === "CB"
                              ? "CB pay"
                              : ""}
                          </MenuItem>
                        </TextField>
                      )}
                    />
                    {errors.type && (
                      <Typography variant="p" color="red" textAlign={"left"}>
                        <small>{errors.type.message}</small>
                      </Typography>
                    )}
                  </Box>
                )}
            </Box>
            {type !== "" && type !== undefined && payment !== "digital" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                  justifyContent: "space-between",
                  mx: "auto",
                  alignItem: "center",
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: "80%",
                      md: "45%",
                    },
                    mx: "auto",
                  }}
                >
                  <Controller
                    name="accountName"
                    control={control}
                    defaultValue=""
                    render={({ field: { ref, ...field } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        id="accountName"
                        type="text"
                        size="small"
                        variant="outlined"
                        fullWidth
                        error={!!errors.accountName}
                        label="Account Name"
                        disabled
                        sx={{
                          my: 1,
                        }}
                        InputProps={{
                          sx: {
                            borderRadius: "1rem",
                            bgcolor: "rgb(225 245 254)",
                            boxShadow: 2,
                          },
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ width: "25%" }}
                            >
                              <Box sx={{}} aria-label="lock icon">
                                <i
                                  className="fa-regular fa-user"
                                  style={{ color: "#5386df" }}
                                ></i>
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    width: {
                      xs: "80%",
                      md: "45%",
                    },
                    mx: "auto",
                  }}
                >
                  <Controller
                    name="accountNumber"
                    control={control}
                    defaultValue=""
                    render={({ field: { ref, ...field } }) => (
                      <TextField
                        {...field}
                        // inputRef={ref}
                        id="accountNumber"
                        type="text"
                        variant="outlined"
                        fullWidth
                        error={!!errors.accountNumber}
                        label="Account Number"
                        size="small"
                        disabled
                        sx={{
                          my: 1,
                        }}
                        InputProps={{
                          sx: {
                            borderRadius: "1rem",
                            bgcolor: "rgb(225 245 254)",
                            boxShadow: 2,
                          },
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ width: "25%" }}
                            >
                              <Box sx={{}} aria-label="lock icon">
                                <i
                                  className="fa-solid fa-barcode"
                                  style={{ color: "#5386df" }}
                                ></i>
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>
            )}

            <Divider sx={{ width: "60%", mx: "auto", my: 1 }}></Divider>
            <Typography textAlign={"center"}>
              Fees & payment transaction upload
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mx: "auto",
                alignItem: "center",
                backgroundColor: "whitesmoke",
                p: 1,
                m: 1,
                borderRadius: "1rem",
              }}
            >
              <Box
                sx={{
                  width: "45%",
                  mx: "auto",
                }}
              >
                <Controller
                  name="fees"
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      id="fees"
                      type="number"
                      variant="outlined"
                      fullWidth
                      error={!!errors.fees}
                      label={"Fees "}
                      size="small"
                      disabled
                      // helperText="Course Fees"
                      sx={{}}
                      InputProps={{
                        sx: {
                          ...enrollStyle.inputStyle,
                        },
                        endAdornment: (
                          <InputAdornment position="end" sx={{ width: "25%" }}>
                            <Box sx={{}} aria-label="lock icon">
                              <i
                                className="fa-solid fa-coins"
                                style={{ color: "#5386df" }}
                              ></i>
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <FormHelperText>
                  {courseFees}{" "}
                  {discount && installmentStatus !== "Yes"
                    ? "(discounted price)"
                    : ""}
                  {planFees !== undefined ? "+" + planFees : ""}
                  {subPlanDiscount ? "(discounted price)" : ""}
                  {country}
                </FormHelperText>
              </Box>
              {country === "MMK" && payment !== "digital" && (
                <Box
                  sx={{
                    width: "45%",
                    mx: "auto",
                    py: "3px",
                  }}
                >
                  <Controller
                    name="transactionUpload"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "*Required file",
                      },
                    }}
                    render={({ field: { onChange } }) => (
                      <label htmlFor="transaction-photo">
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="transaction-photo"
                          onChange={(event) => onChange(event.target.files[0])}
                          type="file"
                        />
                        <Button
                          variant="contained"
                          component="span"
                          sx={{
                            color: "black",
                            ...enrollStyle.inputStyle,
                          }}
                        >
                          Upload
                        </Button>
                        {transaction !== undefined && transaction !== null
                          ? transaction.name
                          : ""}
                      </label>
                    )}
                  />
                  <FormHelperText>
                    *Upload transaction screenshot
                  </FormHelperText>
                  {errors.transactionUpload && (
                    <Typography variant="p" color="red" textAlign={"left"}>
                      <small>{errors.transactionUpload.message}</small>
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: 2,
              }}
            >
              <Controller
                name="check"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "*Please accept terms & conditions",
                  },
                  validate: {
                    equals: (check) =>
                      check !== false || "Choose a more secure password",
                  },
                }}
                defaultValue={false}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    checked={value}
                    error={errors.check}
                    onChange={onChange}
                  />
                )}
              />
              <Typography
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => setOpen(true)}
              >
                Terms & Conditions
              </Typography>
              {errors.check && (
                <Typography variant="p" color="red" textAlign={"left"}>
                  <small>{errors.check.message}</small>
                </Typography>
              )}
            </Box>
            <Dialog
              open={open}
              onClose={handleClose}
              fullWidth={true}
              sx={{ mx: "auto", backdropFilter: "blur(5px)" }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <DialogTitle>Read Carefully</DialogTitle>

                <DialogActions>
                  <ButtonBase onClick={handleClose}>
                    <CancelIcon></CancelIcon>
                  </ButtonBase>
                </DialogActions>
              </Box>
              <Box
                sx={{
                  width: "80%",
                  mx: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* src= {process.env.REACT_APP_FRONTEND_URL + "Image/Terms.png" }*/}
                <img
                  src={process.env.REACT_APP_FRONTEND_URL + "Image/Terms.png"}
                  alt="terms"
                  style={{ display: "block" }}
                />
              </Box>
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "space-between",
                  my: 2,
                  mx: "auto",
                }}
              >
                <Button variant="contained" onClick={() => acceptFunction()}>
                  Accept
                </Button>
                <Button variant="contained" onClick={() => declineFunction()}>
                  Decline
                </Button>
              </Box>
            </Dialog>
            <Dialog
              open={registeredDialogBox}
              onClose={registeredHandleClose}
              fullWidth={true}
              sx={{ mx: "auto", backdropFilter: "blur(5px)" }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <DialogTitle>Register Account</DialogTitle>

                <DialogActions>
                  <ButtonBase onClick={registeredHandleClose}>
                    <CancelIcon></CancelIcon>
                  </ButtonBase>
                </DialogActions>
              </Box>
              <Box
                sx={{
                  width: "80%",
                  mx: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* src= {process.env.REACT_APP_FRONTEND_URL + "Image/Terms.png" }*/}

                <Controller
                  name="country"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "*country is required",
                    },
                  }}
                  defaultValue=""
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      id="country"
                      select
                      fullWidth
                      error={!!errors.country}
                      label="Country"
                      helperText="*Enter Country"
                      size="small"
                      sx={{
                        my: 1,
                      }}
                      InputProps={{
                        sx: {
                          ...enrollStyle.inputStyle,
                        },
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{
                              width: "25%",
                            }}
                          >
                            <Box aria-label="lock icon">
                              <FlagIcon></FlagIcon>
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    >
                      {allCountryStatus === "succeeded" &&
                        allCountry.data.map((c, index) => (
                          <MenuItem value={c.name} key={index}>
                            {c.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  )}
                />
              </Box>
              {errors.country && (
                <Box sx={{ width: "80%", mx: "auto" }}>
                  <Typography variant="p" color="red" textAlign={"left"}>
                    <small>{errors.country.message}</small>
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  width: "80%",
                  mx: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* src= {process.env.REACT_APP_FRONTEND_URL + "Image/Terms.png" }*/}

                <Controller
                  name="password"
                  control={control}
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
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      error={!!errors.name}
                      label="Password"
                      helperText="*Enter password"
                      size="small"
                      sx={{
                        my: 1,
                      }}
                      InputProps={{
                        sx: {
                          ...enrollStyle.inputStyle,
                        },
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{
                              width: "25%",
                            }}
                          >
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              sx={{ mr: 3 }}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                            <Box aria-label="lock icon">
                              <LockIcon></LockIcon>
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
              {errors.password && (
                <Box sx={{ width: "80%", mx: "auto" }}>
                  <Typography variant="p" color="red" textAlign={"left"}>
                    <small>{errors.password.message}</small>
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  width: "80%",
                  mx: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* src= {process.env.REACT_APP_FRONTEND_URL + "Image/Terms.png" }*/}

                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "*Confirm password is required",
                    },
                    validate: (value) =>
                      value === password || "The passwords do not match",
                  }}
                  defaultValue=""
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      id="confrimPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      fullWidth
                      error={!!errors.confirmPassword}
                      label="Confirm Password"
                      helperText="*Enter confirm password"
                      size="small"
                      sx={{
                        my: 1,
                      }}
                      InputProps={{
                        sx: {
                          ...enrollStyle.inputStyle,
                        },
                        endAdornment: (
                          <InputAdornment position="end" sx={{ width: "25%" }}>
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownConfirmPassword}
                              edge="end"
                              sx={{ mr: 3 }}
                            >
                              {showConfirmPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                            <Box aria-label="lock icon">
                              <LockIcon></LockIcon>
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
              {errors.confirmPassword && (
                <Box sx={{ width: "80%", mx: "auto" }}>
                  <Typography variant="p" color="red" textAlign={"left"}>
                    <small>{errors.confirmPassword.message}</small>
                  </Typography>
                </Box>
              )}
              {registeredCode && (
                <Box sx={{ width: "45%", mx: "auto" }}>
                  <Controller
                    name="code"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "*Code is required",
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
                        size="small"
                        error={!!errors.code}
                        label="Code"
                        helperText="*Enter Verification Number"
                        sx={{
                          my: 1,
                        }}
                        InputProps={{
                          sx: {
                            ...enrollStyle.inputStyle,
                          },
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ width: "25%" }}
                            >
                              <Box sx={{}} aria-label="lock icon">
                                <i
                                  class="fa-solid fa-qrcode"
                                  style={{ color: "#5386df" }}
                                ></i>
                                {/* <i className="fa-brands fa-telegram"></i> */}
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
                </Box>
              )}

              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "space-between",
                  my: 2,
                  mx: "auto",
                }}
              >
                <Button
                  variant="contained"
                  disabled={
                    countryInput !== undefined &&
                    countryInput !== "" &&
                    cPassword !== undefined &&
                    password !== undefined &&
                    password !== "" &&
                    cPassword !== "" &&
                    errors.password === undefined &&
                    !registerLoading &&
                    errors.confirmPassword === undefined
                      ? false
                      : true
                  }
                  onClick={() => registerFunction()}
                >
                  {registerLoading ? (
                    <CircularProgress></CircularProgress>
                  ) : (
                    "OK"
                  )}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => registeredHandleClose()}
                >
                  Cancel
                </Button>
              </Box>
            </Dialog>

            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{
                  borderRadius: "1rem",
                  bgcolor: "rgb(225 245 254)",
                  boxShadow: 2,
                  mx: "auto",
                  color: "black",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                {loading ? <CircularProgress></CircularProgress> : "Submit"}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default EnrollForm;
