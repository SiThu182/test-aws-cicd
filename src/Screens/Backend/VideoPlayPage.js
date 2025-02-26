import { ArrowBack } from "@mui/icons-material";
import CircleIcon from "@mui/icons-material/Circle";
import { Box, Typography } from "@mui/material";
import React from "react";
// import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import VideoPlayer from "../../components/Backend/VideoComponents/VideoPlayer";

function VideoPlayPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", height: "80vh" }}>
      <Box>
        <ArrowBack
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/user/video-recording")}
        />
      </Box>

      <Box>
        <VideoPlayer videoId={state.video.id} />
      </Box>
      <Box
        id="iframe-container"
        sx={{
          position: "relative",
          width: "90%",
          height: "90%",
          mx: "auto",
        }}
      >
        <iframe
          id="iframe"
          // src={
          // "https://smarteduglobe.sharepoint.com/sites/iSmartAcademy/_layouts/15/embed.aspx?UniqueId=57c9677f-72be-4507-816d-750489ed6d6b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create"
          // }
          style={{
            width: "100%",
            height: "100%",
          }}
          src={state.video.video_link}
          frameborder="0"
          // scrolling="no"
          allowfullscreen
          title="Meeting Recording.mp4"
        ></iframe>

        <Typography sx={{ display: "flex", alignItems: "center" }}>
          Admin
          <CircleIcon sx={{ fontSize: "1rem", color: "grey" }} />
          {state.video.name}{" "}
          <CircleIcon sx={{ fontSize: "1rem", color: "grey" }} />
          {new Date(state.video.created_at).toDateString()}
        </Typography>
      </Box>
      {/* <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url="https://smarteduglobe.sharepoint.com/sites/iSmartAcademy/_layouts/15/embed.aspx?UniqueId=57c9677f-72be-4507-816d-750489ed6d6b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create"
          allowfullscreen
          title="Oct 20-20221020_053916-Meeting Recording.mp4"
          width={650}
          height={259}
          config={{}}
        />
      </div> */}
    </Box>
  );
}

export default VideoPlayPage;
