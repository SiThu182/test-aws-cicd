import { useSelector } from "react-redux";
import { fetchScoreRaPostsAsync } from "../../../../../redux/thunk/Posts";

import SpeakingScoreList from "../../../../../components/Backend/Admin/ScoreList/SpeakingScoreList";

function ReadAloud() {
  const { scoreRaPosts, scoreRaStatus } = useSelector((state) => state.posts);

  return (
    <>
      <SpeakingScoreList
        category="ra"
        title="Read Aloud"
        scorePosts={scoreRaPosts}
        scoreStatus={scoreRaStatus}
        fetchScoresAsync={fetchScoreRaPostsAsync}
      />
    </>
  );
}

export default ReadAloud;
