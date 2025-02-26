import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import PanoramaIcon from "@mui/icons-material/Panorama";
import React from "react";
const responsiveIcon = {
  fontSize: {
    xs: "1.4rem",
    sm: "1.5rem",
  },
  mr: 2,
};

export const bannerDropdownParent = {
  label: "Banner",
  icon: <PanoramaIcon sx={{ fontSize: "2rem", ml: "0.3rem" }}></PanoramaIcon>,
};
export const  bannerAdmin= [
  {
    icon: <ViewCarouselIcon sx={{ ...responsiveIcon }}></ViewCarouselIcon>,
    label: "Banner",
    adminRouteExist: true,
    admin: "/admin/banner",
    adminAdd: "/admin/banner/add",
    adminEdit: "/admin/banner/edit",
  },
];

