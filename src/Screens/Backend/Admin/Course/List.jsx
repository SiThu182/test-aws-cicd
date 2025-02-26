import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TableForm from "../../../../components/Backend/TableForm/TableForm";
import { fetchCourseAsync } from "../../../../redux/thunk/Course";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";
import useDebouncedApiCall from "../../../../customHooks/DebounceApi/useDebounceApi";

// import { fetchMtPostsAsync } from "../../../../redux/thunk/Posts";

function Course() {
  const { status, course } = useSelector((state) => state.course);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [page, setPage] = useState(1);

  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "350px",
    maxWidth: "350px",
  };
  let [searchValue, setSearchValue] = useState("");
  let postPath = "courses?page=" + page;
  let searchPath =
    "search-course-by-name?page=" + page + "&course=" + searchValue;
  const { setDebouncedValue } = useDebouncedApiCall(
    (path) => fetchCourseAsync(path),
    1000
  );
  useEffect(() => {
    if (searchValue !== "") {
      setDebouncedValue(searchPath);
    } else {
      dispatch(fetchCourseAsync(postPath));
    }
  }, [dispatch, postPath, page, searchValue, searchPath, setDebouncedValue]);

  let handleChange = (event, p) => {
    setPage(p);
  };
  var post_html_table = "";
  var paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "courses";

  if (status === "loading") {
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

  if (status === "failed") {
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
    if (status === "succeeded" && course.data !== undefined) {
      post_html_table = course.data.map((item, index) => {
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
            <TableCell
              sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
            >
              {item.name}
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "40%", textAlign: "center" }}
            >
              {item.description}
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "40%", textAlign: "center" }}
            >
              {item.fees}
            </TableCell>
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
          <Typography variant="h5">Course</Typography>
        </Box>
        <TableForm
          tableSection="plan"
          plan="course"
          pagingHtml={paging_html}
          mc="mc"
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
            count={course.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
}

export default Course;
