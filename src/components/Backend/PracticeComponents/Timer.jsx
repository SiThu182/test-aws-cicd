import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Timer = ({
  status,
  postReady,
  count,
  stopCount,
  resetCount,
  setResetCount,
  
}) => {
  const [timerCounterCount, setTimerCounterCount] = useState(count);
  useEffect(() => {
    let beginInterval = () => {
      if (
        timerCounterCount !== 0 &&
        !stopCount &&
        !resetCount &&
        status === "succeeded" &&
        postReady
      ) {
        const interval = setInterval(() => {
          setTimerCounterCount((prev) => prev - 1);
        }, 1000);
        return interval;
      }
    };
    let interval = beginInterval();
    return () => clearInterval(interval);
  }, [timerCounterCount, status, postReady, stopCount, resetCount]);

  useEffect(() => {
    if (resetCount) {
      setTimerCounterCount(count);
      setResetCount(false);
    }
  }, [resetCount, count, setResetCount]);
  return (
    <div>
      <Box>
        <Typography>
          Duration{" "}
          {Math.floor(timerCounterCount / 60) < 10
            ? "0" + Math.floor(timerCounterCount / 60)
            : Math.floor(timerCounterCount / 60)}{" "}
          :
          {timerCounterCount % 60 < 10
            ? "0" + Math.floor(timerCounterCount % 60)
            : Math.floor(timerCounterCount % 60)}
        </Typography>
      </Box>
    </div>
  );
};

export default Timer;
