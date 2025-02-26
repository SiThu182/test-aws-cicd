import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import TableForm from "../../../../../components/Backend/TableForm/TableForm";
import { fetchPostsAsync } from "../../../../../redux/thunk/Posts";
import ActionCellForList from "../../../../../components/Backend/ActionCellForList";
import TableListLoadingComponent from "../../../../../components/Backend/Admin/Posts/TableListLoadingComponent";
import TableListFailedComponent from "../../../../../components/Backend/Admin/Posts/TableListFailedComponent";

function MCMultipleAnswer() {
  const { posts, status } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [page, setPage] = useState(1);

  let postPath = "posts-mc-ma?page=" + page;

  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "350px",
    maxWidth: "350px",
  };

  useEffect(() => {
    dispatch(fetchPostsAsync(postPath));
  }, [dispatch, postPath, page]);

  let handleChange = (event, p) => {
    setPage(p);
  };
  var post_html_table = "";
  var paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  if (status === "loading") {
    post_html_table = <TableListLoadingComponent />;
  }
  if (status === "loading") {
    post_html_table = <TableListFailedComponent />;
  }
  if (status === "failed") {
    post_html_table = (
      <tr>
        <td colSpan="12" height="60vh">
          <Typography
            variant="h5"
            textAlign="center"
            sx={{ py: "20vh", color: "red" }}
          >
            Fail to fetch data
          </Typography>
        </td>
      </tr>
    );
  } else {
    if (status === "succeeded" && posts.data !== undefined) {
      post_html_table = posts.data.map((item) => {
        return (
          <TableRow
            id={item.id}
            key={item.id}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              // backgroundColor: "#000",
              height: "20%",

              overflow: "hidden",
            }}
            height={"60px"}
          >
            <TableCell sx={{ ...ellipsisStyle, width: "20%" }}>
              {item.title}
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "60%" }}>
              {item.content}
            </TableCell>

            <TableCell sx={{ ...ellipsisStyle, width: "20%" }}>
              <ActionCellForList
                url={backendURL}
                item={item}
                deleteDisabled={item?.check_mt}
              />
            </TableCell>
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
          <Typography variant="h5">MC Multiple Answer</Typography>
        </Box>
        <TableForm
          tableSection="admin"
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

export default MCMultipleAnswer;
