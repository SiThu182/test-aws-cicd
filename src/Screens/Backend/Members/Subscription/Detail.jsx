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

import { fetchSubscriptionRegisterDetailAsync } from "../../../../redux/thunk/Subscription";
import { getCookie } from "../../../../Utils/GetCookies";

const Detail = () => {
  const { subscriptionRegisterStatus, subscriptionRegisterDetail } =
    useSelector((state) => state.subscription);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const fees = state?.value;
  const navigate = useNavigate();
  let pagePath = "purchase-plan-list";
  const studentId = useParams();

  useEffect(() => {
    dispatch(
      fetchSubscriptionRegisterDetailAsync({ path: pagePath, id: studentId.id })
    );
  }, [dispatch, pagePath, studentId]);

  const backendURL =
    process.env.REACT_APP_BACKEND_ADMIN + "approve-reject-purchase-plan";

  let status_change = async (status) => {
    let token = getCookie("userToken");
    if (!token) navigate("/login");
    else {
      let config = { headers: { Authorization: "Bearer " + token } };
      setLoading(true);
      const res = await axios.post(
        `${backendURL}`,
        {
          status: status,
          transaction_id: studentId.id,
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
        navigate("/admin/register/subscription");
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
          <Typography variant="h5">Subscription Register Detail</Typography>
        </Box>

        {(subscriptionRegisterStatus === "loading" ||
          subscriptionRegisterStatus === "failed") && (
          <Box>
            <Typography variant="h5">{subscriptionRegisterStatus}</Typography>
          </Box>
        )}
        {subscriptionRegisterStatus === "succeeded" && (
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
                    <Typography variant="subtitle1">User Infomation</Typography>
                    <Typography variant="subtitle1">
                      Name :{" "}
                      {subscriptionRegisterDetail.user?.name !== null &&
                      subscriptionRegisterDetail.user?.name !== undefined ? (
                        subscriptionRegisterDetail.user?.name
                      ) : (
                        <span style={{ color: "red" }}>Deleted User</span>
                      )}
                    </Typography>

                    <Typography variant="subtitle1" mt={1}>
                      Email :{" "}
                      {subscriptionRegisterDetail.user?.email !== null &&
                      subscriptionRegisterDetail.user?.email !== undefined ? (
                        subscriptionRegisterDetail.user?.email
                      ) : (
                        <span style={{ color: "red" }}>Deleted User</span>
                      )}
                    </Typography>
                    <Typography variant="subtitle1" mt={1}>
                      Subscription :{" "}
                      {subscriptionRegisterDetail.subscription_plan?.name}
                    </Typography>
                    <Typography variant="subtitle1" mt={1}>
                      {/* Course : {subscriptionRegisterDetail.course.name} */}
                    </Typography>
                    {/* <Typography variant="subtitle1" mt={1}>
                      Subscription Plan :{" "}
                      {subscriptionRegisterDetail?.payment_method === "manual"
                        ? subscriptionRegisterDetail.subscription_plan
                            ?.discount_status !== 0
                          ? (subscriptionRegisterDetail.subscription_plan
                              ?.fees *
                              subscriptionRegisterDetail.subscription_plan
                                ?.discount_percent) /
                              100 +
                            "MMK"
                          : subscriptionRegisterDetail.subscription_plan?.fees +
                            "MMK"
                        : subscriptionRegisterDetail?.payment_method ===
                            "digital" &&
                          subscriptionRegisterDetail?.total_fees === null
                        ? "not passed the payment gateway"
                        : subscriptionRegisterDetail?.total_fees +
                          subscriptionRegisterDetail?.currency}
                    </Typography> */}
                    {subscriptionRegisterDetail.subscription_plan
                      ?.plan_type_id == 9 ? (
                      <Typography variant="subtitle1" mt={1}>
                        Coaching Plan :{" "}
                        {subscriptionRegisterDetail.subscription_plan
                          ?.training_type == 1
                          ? "Group Training"
                          : "Individual Training"}
                      </Typography>
                    ) : (
                      <Typography variant="subtitle1" mt={1}>
                        Subscription Plan type: "Flexible Plan"
                      </Typography>
                    )}
                    <Typography variant="subtitle1" mt={1}>
                      Fees : {fees}
                      {/* {subscriptionRegisterDetail.subscription_plan?.fees} */}
                    </Typography>
                    <Typography variant="subtitle1" mt={1}>
                      Practice Limited status :{" "}
                      {subscriptionRegisterDetail.subscription_plan
                        ?.limited_status == 1
                        ? "unlimited"
                        : subscriptionRegisterDetail.subscription_plan
                            ?.limited_status == 0
                        ? "limited"
                        : "-"}
                    </Typography>
                    <Typography variant="subtitle1" mt={1}>
                      Mock Test Limited status :{" "}
                      {subscriptionRegisterDetail.subscription_plan
                        ?.mt_limited_status == 1
                        ? "unlimited"
                        : subscriptionRegisterDetail.subscription_plan
                            ?.mt_limited_status == 0
                        ? "limited"
                        : "-"}
                    </Typography>
                    {subscriptionRegisterDetail?.discount_percent !== null && (
                      <Typography variant="subtitle1" mt={1}>
                        Discount Percent :{" "}
                        {subscriptionRegisterDetail.subscription_plan
                          ?.discount_percent + "%"}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1">
                      Payment Information
                    </Typography>

                    <Typography variant="subtitle1" mt={1}>
                      Payment Type : {subscriptionRegisterDetail.payment_method}
                    </Typography>
                    {subscriptionRegisterDetail?.payment_method ===
                      "manual" && (
                      <>
                        <Typography variant="subtitle1" mt={1}>
                          Bank : {subscriptionRegisterDetail.bank}
                        </Typography>
                        <Typography variant="subtitle1" mt={1}>
                          Account Type :{" "}
                          {subscriptionRegisterDetail.payment_type}
                        </Typography>
                        <Typography variant="subtitle1" mt={1}>
                          Upload Transaction :{" "}
                          <a
                            href={`${
                              process.env.REACT_APP_BACKEND_URL
                            }storage/${
                              subscriptionRegisterDetail.oc_register_id === null
                                ? "subscription"
                                : "online_course/transaction"
                            }/${subscriptionRegisterDetail.media}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View
                          </a>
                        </Typography>
                      </>
                    )}
                    {/* {subscriptionRegisterDetail?.payment_method ==
                      "digital" && (
                      <Typography variant="subtitle1" mt={1}>
                        Payment Service :{" "}
                        {subscriptionRegisterDetail?.payment_gateway !== null
                          ? subscriptionRegisterDetail?.payment_gateway
                          : "Not passed the payment gateway"}
                      </Typography>
                    )} */}

                    <Typography variant="subtitle1" mt={2}>
                      OnlineCourse register id :{" "}
                      {subscriptionRegisterDetail.oc_register_id !== null
                        ? "from online course id " +
                          subscriptionRegisterDetail.oc_register_id
                        : "No course"}
                    </Typography>

                    <Typography variant="subtitle1" mt={2}>
                      Payment Status :{" "}
                      {subscriptionRegisterDetail.payment_status == 1
                        ? "Approved"
                        : subscriptionRegisterDetail.payment_status == 2
                        ? "Rejected"
                        : subscriptionRegisterDetail?.payment_method ==
                          "digital"
                        ? "Not passed the payment gateway"
                        : "Pending"}
                    </Typography>
                    {subscriptionRegisterDetail.payment_method !== 1 &&
                      subscriptionRegisterDetail?.transaction_log !== null &&
                      subscriptionRegisterDetail?.transaction_log
                        ?.merchant_order_id !== null && (
                        <>
                          <Typography variant="subtitle1" mt={2}>
                            Method :{" "}
                            {
                              subscriptionRegisterDetail?.transaction_log
                                ?.method_name
                            }
                          </Typography>
                          <Typography variant="subtitle1" mt={2}>
                            Transaction Status : &nbsp;
                            {
                              subscriptionRegisterDetail?.transaction_log
                                ?.transaction_status
                            }
                          </Typography>
                          <Typography variant="subtitle1" mt={2}>
                            Payment service : &nbsp;
                            {subscriptionRegisterDetail?.payment_gateway}
                          </Typography>
                        </>
                      )}
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

            {subscriptionRegisterDetail.payment_status !== 1 &&
              subscriptionRegisterDetail.oc_register_id === null && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor:
                        loading ||
                        subscriptionRegisterDetail.payment_status == 1 ||
                        subscriptionRegisterDetail.payment_status == 2
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
                      subscriptionRegisterDetail.payment_status == 1 ||
                      subscriptionRegisterDetail.payment_status == 2
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
                        subscriptionRegisterDetail.payment_status == 1 ||
                        subscriptionRegisterDetail.payment_status == 2
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
                      subscriptionRegisterDetail.payment_status == 1 ||
                      subscriptionRegisterDetail.payment_status == 2
                    }
                    onClick={() => confirmStatusChange(2)}
                  >
                    Reject
                  </Button>
                </Box>
              )}
          </>
        )}
      </Box>
    </>
  );
};

export default Detail;
