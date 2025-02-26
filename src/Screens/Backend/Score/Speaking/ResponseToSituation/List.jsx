import React from "react";
import { useSelector } from "react-redux";
import { fetchScoreRtsPostsAsync } from "../../../../../redux/thunk/Posts";

import SpeakingScoreList from "../../../../../components/Backend/Admin/ScoreList/SpeakingScoreList";

function ResponseToSituation() {
  const { scoreRtsPosts, scoreRtsStatus } = useSelector((state) => state.posts);
  return (
    <>
      <SpeakingScoreList
        category="rts"
        title="Response to Situation"
        scorePosts={scoreRtsPosts}
        scoreStatus={scoreRtsStatus}
        fetchScoresAsync={fetchScoreRtsPostsAsync}
      />
    </>
  );
}

export default ResponseToSituation;
