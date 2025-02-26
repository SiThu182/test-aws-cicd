import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

import Admin from "./Admin";
import Blog from "./Blog";
import Listening from "./Listening";
import MockTest from "./MockTest";
import OnlineCourse from "./OnlineCourse";
import Reading from "./Reading";
import SideNav from "./SideNav";
import Speaking from "./Speaking";
import Subscription from "./Subscription";
import Writing from "./Writing";
import VideoRecording from "./VideoRecording";
import Help from "./Help";

export default function AdminSideNav(props) {
  const [open, setOpen] = React.useState(false);
  const pathName = window.location.pathname;

  let regProp =
    / \/admin\/ra|\/admin\/rs|\/admin\/di|\/admin\/rl|\/admin\/asq\/|\/admin\/ra|\/admin\/rs|\/admin\/di|\/admin\/rl|\/admin\/asq|\/admin\/asq\/add|\/admin\/ra\/edit|\/admin\/rs\/edit|\/admin\/di\/edit|\/admin\/rl\/edit|\/admin\/asq\/edit\//;

  let titlePath = regProp.test(pathName);

  let listeningRegProp =
    /\/admin\/mc-sa|\/admin\/sst|\/admin\/fib|\/admin\/mc-sa\/add|\/admin\/sst\/add|\/admin\/fib\/add|\/admin\/mc-sa\/edit|\/admin\/sst\/edit|\/admin\/fib\/edit\//;

  let listeningPath = listeningRegProp.test(pathName);

  let readingRegProp =
    /\/admin\/r-mc-sa|\/admin\/r-fib|\/admin\/r-rop|\/admin\/r-mc-sa\/add|\/admin\/r-fib\/add|\/admin\/r-rop\/add|\/admin\/r-mc-sa\/edit|\/admin\/r-rop\/edit|\/admin\/r-fib\/edit\//;

  let readingPath = readingRegProp.test(pathName);

  let writingRegProp =
    /\/admin\/we|\/admin\/swt|\/admin\/we\/add|\/admin\/swt\/add|\/admin\/we\/edit|\/admin\/swt\/edit\//;

  let writingPath = writingRegProp.test(pathName);

  let mockTestRegProp =
    /\/admin\/mocktestlist|\/admin\/mocktestlist\/add|\/admin\/mocktestlist\/edit/;
  let mockTestPath = mockTestRegProp.test(pathName);

  let courseRegProp =
    /\/admin\/course|\/admin\/course\/add|\/admin\/course\/edit\//;
  let coursePath = courseRegProp.test(pathName);

  let blogRegProp = /\/admin\/blog|\/admin\/blog\/add|\/admin\/blog\/edit\//;
  let blogPath = blogRegProp.test(pathName);
  // let courseRegisterRegProp = /\/admin\/register\/course/;
  // let courseRegisterPath = courseRegisterRegProp.test(pathName);

  let subscriptionRegProp =
    /\/admin\/subscription|\/admin\/subscription\/add|\/admin\/subscription\/edit/;
  let subscriptionPath = subscriptionRegProp.test(pathName);

  let videoRecordingProp =
    /\/admin\/video-recording|\/admin\/video-recording\/add|\/admin\/video-recording\/edit\//;
  let videoRecordingPath = videoRecordingProp.test(pathName);
  const AdminListItem = {
    "&:hover": {
      "& .MuiTypography-root,& .AdminIcon,& .MuiSvgIcon-root": {
        color: "yellow",
      },

      color: "yellow",
      backgroundColor: "rgb(7,106,225)",
      borderRadius: "1rem",
    },
    mx: props.open ? 2 : 0.5,
    my: 1,
    px: props.open ? 0.5 : 1,
    py: 0,
  };

  const AdminIcon = {
    color: "#fff",
    margin: 0,
    padding: 0,

    "&:hover": {
      color: "yellow",
    },
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        disableRipple
        sx={{
          ...AdminListItem,
          // border: 1,
          // borderColor: "#000",
          borderRadius: "1rem",
          boxShadow: 5,
          backgroundColor:
            titlePath ||
            listeningPath ||
            readingPath ||
            writingPath ||
            mockTestPath ||
            subscriptionPath ||
            coursePath ||
            videoRecordingPath
              ? // courseRegisterPath
                "rgb(7,106,225)"
              : "",
        }}
        onClick={handleClick}
      >
        <ListItemIcon sx={{ ...AdminIcon }} className="AdminIcon ">
          {Admin[0][2]}
        </ListItemIcon>
        <ListItemText
          primary="Data Entry"
          primaryTypographyProps={{ fontSize: "1.1rem", fontWeight: "700" }}
          sx={{
            display: props.open ? "block" : "none",
            color: "#fff",
          }}
        />
        <KeyboardArrowDownRoundedIcon
          sx={{
            display: open ? "none" : "block",
            fontSize: "1.5rem",
            position: "absolute",
            right: props.open ? 9 : 0,
            color: "white",
            backgroundColor: "",
            borderRadius: "2rem",
            boxShadow: "5",
            top: 6,
          }}
          onClick={handleClick}
        ></KeyboardArrowDownRoundedIcon>
        <KeyboardArrowUpIcon
          sx={{
            display: open ? "block" : "none",
            fontSize: "1.5rem",
            position: "absolute",
            right: props.open ? 9 : 0,
            color: "white",
            backgroundColor: "",
            borderRadius: "2rem",
            boxShadow: "5",
            top: 6,
          }}
          onClick={handleClick}
        ></KeyboardArrowUpIcon>
        {/* <ExpandMore
          className="ExpandIcon"
          sx={{
            color: "#fff",
            position: "absolute",
            right: props.open ? 10 : -1.5,
          }}
          onClick={handleClick}
        /> */}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{ m: 0, p: 0, width: "100%" }}
      >
        <List component="div" disablePadding sx={{ m: 0, p: 0, width: "100%" }}>
          {/* Blog nav start */}
          <SideNav
            NavTitle={Help[0]}
            NavLink={Help[1]}
            open={props.open}
            section="admin"
            currentPath={blogPath}
          ></SideNav>
          {/*Blog  nav end */}
        </List>
      </Collapse>
    </>
  );
}
