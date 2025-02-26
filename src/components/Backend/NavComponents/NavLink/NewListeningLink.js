import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import React from "react";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
//import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
// import ChecklistIcon from "@mui/icons-material/Checklist";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import EditNoteIcon from "@mui/icons-material/EditNote";
//import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import MessageIcon from "@mui/icons-material/Message";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import RuleIcon from "@mui/icons-material/Rule";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
const responsiveIcon = {
  fontSize: {
    xs: "1.4rem",
    sm: "1.5rem",
  },
  mr: 1,
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

export const listeningDropDownParent = {
  label: "Listening",
  icon: <GraphicEqIcon sx={{ fontSize: "2rem", ml: "0.3rem" }}></GraphicEqIcon>,
};

const SMCIcon = () => {
  return <RuleIcon sx={{ ...responsiveIcon }}></RuleIcon>;
};

const MCIcon = () => {
  return <ChecklistRtlIcon sx={{ ...responsiveIcon }}></ChecklistRtlIcon>;
};

const HCSIcon = () => {
  return (
    <PlaylistAddCheckIcon sx={{ ...responsiveIcon }}></PlaylistAddCheckIcon>
  );
};

const SMWIcon = () => {
  return <SpellcheckIcon sx={{ ...responsiveIcon, mt: 0.2 }}></SpellcheckIcon>;
};

const FIBIcon = () => {
  return (
    <FormatColorTextIcon
      sx={{ ...responsiveIcon, mt: 0.2 }}
    ></FormatColorTextIcon>
  );
};

const HIWIcon = () => {
  return <QuestionAnswerIcon sx={{ ...responsiveIcon }}></QuestionAnswerIcon>;
};

const SSTIcon = () => {
  return <MessageIcon sx={{ ...responsiveIcon, mt: 0.2 }}></MessageIcon>;
};

const WFDIcon = () => {
  return <EditNoteIcon sx={{ ...responsiveIcon, mt: 0.2 }}></EditNoteIcon>;
};
export const practiceListeningDropdownList = [
  {
    icon: <SMCIcon />,
    label: "MC Single Answer",
    route: "/mc-sa/test",
  },
  {
    icon: <MCIcon />,
    label: "MC Multiple Answer",
    route: "/mc-ma/test",
  },
  {
    icon: <HCSIcon />,
    label: "Highlight Correct Summary",
    PTECore: false,
    route: "/hcs/test",
  },
  {
    icon: <SMWIcon />,
    label: "Select Missing Word",
    route: "/smw/test",
  },
  {
    icon: <WFDIcon />,
    label: "Write From Dictation",
    route: "/wfd/test",
  },
  {
    icon: <SSTIcon />,
    label: "Summarize spoken text",
    route: "/sst/test",
  },
  {
    icon: <HIWIcon />,
    label: "Highlight Incorrect Words",
    route: "/hiw/test",
  },
  {
    icon: <FIBIcon />,
    label: "Fill in the Blank",
    route: "/fib/test",
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

export const adminListeningDropdownList = [
  {
    icon: <SMCIcon />,
    label: "Multiple Choice",
    route: "admin/mc-sa",
    adminRouteExist: true,
    matchRoutes: ["/admin/mc-sa", "/admin/mc-sa/add", "/admin/mc-sa/edit/"],
  },
  {
    icon: <SSTIcon />,
    label: "SST & WFD",
    adminRouteExist: true,
    route: "/admin/sst",
    matchRoutes: ["/admin/sst", "/admin/sst/add", "/admin/sst/edit/"],
  },
  {
    icon: <FIBIcon />,
    label: "FIB & HIW",
    adminRouteExist: true,
    PTECore: false,
    route: "/admin/fib",
    matchRoutes: ["/admin/fib", "/admin/fib/add", "/admin/fib/edit/"],
  },
];
