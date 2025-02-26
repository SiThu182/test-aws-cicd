import { Avatar, Box, Divider, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import {
  fetchUserDetailsAsync,
  fetchUserPlanDetailFromAdminPanelAsync,
} from "../../../../redux/thunk/Users";

import DashboardUserPlan from "../../DashboardUserPlan";
import PracticeMockTestDetail from "./PracticeMockTestDetail";
import BackButton from "../../../../components/Backend/BackButton";
import { Navigation } from "@mui/icons-material";
import { setPath } from "../../../../redux/slice/PathSlice"; 

const Details = () => {
  
  const {
    userDetailsStatus,
    userDetails,
    userDetailsError,
    userPlanDetail,
    user,
    // userPlanDetailStatus,
  } = useSelector((state) => state.user);
  // console.log(userDetails,"UserDetail");


  const userId = useParams();
  const dispatch = useDispatch();
  const [sendingMail, setSendingMail] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUserDetailsAsync(userId.id));

    dispatch(fetchUserPlanDetailFromAdminPanelAsync(userId.id));
  }, [dispatch, userId.id]);

  const sendEmailHandler = async () => {
    setSendingMail(true);
    try {
      let result = await axios.get(
        process.env.REACT_APP_BACKEND_API +
          "sent-inactive-warning-mail/" +
          userId.id
      );
      if (result.data.status === 1) {
        swal({
          title: "Email sent successfully",
          text: result.data.message,
          icon: "success",
          button: "OK!",
          closeOnClickOutside: false,
          dangerMode: true,
        }).then((ok) => {
          if (ok) {
            window.location.reload();
            setSendingMail(false);
          }
        });
      } else {
        swal({
          title: "Get post data Error",
          text: "Error: " + result.data.message,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
        setSendingMail(false);
      }
    } catch (error) {
      swal({
        title: "Get post data Error",
        text: "Error: " + error,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      setSendingMail(false);
    }
  };


  const InfoSection = (props) => {
    const { title, info } = props;
    return (
      <Box sx={{ px: 3 }}>
        <Typography sx={{ color: "grey" }} variant="h6">
          {title}
        </Typography>
        <Typography>{info}</Typography>
        <Divider sx={{ borderBottomWidth: "3px", mb: "1rem" }} />
      </Box>
    );
  };

  const buyPlanUser = async () => {
    let sub_user_id = userId.id;

    localStorage.setItem("buying_user_id", sub_user_id);

     dispatch(setPath());
        navigate("/user/subscription-plan");
  
    }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box id="main" sx={{ p: 4 }}>
          <Box
            sx={{
              top: "1rem",
              position: "absolute",

              overflow: "visible",
              zIndex: 1500,
            }}
          >
            <Typography variant="h5">User Details</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" sx={{ my: 2 }}></Typography>
            <BackButton />
          </Box>
          {(userDetailsStatus === "loading" ||
            userDetailsStatus === "failed") && (
            <Box>
              <Typography variant="h5">
                {userDetailsStatus}
                {userDetailsError}
              </Typography>
            </Box>
          )}

          {userDetailsStatus === "succeeded" && (
            <>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "1rem",
                  boxShadow: 4,
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    height: "auto",
                    background:
                      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)",
                    borderRadius: "1rem",
                    position: "relative",

                    display: {
                      xs: "none",
                      md: "flex",
                    },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={`${process.env.REACT_APP_BACKEND_URL}storage/user/${userDetails.data.image}`}
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      backgroundColor:
                        userDetails?.data?.image !== null ? "white" : "",
                      boxShadow: 5,
                    }}
                  ></Avatar>
                </Box>
                <Box
                  sx={{
                    display: {
                      xs: "block",
                      md: "none",
                    },
                    height: "8rem",
                    background:
                      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)",
                    borderRadius: "1rem",
                    position: "relative",
                  }}
                >
                  <Avatar
                    src={`${process.env.REACT_APP_BACKEND_URL}storage/user/${userDetails.data.image}`}
                    sx={{
                      position: "absolute",
                      bottom: -20,
                      left: {
                        xs: "38%",
                        sm: "40%",
                      },
                      width: "5rem",
                      height: "5rem",
                      backgroundColor:
                        userDetails?.data?.image !== null ? "white" : "",
                      boxShadow: 5,
                    }}
                  ></Avatar>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <InfoSection title="User Name" info={userDetails.data.name} />
                  <InfoSection title="Email" info={userDetails.data.email} />
                  <InfoSection
                    title="Role"
                    info={
                      userDetails.data.role_id === 1
                        ? "Super Admin"
                        : userDetails.data.role_id === 3
                        ? "Normal Admin"
                        : "User"
                    }
                  />
                  <InfoSection
                    title="Registered by"
                    info={userDetails.data.registered_by}
                  />
                  <InfoSection
                    title="Registered Date"
                    info={new Date(userDetails.data.created_at).toDateString()}
                  />
                  <InfoSection
                    title="Inactive Days"
                    info={userDetails.data?.inactive_days}
                  />
                  <InfoSection
                    title="Inactive Warning Email Sent"
                    info={userDetails.data?.warning_email_sent}
                  />

                  <InfoSection
                    title="Account Activation Status"
                    info={
                      userDetails.data?.status == 2
                        ? "Deactivated"
                        : userDetails.data?.status == 1
                        ? "Activated"
                        : "Not Activated Yet"
                    }
                  />

                  <InfoSection
                    title="Country"
                    info={
                      userDetails.data?.country
                    }
                  />

                  {((userDetails.data?.inactive_days > 62 &&
                    userDetails.data?.warning_email_sent < 1) ||
                    (userDetails.data?.inactive_days > 68 &&
                      userDetails.data?.warning_email_sent < 2) ||
                    (userDetails.data?.inactive_days > 68 &&
                      userDetails.data?.status == 1)) && (
                    <Button
                      variant="contained"
                      sx={{ m: 2 }}
                      disabled={sendingMail}
                      onClick={() => sendEmailHandler()}
                    >
                      {userDetails.data?.warning_email_sent < 2
                        ? "Send Warning Email"
                        : "Deactivate Account"}
                    </Button>
                    
                  )}

                    <Button
                      variant="contained"
                      sx={{ m: 2 }} 
                      onClick={() => buyPlanUser()}
                    >
                       Buy Plan for User
                    </Button>
                </Box>
              </Box>
              <Box sx={{ width: "100%" }}>
                <DashboardUserPlan
                  user={user}
                  userPlan={userPlanDetail?.user_plan}
                  planHistory={userPlanDetail?.plan_history}
                  status={userPlanDetail?.status}
                  name={userPlanDetail?.plan_name}
                  userId={userId.id}
                ></DashboardUserPlan>
              </Box>
              <PracticeMockTestDetail userId={userId.id} />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Details;
