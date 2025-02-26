import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/Backend/PageTitle";
import VideoCard from "../../components/Backend/VideoComponents/VideoCard";
import { useDispatch, useSelector } from "react-redux";

import { fetchcActiveVideoRecordingListAsync } from "../../redux/thunk/VideoRecording";
const VideoRecording = (props) => {
  const { typeId } = props;
  const { activeVideoRecording, activeVideoRecordingStatus } = useSelector(
    (state) => state.videoRecording
  );
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);

  let postPath = "video-recording-list/" + typeId + "?page=" + page;
  useEffect(() => {
    dispatch(fetchcActiveVideoRecordingListAsync(postPath));
  }, [dispatch, postPath, page]);

  let handleChange = (event, p) => {
    setPage(p);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vw",

        padding: 0,
        margin: 0,
      }}
    >
      <PageTitle text={"Video Recording"}></PageTitle>
      {activeVideoRecordingStatus === "loading" && (
        <CircularProgress></CircularProgress>
      )}
      {activeVideoRecordingStatus === "failed" && (
        <Box>
          <Typography>Failed to load video</Typography>
        </Box>
      )}

      {activeVideoRecordingStatus === "succeeded" &&
        activeVideoRecording !== undefined &&
        activeVideoRecording.length !== 0 && (
          <Box sx={{ mt: "2rem" }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {activeVideoRecording?.data.map((v, index) => (
                <Box key={index}>
                  <VideoCard data={v} />
                </Box>
              ))}
            </Box>
            <Box>
              <Pagination
                size="large"
                count={activeVideoRecording.last_page}
                color="primary"
                page={page}
                onChange={handleChange}
              />
            </Box>
          </Box>
          // <Box>Coming soon...</Box>
        )}
    </Box>
  );
};

export default VideoRecording;
