import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReusableList from "../../Subscription/ReusableList";
import { fetchPromotionPlanAsync } from "../../../../../redux/thunk/Trial&Promotion";

function List() {
  const dispatch = useDispatch();

  const { promotionPlan, promotionPlanStatus } = useSelector(
    (state) => state.trialAndPromotion
  );

  let [page, setPage] = useState(1);
  let postPath = "promotion-plan-list?page=" + page;

  useEffect(() => {
    dispatch(fetchPromotionPlanAsync(postPath));
  }, [dispatch, postPath, page]);

  return (
    <ReusableList
      page={page}
      setPage={setPage}
      data={promotionPlan}
      status={promotionPlanStatus}
      title="trial"
      type="trial"
      searchBar={false}
    ></ReusableList>
  );
}

export default List;
