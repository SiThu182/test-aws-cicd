import { Box, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import Loader from "../../../../components/Backend/AnimationLoader/Loader";
import PageLoader from "../../../../components/Backend/PageLoader";
import { fetcheditPostsAsync } from "../../../../redux/thunk/Posts";
import Intro from "./Intro";
import ListeningMockTest from "./ListeningMockTest";
import MicTest from "./MicTest";
import MicTest1 from "./MicTest1";
import { MtStyle } from "./MtStyleVariable";
import ReadingMockTest from "./ReadingMockTest";
import SpeakingMockTest from "./SpeakingMockTest";
import Test from "./Test";
import WritingMockTest from "./WritingMockTest";
import { fetchCheckMockTestAsync } from "../../../../redux/thunk/MockTest";
import Loader from "../../../../components/Backend/AnimationLoader/Loader";
import { AdminCheckContext } from "./MockTest";
import { getCookie } from "../../../../Utils/GetCookies";
import swal from "sweetalert";
import axios from "axios";
function CheckConditions(props) {
  const {
    checkAnswerState,
    mockId,
    mockTestType,
    scoreId,
    handleClose,
    resumeByUserOutsideTest,
  } = props;

  // const { saveStatePresent, setSaveStatePresent } = useState(false);
  const navigate = useNavigate();
  const { editStatus, editPost } = useSelector((state) => state.posts);
  let [intro, setIntro] = useState(true);
  let [micTest, setMicTest] = useState(true);
  let [micTest1, setMicTest1] = useState(true);
  const [saveProgressExist, setSaveProgressExist] = useState();
  const [saveProgressLoading, setSaveProgressLoading] = useState(true);
  const [saveProgressError, setSaveProgressError] = useState("");
  const checkByAdmin = useContext(AdminCheckContext);

  const data = useParams();

  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
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
    allCategory.forEach((c) => {
      localStorage.removeItem(c);
    });
  }, []);
  useEffect(() => {
    if (checkAnswerState) {
      dispatch(fetchCheckMockTestAsync(scoreId));
      dispatch(fetcheditPostsAsync({ path: "mt-test", id: mockId }));
    } else {
      dispatch(fetcheditPostsAsync({ path: "mt-test", id: mockId }));
    }
  }, [mockId, dispatch, checkAnswerState, scoreId]);

  useEffect(() => {
    if (data.resume == 1 && !checkAnswerState) {
      setSaveProgressExist(true);
      let token = getCookie("userToken");
      let config = { headers: { Authorization: "Bearer " + token } };
      try {
        axios
          .get(
            `${process.env.REACT_APP_BACKEND_ADMIN}temp-mt/get-save-file/${userId}/${mockId}`,

            config
          )
          .then((res) => {
            if (res.data?.status == 1) {
              localStorage.setItem(
                userId + "saveMt" + mockId,
                res.data.data.save_progress
              );
              let currentCategoryData = JSON.parse(res.data.data.save_progress);

              let currentCategory = currentCategoryData["category"];
              localStorage.setItem(
                userId + "saveMt" + mockId + currentCategory,
                currentCategoryData[currentCategory]
              );
            } else {
              swal({
                title: "Failed to download Save Progress",
                text: "Click ok to retry and cancel to exit",
                icon: "warning",
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
                dangerMode: true,
              }).then((choice) => {
                if (choice == "ok") {
                  window.location.reload();
                } else {
                  checkByAdmin === true
                    ? navigate("/admin/mocktestlist")
                    : navigate("/mocktest/tabs");
                }
              });
              setSaveProgressError("failed to download save progress");
            }
          })
          .catch((error) => {
            swal({
              title: "Failed to download Save Progress",
              text:
                error.response?.data?.message ??
                error + ".Click ok to retry and cancel to exit",
              icon: "warning",
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
              dangerMode: true,
            }).then((choice) => {
              if (choice == "ok") {
                window.location.reload();
              } else {
                checkByAdmin === true
                  ? navigate("/admin/mocktestlist")
                  : navigate("/mocktest/tabs");
              }
            });
            setSaveProgressError("failed to download save progress");
          });
      } catch (error) {
        swal({
          title: "Failed to download Save Progress",
          text: "Please check your internet connection and try again .",
          icon: "warning",
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
          dangerMode: true,
        }).then((choice) => {
          if (choice == "ok") {
            window.location.reload();
          } else {
            checkByAdmin === true
              ? navigate("/admin/mocktestlist")
              : navigate("/mocktest/tabs");
          }
        });
      } finally {
        setSaveProgressLoading(false);
      }
    }
  }, [data, mockId, checkAnswerState, userId, checkByAdmin, navigate]);

  useEffect(() => {
    if (saveProgressExist && !saveProgressLoading && saveProgressError === "") {
      let saveData = localStorage.getItem(userId + "saveMt" + mockId);
      if ((saveData !== null && saveData !== undefined) || checkAnswerState) {
        setMicTest(false);
        setMicTest1(false);
        setIntro(false);
      }
    } else {
      if (checkAnswerState) {
        setMicTest(false);
        setMicTest1(false);
        setIntro(false);
      }
    }
  }, [
    mockId,
    checkAnswerState,
    userId,
    data,
    saveProgressError,
    saveProgressExist,
    saveProgressLoading,
  ]);

  return (
    <>
      <Box
        sx={{
          ...MtStyle.mtContainer,
          height: checkAnswerState ? "100%" : "100vh",
          minHeight: "60vh",
          boxShadow: 4,
          borderRadius: checkAnswerState ? "2rem" : "",
        }}
      >
        <Box sx={{ height: "100%", width: "100%" }}>
          {micTest && <MicTest setMicTest={setMicTest}></MicTest>}
          {!micTest && micTest1 && (
            <MicTest1 setMicTest1={setMicTest1}></MicTest1>
          )}
          {!micTest1 && intro && <Intro setIntro={setIntro}></Intro>}
          {!intro &&
            editStatus === "loading" &&
            saveProgressLoading &&
            (checkAnswerState ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "60%",
                }}
              >
                <Loader></Loader>{" "}
              </Box>
            ) : (
              <PageLoader></PageLoader>
            ))}
          {(editStatus === "failed" || saveProgressError !== "") && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Button
                onClick={() =>
                  checkByAdmin === true
                    ? navigate("/admin/mocktestlist")
                    : navigate("/mocktest/tabs")
                }
                variant="contained"
              >
                Network Error
              </Button>
            </Box>
          )}

          {!intro &&
            editStatus === "succeeded" &&
            ((saveProgressExist &&
              !saveProgressLoading &&
              saveProgressError == "") ||
              !saveProgressExist) && (
              <>
                {(mockTestType == "0" ||
                  mockTestType == "1" ||
                  mockTestType == "2") && (
                  <>
                    <Test
                      mockId={mockId}
                      mockTestType={mockTestType}
                      checkAnswerState={checkAnswerState}
                      handleClose={handleClose}
                      resumeByUserOutsideTest={resumeByUserOutsideTest}
                      saveProgressExist={saveProgressExist}
                    ></Test>
                  </>
                )}
                {mockTestType == "3" && (
                  <>
                    <SpeakingMockTest
                      mockId={mockId}
                      mockTestType={mockTestType}
                      checkAnswerState={checkAnswerState}
                      handleClose={handleClose}
                      resumeByUserOutsideTest={resumeByUserOutsideTest}
                      saveProgressExist={saveProgressExist}
                    ></SpeakingMockTest>
                  </>
                )}
                {mockTestType == "4" && (
                  <>
                    <ReadingMockTest
                      mockId={mockId}
                      checkAnswerState={checkAnswerState}
                      handleClose={handleClose}
                      resumeByUserOutsideTest={resumeByUserOutsideTest}
                      saveProgressExist={saveProgressExist}
                    ></ReadingMockTest>
                  </>
                )}
                {mockTestType == "5" && (
                  <>
                    <ListeningMockTest
                      mockId={mockId}
                      checkAnswerState={checkAnswerState}
                      handleClose={handleClose}
                      resumeByUserOutsideTest={resumeByUserOutsideTest}
                      saveProgressExist={saveProgressExist}
                    ></ListeningMockTest>
                  </>
                )}
                {mockTestType == "6" && (
                  <>
                    <WritingMockTest
                      mockId={mockId}
                      checkAnswerState={checkAnswerState}
                      handleClose={handleClose}
                      resumeByUserOutsideTest={resumeByUserOutsideTest}
                      saveProgressExist={saveProgressExist}
                    ></WritingMockTest>
                  </>
                )}
              </>
            )}
        </Box>
      </Box>
    </>
  );
}

export default CheckConditions;
