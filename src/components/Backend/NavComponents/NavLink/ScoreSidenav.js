import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { Tooltip } from "@mui/material";
import Listening from "./Listening";
import MockTest from "./MockTest";
import Reading from "./Reading";
import Score from "./Score";
import SideNav from "./SideNav";
import Speaking from "./Speaking";
import Writing from "./Writing";

function ScoreSidenav(props) {
  const [open, setOpen] = React.useState(false);

  const pathName = window.location.pathname;

  let regProp = /\/score\/ra|\/score\/rs|\/score\/di|\/score\/rl|\/score\/asq/;

  let scorePath = regProp.test(pathName);

  let listeningProp = /\/score\/mc-sa/;
  let listeningScore = listeningProp.test(pathName);

  let readingProp = /\/score\/r-mc-sa/;
  let readingScore = readingProp.test(pathName);

  let writingProp = /\/score\/we|\/score\/swt/;
  let writingScore = writingProp.test(pathName);

  let mockTestProp = /\/score\/mocktest|\/detail\/\d+/;
  let mockTestScore = mockTestProp.test(pathName);

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
            scorePath ||
            listeningScore ||
            readingScore ||
            writingScore ||
            mockTestScore
              ? "rgb(7,106,225)"
              : "",
        }}
        onClick={handleClick}
      >
        <Tooltip title={!props.open ? "Score" : ""}>
          <ListItemIcon sx={{ ...AdminIcon }} className="AdminIcon">
            {Score[0][2]}
          </ListItemIcon>
        </Tooltip>
        <ListItemText
          primary="Score"
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
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{ m: 0, p: 0, width: "100%" }}
      >
        <List component="div" disablePadding sx={{ m: 0, p: 0, width: "100%" }}>
          {/* speaking nav start */}
          <SideNav
            NavLink={Speaking[0]}
            NavTitle={Speaking[1][1]}
            section="score"
            currentPath={scorePath}
            open={props.open}
          ></SideNav>
          {/* speaking nav end */}
          {/* writing nav start */}
          <SideNav
            NavLink={Writing[0]}
            NavTitle={Writing[1]}
            section="score"
            open={props.open}
            currentPath={writingScore}
          ></SideNav>
          {/* writing nav end */}

          {/* reading nav start */}
          <SideNav
            NavLink={Reading[0]}
            NavTitle={Reading[1]}
            open={props.open}
            section="score"
            currentPath={readingScore}
          ></SideNav>
          {/* reading nav end */}

          {/* listening nav start */}
          <SideNav
            NavLink={Listening[0]}
            NavTitle={Listening[1]}
            open={props.open}
            section="score"
            currentPath={listeningScore}
          ></SideNav>
          {/*mocktest  nav end */}
          <SideNav
            NavLink={MockTest[0]}
            NavTitle={MockTest[1]}
            open={props.open}
            section="score"
            currentPath={mockTestScore}
          ></SideNav>
          {/*mocktest  nav end */}
        </List>
      </Collapse>
    </>
  );
}

export default ScoreSidenav;
