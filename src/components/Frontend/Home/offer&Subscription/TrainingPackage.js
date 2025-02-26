import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchGroupTrainingPlanFrontendAsync,
  fetchIndividualTrainingPlanFrontendAsync,
} from "../../../../redux/thunk/Subscription";
import SwitchLayout from "./SwitchLayout";
import { useTranslation } from "react-i18next";

function TrainingPackage({ containerClass = "carousel-container-frontend" }) {
  const {
    individualTrainingFrontendStatus,
    individualTrainingFrontend,
    groupTrainingFrontend,
    groupTrainingFrontendStatus,
  } = useSelector((state) => state.subscription);
  const dispatch = useDispatch();
  const [showIndividualPlan, setShowIndividualPlan] = useState([]);
  const [showGroupPlan, setShowGroupPlan] = useState([]);

  const { country } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchGroupTrainingPlanFrontendAsync());
    dispatch(fetchIndividualTrainingPlanFrontendAsync());
    // setAssign();
  }, [dispatch]);

  useEffect(() => {
    if (
      individualTrainingFrontendStatus === "succeeded" &&
      groupTrainingFrontendStatus === "succeeded"
    ) {
      const findShowPlan = (plan) => {
        if (plan !== undefined && plan !== null && plan !== "") {
          let new_result = plan?.map((obj) => {
            let show_fees;
            if (country !== "MMK") {
              show_fees =
                country === "USD"
                  ? (obj.oversea_fees * 0.67).toFixed(2)
                  : country === "SGD"
                  ? (obj.oversea_fees * 0.9).toFixed(2)
                  : country === "THB"
                  ? (obj.oversea_fees * 24.63).toFixed(2)
                  : obj.oversea_fees;
            } else {
              show_fees = obj.fees;
            }
            return { ...obj, show_fees: show_fees };
          });
          return new_result.sort(function (a, b) {
            return a.plan_order - b.plan_order;
          });
        }
      };
      setShowIndividualPlan(findShowPlan(individualTrainingFrontend));
      setShowGroupPlan(findShowPlan(groupTrainingFrontend));
    }
  }, [
    individualTrainingFrontend,
    individualTrainingFrontendStatus,
    groupTrainingFrontend,
    groupTrainingFrontendStatus,
    country,
  ]);
  const { i18n } = useTranslation();

  // Get the current language
  const currentLanguage = i18n.language;
  return (
    <SwitchLayout
      planFrontend={showGroupPlan}
      planFrontendStatus={groupTrainingFrontendStatus}
      planFrontend1={showIndividualPlan}
      planFrontendStatus1={individualTrainingFrontendStatus}
      title={currentLanguage === "en" ? "Training Plan" : "သင်ကြားမှုအစီအစဉ်"}
      containerClass={containerClass}
    ></SwitchLayout>
  );
}

export default TrainingPackage;
