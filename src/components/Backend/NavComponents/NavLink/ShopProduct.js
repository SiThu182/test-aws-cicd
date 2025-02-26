import React from "react";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
const responsiveIcon = {
  fontSize: {
    xs: "1.4rem",
    sm: "1.5rem",
  },
  mr: 2,
};

export const shopProductDropDownParent = {
  label: "Shop Product",
  icon: <CategoryIcon sx={{ fontSize: "2rem", ml: "0.3rem" }}></CategoryIcon>,
};

export const shopProductAdmin = [
  {
    label: "Shop Product",
    icon: <Inventory2Icon sx={{ ...responsiveIcon }}></Inventory2Icon>,
    admin: "/admin/shop-product",
    detail: "/admin/shop-product-detail",
  },
];
