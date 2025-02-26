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

const SimplePlanSwitch = styled(Switch)(({ theme }) => ({
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

function PlanSwitchLayout(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  localStorage.setItem("backToPath", "/");
  const { subscriptionFrontend, subscriptionFrontendStatus } = props;
  const { country } = useSelector((state) => state.user);
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    // checked === true ? setToggle(1) : setToggle(0);
  };
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
        <Typography
          sx={{
            textAlign: "left",
            fontSize: {
              xs: "0.7rem",
              sm: "0.7rem",
              lg: "0.9rem",
              xl: "1rem",
            },
            fontWeight: "500",
          }}
        >
          {props.children}
        </Typography>
      </Box>
    );
  };

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
            xl: "70%",
          },
          mx: "auto",
        }}
      >
        {/* <subscription title */}
        <Typography variant="h3" sx={{ ...CardStyle.hStyle }}>
          SUBSCRIPTION PLAN
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
          <>
            {subscriptionFrontendStatus === "succeeded" &&
            subscriptionFrontend !== "" &&
            subscriptionFrontend !== undefined ? (
              <Carousel
                swipeable={true}
                draggable={true}
                responsive={CardStyle.responsive}
                ssr={true} //means to render carousel on server-side.
                infinite={true}
                // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlay={false}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="all 1s ease"
                transitionDuration={1000}
                containerClass="carousel-container"
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
                    <Card sx={{ ...CardStyle.cardStyle }}>
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
                            {s.name}
                          </Typography>
                        }
                        sx={{
                          ...CardStyle.planCardHeader,
                        }}
                      />

                      <CardContent
                        sx={{
                          height: {
                            xs: "19rem",

                            lg: "23rem",
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
                                {country !== "MMK"
                                  ?   s.oversea_fees + " AUD"
                                  : s.fees + "  MMK"}
                              </span>
                              <br />
                              {country !== "MMK"
                                ?
                                 s.oversea_fees -
                                  (s.oversea_fees * s.discount_percent) / 100 +
                                  " AUD"
                                
                                : s.fees -
                                  (s.fees * s.discount_percent) / 100 +
                                  "  MMK"}
                            </Typography>
                          </>
                        ) : (
                          <Typography
                            variant="h5"
                            component="h5"
                            sx={{ ...CardStyle.costStyle }}
                          >
                            {country !== "MMK"
                              ?  s.oversea_fees + " AUD"
                              : s.fees + "  MMK"}
                          </Typography>
                        )}
                        {s.plan_type_id === 1 && (
                          <>
                            <TextLine>
                              {s.limited_status === 1 ? (
                                <span style={{ color: "red" }}>unlimitedss </span>
                              ) : (
                                <span style={{ color: "red" }}>limited </span>
                              )}{" "}
                              practice
                              {s.limited_status === 1 ? (
                                <span>for {s.number_of_day} days</span>
                              ) : (
                                "with " + s.scoring_count + " scoring count"
                              )}
                            </TextLine>
                            <TextLine>
                              AI Scoring System based on{" "}
                              <span style={{ color: "red" }}> real-world </span>
                              test questions
                            </TextLine>
                            <TextLine>Practice Resource</TextLine>
                            {JSON.parse(s.description).map((d, index) => (
                              <TextLine key={index}>{d}</TextLine>
                            ))}
                          </>
                        )}
                        {s.plan_type_id === 2 && (
                          <>
                            <TextLine>
                              {s.mocktest_count} Ai Scoring Mock test based on
                              <span style={{ color: "red" }}> real-world </span>
                              test questions
                            </TextLine>
                            <TextLine>Practice Resource</TextLine>
                            <TextLine>Score Card within taken days</TextLine>
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
                        {s.plan_type_id === 5 && (
                          <>
                            <TextLine>
                              {s.limited_status === 1 ? (
                                <span style={{ color: "red" }}>unlimited </span>
                              ) : (
                                <span style={{ color: "red" }}>limited </span>
                              )}{" "}
                              practice
                              {s.limited_status === 1 ? (
                                <span>for {s.number_of_day} days</span>
                              ) : (
                                "with " + s.scoring_count + " scoring count"
                              )}
                            </TextLine>
                            <TextLine>
                              {s.mocktest_count} Ai Scoring Mock test based on
                              <span style={{ color: "red" }}> real-world </span>
                              test questions
                            </TextLine>
                            <TextLine>Practice Resource</TextLine>
                            <TextLine>Score Card within taken days</TextLine>
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
                        {s.plan_type_id === 4 && (
                          <>
                            <TextLine>
                              {JSON.parse(s.language_type_id).map(
                                (l, index) => (
                                  <span key={index}>
                                    {" "}
                                    {l === 1
                                      ? "Speaking Mock Test +" +
                                        JSON.parse(s.sectional_mocktest_count)[
                                          index
                                        ]
                                      : l === 2
                                      ? "Reading Mock Test +" +
                                        JSON.parse(s.sectional_mocktest_count)[
                                          index
                                        ]
                                      : l === 4
                                      ? "Writing Mock Test +" +
                                        JSON.parse(s.sectional_mocktest_count)[
                                          index
                                        ]
                                      : l === 3
                                      ? "Listeninng MockTest +" +
                                        JSON.parse(s.sectional_mocktest_count)[
                                          index
                                        ]
                                      : ""}
                                  </span>
                                )
                              )}
                            </TextLine>
                            <TextLine>Practice Resource</TextLine>
                            <TextLine>Score Card within taken days</TextLine>
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
                            <TextLine>
                              {s.limited_status === 1 ? (
                                <span style={{ color: "red" }}>unlimited </span>
                              ) : (
                                <span style={{ color: "red" }}>limited </span>
                              )}{" "}
                              practice
                              {s.limited_status === 1 ? (
                                <span>for {s.number_of_day} days</span>
                              ) : (
                                "with " + s.scoring_count + " scoring count"
                              )}
                            </TextLine>
                            <TextLine>
                              {s.mocktest_count} Ai Scoring Mock test based on
                              <span style={{ color: "red" }}> real-world </span>
                              test questions
                            </TextLine>
                            <TextLine>
                              {JSON.parse(s.language_type_id).map(
                                (l, index) => (
                                  <span key={index}>
                                    {" "}
                                    {l === 1
                                      ? "Speaking Mock Test +" +
                                        JSON.parse(s.sectional_mocktest_count)[
                                          index
                                        ]
                                      : l === 2
                                      ? "Reading Mock Test +" +
                                        JSON.parse(s.sectional_mocktest_count)[
                                          index
                                        ]
                                      : l === 4
                                      ? "Writing Mock Test +" +
                                        JSON.parse(s.sectional_mocktest_count)[
                                          index
                                        ]
                                      : l === 3
                                      ? "Listeninng MockTest +" +
                                        JSON.parse(s.sectional_mocktest_count)[
                                          index
                                        ]
                                      : ""}{" "}
                                    {index !==
                                    JSON.parse(s.language_type_id).length - 1
                                      ? "|"
                                      : ""}
                                  </span>
                                )
                              )}
                            </TextLine>
                            <TextLine>Practice Resource</TextLine>
                            <TextLine>Score Card within taken days</TextLine>
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
                      </CardContent>
                      <Button
                        variant="outlined"
                        sx={{ ...CardStyle.subscribeBtn }}
                        onClick={() => clickBuyHandler(s)}
                      >
                        SUBSCRIBE
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
          </>
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
