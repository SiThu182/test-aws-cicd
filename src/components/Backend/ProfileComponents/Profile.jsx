import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Card, CardHeader, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserPlanDetailAsync } from "../../../redux/thunk/Dashboard";
import { fetchUserAsync } from "../../../redux/thunk/Users";
import { ProfileStyle } from "./ProfileStyle";

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { userPlanDetail } = useSelector((state) => state.dashboard);
  useEffect(() => {
    if (user === null) {
      let userId = localStorage.getItem("userId");
      dispatch(fetchUserAsync(userId));
    }
    if (userPlanDetail.length === 0) {
      dispatch(fetchUserPlanDetailAsync());
    }
  }, [dispatch, user, userPlanDetail]);

  const TextBox = (props) => {
    const { leftText, rightText } = props;
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          mx: "auto",
          my: 2,
        }}
      >
        <Box sx={{ width: "30%", textAlign: "right" }}>{leftText}</Box>
        <Box sx={{ width: "20%", textAlign: "right" }}>:</Box>
        <Box sx={{ width: "50%", textAlign: "center" }}>{rightText}</Box>
      </Box>
    );
  };
  return (
    <div>
      <Card
        sx={{
          mb: 3,
        }}
      >
        <CardHeader title="Profile Information"></CardHeader>
      </Card>
      <Box
        sx={{
          ...ProfileStyle.cardBox,

          // background:
          //   "linear-gradient(90deg, rgba(129,147,41,1) 0%, rgba(121,105,9,1) 0%, rgba(48,40,40,1) 0%, rgba(0,212,255,1) 100%)",
        }}
      >
        <Box
          sx={{
            ...ProfileStyle.accountImg,
          }}
        >
          {/* <img src="" alt="" srcset="" /> */}
          {user !== null && user?.data?.image !== null ? (
            <Box
              sx={{
                borderRadius: "50%",
                width: "5rem",
                overflow: "hidden",

                height: "5rem",
                boxShadow: 5,
                bordr: "2px solid black",
              }}
            >
              <img
                src={
                  process.env.REACT_APP_BACKEND_URL +
                  "storage/user/" +
                  user.data.image
                }
                style={{ width: "100%", aspectRatio: 1, objectFit: "cover" }}
                alt="user_img"
              />
            </Box>
          ) : (
            <AccountCircleIcon sx={{ fontSize: "5rem" }}></AccountCircleIcon>
          )}
        </Box>
        {user !== null && userPlanDetail.length !== 0 ? (
          <>
            <TextBox leftText="Name" rightText={user.data.name}></TextBox>
            <TextBox leftText="Email" rightText={user.data.email}></TextBox>
            <TextBox
              leftText="Role"
              rightText={
                user.data.role_id === 1
                  ? "Super Admin"
                  : user.data.role_id === 2
                  ? "User"
                  : user.data.role_id === 3
                  ? "Normal Admin"
                  : ""
              }
            ></TextBox>
            <TextBox
              leftText="Subscription"
              rightText={userPlanDetail.plan_name}
            ></TextBox>
            <TextBox
              leftText="Status"
              rightText={
                user.data.trial_status === 1
                  ? "trial period"
                  : userPlanDetail?.user_plan.subscription_plan_id === 1 &&
                    userPlanDetail?.user_plan.status === 1
                  ? "Approved"
                  : userPlanDetail?.plan_history[
                      userPlanDetail?.plan_history.length - 1
                    ]?.payment_status === 1
                  ? "Approved"
                  : userPlanDetail?.plan_history[
                      userPlanDetail?.plan_history.length - 1
                    ]?.payment_status === 2
                  ? "Reject"
                  : "Pending"
              }
            ></TextBox>
          </>
        ) : (
          <CircularProgress></CircularProgress>
        )}
      </Box>
    </div>
  );
}

export default Profile;
