import React from "react";

import ReusableTest from "../ReusableComponent";

function Test() {
  return (
    <ReusableTest
      category="asq"
      path="get-test-post-asq"
      beginningCounterCount={1}
      playingCounterCount={3}
      recordingTotalCount={10}
    ></ReusableTest>
  );
}

export default Test;
