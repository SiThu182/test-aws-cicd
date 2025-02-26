import LoyaltyIcon from "@mui/icons-material/Loyalty";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import LocalPlayIcon from "@mui/icons-material/LocalPlay";
const responsiveIcon = {
  fontSize: {
    xs: "1.4rem",
    sm: "1.5rem",
  },
  mr: 2,
};

export const trialAdminDropDownParent = {
  label: "Trial & Promotion",
  icon: <LocalPlayIcon sx={{ fontSize: "2rem", ml: "0.3rem" }}></LocalPlayIcon>,
};

export const trialAdminDropdownList = [
  {
    icon: <LoyaltyIcon sx={{ ...responsiveIcon }}></LoyaltyIcon>,
    label: "Trial & Promotion",
    admin: "/admin/trial-plan",
    adminEdit: "/admin/trial-plan/edit/",
  },
  // {
  //   icon: <LoyaltyIcon sx={{ ...responsiveIcon }}></LoyaltyIcon>,
  //   label: "Promotion",
  //   admin: "/admin/promotion-plan",
  //   adminEdit: "/admin/promotion-plan/edit/",
  // },
];
