import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { PageCard } from "./PageStyle";
function DashboardUserPlan(props) {
  let [daysRemaining, setDaysRemaining] = useState();
  let [mtDaysRemaining, setMtDaysRemaining] = useState();
  let [trialDaysRemaining, setTrialDaysRemaining] = useState();
  let [trialDaysRemainingDetail, setTrialDaysRemainingDetail] = useState();

  const navigate = useNavigate();

  useEffect(() => {

    if (props.user?.data) {
      if (props.userPlan?.check_scoring_date) {
       
        if (props.userPlan?.check_scoring_date === null) {
          return setDaysRemaining(0);
        } else {
          const currentDate = new Date();
          const expireDate = new Date(props.userPlan.check_scoring_date);
          const timeDifference = expireDate - currentDate;
          if (timeDifference < 0) {
          }
         
          const daysRemaining = Math.ceil(
            timeDifference / (1000 * 60 * 60 * 24)
          );
          setDaysRemaining(daysRemaining);
        }
      }
      if (props.user?.data?.trial_status === 0) {
      } else {
        const currentDate = new Date();
        const expireDate = new Date(props.user.data.trial_end_date);
        const timeDifference = expireDate - currentDate;
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        setTrialDaysRemaining(daysRemaining);
        if (timeDifference > 0) {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
          );

          setTrialDaysRemainingDetail({ days, hours, minutes });
        }
      }
      if (props.userPlan?.check_mt_scoring_date) {
       
        if (props.userPlan?.check_mt_scoring_date === null) {
          return setMtDaysRemaining(0);
        } else {
          const currentDate = new Date();
          const expireDate = new Date(props.userPlan.check_mt_scoring_date);
          const timeDifference = expireDate - currentDate;
          if (timeDifference < 0) {
          }
     
          const daysRemaining = Math.ceil(
            timeDifference / (1000 * 60 * 60 * 24)
          );
          setMtDaysRemaining(daysRemaining);
        }
      }
    }
  }, [props]);

  const clickHandler = () => {
    navigate("/admin/userPlan/history", {
      state: {
        planHistory: props.planHistory,
        finalPlan: props.userPlan,
        name: props.name,
      },
    });
  };

  const activityClickHandler = () => {
    navigate("/activity-logs", {
      state: {
        userId: props.userId,
      },
    });
  };
  return (
    <Box
      sx={{
        display: "block",
        width: "100%",
        my: 3,

        // borderRadius: "16px",
        // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        // backdropFilter: "blur(6px)",
        // border: "1px solid rgba(144, 242, 255, 0.3)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          borderRadius: "1rem",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
          boxShadow: 3,
          p: 2,
        }}
      >
        <Box
          sx={{
            background: "rgba(144, 242, 255, 0.21)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(144, 242, 255, 0.3)",
            p: 2,
            width: {
              xs: "100%",
              sm: "100%",
              md: "30%",
            },
            my: 1,
          }}
        >
          <Typography>
            Current Plan -{" "}
            {props.status === 2 ? "No purchase history yet" : props.name}
          </Typography>
          <Typography>
            Scoring limited Status -{" "}
            {props.status === 2
              ? "---"
              : props.userPlan?.check_scoring_date
              ? "Yes"
              : "No"}
          </Typography>
          <Typography>
            Mock Test unlimited Status -{" "}
            {props.status === 2
              ? "---"
              : props.userPlan?.check_mt_scoring_date
              ? "Yes"
              : "No"}
          </Typography>
          {props.userPlan?.check_scoring_date ? (
            <Typography>
              Practice Unlimited Expiry Date -{" "}
              {props.userPlan?.check_scoring_date}
            </Typography>
          ) : (
            ""
          )}
          {props.userPlan?.check_mt_scoring_date ? (
            <Typography>
              Mock test Unlimited Expiry Date -{" "}
              {props.userPlan?.check_mt_scoring_date}
            </Typography>
          ) : (
            ""
          )}

          {(props?.planHistory && props?.planHistory.length) > 0 && (
            <>
              <Typography>
                Payment Status -
                {
                  // props.userPlan?.subscription_plan_id == 1 &&
                  // props.userPlan?.status == 1
                  //   ? "Approved"
                  // :
                  props.planHistory?.length !== undefined
                    ? props.planHistory[props.planHistory?.length - 1]
                        ?.payment_status === 1
                      ? "Approved"
                      : props.planHistory[props.planHistory?.length - 1]
                          ?.payment_status === 2
                      ? "Reject"
                      : "Pending"
                    : "---"
                }
              </Typography>
            </>
          )}

          {props.user?.data?.trial_status == 1 ? (
            <Typography>
              {/* Trial Remaining Days - {trialDaysRemaining.days} days, {trialDaysRemaining.hours} hr, {trialDaysRemaining.minutes} min */}
              Trial Period : Yes
            </Typography>
          ) : (
            <Typography>Trial Period : No</Typography>
          )}
          {trialDaysRemaining > 0 && (
            <Box
              sx={{
                backgroundColor: "rgb(25,156,229)",
                borderTopRightRadius: "1rem",
                borderBottomRightRadius: "1rem",
                boxShadow: 3,
                padding: 1,
              }}
            >
              <Typography sx={{ fontSize: "0.9rem", color: "white" }}>
                <span
                  style={{
                    color: "red",
                    fontWeight: "800",
                    fontSize: "1.2rem",
                  }}
                >
                  {trialDaysRemaining}
                </span>{" "}
                Days Left for Trial unlimited Practice
              </Typography>
            </Box>
          )}
          <Button
            sx={{ mt: 2, mr: 2 }}
            disabled={props.planHistory === undefined}
            onClick={clickHandler}
            variant="contained"
          >
            {" "}
            Purchased Plan History
          </Button>

          {props.user?.data?.role_id === 1 && (
            <Button
              sx={{ mt: 2, mr: 2 }}
              disabled={props.planHistory === undefined}
              onClick={activityClickHandler}
              variant="contained"
            >
              Activity Log
            </Button>
          )}
        </Box>
        <Box
          /* From https://css.glass */

          sx={{
            background: "rgba(144, 242, 255, 0.21)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(144, 242, 255, 0.3)",

            width: {
              xs: "100%",
              sm: "100%",
              md: "70%",
            },
            p: 2,
            display: "flex",
            // justifyContent: "space-evenly",
            // alignItems: "center",
            flexWrap: "wrap",
            my: 1,
            ml: {
              sm: 0,
              md: 1,
            },
          }}
        >
          {props.user?.data?.trial_status == 1 && (
            <>
              <Box
                sx={{
                  m: 1,
                  borderRadius: "1rem",
                  backgroundColor: "rgb(25,156,229)",

                  width: "8rem",
                  p: 1,
                  boxShadow: 3,
                  ...PageCard.userDetailCard,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h5"
                    sx={{
                      color: "yellowgreen",
                      fontWeight: "600",
                    }}
                  >
                    {trialDaysRemaining < 0 ? (
                      <span style={{ color: "red" }}>Unlimited</span>
                    ) : (
                      trialDaysRemaining
                    )}
                  </Typography>
                </Box>

                <Typography
                  sx={{ fontSize: "0.9rem", fontWeight: "600", color: "white" }}
                  textAlign={"center"}
                >
                  {trialDaysRemaining > 0
                    ? "Days Left for Trial unlimited Practice"
                    : "trial Practice Expired"}
                </Typography>
              </Box>
            </>
          )}
          {props.userPlan?.check_scoring_date !== null ? (
            <>
              <Box
                sx={{
                  m: 1,
                  borderRadius: "1rem",
                  backgroundColor: "rgb(25,156,229)",

                  width: "8rem",
                  p: 1,
                  boxShadow: 3,
                  ...PageCard.userDetailCard,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h5"
                    sx={{
                      color: "yellowgreen",
                      fontWeight: "600",
                    }}
                  >
                    {daysRemaining < 0 ? (
                      <span style={{ color: "red" }}>Unlimited</span>
                    ) : (
                      daysRemaining
                    )}
                  </Typography>
                </Box>

                <Typography
                  sx={{ fontSize: "0.9rem", fontWeight: "600", color: "white" }}
                  textAlign={"center"}
                >
                  {daysRemaining > 0
                    ? "Days Left for unlimited Practice"
                    : "Practice Expired"}
                </Typography>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                m: 1,
                borderRadius: "1rem",
                backgroundColor: "rgb(25,156,229)",

                p: 1,
                width: "8rem",
                boxShadow: 3,
                ...PageCard.userDetailCard,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "5rem",

                  backgroundColor: "white",
                }}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ color: "yellowgreen", fontWeight: "600" }}
                >
                  {props.userPlan?.scoring_count}
                </Typography>
              </Box>

              <Typography
                sx={{ fontSize: "0.9rem", fontWeight: "600", color: "white" }}
                textAlign={"center"}
              >
                Practice Count <br />
                left
              </Typography>
            </Box>
          )}
          {props.userPlan?.check_mt_scoring_date !== null ? (
            <Box
              sx={{
                m: 1,
                width: "8rem",
                borderRadius: "1rem",
                backgroundColor: "rgb(25,156,229)",

                p: 1,
                boxShadow: 3,
                ...PageCard.userDetailCard,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{
                    color: "yellowgreen",
                    fontWeight: "600",
                  }}
                >
                  {mtDaysRemaining < 0 ? (
                    <span style={{ color: "red" }}>Mock test Unlimited</span>
                  ) : (
                    mtDaysRemaining
                  )}
                </Typography>
              </Box>

              <Typography
                sx={{ fontSize: "0.9rem", fontWeight: "600", color: "white" }}
                textAlign={"center"}
              >
                {mtDaysRemaining > 0
                  ? "Days Left for unlimited Mock test"
                  : "Mock test duration Expired"}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                m: 1,
                borderRadius: "1rem",
                backgroundColor: "rgb(25,156,229)",
                width: "8rem",
                p: 1,
                boxShadow: 3,
                ...PageCard.userDetailCard,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "5rem",
                  backgroundColor: "white",
                }}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ color: "yellowgreen", fontWeight: "600" }}
                >
                  {props.userPlan?.mocktest_count}
                </Typography>
              </Box>

              <Typography
                sx={{ fontSize: "0.9rem", fontWeight: "600", color: "white" }}
                textAlign={"center"}
              >
                Mock test <br />
                Score Count Left
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              m: 1,
              borderRadius: "1rem",
              backgroundColor: "rgb(25,156,229)",

              p: 1,
              boxShadow: 3,
              ...PageCard.userDetailCard,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5rem",
                backgroundColor: "white",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{ color: "yellowgreen", fontWeight: "600" }}
              >
                {props.userPlan?.daily_practice_count}
              </Typography>
            </Box>

            <Typography
              sx={{ fontSize: "0.9rem", fontWeight: "600", color: "white" }}
              textAlign={"center"}
            >
              Daily Practice <br />
              Score Count Left
            </Typography>
          </Box>

          <Box
            sx={{
              m: 1,
              borderRadius: "1rem",
              backgroundColor: "rgb(25,156,229)",

              p: 1,
              boxShadow: 3,
              ...PageCard.userDetailCard,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5rem",
                backgroundColor: "white",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{ color: "yellowgreen", fontWeight: "600" }}
              >
                {props.userPlan?.mini_mocktest_count}
              </Typography>
            </Box>

            <Typography
              sx={{ fontSize: "0.9rem", fontWeight: "600", color: "white" }}
              textAlign={"center"}
            >
              Mini Mock test <br />
              Score Count Left
            </Typography>
          </Box>
          <Box
            sx={{
              m: 1,
              borderRadius: "1rem",
              backgroundColor: "rgb(25,156,229)",

              p: 1,
              boxShadow: 3,
              ...PageCard.userDetailCard,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5rem",
                backgroundColor: "white",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{ color: "yellowgreen", fontWeight: "600" }}
              >
                {props.userPlan?.speaking_mocktest_count}
              </Typography>
            </Box>

            <Typography
              sx={{ fontSize: "0.9rem", fontWeight: "600", color: "white" }}
              textAlign={"center"}
            >
              Speaking Mock test <br />
              Score Count Left
            </Typography>
          </Box>
          <Box
            sx={{
              m: 1,
              borderRadius: "1rem",
              backgroundColor: "rgb(25,156,229)",

              p: 1,
              boxShadow: 3,
              ...PageCard.userDetailCard,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5rem",
                backgroundColor: "white",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{ color: "yellowgreen", fontWeight: "600" }}
              >
                {props.userPlan?.reading_mocktest_count}
              </Typography>
            </Box>

            <Typography
              sx={{ fontSize: "0.9rem", fontWeight: "600", color: "white" }}
              textAlign={"center"}
            >
              Reading Mock test <br />
              Score Count Left
            </Typography>
          </Box>
          <Box
            sx={{
              m: 1,
              borderRadius: "1rem",
              backgroundColor: "rgb(25,156,229)",

              p: 1,
              boxShadow: 3,
              ...PageCard.userDetailCard,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5rem",
                backgroundColor: "white",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{ color: "yellowgreen", fontWeight: "600" }}
              >
                {props.userPlan?.writing_mocktest_count}
              </Typography>
            </Box>

            <Typography
              sx={{ fontSize: "0.9rem", fontWeight: "600", color: "white" }}
              textAlign={"center"}
            >
              Writing Mock test <br />
              Score Count Left
            </Typography>
          </Box>
          <Box
            sx={{
              m: 1,
              borderRadius: "1rem",
              backgroundColor: "rgb(25,156,229)",

              p: 1,
              boxShadow: 3,
              ...PageCard.userDetailCard,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5rem",
                backgroundColor: "white",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{ color: "yellowgreen", fontWeight: "600" }}
              >
                {props.userPlan?.listening_mocktest_count}
              </Typography>
            </Box>

            <Typography
              sx={{ fontSize: "0.9rem", fontWeight: "600", color: "white" }}
              textAlign={"center"}
            >
              Listening Mock test <br />
              Score Count Left
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardUserPlan;
