import React from "react";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DiscountIcon from "@mui/icons-material/Discount";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
const responsiveIcon = {
  fontSize: {
    xs: "1.4rem",
    sm: "1.5rem",
  },
  mr: 2,
};

export const discountDropDownParent = {
  label: "Discount",
  icon: <DiscountIcon sx={{ fontSize: "2rem", ml: "0.3rem" }}></DiscountIcon>,
};

export const discountAdmin = [
  {
    label: "Discount ",
    icon: <Inventory2Icon sx={{ ...responsiveIcon }}></Inventory2Icon>,
    admin: "/admin/discount",
    detail: "/admin/discount-detail",
  },
  {
    label: "Coupon",
    icon: (
      <ConfirmationNumberIcon
        sx={{ ...responsiveIcon }}
      ></ConfirmationNumberIcon>
    ),
    admin: "/admin/coupon",
    detail: "/admin/coupon-detail",
  },
];
