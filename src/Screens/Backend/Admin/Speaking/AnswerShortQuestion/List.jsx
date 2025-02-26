import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAsqPostsAsync } from "../../../../../redux/thunk/Posts";
import ReusableList from "../../ReusableList";

function RepeatSentence() {
  const { asqPosts, asqStatus } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  let [page, setPage] = useState(1);
  let [searchValue, setSearchValue] = useState("");
  let [changeStatus, setChangeStatus] = useState(false);

  let postPath = "posts-asq?page=" + page;
  let searchPath =
    "search-post-by-name?page=" + page + "&q=" + searchValue + "&category=asq";

  const [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    if (searchValue !== "") {
      setIsSearch(true);
    } else {
      dispatch(fetchAsqPostsAsync(postPath));
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
      title="Answer Short Question"
      status={asqStatus}
      posts={asqPosts}
      path="posts-asq"
      category="asq"
      storage="asq"
      audio="audio"
      isSearch={isSearch}
      searchAPI={(path) => fetchAsqPostsAsync(path)}
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
