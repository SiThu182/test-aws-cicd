import { Drawer } from "@mui/material";
import React from "react";

const MobileDrawer = React.memo((props) => {
  const drawerWidth = 250;

  return (
    <>
      <Drawer
        variant="temporary"
        container={props.container}
        open={props.open}
        onClose={props.onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { sm: "block", md: "none" },
          overflowY: "scroll",
          overflowX: "hidden",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "rgb(56, 68, 80)",
          },
        }}
      >
        {props.drawer}
      </Drawer>
    </>
  );
});

export default MobileDrawer;
