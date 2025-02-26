import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRmcPostsAsync } from "../../../../../redux/thunk/Posts";
import ReusableList from "../../ReusableList";

function MCSingleAnswerReading() {
  const { rmcPosts, rmcStatus } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  let [page, setPage] = useState(1);

  let [searchValue, setSearchValue] = useState("");
  let [changeStatus, setChangeStatus] = useState(false);

  let postPath = "r-mul-choice?page=" + page;
  let searchPath =
    "search-post-by-name?page=" +
    page +
    "&q=" +
    searchValue?.name +
    "&category=" +
    searchValue?.category;
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (
      searchValue !== "" &&
      (searchValue?.category !== null || searchValue?.name !== null)
    ) {
      setIsSearch(true);
    } else {
      dispatch(fetchRmcPostsAsync(postPath));
       setIsSearch(false);
    }
    setChangeStatus(false);
  }, [dispatch, postPath, page, searchValue, searchPath, changeStatus]);

  let handleChange = (event, p) => {
    setPage(p);
  };

  function handleReload(status) {
    setChangeStatus(status);
  }

  return (
    <ReusableList
      title="Multiple Choices"
      status={rmcStatus}
      posts={rmcPosts}
      path="r-mul-choice"
      category="rmc,rsmc"
      mc="mc"
      isSearch={isSearch}
      searchAPI={(path) => fetchRmcPostsAsync(path)}
      searchPath={searchPath}
      handleChange={handleChange}
      page={page}
      setPage={setPage}
      setSearchValue={setSearchValue}
      handleReload={handleReload}
    ></ReusableList>
  );
}

export default MCSingleAnswerReading;
