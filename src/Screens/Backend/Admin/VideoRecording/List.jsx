import { Box, Pagination } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableForm from "../../../../components/Backend/TableForm/TableForm";
//
import { fetchcVideoRecordingAsync } from "../../../../redux/thunk/VideoRecording";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";
import PageNavTitle from "../../../../components/Backend/PageTitle";
import TableListLoadingComponent from "../../../../components/Backend/Admin/Posts/TableListLoadingComponent";
import TableListFailedComponent from "../../../../components/Backend/Admin/Posts/TableListFailedComponent";
import useDebouncedApiCall from "../../../../customHooks/DebounceApi/useDebounceApi";

// import useVideoRecordingTypes from "../../../../customHooks/VideoRecordingType/useVideoRecordingType";

// import { fetchMtPostsAsync } from "../../../../redux/thunk/Posts";

const TableListComponent = React.memo((props) => {
  const {
    table,
    tableSection,
    setPage,
    setSearchValue,
    lastPage,
    handleChange,
    page,
  } = props;
  return (
    <>
      <TableForm
        tableSection={tableSection}
        postHtmlTable={table}
        setPage={setPage}
        setSearchValue={setSearchValue}
      ></TableForm>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          my: 2,
        }}
      >
        <Pagination
          size="large"
          count={lastPage}
          color="primary"
          page={page}
          onChange={handleChange}
        />
      </Box>
    </>
  );
});

const VideoRecording = React.memo(() => {
  const {
    videoRecording,
    videoRecordingStatus,
    // videoRecordingTypeListError,
  } = useSelector((state) => state.videoRecording);

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const [searchValue, setSearchValue] = useState("");

  let postPath = "video-recording?page=" + page;

  let searchPath =
    "search-video-recording-by-name?page=" + page + "&video=" + searchValue;

  const { setDebouncedValue } = useDebouncedApiCall(
    (searchPath) => fetchcVideoRecordingAsync({ path: searchPath }),
    1000
  );
  useEffect(() => {
    if (searchValue !== "") {
      setDebouncedValue(searchPath);
    } else {
      dispatch(fetchcVideoRecordingAsync({ path: postPath }));
      setDebouncedValue(null);
    }
  }, [dispatch, postPath, page, searchValue, searchPath, setDebouncedValue]);

  let handleChange = (event, p) => {
    setPage(p);
  };

  let post_html_table = "";

  const backendURLforVideoRecordingList =
    process.env.REACT_APP_BACKEND_ADMIN + "video-recording";

  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "350px",
    maxWidth: "350px",
  };

  if (videoRecordingStatus === "loading") {
    post_html_table = <TableListLoadingComponent />;
  }

  if (videoRecordingStatus === "failed") {
    post_html_table = <TableListFailedComponent />;
  } else {
    if (
      videoRecordingStatus === "succeeded" &&
      videoRecording.data !== undefined
    ) {
      post_html_table = videoRecording?.data.map((item, index) => {
        return (
          <TableRow
            id={item.id}
            key={index}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              height: "20%",
              overflow: "hidden",
            }}
            height={"60px"}
          >
            <TableCell sx={{ ...ellipsisStyle, width: "10%" }}>
              {item.name}
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "25%" }}>
              {item.video_link}
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "25%" }}>
              {item.type_name}
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "25%" }}>
              {item.isActive !== 0 ? "active" : "inactive"}
            </TableCell>
            <ActionCellForList
              url={backendURLforVideoRecordingList}
              item={item}
            />
          </TableRow>
        );
      });
    }
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <PageNavTitle text="Video Recording" />

        <TableListComponent
          table={post_html_table}
          setPage={setPage}
          tableSection={"videoRecording"}
          setSearchValue={setSearchValue}
          lastPage={videoRecording.last_page}
          handleChange={handleChange}
        />
      </Box>
    </>
  );
});

export default VideoRecording;
