import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import RuleIcon from "@mui/icons-material/Rule";
import SegmentIcon from "@mui/icons-material/Segment";
import TypeSpecimenIcon from "@mui/icons-material/TypeSpecimen";
import React from "react";

const responsiveIcon = {
  fontSize: {
    xs: "1.4rem",
    sm: "1.5rem",
  },
  mr: 1,
};
const Reading = [
  [
    [
      <RuleIcon sx={{ ...responsiveIcon }}></RuleIcon>,
      "MC Single Answer",
      "/user-r-mc-sa",
      "/admin/r-mc-sa",
      "/admin/r-mc-sa/add",
      "/admin/r-mc-sa/edit/",
      "/score/r-mc-sa",
      "/r-mc-sa/test",
      "Multiple Choice",
    ],
    [
      <ChecklistRtlIcon sx={{ ...responsiveIcon }}></ChecklistRtlIcon>,
      "MC Multiple Answer",
      "/user-r-mc-ma",
      "common",
      "/admin/r-mc-ma/add",
      "/admin/r-mc-ma/edit/",
      "common",
      "/r-mc-ma/test",
    ],
    [
      <TypeSpecimenIcon sx={{ ...responsiveIcon, mt: 0.2 }}></TypeSpecimenIcon>,
      "Fill in the Blank",
      "/user-R-mc-fib",
      "/admin/r-fib",
      "/admin/r-fib/add",
      "/admin/r-fib/edit/",
      "common",
      "/r-fib/test",
      "FIB & R&W FIB",
    ],

    [
      <SegmentIcon sx={{ ...responsiveIcon, mt: 0.2 }}></SegmentIcon>,
      "R&W Fill in the Blank",
      "/user-mc-hiw",
      "common",
      "/admin/r-r&wfib/add",
      "/admin/r-r&wfib/edit/",
      "common",
      "/r-r&wfib/test",
    ],

    [
      <SegmentIcon sx={{ ...responsiveIcon, mt: 0.2 }}></SegmentIcon>,
      "Reorder Paragraph",
      "/user-rop",
      "/admin/r-rop",
      "/admin/r-rop/add",
      "/admin/r-rop/edit/",
      "common",
      "/r-rop/test",
      "Reorder Paragraph",
 
    ],
  ],
  [
    "Reading",
    "",
    <AutoStoriesIcon sx={{ fontSize: "2rem", ml: "0.3rem" }}></AutoStoriesIcon>,
  ],
];

export default Reading;
