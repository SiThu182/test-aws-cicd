export const CardStyle = {
  cardStyle: {
    position: "relative",
    width: {
      xs: "15rem",
      sm: "18rem",
      md: "20rem",
    },
    minHeight: {
      xs: "27rem",
      md: "36rem",
      lg: "40rem",
    },
    margin: {
      sm: "5px auto",
      xs: "10px auto",
      md: "16px auto",
    },

    background: "#fff",

    borderRadius: "1rem",
    border: "1px solid white",
    textAlign: "center",
    boxShadow: "0 0 14px  rgba(0,0,0,0.4)",
    "&:hover": {
      "&. MuiCardHeader-root": {
        backgroundColor: "red",
      },
      "& .check-icon": {
        color: "#82ff00",
      },
      // background:
      //   "linear-gradient(363deg, rgba(170,177,238,1) 95%,  rgba(245,245,248,1) 100%)",

      // background:
      //   " linear-gradient(38deg, rgba(119,108,255,1) 0%, rgba(30,100,235,1) 97%)",
      border: "1px solid black",
      transform: "scale(1.01)",
      transition: "0.3s ease-in",
    },
  },
  cardStyle1: {
    position: "relative",
    width: {
      xs: "13rem",
      sm: "17rem",
      md: "18rem",
    },
    height: "auto",
    margin: "auto",

    background: "#E3F2FD",

    borderRadius: "1rem",
    border: "1px solid white",
    textAlign: "center",
    boxShadow: "0px 4px 14px rgba(0, 0, 1, 0.5)", //"0 0 14px  rgba(0,0,0,0.4)",
    "&:hover": {
      "&. MuiCardHeader-root": {
        backgroundColor: "red",
      },
      "& .check-icon": {
        color: "#82ff00",
      },
      // background:
      //   "linear-gradient(363deg, rgba(170,177,238,1) 95%,  rgba(245,245,248,1) 100%)",

      // background:
      //   " linear-gradient(38deg, rgba(119,108,255,1) 0%, rgba(30,100,235,1) 97%)",
      border: "1px solid black",
      transform: "scale(1.01)",
      transition: "0.3s ease-in",
    },
  },
  responsive: {
    desktop: {
      breakpoint: { max: 3000, min: 1362 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1362, min: 903 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 903, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    // desktop: {
    //   breakpoint: { max: 3000, min: 1024 },
    //   items: 3,
    //   slidesToSlide: 1, // optional, default to 1.
    // },
    // tablet: {
    //   breakpoint: { max: 1024, min: 750 },
    //   items: 2,
    //   slidesToSlide: 1, // optional, default to 1.
    // },
    // mobile: {
    //   breakpoint: { max: 750, min: 0 },
    //   items: 1,
    //   slidesToSlide: 1, // optional, default to 1.
    // },
  },

  cardHeader: {
    // backgroundColor: "inherit",
    fontSize: {
      xs: "16px",
      sm: "17px",
      md: "1.2rem",
      lg: "1.5rem",
    },
    my: 1,
    color: "black",
    borderRadius: "0.5rem 0.5rem 0 0",
  },
  hStyle: {
   
    fontSize: {
      xs: "16px",
      sm: "17px",
      md: "1.7rem",
    },
    fontWeight: 600,
    pt: "1rem",
    pb: "1rem",
    textAlign: "center",
  },

  planCardHeader: {
    position: "relative",
    backgroundColor: "#294fcd",
    fontSize: {
      xs: "16px",
      sm: "17px",
      md: "1.2rem",
      lg: "1.5rem",
    },
    mb: 1,
    color: "white",
    borderRadius: "0.5rem 0.5rem 0 0",
  },

  planCardHeader1: {
    position: "relative",
    backgroundColor: "#FFE600",
    fontSize: {
      xs: "16px",
      sm: "17px",
      md: "1.2rem",
      lg: "1.5rem",
    },
    mb: 1,
    color: "white",
    borderRadius: "0.5rem 0.5rem 0 0",
  },

  costStyle: {
    fontSize: {
      xs: "16px",
      sm: "18px",
      md: "1rem",
      lg: "1.2rem",
    },
    fontWeight: 700,
    color: "black",
  },
  subscribeBtn: {
    // position: "absolute",

    width: "10rem",
    color: "red",
    mb: "1rem",
    "&:hover": {
      color: "white",
      backgroundColor: "red",
    },
    "&:active": {
      color: "white",
      backgroundColor: "black",
    },
  },
};
