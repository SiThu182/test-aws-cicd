import React from "react";
import LogInCard from "../../components/Backend/LogInComponents/LogInCard";
function LogIn() {
   
  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID,"env");
  return (
    <>
      <LogInCard></LogInCard>
    </>
  );
}

export default LogIn;
