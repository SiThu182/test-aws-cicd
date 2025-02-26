import * as React from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Box, Tooltip } from "@mui/material";

import axios from "axios";
import { GetTodayDateString } from "../../../Utils/GetTodayDateString";

// function getRandomNumber(min, max) {
//   return Math.round(Math.random() * (max - min) + min);
// }

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
// function fakeFetch(date, { signal }) {
//   return new Promise((resolve, reject) => {
//     const timeout = setTimeout(() => {
//       const daysInMonth = date.daysInMonth();
//       const daysToHighlight = [1, 2, 3].map(() =>
//         getRandomNumber(1, daysInMonth)
//       );

//       resolve({ daysToHighlight });
//     }, 500);

//     signal.onabort = () => {
//       clearTimeout(timeout);
//       reject(new DOMException("aborted", "AbortError"));
//     };
//   });
// }

// let currentDate = new Date();
// currentDate = dayjs(currentDate.toISOString());
// const initialValue = currentDate;

function ServerDay(props) {
  const {
    highlightedDays = [],
    startDate,
    examDate,
    day,
    currentDate,
    outsideCurrentMonth,
    ...other
  } = props;

  // let todayDate = new Date().toISOString().slice(0, 10);
  let todayDate = new Date();

  // Extract year, month, and day components
  const year = todayDate.getFullYear();
  // Add 1 to month because getMonth() returns 0-based index (0 for January, 11 for December)
  const month = todayDate.getMonth() + 1;
  const current_day = todayDate.getDate();

  // Format components with leading zeros if necessary
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = current_day < 10 ? `0${current_day}` : current_day;
  const dateString = `${year}-${formattedMonth}-${formattedDay}`;
  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.hasOwnProperty(props.day.format("YYYY-MM-DD"));

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={
        isSelected
          ? dateString === props.day.format("YYYY-MM-DD") &&
            highlightedDays[props.day.format("YYYY-MM-DD")] !== "finished"
            ? "🟡"
            : highlightedDays[props.day.format("YYYY-MM-DD")] === "not finished"
            ? "🔴"
            : highlightedDays[props.day.format("YYYY-MM-DD")] === "finished"
            ? "🟢"
            : "🔳"
          : undefined
      }
    >
      <Tooltip
        title={
          isSelected
            ? dateString === props.day.format("YYYY-MM-DD")
              ? "in progress"
              : highlightedDays[props.day.format("YYYY-MM-DD")]
            : props.day.format("YYYY-MM-DD") > startDate &&
              props.day.format("YYYY-MM-DD") < examDate
            ? "no progress yet"
            : "no study plan"
        }
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          sx={{ text: "white" }}
        />
      </Tooltip>
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  let currentDate = new Date();
  currentDate = dayjs(currentDate.toISOString());
  const initialValue = currentDate;
  const [value, setValue] = React.useState(initialValue);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  // const [loading, setLoading] = React.useState(false);
  const [startDate, setStartDate] = React.useState();
  const [examDate, setExamDate] = React.useState();
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  // React.useEffect(() => {
  //   const fetchFeedback = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_API}study-plan-feedback`,
  //         { params: { plan_id: 1, user_id: 1 } }
  //       );
  //       if (response.data.status === 1) {
  //         CheckStudyPlanProgress(
  //           response.data.score,
  //           response.data.score_multiple_choice,
  //           response.data.start_date
  //         );
  //         // swal({
  //         //   title: "Success Alert",
  //         //   text: "Study plan successfully generated",
  //         //   icon: "success",
  //         //   // buttons: true,
  //         //   // dangerMode: true,
  //         //   timer: 2000,
  //         // });
  //       }
  //     } catch (error) {
  //       // swal({
  //       //   title: "Error",
  //       //   text: "Fail to generate study plan",
  //       //   icon: "error",
  //       //   // buttons: true,
  //       //   // dangerMode: true,
  //       //   timer: 2000,
  //       // });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   // fetchFeedback();
  // }, []);

  const fetchHighlightedDays = React.useCallback(
    async (date) => {
      let month = date !== undefined ? date?.$M + 1 : currentMonth;
      const controller = new AbortController();
      try {
        const userId = localStorage.getItem("userId");
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const dateString = GetTodayDateString();
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_ADMIN}get-latest-study-plan-daily-progress/${userId}/${month}/${dateString}/${timezone}`,
          {
            signal: controller.signal,
          }
        );
        if (response.data.status === 1 && response.data.data !== null) {
          setStartDate(response.data.data.start_date);
          setExamDate(response.data.data.exam_date);
          setHighlightedDays(
            response.data.data.daily_status === null
              ? []
              : response.data.data.daily_status
          );
          setIsLoading(false);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }

      // fakeFetch(date, {
      //   signal: controller.signal,
      // })
      //   .then(({ daysToHighlight }) => {
      //     setHighlightedDays(daysToHighlight);
      //     setIsLoading(false);
      //   })
      //   .catch((error) => {
      //     // ignore the error if it's caused by `controller.abort`
      //     if (error.name !== "AbortError") {
      //       throw error;
      //     }
      //   });

      requestAbortController.current = controller;
    },
    [currentMonth]
  );

  React.useEffect(() => {
    fetchHighlightedDays();
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, [fetchHighlightedDays]);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const onChangeHandler = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          sx={{
            background:
              "linear-gradient(315deg, rgba(64,193,246,0.9501050420168067) 1%, rgba(252,252,252,1) 6%, rgba(255,255,255,0.9501050420168067) 88%, rgba(25,156,229,0.88) 99%);",
            borderRadius: "2rem",
            boxShadow: 4,
            "&.MuiDateCalendar-root": {
              height: "100%",
            },
          }}
          defaultValue={initialValue}
          loading={isLoading}
          value={value}
          onChange={(newValue) => onChangeHandler(newValue)}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
              startDate,
              examDate,
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}
