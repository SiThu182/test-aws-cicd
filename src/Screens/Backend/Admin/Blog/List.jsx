import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReadOnlyQuill from "../../../../components/Backend/Admin/Posts/ReadOnlyQuill";
import TableForm from "../../../../components/Backend/TableForm/TableForm";
// import { FetchBlogAsync } from "../../../../redux/thunk/Course";
import { FetchBlogAsync } from "../../../../redux/thunk/Blog";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";
import useDebouncedApiCall from "../../../../customHooks/DebounceApi/useDebounceApi";

// import { fetchMtPostsAsync } from "../../../../redux/thunk/Posts";

function Course() {
  const { blogList, blogListStatus } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  let [searchValue, setSearchValue] = useState("");

  let postPath = "blogs?page=" + page;
  let searchPath = "search-blog-by-name?page=" + page + "&blog=" + searchValue;
  const { setDebouncedValue } = useDebouncedApiCall(
    (spath) => FetchBlogAsync({ path: spath }),
    1000
  );
  useEffect(() => {
    if (searchValue !== "") {
      setDebouncedValue(searchPath);
    } else {
      dispatch(FetchBlogAsync({ path: postPath }));
      setDebouncedValue(null);
    }
  }, [dispatch, postPath, page, searchValue, searchPath, setDebouncedValue]);

  let handleChange = (event, p) => {
    setPage(p);
  };
  var post_html_table = "";
  var paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "blogs";

  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "350px",
    maxWidth: "350px",
  };

  if (blogListStatus === "loading") {
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

  if (blogListStatus === "failed") {
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
    if (blogListStatus === "succeeded" && blogList.data !== undefined) {
      post_html_table = blogList.data.map((item, index) => {
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
            <TableCell sx={{ ...ellipsisStyle, width: "10%" }}>
              {item.title}
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
            >
              <ReadOnlyQuill
                delta={item.content}
                quillClass="read-only-quill"
              />
              {/* {item.content} */}
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "30%", textAlign: "center" }}
            >
              <img
                style={{ width: "100%", minHeight: "5rem", minWidth: "6rem" }}
                src={`${process.env.REACT_APP_BACKEND_URL}storage/blog/${item.image}`}
                alt=""
              />
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "30%", textAlign: "center" }}
            >
              {item?.video && (
                <video
                  style={{
                    width: "100%",
                    minHeight: "5rem",
                    minWidth: "8rem",
                  }}
                  controls
                  autoPlay={false}
                  src={`${process.env.REACT_APP_BACKEND_URL}storage/blog/${item.video}`}
                  alt="uploadVideo"
                />
              )}{" "}
              {item?.youtube_url && (
                <video
                  controls
                  autoPlay={false}
                  style={{ width: "10rem" }}
                  src={`${item.video}`}
                  alt="uploadVideo"
                />
              )}
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
          <Typography variant="h5">Blog</Typography>
        </Box>
        <TableForm
          tableSection="blog"
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
            count={blogList.last_page}
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
