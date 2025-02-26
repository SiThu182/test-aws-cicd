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

import TableForm from "../../../../../components/Backend/TableForm/TableForm";
// import { FetchBlogAsync } from "../../../../redux/thunk/Course";
import ActionCellForList from "../../../../../components/Backend/ActionCellForList";
import useDebouncedApiCall from "../../../../../customHooks/DebounceApi/useDebounceApi";
import { FetchEmailTempAsync } from "../../../../../redux/thunk/EmailTemplate";
import ReadOnlyQuill from "../../../../../components/Backend/Admin/Marketing/ReadOnlyQuill";
import swal from "sweetalert";
import axios from "axios";
import { getCookie } from "../../../../../Utils/GetCookies";

// import { fetchMtPostsAsync } from "../../../../redux/thunk/Posts";

function List() {
  const { emailTempList, emailTempListStatus } = useSelector(
    (state) => state.emailTemp
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  let [searchValue, setSearchValue] = useState("");

  let postPath = "email-template?page=" + page;
  let searchPath = "search-blog-by-name?page=" + page + "&blog=" + searchValue;
  const { setDebouncedValue } = useDebouncedApiCall(
    (spath) => FetchEmailTempAsync({ path: spath }),
    1000
  );
  useEffect(() => {
    if (searchValue !== "") {
      setDebouncedValue(searchPath);
    } else {
      dispatch(FetchEmailTempAsync({ path: postPath }));
      setDebouncedValue(null);
    }
  }, [dispatch, postPath, page, searchValue, searchPath, setDebouncedValue]);

  let handleChange = (event, p) => {
    setPage(p);
  };
  var post_html_table = "";
  var paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "email-template";

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

  function sentEmail(e, id) {
    e.stopPropagation();
    swal({
      title: "Are you sure?",
      text: "you will not be able to recover this action!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        sentEmailCustomer(id);
      } else {
        swal({ text: "Your record is safe!", timer: 1500 });
      }
    });
  }

  const sentEmailCustomer = async (id) => {
    const btn = document.getElementById(id);

    let token = getCookie("userToken");
    if (!token) navigate("/login");
    else {
      let config = { headers: { Authorization: "Bearer " + token } };
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/sent-marketing-email/${id}`,
        config
      );
      if (res.data.status) {
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

  if (emailTempListStatus === "loading") {
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

  if (emailTempListStatus === "failed") {
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
      emailTempListStatus === "succeeded" &&
      emailTempList.data !== undefined
    ) {
      post_html_table = emailTempList.data.map((item, index) => {
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
              {item.name} {index}
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "10%" }}>
              {item.subject}
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
            >
              <ReadOnlyQuill
                delta={item.body_text}
                quillClass="read-only-quill"
              />
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "30%", textAlign: "center" }}
            >
              <img
                style={{ width: "100%", minHeight: "5rem", minWidth: "6rem" }}
                src={`${process.env.REACT_APP_BACKEND_URL}storage/email_template/${item.img_header}`}
                alt=""
              />
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "30%", textAlign: "center" }}
            >
              <img
                style={{ width: "100%", minHeight: "5rem", minWidth: "6rem" }}
                src={`${process.env.REACT_APP_BACKEND_URL}storage/email_template/${item.img_footer}`}
                alt=""
              />
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "30%", textAlign: "center" }}
            >
              <Button
                sx={{ mr: 2 }}
                variant="contained"
                color="success"
                size="small"
                onClick={() => onPreview(item.id)}
              >
                Preview
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={(e) => sentEmail(e, item.id)}
              >
                Sent Email
              </Button>
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
          <Typography variant="h5">Email Template</Typography>
        </Box>
        <TableForm
          tableSection="email-template"
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
            count={emailTempList.last_page}
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
