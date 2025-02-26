import React from "react";
import { useSelector } from "react-redux";

import { fetchScoreRsPostsAsync } from "../../../../../redux/thunk/Posts";
import SpeakingScoreList from "../../../../../components/Backend/Admin/ScoreList/SpeakingScoreList";

function RepeatSentence() {
  const { scoreRsPosts, scoreRsStatus } = useSelector((state) => state.posts);

  return (
    <>
      <SpeakingScoreList
        category="rs"
        title="Repeat Sentence"
        scorePosts={scoreRsPosts}
        scoreStatus={scoreRsStatus}
        fetchScoresAsync={fetchScoreRsPostsAsync}
      />
    </>
  );
}

export default RepeatSentence;
