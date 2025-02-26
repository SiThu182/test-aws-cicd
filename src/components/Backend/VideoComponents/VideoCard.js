import { Avatar, Box, ButtonBase, Typography } from "@mui/material";
import React, { useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useNavigate } from "react-router-dom";
function VideoCard(props) {
  const { data } = props;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // const frontEndURL = process.env.REACT_APP_FRONTEND_URL;

  const handleError = (event) => {
    // Replace the source with the fallback image
    event.target.src =
      process.env.REACT_APP_FRONTEND_URL + "Image/Ismart_Academy_logo.png"; // Replace with your static image URL
  };
  function openVideo(url) {
    // Replace with your SharePoint video link
    console.log(url, "url");

    window.location.href = url; // Redirect to the video URL
  }
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "1rem",
        overflow: "hidden",
        m: 1,
        "&:hover": {
          boxShadow: 3,
          transition: "0.3s ease",
        },
      }}
    >
      <Box
        sx={{
          width: "17rem",
          height: "7rem",
          overflow: "hidden",
          position: "relative",
          // backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}storage/thumbnail/${data?.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          cursor: "pointer",
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Loading ...
            </Box>
          ) : (
            <img
              src={
                process.env.REACT_APP_BACKEND_URL + "storage/" + data.thumbnail
              }
              style={{ width: "100%", height: "100%" }}
              alt="video-thumbnail"
              onLoad={() => setLoading(false)}
            />
          )}
          <img
            src={
              process.env.REACT_APP_BACKEND_URL +
              "storage/video_recording/thumbnail/" +
              data.thumbnail
            }
            style={{ width: "100%", height: "100%" }}
            alt="video-thumbnail"
            onError={handleError} // Call handleError when the image fails to load
          />
        </Box>

        <ButtonBase
          sx={{
            color: "#2196f3",
            position: "absolute",
            top: "33%",
            left: "40%",
            borderRadius: "50%",
            "& :hover": {
              "&.MuiSvgIcon-root": {
                scale: "1.1",
                color: "white",
                boxShadow: 3,
              },
            },
          }}
        >
          <PlayCircleIcon
            sx={{ fontSize: "3rem", borderRadius: "50%" }}
            onClick={() => openVideo(data.video_link)}
          />
        </ButtonBase>
      </Box>

      <Box sx={{ display: "flex", p: 1 }}>
        <Box sx={{ width: "20%" }}>
          <Avatar
          // alt="Admin"
          // src={`${frontEndURL}Image/AigmaLogo.png`}
          // sx={{
          //   mx: "auto",
          //   width: 30,
          //   height: 30,
          // }}
          ></Avatar>
        </Box>
        <Box>
          <Typography>{data.name}</Typography>
          <Typography sx={{ fontSize: "0.9rem", color: "grey" }}>
            {new Date(data.created_at).toDateString()}
          </Typography>
        </Box>
      </Box>
      {/* <video
              width="300"
              controls
              // poster="https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg"
            >
              <source
                src="https://archive.org/download/ElephantsDream/ed_hd.mp4#t=0.2"
                type="video/mp4"
              />
              Sorry, your browser doesn't support embedded videos and watch it
              with your favorite video player!
            </video> */}
    </Box>
  );
}

export default VideoCard;
