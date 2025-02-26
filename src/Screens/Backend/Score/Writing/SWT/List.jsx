import React from "react";
import { useSelector } from "react-redux";
import { fetchScoreWmcPostsAsync } from "../../../../../redux/thunk/Posts";
import ReusableScoreList from "../../../../../components/Backend/Admin/ScoreList/ReusableScoreList";

function SWT() {
  const { scoreWmcPosts, scoreWmcStatus } = useSelector((state) => state.posts);

  return (
    <>
      <ReusableScoreList
        category="we,swt,wemail"
        title="Score Writing"
        scorePosts={scoreWmcPosts}
        scoreStatus={scoreWmcStatus}
        fetchScoresAsync={fetchScoreWmcPostsAsync}
      />
    </>
  );
}

export default SWT;
