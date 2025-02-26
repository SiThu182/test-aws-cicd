import React from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

function LightTooltip({ children, title }) {
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "white",
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: 2,
      fontSize: 11,
      border: "1px solid gray",
    },
  }));

  return (
    <LightTooltip
      sx={{
        "&.MuiTooltip-popper": {
          zIndex: "9999999 !important",
        },
      }}
      title={title}
    >
      {children}
    </LightTooltip>
  );
}

export default LightTooltip;
