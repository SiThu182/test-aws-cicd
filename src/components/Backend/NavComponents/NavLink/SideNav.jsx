// icon
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Collapse,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavContext } from "../../../Layout/Backend/Layout";

const SideNav = React.memo((props) => {
  const {
    NavLink = null,
    NavTitle,
    section,
    currentPath,
    DropDownParent = null,
    DropDownList = null,
  } = props;
  const [listOpen, setlistOpen] = useState(false);
  const { pteCore } = useContext(NavContext);
  const handleClick = (e) => {
    e.stopPropagation();
    setlistOpen(!listOpen);
  };
  const navigate = useNavigate();
  let [active, setActive] = useState(false);

  function clickHandler() {
    setActive((active = !active));
  }
  const postId = useParams();

  //css value for Parent link css style
  const linkStyle = {
    justifyContent: props.open ? "initial" : "center",

    pr: props.open ? 2 : 0.5,
    pl: props.open ? 2 : 0.5,
    py: 0,
    textDecoration: "none",
    display: "block",
  };

  const linkIconStyle = {
    color: "#fff",
    mr: props.open ? 2 : 0,
    pl: props.open ? 0 : 1,
    width: "100%",
    borderRadius: "1rem",
    "&:hover": {
      "& .linkText": {
        color: "yellow",
      },
      color: "yellow",
      backgroundColor: "rgb(7,106,225)",
      // borderRadius: "1rem",
    },
  };

  const linkTextStyle = {
    color: "#fff",
    "&:hover": {
      color: "yellow",
    },
  };

  const linkText = {
    fontSize: "1rem",
    fontWeight: 600,
    pl: 1.5,
  };
  // Parent link css style
  //css value for list item inside parent dropdown
  const listItemStyle = {
    width: "100%",
    mr: props.open ? 3 : 0,
    // backgroundColor: "#000",
    border: "1px solid black",
    borderRadius: "1rem",
    my: "0.1rem",
    boxShadow: 5,
    color: "#fff",
    pl: 2,
    justifyContent: "center",
    "&:hover": {
      color: "yellow",
    },
  };

  const listItemLink = {
    justifyContent: props.open ? "initial" : "center",
    mr: props.open ? 0 : 2,
    textDecoration: "none",
    display: "block",
  };
  const textStyle = {
    display: props.open ? "inline" : "none",
    fontSize: "0.1rem",
  };

  const responsiveText = {
    fontSize: {
      xs: "12px",
      sm: "13.5px",
    },
    fontWeight: 520,
  };

  const doNothing = () => {};

  const reloadAndClearCache = () => {
    // Append a timestamp or a random value as a query parameter
    const cacheBuster = new Date().getTime(); // Timestamp as an example

    // Append the cacheBuster to the URL
    const newUrl =
      window.location.href +
      (window.location.href.includes("?") ? "&" : "?") +
      "cacheBuster=" +
      cacheBuster;

    // Reload the page with the updated URL
    window.location.href = newUrl;
  };

  // list item inside parent dropdown
  //careful about others section which is one layer with different icon so it use different index than others.


  return (
    <>
      {/* <SpeakingNav></SpeakingNav> */}

      <ListItem
        disablePadding
        sx={{
          display: "block",
          overflowX: "hidden",
        }}
      >
        <ListItemButton
          sx={{ ...linkStyle }}
          onClick={() =>
            DropDownList === null &&
            (NavTitle === undefined || NavTitle === null)
              ? section === "reload"
                ? reloadAndClearCache()
                : navigate(DropDownParent.route)
              : (DropDownList !== "" && DropDownList !== null) ||
                NavTitle[1] === ""
              ? handleClick
              : section === "others"
              ? navigate(NavTitle[4])
              : navigate(NavTitle[1])
          }
          disableRipple
        >
          <Tooltip
            placement="right"
            title={
              !props.open
                ? section !== "user" &&
                  section !== "practice" &&
                  section !== "helpAdmin" &&
                  section !== "reload"
                  ? NavTitle[0]
                  : DropDownParent.label
                : ""
            }
          >
            <ListItemIcon
              sx={{
                ...linkIconStyle,
                my: "0.1rem",
                boxShadow: 5,
              }}
              onClick={
                DropDownList !== null ||
                (NavTitle !== null && NavTitle?.[1] === "")
                  ? handleClick
                  : doNothing
              }
              className={
                currentPath === true //   "btn-blue"
                  ? "btn-blue"
                  : ""
              }
            >
              {section === "others"
                ? NavTitle[3]
                : section !== "user" &&
                  section !== "practice" &&
                  section !== "helpAdmin" &&
                  section !== "reload"
                ? NavTitle[2]
                : ""}
              {section === "user" ||
              section === "practice" ||
              section === "helpAdmin" ||
              section === "reload"
                ? DropDownParent.icon
                : ""}

              <Link
                component={RouterLink}
                className="linkText"
                underline="none"
                sx={{
                  ...linkTextStyle,
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    ...linkText,
                    width: "100%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                  primary={
                    section !== "user" &&
                    section !== "practice" &&
                    section !== "helpAdmin" &&
                    section !== "reload"
                      ? NavTitle[0]
                      : DropDownParent.label
                  }
                  sx={{ display: props.open ? "block" : "none" }}
                />
              </Link>

              {/* one level or  submenu */}
              {(NavLink !== null || DropDownList !== null) && (
                <>
                  <KeyboardArrowDownRoundedIcon
                    sx={{
                      display: listOpen ? "none" : "block",
                      fontSize: "1.5rem",
                      position: "absolute",
                      right: props.open ? 25 : 2,
                      backgroundColor: "",
                      borderRadius: "2rem",
                      boxShadow: "5",
                      top: 6,
                    }}
                  ></KeyboardArrowDownRoundedIcon>
                  <KeyboardArrowUpIcon
                    sx={{
                      display: listOpen ? "block" : "none",
                      fontSize: "1.5rem",
                      position: "absolute",
                      right: props.open ? 25 : 2,
                      backgroundColor: "",
                      borderRadius: "2rem",
                      boxShadow: "5",
                      top: 6,
                    }}
                  ></KeyboardArrowUpIcon>
                </>
              )}
            </ListItemIcon>
          </Tooltip>

          {/* one level submenu */}
          {(NavLink !== null || DropDownList !== null) && (
            <>
              {section === "test" && (
                <Collapse
                  in={listOpen}
                  sx={{ overflowX: "hidden", pl: props.open ? 0 : 0.3 }}
                  timeout="auto"
                  unmountOnExit
                >
                  <List
                    component="div"
                    sx={{
                      height: "100%",
                      overflowX: "hidden",
                    }}
                    disablePadding
                  >
                    {NavLink.map((nav, index) => (
                      <Link
                        key={index}
                        component={RouterLink}
                        to={nav[7]}
                        onClick={() => {
                          // Admin === "admin"
                          //   ? navigate(nav[3])

                          clickHandler();
                        }}
                        sx={{
                          ...listItemLink,
                        }}
                      >
                        <Tooltip
                          placement="right"
                          title={!props.open ? nav[1] : ""}
                        >
                          <ListItemIcon
                            sx={{
                              ...listItemStyle,
                            }}
                            className={
                              window.location.pathname === nav[7]
                                ? //   (Admin === "admin" ? nav[3] : nav[2]) ||
                                  // window.location.pathname ===
                                  //   (Admin === "admin" ? nav[4] : nav[2]) ||
                                  // window.location.pathname ===
                                  //   (Admin === "admin" ? nav[5] + postId.id : nav[2])
                                  "btn-yellow"
                                : ""
                            }
                          >
                            {nav[0]}

                            <ListItemText
                              primaryTypographyProps={{
                                ...responsiveText,
                              }}
                              primary={nav[1]}
                              sx={{ ...textStyle }}
                            />
                          </ListItemIcon>
                        </Tooltip>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              )}
              {(section === "user" || section === "practice") && (
                <Collapse
                  in={listOpen}
                  sx={{ overflowX: "hidden", pl: props.open ? 0 : 0.3 }}
                  timeout="auto"
                  unmountOnExit
                >
                  <List
                    component="div"
                    sx={{
                      height: "100%",
                      overflowX: "hidden",
                    }}
                    disablePadding
                  >
                    {DropDownList.map((nav, index) => (
                      <Link
                        key={index}
                        component={RouterLink}
                        to={nav.route}
                        onClick={() => {
                          // Admin === "admin"
                          //   ? navigate(nav[3])

                          clickHandler();
                        }}
                        style={{
                          display: pteCore
                            ? nav.PTECore ||
                              nav?.PTECore === undefined ||
                              nav?.PTECore === null
                              ? "block"
                              : "none"
                            : nav.PTECore === true
                            ? "none"
                            : "block",
                        }}
                        sx={{
                          ...listItemLink,
                          position: "relative",

                          // "& .MuiLink-root": {
                          //   diplay: navContext.pteCore
                          //     ? nav.PTECore
                          //       ? "block"
                          //       : "none"
                          //     : nav.PTECore
                          //     ? "none"
                          //     : "block",
                          // },
                        }}
                      >
                        {nav.PTECore && (
                          <Box
                            sx={{
                              position: "absolute",
                              borderRadius: "1rem",
                              p: 0.2,
                              top: -4,
                              right: 0,
                              background: "red",

                              color: "white",
                              fontSize: "0.7rem",
                            }}
                          >
                            New
                          </Box>
                        )}

                        <Tooltip
                          placement="right"
                          title={!props.open ? nav.label : ""}
                        >
                          <ListItemIcon
                            sx={{
                              ...listItemStyle,
                            }}
                            className={
                              window.location.pathname === nav.route
                                ? //   (Admin === "admin" ? nav[3] : nav[2]) ||
                                  // window.location.pathname ===
                                  //   (Admin === "admin" ? nav[4] : nav[2]) ||
                                  // window.location.pathname ===
                                  //   (Admin === "admin" ? nav[5] + postId.id : nav[2])
                                  "btn-yellow"
                                : ""
                            }
                          >
                            {nav.icon}
                            <ListItemText
                              primaryTypographyProps={{
                                ...responsiveText,
                              }}
                              primary={nav.label}
                              sx={{ ...textStyle }}
                            />
                          </ListItemIcon>
                        </Tooltip>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              )}
              {section === "helpAdmin" && (
                <Collapse
                  in={listOpen}
                  sx={{ overflowX: "hidden", pl: props.open ? 0 : 0.3 }}
                  timeout="auto"
                  unmountOnExit
                >
                  <List
                    component="div"
                    sx={{
                      height: "100%",
                      overflowX: "hidden",
                    }}
                    disablePadding
                  >
                    {DropDownList.map((nav, index) => (
                      <Link
                        key={index}
                        component={RouterLink}
                        to={nav.admin}
                        onClick={() => {
                          clickHandler();
                        }}
                        sx={{
                          ...listItemLink,
                        }}
                      >
                        <Tooltip
                          placement="right"
                          title={!props.open ? nav.label : ""}
                        >
                          <ListItemIcon
                            sx={{
                              ...listItemStyle,
                            }}
                            className={
                              window.location.pathname === nav.adminAdd ||
                              window.location.pathname === nav.admin ||
                              window.location.pathname ===
                                nav?.detail + postId.id ||
                              window.location.pathname ===
                                nav.adminEdit + postId.id
                                ? "btn-yellow"
                                : ""
                            }
                          >
                            {nav.icon}

                            <ListItemText
                              primaryTypographyProps={{
                                ...responsiveText,
                              }}
                              primary={nav.label}
                              sx={{ ...textStyle }}
                            />
                          </ListItemIcon>
                        </Tooltip>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              )}

              {section === "admin" && (
                <Collapse
                  in={listOpen}
                  sx={{ overflowX: "hidden", pl: props.open ? 0 : 0.3 }}
                  timeout="auto"
                  unmountOnExit
                >
                  <List
                    component="div"
                    sx={{
                      height: "100%",
                      overflowX: "hidden",
                    }}
                    disablePadding
                  >
                    {NavLink.map(
                      (nav, index) =>
                        nav[3] !== "common" &&
                        nav[3] !== "" && (
                          <Link
                            key={index}
                            component={RouterLink}
                            to={nav[3]}
                            onClick={() => {
                              clickHandler();
                            }}
                            sx={{
                              ...listItemLink,
                            }}
                          >
                            <Tooltip
                              placement="right"
                              title={
                                !props.open
                                  ? nav[1] === "MC Single Answer" ||
                                    nav[1] === "Fill in the Blank" ||
                                    nav[1] === "Summarize spoken text" ||
                                    nav[1] === "Summarize Written text"
                                    ? nav[8]
                                    : nav[1]
                                  : ""
                              }
                            >
                              <ListItemIcon
                                sx={{
                                  ...listItemStyle,
                                }}
                                className={
                                  window.location.pathname === nav[3] ||
                                  window.location.pathname === nav[4] ||
                                  window.location.pathname ===
                                    nav[5] + postId.id
                                    ? "btn-yellow"
                                    : ""
                                }
                              >
                                {nav[0]}

                                <ListItemText
                                  primaryTypographyProps={{
                                    ...responsiveText,
                                  }}
                                  primary={
                                    nav[1] === "MC Single Answer" ||
                                    nav[1] === "Fill in the Blank" ||
                                    nav[1] === "Summarize spoken text" ||
                                    nav[1] === "Summarize Written text"
                                      ? nav[8]
                                      : nav[1]
                                  }
                                  sx={{ ...textStyle }}
                                />
                              </ListItemIcon>
                            </Tooltip>
                          </Link>
                        )
                    )}
                  </List>
                </Collapse>
              )}

              {section === "score" && (
                <Collapse
                  in={listOpen}
                  sx={{ overflowX: "hidden", pl: props.open ? 0 : 0.3 }}
                  timeout="auto"
                  unmountOnExit
                >
                  <List
                    component="div"
                    sx={{
                      height: "100%",
                      overflowX: "hidden",
                    }}
                    disablePadding
                  >
                    {NavLink.map(
                      (nav, index) =>
                        nav[6] !== "common" && (
                          <Link
                            key={index}
                            component={RouterLink}
                            to={nav[6]}
                            onClick={() => {
                              clickHandler();
                            }}
                            sx={{
                              ...listItemLink,
                            }}
                          >
                            <Tooltip
                              placement="right"
                              title={
                                !props.open
                                  ? nav[1] === "MC Single Answer" ||
                                    nav[1] === "Summarize Written text"
                                    ? nav[8]
                                    : nav[1]
                                  : ""
                              }
                            >
                              <ListItemIcon
                                sx={{
                                  ...listItemStyle,
                                }}
                                className={
                                  window.location.pathname === nav[6] ||
                                  (/\/score\/mocktest\/detail\/\d+/.test(
                                    window.location.pathname
                                  ) === true &&
                                    nav[6] === "/score/mocktest")
                                    ? "btn-yellow"
                                    : ""
                                }
                              >
                                {nav[0]}

                                <ListItemText
                                  primaryTypographyProps={{
                                    ...responsiveText,
                                  }}
                                  primary={
                                    nav[1] === "MC Single Answer" ||
                                    nav[1] === "Summarize Written text"
                                      ? nav[8]
                                      : nav[1]
                                  }
                                  sx={{ ...textStyle }}
                                />
                              </ListItemIcon>
                            </Tooltip>
                          </Link>
                        )
                    )}
                  </List>
                </Collapse>
              )}
              {section === "others" && (
                <Collapse
                  in={listOpen}
                  sx={{ overflowX: "hidden", pl: props.open ? 0 : 0.3 }}
                  timeout="auto"
                  unmountOnExit
                >
                  <List
                    component="div"
                    sx={{
                      height: "100%",
                      overflowX: "hidden",
                    }}
                    disablePadding
                  >
                    {NavLink.map((nav, index) => (
                      <Link
                        key={index}
                        component={RouterLink}
                        to={nav[7]}
                        onClick={() => {
                          // Admin === "admin"
                          //   ? navigate(nav[3])

                          clickHandler();
                        }}
                        sx={{
                          ...listItemLink,
                        }}
                      >
                        <Tooltip
                          placement="right"
                          title={!props.open ? nav[1] : ""}
                        >
                          <ListItemIcon
                            sx={{
                              ...listItemStyle,
                            }}
                            className={
                              window.location.pathname === nav[7]
                                ? //   (Admin === "admin" ? nav[3] : nav[2]) ||
                                  // window.location.pathname ===
                                  //   (Admin === "admin" ? nav[4] : nav[2]) ||
                                  // window.location.pathname ===
                                  //   (Admin === "admin" ? nav[5] + postId.id : nav[2])
                                  "btn-yellow"
                                : ""
                            }
                          >
                            {nav[0]}

                            <ListItemText
                              primaryTypographyProps={{
                                ...responsiveText,
                              }}
                              primary={nav[1]}
                              sx={{ ...textStyle }}
                            ></ListItemText>
                          </ListItemIcon>
                        </Tooltip>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              )}
            </>
          )}
        </ListItemButton>
      </ListItem>
    </>
  );
});

export default SideNav;
