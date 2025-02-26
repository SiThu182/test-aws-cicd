import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPath } from "../../../../redux/slice/PathSlice";
import { useTranslation } from "react-i18next";

// responsive font
const pStyle = {
  fontSize: {
    xs: "0.8rem",
    sm: "1rem",
    md: "0.9rem",
    lg: "1.2rem",
  },
};

//table style
const tableStyle = {
  "& .MuiTableBody-root tr .side": {
    boxShadow: 0,
    backgroundColor: "#0CAFFF",
    width: "40%",
    fontSize: "1rem",
    color: "white",
  },
  "& .MuiTableBody-root tr .main": {
    width: "60%",
  },
  "& .MuiTableBody-root tr .sidePale": {
    boxShadow: 0,
    backgroundColor: "#00BFFF",
    width: "40%",
    fontSize: "1rem",
    color: "white",
  },
  "& .MuiTableBody-root tr:nth-of-type(odd)": {
    backgroundColor: "whitesmoke",
    boxShadow: 0,
    border: "1px solid black",
  },
  "& .MuiTableBody-root tr ": {
    height: "2rem",
  },
  "& .MuiTableBody-root tr td": {
    border: "1px solid black",
    textAlign: "center",
    padding: "5px",
  },
  "& .MuiTableHead-root tr th": {
    border: "1px solid black",
    fontSize: "1rem",
    fontWeight: "700",
    textAlign: "center",
  },
  "& .MuiTableBody-root .benefit td": {
    fontWeight: "700",
  },
};

//reusable table row
// const PriceRow = (props) => {
//   const { choosePlan, country } = props;
//   return (
//     <>
//       {/* <TableCell className="side">Price</TableCell> */}
//       <TableCell className="main">
//         {choosePlan !== undefined && choosePlan !== null ? (
//           country === "MMK" ? (
//             choosePlan.discount_status !== 1 ? (
//               choosePlan.fees + "  MMK"
//             ) : (
//               <Typography>
//                 <span style={{ textDecoration: "line-through" }}>
//                   {choosePlan.fees}  MMK
//                 </span>
//                 <br />
//                 {choosePlan.fees -
//                   (choosePlan.fees * choosePlan?.discount_percent) / 100}
//                   MMK
//               </Typography>
//             )
//           ) : choosePlan.discount_status !== 1 ? (
//             choosePlan.oversea_fees + " $"
//           ) : (
//             <Typography>
//               <span style={{ textDecoration: "line-through" }}>
//                 {choosePlan.oversea_fees} $
//               </span>
//               <br />
//               {choosePlan.oversea_fees -
//                 (choosePlan.oversea_fees * choosePlan?.discount_percent) / 100}
//                $
//             </Typography>
//           )
//         ) : (
//           ""
//         )}
//       </TableCell>
//     </>
//   );
// };

//check for practice
const checkDefaultRow = (
  <>
    <TableCell className="main">
      <ClearRoundedIcon sx={{ color: "red", mx: "auto" }}></ClearRoundedIcon>
    </TableCell>
    <TableCell className="main">
      <DoneOutlineRoundedIcon
        sx={{ color: "green", px: "auto" }}
      ></DoneOutlineRoundedIcon>
    </TableCell>
  </>
);

//check correct
const defaultAllCheck = (
  <>
    <TableCell className="main">
      <DoneOutlineRoundedIcon sx={{ color: "green" }}></DoneOutlineRoundedIcon>
    </TableCell>
  </>
);

//plan select box
function PlanSelect(props) {
  const { i18n } = useTranslation();
  let currentLanguage = i18n.language;
  const [selectPlan, setSelectPlan] = useState();
  useEffect(() => {
    if (props.planData !== undefined) {
      setSelectPlan(props.planData);
    }
  }, [props]);

  const planClickHandler = (plan) => {
    if (props.typeStatus === "limited") {
      props.setScoreCount(plan.scoring_count);
      props.setChooseLimitedPlan(plan);
    }
    if (props.typeStatus === "unlimited") {
      props.setChooseUnlimitedPlan(plan);
    }

    if (
      props.type === "Mock" ||
      props.type === "Mini Mock" ||
      props.type === "Sectional Mock" ||
      props.type === "combo" ||
      props.type === "coaching"
    ) {
      props.setChoosePlan(plan);
    }
  };
  return (
    <>
      <TableCell className="main">
        <TextField
          select
          label="Plan"
          fullWidth
          InputProps={{
            sx: {
              width: "100%",
              borderRadius: "2rem",
              bgcolor: "rgb(225 245 254)",
              boxShadow: 2,
            },
          }}
          variant="outlined"
          defaultValue=""
        >
          {selectPlan !== undefined ? (
            selectPlan.map((p, index) => (
              <MenuItem
                key={index}
                value={p.id}
                onClick={() => planClickHandler(p)}
                sx={{ ...pStyle }}
              >
                {currentLanguage === "en" ? p.name : p?.name_burmese}
              </MenuItem>
            ))
          ) : (
            <MenuItem>
              <CircularProgress></CircularProgress>
            </MenuItem>
          )}
        </TextField>
      </TableCell>
    </>
  );
}

//reusable table for different types of mock tests
function ReusableTable(props) {
  const { country } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickBuyHandler = () => {
    dispatch(setPath());
    navigate("/subscription/form", {
      state: {
        plan: props.choosePlan,
      },
    });
  };

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", minWidth: "200px" }}>
          <TableContainer>
            <Table
              sx={{
                ...tableStyle,
              }}
            >
              <TableHead sx={{ backgroundColor: "" }}>
                <TableRow>
                  <TableCell className="main">
                    {t("content", { ns: "buyPage" })}
                  </TableCell>
                  <TableCell className="main">{props.type} Test</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="side">
                    {t("scoreCard", { ns: "buyPage" })}
                  </TableCell>
                  <TableCell className="main">
                    <DoneOutlineRoundedIcon
                      sx={{ color: "green" }}
                    ></DoneOutlineRoundedIcon>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="sidePale">
                    {t("scoreResult", { ns: "buyPage" })}
                  </TableCell>
                  <TableCell className="main">
                    {t("scoreResultDay", { ns: "buyPage" })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="side">
                    {t("analysis", { ns: "buyPage" })}
                  </TableCell>
                  <TableCell className="main">
                    <DoneOutlineRoundedIcon
                      sx={{ color: "green" }}
                    ></DoneOutlineRoundedIcon>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="sidePale">
                    {t("markingSchemes", { ns: "buyPage" })}
                  </TableCell>
                  <TableCell className="main">
                    <DoneOutlineRoundedIcon
                      sx={{ color: "green" }}
                    ></DoneOutlineRoundedIcon>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="side">
                    {t("price", { ns: "buyPage" })} {country}
                  </TableCell>
                  <TableCell className="main">
                    {props.choosePlan !== undefined ? (
                      props.choosePlan.discount_status !== 1 ? (
                        country !== "MMK" ? (
                          country === "USD" ? (
                            props.choosePlan.usd_fees + " USD"
                          ) : country === "SGD" ? (
                            props.choosePlan.sgd_fees + " SGD"
                          ) : country === "THB" ? (
                            props.choosePlan.thb_fees + " THB"
                          ) : country === "NZD" ? (
                            props.choosePlan.nzd_fees + " NZD"
                          ) : (
                            props.choosePlan.oversea_fees + " AUD"
                          )
                        ) : (
                          props.choosePlan.fees + " MMK"
                        )
                      ) : (
                        <Typography>
                          <span style={{ textDecoration: "line-through" }}>
                            {country !== "MMK"
                              ? country === "USD"
                                ? props.choosePlan.usd_fees + " USD"
                                : country === "SGD"
                                ? props.choosePlan.sgd_fees + " SGD"
                                : country === "THB"
                                ? props.choosePlan.thb_fees + " THB"
                                : country === "NZD"
                                ? props.choosePlan.nzd_fees + " NZD"
                                : props.choosePlan.oversea_fees + " AUD"
                              : props.choosePlan.fees + " MMK"}{" "}
                          </span>
                          <br />
                          {country !== "MMK"
                            ? country === "USD"
                              ? (
                                  props.choosePlan.usd_fees -
                                  (props.choosePlan.usd_fees *
                                    props.choosePlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " USD"
                              : country === "SGD"
                              ? (
                                  props.choosePlan.sgd_fees -
                                  (props.choosePlan.sgd_fees *
                                    props.choosePlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " SGD"
                              : country === "THB"
                              ? (
                                  props.choosePlan.thb_fees -
                                  (props.choosePlan.thb_fees *
                                    props.choosePlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " THB"
                              : country === "NZD"
                              ? (
                                  props.choosePlan.nzd_fees -
                                  (props.choosePlan.nzd_fees *
                                    props.choosePlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " NZD"
                              : (
                                  props.choosePlan.oversea_fees -
                                  (props.choosePlan.oversea_fees *
                                    props.choosePlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " AUD"
                            : (
                                props.choosePlan.fees -
                                (props.choosePlan.fees *
                                  props.choosePlan?.discount_percent) /
                                  100
                              ).toFixed(2) + " MMK"}
                        </Typography>
                      )
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="sidePale">
                    {t("scoreCount", { ns: "buyPage" })}
                    {props.type === "Sectional Mock" &&
                      props.choosePlan !== undefined &&
                      JSON.parse(props.choosePlan.language_type_id).map(
                        (l, index) => (
                          <Box
                            sx={{
                              fontSize: "13px",
                              my: 1,
                              backgroundColor: "yellow",
                              borderRadius: "1rem",
                              boxShadow: 3,
                              p: 1,
                              color: "black",
                            }}
                            key={index}
                          >
                            {" "}
                            {l === 1
                              ? "Speaking Mock Test"
                              : l === 2
                              ? "Reading Mock Test"
                              : l === 3
                              ? "Writing Mock Test"
                              : l === 4
                              ? "Listeninng MockTest"
                              : ""}
                          </Box>
                        )
                      )}
                  </TableCell>
                  <TableCell className="main">
                    {props.choosePlan !== undefined && (
                      <>
                        {props.type === "Mock" &&
                          props.choosePlan.mocktest_count}
                        {props.type === "Mini Mock" &&
                          props.choosePlan.mini_mocktest_count}
                        {props.type === "Sectional Mock" &&
                          JSON.parse(
                            props.choosePlan.sectional_mocktest_count
                          ).map((c, index) => (
                            <Box
                              sx={{
                                fontSize: "13px",
                                my: 1,
                                backgroundColor: "yellow",
                                borderRadius: "1rem",
                                boxShadow: 3,
                                p: 1,
                                color: "black",
                              }}
                              key={index}
                            >
                              {c}
                            </Box>
                          ))}
                      </>
                    )}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="side">
                    {t("selectPlan", { ns: "buyPage" })}
                  </TableCell>
                  <PlanSelect
                    type={props.type}
                    setChoosePlan={props.setChoosePlan}
                    planData={props.planData}
                  ></PlanSelect>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    {" "}
                    <Button
                      variant="contained"
                      disabled={props.choosePlan !== undefined ? false : true}
                      onClick={() => clickBuyHandler(props.choosePlan)}
                      sx={{
                        backgroundColor: "yellow",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                    >
                      Buy Now
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

//for reusable combo table for mock test with practice and other mock tests
function ComboTable(props) {
  const { country } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickBuyHandler = () => {
    dispatch(setPath());
    navigate("/subscription/form", {
      state: {
        plan: props.choosePlan,
      },
    });
  };
  return (
    <>
      <Box>
        <Box sx={{ display: "flex", minWidth: "200px" }}>
          <TableContainer>
            <Table
              sx={{
                ...tableStyle,
              }}
            >
              <TableHead sx={{ backgroundColor: "" }}>
                <TableRow>
                  <TableCell className="main">
                    {t("content", { ns: "buyPage" })}
                  </TableCell>
                  <TableCell className="main">{props.type} </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="side">
                    {t("token", { ns: "buyPage" })}
                  </TableCell>
                  {defaultAllCheck}
                </TableRow>
                <TableRow>
                  <TableCell className="sidePale">
                    {t("viewAnswer", { ns: "buyPage" })}
                  </TableCell>
                  {defaultAllCheck}
                </TableRow>
                <TableRow>
                  <TableCell className="side">
                    {t("keywords", { ns: "buyPage" })}
                  </TableCell>
                  {defaultAllCheck}
                </TableRow>
                <TableRow>
                  <TableCell className="sidePale"> {props.type}</TableCell>
                  {defaultAllCheck}
                </TableRow>
                <TableRow>
                  <TableCell className="side">
                    {t("prediction", { ns: "buyPage" })}
                  </TableCell>
                  {defaultAllCheck}
                </TableRow>
                <TableRow className="benefit">
                  <TableCell className="sidePale">
                    {t("benefits", { ns: "buyPage" })}
                  </TableCell>
                  {props.children}
                </TableRow>
                <TableRow>
                  <TableCell className="side">
                    {t("price", { ns: "buyPage" })} {country}
                  </TableCell>
                  <TableCell className="main">
                    {props.choosePlan !== undefined ? (
                      props.choosePlan.discount_status !== 1 ? (
                        country !== "MMK" ? (
                          country === "USD" ? (
                            props.choosePlan.usd_fees + " USD"
                          ) : country === "SGD" ? (
                            props.choosePlan.sgd_fees + " SGD"
                          ) : country === "THB" ? (
                            props.choosePlan.thb_fees + " THB"
                          ) : country === "NZD" ? (
                            props.choosePlan.nzd_fees + " NZD"
                          ) : (
                            props.choosePlan.oversea_fees + " AUD"
                          )
                        ) : (
                          props.choosePlan.fees + " MMK"
                        )
                      ) : (
                        <Typography>
                          <span style={{ textDecoration: "line-through" }}>
                            {country !== "MMK"
                              ? country === "USD"
                                ? props.choosePlan.usd_fees + " USD"
                                : country === "SGD"
                                ? props.choosePlan.sgd_fees + " SGD"
                                : country === "THB"
                                ? props.choosePlan.thb_fees + " THB"
                                : country === "NZD"
                                ? props.choosePlan.nzd_fees + " NZD"
                                : props.choosePlan.oversea_fees + " AUD"
                              : props.choosePlan.fees + " MMK"}
                          </span>
                          <br />

                          {country !== "MMK"
                            ? country === "USD"
                              ? (
                                  props.choosePlan.usd_fees -
                                  (props.choosePlan.usd_fees *
                                    props.choosePlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " USD"
                              : country === "SGD"
                              ? (
                                  props.choosePlan.sgd_fees -
                                  (props.choosePlan.sgd_fees *
                                    props.choosePlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " SGD"
                              : country === "THB"
                              ? (
                                  props.choosePlan.thb_fees -
                                  (props.choosePlan.thb_fees *
                                    props.choosePlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " THB"
                              : country === "NZD"
                              ? (
                                  props.choosePlan.nzd_fees -
                                  (props.choosePlan.nzd_fees *
                                    props.choosePlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " NZD"
                              : (
                                  props.choosePlan.oversea_fees -
                                  (props.choosePlan.oversea_fees *
                                    props.choosePlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " AUD"
                            : (
                                props.choosePlan.fees -
                                (props.choosePlan.fees *
                                  props.choosePlan?.discount_percent) /
                                  100
                              ).toFixed(2) + " MMK"}
                        </Typography>
                      )
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="sidePale">
                    {t("selectPlan", { ns: "buyPage" })}
                  </TableCell>
                  <PlanSelect
                    type="combo"
                    setChoosePlan={props.setChoosePlan}
                    planData={props.planData}
                  ></PlanSelect>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      disabled={props.choosePlan !== undefined ? false : true}
                      onClick={() => clickBuyHandler()}
                      sx={{
                        backgroundColor: "yellow",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                    >
                      Buy Now
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

//for practice ai
export function PracticeTable(props) {
  const { t } = useTranslation();
  const { country } = useSelector((state) => state.user);
  const [limitedStatusData, setLimitedStatusData] = useState();
  const [unlimitedStatusData, setUnlimitedStatusData] = useState();
  const [scoreCount, setScoreCount] = useState("");
  const [chooseLimitedPlan, setChooseLimitedPlan] = useState("");
  const [chooseUnlimitedPlan, setChooseUnlimitedPlan] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.data !== undefined) {
      const groupBasedOnLimitedStatus = (status) => {
        let statusData = [];
        props.data.forEach((d) => {
          if (d.limited_status === status) {
            statusData.push(d);
          }
        });
        return statusData;
      };
      setLimitedStatusData(groupBasedOnLimitedStatus(0));
      setUnlimitedStatusData(groupBasedOnLimitedStatus(1));
    }
  }, [props]);

  const limitedBuy = () => {
    dispatch(setPath());
    navigate("/subscription/form", {
      state: {
        plan: chooseLimitedPlan,
      },
    });
  };
  const unlimitedBuy = () => {
    dispatch(setPath());
    navigate("/subscription/form", {
      state: {
        plan: chooseUnlimitedPlan,
      },
    });
  };
  return (
    <>
      <Box>
        <Box sx={{ display: "flex", minWidth: "200px" }}>
          <TableContainer>
            <Table
              sx={{
                "& .MuiTableCell-sizeMedium": {},
                "& .MuiTableBody-root tr .side": {
                  //   backgroundColor: "whitesmoke",
                  boxShadow: 0,
                  backgroundColor: "#0CAFFF",
                  width: "20%",
                  fontSize: "1rem",
                  color: "white",
                },
                "& .MuiTableBody-root tr .main": {
                  width: "40%",
                },
                "& .MuiTableBody-root tr .sidePale": {
                  boxShadow: 0,
                  backgroundColor: "#00BFFF",
                  width: "20%",

                  fontSize: "1rem",
                  color: "white",
                },
                "& .MuiTableBody-root tr:nth-of-type(odd)": {
                  backgroundColor: "whitesmoke",
                  boxShadow: 0,
                  border: "1px solid black",
                },
                "& .MuiTableBody-root tr ": {
                  height: "1rem",
                },
                "& .MuiTableBody-root tr td": {
                  border: "1px solid black",
                  textAlign: "center",
                  padding: "5px",
                },
                "& .MuiTableHead-root tr th": {
                  border: "1px solid black",
                  fontSize: "1rem",
                  fontWeight: "700",
                  textAlign: "center",
                },
              }}
            >
              <TableHead sx={{ backgroundColor: "" }}>
                <TableRow>
                  <TableCell className="main">
                    {t("content", { ns: "buyPage" })}
                  </TableCell>
                  <TableCell className="main">
                    {t("limitedToken", { ns: "buyPage" })}
                  </TableCell>
                  <TableCell className="main">
                    {t("unlimitedToken", { ns: "buyPage" })}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="side">
                    {t("token", { ns: "buyPage" })}
                  </TableCell>
                  <TableCell>{scoreCount}</TableCell>
                  <TableCell>
                    <DoneOutlineRoundedIcon
                      sx={{ color: "green" }}
                    ></DoneOutlineRoundedIcon>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="sidePale">
                    {t("viewAnswer", { ns: "buyPage" })}
                  </TableCell>
                  {checkDefaultRow}
                </TableRow>
                <TableRow>
                  <TableCell className="side">
                    {t("keywords", { ns: "buyPage" })}
                  </TableCell>
                  {checkDefaultRow}
                </TableRow>
                <TableRow>
                  <TableCell className="sidePale">
                    {t("prediction", { ns: "buyPage" })}
                  </TableCell>
                  {checkDefaultRow}
                </TableRow>

                <TableRow>
                  <TableCell className="side">
                    {t("price", { ns: "buyPage" })} {country}
                  </TableCell>
                  <TableCell className="main">
                    {chooseLimitedPlan !== undefined &&
                    chooseLimitedPlan !== "" ? (
                      chooseLimitedPlan.discount_status !== 1 ? (
                        country !== "MMK" ? (
                          country === "USD" ? (
                            chooseLimitedPlan.usd_fees + " USD"
                          ) : country === "SGD" ? (
                            chooseLimitedPlan.sgd_fees + " SGD"
                          ) : country === "THB" ? (
                            chooseLimitedPlan.thb_fees + " TBH"
                          ) : country === "NZD" ? (
                            chooseLimitedPlan.nzd_fees + " NZD"
                          ) : (
                            chooseLimitedPlan.oversea_fees + " AUD"
                          )
                        ) : (
                          chooseLimitedPlan.fees + " MMK"
                        )
                      ) : (
                        <Typography>
                          <span style={{ textDecoration: "line-through" }}>
                            {country !== "MMK"
                              ? country === "USD"
                                ? chooseLimitedPlan.usd_fees + " USD"
                                : country === "SGD"
                                ? chooseLimitedPlan.sgd_fees + " SGD"
                                : country === "THB"
                                ? chooseLimitedPlan.thb_fees + " THB"
                                : country === "NZD"
                                ? chooseLimitedPlan.nzd_fees + " NZD"
                                : chooseLimitedPlan.oversea_fees + " AUD"
                              : chooseLimitedPlan.fees + " MMK"}
                          </span>
                          <br />
                          {country !== "MMK"
                            ? country === "USD"
                              ? (
                                  chooseLimitedPlan.usd_fees -
                                  (chooseLimitedPlan.usd_fees *
                                    chooseLimitedPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " USD"
                              : country === "SGD"
                              ? (
                                  chooseLimitedPlan.sgd_fees -
                                  (chooseLimitedPlan.sgd_fees *
                                    chooseLimitedPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " SGD"
                              : country === "THB"
                              ? (
                                  chooseLimitedPlan.thb_fees -
                                  (chooseLimitedPlan.thb_fees *
                                    chooseLimitedPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " THB"
                              : country === "NZD"
                              ? (
                                  chooseLimitedPlan.nzd_fees -
                                  (chooseLimitedPlan.nzd_fees *
                                    chooseLimitedPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " NZD"
                              : (
                                  chooseLimitedPlan.oversea_fees -
                                  (chooseLimitedPlan.oversea_fees *
                                    chooseLimitedPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " AUD"
                            : (
                                chooseLimitedPlan.fees -
                                (chooseLimitedPlan.fees *
                                  chooseLimitedPlan?.discount_percent) /
                                  100
                              ).toFixed(2) + " MMK"}

                          {/* {country !== "MMK"
                            ? country === "USD"
                              ? chooseLimitedPlan.usd_fees -
                                (chooseLimitedPlan.usd_fees *
                                  chooseLimitedPlan?.discount_percent) /
                                  100 +
                                " USD"
                              : chooseLimitedPlan.oversea_fees -
                                (chooseLimitedPlan.oversea_fees *
                                  chooseLimitedPlan?.discount_percent) /
                                  100
                            : chooseLimitedPlan.fees -
                              (chooseLimitedPlan.fees *
                                chooseLimitedPlan?.discount_percent) /
                                100 +
                              "MMK"} */}
                        </Typography>
                      )
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell>
                    {chooseUnlimitedPlan !== undefined &&
                    chooseUnlimitedPlan !== "" ? (
                      chooseUnlimitedPlan.discount_status !== 1 ? (
                        country !== "MMK" ? (
                          country === "USD" ? (
                            chooseUnlimitedPlan.usd_fees + " USD"
                          ) : country === "SGD" ? (
                            chooseUnlimitedPlan.sgd_fees + " SGD"
                          ) : country === "THB" ? (
                            chooseUnlimitedPlan.thb_fees + " THB"
                          ) : country === "NZD" ? (
                            chooseUnlimitedPlan.nzd_fees + " NZD"
                          ) : (
                            chooseUnlimitedPlan.oversea_fees + " AUD"
                          )
                        ) : (
                          chooseUnlimitedPlan.fees + " MMK"
                        )
                      ) : (
                        <Typography>
                          <span style={{ textDecoration: "line-through" }}>
                            {country !== "MMK"
                              ? country === "USD"
                                ? chooseUnlimitedPlan.usd_fees + " USD"
                                : country === "SGD"
                                ? chooseUnlimitedPlan.sgd_fees + " SGD"
                                : country === "THB"
                                ? chooseUnlimitedPlan.thb_fees + " TBH"
                                : country === "NZD"
                                ? chooseUnlimitedPlan.nzd_fees + " NZD"
                                : chooseUnlimitedPlan.oversea_fees + " AUD"
                              : chooseUnlimitedPlan.fees + " MMK"}
                          </span>

                          <br />
                          {country !== "MMK"
                            ? country === "USD"
                              ? (
                                  chooseUnlimitedPlan.usd_fees -
                                  (chooseUnlimitedPlan.usd_fees *
                                    chooseUnlimitedPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " USD"
                              : country === "SGD"
                              ? (
                                  chooseUnlimitedPlan.sgd_fees -
                                  (chooseUnlimitedPlan.sgd_fees *
                                    chooseUnlimitedPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " SGD"
                              : country === "THB"
                              ? (
                                  chooseUnlimitedPlan.thb_fees -
                                  (chooseUnlimitedPlan.thb_fees *
                                    chooseUnlimitedPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " THB"
                              : country === "NZD"
                              ? (
                                  chooseUnlimitedPlan.nzd_fees -
                                  (chooseUnlimitedPlan.nzd_fees *
                                    chooseUnlimitedPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " NZD"
                              : (
                                  chooseUnlimitedPlan.oversea_fees -
                                  (chooseUnlimitedPlan.oversea_fees *
                                    chooseUnlimitedPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " AUD"
                            : (
                                chooseUnlimitedPlan.fees -
                                (chooseUnlimitedPlan.fees *
                                  chooseUnlimitedPlan?.discount_percent) /
                                  100
                              ).toFixed(2) + " MMK"}

                          {/* {country !== "MMK"
                            ? country === "USD"
                              ? (
                                  chooseUnlimitedPlan.usd_fees -
                                  (chooseUnlimitedPlan.usd_fees *
                                    chooseUnlimitedPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " USD"
                              : (
                                  chooseUnlimitedPlan.oversea_fees -
                                  (chooseUnlimitedPlan.oversea_fees *
                                    chooseUnlimitedPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + "AUD"
                            : (
                                chooseUnlimitedPlan.fees -
                                (chooseUnlimitedPlan.fees *
                                  chooseUnlimitedPlan?.discount_percent) /
                                  100
                              ).toFixed(2) + "MMK"} */}
                        </Typography>
                      )
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="sidePale">
                    {t("selectPlan", { ns: "buyPage" })}
                  </TableCell>
                  <PlanSelect
                    planData={limitedStatusData}
                    setScoreCount={setScoreCount}
                    typeStatus="limited"
                    setChooseLimitedPlan={setChooseLimitedPlan}
                  ></PlanSelect>
                  <PlanSelect
                    planData={unlimitedStatusData}
                    typeStatus="unlimited"
                    setChooseUnlimitedPlan={setChooseUnlimitedPlan}
                  ></PlanSelect>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      disabled={chooseLimitedPlan !== "" ? false : true}
                      onClick={() => limitedBuy()}
                      sx={{
                        backgroundColor: "yellow",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                    >
                      Buy Now
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      disabled={chooseUnlimitedPlan !== "" ? false : true}
                      onClick={() => unlimitedBuy()}
                      sx={{
                        backgroundColor: "yellow",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                    >
                      Buy Now
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

//for mock test
export function MockTestTable(props) {
  const [mockTestPlan, setMockTestPlan] = useState();
  const [choosePlan, setChoosePlan] = useState();
  useEffect(() => {
    if (props.data !== undefined) {
      setMockTestPlan(props.data);
    }
  }, [props]);

  return (
    <ReusableTable
      type="Mock"
      planData={mockTestPlan}
      choosePlan={choosePlan}
      setChoosePlan={setChoosePlan}
    ></ReusableTable>
  );
}

//for mini mock test
export function MiniMockTestTable(props) {
  const [miniMockTestPlan, setMiniMockTestPlan] = useState();
  const [choosePlan, setChoosePlan] = useState();
  useEffect(() => {
    if (props.data !== undefined) {
      setMiniMockTestPlan(props.data);
    }
  }, [props]);

  return (
    <ReusableTable
      type="Mini Mock"
      choosePlan={choosePlan}
      setChoosePlan={setChoosePlan}
      planData={miniMockTestPlan}
    ></ReusableTable>
  );
}

//for sectional mock test
export function SectionalMockTestTable(props) {
  const [sectionalMockTestPlan, setSectionalMockTestPlan] = useState();
  const [choosePlan, setChoosePlan] = useState();
  useEffect(() => {
    if (props.data !== undefined) {
      setSectionalMockTestPlan(props.data);
    }
  }, [props]);

  return (
    <ReusableTable
      type="Sectional Mock"
      choosePlan={choosePlan}
      setChoosePlan={setChoosePlan}
      planData={sectionalMockTestPlan}
    ></ReusableTable>
  );
}

//for practice and mock test
export function PracticeMtTable(props) {
  const [comboMockTestPlan, setComboMockTestPlan] = useState();
  const [choosePlan, setChoosePlan] = useState();
  useEffect(() => {
    if (props.data !== undefined) {
      setComboMockTestPlan(props.data);
    }
  }, [props]);


  return (
    <ComboTable
      type="Practice + Mock Test"
      choosePlan={choosePlan}
      setChoosePlan={setChoosePlan}
      planData={comboMockTestPlan}
    >
      <TableCell>
        <Box sx={{ textAlign: "center" }}>
          <WhatshotIcon
            sx={{
              color: "orange",
              width: "2rem",
              fontSize: "2rem",
              backgroundColor: "black",
              borderRadius: "50%",
              boxShadow: 5,
            }}
          ></WhatshotIcon>
        </Box>
        <Typography>
          {choosePlan !== undefined
            ? " You will receive " + choosePlan.limited_status === 0
              ? choosePlan.scoring_count + " scoring count for practice and "
              : "  Unlimited practice (" +
                choosePlan?.number_of_day +
                " days) & "
            : "Select Any one of the plan first"}
          {choosePlan !== undefined && choosePlan.mt_limited_status === 0
            ? choosePlan.mocktest_count + "  mock tests ."
            : "  Mock tests for " + choosePlan?.mt_number_of_day + " days"}
          {choosePlan !== undefined &&
            choosePlan.discount_day > 0 &&
            " && Plus (" + choosePlan.discount_day + " extra days)"}
          {/* {choosePlan !== undefined
            ? choosePlan.limited_status === 0
              ? " You will receive " +
                choosePlan.scoring_count +
                " scoring count for practice and " +
                choosePlan.mocktest_count +
                "  mock tests ."
              : " You will receive unlimited scoring for practice and " +
                choosePlan.mocktest_count +
                "  mock tests for " +
                choosePlan.number_of_day +
                " days"
            : "Select Any one of the plan first"} */}
        </Typography>
      </TableCell>
    </ComboTable>
  );
}

//for practice and minimock test
export function PracticeMiniMtTable(props) {
  const [comboMiniMockTestPlan, setComboMiniMockTestPlan] = useState();
  const [choosePlan, setChoosePlan] = useState();
  useEffect(() => {
    if (props.data !== undefined) {
      setComboMiniMockTestPlan(props.data);
    }
  }, [props]);

  return (
    <ComboTable
      type="Practice + Mini Mock Test"
      planData={comboMiniMockTestPlan}
      setChoosePlan={setChoosePlan}
      choosePlan={choosePlan}
    >
      <TableCell>
        <Box sx={{ textAlign: "center" }}>
          <WhatshotIcon
            sx={{
              color: "orange",
              width: "2rem",
              fontSize: "2rem",
              backgroundColor: "black",
              borderRadius: "50%",
              boxShadow: 5,
            }}
          ></WhatshotIcon>
        </Box>

        <Typography>
          {choosePlan !== undefined
            ? choosePlan.limited_status === 0
              ? " You will receive " +
                choosePlan.scoring_count +
                " scoring count for practice and " +
                choosePlan.mini_mocktest_count +
                " mini mock tests ."
              : " You will receive unlimited scoring for practice and " +
                choosePlan.mini_mocktest_count +
                " mini mock tests for " +
                choosePlan.number_of_day +
                " days"
            : "Select Any one of the plan first"}
        </Typography>
      </TableCell>
    </ComboTable>
  );
}

//for practice and sectional mock test
export function PracticeSectionalMocktestTable(props) {
  const [comboSectionalMockTestPlan, setComboMiniMockTestPlan] = useState();
  const [choosePlan, setChoosePlan] = useState();
  useEffect(() => {
    if (props.data !== undefined) {
      setComboMiniMockTestPlan(props.data);
    }
  }, [props]);

  return (
    <ComboTable
      type="Practice + Sectional Mock Test"
      planData={comboSectionalMockTestPlan}
      setChoosePlan={setChoosePlan}
      choosePlan={choosePlan}
    >
      <TableCell>
        <Box sx={{ textAlign: "center" }}>
          <WhatshotIcon
            sx={{
              color: "orange",
              width: "2rem",
              fontSize: "2rem",
              backgroundColor: "black",
              borderRadius: "50%",
              boxShadow: 5,
            }}
          ></WhatshotIcon>
        </Box>

        {choosePlan !== undefined && (
          <>
            <Typography>
              You will receive{" "}
              {choosePlan.limited_status === 0
                ? choosePlan.scoring_count + "scoring count"
                : "unlimited"}{" "}
              practice &
            </Typography>
            {JSON.parse(choosePlan.language_type_id).map((l, index) => (
              <Box
                sx={{
                  fontSize: "13px",
                  my: 1,
                  backgroundColor: "yellow",
                  borderRadius: "1rem",
                  boxShadow: 3,
                  p: 1,
                  color: "black",
                }}
                key={index}
              >
                {" "}
                {l === 1
                  ? "Speaking Mock Test +" +
                    JSON.parse(choosePlan.sectional_mocktest_count)[index]
                  : l === 2
                  ? "Reading Mock Test +" +
                    JSON.parse(choosePlan.sectional_mocktest_count)[index]
                  : l === 4
                  ? "Writing Mock Test +" +
                    JSON.parse(choosePlan.sectional_mocktest_count)[index]
                  : l === 3
                  ? "Listeninng MockTest +" +
                    JSON.parse(choosePlan.sectional_mocktest_count)[index]
                  : ""}
              </Box>
            ))}
          </>
        )}
        {choosePlan === undefined && "Select Any one of the plan first"}
      </TableCell>
    </ComboTable>
  );
}

//for practice ,mock test and sectional mock test
export function PracticeMocktestSectionalMtTable(props) {
  const [
    comboMockTestSectionalMockTestPlan,
    setComboMockTestSectionalMockTestPlan,
  ] = useState();
  const [choosePlan, setChoosePlan] = useState();
  useEffect(() => {
    if (props.data !== undefined) {
      setComboMockTestSectionalMockTestPlan(props.data);
    }
  }, [props]);

  return (
    <ComboTable
      type="Practice + Mock Test +Sectional Mock Test"
      setChoosePlan={setChoosePlan}
      choosePlan={choosePlan}
      planData={comboMockTestSectionalMockTestPlan}
    >
      <TableCell>
        <Box sx={{ textAlign: "center" }}>
          <WhatshotIcon
            sx={{
              color: "orange",
              width: "2rem",
              fontSize: "2rem",
              backgroundColor: "black",
              borderRadius: "50%",
              boxShadow: 5,
            }}
          ></WhatshotIcon>
        </Box>
        <Typography>
          {choosePlan !== undefined && (
            <>
              <Typography>
                You will receive{" "}
                {choosePlan.limited_status === 0
                  ? choosePlan.scoring_count + "scoring count"
                  : "unlimited"}{" "}
                practice , {choosePlan.mocktest_count}scoring count for mock
                test &
              </Typography>
              {JSON.parse(choosePlan.language_type_id).map((l, index) => (
                <Box
                  sx={{
                    fontSize: "13px",
                    my: 1,
                    backgroundColor: "yellow",
                    borderRadius: "1rem",
                    boxShadow: 3,
                    p: 1,
                    color: "black",
                  }}
                  key={index}
                >
                  {" "}
                  {l === 1
                    ? "Speaking Mock Test +" +
                      JSON.parse(choosePlan.sectional_mocktest_count)[index]
                    : l === 2
                    ? "Reading Mock Test +" +
                      JSON.parse(choosePlan.sectional_mocktest_count)[index]
                    : l === 4
                    ? "Writing Mock Test +" +
                      JSON.parse(choosePlan.sectional_mocktest_count)[index]
                    : l === 3
                    ? "Listeninng MockTest +" +
                      JSON.parse(choosePlan.sectional_mocktest_count)[index]
                    : ""}
                </Box>
              ))}
            </>
          )}
          {choosePlan === undefined && "Select Any one of the plan first"}
        </Typography>
      </TableCell>
    </ComboTable>
  );
}

//for coaching
export function CoachingPlanTable(props) {
  const { country } = useSelector((state) => state.user);
  const [groupData, setGroupData] = useState();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [individualData, setIndividualData] = useState();
  // const [scoreCount, setScoreCount] = useState("");
  const [chooseGroupPlan, setChooseGroupPlan] = useState("");
  const [chooseIndividualPlan, setChooseIndividualPlan] = useState("");

  console.log(currentLanguage, "currentLanguage");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.data !== undefined) {
      const groupBasedOnLimitedStatus = (status) => {
        let statusData = [];
        props.data.forEach((d) => {
          if (d.training_type === status) {
            statusData.push(d);
          }
        });
        return statusData;
      };
      setGroupData(groupBasedOnLimitedStatus(1));
      setIndividualData(groupBasedOnLimitedStatus(2));
    }
  }, [props]);

  const limitedBuy = () => {
    dispatch(setPath());
    navigate("/subscription/form", {
      state: {
        plan: chooseGroupPlan,
      },
    });
  };
  const unlimitedBuy = () => {
    dispatch(setPath());
    navigate("/subscription/form", {
      state: {
        plan: chooseIndividualPlan,
      },
    });
  };

  const CommonInfo = () => {
    return (
      <ul style={{ padding: "0 1rem", textAlign: "left" }}>
        <li>
          <Typography>{t("learn", { ns: "expandListPlan" })}</Typography>
        </li>
        <li> {t("criteria", { ns: "expandListPlan" })}</li>
        <li>
          <Typography>{t("score", { ns: "expandListPlan" })}</Typography>{" "}
        </li>
        <li>
          <Typography>{t("prediction", { ns: "expandListPlan" })}</Typography>
        </li>
      </ul>
    );
  };

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", minWidth: "200px" }}>
          <TableContainer>
            <Table
              sx={{
                "& .MuiTableCell-sizeMedium": {},
                "& .MuiTableBody-root tr .side": {
                  //   backgroundColor: "whitesmoke",
                  boxShadow: 0,
                  backgroundColor: "#0CAFFF",
                  width: "20%",
                  fontSize: "1rem",
                  color: "white",
                },
                "& .MuiTableBody-root tr .main": {
                  width: "40%",
                },
                "& .MuiTableBody-root tr .sidePale": {
                  boxShadow: 0,
                  backgroundColor: "#00BFFF",
                  width: "20%",

                  fontSize: "1rem",
                  color: "white",
                },
                "& .MuiTableBody-root tr:nth-of-type(odd)": {
                  backgroundColor: "whitesmoke",
                  boxShadow: 0,
                  border: "1px solid black",
                },
                "& .MuiTableBody-root tr ": {
                  height: "1rem",
                },
                "& .MuiTableBody-root tr td": {
                  border: "1px solid black",
                  textAlign: "center",
                  padding: "5px",
                },
                "& .MuiTableHead-root tr th": {
                  border: "1px solid black",
                  fontSize: "1rem",
                  fontWeight: "700",
                  textAlign: "center",
                },
              }}
            >
              <TableHead sx={{ backgroundColor: "" }}>
                <TableRow>
                  <TableCell className="main">
                    {t("content", { ns: "buyPage" })}
                  </TableCell>
                  <TableCell className="main">Group Training</TableCell>
                  <TableCell className="main">Individual Training</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="side">
                    {" "}
                    {t("trainingType", { ns: "buyPage" })}
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {" "}
                      {t("gTraining", { ns: "buyPage" })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{t("iTraining", { ns: "buyPage" })}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="sidePale">
                    {t("description", { ns: "buyPage" })}
                  </TableCell>
                  <TableCell>
                    {chooseGroupPlan !== undefined &&
                    chooseGroupPlan?.description !== undefined ? (
                      <ul style={{ padding: "0 1rem", textAlign: "left" }}>
                        {currentLanguage === "en"
                          ? JSON.parse(chooseGroupPlan?.description).map(
                              (d, index) => (
                                <li key={index}>
                                  <Typography>{d}</Typography>
                                </li>
                              )
                            )
                          : chooseGroupPlan?.description_burmese !==
                              undefined &&
                            chooseGroupPlan?.description_burmese !== null
                          ? JSON.parse(
                              chooseGroupPlan?.description_burmese
                            )?.map((d, index) => (
                              <li key={index}>
                                <Typography>{d}</Typography>
                              </li>
                            ))
                          : ""}
                      </ul>
                    ) : (
                      <Typography>-</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {chooseIndividualPlan !== undefined &&
                    chooseIndividualPlan?.description !== undefined ? (
                      <ul style={{ padding: "0 1rem", textAlign: "left" }}>
                        {currentLanguage === "en"
                          ? JSON.parse(chooseIndividualPlan?.description).map(
                              (d, index) => (
                                <li key={index}>
                                  <Typography>{d}</Typography>
                                </li>
                              )
                            )
                          : chooseIndividualPlan?.description_burmese !==
                              undefined &&
                            chooseIndividualPlan?.description_burmese !== null
                          ? JSON.parse(
                              chooseIndividualPlan?.description_burmese
                            )?.map((d, index) => (
                              <li key={index}>
                                <Typography>{d}</Typography>
                              </li>
                            ))
                          : ""}
                      </ul>
                    ) : (
                      <Typography>-</Typography>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="side">
                    {t("moreInfo", { ns: "buyPage" })}
                  </TableCell>
                  <TableCell>
                    {chooseGroupPlan !== undefined &&
                    chooseGroupPlan?.description !== undefined ? (
                      <CommonInfo />
                    ) : (
                      <Typography>-</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {chooseIndividualPlan !== undefined &&
                    chooseIndividualPlan?.description !== undefined ? (
                      <CommonInfo />
                    ) : (
                      <Typography>-</Typography>
                    )}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="side">
                    {t("price", { ns: "buyPage" })}
                  </TableCell>
                  <TableCell className="main">
                    {chooseGroupPlan !== undefined && chooseGroupPlan !== "" ? (
                      chooseGroupPlan.discount_status !== 1 ? (
                        country !== "MMK" ? (
                          country === "USD" ? (
                            chooseGroupPlan.usd_fees + " USD"
                          ) : (
                            chooseGroupPlan?.oversea_fees + " AUD"
                          )
                        ) : (
                          chooseGroupPlan?.fees + " MMK"
                        )
                      ) : (
                        <Typography>
                          <span style={{ textDecoration: "line-through" }}>
                            {country !== "MMK"
                              ? country === "USD"
                                ? chooseGroupPlan.usd_fees + " USD"
                                : country === "SGD"
                                ? chooseGroupPlan.sgd_fees + " SGD"
                                : country === "THB"
                                ? chooseGroupPlan.thb_fees + " TBH"
                                : country === "NZD"
                                ? chooseGroupPlan.nzd_fees + " NZD"
                                : chooseGroupPlan.oversea_fees + " AUD"
                              : chooseGroupPlan.fees + " MMK"}
                          </span>
                          <br />
                          {country !== "MMK"
                            ? country === "USD"
                              ? (
                                  chooseGroupPlan.usd_fees -
                                  (chooseGroupPlan.usd_fees *
                                    chooseGroupPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " USD"
                              : country === "SGD"
                              ? (
                                  chooseGroupPlan.sgd_fees -
                                  (chooseGroupPlan.sgd_fees *
                                    chooseGroupPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " SGD"
                              : country === "THB"
                              ? (
                                  chooseGroupPlan.thb_fees -
                                  (chooseGroupPlan.thb_fees *
                                    chooseGroupPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " THB"
                              : country === "NZD"
                              ? (
                                  chooseGroupPlan.nzd_fees -
                                  (chooseGroupPlan.nzd_fees *
                                    chooseGroupPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " NZD"
                              : (
                                  chooseGroupPlan.oversea_fees -
                                  (chooseGroupPlan.oversea_fees *
                                    chooseGroupPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " AUD"
                            : (
                                chooseGroupPlan.fees -
                                (chooseGroupPlan.fees *
                                  chooseGroupPlan?.discount_percent) /
                                  100
                              ).toFixed(2) + " MMK"}

                          {/* {country !== "MMK"
                            ? country === "USD"
                              ? (
                                  chooseGroupPlan.usd_fees -
                                  (chooseGroupPlan.usd_fees *
                                    chooseGroupPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " USD"
                              : (
                                  chooseGroupPlan.oversea_fees -
                                  (chooseGroupPlan.oversea_fees *
                                    chooseGroupPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " AUD"
                            : (
                                chooseGroupPlan.fees -
                                (chooseGroupPlan.fees *
                                  chooseGroupPlan?.discount_percent) /
                                  100
                              ).toFixed(2) + "MMK"} */}
                        </Typography>
                      )
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell>
                    {chooseIndividualPlan !== undefined &&
                    chooseIndividualPlan !== "" ? (
                      chooseIndividualPlan.discount_status !== 1 ? (
                        country !== "MMK" ? (
                          country === "USD" ? (
                            chooseIndividualPlan.usd_fees + " USD"
                          ) : (
                            chooseIndividualPlan.oversea_fees + " AUD"
                          )
                        ) : (
                          chooseIndividualPlan.fees + " MMK"
                        )
                      ) : (
                        <Typography>
                          <span style={{ textDecoration: "line-through" }}>
                            {country !== "MMK"
                              ? country === "USD"
                                ? chooseIndividualPlan.usd_fees + " USD"
                                : chooseIndividualPlan.oversea_fees + " AUD"
                              : chooseIndividualPlan.fees + " MMK"}
                          </span>
                          <br />
                          {country !== "MMK"
                            ? country === "USD"
                              ? (
                                  chooseIndividualPlan.usd_fees -
                                  (chooseIndividualPlan.usd_fees *
                                    chooseIndividualPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " USD"
                              : country === "SGD"
                              ? (
                                  chooseIndividualPlan.sgd_fees -
                                  (chooseIndividualPlan.sgd_fees *
                                    chooseIndividualPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " SGD"
                              : country === "THB"
                              ? (
                                  chooseIndividualPlan.thb_fees -
                                  (chooseIndividualPlan.thb_fees *
                                    chooseIndividualPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " THB"
                              : country === "NZD"
                              ? (
                                  chooseIndividualPlan.nzd_fees -
                                  (chooseIndividualPlan.nzd_fees *
                                    chooseIndividualPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " NZD"
                              : (
                                  chooseIndividualPlan.oversea_fees -
                                  (chooseIndividualPlan.oversea_fees *
                                    chooseIndividualPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " AUD"
                            : (
                                chooseIndividualPlan.fees -
                                (chooseIndividualPlan.fees *
                                  chooseIndividualPlan?.discount_percent) /
                                  100
                              ).toFixed(2) + " MMK"}
                          {/*                             
                          {country !== "MMK"
                            ? country === "USD"
                              ? (
                                  chooseIndividualPlan.usd_fees -
                                  (chooseIndividualPlan.usd_fees *
                                    chooseIndividualPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + " USD"
                              : (
                                  chooseIndividualPlan.oversea_fees -
                                  (chooseIndividualPlan.oversea_fees *
                                    chooseIndividualPlan?.discount_percent) /
                                    100
                                ).toFixed(2) + "AUD"
                            : (
                                chooseIndividualPlan.fees -
                                (chooseIndividualPlan.fees *
                                  chooseIndividualPlan?.discount_percent) /
                                  100
                              ).toFixed(2) + "MMK"} */}
                        </Typography>
                      )
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="sidePale">
                    {t("selectPlan", { ns: "buyPage" })}
                  </TableCell>
                  <PlanSelect
                    planData={groupData}
                    type="coaching"
                    setChoosePlan={setChooseGroupPlan}
                  ></PlanSelect>
                  <PlanSelect
                    planData={individualData}
                    type="coaching"
                    setChoosePlan={setChooseIndividualPlan}
                  ></PlanSelect>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      disabled={chooseGroupPlan !== "" ? false : true}
                      onClick={() => limitedBuy()}
                      sx={{
                        backgroundColor: "yellow",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                    >
                      Buy Now
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      disabled={chooseIndividualPlan !== "" ? false : true}
                      onClick={() => unlimitedBuy()}
                      sx={{
                        backgroundColor: "yellow",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                    >
                      Buy Now
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
