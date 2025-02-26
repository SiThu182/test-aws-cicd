import {
  Box,
  CircularProgress,
  Pagination,
  Typography,
  Button,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useDebouncedApiCall from "../../../../customHooks/DebounceApi/useDebounceApi";
import { FetchRecordingCourseAsync } from "../../../../redux/thunk/RecordingCourse";
 
import swal from "sweetalert";
import axios from "axios";
 import ReadOnlyQuill from "../../../../components/Backend/Admin/Marketing/ReadOnlyQuill";
import { getCookie } from "../../../../Utils/GetCookies";
import TableForm from "../../../../components/Backend/TableForm/TableForm";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";

// import { fetchMtPostsAsync } from "../../../redux/thunk/Posts";

function List() {
  const { recordingCourseList,recordingCourseListStatus } = useSelector(
    (state) => state.recordingCourse
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  let [searchValue, setSearchValue] = useState("");

  let postPath = "recording-course?page=" + page;
  let searchPath = "search-rc-by-name?page=" + page + "&blog=" + searchValue;
  const { setDebouncedValue } = useDebouncedApiCall(
    (spath) => FetchRecordingCourseAsync({ path: spath }),
    1000
  );
  useEffect(() => {
    if (searchValue !== "") {
      setDebouncedValue(searchPath);
    } else {
      dispatch(FetchRecordingCourseAsync({ path: postPath }));
      setDebouncedValue(null);
    }
  }, [dispatch, postPath, page, searchValue, searchPath, setDebouncedValue]);

  let handleChange = (event, p) => {
    setPage(p);
  };
  var post_html_table = "";
  var paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "recording-course  ";

  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "350px",
    maxWidth: "350px",
  };

  const onPreview = (id) => {
    const linkUrl = `${process.env.REACT_APP_BACKEND_URL}admin/preview-email/${id}`;

    // Open the link in a new tab or window
    window.open(linkUrl, "_blank");
  };

   

   

  if (recordingCourseListStatus === "loading") {
    post_html_table = (
      <TableRow>
        <TableCell colSpan="12">
          <Box
            sx={{
              textAlign: "center",
              width: "100%",
              height: "60vh",
              py: "20vh",
            }}
          >
            <CircularProgress />
          </Box>
        </TableCell>
      </TableRow>
    );
  }

  if (recordingCourseListStatus === "failed") {
    post_html_table = (
      <TableRow>
        <TableCell colSpan="12" height="60vh">
          <Typography
            variant="h5"
            textAlign="center"
            sx={{ py: "20vh", color: "red" }}
          >
            Fail to fetch data
          </Typography>
        </TableCell>
      </TableRow>
    );
  } else {
    if (
      recordingCourseListStatus === "succeeded" &&
      recordingCourseList.data !== undefined
    ) {
      post_html_table = recordingCourseList.data.map((item, index) => {
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
              {item.title} 
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "10%" }}>
              {item.fees}
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "10%" }}>
              <Typography>aaa</Typography>
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
            >
              <ReadOnlyQuill
                delta={item.description}
                quillClass="read-only-quill"
              />
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
            >
              <ReadOnlyQuill
                delta={item.requirement}
                quillClass="read-only-quill"
              />
            </TableCell>
            {/* <TableCell
              sx={{ ...ellipsisStyle, width: "30%", textAlign: "center" }}
            >
              <img
                style={{ width: "100%", minHeight: "5rem", minWidth: "6rem" }}
                src={`${process.env.REACT_APP_BACKEND_URL}storage/email_template/${item.img_header}`}
                alt=""
              />
            </TableCell> */}
            
            
            <ActionCellForList url={backendURL} item={item} />
          </TableRow>
        );
      });
    }
  }
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            ml: "2rem",
            top: "1rem",
            position: "absolute",
            overflow: "visible",
            zIndex: 1500,
          }}
        >
          <Typography variant="h5">Recording Class</Typography>
        </Box>
        <TableForm
          tableSection="recording-course"
          pagingHtml={paging_html}
          postHtmlTable={post_html_table}
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
            count={recordingCourseList.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
}

export default List;
