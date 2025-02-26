import { Box, Button, Pagination, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import TableForm from "../../../../components/Backend/TableForm/TableForm";
import { fetchScoreMtPostsAsync } from "../../../../redux/thunk/Posts";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";
import TableListLoadingComponent from "../../../../components/Backend/Admin/Posts/TableListLoadingComponent";
import TableListFailedComponent from "../../../../components/Backend/Admin/Posts/TableListFailedComponent";
import { getCookie } from "../../../../Utils/GetCookies";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MockTestScoreList = () => {
  const { scoreMtPosts, scoreMtStatus } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  let postPath = "mt-score?page=" + page;
  let [searchValue, setSearchValue] = useState("");

  let searchPath =
    "search-mt-by-name?page=" + page + "&q=" + searchValue + "&filter_type=s";
  useEffect(() => {
    if (searchValue !== "") {
      dispatch(fetchScoreMtPostsAsync(searchPath));
    } else {
      dispatch(fetchScoreMtPostsAsync(postPath));
    }
  }, [dispatch, postPath, page, searchValue, searchPath]);

  let handleChange = (event, p) => {
    setPage(p);
  };

  var post_html_table = "";
  var paging_html = "";
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "mt-score";
  const backendURLForAudioDelete =
    process.env.REACT_APP_BACKEND_ADMIN + "mt-score-audio";
  function confirmDeletePost(e, id) {
    e.stopPropagation();

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record audio!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletePost(id, backendURLForAudioDelete);
      } else {
        swal({ text: "Your record is safe!", timer: 1500 });
      }
    });
  }

  const deletePost = async (id, url) => {
    const btn = document.getElementById(id);

    btn.innerText = "Deleting...";
    let token = getCookie("userToken");

    if (!token) navigate("/login");
    else {
      let config = { headers: { Authorization: "Bearer " + token } };
      const res = await axios.delete(`${url}/${id}`, config);
      if (res.data.status) {
        btn.innerText = "Delete";
        //
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          button: "OK!",
          timer: 1500,
        });
        btn.closest("tr").style.display = "none";
      }
    }
  };
  if (scoreMtStatus === "loading") {
    post_html_table = <TableListLoadingComponent />;
  }
  if (scoreMtStatus === "failed") {
    post_html_table = <TableListFailedComponent />;
  } else {
    if (scoreMtPosts.data !== undefined) {
      post_html_table = scoreMtPosts.data.map((item, index) => {
        return (
          <TableRow
            id={item.id}
            key={index}
            sx={{
              borderBottom: 2,
              "& .MuiTableCell-root": {
                textAlign: "center",
              },

              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell>{new Date(item?.created_at).toDateString()}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              {item.mt_type_id === 1
                ? "Full Mock Test"
                : item.mt_type_id === 2
                ? "Mini Mock Test"
                : item.mt_type_id === 3
                ? "Speaking Mock Test"
                : item.mt_type_id === 4
                ? "Reading Mock Test"
                : item.mt_type_id === 5
                ? "Listening Mock Test"
                : item.mt_type_id === 6
                ? "Writing Mock Test"
                : ""}
            </TableCell>
            <TableCell>{item.overall_point}</TableCell>
            <TableCell>
              {(item.mt_type_id == 3 || item.mt_type_id == 1) && (
                <Button
                  variant="contained"
                  onClick={(e) => confirmDeletePost(e, item.id)}
                >
                  Delete Audio
                </Button>
              )}
            </TableCell>
            <ActionCellForList
              to="detail"
              leftTooltip="Approve / Reject"
              url={backendURL}
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
        <Box
          sx={{
            ml: "2rem",
            top: "1rem",

            position: "absolute",
            overflow: "visible",
            zIndex: 1500,
          }}
        >
          <Typography variant="h5">Score Mock Test</Typography>
        </Box>
        <TableForm
          tableSection="scoremt"
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
            count={scoreMtPosts.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
};

export default MockTestScoreList;
