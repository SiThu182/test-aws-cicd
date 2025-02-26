import { Box, Pagination, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableForm from "../../../../components/Backend/TableForm/TableForm";
import { fetchCourseRegisterListAsync } from "../../../../redux/thunk/Course";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";
import TableListLoadingComponent from "../../../../components/Backend/Admin/Posts/TableListLoadingComponent";
import TableListFailedComponent from "../../../../components/Backend/Admin/Posts/TableListFailedComponent";
import useDebouncedApiCall from "../../../../customHooks/DebounceApi/useDebounceApi";
import CurrencyBox from "../../../../components/Backend/Admin/CurrencyBox";
import dayjs from "dayjs";

function Course() {
  const {
    courseRegisterStatus,
    courseRegister,
    totalAud,
    totalMmk,
    totalUsd,
    totalSgd,
    totalNzd,
    totalThb,
  } = useSelector((state) => state.course);

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
  let [searchValue, setSearchValue] = useState({
    name: "",
    status: 1,
    startDate: firstDayOfMonth.format("YYYY-MM-DD HH:mm:ss"),
    endDate: lastDayOfMonth.format("YYYY-MM-DD HH:mm:ss"),
  });
  let postPath = "online-student-list?page=" + page;
  let searchPath =
    "search-course-register-by-name?page=" +
    page +
    "&course=" +
    searchValue.name +
    "&payment_status=" +
    searchValue.status +
    "&start_date=" +
    searchValue.startDate +
    "&end_date=" +
    searchValue.endDate;

  const { setDebouncedValue } = useDebouncedApiCall(
    (path) => fetchCourseRegisterListAsync(path),
    1000
  );

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
      dispatch(fetchCourseRegisterListAsync(postPath));
      setDebouncedValue(null);
    }
  }, [dispatch, postPath, searchValue, searchPath, setDebouncedValue]);
  useEffect(() => {
    fetchApi();
  }, [dispatch, postPath, page, searchValue, searchPath, fetchApi]);

  useEffect(() => {
    if (courseRegisterStatus === "failed") {
      setTimeout(() => {
        fetchApi();
      }, 2500);
    }
  }, [courseRegisterStatus, fetchApi]);

  let handleChange = (event, p) => {
    setPage(p);
  };
  var post_html_table = "";
  var paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "courses";

  // const feesCalculate = (item) => {
  //   let courseFees = item?.course?.fees;
  //   let subscriptionFees;
  //   if (item?.subscription_plan !== null) {
  //     subscriptionFees = item?.subscription_plan?.fees;
  //   }
  //   if (item?.course?.discount_status == 1) {
  //     courseFees = (courseFees * item?.course?.discount_percent) / 100;
  //   }
  //   if (item?.subscription_plan?.discount_status == 1) {
  //     subscriptionFees =
  //       (subscriptionFees * item?.subscription_plan.discount_percent) / 100;
  //   }
  //   return subscriptionFees !== null &&
  //     subscriptionFees !== undefined &&
  //     !isNaN(subscriptionFees)
  //     ? courseFees + "+" + subscriptionFees
  //     : courseFees;
  // };
  if (courseRegisterStatus === "loading") {
    post_html_table = <TableListLoadingComponent />;
  }

  if (courseRegisterStatus === "failed") {
    post_html_table = <TableListFailedComponent />;
  } else {
    if (
      courseRegisterStatus === "succeeded" &&
      courseRegister.data !== undefined
    ) {
      post_html_table = courseRegister.data.map((item, index) => {
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
              {item.name}
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "40%", textAlign: "center" }}
            >
              {item.course?.name}
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "40%", textAlign: "center" }}
            >
              {!item.subscription_plan ? "-" : item.subscription_plan?.name}
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
              sx={{ ...ellipsisStyle, width: "40%", textAlign: "center" }}
            >
              {" "}
              {item.final_fees}
            </TableCell>
            <TableCell
              sx={{ ...ellipsisStyle, width: "40%", textAlign: "center" }}
            >
              {new Date(item?.created_at).toDateString()}
            </TableCell>
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
          <Typography variant="h5">Course Register List</Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2, gap: "2rem" }}>
          <CurrencyBox
            amount={totalUsd}
            p
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
            backgroundColor="silver"
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
          pagingHtml={paging_html}
          filterTitle="Payment Status"
          filterOption={[
            { name: "Pending", value: 0 },
            { name: "Approve", value: 1 },
            { name: "Reject", value: 2 },
          ]}
          type="course"
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
            count={courseRegister.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
}

export default Course;
