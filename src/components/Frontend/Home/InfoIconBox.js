import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FetchHomePageData } from "../../../redux/api/HomePageApi";
import { HomePageDataFetchAsync } from "../../../redux/thunk/HomePageData";
import { FetchVisitorsAsync } from "../../../redux/thunk/Visitor";
import { useTranslation } from "react-i18next";
function InfoIconBox() {
  const pStyle = {
    width: "100%",
    color: "#757575",
    fontSize: {
      xs: "0.8rem",
      sm: "1rem",
      md: "0.9rem",
      lg: "1.2rem",
    },
  };
  const {
    CountListFetchStatus,
    CountListFetchError,
    totalFullMtCount,
    totalSectionalMtCount,
    totalQuestionCount,
  } = useSelector((state) => state.homePageData);
  const { visitorList } = useSelector((state) => state.visitor);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(HomePageDataFetchAsync({ path: "get-total-count-list" }));
    dispatch(FetchVisitorsAsync({ path: "visitors" }));
  }, [dispatch]);

  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalFullMt, setTotalFullMt] = useState(0);
  const [totalSectionalMt, setTotalSectionalMt] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.5 } //  adjust the threshold as needed
    );

    const currentRef = ref.current; // Store the current value of ref

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (
      CountListFetchStatus === "succeeded" &&
      isIntersecting &&
      visitorList?.length !== 0
    ) {
      const totalVisitor =
        parseInt(visitorList[1][0]) + parseInt(visitorList[1][1]);

      const interval = setInterval(() => {
        // Increment the counter

        // const calculateAddAmount = (number) => {
        //   let digits = number.toString().length;
        //   let addAmount = 1;
        //   let index = 0;
        //   while (index < digits) {
        //     addAmount = addAmount + "0";
        //     index++;
        //   }
        //   return parseInt(addAmount);
        // };

        // const questionAddAmount = calculateAddAmount(totalQuestionCount);
        // const fullMtAddAmount = calculateAddAmount(totalFullMtCount);
        // const sectionalMtAddAmount = calculateAddAmount(totalSectionalMtCount);

        setVisitorCount((prevCounter) =>
          totalVisitor > prevCounter ? prevCounter + 1 : prevCounter
        );

        setTotalQuestions((prevCounter) =>
          totalQuestionCount > prevCounter ? prevCounter + 1 : prevCounter
        );

        setTotalFullMt((prevCounter) =>
          totalFullMtCount > prevCounter ? prevCounter + 1 : prevCounter
        );

        setTotalSectionalMt((prevCounter) =>
          totalSectionalMtCount > prevCounter ? prevCounter + 1 : prevCounter
        );
      }, 1); // Update the counter every millisecond
      return () => clearInterval(interval);
    }
  }, [
    CountListFetchStatus,
    isIntersecting,
    totalFullMtCount,
    totalQuestionCount,
    visitorList,
    totalSectionalMtCount,
  ]);

  return (
    <Box
      ref={ref}
      sx={{
        backgroundColor: "#0CAFFF",

        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",

        p: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "1rem",
          transform: {
            xs: "scale(0.7)",
            md: "scale(1)",
          },
          p: {
            xs: 1,
            md: 2,
          },
          display: "flex",
          justifyContent: "center",
          boxShadow: 3,
          m: 1,
        }}
      >
        <Box
          sx={{
            width: {
              xs: "4rem",
              sm: "5rem",
              sm: "5rem",
              md: "8rem",
            },
            textAlign: "center",
          }}
        >
          <SupervisorAccountIcon
            sx={{ fontSize: "3rem", color: "#0CAFFF" }}
          ></SupervisorAccountIcon>
          <Typography sx={{ ...pStyle, textAlign: "center" }} color={"gray"}>
            {" "}
            {visitorCount}
            <br /> {t("user", { ns: "siteInfo" })}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "1rem",
          transform: {
            xs: "scale(0.7)",
            md: "scale(1)",
          },
          p: {
            xs: 1,
            md: 2,
          },
          display: "flex",
          justifyContent: "center",
          boxShadow: 3,
          m: 1,
        }}
      >
        <Box
          sx={{
            width: {
              xs: "4rem",
              sm: "5rem",
              md: "8rem",
            },
            textAlign: "center",
          }}
        >
          <HelpOutlineIcon
            sx={{ fontSize: "3rem", color: "#0CAFFF" }}
          ></HelpOutlineIcon>
          <Typography sx={{ ...pStyle, textAlign: "center" }} color={"gray"}>
            {" "}
            {totalQuestions}
            <br /> {t("question", { ns: "siteInfo" })}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "1rem",
          transform: {
            xs: "scale(0.7)",
            md: "scale(1)",
          },
          p: {
            xs: 1,
            md: 2,
          },
          display: "flex",
          justifyContent: "center",
          boxShadow: 3,
          m: 1,
        }}
      >
        <Box
          sx={{
            width: {
              xs: "4rem",
              sm: "5rem",
              md: "8rem",
            },
            textAlign: "center",
          }}
        >
          <PendingActionsIcon
            sx={{ fontSize: "3rem", color: "#0CAFFF" }}
          ></PendingActionsIcon>
          <Typography sx={{ ...pStyle, textAlign: "center" }} color={"gray"}>
            {" "}
            {totalFullMt}
            <br /> {t("mt", { ns: "siteInfo" })}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "1rem",
          transform: {
            xs: "scale(0.7)",
            md: "scale(1)",
          },
          p: {
            xs: 1,
            md: 2,
          },
          display: "flex",
          justifyContent: "center",
          boxShadow: 3,
          m: 1,
        }}
      >
        <Box
          sx={{
            width: {
              xs: "4rem",
              sm: "5rem",
              md: "8rem",
            },
            textAlign: "center",
          }}
        >
          <DescriptionIcon
            sx={{ fontSize: "3rem", color: "#0CAFFF" }}
          ></DescriptionIcon>
          <Typography sx={{ ...pStyle, textAlign: "center" }} color={"gray"}>
            {" "}
            {totalSectionalMt}
            <br />
            {t("smt", { ns: "siteInfo" })}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "1rem",
          transform: {
            xs: "scale(0.7)",
            md: "scale(1)",
          },
          p: {
            xs: 1,
            md: 2,
          },
          display: "flex",
          justifyContent: "center",
          boxShadow: 3,
          m: 1,
        }}
      >
        <Box
          sx={{
            width: {
              xs: "4rem",
              md: "8rem",
            },
            textAlign: "center",
          }}
        >
          <CheckCircleOutlineIcon
            sx={{ fontSize: "3rem", color: "#0CAFFF" }}
          ></CheckCircleOutlineIcon>
          <Typography sx={{ ...pStyle, textAlign: "center" }} color={"gray"}>
            {" "}
            95%
            <br /> {t("ai", { ns: "siteInfo" })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default InfoIconBox;
