import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
import React from "react";
import DuoIcon from "@mui/icons-material/Duo";

const VideoRecording = [
  [
    "Video Recording",
    "/admin/video-recording",
    <VideoSettingsIcon
      sx={{ fontSize: "2rem", ml: "0.3rem" }}
    ></VideoSettingsIcon>,
    <DuoIcon sx={{ fontSize: "2rem", ml: "0.3rem" }}></DuoIcon>,
    "/user/video-recording",
  ],
];

export default VideoRecording;
