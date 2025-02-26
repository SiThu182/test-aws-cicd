export const FrontEndStyle = {
  icon: {
    fontSize: "2.5rem",
    color: "black",
    cursor: "pointer",
    background:
      "radial-gradient(circle, rgba(228,228,228,1) 30%, rgba(5,255,248,1) 100%)",
    //   "radial-gradient(circle, rgba(90,221,255,1) 0%, rgba(207,218,97,1) 100%)",
    //   "linear-gradient(45deg, rgba(129,147,41,1) 0%, rgba(121,105,9,1) 0%, rgba(218,222,22,1) 0%, rgba(0,212,255,1) 100%)",
    borderRadius: "20%",
    boxShadow: 5,
    "&:hover": {
      "@keyframes hithere": {
        "30%": {
          transform: "scale(1.2)",
        },
        "40%,60%": { transform: "rotate(-20deg) scale(1.2)" },
        "50%": { transform: "rotate(20deg) scale(1.2)" },
        "70%": { transform: "rotate(0deg) scale(1.2)" },
        "100%": { transform: "scale(1)" },
      },
      animation: "hithere 1s ease ",
    },
  },
  cardBox: {
    borderRadius: "1rem",
    boxShadow: 4,
    width: "15rem",
    height: "8rem",
    mr: "1rem",
    // p: "0.5rem",
    // my: "0.5rem",
    backgroundColor: "#00BFFF",
    color: "#fff",
    cursor: "default",
    my: "1rem",

    "&:hover": {
      boxShadow: "0.3rem 0.3rem 0.1rem #000",
      transition: "0.2s ease",
    },
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
    animation: "1s widthCard-increase ease ",
  },

  cardSection: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    px: 3,
    mt: 3,
  },

  statusBox: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "yellow",
    borderTopRightRadius: "1rem",
    borderTopLeftRadius: "1rem",
    p: 0.5,
    color: "black",
  },

  iconBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    mt: 2,
    px: 1,
  },
};
