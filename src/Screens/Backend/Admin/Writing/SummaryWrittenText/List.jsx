import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWritingPostsAsync } from "../../../../../redux/thunk/Posts";
import ReusableList from "../../ReusableList";

function RetellLecture() {
  const { writingPosts, writingStatus } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  let [searchValue, setSearchValue] = useState({
    name: "",
    category: "swt,we,wemail",
  });
  let [changeStatus, setChangeStatus] = useState(false);

  let postPath = "posts-writing?page=" + page;
  let searchPath =
    "search-post-by-name?page=" +
    page +
    "&q=" +
    searchValue.name +
    "&category=" +
    searchValue.category;
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (searchValue.name !== "" || searchValue.category !== "swt,we,wemail") {
      setIsSearch(true);
    } else {
      dispatch(fetchWritingPostsAsync(postPath));
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
      title="Writing"
      status={writingStatus}
      posts={writingPosts}
      path="posts-writing"
      category="swt,we,wemail"
      isSearch={isSearch}
      searchAPI={(path) => fetchWritingPostsAsync(path)}
      searchPath={searchPath}
      handleChange={handleChange}
      page={page}
      setPage={setPage}
      setSearchValue={setSearchValue}
      handleReload={handleReload}
    ></ReusableList>
  );
}

export default RetellLecture;
