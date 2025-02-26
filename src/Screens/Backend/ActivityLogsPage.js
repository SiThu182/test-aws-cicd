import {
  Box,
  CircularProgress,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SimpleTable from "../../components/Backend/SimpleTable";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityLogListAsync } from "../../redux/thunk/ActivityLog";
import PaginationComponent from "../../components/Backend/PaginationComponent";
import BackButton from "../../components/Backend/BackButton";

function ActivityLogsPage() {
  const state = useLocation();
  const dispatch = useDispatch();
  const { activityLog, activityLogStatus, activityLogError } = useSelector(
    (store) => store.activityLog
  );
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const [saveActivityArray, setSaveActivityArray] = useState([]);
  const [startAssign, setStartAssign] = useState(true);
  useEffect(() => {
    dispatch(
      fetchActivityLogListAsync({ userId: state?.state?.userId, page: 1 })
    );
    setStartAssign(true);
  }, [dispatch, state]);

  useEffect(() => {
    if (
      activityLogStatus === "succeeded" &&
      startAssign &&
      activityLog.current_page === page
    ) {
      setTotalPage(activityLog.last_page);
      let arrFromDataLength;
      if (saveActivityArray.length !== activityLog.last_page) {
        arrFromDataLength = new Array(activityLog.last_page).fill("");
      } else {
        arrFromDataLength = saveActivityArray;
      }
      arrFromDataLength[page - 1] = activityLog.data;
      setSaveActivityArray(arrFromDataLength);
      setStartAssign(false);
    }
  }, [startAssign, page, activityLog, activityLogStatus, saveActivityArray]);

  let handleChange = (event, p) => {
    setPage(p);

    if (saveActivityArray[p - 1] === "") {
      dispatch(
        fetchActivityLogListAsync({ userId: state?.state?.userId, page: p })
      );
      setStartAssign(true);
    }
  };

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h6">Activity Logs</Typography>
        <BackButton />
      </Box>

      <SimpleTable
        userId={state?.state?.userId}
        headerArray={[
          [1, "No."],
          [2, "Post Id"],
          [3, "Mock test Id"],
          [4, "Category"],
          [5, "Activity Status"],
        ]}
      >
        {activityLogStatus === "loading" && (
          <TableRow>
            <TableCell colSpan={5}>
              <CircularProgress></CircularProgress>
            </TableCell>
          </TableRow>
        )}
        {activityLogStatus === "succeeded" &&
          saveActivityArray[page - 1] !== undefined &&
          saveActivityArray[page - 1] !== "" &&
          saveActivityArray[page - 1].map((a, i) => (
            <TableRow key={a.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{a.post_id === null ? "-" : a.post_id}</TableCell>
              <TableCell>
                {a.mocktest_id === null ? "-" : a.mocktest_id}
              </TableCell>
              <TableCell>{a.category}</TableCell>
              <TableCell>{a.status}</TableCell>
            </TableRow>
          ))}

        {activityLogStatus === "failed" && (
          <Box>
            <Typography>{activityLogError}</Typography>
          </Box>
        )}
      </SimpleTable>
      <PaginationComponent
        page={page}
        totalPage={totalPage}
        handleChange={handleChange}
      ></PaginationComponent>
    </Box>
  );
}

export default ActivityLogsPage;
