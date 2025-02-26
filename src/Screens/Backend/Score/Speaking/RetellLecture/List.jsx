import React from "react";
import { useSelector } from "react-redux";
import { fetchScoreRlPostsAsync } from "../../../../../redux/thunk/Posts";

import SpeakingScoreList from "../../../../../components/Backend/Admin/ScoreList/SpeakingScoreList";

function RetellLecture() {
  const { scoreRlPosts, scoreRlStatus } = useSelector((state) => state.posts);
  return (
    <>
      <SpeakingScoreList
        category="rl"
        title="Retell Lecture"
        scorePosts={scoreRlPosts}
        scoreStatus={scoreRlStatus}
        fetchScoresAsync={fetchScoreRlPostsAsync}
      />
    </>
  );
}

export default RetellLecture;
