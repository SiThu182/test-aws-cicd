import { Drawer } from "@mui/material";
import React from "react";

const DesktopDrawer = React.memo((props) => {
  let drawerWidth = 250;

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "block",
          },
          height: "100vh",
          paddingBottom: 0.5,
          "&.MuiDrawer-root": {
            backgroundColor: "grey",
          },

          "& .MuiDrawer-paper": {
            position: "relative",
            whiteSpace: "nowrap",
            width: drawerWidth,
            backgroundColor: "rgb(56,68,80)",

            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.enteringScreen,
              }),
            boxSizing: "border-box",
            ...(!props.open && {
              overflowX: "hidden",
              transition: (theme) =>
                theme.transitions.create("width", {
                  easing: theme.transitions.easing.easeIn,
                  duration: theme.transitions.duration.leavingScreen,
                }),
              width: (theme) => ({
                xs: theme.spacing(0),
                sm: theme.spacing(5),
                md: theme.spacing(9),
              }),
            }),
          },
        }}
        open={props.open}
      >
        {props.drawer}
      </Drawer>
    </>
  );
});

export default DesktopDrawer;
