import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HomeIcon from "@mui/icons-material/Home";
import Logout from "@mui/icons-material/Logout";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { logout } from "../../../features/auth/authSlice";
import { userLogout } from "../../../redux/slice/UserSlice";
import { FetchUserGuideAsync } from "../../../redux/thunk/MaterialDownload";
// import { fetchUserAsync } from "../../../redux/thunk/Users";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
export default function AccountMenu() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const { userGuide, userGuideStatus } = useSelector((state) => state.material);
  React.useEffect(() => {
    dispatch(
      FetchUserGuideAsync({
        path: "download-user-guide",
      })
    );
  }, [dispatch]);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const clickProfile = () => {
    navigate("/profile");
    handleClose();
  };
  const clickHome = () => {
    navigate("/");
    handleClose();
  };

  const logOutUser = () => {
    dispatch(userLogout());
    dispatch(logout());
    // navigate("/login");
    navigate("/");
  };
  //get user detail
  // React.useEffect(() => {
  //   if (user === null) {
  //     let userId = localStorage.getItem("userId");
  //     dispatch(fetchUserAsync(userId));
  //   }
  // }, [dispatch, user]);

  return (
    <>
      <Box
      // sx={{ display: "flex", alignItems: "flex-end", textAlign: "center" }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ mr: 1 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {user?.data?.image ? (
              <Box
                sx={{
                  borderRadius: "50%",
                  width: "3rem",
                  height: "3rem",
                  overflow: "hidden",
                  display: "flex",

                  boxShadow: 5,
                  bordr: "2px solid black",
                }}
              >
                <img
                  src={
                    process.env.REACT_APP_BACKEND_URL +
                    "storage/user/" +
                    user?.data.image
                  }
                  style={{ width: "100%", aspectRatio: 1, objectFit: "cover" }}
                  alt="user_img"
                />
              </Box>
            ) : (
              <AccountCircleRoundedIcon
                sx={{ fontSize: "3rem" }}
              ></AccountCircleRoundedIcon>
            )}
            {/* <AccountCircleRoundedIcon></AccountCircleRoundedIcon> */}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 35,
              height: 35,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 1,
              right: "1rem",
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-60%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={clickProfile}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={clickHome}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          Home
        </MenuItem>

        <MenuItem
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
          }}
          onClick={() => navigate("admin/subscription-shop")}
        >
          <ListItemIcon>
            <LocalGroceryStoreIcon fontSize="small" />
          </ListItemIcon>
          Shop
        </MenuItem>
        {userGuideStatus === "succeeded" && userGuide != null && (
          <a
            href={
              process.env.REACT_APP_BACKEND_URL + "storage/" + userGuide.url
            }
            target="_blank"
            rel="noreferrer"
            style={{ textDecorationLine: "none", color: "grey" }}
          >
            <MenuItem
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
              }}
            >
              <ListItemIcon>
                <FolderSharedIcon fontSize="small" />
              </ListItemIcon>
              <Typography sx={{ textDecoration: "none" }}>
                User Guide
              </Typography>
            </MenuItem>
          </a>
        )}

        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={() => logOutUser()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
