import { createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";
import React, { useCallback, useState, useMemo } from "react";
import { useEffect, createContext } from "react";
import ReactGA from "react-ga";

import { useDispatch, useSelector } from "react-redux";
///  importing routes
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UAParser } from "ua-parser-js";

import Layout from "./components/Layout/Backend/Layout";
import allRoutes from "./Router/allRoutes";
import nestedRoutes from "./Router/nestedRoutes";
import PrivateRoute from "./Router/PrivateRoutes";
import Mocktest from "./Screens/Backend/CourseTest/MockTest/MockTest";
import Profile from "./Screens/Backend/ProfilePage";
// import VideoPlayPage from "./Screens/Backend/VideoPlayPage";
import NotFound from "./Screens/NotFound";
import { setCountry } from "../src/redux/slice/UserSlice";

import "./App.css";
import { getCookie } from "./Utils/GetCookies";
import MaintenancePage from "./Screens/MaintenancePage/MaintenancePage";
import { Crisp } from "crisp-sdk-web";
import theme from "./Theme";

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTIC);
export const DrawerContext = createContext();

function App() {
  const [open, setOpen] = useState(true);

  const { user } = useSelector((state) => state.user);
  const Font = createTheme({
    typography: {
      fontFamily: ["Cabin", "sans-serif"].join(","),
      textTrasform: "none",
    },

    // palette: {
    //   primary: {
    //     main: "#2196F3", // Blue
    //   },
    //   secondary: {
    //     main: "#FF9800", // Orange
    //   },
    //   error: {
    //     main: "#FF3D00", // Red
    //   },
    //   warning: {
    //     main: "#FFC107", // Yellow
    //   },
    //   info: {
    //     main: "#4CAF50", // Green
    //   },
    //   success: {
    //     main: "#FFEB3B", // Amber
    //   },
    //   customColor: {
    //     main: "#9C27B0", // Purple
    //   },
    // },
  });
  const dispatch = useDispatch();

  const parser = new UAParser();
  const location = useLocation();
  const browser = parser.getBrowser();
  const [ip, setIP] = useState("");
  useEffect(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }, [location.pathname]);
  const callback = (list) => {
    list.getEntries().forEach((entry) => {
      ReactGA.timing({
        category: "Load Performace",
        variable: "Server Latency",
        value: entry.responseStart - entry.requestStart,
      });
    });
  };
  const GA_MEASUREMENT_ID = process.env.REACT_APP_GOOGLE_ANALYTIC; // Use your Debug Measurement ID

  ReactGA.initialize(GA_MEASUREMENT_ID, { debug: true });

  useEffect(() => {
    // Track a page view
    window.gtag("config", process.env.REACT_APP_GOOGLE_ANALYTIC, {
      page_path: window.location.pathname,
    });

    // Track an event
    // window.gtag("event", "your_event_name", {
    //   event_category: "your_category",
    //   event_label: "your_label",
    // });
  }, []);

  let observer = new PerformanceObserver(callback);
  observer.observe({ entryTypes: ["navigation"] });
  localStorage.setItem("browser", browser.name);
  const chatShowPath = ["/admin/dashboard", "/front/onlineCourses/aigmapte"];
  allRoutes.forEach((r) => {
    chatShowPath.push(r.path);
  });

  function isMobile() {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  useEffect(() => {
    let mobile = isMobile();
    localStorage.setItem("isMobile", mobile);
  });

  //user Ip address
  const getData = useCallback(
    async (path) => {
      // const res = await axios.get("https://geolocation-db.com/json/");
      const res = await axios.get("https://ipapi.co/json/");
      let user_type;

      if (res) {
        let country_status = localStorage.getItem("country_status");
        // alert(`${country_status} country`)
        if (country_status == null) {
          if (res.data.country_name == "Myanmar") {
            // country = Object.assign(country,{  name:"Myanmar"})

            dispatch(setCountry("MMK"));
          } else {
            // country = Object.assign(country,{  name:"International"})
            dispatch(setCountry("AUD"));
          }
        } else {
          let currency = localStorage.getItem("country");

          dispatch(setCountry(currency));
        }
      }
      setIP(res.data.ip);
      if (isMobile()) {
        user_type = "mobile";
      } else {
        user_type = "desktop";
      }
      try {
        let token = getCookie("userToken");

        let userId = localStorage.getItem("userId");
        let config = {
          headers: { Authorization: "Bearer " + token },
        };
        axios.post(
          process.env.REACT_APP_BACKEND_ADMIN + "visitors",
          {
            visitor_ip_address: ip,
            home_page_view_count: path === "/" ? 1 : 0,
            online_course_page_view_count:
              path === "/front/onlineCourses/aigmapte" ? 1 : 0,
            dashboard_page_view_count: path === "/admin/dashboard" ? 1 : 0,
            user_type: user_type,
            user_id: userId,
            country_name: res.data.country_name,
          },
          config
        );
      } catch (error) {}
    },
    [ip, dispatch]
  );

  useEffect(() => {
    //passing getData method to the lifecycle method
    if (
      location.pathname === "/" ||
      location.pathname === "/admin/dashboard" ||
      location.pathname === "/front/onlineCourses/aigmapte"
    ) {
      getData(location.pathname);
    }
  }, []);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    let error = localStorage.getItem("error");
    if (error !== null && error !== undefined) {
      try {
        axios
          .post(`${process.env.REACT_APP_BACKEND_API}error-logs`, {
            error: error,
            page_route: localStorage.getItem("route_path"),
            user_device: localStorage.getItem("user_device"),
            browser: localStorage.getItem("browser"),
            user_id: localStorage.getItem("userId"),
          })
          .then(() => {
            ["route_path", "error"].forEach((key) => {
              localStorage.removeItem(key);
            });
          });
      } catch (error) {
        localStorage.setItem("log_error_message", error);
      }
    }
  }, []);

  function RouteWrapper({ children }) {
    const location = useLocation();

    useEffect(() => {
      const { pathname } = location;

      if (pathname.startsWith("/mocktest/test/")) {
        // Disable the browser's back and forward buttons
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener("popstate", onBackButtonEvent);
      }

      return () => {
        // Re-enable the browser's back and forward buttons when the component unmounts
        window.removeEventListener("popstate", onBackButtonEvent);
      };
    }, [location]);

    const onBackButtonEvent = (e) => {
      e.preventDefault();
      window.history.forward();
    };

    return <>{children}</>;
  }

  const contextValue = useMemo(() => {
    return { open, setOpen };
  }, [open, setOpen]);

  // const location = useLocation();
  useEffect(() => {
    const currentUrl = location.pathname;
    Crisp.configure(process.env.REACT_APP_CRISP_ID);
    const urls = [
      "/pte-core",
      "/blog",
      "/marking",
      "/materials-download",
      "/feedback",
    ];

    if (location.pathname === "/") {
      Crisp.chat.show();

      // Check if the message has already been sent
      if (!localStorage.getItem("crispMessageSent")) {
        // Send the message only once
        Crisp.message.show("text", "How can we help with Aigmapte??");

        // Set a flag in localStorage to indicate that the message has been sent
        localStorage.setItem("crispMessageSent", "true");
      }
      // Crisp.message.show('picker',{
      //   "id": "a-custom-id",
      //   "text": "What is your question about?",

      // }

      // );
      // Crisp.message.send("text", "Hi! How can we help you today?");
    } else if (currentUrl.includes("front") || urls.includes(currentUrl)) {
      Crisp.chat.close();
    } else {
      Crisp.chat.hide();
    }
  }, [location.pathname]);

  // useEffect(() => {
  //   Crisp.message.show("field", {
  //     id: "name-field",
  //     text: "What is your name?",
  //     explain: "Enter your name...",
  //   });

  //   // Example 5: show a carousel message
  //   Crisp.message.show("carousel", {
  //     text: "Sure! Here's what I have...",

  //     targets: [
  //       {
  //         title: "iPhone 12 Mini",
  //         description: "Refurbished iPhone 12 Mini in excellent condition.",

  //         actions: [
  //           {
  //             label: "View Product",
  //             url: "https://www.apple.com/shop/buy-iphone/iphone-12",
  //           },
  //         ],
  //       },

  //       {
  //         title: "iPhone 13",
  //         description: "Brand new iPhone 13, coming with Apple Care.",

  //         actions: [
  //           {
  //             label: "View Product",
  //             url: "https://www.apple.com/shop/buy-iphone/iphone-13",
  //           },
  //         ],
  //       },
  //     ],
  //   });
  //   if (user !== undefined && user !== null) {
  //     Crisp.user.setEmail(user.data.email);
  //     Crisp.user.setNickname(user.data.name);
  //     Crisp.setTokenId(process.env.REACT_APP_CRISP_ID + user.data.id);
  //     Crisp.user.setAvatar(
  //       process.env.REACT_APP_BACKEND_URL + "storage/user/" + user.data.image
  //     );
  //   }
  // }, [user]);

  const isUnderMaintenance = false;

  if (isUnderMaintenance) {
    return (
      <Routes>
        <Route path="*" element={<MaintenancePage />} />
      </Routes>
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <DrawerContext.Provider value={contextValue}>
          <Routes>
            {allRoutes.map((route, index) => (
              <Route
                key={index}
                exact
                path={route.path}
                element={<route.component />}
                isAuthenticated={isAuthenticated}
              />
            ))}
            <Route element={<PrivateRoute></PrivateRoute>}>
              <Route exact path="/" element={<Layout />}>
                {nestedRoutes.map((route, index) => (
                  <Route
                    key={index}
                    exact
                    path={route.path}
                    element={<route.component />}
                  />
                ))}
              </Route>
              <Route
                exact
                path="/mocktest/test/:id/:mt_type_id/:resume/:check?"
                element={
                  <RouteWrapper>
                    <Mocktest />
                    {/* Render other components here */}
                  </RouteWrapper>
                }
              />
              <Route exact path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DrawerContext.Provider>
      </ThemeProvider>

      {/* {chatShowPath.includes(location.pathname) === true && (
        <div className="facebook-chat-div">
          <MessengerCustomerChat
            pageId="100823749735658"
            appId="639781087735470"
          />
        </div> 
      )} */}
    </>
  );
}

export default App;
