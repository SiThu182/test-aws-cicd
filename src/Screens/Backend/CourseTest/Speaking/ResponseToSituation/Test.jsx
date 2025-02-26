import React from "react";

import ReusableTest from "../ReusableComponent";

function Test() {
  return (
    <ReusableTest
      category="rts"
      path="get-test-post-rts"
      beginningCounterCount={20}
      playingCounterCount={5}
      recordingTotalCount={40}
    ></ReusableTest>
  );
}

export default Test;
