import CancelIcon from "@mui/icons-material/Cancel";
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
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { cleanRegisterStatus } from "../../redux/slice/SubscriptionSlice";
import { SubscriptionPlanRegisterAsync } from "../../redux/thunk/Subscription";
import enrollStyle from "../MultipurposeEnrollForm/EnrollStyle";
import TextInput from "../../components/Backend/Admin/Posts/Form/TextInput";
import SelectInput from "../../components/Backend/Admin/Posts/Form/SelectInput";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getCookie } from "../../Utils/GetCookies";
function SubscriptionForm() {
  const country = localStorage.getItem("country");
  const frontEndURL = process.env.REACT_APP_FRONTEND_URL;


  const {
    subscriptionFrontendRegisterStatus,
    subscriptionFrontendRegister,
    subscriptionFrontendRegisterError,
  } = useSelector((state) => state.subscription);

  const buying_user_id = localStorage.getItem("buying_user_id");
  let userId;
  if (buying_user_id) {
   
    userId = buying_user_id;
  } else {
    userId = localStorage.getItem("userId");
  }

  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [sendRegister, setSendRegister] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [originalFees, setOriginalFees] = useState(0);

  const [expanded, setExpanded] = useState(false);
  const userToken = getCookie("userToken");
  const [paymentImg, setPaymentImg] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
    // reset,
    setValue,

    watch,
  } = useForm();

  let payment = watch("payment");
  let fees = watch("fees");
  let transaction = watch("transactionUpload");
  let bank = watch("bank");
  let type = watch("type");
   

  useEffect(() => {
    if (userId === null && userToken === null) {
      swal({
        title: "Warning",
        text: "You are not logged in",
        icon: "warning",
        button: "OK!",
        closeOnClickOutside: false,
      }).then(() => {
        localStorage.setItem("prevURL", "/subscription");
        navigate("/login/");
      });
    }
  });

  useEffect(() => {
    if (state.plan !== undefined && state.plan !== null) {
      setValue("subscription", state.plan.name);
      let defaultFees;
      if (country !== "MMK") {
        if (country == "USD") {
          defaultFees = (state.plan.oversea_fees * 0.65).toFixed(2);
          setOriginalFees(defaultFees + " USD");
        } else if (country == "SGD") {
          defaultFees = (state.plan.oversea_fees * 0.9).toFixed(2);
          setOriginalFees(defaultFees + " SGD");
        } else if (country == "THB") {
          defaultFees = (state.plan.oversea_fees * 24.63).toFixed(2);
          setOriginalFees(defaultFees + " THB");
        } else if (country == "NZD") {
          defaultFees = (state.plan.oversea_fees * 1.09).toFixed(2);
          setOriginalFees(defaultFees + " NZD");
        } else {
          defaultFees = state.plan.oversea_fees;
          setOriginalFees(defaultFees + " AUD");
        }
      } else {
        defaultFees = state.plan.fees;
        setOriginalFees(defaultFees + " MMK");
      }

      // console.log(,"USD >>>",defaultFees)

      if (state.plan?.discount_status === 1) {
        setValue(
          "fees",
          (
            defaultFees -
            (defaultFees * state.plan?.discount_percent) / 100
          ).toFixed(2)
        );
        setDiscount(true);
      } else {
        setValue("fees", defaultFees);
        setDiscount(false);
      }
    }
  }, [setValue, state.plan, state, country]);

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
        setPaymentImg("kpay.jpg");
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
        setPaymentImg("cbpay.jpg");
      }
    }

    if (bank === "AYA") {
      if (type === "special") {
        setValue("accountNumber", "200-4825-571");
      }
      if (type === "normal") {
        setValue("accountNumber", "4002-9027-482");
      }
      if (type === "pay") {
        setValue("accountNumber", "09-968706444");
        setPaymentImg("ayapay.jpg");
      }
    }
    if (bank === "krunthai") {
      setValue("accountNumber", "663-9-24298-2");
      setValue("accountName", "Kan Tun Wai");
      setPaymentImg("promptpay.jpg");
    }
  }, [bank, setValue, type]);

  let saveType = async (data) => {
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("sub_plan_id", state.plan.id);
    formData.append("plan_name", state.plan.name);
    formData.append("plan_fees", data.fees);
    formData.append("country", country);
    let currency = localStorage.getItem("country");

    formData.append("currency", currency);
    // formData.append(
    //   "currency",
    //   currency === "Myanmar"
    //     ? "MMK"
    //     : currency === "International"
    //     ? "AUD"
    //     : currency
    // );
    if (country !== "MMK" && country !== "THB") {
      formData.append("payment_method", "digital");
      formData.append("provider_name", "stripe");
      setValue("payment", "digital");
    } else {
      formData.append("payment_method", data.payment);
      if (data.payment === "digital") {
        if (country !== "MMK") {
          formData.append("provider_name", "stripe");
        } else {
          formData.append("provider_name", "dinger");
        }
      } else {
        formData.append("bank", data.bank);
        formData.append("payment_type", data.type);
        // formData.append("transaction", data.transactionUpload);
        formData.append("media", data.transactionUpload);
      }
    }

    // registerForm(formData);

    dispatch(
      SubscriptionPlanRegisterAsync({
        path: "purchase-plan",
        postData: formData,
      })
    );
    setSendRegister(true);
  };

  useEffect(() => {
    if (sendRegister) {
      let backPath = localStorage.getItem("backToPath");
      if (subscriptionFrontendRegisterStatus === "succeeded") {
      console.log(subscriptionFrontendRegister,"subscriptionFrontendRegister")

        if (subscriptionFrontendRegister.payment_method === "digital") {
          dispatch(cleanRegisterStatus());
          setSendRegister(false);
          console.log(subscriptionFrontendRegister, "<<<<");
          // window.location.href = subscriptionFrontendRegister.payment_url;
        } else {
          swal({
            title: "Success",
            text: subscriptionFrontendRegister.message,
            icon: "success",
            button: "OK!",
            closeOnClickOutside: false,
          }).then(() => {
            // navigate(backPath);
          });
        }

        // swal({
        //   title: "Success",
        //   text: subscriptionFrontendRegister.message,
        //   icon: "success",
        //   button: "OK!",
        //   closeOnClickOutside: false,
        // }).then(() => {

        // });
      }
      if (subscriptionFrontendRegisterError) {
        swal({
          title: "Warning",
          text: "We still implement international payment",
          icon: "warning",
          button: "OK!",
          closeOnClickOutside: false,
        }).then(() => {
          dispatch(cleanRegisterStatus());
          setSendRegister(false);
          // navigate(backPath);
        });
      }
    }
  }, [
    sendRegister,
    payment,
    subscriptionFrontendRegisterStatus,
    subscriptionFrontendRegister,
    subscriptionFrontendRegisterError,
    dispatch,
    navigate,
  ]);

  //   async (request) => {
  //     setLoading(true);

  //     const res = await axios
  //       .post(`${backendURL}${path}`, request)
  //       .catch(function (error) {
  //         if (error.response) {
  //           // The request was made and the server responded with a status code
  //           // that falls out of the range of 2xx

  //           swal({
  //             title: "Warning",
  //             text: error.message,
  //             icon: "warning",
  //             button: "OK!",
  //             allowOutsideClick: false,
  //             closeOnClickOutside: false,
  //           });
  //           setLoading(false);
  //         } else if (error.request) {
  //           // The request was made but no response was received
  //           // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //           // http.ClientRequest in node.js
  //
  //           swal({
  //             title: "Warning",
  //             text: error.message,
  //             icon: "warning",
  //             button: "OK!",
  //             allowOutsideClick: false,
  //             closeOnClickOutside: false,
  //           });
  //           setLoading(false);
  //         } else {
  //           // Something happened in setting up the request that triggered an Error
  //
  //           swal({
  //             title: "Warning",
  //             text: error.message,
  //             icon: "warning",
  //             button: "OK!",
  //             allowOutsideClick: false,
  //             closeOnClickOutside: false,
  //           });
  //           setLoading(false);
  //         }
  //
  //       });

  //     if (res.status === 200) {
  //       swal({
  //         title: "Success",
  //         text: res.data.message,
  //         icon: "success",
  //         button: "OK!",
  //         allowOutsideClick: false,
  //         closeOnClickOutside: false,
  //       });
  //       setLoading(false);
  //       // navigate(-1);
  //       reset();
  //     } else {
  //       swal({
  //         title: "Warning",
  //         text: res.data.message,
  //         icon: "warning",
  //         button: "OK!",
  //         allowOutsideClick: false,
  //         closeOnClickOutside: false,
  //       });
  //       setLoading(false);
  //       reset();
  //     }
  //   },
  //   [backendURL, reset, path]
  // );

  const DetailLayout = ({ text }) => {
    return (
      <Box sx={{ ...enrollStyle.inputStyle, padding: 2, my: 1, width: "100%" }}>
        {text}
      </Box>
    );
  };

  const DetailList = ({ text }) => {
    return (
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ width: "5%" }}>
          {" "}
          <CheckCircleIcon
            sx={{
              mr: 1,
              color: "green",
              fontSize: {
                xs: "0.8rem",
                sm: "0.8rem",
                lg: "1rem",
                xl: "1.1rem",
              },
              mt: 0.5,
            }}
            className="check-icon"
          ></CheckCircleIcon>
        </Box>
        <Box> {text}</Box>
      </Box>
    );
  };

  const accordionContainer = {
    width: "100%",
    backgroundColor: "rgb(225 245 254)",

    boxShadow: 5,
    "&.MuiPaper-root": {
      borderRadius: "3rem",
    },
  };

  const accordionDetail = {
    p: 2,
    backgroundColor: "whitesmoke",
    color: "white",
    m: 2,
    borderRadius: "2rem",
    transition: "1s ease",
    boxShadow: 4,
  };

  const DescriptionAccordion = ({ title, content }) => {
    return (
      <Box
        sx={{
          mt: 2,
          width: {
            xs: "80%",
            md: "80%",
          },
          mx: "auto",
        }}
      >
        <Accordion
          sx={{ ...accordionContainer }}
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "83%", flexShrink: 0, color: "black" }}>
              {title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ ...accordionDetail }}>
            {content}
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  };

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
              xs: "90vw",
              md: "70vw",
              xl: "50vw",
            },

            m: "auto",

            boxShadow: 5,
            py: 1,
          }}
        >
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

            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                width: "60%",
                fontWeight: "600",
                mb: 2,
              }}
            >
              Subscription plan form
            </Typography>

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
                display: "flex",
                justifyContent: "space-between",
                mx: "auto",
                alignItem: "center",
              }}
            >
              <Box
                sx={{
                  width: "75%",
                  mx: "auto",
                  "& .MuiInputBase-root": {
                    cursor: "default",
                  },
                  "& input": {
                    cursor: "default",
                  },
                }}
              >
                <TextInput
                  name="subscription"
                  control={control}
                  label="Subscription"
                  type="text"
                  rules={{
                    required: {
                      // value: true,
                      // message: "*Fees is required",
                    },
                  }}
                  readOnly={true}
                  defaultValue=""
                  error={!!errors.subscription}
                  errorMessage={errors?.subscription?.message}
                  inputStyle={{
                    ...enrollStyle.inputStyle,
                  }}
                  startAdornment={
                    <InputAdornment
                      position="end"
                      sx={{
                        width: "25%",
                      }}
                    >
                      <Box aria-label="lock icon">
                        <i
                          className="fa-solid fa-tag"
                          style={{ color: "#5386df" }}
                        ></i>
                      </Box>
                    </InputAdornment>
                  }
                />
              </Box>
            </Box>
            {state.plan !== undefined && state.plan !== null && (
              <Box
                sx={{
                  width: "75%",
                  mx: "auto",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    mx: "auto",
                    backgroundColor: "whitesmoke",
                    my: 2,
                    boxShadow: 2,
                    borderRadius: "1rem",
                    padding: "1rem",
                  }}
                >
                  <Typography
                    variant={"h6"}
                    sx={{
                      textAlign: "center",
                      fontWeight: 800,
                      textDecoration: "underline",
                    }}
                  >
                    Subscription Detail
                  </Typography>
                  {[1, 5, 8, 9].includes(state.plan.plan_type_id) && (
                    <DetailList
                      text={
                        state.plan.limited_status === 1 ? (
                          <span>
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              Unlimited{" "}
                            </span>
                            practice for {state.plan.number_of_day} days .
                          </span>
                        ) : (
                          <span>
                            Practice score{" "}
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              {state.plan.scoring_count}
                            </span>{" "}
                            tokens .
                          </span>
                        )
                      }
                    />
                  )}

                  {[2, 5, 8, 9].includes(state.plan.plan_type_id) && (
                    <DetailList
                      text={
                        state.plan.mt_limited_status == 1 ? (
                          <span>
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              Unlimited{" "}
                            </span>
                            Mock Test practice for {state.plan.mt_number_of_day}{" "}
                            days .
                          </span>
                        ) : (
                          <span>
                            {" "}
                            Mock test score{" "}
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              {state.plan.mocktest_count}
                            </span>{" "}
                            tokens .
                          </span>
                        )
                      }
                    />
                  )}

                  <DetailList
                    text={
                      <span>
                        Original Fees{" "}
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          {originalFees} .
                        </span>
                      </span>
                    }
                  />

                  <DetailList
                    text={
                      state.plan.discount_status === 1 ? (
                        <span>
                          Discount{" "}
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            {state.plan.discount_percent}%
                          </span>
                          .Discounted Price{" "}
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            {fees} {country}
                            {/* !== "Myanmar"
                              ? country === "USD"
                                ? " $"
                                : " AUD$"
                              : "  MMK" */}
                          </span>
                        </span>
                      ) : (
                        <span>No discount avialable .</span>
                      )
                    }
                  />
                </Box>
              </Box>
            )}
            <Box sx={{ width: "95%", mx: "auto" }}>
              <DescriptionAccordion
                title={"Description"}
                content={
                  state.plan.description !== "[]" &&
                  state.plan.description !== undefined &&
                  JSON.parse(state.plan.description).map((d, index) => (
                    <DetailLayout
                      key={index}
                      text={<span style={{ color: "black" }}>{d}</span>}
                    />
                  ))
                }
              />
            </Box>

            {(country === "MMK" || country === "THB") && (
              <>
                <Divider sx={{ width: "80%", mx: "auto", my: 2 }}></Divider>

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
                      // rules={{
                      //   required: {
                      //     value: true,
                      //     message: "*Choose payment methods",
                      //   },
                      // }}
                      defaultValue={
                        country == "MMK" || country === "THB"
                          ? "manual"
                          : "digital"
                      }
                      render={({ field: { onChange } }) => (
                        <RadioGroup
                          onChange={(e) => onChange(e.target.value)}
                          defaultValue={"manual"}
                        >
                          <Box sx={{}}>
                            <FormControlLabel
                              value="manual"
                              control={<Radio />}
                              label="Manual Payment"
                            />
                            {country === "THB" && (
                              <FormControlLabel
                                value="digital"
                                control={<Radio />}
                                label="Digital Payment"
                              />
                            )}
                            {/* <FormControlLabel
                              value="digital"
                              control={<Radio />}
                              label="Digital Payment"
                            /> */}
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
                </Box>
              </>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: {
                  xs: "column",
                  lg: "row",
                },
                mx: "auto",
                alignItem: "center",
                width: "75%",
              }}
            >
              {(country === "MMK" ||
                (country === "THB" && payment === "manual")) && (
                <Box
                  sx={{
                    width: {
                      xs: "80%",
                      md: "45%",
                    },
                    mx: "auto",
                    my: 1,
                  }}
                >
                  <SelectInput
                    name="bank"
                    control={control}
                    defaultValue={""}
                    rules={{
                      required: {
                        value: true,
                        message: "*Bank is required",
                      },
                    }}
                    label="Bank"
                    inputStyle={{ ...enrollStyle.inputStyle }}
                    endAdornment={
                      <InputAdornment position="end" sx={{ width: "25%" }}>
                        <Box sx={{}} aria-label="lock icon">
                          <i
                            className="fa-solid fa-building-columns"
                            style={{ color: "#5386df" }}
                          ></i>
                        </Box>
                      </InputAdornment>
                    }
                    error={!!errors.bank}
                    errorMessage={errors?.bank?.message}
                  >
                    {country === "MMK"
                      ? [
                          { name: "KBZ", value: "KBZ" },
                          { name: "CB", value: "CB" },
                          { name: "AYA", value: "AYA" },
                        ].map((s, index) => (
                          <MenuItem key={index} value={s.value}>
                            {s.name}
                          </MenuItem>
                        ))
                      : [{ name: "Krunthai", value: "krunthai" }].map(
                          (s, index) => (
                            <MenuItem key={index} value={s.value}>
                              {s.name}
                            </MenuItem>
                          )
                        )}
                  </SelectInput>
                </Box>
              )}
              {/* {payment !== "" &&
                payment !== "digital" && */}
              {bank !== "" && payment !== undefined && bank !== undefined && (
                <Box
                  sx={{
                    width: {
                      xs: "80%",
                      md: "45%",
                    },
                    mx: "auto",
                    my: 1,
                  }}
                >
                  {bank === "krunthai" ? (
                    <SelectInput
                      name="type"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "*Account type is required",
                        },
                      }}
                      defaultValue=""
                      label="Account Type"
                      inputStyle={{ ...enrollStyle.inputStyle }}
                      endAdornment={
                        <InputAdornment position="end" sx={{ width: "25%" }}>
                          <Box sx={{}} aria-label="lock icon">
                            <i
                              className="fa-solid fa-money-check-dollar"
                              style={{ color: "#5386df" }}
                            ></i>
                          </Box>
                        </InputAdornment>
                      }
                      error={!!errors.type}
                      errorMessage={errors?.type?.message}
                    >
                      <MenuItem value={"normal"}>Normal</MenuItem>\
                      <MenuItem value={"promptPay"}>Prompt pay</MenuItem>
                    </SelectInput>
                  ) : (
                    <SelectInput
                      name="type"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "*Account type is required",
                        },
                      }}
                      defaultValue=""
                      label="Account Type"
                      inputStyle={{ ...enrollStyle.inputStyle }}
                      endAdornment={
                        <InputAdornment position="end" sx={{ width: "25%" }}>
                          <Box sx={{}} aria-label="lock icon">
                            <i
                              className="fa-solid fa-money-check-dollar"
                              style={{ color: "#5386df" }}
                            ></i>
                          </Box>
                        </InputAdornment>
                      }
                      error={!!errors.type}
                      errorMessage={errors?.type?.message}
                    >
                      <MenuItem value={"special"}>Special</MenuItem>
                      <MenuItem value={"normal"}>Normal</MenuItem>
                      <MenuItem value={"pay"}>
                        {bank === "KBZ"
                          ? "KBZ pay"
                          : bank === "CB"
                          ? "CB pay"
                          : bank === "AYA"
                          ? "AYA pay"
                          : ""}
                      </MenuItem>
                    </SelectInput>
                  )}
                </Box>
              )}
            </Box>
            {(country === "MMK" || country === "THB") &&
              payment === "manual" &&
              type !== "" &&
              type !== undefined && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: {
                        xs: "column",
                        lg: "row",
                      },
                      width: "75%",
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
                                fontSize: {
                                  xs: "0.8rem",
                                  md: "1rem",
                                },
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
                  {type == "pay" && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: {
                          xs: "column",
                          lg: "row",
                        },
                        width: "75%",
                        mx: "auto",
                        alignItem: "center",
                      }}
                    >
                      <img
                        src={`${frontEndURL}Image/payment/${paymentImg}`}
                        alt="placeholder"
                        // alignItem="center"
                        width={220}
                        height={200}
                      />
                    </Box>
                  )}
                  {type == "promptPay" && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",

                        width: "100%",
                        p: 2,

                        alignItem: "center",
                      }}
                    >
                      <img
                        src={`${frontEndURL}Image/payment/${paymentImg}`}
                        alt="placeholder"
                        // alignItem="center"
                        width={220}
                        height={"100%"}
                      />
                    </Box>
                  )}
                </>
              )}

            <Divider sx={{ width: "80%", mx: "auto", my: 1 }}></Divider>
            <Typography textAlign={"center"}>
              Fees
              {(country === "MMK" || country === "THB") &&
                payment === "manual" &&
                "&Payment transaction upload"}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                width: "75%",
                justifyContent: "space-between",

                alignItem: "center",
                backgroundColor: "whitesmoke",
                p: 1,
                m: 1,
                mx: "auto",
                borderRadius: "1rem",
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: "80%",
                    md: "45%",
                  },
                  mx: "auto",
                  "& .MuiInputBase-root": {
                    cursor: "default",
                  },
                  "& input": {
                    cursor: "default",
                  },
                }}
              >
                <TextInput
                  name="fees"
                  control={control}
                  // rules={{
                  //   required: {
                  //     value: true,
                  //     message: "*Email is required",
                  //   },
                  // }}
                  inputAdorement={
                    <InputAdornment position="end" sx={{ width: "25%" }}>
                      <Box sx={{}} aria-label="lock icon">
                        <i
                          className="fa-solid fa-coins"
                          style={{ color: "#5386df" }}
                        ></i>
                      </Box>
                    </InputAdornment>
                  }
                  defaultValue=""
                  label="Fees"
                  readOnly={true}
                  error={!!errors.fees}
                  errorMessage={errors?.fees?.message}
                  inputStyle={{
                    ...enrollStyle.inputStyle,
                  }}
                />

                <FormHelperText>
                  {fees}
                  {discount ? "(discounted price)" : ""} {country}
                </FormHelperText>
              </Box>
              {(country === "MMK" || country === "THB") &&
                payment === "manual" && (
                  <Box
                    sx={{
                      width: {
                        xs: "80%",
                        md: "45%",
                      },
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
                            {transaction !== undefined && transaction !== null
                              ? transaction.name
                              : ""}
                          </Typography>
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
                ml: {
                  xs: 5,
                  md: "5rem",
                },
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

            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                type="submit"
                disabled={
                  subscriptionFrontendRegisterStatus === "loading"
                    ? true
                    : false
                }
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
                {subscriptionFrontendRegisterStatus === "loading" ? (
                  <CircularProgress></CircularProgress>
                ) : (
                  "Submit"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default SubscriptionForm;
