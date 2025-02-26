import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Button, Pagination, Tooltip, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import TableForm from "../../../../components/Backend/TableForm/TableForm";
import { fetchAllUserAsync } from "../../../../redux/thunk/Users";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";
import TableListLoadingComponent from "../../../../components/Backend/Admin/Posts/TableListLoadingComponent";
import TableListFailedComponent from "../../../../components/Backend/Admin/Posts/TableListFailedComponent";
import useDebouncedApiCall from "../../../../customHooks/DebounceApi/useDebounceApi";

function UserList() {
  const { userList, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let [searchValue, setSearchValue] = useState("");
  let [page, setPage] = useState(1);
  let pagePath = "users?page=" + page;
  let searchPath = "search-user-by-name?page=" + page + "&user=" + searchValue;

  const { setDebouncedValue } = useDebouncedApiCall(
    (path) => fetchAllUserAsync(path),
    1000
  );

  const fetchApi = useCallback(() => {
    if (searchValue !== "") {
      setDebouncedValue(searchPath);
    } else {
      dispatch(fetchAllUserAsync(pagePath));
    }
  }, [dispatch, pagePath, searchValue, searchPath, setDebouncedValue]);

  useEffect(() => {
    fetchApi();
  }, [dispatch, pagePath, page, searchValue, searchPath, fetchApi]);

  let handleChange = (event, p) => {
    setPage(p);
  };

  var post_html_table = "";
  var paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  if (status === "loading") {
    post_html_table = <TableListLoadingComponent />;
  } else if (status === "failed") {
    post_html_table = <TableListFailedComponent />;
  } else if (status === "succeeded" && userList.data !== undefined) {
    post_html_table = userList.data.data.map((item) => {
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
          <TableCell>{item.id}</TableCell>

          <TableCell >
              {item.created_user?.name}   { (item.updated_id !== 'NULL' && item.updated_user) && `(${item.updated_user.name})` }

            </TableCell>
          
          <TableCell>
            {item.user_type === 3
              ? "Teacher"
              : item.user_type == 2
              ? "iSmart Student"
              : "Aigma User"}
          </TableCell>

          <TableCell>{item.trial_status == 1 ? "Yes" : "No"}</TableCell>

          <TableCell>{item.name}</TableCell>
          <TableCell>{item.email}</TableCell>
          <TableCell>
            {item.role_id === 1
              ? "Super Admin"
              : item.role_id === 3
              ? "Admin"
              : "User"}
          </TableCell>
          <TableCell>
            {" "}
            {item.inactive_days !== null && item.inactive_days > 62
              ? "Inactive days -" + item.inactive_days
              : new Date(item.created_at).toDateString()}
          </TableCell>
          <TableCell>{item.country}</TableCell>




          <TableCell>
            <Link to={`user-details/${item.id}`}>
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
                  <RemoveRedEyeIcon sx={{ color: "white" }}></RemoveRedEyeIcon>
                </Button>
              </Tooltip>
            </Link>
          </TableCell>
          <ActionCellForList
            editDisabled={item.id === 1 ? true : false}
            deleteDisabled={item.id === 1 ? true : false}
            url={`${backendURL}users`}
            item={item}
            deleteMessage={`This will delete all the records relating to this ${item.name} account with email of ${item.email}.`}
          />
        </TableRow>
      );
    });
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
          <Typography variant="h5">Student</Typography>
        </Box>

        <TableForm
          tableSection="student"
          pagingHtml={paging_html}
          postHtmlTable={post_html_table}
          setSearchValue={setSearchValue}
          setPage={setPage}
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
            count={userList?.data?.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
}

export default UserList;
