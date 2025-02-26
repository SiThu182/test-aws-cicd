import GradingIcon from "@mui/icons-material/Grading";
import QuizIcon from "@mui/icons-material/Quiz";
import React from "react";

const responsiveIcon = {
  fontSize: {
    xs: "1.4rem",
    sm: "1.5rem",
  },
  mr: 1,
};
const MockTest = [
  [
    [
      <QuizIcon sx={{ ...responsiveIcon }}></QuizIcon>,
      "Mock Test",
      "/user-mocktest",
      "/admin/mocktestlist",
      "/admin/mocktestlist/add",
      "/admin/mocktestlist/edit/",
      "/score/mocktest",
      "/mocktest/tabs",
      "/mocktest/show/",
      "score/mocktest/detail",
    ],
  ],

  [
    "Mock Test",
    "",
    <GradingIcon sx={{ fontSize: "2rem", ml: "0.3rem" }}></GradingIcon>,
  ],
];

export default MockTest;
