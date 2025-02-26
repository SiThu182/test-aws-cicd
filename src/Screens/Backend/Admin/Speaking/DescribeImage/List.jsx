import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDiPostsAsync } from "../../../../../redux/thunk/Posts";
import ReusableList from "../../ReusableList";

function DescribeImage() {
  const { diPosts, diStatus } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  let [changeStatus, setChangeStatus] = useState(false);

  let [searchValue, setSearchValue] = useState("");
  let postPath = "posts-di?page=" + page;
  let searchPath =
    "search-post-by-name?page=" + page + "&q=" + searchValue + "&category=di";
  const [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    if (searchValue !== "") {
      setIsSearch(true);
    } else {
      dispatch(fetchDiPostsAsync(postPath));
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
      title="Describe Image"
      status={diStatus}
      posts={diPosts}
      path="posts-di"
      category="di"
      storage="di"
      image="image"
      isSearch={isSearch}
      searchAPI={(path) => fetchDiPostsAsync(path)}
      searchPath={searchPath}
      handleChange={handleChange}
      page={page}
      setPage={setPage}
      setSearchValue={setSearchValue}
      handleReload={handleReload}
    ></ReusableList>
  );
}

export default DescribeImage;
