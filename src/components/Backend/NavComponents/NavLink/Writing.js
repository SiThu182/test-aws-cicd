import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FormatAlignCenterRoundedIcon from "@mui/icons-material/FormatAlignCenterRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import React from "react";

const responsiveIcon = {
  fontSize: {
    xs: "1.4rem",
    sm: "1.5rem",
  },
  mr: 2,
};
const Writing = [
  [
    [
      <SummarizeRoundedIcon sx={{ ...responsiveIcon }}></SummarizeRoundedIcon>,
      "Summarize Written text",
      "/user-swt",
      "/admin/swt-we",
      "/admin/swt-we/add",
      "/admin/swt-we/edit/",
      "/score/swt",
      "/swt/test",
      "SWT, ESSAY & Email",
    ],
    [
      <FormatAlignCenterRoundedIcon
        sx={{ ...responsiveIcon }}
      ></FormatAlignCenterRoundedIcon>,
      "ESSAY",
      "/user-we",
      "common",
      "/admin/we/add",
      "/admin/we/edit/",
      "common",
      "/we/test",
    ],
  ],

  [
    "Writing",
    "",
    <DriveFileRenameOutlineIcon
      sx={{ fontSize: "2rem", ml: "0.3rem" }}
    ></DriveFileRenameOutlineIcon>,
  ],
];

export default Writing;
