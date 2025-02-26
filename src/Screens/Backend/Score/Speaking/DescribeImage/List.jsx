import React from "react";
import { useSelector } from "react-redux";
import { fetchScoreDiPostsAsync } from "../../../../../redux/thunk/Posts";
import SpeakingScoreList from "../../../../../components/Backend/Admin/ScoreList/SpeakingScoreList";

function DescribeImage() {
  const { scoreDiPosts, scoreDiStatus } = useSelector((state) => state.posts);

  return (
    <>
      <SpeakingScoreList
        category="di"
        title="Describe Image"
        scorePosts={scoreDiPosts}
        scoreStatus={scoreDiStatus}
        fetchScoresAsync={fetchScoreDiPostsAsync}
      />
    </>
  );
}

export default DescribeImage;
