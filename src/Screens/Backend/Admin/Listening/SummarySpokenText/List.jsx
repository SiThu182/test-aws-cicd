import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchLwritingPostsAsync } from "../../../../../redux/thunk/Posts";
import ReusableList from "../../ReusableList";

function RetellLecture() {
  const { lwritingPosts, lwritingStatus } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  let [page, setPage] = useState(1);

  // let [searchValue, setSearchValue] = useState("");
  let [searchValue, setSearchValue] = useState("");
  let [changeStatus, setChangeStatus] = useState(false);

  let postPath = "post-sst-wfd?page=" + page;
  let searchPath =
    "search-post-by-name?page=" +
    page +
    "&q=" +
    searchValue?.name +
    "&category=" +
    searchValue?.category;
  // "&category=rmc,rsmc";
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (
      searchValue !== "" &&
      (searchValue?.category !== null || searchValue?.name !== null)
    ) {
      setIsSearch(true);
    } else {
      dispatch(fetchLwritingPostsAsync(postPath));
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
      title="SST & WFD"
      status={lwritingStatus}
      posts={lwritingPosts}
      path="post-sst-wfd"
      category="sst,wfd"
      storage="mc"
      mc=""
      audio="audio"
      isSearch={isSearch}
      searchAPI={(path) => fetchLwritingPostsAsync(path)}
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
