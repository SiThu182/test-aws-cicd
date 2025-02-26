import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button, Typography } from "@mui/material";

import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import Spinner from "../../../../components/Spinner";
// import { fetchScoreCount } from "../ScoreCountApi";

function Payment() {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [status, setStatus] = useState(0);

  let [backgroundColor, setBackgroundColor] = useState("#4dabf5");

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const payment_status = queryParameters.get("status");

    if (payment_status == 1) {
      setBackgroundColor("green");
      setStatus(payment_status);
    } else {
      setBackgroundColor("red");
      setStatus(payment_status);
    }
  }, [status]);

  // const exit = () => {
  //   // allCategory.forEach((c) => {
  //   //   localStorage.removeItem(c);
  //   // });
  //   navigate("/mocktest/tabs");
  // };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          display: "flex",
          justifyContent: "flex-end",
          mr: "1rem",
        }}
      >
        {/* <Button variant="contained" sx={{ my: 2 }} onClick={() => exit()}>
            <LogoutIcon />
            <Typography>Back to Mock Test Page</Typography>
          </Button> */}
      </Box>
      <Box
        width="100%"
        sx={{
          backgroundColor: "rgb(231,239,254)",

          px: {
            xs: 2,
            sm: 5,
            md: "8rem",
            lg: "10rem",
            xl: "30rem",
          },

          height: "100vh",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "2rem",
            p: 2,
            boxShadow: 5,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "5rem",
              textAlign: "center",
              pl: 3,
              pb: 3,
            }}
          >
            <Typography variant="h6">
              Thank You for choosing Aigma PTE Ai.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "10rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {status == 1 ? (
              <lord-icon
                src="https://cdn.lordicon.com/xxdqfhbi.json"
                trigger="loop"
                delay="2000"
                colors="primary:#545454,secondary:#ffc738,tertiary:#4bb3fd"
                stroke="35"
                style={{ width: "250px", height: "250px" }}
              ></lord-icon>
            ) : status == 2 ? (
              <lord-icon
                src="https://cdn.lordicon.com/vyukcgvf.json"
                trigger="loop"
                colors="outline:#121331,primary:#ffc738,secondary:#92140c"
                style={{ width: "250px", height: "250px" }}
              ></lord-icon>
            ) : status == 3 ? (
              <lord-icon
                src="https://cdn.lordicon.com/vsgcujbd.json"
                trigger="loop"
                colors="primary:#f24c00,secondary:#121331,tertiary:#ebe6ef"
                style={{ width: "250px", height: "250px" }}
              ></lord-icon>
            ) : (
              ""
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}>
            <Typography variant="h6">
              {status == 1
                ? "Hurray ! your payment is success"
                : status == 2
                ? "Sorry, Payment Failed"
                : "Payment canceled"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              disabled={loading}
              sx={{ my: 2 }}
              onClick={() => navigate("/")}
            >
              <LogoutIcon />
              <Typography>
                {loading ? <>{/* <Spinner></Spinner> */}</> : "Back"}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Payment;
