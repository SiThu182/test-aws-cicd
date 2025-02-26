import React, { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CheckConditions from "./CheckConditions";
import { fetchScoreCount } from "../../../../components/Backend/ScoreCountApi";
import Loader from "../../../../components/Backend/AnimationLoader/Loader";
import { Box, Button, Typography } from "@mui/material";

export const AdminCheckContext = createContext();

function MockTest() {
  const [error, setError] = useState("");
  useEffect(() => {
    // Disable the browser's back button for this page
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);

    return () => {
      // Re-enable the browser's back button when the component unmounts
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    window.history.forward();
  };

  const para = useParams();
  const [isShowSubscriptionAlertPage, setIsShowSubscriptionAlertPage] =
    useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setError("");
    let checkScore = async () => {
      const result = await fetchScoreCount(
        userId,
        parseInt(para.mt_type_id) + 1,
        para.id,
        "mock test",
        true
      );

      if (result !== 1) {
        if (isNaN(result)) {
          setIsShowSubscriptionAlertPage(true);
          setError(result);
        } else {
          setIsShowSubscriptionAlertPage(true);
        }
      } else {
        setIsShowSubscriptionAlertPage(false);
      }
    };
    checkScore();
  }, [para.mt_type_id, para.id]);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  };

  return (
    <>
      {isShowSubscriptionAlertPage === true && para.check != 1 ? (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            color: "white",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
          }}
        >
          {error !== "" ? (
            <Typography>
              Error :{error}
              <Button
                variant="contained"
                onClick={() => navigate("/mocktest/tabs")}
              >
                Go Back
              </Button>
            </Typography>
          ) : (
            <>
              <Typography variant="h3">Purchase for more</Typography>

              <Typography variant="h5">
                You have no score token for this test .
              </Typography>
              <Typography variant="p">
                You can buy a plan or proceed to take test but no score will be
                generated .
              </Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: "red", mt: 1, width: "30rem" }}
                onClick={() => navigate("/admin/subscription-shop")}
              >
                Buy Plan
              </Button>
              <Box my={2} sx={{ width: "30rem", display: "flex" }}>
                <Button
                  sx={{ mr: 2, width: "50%", my: 1 }}
                  variant="contained"
                  onClick={() => navigate("/mocktest/tabs")}
                >
                  Back To Mock Test
                </Button>
                <Button
                  sx={{ mr: 2, width: "50%", my: 1 }}
                  variant="contained"
                  onClick={() => setIsShowSubscriptionAlertPage(false)}
                >
                  Proceed
                </Button>
              </Box>
            </>
          )}
        </Box>
      ) : isShowSubscriptionAlertPage === false || para.check == 1 ? (
        <AdminCheckContext.Provider value={para.check == 1 ? true : false}>
          <CheckConditions
            checkAnswerState={false}
            mockId={para.id}
            mockTestType={para.mt_type_id}
            resumeByUserOutsideTest={para.resume} //this is for user choose resume or restart at the start of the test card continue alert box(if save progress exist)
          />
        </AdminCheckContext.Provider>
      ) : (
        isShowSubscriptionAlertPage === "" &&
        para.check != 1 && (
          <Box sx={containerStyle}>
            <Loader></Loader>{" "}
          </Box>
        )
      )}
    </>
  );
}

export default MockTest;
