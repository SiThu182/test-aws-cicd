import { Box, Pagination, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableForm from "../../../../components/Backend/TableForm/TableForm";
import { FetchMaterialTypesAsync } from "../../../../redux/thunk/MaterialDownload";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";
import TableListLoadingComponent from "../../../../components/Backend/Admin/Posts/TableListLoadingComponent";
import TableListFailedComponent from "../../../../components/Backend/Admin/Posts/TableListFailedComponent";
import useDebouncedApiCall from "../../../../customHooks/DebounceApi/useDebounceApi";

const MaterialDownloadTypeList = React.memo(() => {
  const { materialTypeList, materialTypeListStatus } = useSelector(
    (state) => state.material
  );
  const dispatch = useDispatch();
  // const [click, setClick] = useState(false);
  //   const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const [searchValue, setSearchValue] = useState("");

  const typePath = "material-types?page=" + page;

  const searchTypePath =
    "search-material-type-by-name?page=" +
    page +
    "&material_type=" +
    searchValue;
  const { setDebouncedValue } = useDebouncedApiCall(
    (sPath) => FetchMaterialTypesAsync({ path: sPath }),
    1000
  );

  useEffect(() => {
    if (searchValue !== "") {
      setDebouncedValue(searchTypePath);
    } else {
      dispatch(FetchMaterialTypesAsync({ path: typePath }));
    }
  }, [
    dispatch,
    typePath,
    page,
    searchValue,
    searchTypePath,
    setDebouncedValue,
  ]);

  let handleChange = (event, p) => {
    setPage(p);
  };

  useEffect(() => {});
  var post_html_table = "";
  var paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "material-types";

  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "350px",
    maxWidth: "350px",
  };

  if (materialTypeListStatus === "loading") {
    post_html_table = <TableListLoadingComponent />;
  }

  if (materialTypeListStatus === "failed") {
    post_html_table = <TableListFailedComponent />;
  } else {
    if (
      materialTypeListStatus === "succeeded" &&
      materialTypeList?.data !== undefined
    ) {
      post_html_table = materialTypeList?.data.map((item, index) => {
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

            <ActionCellForList
              url={backendURL}
              to={"type/edit"}
              deleteMessage={
                "If you are going to delete the type all records related to this " +
                item.name +
                " will be deleted .Please make sure to check before press Ok. "
              }
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
          <Typography variant="h5">Materials Type List</Typography>
        </Box>
        <TableForm
          tableSection="material type download"
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
            count={materialTypeList?.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
});

export default MaterialDownloadTypeList;
