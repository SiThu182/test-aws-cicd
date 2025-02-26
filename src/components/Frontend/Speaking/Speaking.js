import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchSpeakingCountAsync } from "../../../redux/thunk/Count";
import { FrontEndStyle } from "../FrontEndStyle";
import CountryDialog from "../OnlineCourses/CountryDialog";
import { UserProgressSpeaking } from "../../../Screens/Frontend/Speaking";

function SpeakingComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  let [assign, setAssign] = useState(false);
  let [ra, setRa] = useState("");
  let [rs, setRs] = useState("");
  let [rl, setRl] = useState("");
  let [di, setDi] = useState("");
  let [asq, setAsq] = useState("");

  const path = `student_status/${userId}?type=speaking`;
  const { speakingCount, speakingStatus } = useSelector((state) => state.count);
  useEffect(() => {
    dispatch(fetchSpeakingCountAsync(path));
    setAssign(true);
  }, [dispatch, path]);

  let { setContextValue } = useContext(UserProgressSpeaking);

  useEffect(() => {
    if (
      speakingStatus === "succeeded" &&
      assign &&
      speakingCount !== undefined &&
      speakingCount.data !== undefined
    ) {
      let findUserCount = (cat) => {
        let user;
        if (speakingCount.data.user_count.length === 0) {
          user = 0;
        } else {
          user = speakingCount.data.user_count.find((c) => c.category === cat);
          user = user?.s_count;
        }

        return user;
      };
      let findCount = (cat) => {
        let total;
        // total = speakingCount.data.post_count.find(
        //   (c) => c.category === cat
        // );
        if (speakingCount.data.post_count.length === 0) {
          total = 0;
        } else {
          total = speakingCount.data.post_count.find((c) => c.category === cat);
        }
        let user;
        if (speakingCount.data.user_count.length === 0) {
          user = 0;
        } else {
          user = speakingCount.data.user_count.find((c) => c.category === cat);
        }

        // return ` ${user !== 0 ? user.s_count : 0} / ${total.c_count}`;
        return ` ${user !== 0 && user !== undefined ? user.s_count : 0} / ${
          total !== 0 && total !== undefined ? total.c_count : 0
        }`;
      };

      let userRaCount = findCount("ra");
      let userRsCount = findCount("rs");
      let userRlCount = findCount("rl");
      let userDiCount = findCount("di");
      let userAsqCount = findCount("asq");
      let totalUserCount =
        findUserCount("ra") +
        findUserCount("rs") +
        findUserCount("rl") +
        findUserCount("di") +
        findUserCount("asq");
      setContextValue(totalUserCount);
      setRa(userRaCount);
      setRs(userRsCount);
      setRl(userRlCount);
      setDi(userDiCount);
      setAsq(userAsqCount);
      setAssign(false);
    }
  }, [assign, speakingCount, speakingStatus, setContextValue]);

  let speakingArray1 = [
    [
      ra,
      "Read Aloud",
      <LocalLibraryIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/ra/test")}
      ></LocalLibraryIcon>,
      "RA",
    ],
    [
      rs,
      "Repeat Sentence",
      <MenuBookIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/rs/test")}
      ></MenuBookIcon>,
      "RS",
    ],
    [
      rl,
      "Retell Lecture",
      <InterpreterModeIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/rl/test")}
      ></InterpreterModeIcon>,
      "RL",
    ],
  ];

  let speakingArray2 = [
    [
      di,
      "Describe Image",
      <ImageSearchIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/di/test")}
      ></ImageSearchIcon>,

      "Di",
    ],
    [
      asq,
      "Answer Short Question",
      <QuestionAnswerIcon
        sx={{
          ...FrontEndStyle.icon,
        }}
        onClick={() => navigate("/asq/test")}
      ></QuestionAnswerIcon>,

      "ASQ",
    ],
  ];

  //   const abbr = {
  //     backgroundColor: "#ffef62",
  //     borderRadius: "0.2rem",
  //     padding: 1,
  //     color: "#000",
  //   };
  return (
    <>
      <CountryDialog></CountryDialog>
      <Box
        sx={{
          ...FrontEndStyle.cardSection,
        }}
      >
        {speakingArray1.map((s, index) => (
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
                <span>{s[3]} </span> Speaking
              </Typography>
              <Typography variant="h5">
                {userId !== null ? (
                  s[0] !== "" ? (
                    s[0]
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
                {s[1]}
              </Typography>
              <Box>{s[2]}</Box>
            </Box>
            {s[3] === "RA" && (
              <Typography
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
              </Typography>
            )}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          ...FrontEndStyle.cardSection,
        }}
      >
        {speakingArray2.map((s, index) => (
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
                <span>{s[3]} </span> Speaking
              </Typography>
              <Typography variant="h5">
                {userId !== null ? (
                  s[0] !== "" ? (
                    s[0]
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
                {s[1]}
              </Typography>
              <Box>{s[2]}</Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default SpeakingComponent;
