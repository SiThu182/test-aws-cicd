import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRTSPostsAsync } from "../../../../../redux/thunk/Posts";
import ReusableList from "../../ReusableList";

function ResponseToSituation() {
  const { rtsPosts, rtsStatus } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  let [searchValue, setSearchValue] = useState("");
  let [changeStatus, setChangeStatus] = useState(false);

  let postPath = "posts-rts?page=" + page;
  let searchPath =
    "search-post-by-name?page=" + page + "&q=" + searchValue + "&category=rts";
  const [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    if (searchValue !== "") {
      setIsSearch(true);
    } else {
      dispatch(fetchRTSPostsAsync(postPath));
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
      title=" Response to Situation"
      status={rtsStatus}
      posts={rtsPosts}
      path="posts-rts"
      category="rts"
      storage="rts"
      audio="audio"
      isSearch={isSearch}
      searchAPI={(path) => fetchRTSPostsAsync(path)}
      searchPath={searchPath}
      handleChange={handleChange}
      page={page}
      setPage={setPage}
      setSearchValue={setSearchValue}
      handleReload={handleReload}
    ></ReusableList>
  );
}

export default ResponseToSituation;
