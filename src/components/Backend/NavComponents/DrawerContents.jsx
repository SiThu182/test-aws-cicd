import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import AdminSideNav from "./NavLink/AdminSideNav";
import CourseRegister from "./NavLink/CourseRegister";

import MockTest from "./NavLink/MockTest";

import ScoreSidenav from "./NavLink/ScoreSidenav";
// nav component & nav link
import SideNav from "./NavLink/SideNav";

import SubscriptionRegister from "./NavLink/SubscriptionRegister";
import Student from "./NavLink/User";
import VideoRecording from "./NavLink/VideoRecording";

import {
  feedbackAdmin,
  feedbackDropDownParent,
  materialParent,
  supportDropDownParent,
  supportDropdownList,
} from "./NavLink/Help";
import {
  subscriptionUser,
  subscriptionUserParent,
} from "./NavLink/Subscription";
import { reloadParent } from "./NavLink/HardReload";
import {
  practiceSpeakingDropdownList,
  speakingDropDownParent,
} from "./NavLink/NewSpeakingLink";
import {
  practiceWritingDropdownList,
  writingDropDownParent,
} from "./NavLink/NewWritingLink";
import {
  practiceReadingDropdownList,
  readingDropDownParent,
} from "./NavLink/NewReadingLink";
import {
  listeningDropDownParent,
  practiceListeningDropdownList,
} from "./NavLink/NewListeningLink";

import NavSwitch from "../NavSwitch";
import ShopOrder from "./NavLink/ShopOrder";
import {
  shopProductAdmin,
  shopProductDropDownParent,
} from "./NavLink/ShopProduct";
import ShopEmailTemplate from "./NavLink/ShopEmailTemplate";
import { discountAdmin, discountDropDownParent } from "./NavLink/Discount";
const DrawerContents = React.memo((props) => {
  const navigate = useNavigate();
  const { role, user } = useSelector((state) => state.user);
  const pathName = window.location.pathname;

  //path for speaking
  let regProp =
    /\/admin\/speaking|\/ra\/test|\/rs\/test|\/di\/test|\/rl\/test||\/asq\/test|\/rts\/test/;

  let listPath = regProp.test(pathName);

  //path for listening
  let regListeningProp =
    /\/admin\/listening|\/mc-sa\/test|\/mc-ma\/test|\/hcs\/test|\/hiw\/test|\/smw\/test|\/wfd\/test|\/sst\/test/;

  let listeningPath = regListeningProp.test(pathName);

  //path for reading
  let regReadingProp =
    /\/admin\/reading|\/r-mc-sa\/test|\/r-mc-ma\/test|\/r-fib\/test|\/r-r&wfib\/test|\/r-rop\/test/;
  let readingPath = regReadingProp.test(pathName);

  //path for writing
  let regWritingProp = /\/we\/test|\/swt\/test/;
  let writingPath = regWritingProp.test(pathName);

  //path for mocktest
  let mockTestProp = /\/mocktest\/card/;
  let mockTestPath = mockTestProp.test(pathName);

  //dashboard path
  const dashboardProp = /\/admin\/dashboard/;
  let dashboardPath = dashboardProp.test(pathName);

  //user register path
  let userRegProp =
    /\/admin\/user\/list|\/admin\/user\/details|\/admin\/user\/add\/|\/admin\/user\/edit\//;
  let userPath = userRegProp.test(pathName);

  //course register path
  let courseRegisterRegProp = /\/admin\/register\/course/;
  let courseRegisterPath = courseRegisterRegProp.test(pathName);

  //subscription register path
  let subscriptionRegisterRegProp = /\/admin\/register\/subscription/;
  let subscriptionRegisterPath = subscriptionRegisterRegProp.test(pathName);

  //path for video recording
  let videoRecordingRegProp = /\/user\/video-recording/;
  let videoRecordingPath = videoRecordingRegProp.test(pathName);
  // const [pathName] = useState("/admin/dashboard");
  //path for  help
  let supportRegProp = /\/dashboard\/question-and-answer|\/dashboard\/feedback/;
  let supportPath = supportRegProp.test(pathName);
  // const [pathName] = useState("/admin/dashboard");

  //path for  material
  let materialRegProp = /\/dashboard\/materials-download/;
  let materialPath = materialRegProp.test(pathName);
  // const [pathName] = useState("/admin/dashboard");
  //path for  feedback admin
  let feedbackAdminRegProp = /\/admin\/feedback/;
  let feedbackAdminPath = feedbackAdminRegProp.test(pathName);

  //shop product
  let shopProductAdminRegProp =
    /\/admin\/shop-product|\/admin\/shop-product-detail/;
  let shopProductAdminPath = shopProductAdminRegProp.test(pathName);
  let discountAdminRegProp = /\/admin\/discount|\/admin\/discount-detail/;
  let discountAdminPath = discountAdminRegProp.test(pathName);
  //path for subscription
  let subscriptionRegProp =
    /\/user\/subscription-plan|\/user\/training-package/;
  let subscriptionPath = subscriptionRegProp.test(pathName);

  let eTemplateRegProp = /\/admin\/shop-email-template\//;
  let eTemplatePath = eTemplateRegProp.test(pathName);
  const toolbarStyle = {
    position: "fixed",
    zIndex: 2,
    width: "250px",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgb(56,68,80)",
    borderBottom: "1px solid rgb(241,210,36)",
    px: [1],
  };

  const dashboardIcon = {
    color: dashboardPath ? "#fff" : "",
    fontSize: props.open ? "2rem" : "2.5rem",
    ml: props.open ? 2 : 1,
  };
  const titleBox = {
    color: "#fff",
    fontSize: "2rem",
    display: "flex",
    backgroundColor: "rgb(56,68,80)",
    paddingTop: "0.4rem",
  };

  const titleIcon = {
    fontSize: props.open ? "1rem" : "2.2rem",
    opacity: props.open ? 0 : 1,
    ml: props.open ? 0 : 2,
  };

  const listItem = {
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

  const onClickHandler = () => {
    props.setOpen(false);
  };

  // const navContext = useContext(NavContext);

  return (
    <>
      {user !== null && user !== undefined && (
        <Box>
          {/* fixed toobar */}
          <Toolbar
            sx={{
              ...toolbarStyle,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <img
              // src="http://localhost:3000/Image/AigmaLogo.png"
              src={process.env.REACT_APP_FRONTEND_URL + "Image/AigmaLogo.png"}
              style={{
                width: "10rem",
                cursor: "pointer",
              }}
              alt="pte_logo"
              onClick={() => navigate("/")}
            />
            {/* <IconButton onClick={props.onClick}>
              <LogoDevIcon sx={{ color: "#fff" }}></LogoDevIcon>
            </IconButton> */}
          </Toolbar>
          {/* fixed toobar */}
          {/* toolbar to left space for fixed position */}
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              backgroundColor: "rgb(56,68,80)",
              px: [1],
            }}
          >
            <IconButton onClick={props.onClick}>
              <LogoDevIcon sx={{ color: "#fff" }}></LogoDevIcon>
            </IconButton>
          </Toolbar>
          {/* toolbar to left space for fixed position */}
          <Divider
            sx={{
              backgroundColor: "rgb(241,210,36)",
              height: "0.15rem",
            }}
          />

          <NavSwitch />

          {/* DashBoard start */}
          <Box
            sx={{ ...titleBox, opacity: 1 }}
            onClick={() => onClickHandler()}
          >
            <ListItemButton
              sx={{
                ...listItem,
                borderRadius: "1rem",
                boxShadow: 5,
                bgcolor: dashboardPath ? "rgb(7, 106, 225)" : "",
              }}
              // bgColor={dashboardPath ? "#fff" : "#000"}
            >
              <Link
                underline="none"
                to={"/admin/dashboard"}
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "white",
                  display: "flex",
                }}
              >
                <TrendingUpRoundedIcon
                  sx={{
                    ...dashboardIcon,
                  }}
                ></TrendingUpRoundedIcon>

                <Typography
                  variant="h5"
                  fontSize="1.7rem"
                  fontWeight="500"
                  color="#fff"
                  sx={{ opacity: props.open ? 1 : 0, overflowX: "hidden" }}
                >
                  Dashboard
                </Typography>
              </Link>
            </ListItemButton>
          </Box>
          {/* DashBoard end */}

          {/* course test start */}
          <Box sx={{ ...titleBox, paddingBottom: "0.5rem" }}>
            <AutoAwesomeMosaicIcon
              sx={{
                ...titleIcon,
              }}
            ></AutoAwesomeMosaicIcon>
            <Typography
              variant="h5"
              fontSize="1.4rem"
              fontWeight="500"
              sx={{ opacity: props.open ? 1 : 0, overflowX: "hidden" }}
            >
              Practice
            </Typography>
          </Box>
          <List style={{ backgroundColor: "rgb(56,68,80)" }} disablePadding>
            {/* speaking nav start */}

            <>
              <SideNav
                DropDownParent={speakingDropDownParent}
                DropDownList={practiceSpeakingDropdownList}
                section="practice"
                open={props.open}
                currentPath={listPath}
              ></SideNav>
              {/* speaking nav end */}
              {/* writing nav start */}
              <SideNav
                DropDownParent={writingDropDownParent}
                DropDownList={practiceWritingDropdownList}
                section="practice"
                open={props.open}
                currentPath={writingPath}
              ></SideNav>
              {/* writing nav end */}
              {/* reading nav start */}
              <SideNav
                DropDownParent={readingDropDownParent}
                DropDownList={practiceReadingDropdownList}
                section="practice"
                open={props.open}
                currentPath={readingPath}
              ></SideNav>

              {/* reading nav end  */}
              {/* listening nav start */}
              <SideNav
                DropDownParent={listeningDropDownParent}
                DropDownList={practiceListeningDropdownList}
                section="practice"
                open={props.open}
                currentPath={listeningPath}
              ></SideNav>
              {/* listening nav end */}
            </>

            {/* mock test nav start */}
            <SideNav
              NavLink={MockTest[0]}
              NavTitle={MockTest[1]}
              section="test"
              open={props.open}
              currentPath={mockTestPath}
            ></SideNav>
            {/*mock test  nav end */}
            {/* material nav start */}
            <SideNav
              DropDownParent={materialParent}
              section="user"
              open={props.open}
              currentPath={materialPath}
            ></SideNav>
            {/* material nav end */}
            {/* video recording nav start */}
            {(user?.video_status !== 0 || role === 1) && (
              <SideNav
                NavTitle={VideoRecording[0]}
                // NavLink=""
                section="others"
                open={props.open}
                currentPath={videoRecordingPath}
              ></SideNav>
            )}
            {/* support nav start */}
            <SideNav
              DropDownParent={supportDropDownParent}
              DropDownList={supportDropdownList}
              section="user"
              open={props.open}
              currentPath={supportPath}
            ></SideNav>
            {/* support nav end */}
            {/* subscription nav start */}
            <SideNav
              DropDownParent={subscriptionUserParent}
              DropDownList={subscriptionUser}
              section="user"
              open={props.open}
              currentPath={subscriptionPath}
            ></SideNav>
            {/* subscription nav end */}

            {/* reload nav start */}
            <SideNav
              DropDownParent={reloadParent}
              DropDownList={null}
              section="reload"
              open={props.open}
            ></SideNav>
            {/* reload nav end */}
            {/* <SideNav
          NavTitle={OnlineCourse[0]}
          NavLink=""
          section="list"
          open={props.open}
        ></SideNav> */}
            {/*course  nav end */}

            {role === null ? (
              <></>
            ) : role === 1 || role === 3 ? (
              <>
                {/* Admin start */}

                <Box sx={{ ...titleBox }}>
                  <AutoAwesomeMosaicIcon
                    sx={{
                      ...titleIcon,
                    }}
                  ></AutoAwesomeMosaicIcon>
                  <Typography
                    variant="h5"
                    fontSize="1.2rem"
                    fontWeight="500"
                    sx={{ opacity: props.open ? 1 : 0, overflowX: "hidden" }}
                  >
                    ADMIN
                  </Typography>
                </Box>
                <List
                  style={{ backgroundColor: "rgb(56,68,80)" }}
                  sx={{ margin: 0, p: 0 }}
                >
                  <AdminSideNav open={props.open}></AdminSideNav>
                </List>
                {/* Admin end */}
                {/* score start */}

                <List
                  style={{ backgroundColor: "rgb(56,68,80)" }}
                  sx={{ margin: 0, p: 0, marginBottom: "0rem" }}
                >
                  <ScoreSidenav open={props.open}></ScoreSidenav>
                </List>
                {/* score end */}
                {/* feedback start */}
                <SideNav
                  DropDownParent={feedbackDropDownParent}
                  DropDownList={feedbackAdmin}
                  section="helpAdmin"
                  open={props.open}
                  currentPath={feedbackAdminPath}
                ></SideNav>
                <SideNav
                  DropDownParent={discountDropDownParent}
                  DropDownList={discountAdmin}
                  section="helpAdmin"
                  open={props.open}
                  currentPath={discountAdminPath}
                ></SideNav>
                {/* <SideNav
                  DropDownParent={materialParent}
                  section="user"
                  open={props.open}f
                  currentPath={materialPath}
                ></SideNav> */}
                <Box sx={{ ...titleBox }}>
                  <AutoAwesomeMosaicIcon
                    sx={{
                      ...titleIcon,
                    }}
                  ></AutoAwesomeMosaicIcon>
                  <Typography
                    variant="h5"
                    fontSize="1.2rem"
                    fontWeight="500"
                    sx={{
                      opacity: props.open ? 1 : 0,
                      overflowX: "hidden",
                    }}
                  >
                    MEMBERS
                  </Typography>
                </Box>
                <List
                  style={{
                    backgroundColor: "rgb(56,68,80)",
                    padding: "0px",
                  }}
                >
                  <SideNav
                    NavTitle={Student[0]}
                    // NavLink=""
                    open={props.open}
                    currentPath={userPath}
                  ></SideNav>
                </List>
                {/* feedback end */}
                {/* member start */}
                {role !== 3 && (
                  <>
                    <Box sx={{ ...titleBox }}>
                      <AutoAwesomeMosaicIcon
                        sx={{
                          ...titleIcon,
                        }}
                      ></AutoAwesomeMosaicIcon>
                      <Typography
                        variant="h5"
                        fontSize="1.2rem"
                        fontWeight="500"
                        sx={{
                          opacity: props.open ? 1 : 0,
                          overflowX: "hidden",
                        }}
                      >
                        Transactions
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <List
                        style={{
                          backgroundColor: "rgb(56,68,80)",
                          padding: "0px",
                        }}
                      >
                        <SideNav
                          NavTitle={CourseRegister[0]}
                          // NavLink=""
                          open={props.open}
                          currentPath={courseRegisterPath}
                        ></SideNav>
                      </List>
                      {/* subscription */}
                      <List
                        style={{
                          backgroundColor: "rgb(56,68,80)",
                          padding: "0px",
                        }}
                      >
                        <SideNav
                          NavTitle={SubscriptionRegister[0]}
                          // NavLink=""
                          open={props.open}
                          currentPath={subscriptionRegisterPath}
                        ></SideNav>
                      </List>
                    </Box>
                    {/* member end */}
                    <Box sx={{ ...titleBox }}>
                      <AutoAwesomeMosaicIcon
                        sx={{
                          ...titleIcon,
                        }}
                      ></AutoAwesomeMosaicIcon>
                      <Typography
                        variant="h5"
                        fontSize="1.2rem"
                        fontWeight="500"
                        sx={{
                          opacity: props.open ? 1 : 0,
                          overflowX: "hidden",
                        }}
                      >
                        Shop
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      {/* order */}
                      <List
                        style={{
                          backgroundColor: "rgb(56,68,80)",
                          padding: "0px",
                        }}
                      >
                        <SideNav
                          DropDownParent={shopProductDropDownParent}
                          DropDownList={shopProductAdmin}
                          section="helpAdmin"
                          open={props.open}
                          currentPath={shopProductAdminPath}
                        ></SideNav>
                        <SideNav
                          NavTitle={ShopOrder[0]}
                          // NavLink=""
                          open={props.open}
                          currentPath={ShopOrder}
                        ></SideNav>
                        <SideNav
                          NavTitle={ShopEmailTemplate[0]}
                          // NavLink=""
                          open={props.open}
                          currentPath={eTemplatePath}
                        ></SideNav>
                      </List>
                    </Box>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </List>
        </Box>
      )}
    </>
  );
});

export default DrawerContents;
