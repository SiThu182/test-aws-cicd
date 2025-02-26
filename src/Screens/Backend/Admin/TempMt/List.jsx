import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableForm from "../../../../components/Backend/TableForm/TableForm";
// import { FetchBlogAsync } from "../../../../redux/thunk/Course";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";
import useDebouncedApiCall from "../../../../customHooks/DebounceApi/useDebounceApi";
import { fetchTempMockTestListAsync } from "../../../../redux/thunk/MockTest";

// import { fetchMtPostsAsync } from "../../../../redux/thunk/Posts";

function TempMt() {
  const { tempMtList, tempMtListStatus } = useSelector(
    (state) => state.mockTest
  );
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  let [searchValue, setSearchValue] = useState("");

  let postPath = "temp-mt-api?page=" + page;
  let searchPath = "search-temp-mt-by-name?page=" + page + "&q=" + searchValue;
  const { setDebouncedValue } = useDebouncedApiCall(
    (spath) => fetchTempMockTestListAsync({ path: spath }),
    1000
  );
  useEffect(() => {
    if (searchValue !== "") {
      setDebouncedValue(searchPath);
    } else {
      dispatch(fetchTempMockTestListAsync({ path: postPath }));
      setDebouncedValue(null);
    }
  }, [dispatch, postPath, page, searchValue, searchPath, setDebouncedValue]);

  let handleChange = (event, p) => {
    setPage(p);
  };
  var post_html_table = "";
  var paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "temp-mt-api";

  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "350px",
    maxWidth: "350px",
  };


  if (tempMtListStatus === "loading") {
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

  if (tempMtListStatus === "failed") {
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
    if (tempMtListStatus === "succeeded" && tempMtList.data !== undefined) {
      post_html_table = tempMtList.data.map((item, index) => {
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
            <TableCell sx={{ ...ellipsisStyle, width: "20%" }}>
              {item.user?.name}
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "20%" }}>
              {item.mock_test?.name}
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "20%" }}>
              {item.mt_type_id === 1
                ? "Full Mock Test"
                : item.mt_type_id === 3
                ? "Speaking Mock Test"
                : item.mt_type_id === 4
                ? "Reading Mock Test"
                : item.mt_type_id === 5
                ? "Listening Mock Test"
                : "Writing Mock Test"}
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "10%" }}>
              {Math.floor(JSON.parse(item.save_progress)["time"] / 3600)}:
              {Math.floor(JSON.parse(item.save_progress)["time"] / 60) < 10
                ? "0" + Math.floor(JSON.parse(item.save_progress)["time"] / 60)
                : Math.floor(JSON.parse(item.save_progress)["time"] / 60) >= 60
                ? Math.floor(JSON.parse(item.save_progress)["time"] / 60 - 60) <
                  10
                  ? "0" +
                    Math.floor(JSON.parse(item.save_progress)["time"] / 60 - 60)
                  : Math.floor(JSON.parse(item.save_progress)["time"] / 60 - 60)
                : Math.floor(JSON.parse(item.save_progress)["time"] / 60)}
              :
              {JSON.parse(item.save_progress)["time"] % 60 < 10
                ? "0" + (JSON.parse(item.save_progress)["time"] % 60)
                : JSON.parse(item.save_progress)["time"] % 60}
            </TableCell>

            <TableCell sx={{ ...ellipsisStyle, width: "10%" }}>
              {JSON.parse(item.save_progress)["category"]}
            </TableCell>
            <ActionCellForList url={backendURL} item={item} editExist={false} />
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
          <Typography variant="h5">Save Progress Records</Typography>
        </Box>
        <TableForm
          tableSection="tempMt"
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
            count={tempMtList.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
}

export default TempMt;
