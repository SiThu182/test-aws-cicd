import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./PlanSwitchStyle.css";
import { setPath } from "../../../../redux/slice/PathSlice";
import { useTranslation } from "react-i18next";

//expand more info
const ExpandMoreList = () => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    setOpen(!open);
  };

  const ListButton = (props) => {
    const { text } = props;
    return (
      <ListItemButton sx={{ pl: 1 }}>
        <ListItemIcon
          sx={{
            "& .MuiListItemIcon-root": {
              minWidth: 0,
            },
          }}
        >
          <StarBorder sx={{ color: "yellow", mr: 1 }} />
        </ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            fontSize: {
              xs: "0.8rem",
              sm: "0.8rem",
              lg: "0.8rem",
              xl: "1rem",
            },
            fontWeight: "500",
          }}
        />
      </ListItemButton>
    );
  };
  return (
    <List>
      <ListItemButton sx={{ textAlign: "center" }} onClick={handleClick}>
        <ListItemText primary="More Info" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListButton text={t("learn", { ns: "expandListPlan" })}></ListButton>
          <ListButton
            text={t("criteria", { ns: "expandListPlan" })}
          ></ListButton>
          <ListButton text={t("score", { ns: "expandListPlan" })}></ListButton>
          <ListButton
            text={t("prediction", { ns: "expandListPlan" })}
          ></ListButton>
        </List>
      </Collapse>
    </List>
  );
};

function SubscriptionPlanCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { planFrontendStatus, planFrontend } = props;
  const { country } = useSelector((state) => state.user);
  const { i18n, t } = useTranslation();
 

  // Get the current language
  const currentLanguage = i18n.language;

  console.log(currentLanguage, "current language");
  const cardStyle = {
    position: "relative",
    // overflow: "hidden",

    width: {
      xs: "14rem",
      sm: "18rem",
      md: "20rem",
    },
    // height: {
    //   xs: "38rem",
    //   sm: "39rem",
    //   md: "42rem",
    //   lg: "47rem",
    // },
    margin: {
      sm: "5px auto",
      xs: "8px auto",
      md: "10px auto",
    },

    background: "rgb(179 235 255)",
    "& :hover": {
      "&.MuiCardHeader-root": {
        background:
          "linear-gradient(38deg, rgba(21,15,123,1) 0%, rgba(98,98,252,1) 56%, rgba(117,155,255,1) 100%, rgba(0,212,255,1) 100%)",
      },
    },
    borderRadius: "1rem",
    border: "1px solid red",
    textAlign: "center",
    boxShadow: "0 0 5px  rgba(0,0,0,0.4)",
    "&:hover": {
      "& .check-icon": {
        color: "#82ff00",
      },
      "& .highlight-text-box": {
        background: "rgba(224,236,252,0.5)",
      },
      "& .highlight-text": {
        color: "yellow",
      },
      "& .MuiTypography-h6, & .plan-price": {
        color: "white",
      },
      color: "white",
      background: "rgb(4 30 66)",
      // background:
      //   "linear-gradient(363deg, rgba(170,177,238,1) 95%,  rgba(245,245,248,1) 100%)",

      // background:
      //   " linear-gradient(38deg, rgba(119,108,255,1) 0%, rgba(30,100,235,1) 97%)",
      border: "1px solid black",

      transform: "scale(1.1)",
      transition: "0.3s ease-in",
    },
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1362 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1362, min: 903 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 903, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const cardHeader = {
    // backgroundColor: "inherit",
    fontSize: {
      xs: "16px",
      sm: "17px",
      md: "1.2rem",
      lg: "1.5rem",
    },
    my: 1,
    color: "black",
    borderRadius: "0.5rem 0.5rem 0 0",
  };

  const costStyle = {
    fontSize: {
      xs: "16px",
      sm: "18px",
      md: "1rem",
      lg: "1.2rem",
    },
    fontWeight: 700,
    color: "black",
  };
  const subscribeBtn = {
    // position: "absolute",

    width: "10rem",
    color: "red",
    mb: "1rem",
    "&:hover": {
      color: "white",
      backgroundColor: "red",
    },
    "&:active": {
      color: "white",
      backgroundColor: "black",
    },
  };

  const HighlightText = (props) => {
    const { text, title } = props;
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "0.9rem" }} fontWeight={700}>
            {title}
          </Typography>
          <Typography
            sx={{ fontSize: "0.9rem", color: "gray", fontWeight: 700 }}
            className="highlight-text"
          >
            {text}
          </Typography>
        </Box>
      </>
    );
  };
  const TextLine = (props) => {
    return (
      <Box sx={{ display: "flex" }}>
        <CheckCircleIcon
          sx={{
            mr: 1,
            color: "green",
            fontSize: {
              xs: "0.9rem",
              xl: "1.1rem",
            },
            mt: 0.3,
          }}
          className="check-icon"
        ></CheckCircleIcon>
        <Typography
          sx={{
            textAlign: "left",
            fontSize: {
              xs: "0.9rem",
              xl: "0.9rem",
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
    <Box
    // sx={{ width: { xs: "96vw", xl: "80vw" }, mx: "auto" }}
    // className="dashboard-training"
    >
      {planFrontendStatus === "succeeded" &&
      planFrontend !== "" &&
      planFrontend !== undefined ? (
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={false}
          //   autoPlay={this.props.deviceType !== "mobile" ? true : false}
          autoPlay={false}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all 1s ease"
          transitionDuration={1000}
          containerClass={props.containerClass}
          removeArrowOnDeviceType={["laptop", "desktop"]}
          removeDotsOnDeviceType={["laptop", "desktop"]}
          //   deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-50-px"
        >
          {planFrontend?.map((s, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                py: 4,
                // width: "100%",
                mt: index !== 1 && 5,
              }}
            >
              <Card
                sx={{
                  ...cardStyle,
                  background: index === 1 && "yellow",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    ...cardHeader,
                  }}
                >
                  {currentLanguage === "en" ? s.name : s?.name_burmese}
                </Typography>
                {index == 1 && (
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      background: "red",
                      py: 2,
                      mx: 2,
                      borderRadius: "2rem",
                    }}
                  >
                    Most Popular Choice
                  </Typography>
                )}
                {s?.discount_status === 1 && s?.discount_percent !== null && (
                  <Box
                    sx={{
                      display: "flex",
                      position: "absolute",
                      width: "5rem",
                      height: "5rem",
                      right: "-3%",
                      top: "-2%",
                      zIndex: 199,
                      backgroundColor: "red",
                      borderRadius: "20%",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      boxShadow: 5,
                      border: "2px solid grey",
                    }}
                  >
                    <Box>
                      <Typography variant="h5" sx={{ color: "white" }}>
                        {s?.discount_percent}%
                      </Typography>

                      <span style={{ color: "white", fontWeight: "bold" }}>
                        Discount
                      </span>
                    </Box>
                  </Box>
                )}
                <Box
                  sx={{
                    mx: "auto",
                    width: "7rem",
                    height: "7rem",
                    borderRadius: "50%",
                    overflow: "hidden",
                    my: 1,

                    backgroundImage: `url(${
                      process.env.REACT_APP_FRONTEND_URL
                    }Image/${
                      index === 0
                        ? "Basic.jpg"
                        : index === 1
                        ? "Silver.jpg"
                        : "Gold.jpg"
                    })`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></Box>
                {/* ${
                      index === 0
                        ? "Basic.jpg"
                        : index === 1
                        ? "Silver.jpg"
                        : "Gold.jpg"
                    } */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 0.5,
                  }}
                >
                  {/* <AttachMoneyIcon /> */}

                  {s?.discount_status === 1 ? (
                    <>
                      <Typography
                        variant="h5"
                        component="h5"
                        sx={{ ...costStyle, fontWeight: 700 }}
                        className="plan-price"
                      >
                        <span
                          style={{
                            ...costStyle,
                            textDecoration: "line-through",
                            color: "red",
                          }}
                        >
                          {s.show_fees}{" "}
                          {/* {country !== "MMK"
                            ? country === "USD"
                              ? " USD"
                              : " AUD"
                            : " MMK"} */}
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
                      sx={{ ...costStyle }}
                      className="plan-price"
                    >
                      {s.show_fees}{" "}
                      {/* {country !== "MMK"
                        ? country === "USD"
                          ? " USD"
                          : " AUD"
                        : " MMK"} */}
                      {country}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "rgba(255,245,245,1)",
                    px: 5,
                    py: 1,
                    borderRadius: "0.5rem",
                  }}
                  className="highlight-text-box"
                >
                  {(s.scoring_count !== 0 || s.number_of_day !== 0) && (
                    <HighlightText
                      title={t("practice", { ns: "trainingPlan" })}
                      text={
                        s.limited_status === 1
                          ? t("unlimited", { ns: "trainingPlan" })
                          : s.scoring_count
                      }
                    ></HighlightText>
                  )}

                  {(s.plan_type_id === 2 ||
                    s.plan_type_id === 5 ||
                    s.plan_type_id === 7 ||
                    s.plan_type_id === 8 ||
                    s.plan_type_id === 9) &&
                  s.mt_limited_status === 1 ? (
                    <HighlightText
                      title={t("mockTest", { ns: "trainingPlan" })}
                      text={t("unlimited", { ns: "trainingPlan" })}
                    ></HighlightText>
                  ) : s.mocktest_count != 0 ? (
                    <HighlightText
                      title={t("mockTest", { ns: "trainingPlan" })}
                      text={s.mocktest_count}
                    ></HighlightText>
                  ) : (
                    ""
                  )}
                  {(s.plan_type_id === 4 || s.plan_type_id === 8) && (
                    <HighlightText
                      title={"Sectional Mock Test"}
                      text={"Yes"}
                    ></HighlightText>
                  )}
                  {s.plan_type_id === 9 && (
                    <HighlightText
                      title={t("recording", { ns: "trainingPlan" })}
                      text={
                        s.video_recording == 0
                          ? t("no", { ns: "trainingPlan" })
                          : t("yes", { ns: "trainingPlan" })
                      }
                    ></HighlightText>
                  )}
                  {(s.scoring_count !== 0 || s.number_of_day !== 0) && (
                    <HighlightText
                      title={t("day", { ns: "trainingPlan" })}
                      text={
                        s.limited_status === 1 ? s.number_of_day + " days" : "-"
                      }
                    ></HighlightText>
                  )}
                </Box>

                <CardContent
                  sx={{
                    minHeight: s.plan_type_id === 9 ? "18rem" : "12rem",
                    overflow: "hidden",
                  }}
                >
                  {(s.plan_type_id === 4 || s.plan_type_id === 8) && (
                    <TextLine>
                      {JSON.parse(s.language_type_id).map((l, index) => (
                        <span key={index}>
                          {" "}
                          {l === 1
                            ? "Speaking Mock Test +" +
                              JSON.parse(s.sectional_mocktest_count)[index]
                            : l === 2
                            ? "Reading Mock Test +" +
                              JSON.parse(s.sectional_mocktest_count)[index]
                            : l === 4
                            ? "Writing Mock Test +" +
                              JSON.parse(s.sectional_mocktest_count)[index]
                            : l === 3
                            ? "Listeninng MockTest +" +
                              JSON.parse(s.sectional_mocktest_count)[index]
                            : ""}
                        </span>
                      ))}
                    </TextLine>
                  )}

                  {s.description !== null &&
                    s.description_burmese !== undefined &&
                    typeof s.description === "string" &&
                    (s.description.includes("[") ? (
                      JSON.parse(
                        currentLanguage === "en"
                          ? s?.description
                          : s?.description_burmese
                      )?.map((d, index) => <TextLine key={index}>{d}</TextLine>)
                    ) : (
                      <TextLine>
                        {currentLanguage === "en"
                          ? s?.description
                          : s?.description_burmese}
                      </TextLine>
                    ))}
                  {/* 100$ / 1month */}
                  {/* {s?.discount_status === 1 ? (
                    <>
                      <Typography
                        variant="h5"
                        component="h5"
                        sx={{ ...costStyle }}
                      >
                        <span style={{ textDecoration: "line-through" }}>
                          {country !== "MMK"
                            ? s.oversea_fees + " AUD"
                            : s.fees + "  MMK"}
                        </span>
                        <br />
                        {country !== "MMK"
                          ? s.oversea_fees -
                            (s.oversea_fees * s.discount_percent) / 100 +
                            " AUD"
                          : s.fees -
                            (s.fees * s.discount_percent) / 100 +
                            "  MMK"}
                      </Typography>
                    </>
                  ) : country !== "MMK" ? (
                    s.oversea_fees + " AUD"
                  ) : (
                    s.fees + "  MMK"
                  )} */}
                  {/* {planType === 1 && (
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
                        AI Scoring System based on{" "}
                        <span style={{ color: "red" }}> real-world </span>test
                        questions
                      </TextLine>
                      <TextLine>Practice Resource</TextLine>
                      {JSON.parse(s.description).map((d, index) => (
                        <TextLine key={index}>{d}</TextLine>
                      ))}
                    </>
                  )}
                  {planType === 2 && (
                    <>
                      <TextLine>
                        {s.mocktest_count} Ai Scoring Mock test based on
                        <span style={{ color: "red" }}> real-world </span>test
                        questions
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
                  )} */}
                  {/* {planType === 5 && (
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
                        <span style={{ color: "red" }}> real-world </span>test
                        questions
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
                  {planType === 4 && (
                    <>
                      <TextLine>
                        {JSON.parse(s.language_type_id).map((l, index) => (
                          <Typography key={index}>
                            {" "}
                            {l === 1
                              ? "Speaking Mock Test +" +
                                JSON.parse(s.sectional_mocktest_count)[index]
                              : l === 2
                              ? "Reading Mock Test +" +
                                JSON.parse(s.sectional_mocktest_count)[index]
                              : l === 4
                              ? "Writing Mock Test +" +
                                JSON.parse(s.sectional_mocktest_count)[index]
                              : l === 3
                              ? "Listeninng MockTest +" +
                                JSON.parse(s.sectional_mocktest_count)[index]
                              : ""}
                          </Typography>
                        ))}
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
                  {planType === 8 && (
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
                        <span style={{ color: "red" }}> real-world </span>test
                        questions
                      </TextLine>
                      <TextLine>
                        {JSON.parse(s.language_type_id).map((l, index) => (
                          <Typography key={index}>
                            {" "}
                            {l === 1
                              ? "Speaking Mock Test +" +
                                JSON.parse(s.sectional_mocktest_count)[index]
                              : l === 2
                              ? "Reading Mock Test +" +
                                JSON.parse(s.sectional_mocktest_count)[index]
                              : l === 4
                              ? "Writing Mock Test +" +
                                JSON.parse(s.sectional_mocktest_count)[index]
                              : l === 3
                              ? "Listeninng MockTest +" +
                                JSON.parse(s.sectional_mocktest_count)[index]
                              : ""}
                          </Typography>
                        ))}
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
                  )} */}
                </CardContent>
                {s.plan_type_id === 9 && <ExpandMoreList></ExpandMoreList>}

                <Button
                  variant="outlined"
                  sx={{ ...subscribeBtn }}
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
      {planFrontendStatus === "failed" && (
        <Typography textAlign="center">
          Failed .Please check your network & try reload
        </Typography>
      )}
      {planFrontendStatus === "succeeded" && planFrontend?.length === 0 && (
        <Box
          sx={{
            height: "60vh",
            mt: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <lord-icon
              src="https://cdn.lordicon.com/pqxdilfs.json"
              trigger="hover"
              colors="outline:#131432,primary:#606874,secondary:#110a5c,tertiary:#ebe6ef"
              style={{ width: "250px", height: "250px" }}
            ></lord-icon>
            <Box>
              <Typography
                textAlign="center"
                variant="h5"
                sx={{ height: "20vh" }}
              >
                Coming soon
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default SubscriptionPlanCard;
