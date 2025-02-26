import { Box, Pagination, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import React, { useEffect } from "react";

import TableForm from "../../../../components/Backend/TableForm/TableForm";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";
import TableListLoadingComponent from "../../../../components/Backend/Admin/Posts/TableListLoadingComponent";
import TableListFailedComponent from "../../../../components/Backend/Admin/Posts/TableListFailedComponent";
import useDebouncedApiCall from "../../../../customHooks/DebounceApi/useDebounceApi";

function ReusableList(props) {
  const {
    type,
    title,
    page,
    setPage,
    status,
    data,
    isSearch,
    searchPath,
    setSearchValue,
    searchBar,
  } = props;

  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "350px",
    maxWidth: "350px",
  };

  const { setDebouncedValue } = useDebouncedApiCall(
    (path) => props.searchAPI(path),
    1000
  );

  useEffect(() => {
    if (isSearch) {
      setDebouncedValue(searchPath);
    } else {
      setDebouncedValue(null);
    }
  }, [isSearch, searchPath, setDebouncedValue]);

  let handleChange = (event, p) => {
    setPage(p);
  };
  var post_html_table = "";
  var paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "subscription-plan";

  const trialAndPromotionPlanType = [10, 11, 12, 13, 14];

  if (status === "loading") {
    post_html_table = <TableListLoadingComponent />;
  }
  if (status === "failed") {
    post_html_table = <TableListFailedComponent />;
  } else {
    if (status === "succeeded" && data?.data !== undefined) {
      post_html_table = data.data.map((item, index) => {
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
              sx={{ ...ellipsisStyle, width: "10%", textAlign: "center" }}
            >
              {item.name}
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
            >
              {item.description}
            </TableCell>
            {type === "training" && (
              <>
                <TableCell
                  sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
                >
                  {item.training_type === 1
                    ? "Group"
                    : item.training_type === 2
                    ? "Individual"
                    : "none"}
                </TableCell>
              </>
            )}
            {type === "trial" && (
              <>
                <TableCell
                  sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
                >
                  {trialAndPromotionPlanType.includes(item.plan_type_id) &&
                  item.number_of_day !== 0
                    ? item.number_of_day
                    : "-"}
                </TableCell>
                <TableCell
                  sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
                >
                  {trialAndPromotionPlanType.includes(item.plan_type_id) &&
                  item.mt_number_of_day !== 0 &&
                  item.mt_number_of_day !== null
                    ? item.mt_number_of_day
                    : "-"}
                </TableCell>
                <TableCell
                  sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
                >
                  {trialAndPromotionPlanType.includes(item.plan_type_id) &&
                  item.scoring_count !== 0
                    ? item.scoring_count
                    : "-"}
                </TableCell>
                <TableCell
                  sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
                >
                  {item.mocktest_count}
                </TableCell>
              </>
            )}
            {type !== "trial" && (
              <>
                <TableCell
                  sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
                >
                  {item.plan_order === null
                    ? "not show at frontend"
                    : item.plan_order}
                </TableCell>
                <TableCell
                  sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
                >
                  {item.frontend_status === 0 ? "No" : "Yes"}
                </TableCell>
                <TableCell
                  sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
                >
                  {item.fees}
                </TableCell>
              </>
            )}

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
          <Typography variant="h5">Subscription {title}</Typography>
        </Box>

        <TableForm
          tableSection="plan"
          type={type}
          pagingHtml={paging_html}
          postHtmlTable={post_html_table}
          mc="mc"
          setPage={setPage}
          setSearchValue={setSearchValue}
          searchBar={searchBar}
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
            count={data?.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
}

export default ReusableList;
