import React from "react";
import ReusableList from "../../ReusableList";
import { fetchLmcPostsAsync } from "../../../../../redux/thunk/Posts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
function List() {
  const { lmcPosts, lmcStatus } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  let [page, setPage] = useState(1);

  let [searchValue, setSearchValue] = useState("");
  let [changeStatus, setChangeStatus] = useState(false);

  let postPath = "l-mul-choice?page=" + page;

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
      dispatch(fetchLmcPostsAsync(postPath));
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
      status={lmcStatus}
      posts={lmcPosts}
      path="l-mul-choice"
      category="mc,smc,hcs,smw"
      storage="mc"
      mc="mc"
      audio="audio"
      isSearch={isSearch}
      searchAPI={(path) => fetchLmcPostsAsync(path)}
      searchPath={searchPath}
      handleChange={handleChange}
      page={page}
      setPage={setPage}
      setSearchValue={setSearchValue}
      handleReload={handleReload}
    ></ReusableList>
  );
}

export default List;
