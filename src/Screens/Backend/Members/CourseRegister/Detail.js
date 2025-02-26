import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

// import MtDetailTable from "../../../../components/Backend/MockTest/mtDetailTable";
import { fetchCourseRegisterDetailAsync } from "../../../../redux/thunk/Course";
import { getCookie } from "../../../../Utils/GetCookies";

const Detail = () => {
  const { course_register, courseRegisterStatus } = useSelector(
    (state) => state.course
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let pagePath = "online-student-detail";
  const studentId = useParams();

  useEffect(() => {
    dispatch(
      fetchCourseRegisterDetailAsync({ path: pagePath, id: studentId.id })
    );
  }, [dispatch, pagePath, studentId]);

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: "start",
  //   // color: theme.palette.text.secondary,
  // }));

  const backendURL =
    process.env.REACT_APP_BACKEND_ADMIN + "approve-reject-oc-register";

  let status_change = async (status) => {
    let token = await getCookie("userToken");
    if (!token) navigate("/login");
    else {
      let config = { headers: { Authorization: "Bearer " + token } };
      setLoading(true);
      const res = await axios.post(
        `${backendURL}`,
        {
          status: status,
          id: studentId.id,
        },
        config
      );
      if (res.status === 200) {
        //
        swal({
          title: "Success",
          text: res.message,
          icon: "success",
          button: "OK!",
          timer: 1500,
        });
        navigate("/admin/register/course");
      }
      setLoading(false);
    }
  };

  function confirmStatusChange(id) {
    swal({
      title: "Are you sure?",
      text: "Once updated, you will not be able to recover this record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        status_change(id);
      } else {
        swal({ text: "Your record is safe!", timer: 1500 });
      }
    });
  }
  const { state } = useLocation();
  const fees = state?.value;
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            ml: "2rem",
            top: "1rem",

            position: "absolute",
            overflow: "visible",
            zIndex: 1500,
          }}
        >
          <Typography variant="h5">Course Register Detail</Typography>
        </Box>

        {(courseRegisterStatus === "loading" ||
          courseRegisterStatus === "failed") && (
          <Box>
            <Typography variant="h5">{courseRegisterStatus}</Typography>
          </Box>
        )}
        {courseRegisterStatus === "succeeded" && (
          <>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                md={12}
                sx={{
                  p: 2,
                  bgcolor: "background.default",
                  gridTemplateColumns: { md: "1fr 1fr" },
                  mt: 3,
                  mx: 2,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="subtitle1">
                      Student Infomation
                    </Typography>
                    <Typography variant="subtitle1">
                      Name : {course_register?.name}
                    </Typography>
                    <Typography variant="subtitle1" mt={1}>
                      Email : {course_register?.email}
                    </Typography>
                    <Typography variant="subtitle1" mt={1}>
                      Phone : {course_register?.phone}
                    </Typography>
                    <Typography variant="subtitle1" mt={1}>
                      Course : {course_register.course?.name}
                    </Typography>
                    <Typography variant="subtitle1" mt={1}>
                      Subscription Plan :{" "}
                      {course_register.subscription_plan?.name}
                    </Typography>
                    <Typography variant="subtitle1" mt={1}>
                      Englist Level Test :{" "}
                      <a
                        href={`${process.env.REACT_APP_BACKEND_URL}storage/online_course/lvl_test/${course_register?.english_lvl_test}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1">
                      Payment Information
                    </Typography>

                    <Typography variant="subtitle1" mt={1}>
                      Payment Type : {course_register.payment_method}
                    </Typography>
                    {course_register?.payment_method == "manual" && (
                      <>
                        <Typography variant="subtitle1" mt={1}>
                          Bank : {course_register.bank_type}
                        </Typography>
                        <Typography variant="subtitle1" mt={1}>
                          Account Type : {course_register.payment_type}
                        </Typography>
                        <Typography variant="subtitle1" mt={1}>
                          Upload Transaction :{" "}
                          <a
                            href={`${process.env.REACT_APP_BACKEND_URL}storage/online_course/transaction/${course_register.transaction}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View
                          </a>
                        </Typography>
                      </>
                    )}
                    {course_register?.payment_method == "digital" && (
                      <Typography variant="subtitle1" mt={1}>
                        Payment Type :{" "}
                        {course_register?.transaction_log?.payment_gateway !==
                        null
                          ? course_register?.transaction_log?.payment_gateway
                          : "Not passed the payment gateway"}
                      </Typography>
                    )}
                    <Typography variant="subtitle1" mt={1}>
                      Fees : {fees}
                      {/* {course_register?.payment_method == "manual" &&
                      course_register.subscription_plan !== null &&
                      course_register.subscription_plan !== undefined
                        ? course_register?.course?.fees +
                          "+" +
                          course_register?.subscription_plan?.fees +
                          "MMK"
                        : course_register?.payment_method == "manual" &&
                          course_register?.course?.fees} */}
                    </Typography>
                    {course_register?.discount_percent !== null && (
                      <Typography variant="subtitle1" mt={1}>
                        Discount : {course_register?.discount_percent}
                      </Typography>
                    )}
                    <Typography variant="subtitle1" mt={1}>
                      Payment Type : {course_register.payment_method}
                    </Typography>

                    <Typography variant="subtitle1" mt={2}>
                      Status :{" "}
                      {course_register.status == 1 //payment_status
                        ? "Approved"
                        : course_register.status == 2
                        ? "Rejected"
                        : "Pending"}
                    </Typography>
                  </Box>

                  <Box className="container-fluid">
                    <div className="card">
                      <Link
                        onClick={() => {
                          navigate(-1);
                        }}
                        sfd
                        style={{
                          textDecoration: "none",

                          display: "flex",
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#2196f3",
                            color: "#000",
                            "&:hover": {
                              bgcolor: "white",
                            },
                            mb: 2,
                          }}
                        >
                          <ArrowBackIcon></ArrowBackIcon> Back
                        </Button>
                      </Link>
                    </div>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor:
                    loading ||
                    course_register.status == 1 ||
                    course_register.status == 2
                      ? "whitesmoke"
                      : "#00FF00",
                  color: "#000",
                  "&:hover": {
                    bgcolor: "white",
                  },
                  mx: 2,
                  mt: 6,
                }}
                disabled={
                  loading ||
                  course_register.status == 1 ||
                  course_register.status == 2
                }
                onClick={() => confirmStatusChange(1)}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor:
                    loading ||
                    course_register.status == 1 ||
                    course_register.status == 2
                      ? "whitesmoke"
                      : "#FFA500",
                  color: "#000",
                  "&:hover": {
                    bgcolor: "white",
                  },
                  mt: 6,
                }}
                disabled={
                  loading ||
                  course_register.status == 1 ||
                  course_register.status == 2
                }
                onClick={() => confirmStatusChange(2)}
              >
                Reject
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Detail;
