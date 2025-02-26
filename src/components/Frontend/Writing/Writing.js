import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchWritingCountAsync } from "../../../redux/thunk/Count";
import { FrontEndStyle } from "../FrontEndStyle";
import CountryDialog from "../OnlineCourses/CountryDialog";

function WritingComponent(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  let [assign, setAssign] = useState(false);
  let [we, setWe] = useState("");
  let [swt, setSwt] = useState("");

  const path = `student_status/${userId}?type=writing`;
  const { writingCount, writingStatus } = useSelector((state) => state.count);
  useEffect(() => {
    dispatch(fetchWritingCountAsync(path));
    setAssign(true);
  }, [dispatch, path]);

  useEffect(() => {
    if (
      writingStatus === "succeeded" &&
      assign &&
      writingCount !== undefined &&
      writingCount.data !== undefined
    ) {
      let findUserCount = (cat) => {
        let user;
        if (writingCount.data.user_count.length === 0) {
          user = 0;
        } else {
          user = writingCount.data.user_count.find((c) => c.category === cat);
          user = user?.s_count;
        }

        return user;
      };
      let findCount = (cat) => {
        let total;
        total = writingCount.data.post_count.find((c) => c.category === cat);
        if (writingCount.data.post_count.length === 0) {
          total = 0;
        } else {
          total = writingCount.data.post_count.find((c) => c.category === cat);
        }
        let user;
        if (writingCount.data.user_count.length === 0) {
          user = 0;
        } else {
          user = writingCount.data.user_count.find((c) => c.category === cat);
        }
        // return ` ${user !== 0 ? user.s_count : 0} / ${total.c_count}`;
        return ` ${user !== 0 && user !== undefined ? user.s_count : 0} / ${
          total !== 0 && total !== undefined ? total.c_count : 0
        }`;
      };
      setWe(findCount("we"));
      setSwt(findCount("swt"));
      let totalUserCount = findUserCount("we") + findUserCount("swt");
      props.setUserWritingProgress(totalUserCount);

      setAssign(false);
    }
  }, [assign, writingCount, writingStatus, props]);

  let writingArray = [
    [
      we,
      "Write Essay",
      <DriveFileRenameOutlineIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/we/test")}
      ></DriveFileRenameOutlineIcon>,
      "WE",
    ],
    [
      swt,
      "Summarized Written text",
      <SummarizeRoundedIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/swt/test")}
      ></SummarizeRoundedIcon>,
      "SWT",
    ],
  ];

  return (
    <>
      <CountryDialog></CountryDialog>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          px: 3,
          my: "5.5rem",
        }}
      >
        {writingArray.map((w, index) => (
          <Box
            key={index}
            className="zig-zag-test"
            sx={{
              ...FrontEndStyle.cardBox,
              position: "relative",
            }}
          >
            <Box sx={{ ...FrontEndStyle.statusBox }}>
              <Typography variant="h6">
                <span>{w[3]} </span> Writing
              </Typography>
              <Typography variant="h5">
                {userId !== null ? (
                  w[0] !== "" ? (
                    w[0]
                  ) : (
                    ""
                  )
                ) : (
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      backgroundColor: "red",
                      boxShadow: 5,
                      p: 1,
                      borderRadius: "1rem",
                    }}
                  >
                    Not Logged in
                  </Typography>
                )}
              </Typography>
            </Box>
            <Box
              sx={{
                ...FrontEndStyle.iconBox,
              }}
            >
              <Typography variant="h5" fontWeight={600} width={"60%"}>
                {w[1]}
              </Typography>
              <Box>{w[2]}</Box>
            </Box>

            {/* <Typography
            sx={{
              backgroundColor: "#ffef62",
              width: "60%",
              px: 2,
              position: "absolute",
              bottom: 0,
              right: 1,
              color: "#000",
              borderRadius: "0.2rem",
              borderBottomRightRadius: "1rem",
            }}
          >
            Ai scoring
          </Typography> */}
          </Box>
        ))}
        {/* <Box
          sx={{
            ...cardBox,
            position: "relative",
          }}
          onClick={() => navigate("/we/test")}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">
              <span>WE </span> Writing
            </Typography>
            <Typography variant="h5">50/50</Typography>
          </Box>

          <Typography variant="h5" fontWeight={600}>
            Write Essay
          </Typography> */}

        {/* <Typography
            sx={{
              backgroundColor: "#ffef62",
              width: "60%",
              px: 2,
              position: "absolute",
              bottom: 0,
              right: 1,
              color: "#000",
              borderRadius: "0.2rem",
              borderBottomRightRadius: "1rem",
            }}
          >
            Ai scoring
          </Typography> */}
        {/* </Box> */}

        {/* <Box sx={{ ...cardBox }} onClick={() => navigate("/swt/test")}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">
              <span>SWT</span> Writing
            </Typography>
            <Typography variant="h5">50/50</Typography>
          </Box>

          <Typography variant="h5" fontWeight={600}>
            Summarize Written Text
          </Typography>
        </Box> */}
      </Box>
    </>
  );
}

export default WritingComponent;
