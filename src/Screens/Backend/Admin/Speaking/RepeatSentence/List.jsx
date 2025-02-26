import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRsPostsAsync } from "../../../../../redux/thunk/Posts";
import ReusableList from "../../ReusableList";

function RepeatSentence() {
  const { rsPosts, rsStatus } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  let [searchValue, setSearchValue] = useState("");
  let [changeStatus, setChangeStatus] = useState(false);

  let postPath = "posts-rs?page=" + page;
  let searchPath =
    "search-post-by-name?page=" + page + "&q=" + searchValue + "&category=rs";
  const [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    if (searchValue !== "") {
      setIsSearch(true);
    } else {
      dispatch(fetchRsPostsAsync(postPath));
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
      title="Repeat Sentence"
      status={rsStatus}
      posts={rsPosts}
      path="posts-rs"
      category="rs"
      storage="rs"
      audio="audio"
      isSearch={isSearch}
      searchAPI={(path) => fetchRsPostsAsync(path)}
      searchPath={searchPath}
      handleChange={handleChange}
      page={page}
      setPage={setPage}
      setSearchValue={setSearchValue}
      handleReload={handleReload}
    ></ReusableList>
  );
}

export default RepeatSentence;
