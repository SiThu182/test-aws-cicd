import React from "react";

import ReusableList from "../ReusableList";
import { useState } from "react";
import { useEffect } from "react";
import { fetchTrainingPlanAsync } from "../../../../../redux/thunk/Subscription";
import { useDispatch, useSelector } from "react-redux";

function List() {
  const dispatch = useDispatch();

  const { training, trainingStatus } = useSelector(
    (state) => state.subscription
  );

  let [searchValue, setSearchValue] = useState("");
  let [page, setPage] = useState(1);
  let postPath = "subscription-training-list?page=" + page;
  let searchPath =
    "search-subscription-plan-by-name?page=" + page + "&plan=" + searchValue;
  const [isSearch, setIsSearch] = useState(false);
  
  useEffect(() => {
    if (searchValue !== "") {
      setIsSearch(true);
    } else {
      dispatch(fetchTrainingPlanAsync(postPath));
      setIsSearch(false);
    }
  }, [dispatch, postPath, page, searchValue, searchPath]);

  return (
    <ReusableList
      page={page}
      setPage={setPage}
      data={training}
      isSearch={isSearch}
      searchAPI={(path) => fetchTrainingPlanAsync(path)}
      searchPath={searchPath}
      setSearchValue={setSearchValue}
      status={trainingStatus}
      title="Training"
      type="training"
    ></ReusableList>
  );
}

export default List;
