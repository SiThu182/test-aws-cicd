import { Box, Pagination, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableForm from "../../../../components/Backend/TableForm/TableForm";
import { SubscriptionPlanListAsync } from "../../../../redux/thunk/Subscription";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";
import TableListLoadingComponent from "../../../../components/Backend/Admin/Posts/TableListLoadingComponent";
import TableListFailedComponent from "../../../../components/Backend/Admin/Posts/TableListFailedComponent";
import useDebouncedApiCall from "../../../../customHooks/DebounceApi/useDebounceApi";
import CurrencyBox from "../../../../components/Backend/Admin/CurrencyBox";
import dayjs from "dayjs";

function Subscription() {  
  const {
    subscriptionRegisterStatus,
    subscriptionRegisterList,
    totalAud,
    totalMmk,
    totalUsd,
    totalSgd,
    totalNzd,
    totalThb,
  } = useSelector((state) => state.subscription);

  const dispatch = useDispatch();

  let [page, setPage] = useState(1);
  const firstDayOfMonth = dayjs().startOf("month");
  const lastDayOfMonth = dayjs().endOf("month");
  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "350px",
    maxWidth: "350px",
  };

  // Get the first day of the current month

  let [searchValue, setSearchValue] = useState({
    name: "",
    status: 1,
    startDate: firstDayOfMonth.format("YYYY-MM-DD HH:mm:ss"),
    endDate: lastDayOfMonth.format("YYYY-MM-DD HH:mm:ss"),
  });
  let postPath = "purchase-plan-list?page=" + page;

  let searchPath =
    "search-purchase-plan-by-name?page=" +
    page +
    "&plan=" +
    searchValue.name +
    "&payment_status=" +
    searchValue.status +
    "&start_date=" +
    searchValue.startDate +
    "&end_date=" +
    searchValue.endDate;

  const { setDebouncedValue } = useDebouncedApiCall(
    (path) => SubscriptionPlanListAsync(path),
    1000
  );

  console.log(searchValue);
  console.log("search value");
  const fetchApi = useCallback(() => {
    if (
      searchValue !== "" &&
      (searchValue?.name !== "" ||
        searchValue?.status !== "" ||
        searchValue?.startDate !== "" ||
        searchValue?.endDate !== "")
    ) {
      setDebouncedValue(searchPath);
    } else {
      dispatch(SubscriptionPlanListAsync(postPath));
      setDebouncedValue(null);
    }
  }, [dispatch, postPath, searchValue, searchPath, setDebouncedValue]);

  useEffect(() => {
    fetchApi();
  }, [dispatch, postPath, page, searchValue, searchPath, fetchApi]);

  useEffect(() => {
    if (subscriptionRegisterStatus === "failed") {
      setTimeout(() => {
        fetchApi();
      }, 2500);
    }
  }, [subscriptionRegisterStatus, fetchApi]);

  let handleChange = (event, p) => {
    setPage(p);
  };
  var post_html_table = "";
  var paging_html = "";

  const backendURL =
    process.env.REACT_APP_BACKEND_ADMIN + "delete-purchase-plan";

  if (subscriptionRegisterStatus === "loading") {
    post_html_table = <TableListLoadingComponent />;
  }

  const calculateDate = (register_date, number_of_day = 0) => {
    const regDate = new Date(register_date);

    // Add 30 days to the registration date
    const targetDate = new Date(regDate);
    targetDate.setDate(regDate.getDate() + number_of_day);

    // Calculate the difference in milliseconds
    const difference = targetDate - new Date();

    // Calculate the remaining days
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return days > 0 ? days : 0;
  };

  if (subscriptionRegisterStatus === "failed") {
    post_html_table = <TableListFailedComponent />;
  } else {
    if (
      subscriptionRegisterStatus === "succeeded" &&
      subscriptionRegisterList.data !== undefined
    ) {
      post_html_table = subscriptionRegisterList.data.map((item, index) => {
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
              {item.user?.name !== null && item.user?.name !== undefined ? (
                item.user?.name
              ) : (
                <span style={{ color: "red" }}>Deleted User</span>
              )}
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
            >
              {item.user?.email !== null && item.user?.email !== undefined ? (
                item.user?.email
              ) : (
                <span style={{ color: "red" }}>Deleted User</span>
              )}
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
            >
              {item.subscription_plan?.name}(
              {item.subscription_plan?.plan_type_id === 9
                ? item.subscription_plan?.training_type == 1
                  ? "Group Coaching Plan"
                  : "Individual Training Plan"
                : "Flexible Plan"}
              )
            </TableCell>
            <TableCell
              sx={{
                ...ellipsisStyle,
                width: "20%",
                textAlign: "center",
              }}
            >
              <Box sx={{ width: "5rem" }}>
                <Typography
                  sx={{
                    width: "100%",
                    fontSize: "0.8rem",
                    boxShadow: 3,
                    borderRadius: "0.5rem",
                    padding: 1,
                    background:
                      item.payment_status === 0
                        ? "yellow"
                        : item.payment_status === 1
                        ? "green"
                        : "red",
                    color: item.payment_status !== 0 ? "white" : "black",
                  }}
                >
                  {item.payment_status === 0
                    ? "Pending"
                    : item.payment_status === 1
                    ? "Approved"
                    : "Rejected"}
                </Typography>
              </Box>
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "20%", textAlign: "center" }}
            >
              {item.final_fees}
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "40%", textAlign: "center" }}
            >
              {item?.oc_register_id}
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "50%", textAlign: "center" }}
            >
              {new Date(item?.created_at).toDateString()} ( Remaining{" "}
              {calculateDate(
                item.updated_at,
                item.subscription_plan?.number_of_day
              )}{" "}
              days)
            </TableCell>

            {/* <TableCell
              sx={{ ...ellipsisStyle, width: "40%", textAlign: "center" }}
            >
              {item.check_scoring_date !== null ? item.check_scoring_date : "-"}
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "40%", textAlign: "center" }}
            >
              {item.check_mt_scoring_date !== null
                ? item.check_mt_scoring_date
                : "-"}
            </TableCell> */}

            <ActionCellForList
              leftTooltip={"Approve / Reject"}
              to="Detail"
              urlParam={item.final_fees}
              url={backendURL}
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
          <Typography variant="h5">Subscription Register List</Typography>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2, gap: "2rem" }}>
          <CurrencyBox
            amount={totalUsd}
            currency="USD"
            color="white"
            backgroundColor="blue"
          />
          <CurrencyBox
            amount={totalAud}
            currency="AUD"
            color="red"
            backgroundColor="yellow"
          />
          <CurrencyBox
            amount={totalMmk}
            currency="MMK"
            color="white"
            backgroundColor="red"
          />
          <CurrencyBox
            amount={totalSgd}
            currency="SGD"
            color="white"
            backgroundColor="#181818"
          />
          <CurrencyBox
            amount={totalThb}
            currency="THB"
            color="white"
            backgroundColor="blue"
          />
          <CurrencyBox
            amount={totalNzd}
            currency="NZD"
            color="white"
            backgroundColor="teal"
          />
        </Box>
        <TableForm
          tableSection="register"
          tableHead="email"
          filterTitle="Payment Status"
          filterOption={[
            { name: "Pending", value: 0 },
            { name: "Approve", value: 1 },
            { name: "Reject", value: 2 },
          ]}
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
            count={subscriptionRegisterList.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
}

export default Subscription;
