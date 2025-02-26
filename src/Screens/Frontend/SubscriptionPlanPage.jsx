import React from "react";
import Layout from "../../components/Layout/Frontend/Layout";
import { Box, Typography } from "@mui/material";
import TrainingPackage from "../../components/Frontend/Home/offer&Subscription/TrainingPackage";
// import Subscription from "../../components/Frontend/Home/offer&Subscription/Subscription";
import { CardStyle } from "../../components/Frontend/Home/offer&Subscription/CardStyle";
import FullWidthTabs from "../../components/Frontend/Home/offer&Subscription/SubscriptionTabs";

import BuyPlanVideoBox from "../../components/Frontend/Home/BuyPlanVideoBox";
import { setCountry } from "../../redux/slice/UserSlice";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const PaymentInfoBox = ({ url, icon, img, payment }) => {
  return (
    <Box>
      <Box
        sx={{
          width: "8rem",
          height: "8rem",
          mx: "auto",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "1rem",
          boxShadow: 4,
        }}
      >
        {img === "" ? (
          <Box sx={{ width: "100%", textAlign: "center" }}>{icon}</Box>
        ) : (
          <img
            src={img}
            alt="stripe-logo"
            style={{
              width: "80%",
            }}
          />
        )}
      </Box>
      <a href={url} target="_blank" rel="noreferrer">
        <Typography
          variant="body1"
          sx={{
            color: "white",
            textDecorationColor: "white",
            textAlign: "center",
            mt: "1rem",
          }}
        >
          How to pay with {payment} payment method
        </Typography>
      </a>
    </Box>
  );
};

const SubscriptionPlanPage = () => {
  // alert('teset')
  // const
  const dispatch = useDispatch();

  let country_status = localStorage.getItem("country_status");

  let country = localStorage.getItem("country");

  if (country_status == null) {
    dispatch(setCountry("AUD"));
  } else {
    // country = Object.assign(country,{  name:"International"})
    dispatch(setCountry(country));
  }

  return (
    <section>
      <Layout bgColor="rgb(20 93 160)">
        <Box
          sx={{
            width: "100%",
            // height: "70vh",
            // backgroundImage: `url(${process.env.REACT_APP_FRONTEND_URL}Image/subscription_banner.png)`,
            // backgroundPosition: "center",
            // backgroundSize: "cover",
            // backgroundAttachment: "fixed",
            // backgroundBlendMode: "overlay",
          }}
        >
          <img
            src={`${process.env.REACT_APP_FRONTEND_URL}Image/Aigma New Year Sale Banner.png`}
            alt="subscription-banner"
            style={{ width: "100%" }}
          />
        </Box>
        <BuyPlanVideoBox />
        <Box sx={{ background: "rgb(20 93 160)", marginBottom: "-1%" }}>
          <Box py={"5rem"}>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", color: "white", py: 2 }}
            >
              Plan Payment Methods
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                textAlign: "center",
                color: "white",
                fontSize: "1.2rem",
                mb: "1rem",
              }}
            >
              If you want to know how to buy plans on the aigma website, you can
              read this PDF file. It is explained detail in PDF.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <PaymentInfoBox
                img={`${process.env.REACT_APP_FRONTEND_URL}Image/stripe_logo.png`}
                url={`${process.env.REACT_APP_FRONTEND_URL}resource/manual_pay.pdf`}
                payment={"stripe"}
              />
              <PaymentInfoBox
                img={`${process.env.REACT_APP_FRONTEND_URL}Image/dinger_logo.png`}
                url={`${process.env.REACT_APP_FRONTEND_URL}resource/digital_payment.pdf`}
                payment={"dinger"}
              />
              <PaymentInfoBox
                img={""}
                icon={
                  <i
                    class="fa-solid fa-hand-holding-dollar "
                    color="blue"
                    style={{ fontSize: "4rem" }}
                  />
                }
                url={`${process.env.REACT_APP_FRONTEND_URL}resource/manual_payment.pdf`}
                payment={"manual"}
              />
            </Box>
          </Box>
          <TrainingPackage />
          <Box
            pb={5}
            sx={{
              width: {
                md: "90%",
                xl: "90%",
              },
              mx: "auto",
            }}
          >
            {/* <subscription title */}
            <Typography
              variant="h3"
              sx={{ ...CardStyle.hStyle, color: "white" }}
            >
              FLEXIBLE PLAN
            </Typography>
            <FullWidthTabs />
          </Box>
        </Box>
      </Layout>
    </section>
  );
};

export default SubscriptionPlanPage;
