import React from "react";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import RuleIcon from "@mui/icons-material/Rule";
import SegmentIcon from "@mui/icons-material/Segment";
import TypeSpecimenIcon from "@mui/icons-material/TypeSpecimen";
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



const RSMCIcon = () => {
  return <RuleIcon sx={{ ...responsiveIcon }}></RuleIcon>;
};

const RMCIcon = () => {
  return <ChecklistRtlIcon sx={{ ...responsiveIcon }}></ChecklistRtlIcon>;
};

const RFIBIcon = () => {
  return (
    <TypeSpecimenIcon sx={{ ...responsiveIcon, mt: 0.2 }}></TypeSpecimenIcon>
  );
};

const ROPIcon = () => {
  return <SegmentIcon sx={{ ...responsiveIcon, mt: 0.2 }}></SegmentIcon>;
};

const RWFIBIcon = () => {
  return <SegmentIcon sx={{ ...responsiveIcon, mt: 0.2 }}></SegmentIcon>;
};

export const practiceReadingDropdownList = [
  {
    icon: <RSMCIcon />,
    label: "MC Single Answer",
    route: "/r-mc-sa/test",
  },
  {
    icon: <RMCIcon />,
    label: "MC Multiple Answer",
    route: "/r-mc-ma/test",
  },
  {
    icon: <RFIBIcon />,
    label: "Fill in the Blank",
    route: "/r-fib/test",
  },
  {
    icon: <RWFIBIcon />,
    label: "R&W Fill in the Blank",
    route: "/r-r&wfib/test",
  },
  {
    icon: <ROPIcon />,
    label: "Reorder Paragraph",
    route: "/r-rop/test",
  },
];

export const adminReadingDropdownList = [
  {
    icon: <RSMCIcon />,
    label: "Multiple Choice",
    adminRouteExist: true,
    route: "/admin/r-mc-sa",
    matchRoutes: [
      "/admin/r-mc-sa/add",
      "/admin/r-mc-sa/edit/",
      "/admin/r-mc-sa/edit/",
    ],
  },
  {
    icon: <RFIBIcon />,
    label: "RFIB & RWFIB",
    adminRouteExist: true,
    route: "/admin/rfib",
    matchRoutes: ["/admin/rfib/add", "/admin/rfib/edit", "/admin/rfib"],
  },
  {
    icon: <ROPIcon />,
    label: "Reorder Paragraph",
    adminRouteExist: true,
    PTECore: false,
    route: "/admin/rop",
    matchRoutes: ["/admin/rop/add", "/admin/rop/edit", "/admin/rop"],
  },
];

export const readingDropDownParent = {
  label: "Reading",
  icon: (
    <AutoStoriesIcon sx={{ fontSize: "2rem", ml: "0.3rem" }}></AutoStoriesIcon>
  ),
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
