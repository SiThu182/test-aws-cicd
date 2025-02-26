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
//  [
//     <LocalLibraryIcon sx={{ ...responsiveIcon }}></LocalLibraryIcon>,
//     "Response to a Situation",
//     "/user-rts",
//     "/admin/rts",
//     "/admin/rts/add",
//     "/admin/rts/edit/",
//     "/score/rts",
//     "/rts /test",
//   ],

export const practiceSpeakingDropDownParent = {
  label: "Speaking",
  icon: (
    <KeyboardVoiceIcon
      sx={{ fontSize: "2rem", ml: "0.3rem" }}
    ></KeyboardVoiceIcon>
  ),
};

const ReadAloudIcon = () => {
  return <LocalLibraryIcon sx={{ ...responsiveIcon }}></LocalLibraryIcon>;
};

const RepeatSentenceIcon = () => {
  return <MenuBookIcon sx={{ ...responsiveIcon }}></MenuBookIcon>;
};

const DescribeImageIcon = () => {
  return <ImageSearchIcon sx={{ ...responsiveIcon }}></ImageSearchIcon>;
};

const RetellLectureIcon = () => {
  return <InterpreterModeIcon sx={{ ...responsiveIcon }}></InterpreterModeIcon>;
};

const ASQIcon = () => {
  return <QuestionAnswerIcon sx={{ ...responsiveIcon }}></QuestionAnswerIcon>;
};

export const practiceSpeakingDropdownList = [
  {
    icon: <ReadAloudIcon />,
    label: "Read Aloud",
    route: "/ra/test",
  },
  {
    icon: <RepeatSentenceIcon />,
    label: "Repeat Sentence",
    route: "/rs/test",
  },
  {
    icon: <DescribeImageIcon />,
    label: "Describe Image",
    route: "/di/test",
  },
  {
    icon: <RetellLectureIcon />,
    label: "Retell Lecture",
    PTECore: false,
    route: "/rl/test",
  },
  {
    icon: <RetellLectureIcon />,
    label: "Response to a Situation",
    PTECore: true,
    route: "/rts/test",
  },
  {
    icon: <ASQIcon />,
    label: "Answer Short Questions",
    route: "/asq/test",
  },
];

// export const materialAdmin = [
//   {
//     icon: <PictureAsPdfIcon sx={{ ...responsiveIcon }}></PictureAsPdfIcon>,
//     label: "Materials Download",
//     adminRouteExist: true,
//     admin: "/admin/materials-download",
//     adminAdd: "/admin/materials-download/add",
//     adminEdit: "/admin/materials-download/edit",
//   },
// ];

export const adminSpeakingDropdownList = [
  {
    icon: <ReadAloudIcon />,
    label: "Read Aloud",
    adminRouteExist: true,
    route: "/admin/ra",
    matchRoutes: ["/admin/ra/add", "/admin/ra/edit", "/admin/ra"],
  },
  {
    icon: <RepeatSentenceIcon />,
    label: "Repeat Sentence",
    adminRouteExist: true,
    route: "/admin/rs",
    matchRoutes: ["/admin/rs/add", "/admin/rs/edit", "/admin/rs"],
  },
  {
    icon: <RetellLectureIcon />,
    label: "Retell Lecture",
    adminRouteExist: true,
    PTECore: false,
    route: "/admin/rl",
    matchRoutes: ["/admin/rl/add", "/admin/rl/edit", "/admin/rl"],
  },
  {
    icon: <RetellLectureIcon />,
    label: "Response to a Situation",
    adminRouteExist: true,
    PTECore: true,
    route: "/admin/rts",
    matchRoutes: ["/admin/rts/add", "/admin/rts/edit", "/admin/rts"],
  },
  {
    icon: <DescribeImageIcon />,
    label: "Describe Image",
    adminRouteExist: true,
    route: "/admin/di",
    matchRoutes: ["/admin/di/add", "/admin/di/edit", "/admin/di"],
  },
  {
    icon: <ASQIcon />,
    label: "Answer Short Question",
    adminRouteExist: true,
    route: "/admin/asq",
    matchRoutes: ["/admin/asq/add", "/admin/asq/edit", "/admin/asq"],
  },
];

export const speakingDropDownParent = {
  label: "Speaking",
  icon: (
    <KeyboardVoiceIcon
      sx={{ fontSize: "2rem", ml: "0.3rem" }}
    ></KeyboardVoiceIcon>
  ),
};

const NewSpeaking = [
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

export default NewSpeaking;
