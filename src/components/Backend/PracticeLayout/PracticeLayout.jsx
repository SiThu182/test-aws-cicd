import { Box, Typography, Button, Tooltip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { createContext, useCallback, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SwipeableSideDrawer from "../SideDrawer/SideDrawer";
import ReloadOrBackCard from "../../ReloadOrBackCard";
import PageNavTitle from "../PageTitle";
import NoteCard from "../NoteCard/NoteCard";
import PaginationAndButtonLayout from "../PracticeComponents/PracticeButtonAndFunction";
import { useSelector } from "react-redux";
import BrowserType from "../BrowserType";

import axios from "axios";
import swal from "sweetalert";

import { getCookie } from "../../../Utils/GetCookies";

export const DataForReusableSpeakingComponent = createContext();

const PracticeLayout = (props) => {
  const {
    category,
    setPage,
    reset,
    status,
    postsByPage,
    backPath,
    navTitle,
    categoryQuestion,
    upload,
    totalPage,
    page,
    disabledReset,
    disableSubmit,
    disableAudioText,
    disablePrev,
    disableNext,
    error,
    retry,
    audioText,
    audio,
    answerTemplate,
    disableAnswer,
    answer,
    answerLoading,
    answerBlock,
    answerTabs,
    children,
  } = props;
  const { status: NoteStatus, saveNoteList } = useSelector(
    (state) => state.saveNote
  );
  const [isChangingPage, setIsChangingPage] = useState(false);
  // const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const [bookmarkColor, setBookmarkColor] = useState(false);
  let goToPage = (e) => {
    setIsChangingPage(true);
    reset();
    let choosePage = e.target.value;
    setPage(choosePage);
    setTimeout(() => {
      setIsChangingPage(false);
    }, 1500);
  };

  let next = () => {
    setIsChangingPage(true);
    setPage(page * 1 + 1);
    reset();
    setTimeout(() => {
      setIsChangingPage(false);
    }, 1500);

    // dispatch(fetchPostsByPageAsync);
  };

  let prev = () => {
    // dispatch(resetPostsByPage);

    setIsChangingPage(true);
    setPage(page * 1 - 1);
    reset();
    setTimeout(() => {
      setIsChangingPage(false);
    }, 1500);

    // dispatch(fetchPostsByPageAsync);
  };
  let option = "";
  if (status === "loading") {
    option = (
      <>
        <option>Loading</option>
      </>
    );
  }
  if (status === "failed") {
    option = (
      <>
        <option>Fail to fetch data</option>
      </>
    );
  } else {
    let pageArray = [];
    let i = 1;
    while (i <= totalPage) {
      pageArray.push(i);
      i++;
    }
    option = pageArray.map((item, index) => {
      return (
        <option
          key={index}
          value={item}
          style={{ textAlign: "center", marginLeft: "0.5rem" }}
        >
          {item}/{totalPage}
        </option>
      );
    });
  }

  const saveClickHandler = () => {
    setIsSaving(true);
    let token = getCookie("userToken");
    const config = { headers: { Authorization: "Bearer " + token } };
    const userId = localStorage.getItem("userId");
    let saveNote =
      saveNoteList?.data?.data?.length !== 0
        ? saveNoteList?.data?.data?.[0]?.save_note
        : "";
    let data = {
      post_id: postsByPage?.data?.data[0]?.id,
      user_id: userId,
      save_note: saveNote,
      bookmark: !bookmarkColor,
    };
    try {
      if (saveNoteList.length !== 0 && saveNoteList?.data?.data?.length !== 0) {
        axios
          .put(
            process.env.REACT_APP_BACKEND_ADMIN +
              "save-post-note/" +
              saveNoteList?.data?.data?.[0].id,
            data,
            config
          )
          .then((res) =>
            swal({
              title: "success",
              text: res.data.message,
              icon: "success",
              button: "OK!",
            }).then(() => {
              setIsSaving(false);

              setBookmarkColor((prev) => !prev);
            })
          );
      } else {
        axios
          .post(
            process.env.REACT_APP_BACKEND_ADMIN + "save-post-note",
            data,
            config
          )
          .then((res) =>
            swal({
              title: "success",
              text: res.data.message,
              icon: "success",
              button: "OK!",
            }).then(() => {
              setIsSaving(false);
              setBookmarkColor((prev) => !prev);
            })
          );
      }
    } catch (error) {
      swal({
        title: "warning",
        text: error.message,
        icon: "warning",
        button: "OK!",
      }).then(() => {
        setIsSaving(false);
      });
    }
  };

  useEffect(() => {
    if (
      NoteStatus === "succeeded" &&
      saveNoteList?.data?.data?.[0]?.bookmark !== null &&
      saveNoteList?.data?.data?.[0]?.bookmark !== undefined
    ) {
      setBookmarkColor(
        saveNoteList?.data?.data?.[0]?.bookmark !== null &&
          saveNoteList?.data?.data?.[0]?.bookmark !== undefined
          ? saveNoteList?.data?.data?.[0]?.bookmark
          : false
      );
    } else {
      setBookmarkColor(false);
    }
  }, [saveNoteList, NoteStatus, postsByPage]);

  return (
    <>
      {(status === "loading" || isChangingPage) && (
        <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
          <Backdrop open={true} sx={{ zIndex: 2 }}>
            {/* <CircularProgress color={"primary"} /> */}
          </Backdrop>
        </Box>
      )}

      <SwipeableSideDrawer
        category={category}
        setPost={setPage}
        reset={reset}
        status={status}
        currentPage={postsByPage?.data?.data[0]?.post_number}
      />
      {status === "failed" && (
        <Box sx={styles.reloadLayout}>
          <ReloadOrBackCard header="Failed to fetch data .You can try reload or refresh" />
        </Box>
      )}
      <BrowserType></BrowserType>
      {/* <Box sx={styles.backbtnLayout}>
        <Typography variant="h5"></Typography>
        <BackButton path={backPath} />
      </Box> */}
      <PageNavTitle text={navTitle} />
      <Box sx={styles.testLayout}>
        <Box id="main" sx={styles.mainContentLayout}>
          <Box className="container-fluid" sx={styles.testCardStyle}>
            <div className="card">
              <Typography sx={{ my: 2, fontSize: "1.2rem" }}>
                <span style={styles.postNumberTextStyle}>
                  {category.toUpperCase()}
                  {status === "succeeded"
                    ? postsByPage?.data?.data[0]?.post_number
                    : "..."}
                </span>{" "}
                {categoryQuestion}
              </Typography>

              {!["ra", "rs", "rl", "di", "asq", "rop", "rts"].includes(
                category
              ) && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    px: 4,
                    width: "100%",
                  }}
                >
                  <Tooltip title="Bookmark">
                    {NoteStatus === "succeeded" && (
                      <Button
                        variant="contained"
                        sx={{
                          padding: 1,
                          backgroundColor: bookmarkColor ? "#2196f3" : "black",
                        }}
                        onClick={() => saveClickHandler()}
                      >
                        {isSaving ? (
                          <CircularProgress size={"1rem"} />
                        ) : (
                          <BookmarkIcon fontSize="6rem" />
                        )}
                      </Button>
                    )}
                  </Tooltip>
                </Box>
              )}

              <Box sx={{ margin: "0 auto", width: "100%", mb: 4 }}>
                {status === "succeeded" &&
                  ["ra", "rs", "rl", "di", "asq", "rop", "rts"].includes(
                    category
                  ) && (
                    <>
                      {" "}
                      <Box
                        sx={{
                          color: "#2196f3",
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <Typography variant="h5">
                          {postsByPage?.data?.data[0]?.title}
                        </Typography>
                        <Tooltip title="Bookmark">
                          {NoteStatus === "succeeded" && (
                            <Button
                              variant="contained"
                              sx={{
                                padding: 1,
                                backgroundColor: bookmarkColor
                                  ? "#2196f3"
                                  : "black",
                              }}
                              onClick={() => saveClickHandler()}
                            >
                              {isSaving ? (
                                <CircularProgress size={"1rem"} />
                              ) : (
                                <BookmarkIcon fontSize="6rem" />
                              )}
                            </Button>
                          )}
                        </Tooltip>
                      </Box>
                      {category === "rts" && (
                        <Box>
                          <Typography variant="h6">{audioText}</Typography>
                        </Box>
                      )}
                    </>
                  )}
                {children}
              </Box>
              <Box sx={{ width: "100%", px: 2 }}>
                <PaginationAndButtonLayout
                  submit={() => upload()}
                  next={next}
                  reset={() => reset()}
                  prev={() => prev()}
                  option={option}
                  goToPage={(e) => goToPage(e)}
                  category={category}
                  page={page}
                  disableReset={disabledReset}
                  disableSubmit={disableSubmit}
                  disableAudioText={disableAudioText}
                  disablePrev={disablePrev || isChangingPage}
                  disableNext={disableNext || isChangingPage}
                  error={error}
                  retry={retry}
                  audioText={audioText}
                  audio={audio}
                  answerTemplate={answerTemplate}
                  disableAnswer={disableAnswer}
                />

                {answerLoading && (
                  <Box sx={{ textAlign: "center", width: "100%" }}>
                    <CircularProgress />
                  </Box>
                )}

                {answer ? (
                  <>
                    <Typography variant="h5" my={2}>
                      Score
                    </Typography>
                  </>
                ) : (
                  ""
                )}
                {answer}
                <Box
                  sx={{ borderRadius: "2rem", elevation: "1px solid black" }}
                >
                  {answerBlock()}
                </Box>
              </Box>
              {/* <Box sx={{ width: "100%", px: 2 }}>{answerTabs()}</Box> */}
            </div>
          </Box>
        </Box>
        <Box sx={styles.noteCardLayout}>
          <NoteCard postId={postsByPage?.data?.data[0]?.id} />
        </Box>
      </Box>
    </>
  );
};

const styles = {
  reloadLayout: {
    position: "absolute",
    zIndex: 1,
    top: "40%",
    left: "40%",
    backdropFilter: "blur(20px)",
  },
  backbtnLayout: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    px: 4,
    mt: 1,
  },

  testLayout: {
    width: "100%",
    px: 2,
    mt: 2,
    display: "flex",
    flexDirection: {
      xs: "column",
      md: "row",
    },
  },

  mainContentLayout: {
    width: { xs: "100%", md: "75%" },
  },

  testCardStyle: {
    p: "0.5rem",
    bgcolor: "#fff",
    borderRadius: "1rem",
    boxShadow: 2,
  },

  postNumberTextStyle: {
    backgroundColor: "#4dabf5",
    color: "white",
    borderRadius: "0.3rem",
    padding: "0.3rem",
  },

  noteCardLayout: {
    width: {
      xs: "100%",
      md: "25%",
    },
    px: {
      xs: 0,
      md: 2,
    },
    my: {
      xs: 2,
      md: 0,
    },
  },
};

export default PracticeLayout;
