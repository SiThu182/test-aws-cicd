export const FormStyle = {
  bg: {
    backgroundColor: "rgb(231 239 254)",
    width: "100%",
    height: "100vh",
    boxShadow: 5,
    overflowY: "scroll",
    py: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85vw",
    borderRadius: "1rem",
    height: "85vh",
    maxHeight: "1500px",
    maxWidth: "1500px",

    overflowY: "auto",
    margin: "auto",
    boxShadow: 5,
    position: "relative",
  },
  yellow: {
    position: "absolute",
    width: "70%",

    left: 0,
    height: 5,
    bgcolor: "#ffcf33",
  },
  blue: {
    height: 5,
    bgcolor: "blue",
    position: "absolute",
    width: "30%",
    zIndex: 2,
    right: 0,
  },
  red: {
    height: 5,
    bgcolor: "#b22a00",
    position: "absolute",
    width: "30%",
    zIndex: 2,
    left: 0,
  },
  img: {
    width: "50%",
    margin: "0 auto",
  },
  content: {
    mt: "5px",
    textAlign: "center",
    padding: "0px !important",
    "& .MuiTypography-p": {
      textAlign: "left",
    },
  },
  formHeading: {
    fontSize: "1.5rem",
    mb: 1,
  },
  inputIcon: {
    pt: 1.7,
    m: 0,
    position: "absolute",
    right: 0,
    width: "17%",

    height: "100%",
    borderTopRightRadius: "0.3rem",
    borderBottomRightRadius: "0.3rem",
    bgcolor: "rgb(204 223 255)",
  },
  rememberMe: {
    display: "inline-flex",
    alignItems: "center",
    // position: "absolute",
    left: 0,
    bottom: "4rem",
  },
  cardAction: {
    m: 0,
    // px: 1.5,
    // position: "absolute",
    // bottom: 5,
    display: "flex",
    flexDirection: "column",
    "& .MuiTypography-root": {
      // width: "100%",
      // cursor: "pointer",
    },
    // "& .MuiLink-root": {},
  },
  cardFooter: {
    textAlign: "center",
    width: "100%",
  },
  terms: {
    display: "flex",
    justifyContent: "center",
    color: "rgb(25,118,210)",
    width: "100%",
    cursor: "pointer",
  },
  termsFont: {
    textDecoration: "underline",
    "&:hover": {
      color: "black",
    },
  },
};
