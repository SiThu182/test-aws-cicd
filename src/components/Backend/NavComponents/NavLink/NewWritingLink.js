import React from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FormatAlignCenterRoundedIcon from "@mui/icons-material/FormatAlignCenterRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import EmailIcon from "@mui/icons-material/Email";
const responsiveIcon = {
  fontSize: {
    xs: "1.4rem",
    sm: "1.5rem",
  },
  mr: 2,
};

const SWTIcon = () => {
  return (
    <SummarizeRoundedIcon sx={{ ...responsiveIcon }}></SummarizeRoundedIcon>
  );
};

const WEIcon = () => {
  return (
    <FormatAlignCenterRoundedIcon
      sx={{ ...responsiveIcon }}
    ></FormatAlignCenterRoundedIcon>
  );
};

const MailIcon = () => {
  return <EmailIcon sx={{ ...responsiveIcon }}></EmailIcon>;
};

export const practiceWritingDropdownList = [
  {
    icon: <SWTIcon />,
    label: "Summarize Written text",
    route: "/swt/test",
  },
  {
    icon: <WEIcon />,
    label: "ESSAY",
    PTECore: false,
    route: "/we/test",
  },
  {
    icon: <MailIcon />,
    label: "Write Email",
    PTECore: true,
    route: "/wemail/test",
  },
];

export const adminWritingDropdownList = [
  {
    icon: <SWTIcon />,
    label: "SWT, ESSAY & Email",
    adminRouteExist: true,
    route: "/admin/swt-we",
    matchRoutes: ["/admin/swt-we", "/admin/swt-we/add", "/admin/swt-we/edit/"],
  },
];

export const writingDropDownParent = {
  label: "Writing",
  icon: (
    <DriveFileRenameOutlineIcon
      sx={{ fontSize: "2rem", ml: "0.3rem" }}
    ></DriveFileRenameOutlineIcon>
  ),
};
