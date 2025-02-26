import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import React from "react";

const responsiveIcon = {
  fontSize: {
    xs: "1.4rem",
    sm: "1.5rem",
  },
  mr: 2,
};

const Speaking = [
  [
    [
      <LocalLibraryIcon sx={{ ...responsiveIcon }}></LocalLibraryIcon>,
      "Read Aloud",
      "/user-ra",
      "/admin/ra",
      "/admin/ra/add",
      "/admin/ra/edit/",
      "/score/ra",
      "/ra/test",
    ],
    [
      <LocalLibraryIcon sx={{ ...responsiveIcon }}></LocalLibraryIcon>,
      "Response to Situation",
      "/user-rts",
      "/admin/rts",
      "/admin/rts/add",
      "/admin/rts/edit/",
      "/score/rts",
      "/rts/test",
    ],
    [
      <MenuBookIcon sx={{ ...responsiveIcon }}></MenuBookIcon>,
      "Repeat Sentence",
      "user-rs",
      "/admin/rs",
      "/admin/rs/add",
      "/admin/rs/edit/",
      "/score/rs",
      "/rs/test",
    ],
    [
      <ImageSearchIcon sx={{ ...responsiveIcon }}></ImageSearchIcon>,
      "Describe Image",
      "user-di",
      "/admin/di",
      "/admin/di/add",
      "/admin/di/edit/",
      "/score/di",
      "/di/test",
    ],
    [
      <InterpreterModeIcon sx={{ ...responsiveIcon }}></InterpreterModeIcon>,
      "Retell Lecture",
      "user-rl",
      "/admin/rl",
      "/admin/rl/add",
      "/admin/rl/edit",
      "/score/rl",
      "/rl/test",
    ],
    [
      <QuestionAnswerIcon sx={{ ...responsiveIcon }}></QuestionAnswerIcon>,
      "Answer Short Question",
      "/user-asq",
      "/admin/asq",
      "/admin/asq/add",
      "/admin/asq/edit",
      "/score/asq",
      "/asq/test",
    ],
  ],

  //Route arrays
  [
    [
      "Speaking",
      "/Speaking",
      <KeyboardVoiceIcon
        sx={{ fontSize: "2rem", ml: "0.3rem" }}
      ></KeyboardVoiceIcon>,
      // "/user-ra",
      // "/user-rs",
      // "/user-di",
      // "/user-rl",
      // "/user-asq",
    ],
    [
      "Speaking",
      "",
      <KeyboardVoiceIcon
        sx={{ fontSize: "2rem", ml: "0.3rem" }}
      ></KeyboardVoiceIcon>,
      // "/admin/ra",
      // "/admin/rs",
      // "/admin/di",
      // "/admin/rl",
      // "/admin/asq",
    ],
  ],
];

export default Speaking;
