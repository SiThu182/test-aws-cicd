import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
// import ChecklistIcon from "@mui/icons-material/Checklist";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import MessageIcon from "@mui/icons-material/Message";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import RuleIcon from "@mui/icons-material/Rule";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import React from "react";

const responsiveIcon = {
  fontSize: {
    xs: "1.4rem",
    sm: "1.5rem",
  },
  mr: 1,
};
const Listening = [
  [
    [
      <RuleIcon sx={{ ...responsiveIcon }}></RuleIcon>,
      "MC Single Answer",
      "/user-mc-sa",
      "/admin/mc-sa",
      "/admin/mc-sa/add",
      "/admin/mc-sa/edit/",
      "/score/mc-sa",
      "/mc-sa/test",
      "Multiple Choice",
    ],
    [
      <ChecklistRtlIcon sx={{ ...responsiveIcon }}></ChecklistRtlIcon>,
      "MC Multiple Answer",
      "/user-mc-ma",
      "common",
      "/admin/mc-ma/add",
      "/admin/mc-ma/edit/",
      "common",
      "/mc-ma/test",
    ],
    [
      <PlaylistAddCheckIcon sx={{ ...responsiveIcon }}></PlaylistAddCheckIcon>,
      "Highlight Correct Summary",
      "/user-mc-hcs",
      "common",
      "/admin/mc-hcs/add",
      "/admin/mc-hcs/edit/",
      "common",
      "/hcs/test",
    ],
    [
      <SpellcheckIcon sx={{ ...responsiveIcon, mt: 0.2 }}></SpellcheckIcon>,
      "Select Missing Word",
      "/user-mc-smw",
      "common",
      "/admin/mc-smw/add",
      "/admin/mc-smw/edit/",
      "common",
      "/smw/test",
    ],

    [
      <EditNoteIcon sx={{ ...responsiveIcon, mt: 0.2 }}></EditNoteIcon>,
      "Write from dictation",
      "/user-mc-wfd",
      "common",
      "/admin/mc-wfd/add",
      "/admin/mc-wfd/edit/",
      "common",
      "/wfd/test",
    ],

    [
      <MessageIcon sx={{ ...responsiveIcon, mt: 0.2 }}></MessageIcon>,
      "Summarize spoken text",
      "/user-mc-sst",
      "/admin/sst",
      "/admin/sst/add",
      "/admin/sst/edit/",
      "common",
      "/sst/test",
      // "score/sst-wfd",
      "SST & WFD",
    ],

    [
      <AutoFixHighIcon sx={{ ...responsiveIcon, mt: 0.2 }}></AutoFixHighIcon>,
      "Highlight Incorrect Words",
      "/user-mc-hiw",
      "common",
      "/admin/hiw/add",
      "/admin/hiw/edit/",
      "common",
      "/hiw/test",
    ],
    [
      <FormatColorTextIcon
        sx={{ ...responsiveIcon, mt: 0.2 }}
      ></FormatColorTextIcon>,
      "Fill in the Blank",
      "/user-mc-fib",
      "/admin/fib",
      "/admin/fib/add",
      "/admin/fib/edit/",
      "common",
      "/fib/test",
      "FIB & HIW",
    ],
    // [
    //   <RuleIcon sx={{ ...responsiveIcon }}></RuleIcon>,
    //   "Summary Spoken Text",
    //   "/user-ssw",
    //   "/admin/ssw",
    //   "/admin/ssw/add",
    //   "/admin/ssw/edit/",
    //   "/score/ssw",
    //   "/ssw/test",
    //   "/sst/test",
    // ],
  ],

  [
    "Listening",
    "",
    <GraphicEqIcon sx={{ fontSize: "2rem", ml: "0.3rem" }}></GraphicEqIcon>,
  ],
];

export default Listening;
