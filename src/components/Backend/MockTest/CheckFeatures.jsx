import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import UAParser from "ua-parser-js";
import CancelIcon from "@mui/icons-material/Cancel";
const CheckFeatures = ({ show, setShow }) => {
  const [micPermission, setMicPermission] = useState(null);
  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    const parser = new UAParser();
    const browser = parser.getBrowser(); // Gets the browser name and version
    console.log(browser);

    setUserAgent(browser.name);
  }, []);

  useEffect(() => {
    // Check Cookies
    console.log("Cookies Enabled:", navigator.cookieEnabled);

    // Check Microphone Permission
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "microphone" })
        .then((result) => {
          setMicPermission(result.state);
          result.onchange = () => setMicPermission(result.state);
        })
        .catch((err) =>
          console.error("Error querying microphone permission:", err)
        );
    } else {
      console.log("Permissions API not supported in this browser");
    }
  }, []);

  return (
    <>
      {show && (
        <Box sx={{ background: "white", borderRadius: "1rem", p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Feature Detection in System</h1>
            <div>
              <CancelIcon onClick={() => setShow(false)} />
            </div>
          </Box>
          <p>Cookies Enabled: {navigator.cookieEnabled ? "Yes" : "No"}</p>
          <p>JavaScript Enabled: React is running, so JavaScript is enabled!</p>
          <p>Microphone Permission: {micPermission || "Checking..."}</p>
          <p>
            User Agent: {userAgent || "Checking..."}
            {userAgent !== "Chrome" &&
              "For best experience please use chrome browser on desktop."}
          </p>
        </Box>
      )}
    </>
  );
};

export default CheckFeatures;
