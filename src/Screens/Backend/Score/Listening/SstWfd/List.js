import { Box, Pagination, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableForm from "../../../../../components/Backend/TableForm/TableForm";
import { fetchPostsAsync } from "../../../../../redux/thunk/Posts";
import ActionCellForList from "../../../../../components/Backend/ActionCellForList";
import TableListLoadingComponent from "../../../../../components/Backend/Admin/Posts/TableListLoadingComponent";
import TableListFailedComponent from "../../../../../components/Backend/Admin/Posts/TableListFailedComponent";

function MultipleChoice() {
  const { posts, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  let pagePath = "s-mul-choice?page=" + page;

  useEffect(() => {
    dispatch(fetchPostsAsync(pagePath));
  }, [dispatch, pagePath, page]);

  let handleChange = (event, p) => {
    setPage(p);
  };

  var post_html_table = "";
  var paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "s-mul-choice";

  if (status === "loading") {
    post_html_table = <TableListLoadingComponent />;
  }
  if (status === "failed") {
    post_html_table = <TableListFailedComponent />;
  } else {
    if (posts.data !== undefined) {
      post_html_table = posts.data.map((item) => {
        return (
          <TableRow
            id={item.id}
            key={item.id}
            sx={{
              borderBottom: 2,
              "& .MuiTableCell-root": {
                textAlign: "center",
              },

              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.post_title}</TableCell>
            <TableCell>{item.overall_point}</TableCell>
            <TableCell>
              {item.category === "mc"
                ? "Multiple Answers"
                : item.category === "smc"
                ? "Single Answer"
                : item.category === "hcs"
                ? "Highlight correct summary"
                : item.category === "smw"
                ? "Select Missing Word"
                : item.category === "hiw"
                ? "Highlight Incorrect Words"
                : item.category === "fib"
                ? "Fill In the Blank"
                : item.category === "wfd"
                ? "Write from Dictation"
                : item.category === "sst"
                ? "Summarize Spoken Text"
                : ""}
            </TableCell>
            <ActionCellForList table="score" url={backendURL} item={item} />
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
          <Typography variant="h5">Score Multiple Choice</Typography>
        </Box>
        <TableForm
          tableSection="mc"
          pagingHtml={paging_html}
          postHtmlTable={post_html_table}
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
            count={posts.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
}

export default MultipleChoice;
