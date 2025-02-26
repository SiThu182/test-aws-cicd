import { Box, Pagination, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TableForm from "../../../../components/Backend/TableForm/TableForm";
import { FetchMaterialsAsync } from "../../../../redux/thunk/MaterialDownload";

import StatusSwitch from "../../../../components/Backend/Admin/StatusSwitch";
import { statusHandler } from "../../../../components/Backend/Admin/StatusHandler";
import useMaterialTypes from "../../../../customHooks/MaterialTypes/materialTypes";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";
import TableListLoadingComponent from "../../../../components/Backend/Admin/Posts/TableListLoadingComponent";
import TableListFailedComponent from "../../../../components/Backend/Admin/Posts/TableListFailedComponent";

import useDebouncedApiCall from "../../../../customHooks/DebounceApi/useDebounceApi";

const MaterialDownloadList = React.memo(() => {
  const { materialList, materialListStatus } = useSelector(
    (state) => state.material
  );
  const dispatch = useDispatch();
  const materialTypes = useMaterialTypes();
  const [statusId, setStatusId] = useState();
  // const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [changeStatus, setChangeStatus] = useState(false);

  const postPath = "materials?page=" + page;

  const statusChangeURL =
    process.env.REACT_APP_BACKEND_ADMIN + "material-status-change";
  const searchPath =
    "search-material-by-name?page=" + page + "&material=" + searchValue;

  const { setDebouncedValue } = useDebouncedApiCall(
    (sPath) => FetchMaterialsAsync({ path: sPath }),
    1000
  );

  useEffect(() => {
    if (searchValue !== "") {
      setDebouncedValue(searchPath);
    } else {
      dispatch(FetchMaterialsAsync({ path: postPath }));
      setDebouncedValue(null);
    }
    setChangeStatus(false);
  }, [
    dispatch,
    postPath,
    page,
    searchValue,
    searchPath,
    changeStatus,
    setDebouncedValue,
  ]);

  let clickStatus = (id, isActive) => {
    statusHandler(
      isActive,
      id,
      setStatusId,
      navigate,
      statusChangeURL,
      handleReload
    );
  };

  let handleChange = (event, p) => {
    setPage(p);
  };
  function handleReload(status) {
    setChangeStatus(status);
  }

  useEffect(() => {});
  var post_html_table = "";
  var paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "materials";

  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "350px",
    maxWidth: "350px",
  };

  if (materialListStatus === "loading") {
    post_html_table = <TableListLoadingComponent />;
  }

  if (materialListStatus === "failed") {
    post_html_table = <TableListFailedComponent />;
  } else {
    if (
      materialListStatus === "succeeded" &&
      materialList?.data !== undefined
    ) {
      post_html_table = materialList?.data.map((item, index) => {
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
              {materialTypes?.types !== null
                ? materialTypes.types.map((t) =>
                    t.id === item.material_type_id ? t.name : ""
                  )
                : item.material_type_id}
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
            >
              {item.target_user_type !== null ? item.target_user_type : "-"}
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "20%" }}>
              {item.url}
            </TableCell>
            <TableCell sx={{ ...ellipsisStyle, width: "20%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                {statusId === item.isActive ? (
                  "Changing"
                ) : (
                  <>
                    <Typography>Inactive</Typography>
                    <StatusSwitch
                      checked={item.isActive === 0 ? false : true}
                      onClickFunction={clickStatus}
                      id={item.id}
                      isActive={item.isActive}
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
          <Typography variant="h5">Materials Download List</Typography>
        </Box>
        <TableForm
          tableSection="material download"
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
            count={materialList?.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
});

export default MaterialDownloadList;
