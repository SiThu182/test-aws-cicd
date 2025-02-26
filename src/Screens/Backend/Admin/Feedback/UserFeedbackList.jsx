import { Box, Button, Pagination, Tooltip, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableForm from "../../../../components/Backend/TableForm/TableForm";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { FetchFeedbacksAsync } from "../../../../redux/thunk/Feedback";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";
import TableListLoadingComponent from "../../../../components/Backend/Admin/Posts/TableListLoadingComponent";
import TableListFailedComponent from "../../../../components/Backend/Admin/Posts/TableListFailedComponent";
import useDebouncedApiCall from "../../../../customHooks/DebounceApi/useDebounceApi";
import { Link } from "react-router-dom";

function UserFeedbackList() {
  const { feedbackList, feedbackListStatus } = useSelector(
    (state) => state.feedback
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const postPath = "user-feedback-list?page=" + page;
  const { setDebouncedValue } = useDebouncedApiCall(
    (sPath) => FetchFeedbacksAsync({ path: sPath }),
    1000
  );

  const searchPath =
    "search-feedback-by-name?page=" + page + "&feedback=" + searchValue;
  useEffect(() => {
    if (searchValue !== "") {
      setDebouncedValue(searchPath);
    } else {
      dispatch(FetchFeedbacksAsync({ path: postPath }));
      setDebouncedValue(null);
    }
  }, [dispatch, postPath, page, searchValue, searchPath, setDebouncedValue]);

  let handleChange = (event, p) => {
    setPage(p);
  };

  useEffect(() => {});
  var post_html_table = "";
  var paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "student-feedbacks";

  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "350px",
    maxWidth: "350px",
  };

  if (feedbackListStatus === "loading") {
    post_html_table = <TableListLoadingComponent />;
  }

  if (feedbackListStatus === "failed") {
    post_html_table = <TableListFailedComponent />;
  } else {
    if (
      feedbackListStatus === "succeeded" &&
      feedbackList?.data !== undefined
    ) {
      post_html_table = feedbackList?.data.map((item, index) => {
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
            <TableCell sx={{ ...ellipsisStyle, width: "30%" }}>
              {item?.name}
            </TableCell>

            <TableCell sx={{ ...ellipsisStyle, width: "30%" }}>
              {item.type !== "Student Feedback" ? (
                <img
                  key={index}
                  src={
                    process.env.REACT_APP_BACKEND_URL + "storage/" + item.image
                  }
                  alt="feedback"
                  style={{ width: "5rem" }}
                />
              ) : (
                JSON.parse(item.image)?.map((i, index) => (
                  <img
                    key={index}
                    src={process.env.REACT_APP_BACKEND_URL + "storage/" + i}
                    alt="feedback"
                    style={{ width: "5rem" }}
                  />
                ))
              )}
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "30%" }}>
              <Link to={`detail/${item.id}`}>
                <Tooltip title="Detail Info">
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      mr: 3,
                      bgcolor: "#2196f3",
                      "&:hover": {
                        bgcolor: "white",
                        "& .MuiSvgIcon-root": {
                          color: "black",
                        },
                      },
                    }}
                  >
                    <RemoveRedEyeIcon
                      sx={{ color: "white" }}
                    ></RemoveRedEyeIcon>
                  </Button>
                </Tooltip>
              </Link>
            </TableCell>
            <ActionCellForList url={backendURL} editExist={false} item={item} />
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
          <Typography variant="h5">User Feedback List</Typography>
        </Box>
        <TableForm
          tableSection="user-feedback"
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
            count={feedbackList?.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
}

export default UserFeedbackList;
