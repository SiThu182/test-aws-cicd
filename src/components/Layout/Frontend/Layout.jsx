import React from "react";

import Footer from "../../Frontend/Footer/Footer";
import ResponsiveAppBar from "../../Frontend/NavBar/navbar";
import { Box } from "@mui/material";
// import ServerDownTimer from "../../ServerDownTimerComponent/ServerDownTimer";
 
function Layout(props) {
  const { bgColor = "" } = props;
  // const downtime = new Date("2025-01-12T12:00:00");

  return (
    <Box component={"main"}>
      {/* <ServerDownTimer downtime={downtime} /> */}

      <ResponsiveAppBar></ResponsiveAppBar>
      {props.children}
      <Footer bgColor={bgColor}></Footer>
    </Box>
  );
}

export default Layout;
