import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import HelpIcon from "@mui/icons-material/Help";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import React from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import InfoIcon from "@mui/icons-material/Info";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ContactMailIcon from "@mui/icons-material/ContactMail";
const responsiveIcon = {
  fontSize: {
    xs: "1.4rem",
    sm: "1.5rem",
  },
  mr: 2,
};

export const materialDropDownParent = {
  label: "Materials",
  icon: <ListAltIcon sx={{ fontSize: "2rem", ml: "0.3rem" }}></ListAltIcon>,
};

export const feedbackDropDownParent = {
  label: "Feedback",
  icon: (
    <ThumbUpAltIcon sx={{ fontSize: "2rem", ml: "0.3rem" }}></ThumbUpAltIcon>
  ),
};

export const feedbackAdmin = [
  {
    label: "Feedback",
    icon: <DynamicFormIcon sx={{ ...responsiveIcon }}></DynamicFormIcon>,
    admin: "/admin/feedback",
    detail: "/admin/detail",
  },
  {
    label: "User Feedback",
    icon: <ContactMailIcon sx={{ ...responsiveIcon }}></ContactMailIcon>,
    admin: "/admin/user-feedback",
    detail: "/admin/detail",
  },
];

export const materialAdmin = [
  {
    icon: <PictureAsPdfIcon sx={{ ...responsiveIcon }}></PictureAsPdfIcon>,
    label: "Materials Download",
    adminRouteExist: true,
    admin: "/admin/materials-download",
    adminAdd: "/admin/materials-download/add",
    adminEdit: "/admin/materials-download/edit",
  },
];

export const helpUser = [
  {
    icon: <PictureAsPdfIcon sx={{ ...responsiveIcon }}></PictureAsPdfIcon>,
    label: "Materials Download",
    route: "/dashboard/materials-download",
  },
  {
    icon: <DynamicFormIcon sx={{ ...responsiveIcon }}></DynamicFormIcon>,
    label: "Q & A",
    route: "/dashboard/feedback",
  },
];

export const supportDropDownParent = {
  label: "Support",
  icon: <InfoIcon sx={{ fontSize: "2rem", ml: "0.3rem" }}></InfoIcon>,
};

export const supportDropdownList = [
  {
    icon: <HelpIcon sx={{ ...responsiveIcon }}></HelpIcon>,
    label: "Q & A",
    route: "/dashboard/question-and-answer",
  },
  {
    icon: <DynamicFormIcon sx={{ ...responsiveIcon }}></DynamicFormIcon>,
    label: "Feedback",
    route: "/dashboard/feedback",
  },
];

export const materialParent = {
  label: "Materials",
  route: "/dashboard/materials-download",
  icon: (
    <PictureAsPdfIcon
      sx={{ fontSize: "2rem", ml: "0.3rem" }}
    ></PictureAsPdfIcon>
  ),
};
