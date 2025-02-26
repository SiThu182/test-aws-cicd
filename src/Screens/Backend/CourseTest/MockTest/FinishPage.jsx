import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

import Spinner from "../../../../components/Spinner";
import { fetchScoreCount } from "../../../../components/Backend/ScoreCountApi";
import ExitConfirmBox from "./ExitConfirmBox";
import { getCookie } from "../../../../Utils/GetCookies";

function FinishPage(props) {
  const data = useParams();
  let navigate = useNavigate();
  let mt_type_id = parseInt(props.mockTestType);
  let [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  let allCategory = [
    "ra",
    "rs",
    "di",
    "asq",
    "rl",
    "we",
    "swt",
    "rmc",
    "rsmc",
    "rfib",
    "rwfib",
    "rop",
    "smc",
    "mc",
    "fib",
    "hiw",
    "hcs",
    "smw",
    "sst",
    "wfd",
  ];
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  let getStoreData = localStorage.getItem(userId + "saveMt" + data.id);
  getStoreData = JSON.parse(getStoreData);

  let speaking = {};
  if ((mt_type_id == 1 || mt_type_id == 3) && !props.checkAnswerState) {
    speaking = {
      ra: JSON.parse(getStoreData["ra"]),
      rs: JSON.parse(getStoreData["rs"]),
      rl: JSON.parse(getStoreData["rl"]),
      di: JSON.parse(getStoreData["di"]),
      asq: JSON.parse(getStoreData["asq"]),
    };
  }
  let reading = {};
  if ((mt_type_id == 1 || mt_type_id == 4) && !props.checkAnswerState) {
    reading = {
      rsmc: JSON.parse(getStoreData["rsmc"]),
      rmc: JSON.parse(getStoreData["rmc"]),
      rfib: JSON.parse(getStoreData["rfib"]),
      rwfib: JSON.parse(getStoreData["rwfib"]),
      rop: JSON.parse(getStoreData["rop"]),
    };
  }
  let writing = {};
  if ((mt_type_id == 1 || mt_type_id == 6) && !props.checkAnswerState) {
    writing = {
      swt: JSON.parse(getStoreData["swt"]),
      we: JSON.parse(getStoreData["we"]),
    };
  }

  let listening = {};
  if ((mt_type_id == 1 || mt_type_id == 5) && !props.checkAnswerState) {
    listening = {
      smc: JSON.parse(getStoreData["smc"]),
      mc: JSON.parse(getStoreData["mc"]),
      fib: JSON.parse(getStoreData["fib"]),
      hiw: JSON.parse(getStoreData["hiw"]),
      hcs: JSON.parse(getStoreData["hcs"]),
      smw: JSON.parse(getStoreData["smw"]),
      sst: JSON.parse(getStoreData["sst"]),
      wfd: JSON.parse(getStoreData["wfd"]),
    };
  }

  const sendStoreData = async () => {
    let id = localStorage.getItem("userId");
    let type = parseInt(props.mockTestType) + 1;
    if (!props.checkAnswerState) {
      let response = await fetchScoreCount(
        id,
        type,
        props.mockTestId,
        "mock test",
        false
      );

      if (response === 1) {
        setLoading(true);
        let scoreData = {
          user_id: parseInt(localStorage.getItem("userId")),
          mock_test_id: props.mockTestId,
          mock_test_type: parseInt(props.mockTestType),
          speaking: {
            language_type: 1,
            ...speaking,
          },
          reading: {
            language_type: 2,
            ...reading,
          },
          writing: {
            language_type: 4,
            ...writing,
          },
          listening: {
            language_type: 3,
            ...listening,
          },
        };

        let speakingData = {
          user_id: parseInt(localStorage.getItem("userId")),
          mock_test_id: props.mockTestId,
          mock_test_type: 3,
          speaking: speaking,
        };
        let readingData = {
          user_id: parseInt(localStorage.getItem("userId")),
          mock_test_id: props.mockTestId,
          mock_test_type: 4,
          reading: reading,
        };
        let writingData = {
          user_id: parseInt(localStorage.getItem("userId")),
          mock_test_id: props.mockTestId,
          mock_test_type: 6,
          writing: writing,
        };
        let listeningData = {
          user_id: parseInt(localStorage.getItem("userId")),
          mock_test_id: props.mockTestId,
          mock_test_type: 5,
          listening: listening,
        };

        let sendData =
          mt_type_id === 0 || mt_type_id === 1 || mt_type_id === 2
            ? scoreData
            : mt_type_id === 3
            ? speakingData
            : mt_type_id === 4
            ? readingData
            : mt_type_id === 5
            ? listeningData
            : writingData;
        let token = getCookie("userToken");
        if (!token) this.props.navigate("/login");
        else {
          let config = { headers: { Authorization: "Bearer " + token } };
          try {
            let res_store = await axios.post(
              `${backendURL}mt-score`,
              sendData,
              config
            );

            if (res_store.status === 200) {
              setLoading(false);
              swal({
                title: "Success",
                text:
                  res_store.data.message +
                  "You can check your score at dashboard or at the mock test card lists .Please wait for the admin approval.",
                icon: "success",
                button: "OK!",
              }).then(() => {
                allCategory.forEach((c) => {
                  localStorage.removeItem(c);
                });

                const keys = Object.keys(localStorage);

                const savefilteredKeys = keys.filter((key) =>
                  key.startsWith(userId + "saveMt" + data.id)
                );
                console.log(savefilteredKeys, "filteredkeys");

                savefilteredKeys.forEach((key) => {
                  localStorage.removeItem(key);
                });

                try {
                  axios
                    .post(
                      `${backendURL}temp-mt/delete-save-file`,
                      {
                        mt_id: props.mockTestId,
                        mt_type_id: mt_type_id,
                        user_id: userId,
                      },
                      config
                    )
                    .then((res) => {
                      setOpen(false);
                      if (res.data.status == 1) {
                        // swal({
                        //   title: "Success  Saving Progress",
                        //   text: "Your progress is saved successfully.",
                        //   icon: "info",
                        //   buttons: true,
                        // }).then(() => {
                        //   checkByAdmin === true
                        //     ? navigate("/admin/mocktestlist")
                        //     : navigate("/mocktest/tabs");
                        // });
                        setOpen(false);
                      } else {
                        console.log(res.data.message);
                        setOpen(false);
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                      swal({
                        title: "Failed to delet Save Progress",
                        text:
                          error.response?.data?.message ??
                          error + ". Please try again.",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      });
                      setOpen(false);
                    });
                } catch (error) {
                  swal({
                    title: "Failed to delete Save Progress",
                    text: "Please check your internet connection and try again .",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  });
                  setOpen(false);
                }
                navigate("/mocktest/tabs");
              });
            } else {
              setLoading(false);
              swal({
                title: "Danger",
                text: res_store.data.message,
                icon: "error",
                button: "Retry",
              });
            }
          } catch (error) {
            setLoading(false);
            swal({
              title: "Danger",
              text: "Something went wrong",
              icon: "error",
              button: "Retry",
            });
          }
        }
      }
    }
  };

  // const exit = () => {
  //   allCategory.forEach((c) => {
  //     localStorage.removeItem(c);
  //   });
  //   navigate("/mocktest/tabs");
  // };

  return (
    <>
      {props.checkAnswerState ? (
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: "white",
              border: "1px solid black",
              borderRadius: "2px",
              boxShadow: 4,
            }}
          >
            <Box>
              <Typography> You have reached the end of test</Typography>
            </Box>

            <Button variant="contained" onClick={() => props.handleClose()}>
              Exit
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              display: "flex",
              justifyContent: "flex-end",
              mr: "1rem",
            }}
          >
            <Button
              variant="contained"
              sx={{ my: 2 }}
              onClick={() => setOpen(open ? false : true)}
            >
              <LogoutIcon />
              <Typography>Back to Mock Test Page</Typography>
            </Button>
          </Box>
          {/* exit confirm box */}
          <ExitConfirmBox
            open={open}
            setOpen={setOpen}
            finish={true}
            mockId={props.mockTestId}
          ></ExitConfirmBox>

          <Box
            width="100%"
            sx={{
              backgroundColor: "rgb(231,239,254)",

              px: {
                xs: 2,
                sm: 5,
                md: "8rem",
                lg: "10rem",
                xl: "30rem",
              },

              height: "100vh",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "2rem",
                p: 2,
                boxShadow: 5,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "5rem",
                  textAlign: "center",
                  pl: 3,
                  pb: 3,
                }}
              >
                <Typography variant="h6">
                  Thank You for choosing Aigma PTE Ai.
                </Typography>
                <Typography variant="body5">
                  Hope you get the desired score
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  height: "10rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AssignmentTurnedInIcon
                  sx={{
                    p: 2,
                    borderRadius: "50%",
                    fontSize: "5rem",
                    backgroundColor: "#4dabf5",
                    "@keyframes width-rotate": {
                      "0%": {
                        transform: "rotate(0deg)",
                        fontSize: "5rem",
                        backgroundColor: "red",
                      },
                      "50%": {
                        transform: "rotate(360deg)",
                        fontSize: "7rem",
                        backgroundColor: "yellow",
                      },
                      "100%": {
                        transform: "rotate(0deg)",
                        fontSize: "5rem",
                        backgroundColor: "#4dabf5",
                      },
                    },
                    animation: "1s width-rotate ease",
                  }}
                ></AssignmentTurnedInIcon>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  disabled={loading}
                  sx={{ my: 2 }}
                  onClick={() => sendStoreData()}
                >
                  <LogoutIcon />
                  <Typography>
                    {loading ? (
                      <>
                        <Spinner></Spinner>
                      </>
                    ) : (
                      "Save Score & Exit"
                    )}
                  </Typography>
                </Button>
              </Box>
              <Box
                sx={{
                  backgroundColor: "rgb(4,36,66)",
                  p: 2,

                  borderRadius: "2rem",
                  color: "white",
                  textAlign: "justify",
                }}
              >
                <Typography>
                  After pressing the above save button you can check your scores
                  and answers at dashboard or at the mock test card lists. The
                  score at the mock test card will show your latest score with
                  the test while at dashboard you can check all of your test
                  history.
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default FinishPage;
