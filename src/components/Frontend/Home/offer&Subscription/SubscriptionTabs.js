import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";

import {
  fetchSubscriptionPlanFrontendAsync,
  fetchSubscriptionTypeAsync,
} from "../../../../redux/thunk/Subscription";
import {
  CoachingPlanTable,
  MiniMockTestTable,
  MockTestTable,
  PracticeMiniMtTable,
  PracticeMocktestSectionalMtTable,
  PracticeMtTable,
  PracticeSectionalMocktestTable,
  PracticeTable,
  SectionalMockTestTable,
} from "./SubscriptionTable";
import { Badge, Typography } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs(props) {
  const theme = useTheme();
  const [assign, setAssign] = useState(false);
  const [value, setValue] = React.useState(0);
  const [practice, setPractice] = useState();
  const [mockTest, setMockTest] = useState();
  const [miniMockTest, setMiniMockTest] = useState();
  const [sectionalMockTest, setSectionalMockTest] = useState();
  const [practiceMockTestCombo, setPracticeMockTestCombo] = useState();
  const [practiceMiniMockTestCombo, setPracticeMiniMockTestCombo] = useState();
  const [coachingPlan, setCoachingPlan] = useState();
  const { country } = useSelector((state) => state.user);

  const [practiceSectionalMockTestCombo, setPracticeSectionalMockTestCombo] =
    useState();
  const [
    practiceMockTestSectionalMockTestCombo,
    setPracticeMockTestSectionalMockTestCombo,
  ] = useState();

  // const [location, setLocation] = useState(null);
  // const [country, setCountry] = useState(null);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setLocation({ latitude, longitude });
  //         fetchCountry(latitude, longitude);
  //         // fetchCountry("1.3521", "103.8198");
  //       },
  //       (error) => {

  //       }
  //     );
  //   } else {

  //   }
  // }, []);

  // const fetchCountry = async (latitude, longitude) => {
  //   try {
  //     const response = await fetch(
  //       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  //     );
  //     const data = await response.json();
  //     setCountry(data.countryName);
  //   } catch (error) {

  //   }
  // };

  const {
    subscriptionFrontendStatus,
    subscriptionFrontend,
    subscriptionType,
    subscriptionTypeStatus,
  } = useSelector((state) => state.subscription);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSubscriptionTypeAsync("subscription-plan-types"));
    dispatch(fetchSubscriptionPlanFrontendAsync("subscription-plan"));
    setAssign(true);
  }, [dispatch]);

  useEffect(() => {
    if (subscriptionFrontendStatus === "succeeded" && assign) {
      const typeAssign = (id) => {
        let returnPlanType = [];
        let show_fees;
        subscriptionFrontend.forEach((s) => {
          // if(country !== "Myanmar"){
          //   show_fees = country == "USD" ? (s.oversea_fees * 0.65).toFixed(2) :(s.oversea_fees * 0.65).toFixed(2)

          // }else{
          //   show_fees = s.fees
          // }

          if (s.plan_type_id === id) {
            s = {
              ...s,
              usd_fees: (s.oversea_fees * 0.65).toFixed(2),
              sgd_fees: (s.oversea_fees * 0.9).toFixed(2),
              thb_fees: (s.oversea_fees * 24.36).toFixed(2),
              nzd_fees: (s.oversea_fees * 1.09).toFixed(2),
            };
            return returnPlanType.push(s);
          }
        });
        return returnPlanType;
      };

      setPractice(typeAssign(1));
      setMockTest(typeAssign(2));
      setMiniMockTest(typeAssign(3));
      setSectionalMockTest(typeAssign(4));
      setPracticeMockTestCombo(typeAssign(5));
      setPracticeMiniMockTestCombo(typeAssign(6));
      setPracticeSectionalMockTestCombo(typeAssign(7));
      setPracticeMockTestSectionalMockTestCombo(typeAssign(8));
      setCoachingPlan(typeAssign(9));
      setAssign(false);
    }
  }, [assign, subscriptionFrontend, subscriptionFrontendStatus, country]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        overflow: "visible",
        borderRadius: "1rem",
        boxShadow: 4,
      }}
    >
      <AppBar
        position="relative"
        sx={{
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
          backgroundColor: "rgb(4,30,66)",
          overflow: "visible",
          "& .MuiTabs-root": {
            overflow: "visible",
          },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="subscription  tabs"
          sx={{
            "& .MuiTabs-root": {
              overflow: "visible",
            },
            "& .MuiTabs-scroller": {
              overflow: "visible",
            },
            "& .MuiButtonBase-root": {
              fontSize: {
                xs: "15px",
                sm: "17px",
                md: "1rem",
              },
              fontWeight: 600,
              mx: "auto",
              overflow: "visible",
            },
          }}
        >
          <Tab
            label={
              subscriptionTypeStatus === "succeeded" &&
              subscriptionType?.find((s) => s.id === 1)?.discount !== null ? (
                <Badge
                  badgeContent={
                    subscriptionType?.find((s) => s.id === 1)?.discount + "off"
                  }
                  color="error"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  sx={{ padding: 1 }}
                >
                  <Typography sx={{ padding: 2 }}>Ai Practice</Typography>
                </Badge>
              ) : (
                "Ai Practice"
              )
            }
            {...a11yProps(0)}
          />

          <Tab
            label={
              subscriptionTypeStatus === "succeeded" &&
              subscriptionType?.find((s) => s.id === 2)?.discount !== null ? (
                <Badge
                  badgeContent={
                    subscriptionType?.find((s) => s.id === 2)?.discount + "off"
                  }
                  color="error"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  sx={{ padding: 1 }}
                >
                  <Typography sx={{ padding: 2 }}>Ai Mock Test</Typography>
                </Badge>
              ) : (
                "Ai Mock Test"
              )
            }
            {...a11yProps(1)}
          />

          <Tab
            label={
              subscriptionTypeStatus === "succeeded" &&
              subscriptionType?.find((s) => s.id === 5)?.discount !== null ? (
                <Badge
                  badgeContent={
                    subscriptionType?.find((s) => s.id === 5)?.discount + "off"
                  }
                  color="error"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  sx={{ padding: 1 }}
                >
                  <Typography sx={{ padding: 2 }}>
                    Practice + Mock Test
                  </Typography>
                </Badge>
              ) : (
                "Practice + Mock Test"
              )
            }
            {...a11yProps(2)}
          />
          <Tab label="Coaching Plan" {...a11yProps(3)} />

          {/* <Tab label="Ai Sectional Mock Test" {...a11yProps(3)} />
          <Tab
            label="Practice + Mock Test +Sectional Mock Test"
            {...a11yProps(4)}
          /> */}
          {/* <Tab label="Practice + Sectional Mock Test" {...a11yProps(2)} /> */}
          {/* <Tab label="Ai Mini Mock Test" {...a11yProps(6)} /> */}
          {/* <Tab label="Practice + Mini Mock Test" {...a11yProps(7)} /> */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <PracticeTable data={practice}></PracticeTable>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <MockTestTable data={mockTest}></MockTestTable>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <PracticeMtTable data={practiceMockTestCombo}></PracticeMtTable>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <CoachingPlanTable data={coachingPlan}></CoachingPlanTable>
        </TabPanel>
        {/* <TabPanel value={value} index={3} dir={theme.direction}>
          <SectionalMockTestTable
            data={sectionalMockTest}
          ></SectionalMockTestTable>
        </TabPanel> */}
        {/* <TabPanel value={value} index={4} dir={theme.direction}>
          <PracticeMocktestSectionalMtTable
            data={practiceMockTestSectionalMockTestCombo}
          ></PracticeMocktestSectionalMtTable>
        </TabPanel> */}
        {/* <TabPanel value={value} index={2} dir={theme.direction}>
          <PracticeSectionalMocktestTable
            data={practiceSectionalMockTestCombo}
          ></PracticeSectionalMocktestTable>
        </TabPanel> 
        <TabPanel value={value} index={6} dir={theme.direction}>
          {" "}
          <MiniMockTestTable data={miniMockTest}></MiniMockTestTable>
        </TabPanel>
        <TabPanel value={value} index={7} dir={theme.direction}>
          <PracticeMiniMtTable
            data={practiceMiniMockTestCombo}
          ></PracticeMiniMtTable>
        </TabPanel> */}
      </SwipeableViews>
    </Box>
  );
}
