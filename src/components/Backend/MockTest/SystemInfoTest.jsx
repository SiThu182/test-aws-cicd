import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import UAParser from "ua-parser-js";
import MicNoneIcon from "@mui/icons-material/MicNone";
import CookieIcon from "@mui/icons-material/Cookie";
import JavascriptIcon from "@mui/icons-material/Javascript";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import MicIcon from "@mui/icons-material/Mic";
import SdStorageIcon from "@mui/icons-material/SdStorage";
import { RecordRTCPromisesHandler } from "recordrtc";
import BackButton from "../BackButton";

function SystemInfoTest() {
  const [micPermission, setMicPermission] = useState(null);
  const [userAgent, setUserAgent] = useState("");
  const [memoryInfo, setMemoryInfo] = useState(null);
  let [recordingStatus, setRecordingStatus] = useState(false);
  let [recorder, setRecorder] = useState();
  let [blobUrl, setBlobUrl] = useState();
  let [finish, setFinish] = useState(false);
  useEffect(() => {
    async function checkAudioPermission() {
      try {
        let stream = await navigator.mediaDevices.getUserMedia(
          { audio: true },
          () => {
            console.log("get stream");
          },
          () => {
            alert("blocked");
          }
        );
        setRecorder(new RecordRTCPromisesHandler(stream, { type: "audio" }));
      } catch (error) {
        alert("Please enable your audio permission:", error);
      }
    }
    checkAudioPermission();
    navigator.permissions
      .query({ name: "microphone" })
      .then((permissionObj) => {
        if (permissionObj.state === "denied") {
          alert(
            "Please allow microphone access as we need to record the voice and make score calculation or you may face errors in recording"
          );
        }
      })
      .catch((error) => {
        console.log("Got error :", error);
      });
  }, []);
  const clickHandler = () => {
    if (recordingStatus) {
      setRecordingStatus(false);
      recorder.stopRecording();
      let blobUrlFunction = async () => {
        await recorder.stopRecording();

        let bLOB = await recorder.getBlob();

        const blobURL = URL.createObjectURL(bLOB);

        setBlobUrl(blobURL);
      };
      blobUrlFunction();
      setFinish(true);
    } else {
      setRecordingStatus(true);
      recorder.startRecording();
      setFinish(false);
    }
  };
  useEffect(() => {
    if ("memory" in performance) {
      const updateMemoryInfo = () => {
        setMemoryInfo({
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          usedJSHeapSize: performance.memory.usedJSHeapSize,
        });
      };

      updateMemoryInfo();
      const interval = setInterval(updateMemoryInfo, 5000); // Poll every 5 seconds

      return () => clearInterval(interval);
    } else {
      console.warn("Memory information is not supported in this browser.");
    }
  }, []);
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
  const deviceMemory = navigator.deviceMemory;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Box sx={{ background: "white", borderRadius: "1rem", p: 2, m: 5 }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            my: 3,
            justifyContent: "center",
          }}
        >
          <h1 style={{ textAlign: "center" }}>System Requirement Test</h1>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 10,
            flexDirection: {
              xs: "column",
              md: "row",
            },
            minHeight: "15rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "20rem",
              mx: "auto",
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: "2rem",
                width: "5rem",
                display: "flex",
                justifyContent: "center",
                boxShadow: 3,
                mb: 3,
                color: "white",
                background: "#199CE5",
                mx: "auto",
              }}
            >
              <CookieIcon />
            </Box>
            <p sx={{}}>
              Cookies Enabled: {navigator.cookieEnabled ? "Yes" : "No"}
            </p>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "20rem",
              mx: "auto",
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: "2rem",
                width: "5rem",
                display: "flex",
                justifyContent: "center",
                boxShadow: 3,
                color: "white",
                background: "#199CE5",
                mb: 3,
                mx: "auto",
              }}
            >
              <JavascriptIcon />
            </Box>
            <p sx={{ textAlign: "center" }}>
              JavaScript Enabled: JavaScript is enabled!
            </p>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "20rem",
              mx: "auto",
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: "2rem",
                width: "5rem",
                display: "flex",
                justifyContent: "center",
                boxShadow: 3,
                color: "white",
                background: "#199CE5",
                mb: 3,
                mx: "auto",
              }}
            >
              <TravelExploreIcon />
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <p sx={{ textAlign: "center" }}>
                Browser Agent: {userAgent || "Checking..."}
                <br />
                For best experience please use chrome browser on desktop.
              </p>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 10,
            flexDirection: {
              xs: "column",
              md: "row",
            },
            minHeight: "15rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "20rem",
              mx: "auto",
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: "2rem",
                width: "5rem",
                display: "flex",
                justifyContent: "center",
                boxShadow: 3,
                color: "white",
                background: "#199CE5",
                mb: 3,
                mx: "auto",
              }}
            >
              <MicIcon />
            </Box>
            <p sx={{}}>
              Microphone Permission: {micPermission || "Checking..."}
            </p>
          </Box>
          {memoryInfo?.jsHeapSizeLimit && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "20rem",
                mx: "auto",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: "2rem",
                  width: "5rem",
                  display: "flex",
                  justifyContent: "center",
                  boxShadow: 3,
                  mb: 3,
                  mx: "auto",
                  color: "white",
                  background: "#199CE5",
                }}
              >
                <SdStorageIcon />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <p>
                  Portion of memory limit used by JavaScript:
                  {memoryInfo?.jsHeapSizeLimit / 1024 / 1024} MB
                </p>
                <p>
                  Total allocated memory:{" "}
                  {memoryInfo?.totalJSHeapSize / 1024 / 1024} MB
                </p>
                <p>
                  Used Memory Size: {memoryInfo?.usedJSHeapSize / 1024 / 1024}{" "}
                  MB
                </p>
              </Box>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "20rem",
              mx: "auto",
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: "2rem",
                width: "5rem",
                display: "flex",
                justifyContent: "center",
                boxShadow: 3,
                mx: "auto",
                mb: 3,
                color: "white",
                background: "#199CE5",
              }}
            >
              <MicNoneIcon
                onClick={() => clickHandler()}
                sx={{
                  color: recordingStatus ? "red" : "white",
                  cursor: "pointer",
                }}
              />
            </Box>
            <p sx={{ textAlign: "center" }}>Test Mic</p>
            {finish && (
              <audio
                src={blobUrl}
                controls
                style={{
                  height: "1rem",
                  width: "100%",
                }}
              ></audio>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SystemInfoTest;
