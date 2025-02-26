import React from "react";
import { useSelector } from "react-redux";
import { fetchScoreLmcPostsAsync } from "../../../../../redux/thunk/Posts";
import ReusableScoreList from "../../../../../components/Backend/Admin/ScoreList/ReusableScoreList";

function MultipleChoice() {
  const { scoreLmcPosts, scoreLmcStatus } = useSelector((state) => state.posts);

  return (
    <>
      <ReusableScoreList
        category="mc,smc,hcs,smw,wfd,sst,hic,fib,wfd"
        title="Score Listening"
        path="s-mul-choice?category=mc,smc,hcs,smw,wfd,sst,hic,fib,wfd&page="
        scorePosts={scoreLmcPosts}
        scoreStatus={scoreLmcStatus}
        fetchScoresAsync={fetchScoreLmcPostsAsync}
      />
    </>
  );
}

export default MultipleChoice;
