import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

function ReusableList({
  title,
  path,
  category,
  searchUrl,
  list,
  deleteURL,
  tableName,
  fetchAsync,
  postHtmlTable,
}) {
  const dispatch = useDispatch();

  let [page, setPage] = useState(1);
  let [searchValue, setSearchValue] = useState("");
  let postPath = path + page;
  let searchPath = searchUrl + page + "&q=" + searchValue + "&filter_type=p";
  useEffect(() => {
    if (searchValue !== "") {
      dispatch(fetchAsync({ path: postPath }));
    } else {
      dispatch(fetchAsync({ path: postPath }));
    }
  }, [dispatch, postPath, page, fetchAsync, searchValue, searchPath]);

  let handleChange = (event, p) => {
    setPage(p);
  };


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
          <Typography variant="h5">{title}</Typography>
        </Box>
        {postHtmlTable}
        {/* <TableForm
          tableSection={tableName}
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
            count={list.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box> */}
      </Box>
    </>
  );
}

export default ReusableList;
