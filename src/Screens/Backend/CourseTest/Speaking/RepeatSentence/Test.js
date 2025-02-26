import React from "react";

import ReusableTest from "../ReusableComponent";

function Test() {
  return (
    <ReusableTest
      category="rs"
      path="get-test-post-rs"
      beginningCounterCount={1}
      playingCounterCount={3}
      recordingTotalCount={15}
    ></ReusableTest>
  );
}

export default Test;
