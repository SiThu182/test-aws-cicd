import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
// import ChecklistIcon from "@mui/icons-material/Checklist";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import MessageIcon from "@mui/icons-material/Message";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import RuleIcon from "@mui/icons-material/Rule";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import FormatAlignCenterRoundedIcon from "@mui/icons-material/FormatAlignCenterRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SegmentIcon from "@mui/icons-material/Segment";
import TypeSpecimenIcon from "@mui/icons-material/TypeSpecimen";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import {
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  ListItemIcon,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
  Button,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import ReloadOrBackCard from "../../ReloadOrBackCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestPostListAsync } from "../../../redux/thunk/SideDrawer";
import PaginationComponent from "../PaginationComponent";
import { colorCode } from "../../Colors/ReusableColorCode";
import axios from "axios";
import swal from "sweetalert";
import { getCookie } from "../../../Utils/GetCookies";

export default function SwipeableSideDrawer(props) {
  const { category, setPost, reset, currentPage, status } = props;
  const [state, setState] = React.useState(null);
  const [animation, setAnimation] = React.useState(false);
  const [isActiveMonthlyPrediction, setIsActiveMonthlyPrediction] =
    React.useState(false);
  const [isActiveWeeklyPrediction, setIsActiveWeeklyPrediction] =
    React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  //timeoutRef to use in debounce function
  const timeoutRef = React.useRef(null);
  const timeoutRefForList = React.useRef(null);
  const { testPostList, testPostListStatus, testPostListError } = useSelector(
    (state) => state.sideDrawer
  );

  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);

  const theme = createTheme({
    zIndex: {
      drawer: 1400, // Customize zIndex for drawers
    },
  });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let path =
    "get-drawer-posts/" +
    category +
    "?page=" +
    page +
    "&weekly_prediction=" +
    isActiveWeeklyPrediction +
    "&monthly_prediction=" +
    isActiveMonthlyPrediction +
    "&month=" +
    currentMonth;

  const [dataFetchPath, setDataFetchPath] = React.useState(path);

  let predictionPath =
    "get-drawer-prediction-posts/" +
    category +
    "/" +
    currentMonth +
    "?page=" +
    page;
  let searchPath =
    "search-drawer-post-by-name?page=" +
    page +
    "&q=" +
    searchValue +
    "&category=" +
    category +
    "&monthly_prediction=" +
    isActiveMonthlyPrediction +
    "&weekly_prediction=" +
    isActiveWeeklyPrediction;
  const currentMonthName = monthNames[currentMonth - 1];
  let token = getCookie("userToken");
  let config = {
    headers: { Authorization: "Bearer " + token },
  };

  React.useEffect(() => {
    if (isActiveMonthlyPrediction) {
      setDataFetchPath(predictionPath);
    } else {
      setDataFetchPath(path);
    }
  }, [isActiveMonthlyPrediction, path, predictionPath]);

  React.useEffect(() => {
    if (searchValue === "") {
      if (timeoutRefForList.current) {
        clearTimeout(timeoutRefForList.current);
      }

      // Set up a new timeout
      timeoutRefForList.current = setTimeout(() => {
        // Your API call or other logic here
        dispatch(fetchTestPostListAsync({ path: path }));
      }, 1000);
    }

    // Cleanup the timeout when the component unmounts or when dependencies change
    return () => {
      if (timeoutRefForList.current) {
        clearTimeout(timeoutRefForList.current);
      }
    };
  }, [dispatch, path, page, searchValue, dataFetchPath]);

  let handleChange = (event, p) => {
    setPage(p);
  };

  React.useEffect(() => {
    if (searchValue !== "") {
      // Clear the previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set up a new timeout
      timeoutRef.current = setTimeout(() => {
        // Your API call or other logic here
        dispatch(fetchTestPostListAsync({ path: searchPath }));
      }, 1000);
    }

    // Cleanup the timeout when the component unmounts or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchValue, dispatch, searchPath]);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setAnimation(true);

    setState(open);
  };

  const getToPost = async (toPost, id) => {
    reset();
    if (
      searchValue !== "" ||
      isActiveMonthlyPrediction ||
      isActiveWeeklyPrediction
    ) {
      try {
        let result = await axios.get(
          process.env.REACT_APP_BACKEND_ADMIN +
            "search-page-number?id=" +
            id +
            "&category=" +
            category,
          config
        );
        if (result.data.status === 1) {
          setPost(result.data.data);
        } else {
          swal({
            title: "Get post data Error",
            text: "Error: " + result.data.message,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          });
        }
      } catch (error) {
        swal({
          title: "Get post data Error",
          text: "Error: " + error,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
      }
    } else {
      setPost(toPost);
    }
  };

  let title;
  let titleIcon;
  const responsiveIcon = {
    fontSize: {
      xs: "2rem",
      sm: "2.5rem",
      color: "white",
    },
    mr: 2,
  };
  switch (category) {
    case "ra":
      title = "Read Aloud";
      titleIcon = (
        <LocalLibraryIcon sx={{ ...responsiveIcon }}></LocalLibraryIcon>
      );
      break;
    case "rs":
      title = "Repeat Sentence";
      titleIcon = <MenuBookIcon sx={{ ...responsiveIcon }}></MenuBookIcon>;
      break;
    case "rl":
      title = "Retell Lecture";
      titleIcon = (
        <InterpreterModeIcon sx={{ ...responsiveIcon }}></InterpreterModeIcon>
      );
      break;
    case "di":
      title = "Describe Image";
      titleIcon = (
        <ImageSearchIcon sx={{ ...responsiveIcon }}></ImageSearchIcon>
      );
      break;
    case "asq":
      title = "Answer Short Question";
      titleIcon = (
        <QuestionAnswerIcon sx={{ ...responsiveIcon }}></QuestionAnswerIcon>
      );
      break;
    case "we":
      title = "Write Essay";
      titleIcon = (
        <FormatAlignCenterRoundedIcon
          sx={{ ...responsiveIcon }}
        ></FormatAlignCenterRoundedIcon>
      );
      break;
    case "swt":
      title = "Summarized Written text";
      titleIcon = (
        <SummarizeRoundedIcon sx={{ ...responsiveIcon }}></SummarizeRoundedIcon>
      );
      break;
    case "rsmc":
      title = "Single Answer";
      titleIcon = <RuleIcon sx={{ ...responsiveIcon }}></RuleIcon>;
      break;
    case "rmc":
      title = "Multiple Choice";
      titleIcon = (
        <ChecklistRtlIcon sx={{ ...responsiveIcon }}></ChecklistRtlIcon>
      );
      break;
    case "rfib":
      title = "Fill in the blank";
      titleIcon = (
        <TypeSpecimenIcon sx={{ ...responsiveIcon }}></TypeSpecimenIcon>
      );
      break;
    case "rop":
      title = "Reorder paragraph";
      titleIcon = (
        <SegmentIcon sx={{ ...responsiveIcon, mt: 0.2 }}></SegmentIcon>
      );
      break;
    case "rwfib":
      title = "R&W FIB";
      titleIcon = (
        <SegmentIcon sx={{ ...responsiveIcon, mt: 0.2 }}></SegmentIcon>
      );
      break;
    case "smc":
      title = "Single Answer";
      titleIcon = <RuleIcon sx={{ ...responsiveIcon }}></RuleIcon>;
      break;
    case "mc":
      title = "Multiple Choice";
      titleIcon = (
        <ChecklistRtlIcon sx={{ ...responsiveIcon }}></ChecklistRtlIcon>
      );
      break;
    case "hcs":
      title = "Highlight Correct Summary";
      titleIcon = (
        <PlaylistAddCheckIcon sx={{ ...responsiveIcon }}></PlaylistAddCheckIcon>
      );
      break;
    case "hiw":
      title = "Highlight Incorrect Words";
      titleIcon = (
        <AutoFixHighIcon sx={{ ...responsiveIcon }}></AutoFixHighIcon>
      );
      break;
    case "smw":
      title = "Select Missing Word";
      titleIcon = <SpellcheckIcon sx={{ ...responsiveIcon }}></SpellcheckIcon>;
      break;
    case "fib":
      title = "Fill in the blank";
      titleIcon = (
        <FormatColorTextIcon sx={{ ...responsiveIcon }}></FormatColorTextIcon>
      );
      break;
    case "sst":
      title = "Summarized Spoken Text";
      titleIcon = <MessageIcon sx={{ ...responsiveIcon }}></MessageIcon>;
      break;

    case "wfd":
      title = "Write from Dictation";
      titleIcon = <EditNoteIcon sx={{ ...responsiveIcon }}></EditNoteIcon>;
      break;

    default:
      break;
  }

  const list = () => (
    <>
      <Box sx={styles.listContainer}>
        <Box sx={{ my: "auto", ml: 2 }}>{titleIcon}</Box>
        <Typography
          variant="h5"
          sx={{
            padding: "0.5rem",
            color: "white",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Paper component="form" sx={styles.searchText}>
        <InputBase
          sx={{ ml: 1, flex: 1, minWidth: "5rem" }}
          value={searchValue}
          onChange={({ target: { value } }) => setSearchValue(value)}
          placeholder="Search  "
          inputProps={{ "aria-label": "search table" }}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Button
          variant="contained"
          sx={{
            backgroundColor: isActiveMonthlyPrediction ? "primary" : "grey",
          }}
          onClick={() => {
            setIsActiveWeeklyPrediction(false);
            setIsActiveMonthlyPrediction((prev) => !prev);
          }}
        >
          <i
            className="fa-solid fa-square-parking fa-xl"
            style={{ color: "#4dabf5", marginRight: 2 }}
          ></i>
          {currentMonthName} Prediction
        </Button>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Button
          variant="contained"
          sx={{
            backgroundColor: isActiveWeeklyPrediction ? "primary" : "grey",
          }}
          onClick={() => {
            setIsActiveMonthlyPrediction(false);
            setIsActiveWeeklyPrediction((prev) => !prev);
          }}
        >
          <i
            className="fa-solid fa-file-word fa-xl"
            style={{ color: "#4dabf5", marginRight: 2 }}
          ></i>
          Current Week Prediction
        </Button>
      </Paper>
      <Box sx={styles.postListContainer}>
        {testPostListStatus === "succeeded" && (
          <List sx={styles.postList}>
            {testPostList[category]?.data.map((test, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  background:
                    currentPage == test.post_number
                      ? "rgba(210, 210, 210,0.8)"
                      : "",
                }}
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                  }}
                  disabled={status === "succeeded" ? false : true}
                  onClick={() =>
                    getToPost(
                      page > 1 ? (page - 1) * 10 + index + 1 : index + 1,
                      test.id
                    )
                  }
                >
                  <Box sx={{ width: "30%", margin: "0 0.5rem" }}>
                    <Typography sx={styles.postNumberText}>
                      {category.toUpperCase()} {test.post_number}
                    </Typography>
                  </Box>
                  <Box sx={styles.postTitleLayout}>
                    <ListItemText
                      primaryTypographyProps={{
                        style: {
                          ...styles.postTitleText,
                        },
                      }}
                      primary={test.title}
                    />
                    {test?.start_date !== null &&
                      test?.start_date !== undefined &&
                      !isActiveWeeklyPrediction &&
                      new Date(test?.start_date)?.getMonth() + 1 ===
                        currentMonth &&
                      new Date(test?.start_date)?.getFullYear() ===
                        currentDate.getFullYear() && (
                        <ListItemIcon>
                          <i
                            className="fa-solid fa-square-parking fa-xl"
                            style={{ color: "#4dabf5" }}
                          ></i>
                        </ListItemIcon>
                      )}
                    {test?.start_date !== null &&
                      test?.start_date !== undefined &&
                      isActiveWeeklyPrediction && (
                        <ListItemIcon>
                          <i
                            className="fa-solid fa-file-word fa-xl"
                            style={{ color: "#4dabf5" }}
                          ></i>
                        </ListItemIcon>
                      )}
                  </Box>
                </ListItemButton>

                {currentPage == test.post_number ? (
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "green" }} />
                  </ListItemIcon>
                ) : (
                  <></>
                )}
              </ListItem>
            ))}
          </List>
        )}
        {testPostListStatus === "failed" && (
          <ReloadOrBackCard
            header={
              <Typography>
                Failed to fetch data {testPostListError} .You can reload or go
                back
              </Typography>
            }
          />
        )}
        {(testPostListStatus === "loading" || testPostListStatus === null) && (
          <Box>
            <CircularProgress />
          </Box>
        )}
      </Box>
      <Box sx={{ mx: 1.5, width: "90%" }}>
        <PaginationComponent
          page={page}
          size={"medium"}
          totalPage={testPostList[category]?.last_page}
          handleChange={handleChange}
        ></PaginationComponent>
      </Box>
    </>
  );

  const drawerIconAnimationObj = (width, mode = "") => {
    let animation;
    if (mode === "reverse") {
      animation = {
        "0%": {
          transform: `translateX(calc(100vw * ${width}))`,
          backgroundColor: "#4dabf5",
        },

        "100%": {
          transform: `translateX(0)`,
          backgroundColor: "#4dabf5",
        },
      };
    } else {
      animation = {
        "0%": {
          transform: `translateX(0)`,
          backgroundColor: "yellow",
        },

        "100%": {
          transform: `translateX(calc(-100vw * ${width}))`,
          backgroundColor: "yellow",
        },
      };
    }
    return animation;
  };

  const predictionBtnHandler = async () => {};

  return (
    <Box>
      <Box
        sx={{
          ...styles.iconContainer,
          "@keyframes horizontal-move": {
            xs: drawerIconAnimationObj("0.7"),
            md: drawerIconAnimationObj("0.5"),
          },
          "@keyframes reverse-move": {
            xs: drawerIconAnimationObj("0.7", "reverse"),
            md: drawerIconAnimationObj("0.5", "reverse"),
          },
          animation: animation
            ? state
              ? "0.2s horizontal-move"
              : "0.2s reverse-move ease"
            : "",
          animationFillMode: "forwards",
        }}
        onClick={toggleDrawer(!state)}
      >
        <Box
          sx={{
            overflow: "hidden",
            color: state ? "black" : "white",
          }}
        >
          {state ? <NavigateNextIcon /> : <NavigateBeforeIcon />}
        </Box>
      </Box>

      <ThemeProvider theme={theme}>
        <SwipeableDrawer
          anchor={"right"}
          open={state === null ? false : state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          PaperProps={{
            sx: { ...styles.paperStyle },
          }}
        >
          {list()}
        </SwipeableDrawer>
      </ThemeProvider>
    </Box>
  );
}

const styles = {
  paperStyle: {
    width: { xs: "70vw", md: "50vw" },
    overflow: "hidden",
  },

  iconContainer: {
    position: "absolute",
    top: "45%",
    width: "4rem",
    height: "4rem",
    right: "0",
    overflow: "hidden",
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
    zIndex: 1401,
    background: "#4dabf5",

    translation: "3s ease-in",
    // transform: "translate(-250px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: 4,
    border: "1px solid grey",
  },

  listContainer: {
    mb: "1rem",
    width: "auto",
    display: "flex",
    boxShadow: 4,
    backgroundColor: colorCode.themeColor.primary,
  },

  searchText: {
    p: "2px 4px",
    display: "flex",
    alignItems: "center",
    height: "auto",
    flexWrap: "wrap",
    width: "80%",

    mb: 1,
    ml: 2,
  },

  postListContainer: {
    width: "100%",
    overflow: "auto",
    height: "70%",
    my: { xs: "1rem", md: "2rem" },
  },
  listItem: {
    borderBottom: "2px solid grey",
  },

  postList: {
    borderTop: "2px solid grey",
    width: "100%",
    minWidth: "500px",
  },

  postNumberText: {
    backgroundColor: "#4dabf5",
    color: "white",
    borderRadius: "0.3rem",
    padding: "0.3rem",
    width: {
      xs: "95%",
      md: "60%",
    },
  },

  postTitleLayout: {
    width: "60%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postTitleText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};
