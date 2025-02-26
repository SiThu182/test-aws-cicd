import { Box, Pagination } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableForm from "../../../../components/Backend/TableForm/TableForm";
//
import {
  fetchcVideoRecordingAsync,
  fetchcVideoRecordingTypeAsync,
} from "../../../../redux/thunk/VideoRecording";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";
import PageNavTitle from "../../../../components/Backend/PageTitle";
import ReusableTabs from "../../../../components/Backend/Admin/ReusableTabs";
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

function VideoRecording() {
  const {
    videoRecording,
    videoRecordingStatus,
    videoRecordingTypeList,
    videoRecordingTypeListStatus,
    // videoRecordingTypeListError,
  } = useSelector((state) => state.videoRecording);

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [page1, setPage1] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchValue1, setSearchValue1] = useState("");
  const [currentTab, setCurrentTab] = useState();

  let postPath = "video-recording?page=" + page;
  let postPath1 = "video-recording-type?page=" + page1;
  let searchPath =
    "search-video-recording-by-name?page=" + page + "&video=" + searchValue;
  let searchPath1 =
    "search-video-recording-type-by-name?page=" +
    page +
    "&type=" +
    searchValue1;
  let searchAPI = useCallback(
    (path) => {
      if (currentTab === 0) {
        return fetchcVideoRecordingAsync(path);
      } else {
        return fetchcVideoRecordingTypeAsync(path);
      }
    },
    [currentTab]
  );

  const { setDebouncedValue } = useDebouncedApiCall(
    (path) => searchAPI(path),
    1000
  );

  useEffect(() => {
    if (searchValue !== "") {
      // setDebouncedValue(searchPath);
    } else {
      dispatch(fetchcVideoRecordingAsync({ path: postPath }));
      setDebouncedValue(null);
    }
  }, [dispatch, postPath, page, searchValue, searchPath, setDebouncedValue]);

  useEffect(() => {
    if (searchValue1 !== "") {
      // setDebouncedValue(searchPath1);
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

  let handleChange = (event, p) => {
    setPage(p);
  };

  let handleChange1 = (event, p) => {
    setPage1(p);
  };

  var post_html_table = "";
  var post_html_table_for_types = "";

  const backendURLforVideoRecordingList =
    process.env.REACT_APP_BACKEND_ADMIN + "video-recording";
  const backendURLforVideoRecordingTypeList =
    process.env.REACT_APP_BACKEND_ADMIN + "video-recording-type";

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

        <ReusableTabs
          setCurrentTab={setCurrentTab}
          labelArray={["Video Recording", "Recording Type"]}
          componentArray={[
            () => (
              <>
                <TableListComponent
                  table={post_html_table}
                  setPage={setPage}
                  tableSection={"videoRecording"}
                  setSearchValue={setSearchValue}
                  lastPage={videoRecording.last_page}
                  handleChange={handleChange}
                />
              </>
            ),
            () => (
              <>
                <TableListComponent
                  table={post_html_table_for_types}
                  tableSection={"videoRecordingType"}
                  setPage={setPage1}
                  setSearchValue={setSearchValue1}
                  lastPage={videoRecordingTypeList.last_page}
                  handleChange={handleChange1}
                />
              </>
            ),
          ]}
        />
      </Box>
    </>
  );
}

export default VideoRecording;
