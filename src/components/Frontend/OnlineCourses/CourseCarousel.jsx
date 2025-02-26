import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CarouselStyle } from "./CarouselStyle";
import CountryDialog from "./CountryDialog";

import "react-multi-carousel/lib/styles.css";
import { CourseContext } from "../../../Screens/Frontend/OnlineCourses";
import { fetchCourseFrontendAsync } from "../../../redux/thunk/Course";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1424 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1424, min: 825 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 825, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export const ReusableCarousel = (props) => {
  const { country } = useSelector((state) => state.user);
  const { courseFrontendStatus, courseFrontend } = useSelector(
    (state) => state.course
  );
  const { setStudyWeeks, setCourseName } = useContext(CourseContext);
  let [assign, setAssign] = useState(false);
  let [courseId, setCourseId] = useState("");
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [course, setCourse] = useState([]);

  console.log(country, "country");

  useEffect(() => {
    dispatch(fetchCourseFrontendAsync("courses"));
    setAssign(true);
  }, [dispatch]);

  useEffect(() => {
    if (courseFrontend !== undefined && courseFrontend !== "") {
      setCourseId(courseFrontend[0]?.id);
      setCourseName(courseFrontend[0]?.name);
      setStudyWeeks(courseFrontend[0]?.study_weeks);
    }
  }, [courseFrontend, setCourseName, setStudyWeeks]);

  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  };

  useEffect(() => {
    setAssign(true);
  }, [country]);
  useEffect(() => {
    if (assign && courseFrontend !== undefined && courseFrontend !== "") {
      setCourse([]);
      courseFrontend.forEach((c) => {
        let newCourse = { ...c };
        if (newCourse.isActive === 1) {
          let show_fees;
          if (country !== "MMK") {
            show_fees =
              country === "USD"
                ? (newCourse.oversea_fees * 0.67).toFixed(2)
                : country === "SGD"
                ? (newCourse.oversea_fees * 0.9).toFixed(2)
                : country === "THB"
                ? (newCourse.oversea_fees * 24.63).toFixed(2)
                : country === "NZD"
                ? (newCourse.oversea_fees * 1.09).toFixed(2)
                : newCourse.oversea_fees;
          } else {
            show_fees = newCourse.fees;
          }

          newCourse.course_type_id === props.id &&
            setCourse((prev) => [
              ...prev,
              { ...newCourse, show_fees: show_fees },
            ]);
        }
      });
      setAssign(false);
    }
  }, [assign, courseFrontend, props, country]);

  const clickHandler = (id, name) => {
    navigate("/enrollForm/" + id + "/" + name);
  };

  return (
    <>
      <CountryDialog></CountryDialog>
      {courseFrontendStatus === "loading" && (
        <>
          <Box
            sx={{
              height: "30vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress></CircularProgress>
          </Box>
        </>
      )}
      {courseFrontendStatus === "succeeded" &&
        courseFrontend !== undefined &&
        plans !== "" && (
          <>
            {/* <Typography
              sx={{
                ...CarouselStyle.title,
              }}
              variant="h5"
            >
              {props.courseType}
            </Typography> */}
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                color: "#2196f3",
                fontWeight: "bolder",
                my: "2rem",
              }}
            >
              Online PTE Class Timetable Online PTE Academic Training
              <span style={{ color: "red" }}> Courses</span>
            </Typography>
            {course.length === 0 && (
              <Typography
                variant="h5"
                textAlign={"center"}
                sx={{ height: "20vh", mt: "3rem" }}
              >
                No Course yet
              </Typography>
            )}
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              //   autoPlay={this.props.deviceType !== "mobile" ? true : false}
              autoPlay={false}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="all 1s ease"
              transitionDuration={1000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              //   deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-50-px"
            >
              {course.length !== 0 &&
                course.map((c, index) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItem: "center",
                    }}
                    key={index}
                  >
                    <a href="#timetable" style={{ textDecoration: "none" }}>
                      <Card
                        sx={{
                          ...CarouselStyle.card,
                          cursor: "pointer",
                          width: {
                            xs: "18rem",
                            sm: "23rem",
                            md: "25rem",
                          },
                          textDecoration: "none",
                          border: courseId === c?.id ? "1px solid blue" : "",
                          height:
                            props?.courseType === "PTE" ? "45rem" : "35rem",
                        }}
                        onClick={() => {
                          setStudyWeeks(c?.study_weeks);
                          setCourseName(c?.name);
                          setCourseId(c?.id);
                        }}
                      >
                        <CardHeader
                          action={
                            <Box sx={{ width: "100%" }}>
                              {/* <Button
                              sx={{
                                ...CarouselStyle.feesBtn,

                                fontSize: {
                                  sm: "0.9rem",
                                  lg: "0.9rem",
                                  xl: "1rem",
                                },
                              }}
                            >
                              {/* {c?.discount_status === 1 ? (
                                <>
                                  <Typography>
                                    <span
                                      style={{ textDecoration: "line-through" }}
                                    >
                                      {country !== "Myanmar"
                                        ? c.oversea_fees + " AUD"
                                        : c.fees + "  MMK"}
                                    </span>
                                    <br />
                                    {country !== "Myanmar"
                                      ? c.oversea_fees -
                                        (c.oversea_fees * c.discount_percent) /
                                          100 +
                                        " AUD"
                                      : c.fees -
                                        (c.fees * c.discount_percent) / 100 +
                                        "  MMK"}
                                  </Typography>
                                </>
                              ) : country !== "Myanmar" ? (
                                c.oversea_fees + " AUD"
                              ) : (
                                c.fees + "  MMK"
                              )} 

                              {/* <MonetizationOnIcon></MonetizationOnIcon> 
                            </Button> */}
                            </Box>
                          }
                          title={
                            <Tooltip title={c.name}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  width: "100%",
                                  maxWidth: "100%",
                                  height: {
                                    xs: "calc(1.3em * 2)",
                                    md: "calc(2em * 2)",
                                  }, // Two lines
                                  margin: 0,
                                  textOverflow: "ellipsis",
                                  wordWrap: "break-word",
                                  WebkitLineClamp: 2,
                                  overflow: "hidden",
                                }}
                              >
                                <Box
                                  sx={{
                                    fontSize: { xs: "1.2rem", md: "3rem" },
                                  }}
                                >
                                  <i
                                    class="fa-solid fa-pen-nib "
                                    style={{
                                      marginRight: "1rem",
                                      color: "white",
                                    }}
                                  ></i>
                                </Box>
                                <Typography
                                  variant="h5"
                                  sx={{
                                    // ...ellipsisStyle,

                                    fontSize: {
                                      xs: "1rem",
                                      md: "1.2rem",
                                      xl: "1.5rem",
                                    },
                                  }}
                                  color="white"
                                >
                                  {c.name}
                                </Typography>
                              </Box>
                            </Tooltip>
                          }
                          subheader=""
                          sx={{ backgroundColor: "#2196f3" }}
                        />

                        <CardContent
                          sx={{
                            mx: 1,
                            position: "relative",

                            height:
                              props?.courseType === "PTE" ? "35rem" : "25rem",
                          }}
                        >
                          {/* <Box
                          sx={{
                            ...CarouselStyle.iconBox,
                          }}
                        >
                          <ElectricBoltIcon
                            sx={{
                              ...CarouselStyle.contentIcon,
                              // background:
                              //   "linear-gradient(29deg, rgba(132,123,179,1) 0%, rgba(212,209,228,1) 0%, rgba(30,167,192,1) 0%, rgba(54,220,251,1) 2%, rgba(0,215,255,1) 10%, rgba(0,0,0,1) 63%, rgba(243,243,243,1) 100%)",
                            }}
                          ></ElectricBoltIcon>
                        </Box> */}
                          {c?.discount_status === 1 ? (
                            <Box sx={{ height: "4rem" }}>
                              <Typography
                                variant="h5"
                                sx={{ color: "red", fontWeight: "bold" }}
                              >
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                  }}
                                >
                                  {c.show_fees} {country}
                                </span>
                                <br />
                                {c.show_fees -
                                  (c.show_fees * c.discount_percent) / 100}
                                {country}
                              </Typography>
                            </Box>
                          ) : (
                            <Typography
                              variant="h5"
                              sx={{ color: "red", fontWeight: "bold" }}
                            >
                              {c.show_fees}
                              {country}
                            </Typography>
                          )}
                          <Box>
                            {/* {props.id === 1 && (
                            <>
                              <Typography variant="h6" textAlign={"center"}>
                                Agima PTEAI Portal Access (Default Plan)
                              </Typography>
                              <List
                                sx={{
                                  ...CarouselStyle.list,
                                }}
                              >
                                <ListItem sx={{}}>
                                  Up to{" "}
                                  <Typography
                                    variant="span"
                                    sx={{
                                      ...CarouselStyle.boldNumber,
                                    }}
                                  >
                                    1
                                  </Typography>{" "}
                                  months
                                </ListItem>
                                <ListItem sx={{}}>
                                  Up to{" "}
                                  <Typography
                                    variant="span"
                                    sx={{
                                      ...CarouselStyle.boldNumber,
                                    }}
                                  >
                                    5
                                  </Typography>{" "}
                                  Score Token{" "}
                                </ListItem>
                                <ListItem sx={{}}>
                                  {" "}
                                  <Typography
                                    variant="span"
                                    sx={{
                                      ...CarouselStyle.boldNumber,
                                    }}
                                  >
                                    Unlimited
                                  </Typography>{" "}
                                  Practice (score count not included)
                                </ListItem>
                              </List>
                            </>
                          )} */}

                            <Divider sx={{}}></Divider>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold" }}
                            >
                              Course Description
                            </Typography>
                            <List
                              sx={{
                                ...CarouselStyle.list,
                              }}
                            >
                              {c.description !== null &&
                                c.description !== undefined &&
                                c.description !== "" && (
                                  <ListItem sx={{ my: 1 }}>
                                    <ListItemIcon
                                      sx={{
                                        minWidth: "25px",
                                      }}
                                    >
                                      <i
                                        class="fa-solid fa-circle-check"
                                        style={{ color: "green" }}
                                      ></i>
                                    </ListItemIcon>
                                    <Typography variant="span" sx={{}}>
                                      {c.description}
                                    </Typography>{" "}
                                  </ListItem>
                                )}
                              <ListItem sx={{ my: 1 }}>
                                <ListItemIcon
                                  sx={{
                                    minWidth: "25px",
                                  }}
                                >
                                  <i
                                    class="fa-solid fa-circle-check"
                                    style={{ color: "green" }}
                                  ></i>
                                </ListItemIcon>
                                <Typography variant="span" sx={{}}>
                                  Duration -{" "}
                                  {c.duration !== null ? c.duration : ""}
                                </Typography>{" "}
                              </ListItem>
                              {c.start_date !== null && (
                                <ListItem sx={{ my: 1 }}>
                                  <ListItemIcon
                                    sx={{
                                      minWidth: "25px",
                                    }}
                                  >
                                    <i
                                      class="fa-solid fa-circle-check"
                                      style={{ color: "green" }}
                                    ></i>
                                  </ListItemIcon>
                                  <Typography variant="span" sx={{}}>
                                    Starts on {c.start_date}
                                  </Typography>
                                </ListItem>
                              )}
                              {c.study_day !== null &&
                              c.study_day !== undefined ? (
                                c.study_day.includes("[") ? (
                                  <ListItem>
                                    <ListItemIcon
                                      sx={{
                                        minWidth: "25px",
                                      }}
                                    >
                                      <i
                                        class="fa-solid fa-circle-check"
                                        style={{ color: "green" }}
                                      ></i>
                                    </ListItemIcon>
                                    <Typography variant="span" sx={{}}>
                                      {JSON.parse(c.study_day).map(
                                        (day, index) =>
                                          index !==
                                          JSON.parse(c.study_day).length - 1
                                            ? day + ","
                                            : day
                                      )}
                                    </Typography>
                                  </ListItem>
                                ) : (
                                  <ListItem sx={{ my: 1 }}>
                                    <ListItemIcon
                                      sx={{
                                        minWidth: "25px",
                                      }}
                                    >
                                      <i
                                        class="fa-solid fa-circle-check"
                                        style={{ color: "green" }}
                                      ></i>
                                    </ListItemIcon>
                                    <Typography variant="span" sx={{}}>
                                      {c.study_day}
                                    </Typography>
                                  </ListItem>
                                )
                              ) : (
                                <ListItem sx={{ my: 1 }}>
                                  <ListItemIcon
                                    sx={{
                                      minWidth: "25px",
                                    }}
                                  >
                                    <i
                                      class="fa-solid fa-circle-check"
                                      style={{ color: "green" }}
                                    ></i>
                                  </ListItemIcon>
                                  <Typography variant="span" sx={{}}>
                                    Flexible Date & time
                                  </Typography>
                                </ListItem>
                              )}

                              {c.study_time !== null &&
                                c.study_time !== undefined &&
                                c.study_time !== "" && (
                                  <ListItem sx={{ my: 1 }}>
                                    <ListItemIcon
                                      sx={{
                                        minWidth: "25px",
                                      }}
                                    >
                                      <i
                                        class="fa-solid fa-circle-check"
                                        style={{ color: "green" }}
                                      ></i>
                                    </ListItemIcon>
                                    <Typography variant="span" sx={{}}>
                                      {c.study_time}
                                    </Typography>
                                  </ListItem>
                                )}

                              {c.accept_student_no !== null &&
                                c.accept_student_no !== undefined && (
                                  <ListItem sx={{ my: 1 }}>
                                    <ListItemIcon
                                      sx={{
                                        minWidth: "25px",
                                      }}
                                    >
                                      <i
                                        class="fa-solid fa-circle-check"
                                        style={{ color: "green" }}
                                      ></i>
                                    </ListItemIcon>
                                    <Typography
                                      variant="span"
                                      sx={{
                                        ...CarouselStyle.boldNumber,
                                      }}
                                    >
                                      {c.accept_student_no}
                                    </Typography>
                                    Students per course
                                  </ListItem>
                                )}

                              <ListItem sx={{ my: 1 }}>
                                <ListItemIcon
                                  sx={{
                                    minWidth: "25px",
                                  }}
                                >
                                  <i
                                    class="fa-solid fa-circle-check"
                                    style={{ color: "green" }}
                                  ></i>
                                </ListItemIcon>
                                <Typography
                                  variant="span"
                                  sx={{
                                    ...CarouselStyle.boldNumber,
                                  }}
                                >
                                  1 to 1
                                </Typography>
                                Weekly Feedback
                              </ListItem>
                              {props.courseType === "PTE" &&
                                c.mocktest_count !== null && (
                                  <ListItem sx={{ my: 1 }}>
                                    <ListItemIcon
                                      sx={{
                                        minWidth: "25px",
                                      }}
                                    >
                                      <i
                                        class="fa-solid fa-circle-check"
                                        style={{ color: "green" }}
                                      ></i>
                                    </ListItemIcon>
                                    <Typography
                                      variant="span"
                                      sx={{
                                        ...CarouselStyle.boldNumber,
                                      }}
                                    >
                                      {c.mocktest_count}
                                    </Typography>
                                    Free Mock Tests
                                  </ListItem>
                                )}
                            </List>
                            <Divider sx={{}}></Divider>
                            {props.id === 1 && (
                              <>
                                <Typography
                                  variant="h6"
                                  sx={{ fontWeight: "bold" }}
                                >
                                  PTE Practice Materials
                                </Typography>
                                <List
                                  sx={{
                                    ...CarouselStyle.list,
                                  }}
                                >
                                  <ListItem sx={{ my: 1 }}>
                                    <ListItemIcon
                                      sx={{
                                        minWidth: "25px",
                                      }}
                                    >
                                      <i
                                        class="fa-solid fa-circle-check"
                                        style={{ color: "green" }}
                                      ></i>
                                    </ListItemIcon>
                                    <Typography
                                      variant="span"
                                      sx={{
                                        ...CarouselStyle.boldNumber,
                                      }}
                                    >
                                      PTE Old Questions
                                    </Typography>
                                    materials
                                  </ListItem>
                                  <ListItem sx={{ my: 1 }}>
                                    <ListItemIcon
                                      sx={{
                                        minWidth: "25px",
                                      }}
                                    >
                                      <i
                                        class="fa-solid fa-circle-check"
                                        style={{ color: "green" }}
                                      ></i>
                                    </ListItemIcon>
                                    <Typography
                                      variant="span"
                                      sx={{
                                        ...CarouselStyle.boldNumber,
                                      }}
                                    >
                                      Up to date exam
                                    </Typography>
                                    prediction file
                                  </ListItem>
                                </List>
                              </>
                            )}
                          </Box>
                          <Box
                            sx={{
                              ...CarouselStyle.btnBox,
                            }}
                          >
                            <Button
                              sx={{
                                ...CarouselStyle.enrollBtn,
                                // background:
                                //   "linear-gradient(29deg, rgba(132,123,179,1) 0%, rgba(212,209,228,1) 0%, rgba(30,167,192,1) 0%, rgba(54,220,251,1) 2%, rgba(0,215,255,1) 10%, rgba(0,0,0,1) 63%, rgba(243,243,243,1) 100%)",
                              }}
                              onClick={() =>
                                clickHandler(
                                  c.id,
                                  props.courseType.toLowerCase()
                                )
                              }
                            >
                              Register Now
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </a>
                  </Box>
                ))}
            </Carousel>
          </>
        )}
      {courseFrontendStatus === "failed" && (
        <Box
          sx={{
            height: "30vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography textAlign="center">
            Failed .Please check your network & try reload
          </Typography>
        </Box>
      )}
    </>
  );
};

export const CourseCarousel = () => {
  return (
    <>
      <ReusableCarousel id={1} courseType="PTE"></ReusableCarousel>
      {/* <ReusableCarousel id={2} courseType="IELTS"></ReusableCarousel>
      <ReusableCarousel id={3} courseType="TOEFL"></ReusableCarousel>
      <ReusableCarousel id={4} courseType="GENERAL ENGLISH"></ReusableCarousel> */}
    </>
  );
};
