import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRfibPostsAsync } from "../../../../../redux/thunk/Posts";
import ReusableList from "../../ReusableList";

function RFIB() {
  const { rfibPosts, rfibStatus } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  let [page, setPage] = useState(1);

  let [searchValue, setSearchValue] = useState("");
  let [changeStatus, setChangeStatus] = useState(false);

  let postPath = "r-fib?page=" + page;
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
      dispatch(fetchRfibPostsAsync(postPath));
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
      title="FIB & RWFIB"
      status={rfibStatus}
      posts={rfibPosts}
      path="r-fib"
      category="rfib,rwfib"
      mc="mc"
      isSearch={isSearch}
      searchAPI={(path) => fetchRfibPostsAsync(path)}
      searchPath={searchPath}
      handleChange={handleChange}
      page={page}
      setPage={setPage}
      setSearchValue={setSearchValue}
      handleReload={handleReload}
    ></ReusableList>
  );
}

export default RFIB;
