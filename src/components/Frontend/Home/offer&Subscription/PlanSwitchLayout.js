import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Switch,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";

import { CardStyle } from "./CardStyle";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "../../../../redux/slice/PathSlice";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import styled from "@emotion/styled";
import FullWidthTabs from "./SubscriptionTabs";
import "./PlanSwitchStyle.css";
import { useTranslation } from "react-i18next";

export const SimplePlanSwitch = styled(Switch)(({ theme }) => ({
  width: 400,
  height: 50,
  padding: 2,

  "& .MuiSwitch-switchBase": {
    padding: 0,
    transform: "translateX(10px)",
    transition: "1s ease",

    "&.Mui-checked": {
      transform: "translateX(205px)",
      "& .MuiSwitch-thumb": {
        background: "rgb(4,30,66)",
        color: "white",
      },

      "& .MuiSwitch-thumb:before": {
        content: "'Flexible Plan'",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        background: "whitesmoke",
      },
    },
  },
  "& .MuiTouchRipple-root": {
    display: "inline-block",
    height: 30,
    top: 11,
    borderRadius: "5rem",
    width: 185,
    mt: "0.1rem",
  },
  "& .MuiSwitch-thumb": {
    // background:
    //   "linear-gradient(49deg, rgba(110,162,255,1) 5%,rgba(164,255,176,1) 80% )",
    // background: "red",

    width: 185,
    outline: "2px solid whitesmoke",
    outlineOffset: "-2px",
    borderRadius: "5rem",
    height: 30,
    display: "inline-block",
    marginTop: "0.6rem",
    boxShadow: 3,
    background: "rgb(214 11 11)",
    "&:before": {
      marginTop: "0.1rem",
      content: "'Classic Plan'",
      display: "flex",
      fontSize: "1.1rem",

      color: "white",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      width: "100%",
      height: "100%",

      left: 0,
      top: 0,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    height: 47,
    transition: "1s ease",
    "&:before": {
      content: "'Classic Plan'",
      position: "absolute",
      left: "15%",
      top: 12,

      fontSize: "1.1rem",
      color: "grey",
    },
    "&:after": {
      content: "'Flexible Plan'",
      position: "absolute",
      right: "13%",
      top: 12,
      fontSize: "1.1rem",
      color: "grey",
    },
    width: 395,
    // backgroundColor: theme.palette.mode === "dark" ? "red" : "grey",

    boxShadow: "inset 0px 0px 2px 1px #242003",
    background: "whitesmoke",

    borderRadius: 66 / 2,
  },
}));

const TextLine = (props) => {
  return (
    <Box sx={{ display: "flex", mb: 1 }}>
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
      {props.checkCard == 1 ? (
        <Typography
          sx={{
            textAlign: "left",
            fontSize: {
              xs: "0.7rem",
              sm: "0.9rem",
              lg: "0.9rem",
              xl: "1.2rem",
            },
            fontWeight: "500",
          }}
        >
          {props.children}
        </Typography>
      ) : (
        <Typography
          sx={{
            textAlign: "left",
            fontSize: {
              xs: "0.7rem",
              sm: "0.8rem",
              lg: "0.9rem",
              xl: "1rem",
            },
            fontWeight: "500",
          }}
        >
          {props.children}
        </Typography>
      )}
    </Box>
  );
};

function PlanSwitchLayout(props) {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  localStorage.setItem("backToPath", "/");
  const currentLanguage = i18n.language;

  console.log(currentLanguage, "current language");

  const { subscriptionFrontend, subscriptionFrontendStatus } = props;
  const { country } = useSelector((state) => state.user);
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    // checked === true ? setToggle(1) : setToggle(0);
  };

  const frontEndURL = process.env.REACT_APP_FRONTEND_URL;

  const clickBuyHandler = (plan) => {
    dispatch(setPath());
    navigate("/subscription/form", {
      state: {
        plan: plan,
      },
    });
  };
  return (
    <>
      <Box
        pb={5}
        sx={{
          width: {
            md: "90%",
            xl: "90%",
          },
          mx: "auto",
        }}
      >
        {/* <subscription title */}
        <Typography variant="h3" sx={{ ...CardStyle.hStyle }}>
          {checked ? "SUBSCRIPTION PLAN" : "Flexible Plan"}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <SimplePlanSwitch
            checked={checked}
            onChange={handleChange}
            sx={{
              transform: {
                xs: "scale(0.7)",
                sm: "scale(1)",
              },
            }}
          />
        </Box>
        {!checked && (
          <Box>
            {subscriptionFrontendStatus === "succeeded" &&
            subscriptionFrontend !== "" &&
            subscriptionFrontend !== undefined ? (
              <Carousel
                swipeable={true}
                draggable={true}
                responsive={CardStyle.responsive}
                ssr={true} //means to render carousel on server-side.
                // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlay={false}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="all 1s ease"
                transitionDuration={1000}
                containerClass={props.containerClass}
                removeArrowOnDeviceType={["desktop", "laptop"]}
                // deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-50-px"
              >
                {subscriptionFrontend.map((s, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 2,
                      py: 2,

                      // width: { sm: "100%", md: "30%", lg: "30%", xl: "30%" },
                    }}
                  >
                    <Card
                      sx={{
                        ...(index !== 1
                          ? CardStyle.cardStyle
                          : CardStyle.cardStyle1),

                        "&.MuiPaper-root": {
                          overflow: "visible",
                        },
                      }}
                    >
                      <CardHeader
                        title={
                          <Typography
                            variant="h4"
                            sx={{
                              ...CardStyle.cardHeader,
                              fontSize: {
                                xs: "16px",
                                sm: "17px",
                                md: "1.6rem",
                                lg: "1.6rem",
                              },
                              color: "white",
                            }}
                          >
                            {currentLanguage == "en" ? s.name : s?.name_burmese}
                          </Typography>
                        }
                        action={
                          s?.discount_status !== 0 && (
                            <>
                              {/* <Box
                            sx={{
                              position: "absolute",
                              top: "-20%",
                              right: "60%",
                              background: "white",
                              borderRadius: "2rem",
                              m: 0,
                              p: 1,
                              color: "red",
                              border: "1px solid grey",
                              boxShadow: 5,
                              fontWeight: 400,
                            }}
                          >
                            <Typography variant="h5">
                               Popular Plan
                            </Typography>
                          </Box> */}
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: "-20%",
                                  right: "-5%",
                                  background: "white",
                                  borderRadius: "2rem",
                                  m: 0,
                                  p: 1,
                                  color: "red",
                                  border: "1px solid grey",
                                  boxShadow: 5,
                                  fontWeight: 800,
                                }}
                              >
                                <Typography variant="h5">
                                  {s.discount_percent}% Off
                                </Typography>
                              </Box>
                            </>
                          )
                        }
                        sx={{
                          ...(index !== 1
                            ? CardStyle.planCardHeader
                            : CardStyle.planCardHeader1),
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      />

                      <CardContent
                        sx={{
                          minHeight: {
                            xs: "19rem",

                            lg: "30rem",
                          },
                        }}
                      >
                        {/* 100$ / 1month */}
                        {s?.discount_status === 1 ? (
                          <>
                            <Typography
                              variant="h5"
                              component="h5"
                              sx={{ ...CardStyle.costStyle }}
                            >
                              <span style={{ textDecoration: "line-through" }}>
                                {s.show_fees}{" "}
                                {/* {country !== "MMK"
                              ? country === "USD"
                                ? " USD"
                                : " AUD"
                              : " MMK"}  */}
                                {country}
                              </span>
                              <br />
                              {(
                                s.show_fees -
                                (s.show_fees * s.discount_percent) / 100
                              ).toFixed(2)}{" "}
                              {/* {country !== "MMK"
                            ? country === "USD"
                              ? " USD"
                              : " AUD"
                            : " MMK"} */}
                              {country}
                            </Typography>
                          </>
                        ) : (
                          <Typography
                            variant="h5"
                            component="h5"
                            sx={{
                              ...CardStyle.costStyle,
                              marginBottom: "1rem",
                            }}
                          >
                            {s.show_fees}{" "}
                            {/* {country !== "MMK"
                              ? country === "USD"
                                ? " USD"
                                : " AUD"
                              : " MMK"}  */}
                            {country}
                          </Typography>
                        )}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            minHeight: {
                              xs: "19rem",
                              lg: "20rem",
                            },

                            flex: 1,
                          }}
                        >
                          <Box
                            sx={{
                              height: "100%",
                            }}
                          >
                            {s.plan_type_id === 1 && (
                              <>
                                {currentLanguage === "en"
                                  ? JSON.parse(s?.description).map(
                                      (d, index) => (
                                        <TextLine key={index}>{d}</TextLine>
                                      )
                                    )
                                  : s?.description_burmese !== undefined &&
                                    JSON.parse(s?.description_burmese).map(
                                      (d, index) => (
                                        <TextLine key={index}>{d}</TextLine>
                                      )
                                    )}
                              </>
                            )}
                            {s.plan_type_id === 2 && (
                              <>
                                {/* Score Card within taken days */}
                                {currentLanguage === "en" ? (
                                  JSON.parse(s.description).map((d, index) => (
                                    <TextLine key={index}>{d}</TextLine>
                                  ))
                                ) : s?.description_burmese != null &&
                                  s?.description_burmese != undefined ? (
                                  JSON.parse(s?.description_burmese).map(
                                    (d, index) => (
                                      <TextLine key={index}>{d}</TextLine>
                                    )
                                  )
                                ) : (
                                  <></>
                                )}
                                {/* {typeof s.description === "string" &&
                        s.description.includes("[") ? (
                          JSON.parse(s.description).map((d, index) => (
                            <TextLine key={index}>{d}</TextLine>
                          ))
                        ) : (
                          <TextLine>{s.description}</TextLine>
                        )} */}
                              </>
                            )}
                            {s.plan_type_id === 5 && (
                              <>
                                {/* Score Card within taken days */}
                                {currentLanguage === "en" ? (
                                  JSON.parse(s.description).map((d, index) => (
                                    <TextLine key={index}>{d}</TextLine>
                                  ))
                                ) : s?.description_burmese != undefined &&
                                  s?.description !== null ? (
                                  JSON.parse(s?.description_burmese).map(
                                    (d, index) => (
                                      <TextLine key={index}>{d}</TextLine>
                                    )
                                  )
                                ) : (
                                  <></>
                                )}
                                {/* {typeof s.description === "string" &&
                        s.description.includes("[") ? (
                          JSON.parse(s.description).map((d, i) => (
                            <TextLine key={i} checkCard={index}>
                              {d}
                            </TextLine>
                          ))
                        ) : (
                          <TextLine>{s.description}</TextLine>
                        )} */}
                              </>
                            )}
                            {s.plan_type_id === 4 && (
                              <>
                                {/* <TextLine>Score Card within taken days</TextLine> */}
                                {typeof s.description === "string" &&
                                s.description.includes("[") ? (
                                  JSON.parse(s.description).map((d, index) => (
                                    <TextLine key={index}>{d}</TextLine>
                                  ))
                                ) : (
                                  <TextLine>{s.description}</TextLine>
                                )}
                              </>
                            )}
                            {s.plan_type_id === 8 && (
                              <>
                                {/* <TextLine>Practice Resource</TextLine> */}

                                {currentLanguage === "en" ? (
                                  JSON.parse(s.description).map((d, index) => (
                                    <TextLine key={index}>{d}</TextLine>
                                  ))
                                ) : s?.description_burmese != undefined &&
                                  s?.description_burmese != null ? (
                                  JSON.parse(s?.description_burmese).map(
                                    (d, index) => (
                                      <TextLine key={index}>{d}</TextLine>
                                    )
                                  )
                                ) : (
                                  <></>
                                )}
                                {/* {typeof s.description === "string" &&
                        s.description.includes("[") ? (
                          JSON.parse(s.description).map((d, index) => (
                            <TextLine key={index}>{d}</TextLine>
                          ))
                        ) : (
                          <TextLine>{s.description}</TextLine>
                        )} */}
                              </>
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                      <Button
                        variant="outlined"
                        sx={{ ...CardStyle.subscribeBtn }}
                        onClick={() => clickBuyHandler(s)}
                      >
                        Buy
                      </Button>
                    </Card>
                  </Box>
                ))}
              </Carousel>
            ) : (
              <Box sx={{ display: "flex", width: "100%", height: "70vh" }}>
                <CircularProgress sx={{ m: "auto" }}></CircularProgress>
              </Box>
            )}
            {subscriptionFrontendStatus === "failed" && (
              <Typography textAlign="center">
                Failed .Please check your network & try reload
              </Typography>
            )}
            {subscriptionFrontendStatus === "succeeded" &&
              subscriptionFrontend.length === 0 && (
                <Typography textAlign="center" sx={{ height: "20vh" }}>
                  No subscription added yet
                </Typography>
              )}
          </Box>
        )}
        {checked && (
          <Box sx={{ my: 3 }}>
            <FullWidthTabs></FullWidthTabs>
          </Box>
        )}
      </Box>
      {/* subscripiont box end */}
    </>
  );
}

export default PlanSwitchLayout;

export const ClassicPlan = (props) => {
   
  const { subscriptionFrontend, subscriptionFrontendStatus } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  // Get the current language
  const currentLanguage = i18n.language;

  const { country } = useSelector((state) => state.user);
  const clickBuyHandler = (plan) => {
    dispatch(setPath());
    navigate("/subscription/form", {
      state: {
        plan: plan,
      },
    });
  };
  return (
    <Box
    pb={5}
    sx={{
      width: "100%",
      maxWidth: "100%", // Prevents horizontal overflow
      mx: "auto",
      // backgroundImage: `url(${process.env.REACT_APP_FRONTEND_URL}Image/chirstmas-plan.png)`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      position: "relative", // Anchor absolute children
      overflow: "hidden", // Prevent scrolling
    }}
  >
    {/* chirstmas theme */}
    {/* <Box
      sx={{
        position: "absolute",
         top: { xs: "30%", md: "30%", xl: "22%",lg:"33%" }, // Adjust for responsiveness

        right: { xs: "-7%", md: "-6%", xl: "-3%" ,lg:"-4%"}, // Adjust for responsiveness
        transform: "translateY(-50%)",
        m: 0,
        p: 1,
      }}
    >
       <Box
        sx={{
          width: {
            xs: "15vw",
            // sm: "1vw",
            md: "15vw",
            lg: "11vw",
            xl: "9vw",
          },
          overflow: "hidden",
        }}
      >
        <img
          src={`${process.env.REACT_APP_FRONTEND_URL}Image/chirstmas-tree.png`}
          style={{ width: "100%", height: "auto", transform: "rotate(-45deg)" }}
          alt="Christmas Tree"
        />
      </Box>-
      
    </Box> */}
  
    {/* Subscription Title */}
    <Typography variant="h3" sx={{ ...CardStyle.hStyle, textAlign: "center" }}>
      SUBSCRIPTION PLAN
    </Typography>
      
      <Box>
        {subscriptionFrontendStatus === "succeeded" &&
        subscriptionFrontend !== "" &&
        subscriptionFrontend !== undefined ? (
          <Carousel
            swipeable={true}
            draggable={true}
            responsive={CardStyle.responsive}
            ssr={true} //means to render carousel on server-side.
            // autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlay={false}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all 1s ease"
            transitionDuration={1000}
            containerClass={props.containerClass}
            removeArrowOnDeviceType={["desktop", "laptop"]}
            // deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-50-px"
          >
            {subscriptionFrontend.map((s, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  py: 4,

                  // width: { sm: "100%", md: "30%", lg: "30%", xl: "30%" },
                }}
              >
                <Card
                  sx={{
                    ...(index !== 1
                      ? CardStyle.cardStyle
                      : CardStyle.cardStyle1),

                    "&.MuiPaper-root": {
                      overflow: "visible",
                    },
                  }}
                >
                  <CardHeader
                    title={
                      <>
                        <Typography
                          variant="h4"
                          sx={{
                            ...CardStyle.cardHeader,
                            fontSize: {
                              xs: "16px",
                              sm: "17px",
                              md: "1.6rem",
                              lg: "1.6rem",
                            },
                            color: "white",
                          }}
                        >
                          {currentLanguage == "en" ? s.name : s?.name_burmese}
                        </Typography>
                        {s.id === 11 && (
                          <Box
                            sx={{
                              background: "red",
                              borderRadius: "2rem",

                              mx: "auto",
                              p: 1,
                              color: "white",
                              border: "1px solid grey",
                              boxShadow: 5,
                              fontWeight: 400,
                            }}
                          >
                            <Typography
                              variant="h5"
                              sx={{ fontSize: "1.2rem" }}
                            >
                              ( Most Popular Choice )
                            </Typography>
                          </Box>
                        )}
                      </>
                    }
                    action={
                      s?.discount_status !== 0 && (
                        <>
                          {/* // chirstmas theme */}
                            {/*  {
                                s.id == 11 ? (
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        top: {
                                          xs: "-51%",
                                          md: "-44%",
                                          xl: "-46%"},
                                        right: {
                                          xs: "80%",
                                          md: "81%",
                                          xl: "81%"},  
                                        m: 0,
                                        p: 1
                                        
                                      }}
                                    >
                                  <Typography variant="h5">
                                      Popular Plan 40 
                                        width: {
                                            md: "90%",
                                            xl: "90%",
                                          },
                                    </Typography>   
                                    <img
                                        // src="http://localhost:3000/Image/Banner.png"
                                        src={`${process.env.REACT_APP_FRONTEND_URL}Image/chirstmas-hat.png`}
                                        style={{ width: "100px",height:"30%"  ,  backgroundColor: "transparent", // Ensure no background
                                        }}
                                        alt="Christmas Hat"
                                      
                                      />
                                    </Box>

                                ) : (

                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: {
                                      xs: "-80%",
                                      md: "-70%",
                                      xl: "-70%"},
                                    right: {
                                      xs: "81%",
                                      md: "83%",
                                      xl: "83%"},  
                                  
                                    m: 0,
                                    p: 1
                                    
                                  }}
                                >
                                  
                                  <img
                                      // src="http://localhost:3000/Image/Banner.png"
                                      src={`${process.env.REACT_APP_FRONTEND_URL}Image/chirstmas-hat.png`}
                                      style={{ width: "100px",height:"30%"  ,  backgroundColor: "transparent", // Ensure no background
                                      }}
                                      alt="Christmas Hat"
                                    
                                    />
                                </Box>

                                )
                              } 
                         */}
                          <Box
                            sx={{
                              position: "absolute",
                              top: "-20%",
                              right: "-5%",
                              background: "white",
                              borderRadius: "2rem",
                              m: 0,
                              p: 1,
                              color: "red",
                              border: "1px solid grey",
                              boxShadow: 5,
                              fontWeight: 800,
                            }}
                          >
                            <Typography variant="h5">
                              {s.discount_percent}% Off
                            </Typography>
                          </Box>
                        </>
                      )
                    }
                    sx={{
                      ...(index !== 1
                        ? CardStyle.planCardHeader
                        : CardStyle.planCardHeader1),
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  />

                  <CardContent
                    sx={{
                      minHeight: {
                        xs: "19rem",

                        lg: "32rem",
                      },
                    }}
                  >
                 
                    {/* 100$ / 1month */}
                    {s?.discount_status === 1 ? (
                      <>
                        <Typography
                          variant="h5"
                          component="h5"
                          sx={{ ...CardStyle.costStyle }}
                        >
                          <span style={{ textDecoration: "line-through" }}>
                            {s.show_fees}{" "}
                            {/* {country !== "MMK"
                              ? country === "USD"
                                ? " USD"
                                : " AUD"
                              : " MMK"}  */}
                            {country}
                          </span>
                          <br />
                          {(
                            s.show_fees -
                            (s.show_fees * s.discount_percent) / 100
                          ).toFixed(2)}{" "}
                          {/* {country !== "MMK"
                            ? country === "USD"
                              ? " USD"
                              : " AUD"
                            : " MMK"} */}
                          {country}
                        </Typography>
                      </>
                    ) : (
                      <Typography
                        variant="h5"
                        component="h5"
                        sx={{ ...CardStyle.costStyle, marginBottom: "1rem" }}
                      >
                        {s.show_fees}{" "}
                        {/* {country !== "MMK"
                              ? country === "USD"
                                ? " USD"
                                : " AUD"
                              : " MMK"}  */}
                        {country}
                      </Typography>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        minHeight: {
                          xs: "19rem",
                          lg: "20rem",
                        },

                        flex: 1,
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                        }}
                      >
                        {s.plan_type_id === 1 && (
                          <>
                            {currentLanguage === "en"
                              ? JSON.parse(s?.description).map((d, index) => (
                                  <TextLine key={index}>{d}</TextLine>
                                ))
                              : s?.description_burmese !== undefined &&
                                JSON.parse(s?.description_burmese).map(
                                  (d, index) => (
                                    <TextLine key={index}>{d}</TextLine>
                                  )
                                )}
                          </>
                        )}
                        {s.plan_type_id === 2 && (
                          <>
                            {/* Score Card within taken days */}
                            {currentLanguage === "en" ? (
                              JSON.parse(s.description).map((d, index) => (
                                <TextLine key={index}>{d}</TextLine>
                              ))
                            ) : s?.description_burmese != null &&
                              s?.description_burmese != undefined ? (
                              JSON.parse(s?.description_burmese).map(
                                (d, index) => (
                                  <TextLine key={index}>{d}</TextLine>
                                )
                              )
                            ) : (
                              <></>
                            )}
                            {/* {typeof s.description === "string" &&
                        s.description.includes("[") ? (
                          JSON.parse(s.description).map((d, index) => (
                            <TextLine key={index}>{d}</TextLine>
                          ))
                        ) : (
                          <TextLine>{s.description}</TextLine>
                        )} */}
                          </>
                        )}
                        {s.plan_type_id === 5 && (
                          <>
                            {/* Score Card within taken days */}
                            {currentLanguage === "en" ? (
                              JSON.parse(s.description).map((d, index) => (
                                <TextLine key={index}>{d}</TextLine>
                              ))
                            ) : s?.description_burmese != undefined &&
                              s?.description !== null ? (
                              JSON.parse(s?.description_burmese).map(
                                (d, index) => (
                                  <TextLine key={index}>{d}</TextLine>
                                )
                              )
                            ) : (
                              <></>
                            )}
                            {/* {typeof s.description === "string" &&
                        s.description.includes("[") ? (
                          JSON.parse(s.description).map((d, i) => (
                            <TextLine key={i} checkCard={index}>
                              {d}
                            </TextLine>
                          ))
                        ) : (
                          <TextLine>{s.description}</TextLine>
                        )} */}
                          </>
                        )}
                        {s.plan_type_id === 4 && (
                          <>
                            {/* <TextLine>Score Card within taken days</TextLine> */}
                            {typeof s.description === "string" &&
                            s.description.includes("[") ? (
                              JSON.parse(s.description).map((d, index) => (
                                <TextLine key={index}>{d}</TextLine>
                              ))
                            ) : (
                              <TextLine>{s.description}</TextLine>
                            )}
                          </>
                        )}
                        {s.plan_type_id === 8 && (
                          <>
                            {/* <TextLine>Practice Resource</TextLine> */}

                            {currentLanguage === "en" ? (
                              JSON.parse(s.description).map((d, index) => (
                                <TextLine key={index}>{d}</TextLine>
                              ))
                            ) : s?.description_burmese != undefined &&
                              s?.description_burmese != null ? (
                              JSON.parse(s?.description_burmese).map(
                                (d, index) => (
                                  <TextLine key={index}>{d}</TextLine>
                                )
                              )
                            ) : (
                              <></>
                            )}
                            {/* {typeof s.description === "string" &&
                        s.description.includes("[") ? (
                          JSON.parse(s.description).map((d, index) => (
                            <TextLine key={index}>{d}</TextLine>
                          ))
                        ) : (
                          <TextLine>{s.description}</TextLine>
                        )} */}
                          </>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                  <Button
                    variant="outlined"
                    sx={{ ...CardStyle.subscribeBtn }}
                    onClick={() => clickBuyHandler(s)}
                  >
                    Buy
                  </Button>
                </Card>
              </Box>
            ))}
          </Carousel>
        ) : (
          <Box sx={{ display: "flex", width: "100%", height: "70vh" }}>
            <CircularProgress sx={{ m: "auto" }}></CircularProgress>
          </Box>
        )}
        {subscriptionFrontendStatus === "failed" && (
          <Typography textAlign="center">
            Failed .Please check your network & try reload
          </Typography>
        )}
        {subscriptionFrontendStatus === "succeeded" &&
          subscriptionFrontend.length === 0 && (
            <Typography textAlign="center" sx={{ height: "20vh" }}>
              No subscription added yet
            </Typography>
          )}
      </Box>
      {/* chirstmas theme */}
      {/* <Box
        sx={{
          position: "absolute",
          top: { xs: "84%", md: "82%", xl: "82%",lg:"82%" }, // Adjust for responsiveness

          left: { xs: "-1%", md: "-5%", xl: "-4%",lg:"-4%" }, // Adjust for responsiveness
          transform: "translateY(-80%)",
          m: 0,
          p: 1,
        }}
      >
        <Box
            sx={{
              width: {
                xs: "18vw",
                sm: "12vw",
                md: "15vw",
                lg: "14vw",
                xl: "9vw",
              },
              overflow: "hidden",
            }}
          >
            <img
              src={`${process.env.REACT_APP_FRONTEND_URL}Image/chirstmas-tree.png`}
              style={{ width: "100%", height: "auto", transform: "rotate(28deg)" }}
              alt="Christmas Tree"
            />
          </Box>
       
      </Box> */}
  
    </Box>
  );
};
