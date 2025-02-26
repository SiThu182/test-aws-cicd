import styled from "@emotion/styled";

import {
  Box,
  Button,
  Pagination,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import TableForm from "../../../../components/Backend/TableForm/TableForm";
import { fetchMtPostsAsync } from "../../../../redux/thunk/Posts";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";
import TableListLoadingComponent from "../../../../components/Backend/Admin/Posts/TableListLoadingComponent";
import TableListFailedComponent from "../../../../components/Backend/Admin/Posts/TableListFailedComponent";
import useDebouncedApiCall from "../../../../customHooks/DebounceApi/useDebounceApi";
import { getCookie } from "../../../../Utils/GetCookies";
import { fetchSaveMockTestListAsync } from "../../../../redux/thunk/MockTest";

//for switch active inactive button
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
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
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

function MockTest() {
  const { mtPosts, mtStatus } = useSelector((state) => state.posts);

  const {
    saveMtList,
    saveMtListStatus,
    // listeningMockTestError,
  } = useSelector((state) => state.mockTest);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [page, setPage] = useState(1);
  const [saveMtListArray, setSaveMtListArray] = useState([]);
  const userId = localStorage.getItem("userId");
  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "350px",
    maxWidth: "350px",
  };
  const [searchValue, setSearchValue] = useState("");
  const [statusId, setStatusId] = useState();
  let postPath = "mocktest?page=" + page;
  let searchPath =
    "search-mt-by-name?page=" +
    page +
    "&q=" +
    searchValue.name +
    "&filter_type=p&mock_test_type=" +
    searchValue.status;
  const { setDebouncedValue } = useDebouncedApiCall(
    (path) => fetchMtPostsAsync(path),
    1000
  );
  const getItemsWithPrefix = (prefix) => {
    const keys = Object.keys(localStorage);

    //remove previous localstorage usage outside mock test
    const filteredKeys = keys.filter((key) => key.startsWith(prefix));
    const savefilteredKeys = keys.filter((key) =>
      key.startsWith(userId + prefix)
    );

    // const items = filteredKeys.reduce((result, key) => {
    //   result[key] = localStorage.getItem(key);
    //   return result;
    // }, {});

    // return items;

    filteredKeys.forEach((key) => {
      localStorage.removeItem(key);
    });
    savefilteredKeys.forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  const prefix = "save";
  getItemsWithPrefix(prefix);

  useEffect(() => {
    if (
      searchValue !== "" &&
      (searchValue?.name !== "" || searchValue?.status !== "")
    ) {
      setDebouncedValue(searchPath);
    } else {
      dispatch(fetchMtPostsAsync(postPath));
      setDebouncedValue(null);
    }
    dispatch(fetchSaveMockTestListAsync());
  }, [dispatch, postPath, page, searchValue, searchPath, setDebouncedValue]);

  useEffect(() => {
    if (saveMtListStatus === "succeeded") {
      setSaveMtListArray(saveMtList.map((s) => s.mt_id));
    }
  }, [saveMtList, saveMtListStatus]);

  let handleChange = (event, p) => {
    setPage(p);
  };
  var post_html_table = "";
  var paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  const statusHandler = (status, id) => {
    setStatusId(id);
    let requestStatus = status === 0 ? 1 : 0;
    let token = getCookie("userToken");
    if (!token) navigate("/login");
    let config = { headers: { Authorization: "Bearer " + token } };
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
              backendURL + "status-change-mt",
              {
                status: requestStatus,
                mt_id: id,
              },
              config
            )
            .then(() => {
              dispatch(fetchMtPostsAsync(postPath));
              swal({
                title: "Success Alert",
                text: "Status change success",
                icon: "success",
                buttons: true,
                dangerMode: true,
                timer: 1500,
              });
              setStatusId();
            })
            .catch((error) => {
              dispatch(fetchMtPostsAsync(postPath));
              swal({
                title: "Status change error?",
                text: error.message,
                icon: "warning",
                buttons: true,
                dangerMode: true,
              });
              setStatusId();
            });
        } catch (error) {
          dispatch(fetchMtPostsAsync(postPath));
          swal({
            title: "Error Alert",
            text: "Failed to change success",
            icon: "error",
            buttons: true,
            dangerMode: true,
          });
          setStatusId();
        }
      } else {
        dispatch(fetchMtPostsAsync(postPath));
        swal({
          text: "Your status is not changed",
          icon: "info",
          confirmButtonText: "Ok",
        });
        setStatusId();
      }
    });
  };

  const onClickHandler = (id, mtTypeId) => {
    let token = getCookie("userToken");
    let config = { headers: { Authorization: "Bearer " + token } };
    //check save progress and show alert box to pass resume 0 or 1 depending on user interaction
    if (saveMtListArray.includes(id)) {
      swal({
        title: "Notice",
        text: "You did not finish this test last time. Do you want to continue from your saved session?",
        icon: "info",
        confirmButtonText: "Yes",
        denyButtonText: "No",
        showDenyButton: true,

        dangerMode: true,
        buttons: {
          confirm: {
            text: "Continue",
            value: "ok",
            visible: true,
            color: "blue",
            closeModal: true,
          },
          retry: {
            text: "Restart",
            value: "cancel",
            visible: true,
            color: "red",
            className: "btn-danger",
            closeModal: true,
          },
        },
      }).then((ok) => {
        if (ok === "ok") {
          navigate("/mocktest/test/" + id + "/" + mtTypeId + "/1/" + 1);
        } else if (ok === "cancel") {
          try {
            axios
              .post(
                `${backendURL}temp-mt/delete-save-file`,
                {
                  mt_id: id,
                  mt_type_id: mtTypeId,
                  user_id: userId,
                },
                config
              )
              .then((res) => {
                if (res.data.status == 1) {
                  // swal({
                  //   title: "Success  Saving Progress",
                  //   text: "Your progress is saved successfully.",
                  //   icon: "info",
                  //   buttons: true,
                  // }).then(() => {
                  //   checkByAdmin === true
                  //     ? navigate("/admin/mocktestlist")
                  //     : navigate("/mocktest/tabs");
                  // });
                  localStorage.removeItem(userId + "saveMt" + id);
                  navigate("/mocktest/test/" + id + "/" + mtTypeId + "/0/" + 1);
                } else {
                  swal({
                    title: "Failed to delet Save Progress",
                    text: res?.data?.message,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  });
                }
              })
              .catch((error) => {
                swal({
                  title: "Failed to delet Save Progress",
                  text:
                    error.response?.data?.message ??
                    error + ". Please try again.",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                });
              });
          } catch (error) {
            swal({
              title: "Failed to delete Save Progress",
              text: "Please check your internet connection and try again .",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            });
          }
        } else {
          // User clicked outside the modal or pressed the Escape key

          swal.close();
        }
      });
    } else {
      navigate("/mocktest/test/" + id + "/" + mtTypeId + "/0/" + 1);
    }
  };

  if (mtStatus === "loading" || saveMtListStatus === "loading") {
    post_html_table = <TableListLoadingComponent />;
  }
  if (mtStatus === "failed" || saveMtListStatus === "failed") {
    post_html_table = <TableListFailedComponent />;
  } else {
    if (
      mtStatus === "succeeded" &&
      saveMtListStatus === "succeeded" &&
      mtPosts.data !== undefined
    ) {
      post_html_table = mtPosts.data.map((item, index) => {
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
             <TableCell
              sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
            >
              {item.created_user?.name}   { (item.updated_id !== 'NULL' && item.updated_user) && `(${item.updated_user.name})` }

            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
            >
              {item.name}
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
            >
              {item.mt_type_id === 0
                ? "2Hours"
                : item.mt_type_id === 1
                ? "full mock test"
                : item.mt_type_id === 2
                ? "Mini Mock Test"
                : item.mt_type_id === 3
                ? "Speaking"
                : item.mt_type_id === 4
                ? "Reading"
                : item.mt_type_id === 5
                ? "Listening"
                : "Writing"}
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "20%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                {statusId === item.id ? (
                  "Changing"
                ) : (
                  <>  
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
            <TableCell sx={{ width: "20%" }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Tooltip title="Check Mock Test">
                  <Button
                    variant="contained"
                    sx={{
                      "&:hover": {
                        bgcolor: "white",
                        "& .MuiSvgIcon-root": {
                          color: "black",
                        },
                      },
                    }}
                    onClick={() => onClickHandler(item.id, item.mt_type_id)}
                  >
                    <FactCheckIcon></FactCheckIcon>
                  </Button>
                </Tooltip>
              </Box>
            </TableCell>
            <ActionCellForList url={`${backendURL}mocktest`} item={item} />
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
          <Typography variant="h5">Mock Test </Typography>
        </Box>
        <TableForm
          tableSection="mocktest"
          pagingHtml={paging_html}
          mc="mc"
          filterTitle="Mock Test Type"
          filterOption={[
            { name: "Full Mock Test", value: 1 },
            { name: "Speaking  Mock Test", value: 3 },
            { name: "Reading Mock Test", value: 4 },
            { name: "Writing  Mock Test", value: 6 },
            { name: "Listening Mock Test", value: 5 },
          ]}
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
            count={mtPosts.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
}

export default MockTest;
