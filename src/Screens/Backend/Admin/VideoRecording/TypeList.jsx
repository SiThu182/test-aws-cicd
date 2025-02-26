import { Box, Pagination } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableForm from "../../../../components/Backend/TableForm/TableForm";
//
import { fetchcVideoRecordingTypeAsync } from "../../../../redux/thunk/VideoRecording";
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

const VideoRecordingTypeList = React.memo(() => {
  const {
    videoRecordingTypeList,
    videoRecordingTypeListStatus,
    // videoRecordingTypeListError,
  } = useSelector((state) => state.videoRecording);

  const dispatch = useDispatch();

  const [page1, setPage1] = useState(1);

  const [searchValue1, setSearchValue1] = useState("");

  let postPath1 = "video-recording-type?page=" + page1;

  let searchPath1 =
    "search-video-recording-type-by-name?page=" +
    page1 +
    "&type=" +
    searchValue1;
  const { debouncedValue, setDebouncedValue } = useDebouncedApiCall(
    (sPath) => fetchcVideoRecordingTypeAsync({ path: sPath }),
    1000
  );

  useEffect(() => {
    if (searchValue1 !== "") {
      setDebouncedValue(searchPath1);
    } else {
      dispatch(fetchcVideoRecordingTypeAsync({ path: postPath1 }));
      setDebouncedValue(null);
    }
  }, [
    dispatch,
    postPath1,
    page1,
    searchValue1,
    searchPath1,
    setDebouncedValue,
  ]);

  let handleChange1 = (event, p) => {
    setPage1(p);
  };

  let post_html_table_for_types = "";

  const backendURLforVideoRecordingTypeList =
    process.env.REACT_APP_BACKEND_ADMIN + "video-recording-type";

  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "350px",
    maxWidth: "350px",
  };

  // console.log(videoRecordingTypeList);

  if (videoRecordingTypeListStatus === "loading") {
    post_html_table_for_types = <TableListLoadingComponent />;
  }

  if (videoRecordingTypeListStatus === "failed") {
    post_html_table_for_types = <TableListFailedComponent />;
  } else {
    if (
      videoRecordingTypeListStatus === "succeeded" &&
      videoRecordingTypeList.data !== undefined
    ) {
      post_html_table_for_types = videoRecordingTypeList?.data.data.map(
        (item, index) => {
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
              <TableCell sx={{ ...ellipsisStyle, width: "50%" }}>
                {item.name}
              </TableCell>
              <ActionCellForList
                url={backendURLforVideoRecordingTypeList}
                item={item}
                to={"type/edit"}
              />
            </TableRow>
          );
        }
      );
    }
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <PageNavTitle text="Video Recording" />

        <TableListComponent
          table={post_html_table_for_types}
          tableSection={"videoRecordingType"}
          setPage={setPage1}
          setSearchValue={setSearchValue1}
          lastPage={videoRecordingTypeList.last_page}
          handleChange={handleChange1}
        />
      </Box>
    </>
  );
});

export default VideoRecordingTypeList;
