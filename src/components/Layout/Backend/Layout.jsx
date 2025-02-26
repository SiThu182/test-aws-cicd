import { Box } from "@mui/system";
import React, { createContext, useEffect, useMemo } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import DesktopDrawer from "../../Backend/NavComponents/DesktopDrawer";
import DrawerContents from "../../Backend/NavComponents/DrawerContents";
import MainAppBar from "../../Backend/NavComponents/MainAppBar";
import MobileDrawer from "../../Backend/NavComponents/MobileDrawer";
import "./Layout.css";
import PageLoader from "../../Backend/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import useCheckPermissions from "../../../customHooks/Permissions/CheckPermissions";
import AlertReload from "../../AlertReload";
import { requestAudio } from "../../../customHooks/Permissions/RequestPermission";

import { setError } from "../../../redux/slice/SystemInfoAlertSlice";

export const NavContext = createContext();

const Layout = React.memo(() => {
  const { user, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { permissionAllowed, audioError } = useCheckPermissions();
  // const [permissionCleanUp, setPermissionCleanUp] = useState(true);
  const drawerWidth = 290;
  const [open, setOpen] = useState(true);
  const [pteCore, setPteCore] = useState(false);
  const toggleDrawer = () => setOpen(!open);

  const contextValue = useMemo(() => {
    return { pteCore, setPteCore, open };
  }, [pteCore, setPteCore, open]);

  const drawer = (
    <DrawerContents onClick={toggleDrawer} setOpen={setOpen} open={open} />
  );

  const mainStyle = {
    flexGrow: 1,
    p: 2,
    width: { sm: `calc(100% - ${drawerWidth}px)` },
    height: "100vh",
    overflowX: "auto",
    backgroundColor: "rgb(231 239 254)",
  };
  const location = window.location.pathname;

  useEffect(() => {
    requestAudio();
  }, []);

  useEffect(() => {
    let regProp = /\/ra\/test|\/rs\/test|\/di\/test|\/rl\/test|\/asq\/test/;
    let listPath = regProp.test(location);

    if (
      listPath === true &&
      (permissionAllowed === "denied" || audioError.length !== 0)
    ) {
      // setPermissionCleanUp(false);
      if (audioError.length !== 0 || permissionAllowed === "denied") {
        if (audioError.length !== 0) {
          dispatch(setError({ state: 1, error: audioError }));
          AlertReload(
            audioError,
            "Please check your audio system (especially microphone) carefully"
          );
        }
        if (permissionAllowed === "denied") {
          dispatch(
            setError({
              state: 1,
              error:
                "Audio Permission : " +
                permissionAllowed +
                "Please allow access to microphone and reload",
            })
          );
          AlertReload(
            permissionAllowed,
            "Please check your audio permission. Give allow to microphone access and reload."
          );
        }
      } else {
        dispatch(setError({ state: null, error: [] }));
      }
    }
  }, [location, permissionAllowed, audioError, dispatch]);

  return (
    <>
      <Box
        component={"main"}
        style={{ display: "flex", position: "relative" }}
        className="dashboard-box"
      >
        <MainAppBar open={open} onClick={toggleDrawer} />
        <Box
          component="nav"
          aria-label="menu items"
          sx={{
            backgroundColor: "rgb(56,68,80)",
            overflowX: "hidden",
          }}
          // onClick={() => setOpen((prev) => !prev)}
        >
          <NavContext.Provider value={contextValue}>
            <MobileDrawer open={open} onClose={toggleDrawer} drawer={drawer} />
            <DesktopDrawer open={open} drawer={drawer} />
          </NavContext.Provider>
        </Box>

        <Box
          component="main"
          sx={{
            ...mainStyle,
            p: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              pt: 8,
              px: 2,
            }}
          >
            <Outlet></Outlet>
          </Box>
        </Box>
        {(user === null || role === null) && <PageLoader></PageLoader>}
      </Box>
    </>
  );
});

export default Layout;
