// icon
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SmartDisplayRoundedIcon from "@mui/icons-material/SmartDisplayRounded";
// import TwitterIcon from "@mui/icons-material/Twitter";
import { List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

function Footer({ bgColor }) {
  const navigate = useNavigate();
  const frontEndURL = process.env.REACT_APP_FRONTEND_URL;
  //custom css and responsive value

  const dynamicWaveColor =
    window.location.pathname === "/blog/details"
      ? "white"
      : bgColor === ""
      ? "rgb(227, 242, 253)"
      : bgColor;
  const footerBox = {
    // backgroundColor: "rgb(22,86,196)",
    backgroundColor: "#041E42",
    height: "30%",
    pl: {
      md: 0,
      sm: 0,
      xs: 0,
    },
  };

  const footerTitle = {
    fontSize: {
      xs: "16px",
      sm: "17px",
      md: "1.4rem",
    },
    fontWeight: 600,

    mb: "0.4rem",
  };
  const titleLine = {
    width: "5rem",
    height: {
      xs: "2px",
      sm: "3px",
      md: "5px",
    },

    mb: {
      xs: "5px",
      sm: "7px",
      md: "1rem",
    },
    backgroundColor: "yellow",
  };

  const listFont = {
    fontSize: {
      xs: "14px",
      sm: "15px",
      md: "1rem",
    },

    color: "#ffff",
  };

  // const socialFlex = {
  //   display: "flex",
  //   width: "10rem",
  //   justifyContent: "flex-start",
  // };

  const listIcon = {
    fontSize: "1.7rem",
    color: "rgb(22,86,196)",
    borderRadius: "50%",
    backgroundColor: "#000",
    mr: 1,
  };

  const copyRight = {
    fontSize: "0.5rem",
    height: "5%",
    fontWeight: "400",
    backgroundColor: "yellow",
    display: "flex",

    flexWrap: "wrap",

    justifyContent: "space-between",
    // backgroundColor: "rgb(22,86,196)",
    textAlign: "center",
    px: {
      xs: 3,
      sm: 5,
      md: 10,
    },
    pt: "0.2rem",
  };

  return (
    <Box component={"footer"}>
      <Box
        sx={{
          background: "#041E42",

          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "2px",
            width: "100%",
            backgroundColor: bgColor,
          }}
        ></span>
        <svg
          id="wave"
          style={{ transform: "rotate(180deg)", transition: "0.3s" }}
          viewBox="0 0 1440 100"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            style={{ transform: "translate(0, 0px)", opacity: 1 }}
            fill={dynamicWaveColor}
            d="M0,50L48,56.7C96,63,192,77,288,83.3C384,90,480,90,576,76.7C672,63,768,37,864,33.3C960,30,1056,50,1152,55C1248,60,1344,50,1440,38.3C1536,27,1632,13,1728,21.7C1824,30,1920,60,2016,71.7C2112,83,2208,77,2304,68.3C2400,60,2496,50,2592,45C2688,40,2784,40,2880,38.3C2976,37,3072,33,3168,36.7C3264,40,3360,50,3456,46.7C3552,43,3648,27,3744,31.7C3840,37,3936,63,4032,66.7C4128,70,4224,50,4320,40C4416,30,4512,30,4608,40C4704,50,4800,70,4896,80C4992,90,5088,90,5184,83.3C5280,77,5376,63,5472,61.7C5568,60,5664,70,5760,61.7C5856,53,5952,27,6048,15C6144,3,6240,7,6336,16.7C6432,27,6528,43,6624,45C6720,47,6816,33,6864,26.7L6912,20L6912,100L6864,100C6816,100,6720,100,6624,100C6528,100,6432,100,6336,100C6240,100,6144,100,6048,100C5952,100,5856,100,5760,100C5664,100,5568,100,5472,100C5376,100,5280,100,5184,100C5088,100,4992,100,4896,100C4800,100,4704,100,4608,100C4512,100,4416,100,4320,100C4224,100,4128,100,4032,100C3936,100,3840,100,3744,100C3648,100,3552,100,3456,100C3360,100,3264,100,3168,100C3072,100,2976,100,2880,100C2784,100,2688,100,2592,100C2496,100,2400,100,2304,100C2208,100,2112,100,2016,100C1920,100,1824,100,1728,100C1632,100,1536,100,1440,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
          ></path>
        </svg>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="rgb(227 242 253)"
            fill-opacity="1"
            d="M0,288L48,282.7C96,277,192,267,288,266.7C384,267,480,277,576,277.3C672,277,768,267,864,256C960,245,1056,235,1152,229.3C1248,224,1344,224,1392,224L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg> */}
      </Box>
      <Box sx={{ ...footerBox }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "space-between",
            },

            px: {
              xs: 1,
              md: 10,
            },
            width: {
              md: "100%",
              lg: "90%",
              xl: "80rem",
            },
            margin: "0 auto",
            // backgroundColor: "rgb(22,86,196)",
            backgroundColor: "#041E42",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
            },
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "33%" }, mx: "auto" }}>
            <Typography
              variant="h3"
              component="h3"
              sx={{ ...footerTitle }}
              style={{ color: "white" }}
            >
              Aigma PTE Ai
            </Typography>
            <Typography
              variant="body1"
              sx={{
                ...titleLine,
              }}
            ></Typography>
            <List disablePadding sx={{ ...listFont }} style={{ padding: 0 }}>
              {/* <ListItem
                sx={{
                  padding: {
                    xs: "3px 0",
                    sm: "5px 0",
                    md: "6px 0",
                  },
                  cursor: "pointer",
                }}
              >
                <NavLink
                  href="#"
                  style={{ textDecoration: "none", ...listFont }}
                >
                  About us
                </NavLink>
              </ListItem> */}
              <ListItem
                sx={{
                  padding: {
                    xs: "3px 0",
                    sm: "5px 0",
                    md: "6px 0",
                  },
                }}
              >
                107/31-35 Smallwood Ave
                <br />
                Homebush NSW Australia 2140
              </ListItem>
              <ListItem
                sx={{
                  padding: {
                    xs: "3px 0",
                    sm: "5px 0",
                    md: "6px 0",
                  },
                  "&:hover": {
                    color: "yellow",
                  },
                }}
              >
                <a
                  className="infoNav"
                  href="mailto:info@smarteduglobe.com"
                  style={{ ...listFont, color: "inherit", textWrap: "wrap" }}
                >
                  info@smarteduglobe.com
                </a>
              </ListItem>
              <ListItem
                sx={{
                  padding: {
                    xs: "3px 0",
                    sm: "5px 0",
                    md: "6px 0",
                  },
                  "&:hover": {
                    color: "yellow",
                  },
                }}
              >
                <a
                  href=" https://www.smarteduglobe.com"
                  style={{ ...listFont, color: "inherit" }}
                  target="_blank"
                >
                  www.smarteduglobe.com
                </a>
              </ListItem>
              <ListItem
                sx={{
                  padding: {
                    xs: "3px 0",
                    sm: "5px 0",
                    md: "6px 0",
                  },
                  mb: "1rem",
                }}
              >
                +61 483 858 266
              </ListItem>
            </List>
            <Typography sx={{ color: "white" }}>Follow Us:</Typography>
            <List
              disablePadding
              sx={{
                ...listFont,
                display: "flex",
                justifyContent: "flex-start",
                width: "50%",
              }}
            >
              <ListItem disableGutters={true}>
                <a
                  href="https://www.facebook.com/profile.php?id=100093900947184"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookRoundedIcon
                    sx={{
                      ...listIcon,
                      ":hover": {
                        color: "white",
                        cursor: "pointer",
                      },
                    }}
                  ></FacebookRoundedIcon>
                </a>
              </ListItem>
              <ListItem disableGutters={true}>
                <a
                  href="https://www.youtube.com/channel/UCO71pMg5GFDRBTvtBsWjUog"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SmartDisplayRoundedIcon
                    sx={{
                      ...listIcon,
                      ":hover": {
                        color: "white",
                        cursor: "pointer",
                      },
                    }}
                  ></SmartDisplayRoundedIcon>
                </a>
              </ListItem>
              {/* <ListItem disableGutters={true}>
                <TwitterIcon sx={{ ...listIcon }}></TwitterIcon>
              </ListItem> */}
              <ListItem disableGutters={true}>
                <a href="#" target="_blank" rel="noreferrer">
                  <LinkedInIcon
                    sx={{
                      ...listIcon,
                      ":hover": {
                        color: "white",
                        cursor: "pointer",
                      },
                    }}
                  ></LinkedInIcon>
                </a>
              </ListItem>

              <ListItem disableGutters={true}>
                <a href="#" target="_blank" rel="noreferrer">
                  <InstagramIcon
                    sx={{
                      ...listIcon,
                      ":hover": {
                        color: "white",
                        cursor: "pointer",
                      },
                    }}
                  ></InstagramIcon>
                </a>
              </ListItem>
            </List>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "33%" }, mx: "auto" }}>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                ...footerTitle,
                pl: {
                  xs: 0,
                  sm: 0,
                },
              }}
              style={{ color: "white" }}
            >
              PTE Resources
            </Typography>
            <Typography
              variant="body1"
              sx={{
                ...titleLine,
                ml: {
                  xs: 0,
                  sm: 0,
                },
              }}
            ></Typography>
            <List disablePadding sx={{ ...listFont, m: 0, p: 0 }}>
              <ListItem
                disableGutters={true}
                onClick={() => navigate("/front/mocktest")}
                sx={{
                  padding: {
                    xs: "3px 0",
                    sm: "5px 0",
                    md: "6px 0",
                  },
                  cursor: "pointer",
                  "&:hover": {
                    color: "yellow",
                  },
                }}
              >
                PTE Mock Test
              </ListItem>
              <ListItem
                disableGutters={true}
                onClick={() => navigate("/front/speaking")}
                sx={{
                  padding: {
                    xs: "3px 0",
                    sm: "5px 0",
                    md: "6px 0",
                  },
                  cursor: "pointer",
                  "&:hover": {
                    color: "yellow",
                  },
                }}
              >
                PTE Speaking
              </ListItem>
              <ListItem
                disableGutters={true}
                onClick={() => navigate("/front/writing")}
                sx={{
                  padding: {
                    xs: "3px 0",
                    sm: "5px 0",
                    md: "6px 0",
                  },
                  cursor: "pointer",
                  "&:hover": {
                    color: "yellow",
                  },
                }}
              >
                PTE Writing
              </ListItem>
              <ListItem
                disableGutters={true}
                onClick={() => navigate("/front/reading")}
                sx={{
                  padding: {
                    xs: "3px 0",
                    sm: "5px 0",
                    md: "6px 0",
                  },
                  cursor: "pointer",
                  "&:hover": {
                    color: "yellow",
                  },
                }}
              >
                PTE Reading
              </ListItem>
              <ListItem
                disableGutters={true}
                onClick={() => navigate("/front/listening")}
                sx={{
                  padding: {
                    xs: "3px 0",
                    sm: "5px 0",
                    md: "6px 0",
                  },
                  cursor: "pointer",
                  "&:hover": {
                    color: "yellow",
                  },
                }}
              >
                PTE Listening
              </ListItem>
              <ListItem
                disableGutters={true}
                sx={{
                  padding: {
                    xs: "3px 0",
                    sm: "5px 0",
                    md: "6px 0",
                  },
                  mb: "1rem",
                  cursor: "pointer",
                  "&:hover": {
                    color: "yellow",
                  },
                }}
                onClick={() => navigate("/blog")}
              >
                Blog
              </ListItem>
            </List>
          </Box>

          <Box sx={{ width: { xs: "100%", md: "33%" }, mx: "auto" }}>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                ...footerTitle,
                pl: {
                  xs: 0,
                  sm: 0,
                },
                textAlign: {
                  sm: "left",
                },
              }}
              style={{ color: "white" }}
            >
              Study Channel
            </Typography>
            <Typography
              variant="body1"
              sx={{
                ...titleLine,
                ml: {
                  xs: 0,
                  sm: 0,
                },
              }}
            ></Typography>

            <Box
              sx={{
                display: {
                  // md: "block",
                  // sm: "none",
                  // xs: "none",
                },
                width: "100%",
              }}
            >
              <img
                style={{
                  width: "7rem",
                  marginBottom: "2rem",
                }}
                src={`${frontEndURL}Image/ViberQR.png`}
                alt="viber-qr"
              />
              <img
                style={{ width: "7rem", marginBottom: "2rem" }}
                src={`${frontEndURL}Image/TelegramQR.png`}
                alt="viber-qr"
              />
              {/* <a
                    href="https://t.me/+XZXwQFFIuXc5OGZl"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TelegramIcon
                      sx={{
                        ...listIcon,

                        ":hover": {
                          color: "white",
                          cursor: "pointer",
                        },
                      }}
                    ></TelegramIcon> */}
              {/* </a> */}
            </Box>
          </Box>
          {/* <Box>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                ...footerTitle,
                pl: {
                  xs: 0,
                  sm: 0,
                },
                textAlign: {
                  sm: "left",
                },
              }}
              style={{ color: "white" }}
            >
              Location
            </Typography>
            <Typography
              variant="body1"
              sx={{
                ...titleLine,
                ml: {
                  xs: 0,
                  sm: 0,
                },
              }}
            ></Typography>

            <Box
              sx={{
                display: {
                  // md: "block",
                  // sm: "none",
                  // xs: "none",
                },
                width: "100%",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d611.5917667988049!2d151.0767932626034!3d-33.86373184844233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12bb30da4aa357%3A0xcd0c5a4431c4ead4!2s107%2F31%20Smallwood%20Ave%2C%20Homebush%20NSW%202140%2C%20Australia!5e0!3m2!1sen!2smm!4v1687231206715!5m2!1sen!2smm"
                title="ismart-map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ minWidth: "5rem", width: "100%" }}
              ></iframe>
            </Box>
          </Box> */}
        </Box>
      </Box>
      <Box sx={{ ...copyRight }}>
        <Typography variant="h6" sx={{ fontSize: "1rem" }}>
          Copyright {new Date().getFullYear()} © by{" "}
          <span style={{ color: "rgb(4 30 66)", fontWeight: "800" }}>
            {" "}
            Aigma PTE Ai
          </span>
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1rem",
              mr: "1rem",
              "&:hover": {
                color: "white",
              },
              cursor: "pointer",
            }}
          >
            Terms and Conditions
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1rem",
              "&:hover": {
                color: "white",
              },
              cursor: "pointer",
            }}
          >
            Privacy and Policy
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
