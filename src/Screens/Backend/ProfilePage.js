import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SecurityIcon from "@mui/icons-material/Security";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

import Profile from "../../components/Backend/ProfileComponents/Profile";
import Setting from "../../components/Backend/ProfileComponents/Setting";
import Security from "../../components/Backend/ProfileComponents/Security";
import { useNavigate } from "react-router-dom";
import OrderClient from "../../components/Backend/ProfileComponents/OrderClient";
import ShopUserInfo from "../../components/Backend/ProfileComponents/ShopUserInfo";
import ShippingDetail from "../../components/Backend/ProfileComponents/ShippingDetail";
import Coupon from "../../components/Backend/ProfileComponents/Coupon";


const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [profileStatus, setProfileStatus] = React.useState(true);
  const [settingStatus, setSettingStatus] = React.useState(false);
  const [securityStatus, setSecurityStatus] = React.useState(false);
  const [orderStatus, setOrderStatus] = React.useState(false);
  const [shopUserStatus, setShopUserStatus] = React.useState(false);
  const [couponStatus, setCouponStatus] = React.useState(false);

  const [shippingDetailShow, setShippingDetailShow] = React.useState(false);
  const [shippingDetail, setShippingDetail] = React.useState();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();
  const clickHandler = (index) => {
    if (index === 0) {
      setProfileStatus(true);
      setSettingStatus(false);
      setSecurityStatus(false);
      setOrderStatus(false);
      setShopUserStatus(false);
    }
    if (index === 1) {
      setProfileStatus(false);
      setSettingStatus(true);
      setSecurityStatus(false);
      setOrderStatus(false);
      setShopUserStatus(false);
    }
    if (index === 2) {
      setProfileStatus(false);
      setSettingStatus(false);
      setSecurityStatus(true);
      setOrderStatus(false);
      setShopUserStatus(false);
    }
    if (index === 3) {
      setProfileStatus(false);
      setSettingStatus(false);
      setSecurityStatus(false);
      setOrderStatus(false);
      setShopUserStatus(true);
    }
    if (index === 4) {
      setProfileStatus(false);
      setSettingStatus(false);
      setSecurityStatus(false);
      setOrderStatus(true);
      setShopUserStatus(false);
    }
    if (index === 5) {
      setProfileStatus(false);
      setSettingStatus(false);
      setSecurityStatus(false);
      setOrderStatus(false);
      setShopUserStatus(false);
      setCouponStatus(true);

    }
    if (index === 6) {
      navigate(-1);
    }
  };

  const shippingDetailShowHandler = (detail) => {
    setShippingDetail(detail);

    setOrderStatus(false);
    setShippingDetailShow(true);
  };
  const drawer = (
    <div>
      <Toolbar>
        <img
          // src="http://localhost:3000/Image/AigmaLogo.png"
          src={process.env.REACT_APP_FRONTEND_URL + "Image/AigmaLogo.png"}
          style={{
            width: "10rem",
            cursor: "pointer",
          }}
          alt="pte_logo"
          // onClick={() => navigate("/")}
        />
      </Toolbar>
      <Divider />
      <List> 
      {/* , "Coupon" */}
        {["Profile", "Setting", "Security", "Shop User Info", "Order"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => clickHandler(index)}>
                <ListItemIcon>
                  {index / 2 === 0 ? (
                    <AccountCircleIcon></AccountCircleIcon>
                  ) : index % 2 === 0 ? (
                    <SecurityIcon />
                  ) : (
                    <ManageAccountsIcon></ManageAccountsIcon>
                  )}
                </ListItemIcon>

                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => clickHandler(6)}>
            <ListItemIcon>
              <LogoutIcon></LogoutIcon>
            </ListItemIcon>
            <ListItemText primary={"Exit"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {orderStatus ? "Order List" : couponStatus ? "Coupon" : "Profile"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "rgb(231 239 254)",
          minHeight: "100vh",
          OverflowY: "auto",

          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar></Toolbar>
        {profileStatus && <Profile></Profile>}
        {settingStatus && <Setting></Setting>}
        {securityStatus && <Security></Security>}
        {orderStatus && (
          <OrderClient
            isAdmin={false}
            shippingDetailShowHandler={shippingDetailShowHandler}
          ></OrderClient>
        )}
        {shippingDetailShow && (
          <ShippingDetail
            shippingDetail={shippingDetail}
            setShippingDetailShow={setShippingDetailShow}
            setOrderStatus={setOrderStatus}
          />
        )}
        {shopUserStatus && <ShopUserInfo></ShopUserInfo>}
        {couponStatus && <Coupon></Coupon>}

      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
