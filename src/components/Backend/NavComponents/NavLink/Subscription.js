import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SellIcon from "@mui/icons-material/Sell";
import StyleIcon from "@mui/icons-material/Style";
import React from "react";

const responsiveIcon = {
  fontSize: {
    xs: "1.4rem",
    sm: "1.5rem",
  },
  mr: 1,
};

const Subscription = [
  [
    [
      <StyleIcon sx={{ ...responsiveIcon }}></StyleIcon>,
      "Subscription",
      "",
      "/admin/subscription",
      "/admin/subscription/add",
      "/admin/subscription/edit/",
    ],
    [
      <RocketLaunchIcon sx={{ ...responsiveIcon }}></RocketLaunchIcon>,
      "Training Package",
      "",
      "/admin/training",
      "/admin/training/add",
      "/admin/training/edit/",
    ],
  ],
  [
    "Subscription",
    "",
    <SellIcon sx={{ fontSize: "2rem", ml: "0.3rem" }}></SellIcon>,
  ],
];

export default Subscription;

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

export const subscriptionUser = [
  {
    icon: <SellIcon sx={{ ...responsiveIcon }}></SellIcon>,
    label: "Subscription plan",
    route: "/user/subscription-plan",
  },
  {
    icon: <RocketLaunchIcon sx={{ ...responsiveIcon }}></RocketLaunchIcon>,
    label: "Training Package",
    route: "/user/training-package",
  },
];

export const subscriptionUserParent = {
  label: "Subscription",
  icon: <StyleIcon sx={{ fontSize: "2rem", ml: "0.3rem" }}></StyleIcon>,
};
