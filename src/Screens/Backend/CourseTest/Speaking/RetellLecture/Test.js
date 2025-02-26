import React from "react";

import ReusableTest from "../ReusableComponent";

function Test() {
  return (
    <ReusableTest
      category="rl"
      path="get-test-post-rl"
      beginningCounterCount={10}
      playingCounterCount={5}
      recordingTotalCount={40}
    ></ReusableTest>
  );
}

export default Test;
