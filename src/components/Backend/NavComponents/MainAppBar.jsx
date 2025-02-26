import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fetchUserAsync } from "../../../redux/thunk/Users";
import AccountMenu from "./AccountMenu";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import InfoIcon from "@mui/icons-material/Info";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { FetchUserGuideAsync } from "../../../redux/thunk/MaterialDownload";
function MainAppBar(props) {
  const { user } = useSelector((state) => state.user);
  const { systemError, systemErrorStatus } = useSelector(
    (state) => state.systemInfoAlert
  );
  const { userGuide, userGuideStatus } = useSelector((state) => state.material);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alertOpen, setAlertOpen] = useState(true);
  // const {user} = useSelector((state) => state.auth.users);
  const path = window.location.pathname;

  //isAuthenticated && navigate('/login')

  useEffect(() => {
    let Id = localStorage.getItem("userId");
    dispatch(fetchUserAsync(Id));
    dispatch(
      FetchUserGuideAsync({
        path: "download-user-guide",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (user !== null) {
      if (user?.data?.status === 2) {
        navigate("/account-deactivate");
      }
    }
  });
  const drawerWidth = 250;
  const appBarStyle = {
    backgroundColor: "#fff",
    zIndex: (theme) => theme.zIndex.drawer + 1,
    transition: (theme) =>
      theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    ...(props.open && {
      ml: { md: `${drawerWidth}px` },
      width: { md: `calc(100% - ${drawerWidth}px)` },
      transition: (theme) =>
        theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    }),
  };

  return (
    <>
      <AppBar
        // position="fixed"
        sx={{
          ...appBarStyle,

          "& .MuiToolbar-root ": {
            px: "24px",
            py: "2px",
            minHeight: "64px",
          },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.onClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{ color: "#000" }} />
          </IconButton>
          {/* <Link underline="none" href="/Layout/Dashboard">
            <Typography
              component="h1"
              variant="h6"
              color="#000"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {props.page}
            </Typography>
          </Link> */}
          <Box
            sx={{
              // backgroundColor: "#000",
              position: "absolute",
              display: "flex",
              gap: 2,
              alignItems: "center",
              right: {
                xs: "2rem",
                sm: "2rem",
                md: "2rem",
              },
              transition: "1s ease",

              color: "#000",
            }}
          >
            <Tooltip title="System info">
              <Button
                variant="contained"
                onClick={() => navigate("/admin/system-info-test")}
              >
                <ErrorOutlineIcon />
              </Button>
            </Tooltip>

            {path === "/admin/dashboard" ? (
              <>
                {userGuideStatus === "succeeded" && userGuide !== null && (
                  <a
                    href={
                      process.env.REACT_APP_BACKEND_URL +
                      "storage/" +
                      userGuide.url
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button
                      variant="contained"
                      sx={{
                        mr: 1,
                        boxShadow: 5,
                        display: {
                          xs: "none",
                          md: "flex",
                        },
                        alignItems: "center",
                      }}
                    >
                      <FolderSharedIcon
                        sx={{ color: "white" }}
                      ></FolderSharedIcon>
                      User Guide
                    </Button>
                  </a>
                )}

                <Button
                  sx={{
                    backgroundColor: "yellow",
                    mr: 1,
                    boxShadow: 5,
                    display: {
                      xs: "none",
                      md: "flex",
                    },
                    alignItems: "center",
                  }}
                  onClick={() => navigate("admin/subscription-shop")}
                >
                  <LocalGroceryStoreIcon
                    sx={{ color: "white" }}
                  ></LocalGroceryStoreIcon>
                  Shop
                </Button>
              </>
            ) : (
              ""
            )}
            <Box sx={{}}>
              <Collapse in={alertOpen}>
                {systemErrorStatus === 1 && systemError.length !== 0 && (
                  <Box
                    sx={{
                      mb: 2,
                      position: "absolute",
                      top: "4rem",
                      zIndex: 999,
                      right: "0.5rem",
                      width: "20rem",
                      display: "flex",
                      backgroundColor: "white",
                      boxShadow: 5,
                    }}
                  >
                    <Box sx={{ width: "90%" }}>
                      {systemError.map((e, i) => (
                        <Alert severity="error" key={i}>
                          {e}
                        </Alert>
                      ))}
                    </Box>
                    <Box>
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setAlertOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </Collapse>
              <Button
                disabled={alertOpen}
                sx={{
                  borderRadius: "10%",
                  display:
                    !alertOpen && systemError.length !== 0 ? "block" : "none",
                  width: "2rem",
                  height: "2rem",
                  color: "white",
                  "@keyframes pulse-info": {
                    "0%": {
                      transform: "scale(1)",
                    },
                    "25%": {
                      transform: "scale(0.9)",
                    },
                    "50%": {
                      transform: "scale(1)",
                    },
                    "75%": {
                      transform: "scale(0.9)",
                    },
                    "100%": {
                      transform: "scale(1)",
                    },
                  },
                  animation: "3s pulse-info ease infinite",
                }}
                variant="outlined"
                onClick={() => {
                  setAlertOpen(true);
                }}
              >
                <InfoIcon
                  sx={{ color: systemError.length !== 0 ? "red" : "white" }}
                />
              </Button>
            </Box>

            <AccountMenu></AccountMenu>
            <Typography
              variant="h5"
              color="initial"
              sx={{
                display: {
                  sm: "block",
                  xs: "none",
                },
              }}
            >
              {user ? user.data.name : ""}
            </Typography>
            {/* <div style={{ marginLeft: 30 }}>
              {user ? (
                <NavLink
                  className="button"
                  onClick={() => {
                    dispatch(logout());
                    // navigate("/login");
                  }}
                  to="/login"
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink className="button" to="/login">
                  Login
                </NavLink>
              )}
            </div> */}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default MainAppBar;
