import React from "react";

import HomePage from "../../components/Frontend/Home";
import Layout from "../../components/Layout/Frontend/Layout";
import ServerDownTimer from "../../components/ServerDownTimerComponent/ServerDownTimer";
 

const Home = () => {
  const downtime = new Date("2024-12-30T12:00:00");
  return (
    <div>
      {/* <ServerDownTimer downtime={downtime} /> */}
      <Layout>
        <HomePage></HomePage>
      </Layout> 
      {/* <MaintainencePage/> */}
    </div>
  );
};

export default Home;
