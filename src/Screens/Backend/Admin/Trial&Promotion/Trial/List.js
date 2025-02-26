import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReusableList from "../../Subscription/ReusableList";
import { fetchTrialPlanAsync } from "../../../../../redux/thunk/Trial&Promotion";

function List() {
  const dispatch = useDispatch();

  const { trialPlan, trialPlanStatus } = useSelector(
    (state) => state.trialAndPromotion
  );

  let [page, setPage] = useState(1);
  let postPath = "trial-plan-list?page=" + page;

  useEffect(() => {
    dispatch(fetchTrialPlanAsync(postPath));
  }, [dispatch, postPath, page]);

  return (
    <ReusableList
      page={page}
      setPage={setPage}
      data={trialPlan}
      status={trialPlanStatus}
      title="trial & promotion"
      type="trial"
      searchBar={false}
    ></ReusableList>
  );
}

export default List;
