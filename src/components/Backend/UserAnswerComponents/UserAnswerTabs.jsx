import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LeftPositionedTimeline from "./TimelineComponent";
import PaginationComponent from "../PaginationComponent";
import AnswerContent from "./AnswerTabContent/AnswerContent";

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
      {value === index && <Box sx={{ p: { xs: 0, sm: 2 } }}>{children}</Box>}
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

export default function AnswerAndDiscussionTabs(props) {
  const theme = useTheme();
  const { page, totalPage, handleChange, saveArray, type, category } = props;
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        width: "100%",
        // boxShadow: 5,
        borderBottomRightRadius: "2rem",
        borderBottomRadius: "2rem",
      }}
    >
      <AppBar
        position="static"
        sx={{ boxShadow: 0, backgroundColor: "transparent" }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          sx={{
            "& .MuiButtonBase-root": {
              border: "2px solid #c6c6c6",
              color: "gray",
              backgroundColor: "#1976d2",
              borderTopLeftRadius: "0.5rem",
              borderTopRightRadius: "0.5rem",
            },

            "& .Mui-selected ": {
              color: "white",
            },
          }}
          indicatorColor="secondary"
          textColor="inherit"
          aria-label="full width user answer tabs"
        >
          <Tab label="History" {...a11yProps(0)} />
          <Tab label="Discussion" {...a11yProps(1)} />
          <Tab label="Others' answers" {...a11yProps(2)} />
          {/* {category !== "ra" &&
            category !== "rl" &&
            category !== "di" &&
            type !== "Writing" &&
            category !== "wfd" &&
            category !== "sst" && <Tab label="Answer" {...a11yProps(3)} />} */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        style={{
          border: "2px solid #c6c6c6",
          borderBottomRightRadius: "2rem",
          borderBottomLeftRadius: "2rem",
        }}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <LeftPositionedTimeline
            data={saveArray[0]}
            type={type}
            category={category}
          />
          <PaginationComponent
            page={page[0]}
            totalPage={totalPage[0]}
            handleChange={handleChange[0]}
          ></PaginationComponent>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Typography sx={{ p: 2 }}>Coming Soon ....</Typography>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <LeftPositionedTimeline
            data={saveArray[1]}
            type={type}
            category={category}
          />
          <PaginationComponent
            page={page[1]}
            totalPage={totalPage[1]}
            handleChange={handleChange[1]}
          ></PaginationComponent>
        </TabPanel>

        <TabPanel value={value} index={3} dir={theme.direction}>
          <AnswerContent category={category}></AnswerContent>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
