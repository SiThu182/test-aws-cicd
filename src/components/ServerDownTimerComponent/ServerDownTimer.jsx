import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Box } from "@mui/material";
 

const ServerDownTimer = ({ downtime }) => {
  const calculateCountdown = () => {
    const now = new Date();
    const downtimeDate = new Date(downtime);
    const timeDifference = downtimeDate.getTime() - now.getTime();

    return Math.max(Math.floor(timeDifference / 1000), 0);
  };

  const [countdown, setCountdown] = useState(calculateCountdown);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (totalSeconds) => {
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return  `  ${days} Days : ${hours} Hours :  ${minutes} Minutes : ${seconds} Seconds`;
  };

  return (
    <>
    <Box  sx={{ display: "flex" ,justifyContent:'center' ,fontSize: 20,color:'white',backgroundColor:'#0F3C22',py:3}}  >
      {/* <AlertTitle sx={{ fontSize: 18}}> */}
        {/* Maintenance warning {downtime.toDateString()}. Server will be down in */}
         Sale End At  
         {/* {downtime.toDateString()}. */}
 
        <span style={{ color: "#ee3333",marginLeft:"5px" }}> { formatTime(countdown)} .</span>
      {/* </AlertTitle> */}
    </Box>
    </>
  );
};

export default ServerDownTimer;
