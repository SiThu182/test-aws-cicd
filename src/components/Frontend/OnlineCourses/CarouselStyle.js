export const CarouselStyle = {
  title: {
    width: {
      xs: "50%",
      sm: "30%",
    },
    mx: "auto",
    textAlign: "center",

    borderRadius: "1rem",
    color: "white",
    p: 1,
    mt: 2,
    boxShadow: 5,

    // background:
    //   "linear-gradient(18deg, rgba(2,0,36,1) 0%, rgba(147,147,255,1) 0%, rgba(0,212,255,1) 63%)",
    background: "#0CAFFF",
  },
  card: {
    m: 5,
    backgroundColor: "white",
  
    borderRadius: "1rem",
    "@keyframes widthCard-increase": {
      "0%": {
        opacity: "0",
        transform: "scale(0.5)",
      },
      "100%": {
        opacity: "1",
        transform: "scale(1)",
      },
    },
    animation: "0.5s widthCard-increase ease ",
    "& :hover .MuiSvgIcon-root ": {
      animation: "bounce2 2s ease infinite",

      "@keyframes bounce2": {
        "0%": { transform: "translateY(0)" },
        "20%": {
          transform: "translateY(-0px) rotate(360deg)",
        },
        "40%": { transform: "translateY(-30px)" },
        "50%": { transform: "translateY(0)" },
        "60%": { transform: "translateY(-15px)" },
        "80%": { transform: "translateY(0)" },
        "100%": { transform: "translateY(0)" },
      },
    },
  },
  feesBtn: {
    backgroundColor: "red",
    borderRadius: "1rem",
    p: 1,
    boxShadow: 5,
    color: "white",
    width: "100%",
  },

  iconBox: {
    position: "absolute",
    zIndex: "6",

    top: "-1rem",
    left: "0",
    // backgroundColor: "white",

    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentIcon: {
    fontSize: "3rem",
    borderRadius: "50%",
    color: "#FEBE10",

    background:
      "linear-gradient(29deg, rgba(132,123,179,1) 0%, rgba(30,189,235,1) 0%, rgba(30,167,192,1) 0%, rgba(54,220,251,1) 0%, rgba(17,36,239,1) 0%, rgba(85,114,255,1) 0%, rgba(63,138,255,1) 0%, rgba(21,61,74,1) 60%, rgba(243,243,243,1) 100%)",
    // background:
    //   " linear-gradient(29deg, rgba(132,123,179,1) 0%, rgba(72,47,205,1) 0%, rgba(30,167,192,1) 0%, rgba(54,220,251,1) 0%, rgba(17,36,239,1) 0%, rgba(11,55,69,1) 59%, rgba(243,243,243,1) 100%)",
  },
  list: {
    fontSize: {
      xs: "1rem",
      md: "1.1rem",
    },

    "& .MuiListItem-root": {
      display: "list-item",
    },
    "& .MuiListItem-root::marker": {
      color:
        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
    },
    "& .MuiListItem-padding": {
      py: 0,
      px: 1,
    },
  },
  boldNumber: {
    fontWeight: 700,
    color: "red",
  },

  btnBox: {
    position: "absolute",
    bottom: 1,
    left: "0",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  enrollBtn: {
    borderRadius: "5px",
    boxShadow: 2,
    border: "1px solid blue",
    color: "red",
    width: "40%",

    "&:hover": {
      // background:
      // "linear-gradient(29deg, rgba(144,167,255,1) 0%, rgba(62,47,47,1) 0%, rgba(35,61,162,1) 0%, rgba(16,70,243,1) 0%, rgba(253,253,253,1) 13%, rgba(248,249,252,1) 86%, rgba(16,70,243,1) 100%)",
      background: "blue",
      border: "1px solid white",
      color: "white",

      boxShadow: 5,
    },

    // // background:
    // //   "linear-gradient(29deg, rgba(132,123,179,1) 0%, rgba(30,189,235,1) 0%, rgba(30,167,192,1) 0%, rgba(54,220,251,1) 0%, rgba(17,36,239,1) 0%, rgba(85,114,255,1) 0%, rgba(63,138,255,1) 0%, rgba(21,61,74,1) 60%, rgba(243,243,243,1) 100%)",
  },

  discountCircle: {
    position: "absolute",
    top: 5,
    right: -1,
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",

    backgroundColor: "red",
    textAlign: "center",
    fontSize: "1rem",
    boxShadow: 3,
    "@keyframes widthCard-increase": {
      "0%": {
        opacity: "0",
        transform: "scale(0.5) ",
      },
      "100%": {
        opacity: "1",
        transform: "scale(1)",
      },
    },
    transform: "rotate(45deg)",
    animation: "1.5s widthCard-increase ease infinite",
  },
};
