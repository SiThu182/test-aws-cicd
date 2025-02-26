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
import { FetchBannerAsync } from "../../../../redux/thunk/Banner";

// import { fetchMtPostsAsync } from "../../../../redux/thunk/Posts";

function BannerList() {
  const { bannerList, bannerListStatus } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  let [searchValue, setSearchValue] = useState("");

  let postPath = "banners?page=" + page;
  let searchPath =
    "search-banners-by-name?page=" + page + "&banners=" + searchValue;
  const { setDebouncedValue } = useDebouncedApiCall(
    (spath) => FetchBannerAsync({ path: spath }),
    1000
  );
  useEffect(() => {
    if (searchValue !== "") {
      setDebouncedValue(searchPath);
    } else {
      dispatch(FetchBannerAsync({ path: postPath }));
      setDebouncedValue(null);
    }
  }, [dispatch, postPath, page, searchValue, searchPath, setDebouncedValue]);

  console.log(bannerList, "banner list");

  let handleChange = (event, p) => {
    setPage(p);
  };
  var post_html_table = "";
  var paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "banners";

  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "350px",
    maxWidth: "350px",
  };

  if (bannerListStatus === "loading") {
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

  if (bannerListStatus === "failed") {
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
    if (bannerListStatus === "succeeded" && bannerList?.data !== undefined) {
      post_html_table = bannerList?.data.map((item, index) => {
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
              {item.id}
            </TableCell>

            <TableCell
              sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
            >
              <img
                style={{ width: "100%", minHeight: "5rem", minWidth: "6rem" }}
                src={`${process.env.REACT_APP_BACKEND_URL}storage/${item.image_url}`}
                alt=""
              />
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "40%" }}>
              {item.platform}
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
          <Typography variant="h5">Banner</Typography>
        </Box>
        <TableForm
          tableSection="banner"
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
            count={bannerList?.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
}

export default BannerList;
