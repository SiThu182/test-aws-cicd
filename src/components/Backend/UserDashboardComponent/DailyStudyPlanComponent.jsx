import { Box, Button, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetTodayDateString } from "../../../Utils/GetTodayDateString";
// import swal from "sweetalert";

const CategoryDailyCount = ({ loading, category, count, progress }) => {

  return (
    <Box
      sx={{
        boxShadow: 4,
        borderRadius: "2rem",
        textAlign: "center",
        minWidth: "100px",
        padding: 2,
      }}
    >
      {loading ? (
        <>
          <Skeleton variant="rectangular" width={"100%"} height={"30%"}>
            <Typography>.</Typography>
          </Skeleton>
          <Skeleton variant="rectangular" width={"100%"} height={"35%"}>
            <Typography>.</Typography>
          </Skeleton>
          <Skeleton variant="rectangular" width={"100%"} height={"30%"}>
            <Typography>.</Typography>
          </Skeleton>
        </>
      ) : (
        <Box sx={{ minWidth: "100px" }}>
          <Typography variant="h6" sx={{ color: "#0CAFFF" }}>
            {category?.toUpperCase()}
          </Typography>
          <Typography variant="p" sx={{ mb: 2 }}>
            {count}
          </Typography>

          <Box
            sx={{
              width: "100%",
              height: "0.5rem",
              background:
                "linear-gradient(111deg, rgba(255,72,12,1) 48%, rgba(246,111,0,0.9501050420168067) 100%)",
              borderRadius: "1rem",
              boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            {progress > 0 && (
              <Box
                sx={{
                  width: progress,
                  background:
                    "linear-gradient(111deg, rgba(50,246,0,0.9501050420168067) 68%, rgba(255,255,255,1) 98%)",
                  height: "100%",
                  borderRadius: "1rem",
                  border: "1px solid grey",
                }}
              ></Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

function DailyStudyPlanComponent() {
  const [todayPlan, setTodayPlan] = useState();
  const [userProgress, setUserProgress] = useState();
  const [loading, setLoading] = useState();
  const [planExist, setPlanExist] = useState(false);
  // const [currentProgress, setCurrentProgress] = useState();
  const [errorFetchingDailyPlan, setErrorFetchingDailyPlan] = useState(false);
  const navigate = useNavigate();
  let userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchDailyPlan = async () => {
      setErrorFetchingDailyPlan(false);
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const dateString = GetTodayDateString();
      try {
        let dailyPlanDetail = await axios.get(
          `${process.env.REACT_APP_BACKEND_ADMIN}get-daily-plan/${userId}/${dateString}/${timezone}`
        );

        if (
          dailyPlanDetail.data.status === 1 &&
          dailyPlanDetail?.data.data?.today_plan !== null &&
          dailyPlanDetail?.data.data?.today_plan !== undefined
        ) {
          setPlanExist(true);
          setLoading(true);

          setTodayPlan({ ...dailyPlanDetail.data.data.today_plan });
          let todayCategoryDetail = { ...dailyPlanDetail.data.data.today_plan };

          dailyPlanDetail.data.data.today_user_score_count.forEach((c) => {
            if (todayCategoryDetail.hasOwnProperty(c.category)) {
              todayCategoryDetail[c.category] =
                todayCategoryDetail[c.category] - c.count > 0
                  ? todayCategoryDetail[c.category] - c.count
                  : 0;
            }
          });
          dailyPlanDetail.data.data.today_user_score_mc_count.forEach((c) => {
            if (todayCategoryDetail.hasOwnProperty(c.category)) {
              todayCategoryDetail[c.category] =
                todayCategoryDetail[c.category] - c.count > 0
                  ? todayCategoryDetail[c.category] - c.count
                  : 0;
            }
          });

          setUserProgress(todayCategoryDetail);
        } else {
          if (dailyPlanDetail.data.status !== 1) {
            // swal({
            //   title: "Error",
            //   text: "Fail to fetch daily plan" + dailyPlanDetail?.data?.message,
            //   icon: "error",
            //   // buttons: true,
            //   // dangerMode: true,
            //   timer: 2000,
            // });
            setErrorFetchingDailyPlan(true);
          }
        }
      } catch (error) {
        setErrorFetchingDailyPlan(true);
        // swal({
        //   title: "Error",
        //   text: "Fail to fetch study plan" + error,
        //   icon: "error",
        //   // buttons: true,
        //   // dangerMode: true,
        //   timer: 2000,
        // });
      } finally {
        setLoading(false);
      }
    };
    fetchDailyPlan();
  }, [userId]);

  return (
    <Box
      sx={{
        borderRadius: "2rem",
        background: "white",
        padding: 2,
        boxShadow: 4,
        minHeight: "300px",
      }}
    >
      <Typography variant="h5" component={"h5"} sx={{ mb: 2 }}>
        Daily Study Plan
      </Typography>
      {planExist ? (
        <Box>
          <>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                justifyContent: "center",
                my: 2,
              }}
            >
              {Object.keys(todayPlan).map(
                (key, i) =>
                  i <= 2 && (
                    <CategoryDailyCount
                      key={i}
                      loading={loading}
                      category={key}
                      count={todayPlan[key]}
                      progress={Math.round(
                        (1 - userProgress[key] / todayPlan[key]) * 100
                      )}
                    />
                  )
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                justifyContent: "center",
              }}
            >
              {Object.keys(todayPlan).map(
                (key, i) =>
                  i > 2 && (
                    <CategoryDailyCount
                      loading={loading}
                      key={i}
                      category={key}
                      count={todayPlan[key]}
                      progress={Math.round(
                        (1 - userProgress[key] / todayPlan[key]) * 100
                      )}
                    />
                  )
              )}
            </Box>
          </>
        </Box>
      ) : (
        !errorFetchingDailyPlan && (
          <Box
            sx={{ display: "flex", flexWrap: "wrap", gap: 3, height: "50%" }}
          >
            <Typography>No daily plan for today ...</Typography>
          </Box>
        )
      )}
      {errorFetchingDailyPlan && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            height: "50%",
            color: "red",
          }}
        >
          <Typography>Error fetching daily plan ...</Typography>
        </Box>
      )}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ background: "#0CAFFF" }}
          onClick={() => navigate("/daily-plan-history")}
        >
          View Daily Study Plan History
        </Button>
      </Box>
    </Box>
  );
}

export default DailyStudyPlanComponent;
