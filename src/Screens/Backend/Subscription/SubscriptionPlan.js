import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchSubscriptionPlanFrontendAsync } from "../../../redux/thunk/Subscription";
import { useDispatch, useSelector } from "react-redux";
import PlanSwitchLayout from "../../../components/Frontend/Home/offer&Subscription/PlanSwitchLayout";
import Currency from "../../../components/Backend/Currency";
 import  { setCountry }  from "../../../redux/slice/UserSlice";

 
function SubscriptionPlan() {
  
  const { subscriptionFrontendStatus, subscriptionFrontend } = useSelector(
    (state) => state.subscription
  );
  const dispatch = useDispatch();
  const { country } = useSelector((state) => state.user);
         if (country == null) {
            dispatch(setCountry("AUD"));
           
          } else{
            setCountry(country)
          } 
        
  const [showPlan, setShowPlan] = useState("");

  useEffect(() => {
    dispatch(fetchSubscriptionPlanFrontendAsync());

    // setAssign();
  }, [dispatch]);
  useEffect(() => {
    if (subscriptionFrontendStatus === "succeeded") {
      const findShowPlan = () => {
        var result = subscriptionFrontend.filter(
          (s) => s.frontend_status === 1 && s.plan_type_id !== 9
        );

        let new_result = result.map((obj) => {
          let show_fees;
          if (country !== "MMK") {
            show_fees =
              country === "USD"
                ? (obj.oversea_fees * 0.65).toFixed(2)
                : country === "SGD"
                ?
                  (obj.oversea_fees * 0.9).toFixed(2)
                : country === "THB" 
                ?
                (obj.oversea_fees * 24.63).toFixed(2)
                : country === "NZD" 
                ?
                (obj.oversea_fees * 1.09).toFixed(2)
                : obj.oversea_fees;
          } else {
            show_fees = obj.fees;
          }
          return { ...obj, show_fees: show_fees };
        });
        return new_result.sort(function (a, b) {
          return a.plan_order - b.plan_order;
        });
      };
      setShowPlan(findShowPlan);
    }
  }, [subscriptionFrontend, subscriptionFrontendStatus, country]);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Currency />
      </Box>
      <Box
        sx={{
          ml: "2rem",
          top: "1rem",
          position: "absolute",
          overflow: "visible",
          zIndex: 1500,
        }}
      >
        <Typography variant="h5">Subscription Plan</Typography>
      </Box>
      <PlanSwitchLayout
        subscriptionFrontend={showPlan}
        subscriptionFrontendStatus={subscriptionFrontendStatus}
        containerClass={"carousel-container-backend"}
      ></PlanSwitchLayout>
    </Box>
  );
}

export default SubscriptionPlan;
