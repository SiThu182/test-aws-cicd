import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import RuleIcon from "@mui/icons-material/Rule";
import SegmentIcon from "@mui/icons-material/Segment";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchReadingCountAsync } from "../../../redux/thunk/Count";
import { FrontEndStyle } from "../FrontEndStyle";
import CountryDialog from "../OnlineCourses/CountryDialog";

function ReadingComponent(props) {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  let [assign, setAssign] = useState(false);
  let [rsmc, setRsmc] = useState("");
  let [rmc, setRmc] = useState("");
  let [rfib, setRfib] = useState("");
  let [rwfib, setRwfib] = useState("");
  let [rop, setRop] = useState("");

  const path = `student_status/${userId}?type=reading`;
  const { readingCount, readingStatus } = useSelector((state) => state.count);
  useEffect(() => {
    dispatch(fetchReadingCountAsync(path));
    setAssign(true);
  }, [dispatch, path]);

  useEffect(() => {
    if (
      readingStatus === "succeeded" &&
      assign &&
      readingCount !== undefined &&
      readingCount.data !== undefined
    ) {
      let findUserCount = (cat) => {
        let user;
        if (readingCount.data.user_count.length === 0) {
          user = 0;
        } else {
          user = readingCount.data.user_count.find((c) => c.category === cat);
          user = user?.s_count;
        }

        return user;
      };
      let findCount = (cat) => {
        let total;
        if (readingCount.data.post_count.length === 0) {
          total = 0;
        } else {
          total = readingCount.data.post_count.find((c) => c.category === cat);
        }
        let user;
        if (readingCount.data.user_count.length === 0) {
          user = 0;
        } else {
          user = readingCount.data.user_count.find((c) => c.category === cat);
        }
        return ` ${user !== 0 && user !== undefined ? user.s_count : 0} / ${
          total !== 0 && total !== undefined ? total.c_count : 0
        }`;
      };
      let totalUserCount =
        findUserCount("rsmc") +
        findUserCount("rmc") +
        findUserCount("rfib") +
        findUserCount("rwfib") +
        findUserCount("rop");
      props.setUserReadingProgress(totalUserCount);

      setRsmc(findCount("rsmc"));
      setRmc(findCount("rmc"));
      setRfib(findCount("rfib"));
      setRwfib(findCount("rwfib"));
      setRop(findCount("rop"));
      setAssign(false);
    }
  }, [assign, readingCount, readingStatus, props]);

  let readingArray1 = [
    [
      rsmc,
      "MC Single Answer",
      <ChecklistRtlIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/mc-sa/test")}
      ></ChecklistRtlIcon>,
      "R-SMC",
    ],
    [
      rmc,
      "MC Multiple Answers",
      <RuleIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/mc-ma/test")}
      ></RuleIcon>,
      "R-MC",
    ],
    [
      rfib,
      "Fill in the Blanks",
      <TextFormatIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/r-fib/test")}
      ></TextFormatIcon>,
      "R-FIB",
    ],
  ];
  let readingArray2 = [
    [
      rwfib,
      "R&W Fill in the Blanks",
      <VerticalSplitIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/r-rop/test")}
      ></VerticalSplitIcon>,

      "RWFIB",
    ],
    [
      rop,
      "Reorder Paragraph",
      <SegmentIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/r-r&wfib/test")}
      ></SegmentIcon>,

      "ROP",
    ],
  ];

  return (
    <>
      <CountryDialog></CountryDialog>
      <Box
        sx={{
          ...FrontEndStyle.cardSection,
        }}
      >
        {readingArray1.map((r, index) => (
          <Box
            key={index}
            className="zig-zag-test"
            sx={{
              ...FrontEndStyle.cardBox,
              position: "relative",
            }}
          >
            <Box
              sx={{
                ...FrontEndStyle.statusBox,
              }}
            >
              <Typography variant="h6">
                <span>{r[3]} </span> Reading
              </Typography>
              <Typography variant="h5">
                {userId !== null ? (
                  r[0] !== "" ? (
                    r[0]
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

                // backgroundPosition: "left top",
                // backgroundRepeat: "repeat-x",
                // backgroundSize: "22px 32px",
                // content: " ",
                // display: "block",

                // height: "32px",
                // width: "100%",

                // position: "relative",
                // bottom: "64px",
                // left: 0,
              }}
            >
              <Typography variant="h5" fontWeight={600} width={"60%"}>
                {r[1]}
              </Typography>
              <Box>{r[2]}</Box>
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
      </Box>
      <Box
        sx={{
          ...FrontEndStyle.cardSection,
        }}
      >
        {readingArray2.map((r, index) => (
          <Box
            key={index}
            className="zig-zag-test"
            sx={{
              ...FrontEndStyle.cardBox,
              mb: 2,
              position: "relative",
            }}
          >
            <Box sx={{ ...FrontEndStyle.statusBox }}>
              <Typography variant="h6">
                <span>{r[3]} </span> Reading
              </Typography>
              <Typography variant="h5">
                {userId !== null ? (
                  r[0] !== "" ? (
                    r[0]
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
              <Typography variant="h5" fontWeight={600}>
                {r[1]}
              </Typography>
              <Box>{r[2]}</Box>
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
      </Box>
    </>
  );
}

export default ReadingComponent;
