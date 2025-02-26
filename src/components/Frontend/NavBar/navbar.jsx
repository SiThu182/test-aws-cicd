import MenuIcon from "@mui/icons-material/Menu";
// import LanguageIcon from "@mui/icons-material/Language";

// import NotificationsIcon from "@mui/icons-material/Notifications";
// import SearchIcon from "@mui/icons-material/Search";
import { Badge, Divider, Link, Tooltip,FormControl } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LanguageIcon from "@mui/icons-material/Language";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../../features/auth/authSlice";
import { setCountry, userLogout } from "../../../redux/slice/UserSlice";
import { fetchUserAsync } from "../../../redux/thunk/Users";

import { getCookie } from "../../../Utils/GetCookies";

import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

// import { userLogout } from "../../../redux/slice/UserSlice";

// const subscriptionPages = [pages[12]];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const buttonFont = createTheme({
  typography: {
    fontFamily: ["Josefin Sans", "sans-serif"].join(","),
    textTrasform: "none",
  },
});

const menuItems = ["MMK", "USD", "AUD", "THB", "SGD", "NZD"];

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user, country } = useSelector((state) => state.user);
  // const {countries,setCountries} = useState([
  //   "Myanmar","AUD","USD"
  // ])

  const navigate = useNavigate();
  const token = getCookie("userToken");
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const pages = [
    [t("home", { ns: "navbar" }), "/"],
    [t("speak", { ns: "navbar" }), "/front/speaking"],
    [t("write", { ns: "navbar" }), "/front/writing"],
    [t("read", { ns: "navbar" }), "/front/reading"],
    [t("listen", { ns: "navbar" }), "/front/listening"],
    ["Mock Test", "/front/mocktest"],
    [t("online-course", { ns: "navbar" }), "/front/onlineCourses/aigmapte"],
    [t("blog", { ns: "navbar" }), "/blog"],
    ["Marking", "/marking"],
    ["Materials Download", "/materials-download"],
    ["Help (Q & A)", "/feedback"],
    ["PTE Core", "/pte-core"],
    [t("buy", { ns: "navbar" }), "/front/subscription-plan"],
    ["Shop", "/pte-shop"],
    ["Recording Course", "/recording-course"],

  ];
  
  const practicePages = [pages[1], pages[2], pages[3], pages[4], pages[5]];
  const mainMenuPages = [pages[12], pages[6], pages[7], pages[11],pages[13],pages[14]]; //,pages[14]
  const morePages = [pages[8], pages[9], pages[10]];
 
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // const { user } = useSelector((state) => state.user);

  const anchorRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const open1 = Boolean(anchorEl);
  const [subMenuOpen, setSubMenuOpen] = React.useState(false);

  const [language, setLanguage] = React.useState("en");
  const [currency, setCurrency] = React.useState("");

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const openLocalizationSelect = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  React.useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (user === null && userId !== null) {
      dispatch(fetchUserAsync(userId));
    }
    // dispatch(fetchAllCountryAsync());
  }, [dispatch, user]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // const chooseCountry = (country) => {
  //   localStorage.setItem("country_status", 1);

  //   dispatch(setCountry(country));

  //   handleClose1();
  // };
  // const handleClose1 = () => {
  //   setAnchorEl(null);
  // };

  const handleChange = (value) => {
    localStorage.setItem("country_status", 1);

    //   dispatch(setCountry(country));
    // setAge(event.target.value);
    setCurrency(value);
    dispatch(setCountry(value));
  };

  const menuClickHandler = (event, path) => {
    handleClose(event);
    navigate(path);
  };

  const goToProfile = () => {
    navigate("/profile");
    setOpen(false);
  };

  const goToDashboard = () => {
    navigate("/admin/dashboard");
    setOpen(false);
  };

  const logOut = () => {
    dispatch(userLogout());
    dispatch(logout());
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navStyle = {
    textDecoration: "none",
    color: "#000",
    fontSize: {
      md: 17,
    },
    fontFamily: "Josefin Sans",
    fontWeight: 600,

    mr: {
      md: 1,
      lg: 2,
    },
    transition: "color 200ms ease",
    display: "block",
    textTransform: "none",
    "&:hover": {
      color: "#ba000d",
      cursor: "pointer",
    },
    "&:active": {
      color: "#000",
    },
  };

  const logInStyle = {
    fontSize: {
      xs: 9,
      md: 10,
      lg: 13,
    },
    transistionProperty: "color",
    transistionDuration: "400ms",
    transistionTimerFunction: "ease-in",
    position: {
      xs: "relative",
    },

    "&:hover": {
      color: "#000",
    },
    "&:active": {
      color: "#ffff",
    },
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };
  return (
    <Box component={"nav"}>
      <AppBar
        sx={{
          bgcolor: "#fff",
          boxShadow: 25,
          position: "sticky",
          height: "10%",
          // "& .MuiContainer-root .css-xkfxkh-MuiContainer-root": {
          //   bgcolor: "blue",
          //   maxWidth: "2600px",
          // },
        }}
        style={{
          backgroundColor: "",
          boxShadow: "0 0 3px 1px #0002",
        }}
        elevation={10}
        className="Nav-bar"
      >
        <Container
          maxWidth={false}
          sx={{
            width: "90vw",

            "& .MuiContainer-root": {
              padding: "0",
            },
          }}
          style={{ width: "97vw", padding: 0, margin: 0 }}
        >
          <Toolbar disableGutters sx={{ width: "100%" }}>
            <Box
              sx={{
                width: {
                  xs: "7rem",
                  md: "10rem",
                },
              }}
            >
              <img
                src={process.env.REACT_APP_FRONTEND_URL + "Image/AigmaLogo.png"}
                alt="pte-logo"
                style={{
                  marginRight: "1rem",
                  width: "100%",
                }}
              />
            </Box>

            <ThemeProvider theme={buttonFont}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  width: { md: "30rem" },
                }}
              >
                <Box
                  sx={{
                    ...navStyle,
                    "& .text-red": {
                      color: "red",
                    },
                  }}
                >
                  <Link
                    component={RouterLink}
                    underline="none"
                    to={pages[0][1]}
                    // href={page[1]}
                    sx={{
                      ...navStyle,
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    className={
                      `navlinkCustom ` +
                      (window.location.pathname === pages[0][1]
                        ? "text-red"
                        : "")
                    }
                  >
                    {pages[0][0]}
                  </Link>
                </Box>
                {/* submenu */}
                <Tooltip
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: "white",
                      },
                    },
                  }}
                  title={practicePages.map((page, index) => (
                    <MenuItem
                      key={index}
                      sx={{ transition: "1s ease" }}
                      onClick={() => {
                        setSubMenuOpen(false);
                      }}
                    >
                      <Link
                        component={RouterLink}
                        underline="none"
                        to={page[1]}
                      >
                        <Typography
                          textAlign="center"
                          sx={{
                            ...navStyle,
                            width: "100%",
                            color:
                              window.location.pathname === page[1]
                                ? "red"
                                : "black",
                          }}
                        >
                          {page[0]}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                >
                  <Box
                    sx={{
                      ...navStyle,
                      "& .text-red": {
                        color: "red",
                      },
                    }}
                  >
                    <Link
                      component={RouterLink}
                      underline="none"
                      sx={{
                        ...navStyle,
                        "&:hover": {
                          color: "red",
                          cursor: "pointer",
                        },
                      }}
                      className={
                        `navlinkCustom ` +
                        (window.location.pathname === "/front/speaking" ||
                        window.location.pathname === "/ front / reading" ||
                        window.location.pathname === "/front/writing" ||
                        window.location.pathname === "/front/listening" ||
                        window.location.pathname === "/front/mockTest"
                          ? "text-red"
                          : "")
                      }
                    >
                      {t("practice", { ns: "navbar" })}
                    </Link>
                  </Box>
                </Tooltip>

                {mainMenuPages.map((page, index) => (
                  <Box
                    key={index}
                    sx={{
                      ...navStyle,
                      "& .text-red": {
                        color: "red",
                      },
                    }}
                  >
                    <Badge
                      badgeContent={page[0] === "PTE Core" ? "New" : ""}
                      color={page[0] === "PTE Core" ? "error" : ""}
                      sx={{ mr: page[0] === "PTE Core" ? 2 : 0 }}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <Link
                        component={RouterLink}
                        underline="none"
                        to={page[1]}
                        // href={page[1]}
                        sx={{
                          ...navStyle,
                          "&:hover": {
                            color: "red",
                            cursor: "pointer",
                          },
                        }}
                        className={
                          `navlinkCustom ` +
                          (window.location.pathname === page[1]
                            ? "text-red"
                            : "")
                        }
                      >
                        {/* {page[0] === "PTE Core" ? (
                        <Badge badgeContent={100} color="blue">
                          {page[0]}
                        </Badge>
                      ) : (
                        <>{page[0]}</>
                      )} */}

                        {page[0]}
                      </Link>
                    </Badge>
                  </Box>
                ))}

                <Tooltip
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: "white",
                      },
                    },
                  }}
                  title={morePages.map((page, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setSubMenuOpen(false);
                      }}
                    >
                      <Link
                        component={RouterLink}
                        underline="none"
                        key={index}
                        to={page[1]}
                      >
                        <Typography
                          textAlign="center"
                          sx={{
                            ...navStyle,
                            width: "100%",
                            color:
                              window.location.pathname === page[1]
                                ? "red"
                                : "black",
                          }}
                        >
                          {page[0]}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                >
                  <Box
                    sx={{
                      ...navStyle,
                      "& .text-red": {
                        color: "red",
                      },
                    }}
                  >
                    <Link
                      component={RouterLink}
                      underline="none"
                      sx={{
                        ...navStyle,
                        "&:hover": {
                          color: "red",
                          cursor: "pointer",
                        },
                      }}
                      className={
                        `navlinkCustom ` +
                        (window.location.pathname === "/materials-download" ||
                        window.location.pathname === "/feedback"
                          ? "text-red"
                          : "")
                      }
                    >
                      {t("more", { ns: "navbar" })}
                    </Link>
                  </Box>
                </Tooltip>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: {
                    xs: "90%",
                    md: "30%",
                  },
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  {/* <Button
                  onClick={handleClick}
                  sx={{
                    p: 2,
                    mr: 1,
                    "&:hover": {
                      "& .MuiSvgIcon-root": {
                        color: "blue",
                      },
                    },
                  }}
                >
                  <CurrencyExchangeIcon
                    sx={{
                      color: "black",
                      my: "auto",
                      display: {
                        xs: "none",
                        md: "block",
                      },
                    }}
                  >
                    {country !== "Myanmar" ? country : "MMK"}
                  </Typography>
                  <Button
                    onClick={handleClick}
                    sx={{
                      p: 2,
                      mr: 1,
                      "&:hover": {
                        "& .MuiSvgIcon-root": {
                          color: "blue",
                        },
                      },
                    }}
                  >
                    <CurrencyExchangeIcon
                      sx={{
                        color: "black",
                        boxShadow: 4,
                        borderRadius: 3,
                      }}
                    ></CurrencyExchangeIcon>
                  </Button>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open1}
                    onClose={handleClose1}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    AUD
                  </MenuItem>
                </Menu> */}
                  <Button
                    id="demo-positioned-button"
                    aria-controls={
                      openLocalizationSelect
                        ? "demo-positioned-menu"
                        : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={openLocalizationSelect ? "true" : undefined}
                    onClick={handleClick1}
                    sx={{ mx: 2 }}
                  >
                    <LanguageIcon />
                  </Button>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl1}
                    open={openLocalizationSelect}
                    onClose={handleClose1}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    slotProps={{
                      paper: {
                        width: "10rem",
                        sx: {
                          width: "10rem",
                          p: 2,
                        },
                      },
                    }}
                    sx={{
                      "&.MuiPaper-root": {
                        width: "10rem",
                        background: "black",
                      },
                      "&.MuiList-root": {
                        width: "10rem",
                        background: "black",
                      },
                      p: 2,
                    }}
                  >
                    <Typography>Language</Typography>
                    <MenuItem
                      value={"en"}
                      onClick={() => handleLanguageChange("en")}
                      selected={language === "en"}
                    >
                      English
                    </MenuItem>
                    <MenuItem
                      value={"my"}
                      onClick={() => handleLanguageChange("my")}
                      selected={language === "my"}
                    >
                      Myanmar
                    </MenuItem>
                    <Divider />
                    <Typography>Currency</Typography>
                    {menuItems?.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item}
                        onClick={() => handleChange(item)}
                        selected={currency === item}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>

                {token !== null ? (
                  <Box
                    sx={{
                      flexGrow: 0,
                    }}
                  >
                    {/* <IconButton aria-label="">
                  <SearchIcon
                    sx={{
                      fontSize: {
                        xs: "1rem",
                        sm: "1.5rem",
                        md: "2rem",
                      },
                    }}
                  ></SearchIcon>
                </IconButton>
                <IconButton>
                  <NotificationsIcon
                    sx={{
                      fontSize: {
                        xs: "1rem",
                        sm: "1.5rem",
                        md: "2rem",
                      },
                    }}
                  ></NotificationsIcon>
                </IconButton> */}

                    <Box display={"inline"}>
                      <Button
                        onClick={goToDashboard}
                        variant="contained"
                        size="medium"
                      >
                        Dashboard
                      </Button>

                      {/* <Button
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? "composition-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        sx={{
                          color: "rgb(117 117 117)",
                        }}
                      >
                        {user?.data?.image ? (
                          <Box
                            sx={{
                              borderRadius: "50%",
                              width: "3rem",
                              overflow: "hidden",

                              height: "3rem",
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
                              style={{
                                width: "100%",
                                aspectRatio: 1,
                                objectFit: "cover",
                              }}
                              alt="user_img"
                            />
                          </Box>
                        ) : (
                          <AccountCircleIcon
                            sx={{
                              fontSize: {
                                xs: "1.5rem",

                                md: "2rem",
                              },
                            }}
                          ></AccountCircleIcon>
                        )}
                      </Button>
                      <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin:
                                placement === "bottom-start"
                                  ? "left top"
                                  : "left bottom",
                            }}
                          >
                            <Paper> 
                             <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                  autoFocusItem={open}
                                  id="composition-menu"
                                  aria-labelledby="composition-button"
                                  onKeyDown={handleListKeyDown}
                                >
                                  <MenuItem onClick={goToProfile}>
                                    Profile
                                  </MenuItem>
                                  <MenuItem onClick={goToDashboard}>
                                    Dashboard
                                  </MenuItem>
                                  <MenuItem onClick={logOut}>Logout</MenuItem>
                                </MenuList>
                              </ClickAwayListener> 
                            </Paper>
                          </Grow>
                        )}
                      </Popper> */}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      flexGrow: 0,
                      display: {
                        xs: "none",
                        md: "block",
                      },
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ ...logInStyle }}
                      href="/login"
                    >
                      Log in/Register
                    </Button>
                  </Box>
                )}
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                  justifyContent: "end",
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page, index) => (
                    <MenuItem
                      key={index}
                      onClick={(event) => menuClickHandler(event, page[1])}
                    >
                      <Typography
                        textAlign="center"
                        sx={{
                          ...navStyle,
                          width: "100%",
                          color:
                            window.location.pathname === page[1]
                              ? "red"
                              : "black",
                        }}
                      >
                        {page[0]}
                      </Typography>
                    </MenuItem>
                  ))}
                  {token === null && (
                    <MenuItem
                      onClick={(event) => menuClickHandler(event, "/login")}
                    >
                      <Typography
                        textAlign="center"
                        sx={{
                          ...navStyle,
                          width: "100%",
                        }}
                      >
                        Log In / Register
                      </Typography>
                    </MenuItem>
                  )}
                </Menu>
              </Box>
            </ThemeProvider>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
export default ResponsiveAppBar;
