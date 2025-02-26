import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchLfibPostsAsync } from "../../../../../redux/thunk/Posts";
import ReusableList from "../../ReusableList";

function FillInBlank() {
  const { lfibPosts, lfibStatus } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  let [page, setPage] = useState(1);
  let [changeStatus, setChangeStatus] = useState(false);

  let [searchValue, setSearchValue] = useState("");
  let postPath = "post-fib-hiw?page=" + page;
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
      dispatch(fetchLfibPostsAsync(postPath));
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
      title="FIB & HIW"
      status={lfibStatus}
      posts={lfibPosts}
      path="post-fib-hiw"
      category="fib,hiw"
      storage="mc"
      mc=""
      audio="audio"
      isSearch={isSearch}
      searchAPI={(path) => fetchLfibPostsAsync(path)}
      searchPath={searchPath}
      handleChange={handleChange}
      page={page}
      setPage={setPage}
      setSearchValue={setSearchValue}
      handleReload={handleReload}
    ></ReusableList>
  );
}

export default FillInBlank;
