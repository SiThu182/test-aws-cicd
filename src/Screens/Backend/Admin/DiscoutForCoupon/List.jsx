import {
  Box,
  CircularProgress,
  Switch,
  Pagination,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import TableForm from "../../../../components/Backend/TableForm/TableForm";
// import { FetchBlogAsync } from "../../../../redux/thunk/Course";
import styled from "@emotion/styled";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";
import useDebouncedApiCall from "../../../../customHooks/DebounceApi/useDebounceApi";
import { FetchBannerAsync } from "../../../../redux/thunk/Banner";
import axios from "axios";
import { getCookie } from "../../../../Utils/GetCookies";
import { useNavigate } from "react-router-dom";

// import { fetchMtPostsAsync } from "../../../../redux/thunk/Posts";

function DiscountList() {
  const { bannerList, bannerListStatus } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  let [changeStatus, setChangeStatus] = useState(false);
  const navigate = useNavigate();
  let [searchValue, setSearchValue] = useState("");
  const [statusId, setStatusId] = useState();
  let postPath = "coupon-percents?page=" + page;
  let searchPath =
    "search-coupon-percents-by-name?page=" + page + "&banners=" + searchValue;
  const { setDebouncedValue } = useDebouncedApiCall(
    (spath) => FetchBannerAsync({ path: spath }),
    1000
  );
  function handleReload(status) {
    setChangeStatus(status);
  }

  let token = getCookie("userToken");
  useEffect(() => {
    if (searchValue !== "") {
      setDebouncedValue(searchPath);
    } else {
      dispatch(FetchBannerAsync({ path: postPath }));
      setDebouncedValue(null);
    }
    setChangeStatus(false);
  }, [
    dispatch,
    postPath,
    page,
    changeStatus,
    searchValue,
    searchPath,
    setDebouncedValue,
  ]);

  console.log(bannerList, "banner list");

  let handleChange = (event, p) => {
    setPage(p);
  };
  let config = { headers: { Authorization: "Bearer " + token } };
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  const statusHandler = (status, id) => {
    setStatusId(id);
    let requestStatus = status === 0 ? 1 : 0;
    if (!token) navigate("/login");

    swal({
      title: "Are you sure?",
      text: "Are you sure you want to change the status",
      icon: "warning",
      buttons: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      showDenyButton: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        try {
          axios
            .post(
              process.env.REACT_APP_BACKEND_ADMIN + "status-change-discount",
              {
                status: requestStatus,
                id: id,
              },
              config
            )
            .then(() => {
              // dispatch(fetchMtPostsAsync(postPath));
              swal({
                title: "Success Alert",
                text: "Status change success",
                icon: "success",
                // buttons: true,
                // dangerMode: true,
                timer: 2000,
              });
              setStatusId();
              handleReload(true);
              // window.location.reload(false)
            })
            .catch((error) => {
              // dispatch(fetchMtPostsAsync(postPath));
              swal({
                title: "Status change error?",
                text: error.message,
                icon: "warning",
                buttons: true,
                dangerMode: true,
              });
              setStatusId();
              // window.location.reload(false);
            });
        } catch (error) {
          // dispatch(fetchMtPostsAsync(postPath));
          swal({
            title: "Error Alert",
            text: "Failed to change success",
            icon: "error",
            buttons: true,
            dangerMode: true,
          });
          setStatusId();
          // window.location.reload(false);
        }
      } else {
        // dispatch(fetchMtPostsAsync(postPath));
        swal({
          text: "Your status is not changed",
          icon: "info",
          confirmButtonText: "Ok",
        });
        setStatusId();
        // window.location.reload(false );
      }
    });
  };

  var post_html_table = "";
  var paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "coupon-percents";

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
              {item.name}
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "10%" }}>
              {item.percentage}%
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "10%" }}>
              {item.number_of_days}
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                {statusId === item.status ? (
                  "Changing"
                ) : (
                  <>
                    {" "}
                    <Typography>Inactive</Typography>
                    <AntSwitch
                      checked={item.status === 0 ? false : true}
                      onClick={() => statusHandler(item.status, item.id)}
                      inputProps={{ "aria-label": "ant design" }}
                    />
                    <Typography>Active</Typography>
                  </>
                )}
              </Box>
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
          <Typography variant="h5">Discount </Typography>
        </Box>
        <TableForm
          tableSection="discount"
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

export default DiscountList;
