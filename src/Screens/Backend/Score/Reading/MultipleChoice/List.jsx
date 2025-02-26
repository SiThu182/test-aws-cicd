import React from "react";
import { useSelector } from "react-redux";
import { fetchScoreRmcPostsAsync } from "../../../../../redux/thunk/Posts";
import ReusableScoreList from "../../../../../components/Backend/Admin/ScoreList/ReusableScoreList";

function ReadingMultipleChoice() {
  const { scoreRmcPosts, scoreRmcStatus } = useSelector((state) => state.posts);

  return (
    <>
      <ReusableScoreList
        category="rsmc,rmc,rop,rfib,rwfib"
        title="Score Reading"
        scorePosts={scoreRmcPosts}
        scoreStatus={scoreRmcStatus}
        fetchScoresAsync={fetchScoreRmcPostsAsync}
      />
    </>
  );
}

export default ReadingMultipleChoice;
