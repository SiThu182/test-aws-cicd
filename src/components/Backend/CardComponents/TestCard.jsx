import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { fetchMockTestDetailAsync } from "../../../redux/thunk/Dashboard";

// import BrowserType from "../BrowserType";
import MtDetail from "../MockTest/MtDetailPage";
import CheckAnswerDialogComponent from "./CheckAnswerDialogComponent";
import { animationObj } from "../../../animationKeyFrames/AnimationKeyFrames";
import { getCookie } from "../../../Utils/GetCookies";

function TestCard(props) {
  let { mtDetailPost, mockTestDetailStatus } = useSelector(
    (state) => state.dashboard
  );
  const { pages, saveMtListArray } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const browser = localStorage.getItem("browser");
  let [scoreOpen, setScoreOpen] = useState(false);
  let [checkOpen, setCheckOpen] = useState(false);
  let [mtId, setMtId] = useState("");
  let [mtTypeId, setMtTypeId] = useState("");
  let [scoreId, setScoreId] = useState("");
  let [detailPost, setDetailPost] = useState("");
  let [detailAssign, setDetailAssign] = useState("");
  let [checkAssign, setCheckAssign] = useState("");
  let userId = localStorage.getItem("userId");
  let mtDetailPath = `mt-score-user-detail/${userId}/${mtId}`;

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  let clickInfo = (id) => {
    setMtId(id);
    setScoreOpen(true);
    setDetailAssign(true);
  };
  useEffect(() => {
    if (detailAssign) {
      dispatch(fetchMockTestDetailAsync(mtDetailPath));
      setDetailAssign(false);
    }
  }, [detailAssign, dispatch, mtDetailPath]);

  useEffect(() => {
    if (mockTestDetailStatus === "succeeded") {
      setDetailPost(mtDetailPost);
    }
  }, [mockTestDetailStatus, mtDetailPost]);
  const cardStyle = {
    width: {
      xl: "20%",
      lg: "15rem",
      xs: "15rem",
    },
    height: {
      xs: "auto",
    },

    backgroundColor: "rgb(25 156 229)",
    color: "#fff",
    my: "0.5rem",
    mr: "0.5rem",
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
  };
  const btnStyle = {
    margin: "auto",
    width: "100%",
    color: "#ffff",
    "&:hover": {
      color: "#000",
    },
    textAlign: "center",
    background: "inherit",
  };
  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "250px",
    maxWidth: "250px",
  };

  const alertFunction = () => {
    swal({
      title: "Device Support Warning!",
      text: "Currently audio scoring is not supported in Firefox. We suggest you try other browsers",
      icon: "warning",
      dangerMode: true,
      confirmButton: "Ok",
    });
  };
  const TooltipBtn = (props) => {
    const { title, text, color, passValue, funType, id, typeId, status } =
      props;

    return (
      <Tooltip title={title} sx={{ fontSize: "0.5rem" }}>
        <Button
          variant="contained"
          // disabled={
          //   (title === "check answers" || text === "show score") && status === 1
          //     ? false
          //     : title === "retake"
          //     ? false
          //     : true
          // }
          sx={{
            background:
              color === "yellow"
                ? " rgba(255,213,95,1) "
                : color === "green"
                ? "rgba(20, 87, 185, 1)"
                : "rgba(214,9,9,1)",
            my: 1,

            color: "white",
            "&:hover": {
              transform: "scale(1.02)",
              zIndex: "4",
              background:
                color === "yellow"
                  ? "linear-gradient(0deg,  rgba(217,255,255,1)  0%, rgba(255,213,95,1) 60%)"
                  : color === "green"
                  ? "linear-gradient(0deg, rgba(217,255,255,1) 0%, rgba(20,87,185,1) 60%)"
                  : " linear-gradient(0deg, rgba(217,255,255,1) 0%, rgba(214,9,9,1) 60%)",
            },
            height: "1.5rem",
          }}
          onClick={() => clickHandler(funType, passValue, id, typeId)}
        >
          {text}
        </Button>
      </Tooltip>
    );
  };

  const clickHandler = (type, value, id, typeId) => {
    if (type === "check") {
      setMtId(id);
      setMtTypeId(typeId);
      setScoreId(value);
      setCheckAssign(true);
    } else if (type === "score") {
      clickInfo(value);
    } else {
      retakeTest(value, id, typeId);
    }
  };

  useEffect(() => {
    if (checkAssign) {
      setCheckOpen(true);
      setCheckAssign(false);
    }
  }, [checkAssign]);

  const retakeTest = (textPath, id, typeId) => {
    swal({
      title: "Are you sure you want to retake?",
      text: "Your current score will be overrided with the newly retake result",
      icon: "warning",
      buttons: true,
    }).then((yes) => {
      if (yes) {
        if (saveMtListArray.includes(id)) {
          swal({
            title: "Notice",
            text: "You did not finish this test last time. Do you want to continue from your saved session?",
            icon: "info",
            confirmButtonText: "Yes",
            denyButtonText: "No",
            showDenyButton: true,
            confirmButtonColor: "blue",
            dangerMode: true,
            buttons: {
              confirm: {
                text: "Continue",
                value: "ok",
                visible: true,
                color: "red",
                closeModal: true,
              },
              retry: {
                text: "Restart",
                value: "cancel",
                visible: true,
                color: "blue",
                className: "btn-danger",
                closeModal: true,
              },
            },
          }).then((ok) => {
            if (ok === "ok") {
              navigate(textPath + "/" + 1);
            } else if (ok === "cancel") {
              // User clicked the cancel button

              let token = getCookie("userToken");
              let config = { headers: { Authorization: "Bearer " + token } };
              try {
                axios
                  .post(
                    `${backendURL}temp-mt/delete-save-file`,
                    {
                      mt_id: id,
                      mt_type_id: typeId,
                      user_id: userId,
                    },
                    config
                  )
                  .then((res) => {
                    if (res.data.status == 1) {
                      localStorage.removeItem(userId + "saveMt" + id);
                      navigate(textPath + "/" + 0);
                    } else {
                      swal({
                        title: "Failed to delet Save Progress",
                        text: res.data?.message,
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      });
                    }
                  })
                  .catch((error) => {
                    swal({
                      title: "Failed to delet Save Progress",
                      text:
                        error.response?.data?.message ??
                        error + ". Please try again.",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    });
                  });
              } catch (error) {
                swal({
                  title: "Failed to delete Save Progress",
                  text: "Please check your internet connection and try again .",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                });
              }
            } else {
              // User clicked outside the modal or pressed the Escape key

              swal.close(); // Optional: Close the modal or perform any other action
            }
          });
        } else {
          navigate(textPath + "/" + 0);
        }
      } else {
        swal({ text: "Cancel retake!", timer: 1500 });
      }
    });
  };

  const handleClose = () => {
    setCheckOpen(false);
  };

  const takeTestHandler = (path, saveProgress, id, typeId) => {
    if (saveProgress) {
      swal({
        title: "Notice",
        text: "You did not finish this test last time. Do you want to continue from your saved session?",
        icon: "info",
        confirmButtonText: "Yes",
        denyButtonText: "No",
        showDenyButton: true,
        confirmButtonColor: "blue",
        dangerMode: true,
        buttons: {
          confirm: {
            text: "Continue",
            value: "ok",
            visible: true,
            color: "blue",
            closeModal: true,
          },
          retry: {
            text: "Restart",
            value: "cancel",
            visible: true,
            color: "red",
            className: "btn-danger",
            closeModal: true,
          },
        },
      }).then((ok) => {
        if (ok === "ok") {
          navigate(path + "/" + 1);
        } else if (ok === "cancel") {
          // User clicked the cancel button

          let token = getCookie("userToken");
          let config = { headers: { Authorization: "Bearer " + token } };
          try {
            axios
              .post(
                `${backendURL}temp-mt/delete-save-file`,
                {
                  mt_id: id,
                  mt_type_id: typeId,
                  user_id: userId,
                },
                config
              )
              .then((res) => {
                if (res.data.status == 1) {
                  localStorage.removeItem(userId + "saveMt" + id);
                  navigate(path + "/" + 0);
                } else {
                  swal({
                    title: "Failed to delet Save Progress",
                    text: res.data?.message,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  });
                }
              })
              .catch((error) => {
                swal({
                  title: "Failed to delet Save Progress",
                  text:
                    error.response?.data?.message ??
                    error + ". Please try again.",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                });
              });
          } catch (error) {
            swal({
              title: "Failed to delete Save Progress",
              text: "Please check your internet connection and try again .",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            });
          }
          navigate(path + "/" + 0);
        } else {
          // User clicked outside the modal or pressed the Escape key

          swal.close(); // Optional: Close the modal or perform any other action
        }
      });
    } else {
      navigate(path + "/" + 0);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {pages.map((page, index) => (
          <Card sx={{ ...cardStyle }} key={index}>
            <CardContent
              sx={{ textAlign: "center", p: 0, position: "relative" }}
            >
              {/* <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  ...ellipsisStyle,
                  pt: 2,
                  fontSize: "1.7rem",
                  height: "3rem",
                }}
              >
                id:{page[0][2]}
              </Typography> */}
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  ...ellipsisStyle,
                  textAlign: "left",
                  backgroundColor: "yellow",
                  width: "30%",
                  fontSize: "1rem",
                  height: "1.5rem",
                  color: "red",
                }}
              >
                {page[0][3] === 0
                  ? "2hour test"
                  : page[0][3] === 1
                  ? "Full Mock Test"
                  : page[0][3] === 2
                  ? "Mini Mock Test"
                  : page[0][3] === 3
                  ? "Speaking Mock Test"
                  : page[0][3] === 4
                  ? "Reading Mock Test"
                  : page[0][3] === 5
                  ? "Listening Mock Test"
                  : "Writing Mock Test"}
              </Typography>
              {saveMtListArray.includes(page[0][2]) && (
                <Typography
                  gutterBottom
                  variant="span"
                  component="div"
                  sx={{
                    ...ellipsisStyle,
                    position: "absolute",
                    right: -2,
                    bottom: 0,

                    backgroundColor: "yellowgreen",
                    boxShadow: 5,
                    width: "30%",
                    borderTopLeftRadius: "0.5rem",
                    borderBottomLeftRadius: "0.5rem",
                    fontSize: "0.8rem",
                    height: "1.5rem",
                    color: "white",
                  }}
                >
                  Checkpoint
                </Typography>
              )}

              {/* <Typography
                gutterBottom
                variant="span"
                component="span"
                sx={{
                  ...ellipsisStyle,
                  textAlign: "left",
                  backgroundColor:
                    page[0][4] === 2
                      ? "white"
                      : page[0][4] === 1
                      ? "yellowgreen"
                      : page[0][4] === 3
                      ? "red"
                      : "yellow",
                  width: "35%",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  color:
                    page[0][4] === 2 || page[0][4] === 4 ? "black" : "white",
                  position: "absolute",
                  bottom: -54,
                  right: 0,
                }}
              >
                {page[0][4] === 2
                  ? "Not taken"
                  : page[0][4] === 1
                  ? "Already Taken"
                  : page[0][4] === 3
                  ? "Rejected"
                  : page[0][4] === 4
                  ? "Pending"
                  : ""}
              </Typography> */}
              <Typography
                variant="h5"
                color="#fff"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  height: "2rem",
                }}
              >
                {page[0][0]}
              </Typography>
              <Typography sx={{ fontSize: "1rem" }}>
                Questions:{props.question[index].reduce((a, b) => a + b, 0)}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                backgroundColor: "rgb(1 119 186)",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  diplay: "flex",
                  width: "100%",

                  justifyContent: "center",
                }}
              >
                {page[0][4] === 1 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      width: "100%",
                    }}
                  >
                    <TooltipBtn
                      title="check answers"
                      text="Check"
                      color="yellow"
                      funType="check"
                      passValue={page[0][5]}
                      id={page[0][2]}
                      typeId={page[0][3]}
                      status={page[0][4]}
                    />
                    <TooltipBtn
                      title="show score"
                      text="Score"
                      color="green"
                      funType="score"
                      passValue={page[0][5]}
                      status={page[0][4]}
                    />
                    <TooltipBtn
                      title="retake"
                      text={<RefreshIcon />}
                      color="red"
                      funType="retake"
                      passValue={page[0][1]}
                      id={page[0][2]}
                      typeId={page[0][3]}
                    />
                  </Box>
                )}
                {page[0][4] === 2 && (
                  <Button
                    size="small"
                    sx={{ ...btnStyle }}
                    disabled={page[0][4] === 4}
                    onClick={() =>
                      (page[0][3] === 1 || page[0][3] === 3) &&
                      browser === "Firefox"
                        ? alertFunction()
                        : page[0][4] === 2 //|| page[0][4] === 3
                        ? takeTestHandler(
                            page[0][1],
                            saveMtListArray.includes(page[0][2]),
                            page[0][2],
                            page[0][3]
                          )
                        : // : page[0][4] === 1
                          // ? clickInfo(page[0][5])
                          ""
                    }
                  >
                    {page[0][4] === 2
                      ? saveMtListArray.includes(page[0][2])
                        ? "Continue"
                        : "Take Test"
                      : page[0][4] === 3
                      ? "Retry"
                      : page[0][4] === 4
                      ? "View Result"
                      : page[0][4] === 1
                      ? "View Result"
                      : ""}

                    <ArrowForwardIcon></ArrowForwardIcon>
                  </Button>
                )}
                {page[0][4] === 3 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      width: "100%",
                    }}
                  >
                    <TooltipBtn
                      title="retake"
                      text={<RefreshIcon />}
                      color="red"
                      funType="retake"
                      passValue={page[0][1]}
                      id={page[0][2]}
                      typeId={page[0][3]}
                    />
                  </Box>
                )}
                {page[0][4] === 4 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "yellow",
                        border: "1px solid white",
                        p: 0.2,
                        borderRadius: "1rem",
                        "@keyframes horizontal_move":
                          animationObj.horizontalLtr,
                        animation: "2.5s horizontal_move ease-in infinite",
                      }}
                    >
                      Pending Result
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardActions>
          </Card>
        ))}
      </Box>
      {detailPost !== "" && detailPost !== undefined && scoreOpen && (
        <MtDetail
          open={scoreOpen}
          setOpen={setScoreOpen}
          post={detailPost}
        ></MtDetail>
      )}

      <CheckAnswerDialogComponent
        title="Check your answers"
        checkOpen={checkOpen}
        handleClose={handleClose}
        mockId={mtId}
        scoreId={scoreId}
        mockTestType={mtTypeId}
      ></CheckAnswerDialogComponent>
    </>
  );
}

export default TestCard;
