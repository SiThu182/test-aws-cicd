import React from "react";
import { useSelector } from "react-redux";
import { fetchScoreAsqPostsAsync } from "../../../../../redux/thunk/Posts";

import SpeakingScoreList from "../../../../../components/Backend/Admin/ScoreList/SpeakingScoreList";

function AnswerShortQuestion() {
  const { scoreAsqPosts, scoreAsqStatus } = useSelector((state) => state.posts);

  return (
    <>
      <SpeakingScoreList
        category="asq"
        title="Answer Short Question"
        scorePosts={scoreAsqPosts}
        scoreStatus={scoreAsqStatus}
        fetchScoresAsync={fetchScoreAsqPostsAsync}
      />
    </>
  );
}

export default AnswerShortQuestion;
