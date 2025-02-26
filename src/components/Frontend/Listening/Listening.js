import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import EditNoteIcon from "@mui/icons-material/EditNote";
import GradingIcon from "@mui/icons-material/Grading";
import MessageIcon from "@mui/icons-material/Message";
import RuleIcon from "@mui/icons-material/Rule";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchListeningCountAsync } from "../../../redux/thunk/Count";
import { FrontEndStyle } from "../FrontEndStyle";
import CountryDialog from "../OnlineCourses/CountryDialog";

function ListeningComponent(props) {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  let [assign, setAssign] = useState(false);
  let [smc, setSmc] = useState("");
  let [mc, setMc] = useState("");
  let [fib, setFib] = useState("");
  let [hiw, setHiw] = useState("");
  let [hcs, setHcs] = useState("");
  let [smw, setSmw] = useState("");
  let [sst, setSst] = useState("");
  let [wfd, setWfd] = useState("");

  const path = `student_status/${userId}?type=listening`;
  // const catPath = `student_status?type=listening`;
  const { listeningCount, listeningStatus } = useSelector(
    (state) => state.count
  );
  useEffect(() => {
    if (userId !== null) {
      dispatch(fetchListeningCountAsync(path));
      setAssign(true);
    }
  }, [dispatch, path, userId]);

  useEffect(() => {
    if (
      listeningStatus === "succeeded" &&
      assign &&
      listeningCount !== undefined &&
      listeningCount.data !== undefined
    ) {
      let findUserCount = (cat) => {
        let user;
        if (listeningCount.data.user_count.length === 0) {
          user = 0;
        } else {
          user = listeningCount.data.user_count.find((c) => c.category === cat);
          user = user?.s_count;
        }

        return user;
      };
      let findCount = (cat) => {
        let total;
        if (listeningCount.data.post_count.length === 0) {
          total = 0;
        } else {
          total = listeningCount.data.post_count.find(
            (c) => c.category === cat
          );
        }
        let user;
        if (listeningCount.data.user_count.length === 0) {
          user = 0;
        } else {
          user = listeningCount.data.user_count.find((c) => c.category === cat);
        }
        return ` ${user !== 0 && user !== undefined ? user.s_count : 0} / ${
          total !== 0 && total !== undefined ? total.c_count : 0
        }`;
      };
      let totalUserCount =
        findUserCount("smc") +
        findUserCount("mc") +
        findUserCount("fib") +
        findUserCount("hiw") +
        findUserCount("hcs") +
        findUserCount("smw") +
        findUserCount("sst") +
        findUserCount("wfd");
      props.setUserListeningProgress(totalUserCount);
      setSmc(findCount("smc"));
      setMc(findCount("mc"));
      setFib(findCount("fib"));
      setHiw(findCount("hiw"));
      setHcs(findCount("hcs"));
      setSmw(findCount("smw"));
      setSst(findCount("sst"));
      setWfd(findCount("wfd"));
      setAssign(false);
    }
  }, [assign, listeningCount, listeningStatus, props]);

  const navigate = useNavigate();

  let listeningArray1 = [
    [
      smc,
      "MC Single Answer",
      <ChecklistRtlIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/mc-sa/test")}
      ></ChecklistRtlIcon>,
      "L-SMC",
    ],
    [
      mc,
      "MC Multiple Answers",
      <RuleIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/mc-ma/test")}
      ></RuleIcon>,
      "L-MC",
    ],
    [
      fib,
      "Fill in the Blanks",
      <TextFormatIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/fib/test")}
      ></TextFormatIcon>,
      "L-FIB",
    ],
    [
      hcs,
      "Highlight Correct Summary",
      <GradingIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/hiw/test")}
      ></GradingIcon>,
      "HIW",
    ],
  ];

  let listeningArray2 = [
    [
      smw,
      "Select Missing Words",
      <SpellcheckIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/smw/test")}
      ></SpellcheckIcon>,
      "SMW",
    ],
    [
      hiw,
      "Highlight Incorrect Words",
      <AutoFixHighIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/smw/test")}
      ></AutoFixHighIcon>,
      "HIW",
    ],
    [
      sst,
      "Summarized Spoken Text",
      <MessageIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/sst/test")}
      ></MessageIcon>,
      "SST",
    ],
    [
      wfd,
      "Write From Dictation",
      <EditNoteIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/wfd/test")}
      ></EditNoteIcon>,
      "WFD",
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
        {listeningArray1.map((r, index) => (
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
                <span>{r[3]} </span> Listening
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
      <Box
        sx={{
          ...FrontEndStyle.cardSection,
        }}
      >
        {listeningArray2.map((r, index) => (
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
                <span>{r[3]} </span> Listening
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

export default ListeningComponent;
