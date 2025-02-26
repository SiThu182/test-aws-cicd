export const MtStyle = {
  mtContainer: {
    backgroundColor: "rgb(231,239,254)",
    overflowY: "scroll",
    overflowX: "hidden",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    alignItems: "center",
  },

  sectionWidthBox: {
    top: "0",
    width: "100%",
    zIndex: "3",
    backgroundColor: "white",
    boxShadow: "3",
  },
  sectionLayoutCenter: {
    display: "flex",
    width: "100%",
    pt: 1,

    justifyContent: "space-between",
    mb: 1,
    alignItems: "center",
    pl: 2,
  },
  fontResponsive: {
    fontSize: {
      md: "1.1rem",
      sm: "1rem",
      xs: "1rem",
    },
  },
};

export const Sections = {
  sectionContainer: {
    display: "flex",
    mt: "1rem",

    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },

  sectionPadding: {
    px: {
      xs: 2,
      sm: 5,
      md: "8rem",
      lg: "10rem",
      xl: "20rem",
    },
  },
  bgWhiteCard: {
    backgroundColor: "white",
    borderRadius: "2rem",
    height: { sm: "auto", md: "100%" },
    width: "90%",
    boxShadow: 5,
  },
  cardFont: {
    ps: "1rem",
    fontSize: {
      md: "16px",
      sm: "1rem",
      xs: "13px",
    },
  },
  audioCard: {
    width: {
      xs: "70%",
      sm: "60%",
      md: "20rem",
    },

    mb: 0,
    height: "20%",
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    mx: "auto",
  },
  UpperCardWidth: {
    width: "100%",
    borderBottom: "1px solid black",
    m: "0 auto",

    textAlign: "center",
    mt: {
      md: "2rem",
      sm: "5px",
    },
  },
  LowerCardWidth: {
    display: "flex",
    width: "100%",

    backgroundColor: "silver",
    borderBottomLeftRadius: "1rem",
    borderBottomRightRadius: "1rem",
  },
  ProgressBar: {
    height: 5,
    borderRadius: 5,
    margin: "auto",
  },
  raContent: {
    height: "40%",
    minHeight: "5rem",
    overflowY: "scorll",
    my: 1,
  },
  diBox: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: {
      xs: "column",
      md: "row",
    },
  },
  diImg: {
    width: {
      xs: "15rem",
      md: "23rem",
      xl: "26rem",
    },
    height: {
      xs: "15rem",
      md: "23rem",
      xl: "26rem",
    },
    marginLeft: {
      xs: "0",
      md: "1rem",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  next: {
    width: "100vw",
    display: "flex",
    position: "relative",
    mt: 1,
    justifyContent: "flex-end",
  },
};
