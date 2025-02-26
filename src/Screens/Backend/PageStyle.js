export const PageCard = {
  cardFont: {
    fontSize: "1.1rem",
    backgroundColor: "#ffef62",
    borderRadius: "0.2rem",
    boxShadow: 2,
    color: "#000",
    textAlign: "center",
    position: "absolute",
    bottom: -20,
    right: -7,
    p: 0.3,
  },

  practiceScore: {
    position: "relative",
    width: {
      xl: "20%",
      lg: "15rem",
      xs: "15rem",
    },
    display: "inline-block",
    my: "1rem",
    mr: "0.5rem",
    height: "31rem",
    "@keyframes widthProgressCard-increase": {
      "0%": {
        opacity: "0",
        transform: "scale(0.5)",
      },
      "100%": {
        opacity: "1",
        transform: "scale(1)",
      },
    },
    animation: "1s widthProgressCard-increase ease ",
  },

  iconFont: {
    fontSize: "2.5rem",
    marginLeft: "3rem",
  },

  pScoreFont: {
    fontSize: "0.9rem",
    fontWeight: "600",
  },

  ButtonBox: {
    position: "absolute",
    bottom: 4,
    width: "100%",
    left: "20%",
  },

  ProgressAnimation: {
    backgroundColor: "#ab003c",
    width: "70%",
    height: "8px",
    borderRadius: "1rem",
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#76ff03",
      backgroundSize: `200% 200%`,
      boxShadow: 5,
      "@keyframes stripes": {
        "0%": {
          backgroundPosition: "0 0",
        },
        "100%": {
          backgroundPosition: "100% 100%",
        },
      },
      backgroundImage: `repeating-linear-gradient(
      -45deg, 
      transparent, 
      transparent 0.6rem,
      #1976d266 0.6rem,
      #1976d266 1.2rem
    )`,
      animation: "stripes 5s linear infinite",
    },
  },

  mtTable: {
    mt: 2,
    width: "100%",
    "& .table": {
      width: "100%",
    },
    boxShadow: "5",
    overflowX: "auto",
  },

  userDetailCard: {
    "@keyframes userCard-increase": {
      "0%": {
        opacity: "0",
        transform: "scale(0.5)",
      },
      "100%": {
        opacity: "1",
        transform: "scale(1)",
      },
    },
    animation: "1s widthProgressCard-increase ease ",
  },
};

export const Profile = {};
