import React from "react";

import ReusableList from "../ReusableList";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { useEffect } from "react";
import { fetchSubscriptionPlanAsync } from "../../../../../redux/thunk/Subscription";

function List() {
  const dispatch = useDispatch();

  const { subscription, subscriptionStatus } = useSelector(
    (state) => state.subscription
  );

  let [searchValue, setSearchValue] = useState("");
  let [page, setPage] = useState(1);
  let postPath = "subscription-plan?page=" + page;
  let searchPath =
    "search-subscription-plan-by-name?page=" + page + "&plan=" + searchValue;
  const [isSearch, setIsSearch] = useState(false);

  
  useEffect(() => {
    if (searchValue !== "") {
      setIsSearch(true);
    } else {
      dispatch(fetchSubscriptionPlanAsync(postPath));
      setIsSearch(false);
    }

    // if (type === "training") {
    //   if (searchValue !== "") {
    //     dispatch(fetchTrainingPlanAsync(searchPath));
    //   } else {
    //     dispatch(fetchTrainingPlanAsync(postPath));
    //   }
    // }
  }, [dispatch, postPath, page, searchValue, searchPath]);

  return (
    <ReusableList
      page={page}
      setPage={setPage}
      data={subscription}
      setSearchValue={setSearchValue}
      isSearch={isSearch}
      searchAPI={(path) => fetchSubscriptionPlanAsync(path)}
      searchPath={searchPath}
      status={subscriptionStatus}
      title="Plan"
      type="plan"
    ></ReusableList>
  );
}

export default List;
