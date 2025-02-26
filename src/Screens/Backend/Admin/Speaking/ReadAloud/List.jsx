import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRaPostsAsync } from "../../../../../redux/thunk/Posts";
import ReusableList from "../../ReusableList";

function ReadAloud() {
  const { raPosts, raStatus } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  let [searchValue, setSearchValue] = useState("");
  let [changeStatus, setChangeStatus] = useState(false);

  let postPath = "posts-ra?page=" + page;
  let searchPath =
    "search-post-by-name?page=" + page + "&q=" + searchValue + "&category=ra";

  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (searchValue !== "") {
      setIsSearch(true);
    } else {
      dispatch(fetchRaPostsAsync(postPath));
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
      title="Read Aloud"
      status={raStatus}
      posts={raPosts}
      path="posts-ra"
      category="ra"
      handleChange={handleChange}
      page={page}
      audio="audio"
      isSearch={isSearch}
      searchAPI={(path) => fetchRaPostsAsync(path)}
      searchPath={searchPath}
      setPage={setPage}
      setSearchValue={setSearchValue}
      handleReload={handleReload}
    ></ReusableList>
  );
}

export default ReadAloud;
