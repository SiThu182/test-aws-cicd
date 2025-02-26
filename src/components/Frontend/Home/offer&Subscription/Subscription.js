import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSubscriptionPlanFrontendAsync } from "../../../../redux/thunk/Subscription";

import PlanSwitchLayout, { ClassicPlan } from "./PlanSwitchLayout";

function Subscription() {
  const { subscriptionFrontendStatus, subscriptionFrontend } = useSelector(
    (state) => state.subscription
  );
  const dispatch = useDispatch();
  const [showPlan, setShowPlan] = useState("");
  const { country } = useSelector((state) => state.user);

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
                ? (obj.oversea_fees * 0.67).toFixed(2)
                : country === "SGD"
                ? (obj.oversea_fees * 0.9).toFixed(2)
                : country === "THB"
                ? (obj.oversea_fees * 24.63).toFixed(2)
                : country === "NZD"
                ? (obj.oversea_fees * 1.09).toFixed(2)
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
  //custom css and responsive value

  return (
    // <PlanSwitchLayout
    //   subscriptionFrontend={showPlan}
    //   subscriptionFrontendStatus={subscriptionFrontendStatus}
    //   containerClass={"carousel-container-frontend"}
    // ></PlanSwitchLayout>
    <ClassicPlan
      subscriptionFrontend={showPlan}
      subscriptionFrontendStatus={subscriptionFrontendStatus}
      containerClass={"carousel-container-frontend"}
    />
  );
}

export default Subscription;
