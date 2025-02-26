import { Box, Pagination, Switch, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TableForm from "../../../components/Backend/TableForm/TableForm";
import ActionCellForList from "../../../components/Backend/ActionCellForList";
// import { fetchLmcPostsAsync } from "../../../../../redux/thunk/Posts";
import Checkbox from "@mui/material/Checkbox";
import TableListLoadingComponent from "../../../components/Backend/Admin/Posts/TableListLoadingComponent";
import TableListFailedComponent from "../../../components/Backend/Admin/Posts/TableListFailedComponent";
import PageNavTitle from "../../../components/Backend/PageTitle";
import useDebouncedApiCall from "../../../customHooks/DebounceApi/useDebounceApi";
import { getCookie } from "../../../Utils/GetCookies";
function ReusableList(props) {
  //   const { lmcPosts, lmcStatus } = useSelector((state) => state.posts);

  const navigate = useNavigate();
  const [statusId, setStatusId] = useState();
  // const dispatch = useDispatch();
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

  let currentDate = new Date();
  currentDate = dayjs(currentDate.toISOString());
  //for prediction date
  const [startDate, setStartDate] = React.useState(dayjs(currentDate));
  const [endDate, setEndDate] = React.useState(dayjs(currentDate));
  const [selectedIndexArray, setSelectedIndexArray] = useState([]);
  const [selectedPredictionArray, setSelectedPredictionArray] = useState([]);
  //selected index where mt_check is also true
  const [idsArray, setIdsArray] = useState([]);
  const [
    selectedOverlappedCheckIndexArray,
    setSelectedOverlappedCheckIndexArray,
  ] = useState([]);
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };

  const { setDebouncedValue } = useDebouncedApiCall(
    (path) => props.searchAPI(path),
    1000
  );

  useEffect(() => {
    if (props.isSearch) {
      setDebouncedValue(props.searchPath);
    } else {
      setDebouncedValue(null);
    }
  }, [props.isSearch, props.searchPath, setDebouncedValue]);

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  const statusHandler = (status, id) => {
    setStatusId(id);
    let requestStatus = status === 0 ? 1 : 0;
    if (!token) navigate("/login");

    swal({
      title: "Are you sure?",
      text: "Are you sure you want to change the status",
      icon: "warning",
      buttons: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      showDenyButton: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        try {
          axios
            .post(
              backendURL + "status-change-post",
              {
                status: requestStatus,
                id: id,
              },
              config
            )
            .then(() => {
              // dispatch(fetchMtPostsAsync(postPath));
              swal({
                title: "Success Alert",
                text: "Status change success",
                icon: "success",
                // buttons: true,
                // dangerMode: true,
                timer: 2000,
              });
              setStatusId();
              props.handleReload(true);
              // window.location.reload(false)
            })
            .catch((error) => {
              // dispatch(fetchMtPostsAsync(postPath));
              swal({
                title: "Status change error?",
                text: error.message,
                icon: "warning",
                buttons: true,
                dangerMode: true,
              });
              setStatusId();
              // window.location.reload(false);
            });
        } catch (error) {
          // dispatch(fetchMtPostsAsync(postPath));
          swal({
            title: "Error Alert",
            text: "Failed to change success",
            icon: "error",
            buttons: true,
            dangerMode: true,
          });
          setStatusId();
          // window.location.reload(false);
        }
      } else {
        // dispatch(fetchMtPostsAsync(postPath));
        swal({
          text: "Your status is not changed",
          icon: "info",
          confirmButtonText: "Ok",
        });
        setStatusId();
        // window.location.reload(false );
      }
    });
  };

  //Pause other audio if switch to play next
  let mediaPlayer = (id) => {
    let x = document.getElementById(id);
    let allAudio = document.querySelectorAll(".audio");
    let audio = x.querySelector(".audio");
    audio.play();
    allAudio.forEach((item) => {
      if (item === audio) {
      } else {
        item.pause();
        item.currentTime = 0;
      }
    });
  };
  var post_html_table = "";
  var paging_html = "";

  //   const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "l-mul-choice";
  // const backendURL = `${process.env.REACT_APP_BACKEND_ADMIN}${props.path}`;

  //for selecting post to add prediction or others
  const selectHandler = (id, mt_check, prediction_check) => {
    //if selected index's mt_check is also true

    if (mt_check || prediction_check) {
      if (prediction_check) {
        setSelectedPredictionArray((prev) => {
          const indexArray = [...prev];
          if (indexArray.includes(id)) {
            let indexToRemove = indexArray.indexOf(id);
            indexArray.splice(indexToRemove, 1);
          } else {
            indexArray.push(id);
          }
          return indexArray;
        });
      }

      setSelectedOverlappedCheckIndexArray((prev) => {
        const indexArray = [...prev];
        if (indexArray.includes(id)) {
          let indexToRemove = indexArray.indexOf(id);
          indexArray.splice(indexToRemove, 1);
        } else {
          indexArray.push(id);
        }
        return indexArray;
      });
    }
    setSelectedIndexArray((prev) => {
      const indexArray = [...prev];
      if (indexArray.includes(id)) {
        let indexToRemove = indexArray.indexOf(id);
        indexArray.splice(indexToRemove, 1);
      } else {
        indexArray.push(id);
      }
      return indexArray;
    });
 
  };

  const selectAllHandler = useCallback(() => {
    setSelectedPredictionArray((prev) => {
      const indexArray = [...prev];
      props.posts.data.forEach((item) => {
        if (item?.start_date !== null)
          if (indexArray.includes(item.id)) {
            let indexToRemove = indexArray.indexOf(item.id);
            indexArray.splice(indexToRemove, 1);
          }
        indexArray.push(item.id);
      });
      return indexArray;
    });
    setSelectedOverlappedCheckIndexArray((prev) => {
      const indexArray = [...prev];
      props.posts.data.forEach((item) => {
        if (item.mt_check || item?.start_date !== null)
          if (indexArray.includes(item.id)) {
            let indexToRemove = indexArray.indexOf(item.id);
            indexArray.splice(indexToRemove, 1);
          }
        indexArray.push(item.id);
      });
      return indexArray;
    });

    setSelectedIndexArray((prev) => {

      const indexArray = [...prev];
      props.posts.data.forEach((item) => {
        if (indexArray.includes(item.id)) {
          let indexToRemove = indexArray.indexOf(item.id);
          indexArray.splice(indexToRemove, 1);
        }
        indexArray.push(item.id);
      });

      return indexArray;
    });
    // setSelectedTitleArray((prev) => {
    //   const titleArray = [...prev];
    //   idsArray.forEach((id, index) => {
    //     if (selectedIndexArray.includes(id)) {
    //       if (titleArray.includes(titlesArray[index])) {
    //         let titleToRemove = titleArray.indexOf(titlesArray[index]);
    //         titleArray.splice(titleToRemove, 1);
    //       }
    //     }
    //     titleArray.push(titlesArray[index]);
    //   });
    //   return titleArray;
    // });
  }, [props.posts.data]);

  const unSelectAllHandler = useCallback(() => {
    setSelectedPredictionArray((prev) => {
      const indexArray = [...prev];
      props.posts.data.forEach((item) => {
        if (indexArray.includes(item.id)) {
          let indexToRemove = indexArray.indexOf(item.id);
          indexArray.splice(indexToRemove, 1);
        }
      });
      return indexArray;
    });
    setSelectedOverlappedCheckIndexArray((prev) => {
      const indexArray = [...prev];
      props.posts.data.forEach((item) => {
        if (indexArray.includes(item.id)) {
          let indexToRemove = indexArray.indexOf(item.id);
          indexArray.splice(indexToRemove, 1);
        }
      });
      return indexArray;
    });
    setSelectedIndexArray((prev) => {
      const indexArray = [...prev];
      props.posts.data.forEach((item) => {
        if (indexArray.includes(item.id)) {
          let indexToRemove = indexArray.indexOf(item.id);
          indexArray.splice(indexToRemove, 1);
        }
      });

      return indexArray;
    });
    // setSelectedTitleArray((prev) => {
    //   const titleArray = [...prev];
    //   idsArray.forEach((id, index) => {
    //     if (selectedIndexArray.includes(id)) {
    //       if (titleArray.includes(titlesArray[index])) {
    //         let titleToRemove = titleArray.indexOf(titlesArray[index]);
    //         titleArray.splice(titleToRemove, 1);
    //       }
    //     }
    //   });
    //   return titleArray;
    // });
  }, [props.posts]);

  const predictionBtnHandler = () => {
    if (!token) {
      navigate("/login");
    } else {
      try {
        axios
          .post(
            backendURL + "prediction-posts",
            {
              start_date: startDate,
              end_date: endDate,
              ids: selectedIndexArray,
            },
            config
          )
          .then(() => {
            swal({
              title: "Success Alert",
              text: "Prediction post/s making success",
              icon: "success",
              // buttons: true,
              // dangerMode: true,
              timer: 2000,
            });

            props.handleReload(true);
          })
          .catch((error) => {
            swal({
              title: "Prediction post/s making error",
              text: error.message,
              icon: "warning",
              buttons: true,
              dangerMode: true,
            });
          });
      } catch (error) {
        swal({
          title: "Error Alert",
          text: "Failed to make Prediction post/s ",
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
      }
    }
  };

  const postsDeleteBtnHandler = () => {
    if (selectedOverlappedCheckIndexArray.length === 0) {
      if (!token) {
        navigate("/login");
      } else {
        swal({
          title: "Warning",
          text: " Selected post/s will be deleted",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((ok) => {
          if (ok) {
            try {
              axios
                .post(
                  backendURL + "delete-selected-posts",
                  {
                    ids: selectedIndexArray,
                  },
                  config
                )
                .then(() => {
                  swal({
                    title: "Success Alert",
                    text: "Selected post/s deleted successfully",
                    icon: "success",
                    // buttons: true,
                    // dangerMode: true,
                    timer: 2000,
                  });

                  props.handleReload(true);
                })
                .catch((error) => {
                  swal({
                    title: "Selected post/s deleting error",
                    text: error.message,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  });
                });
            } catch (error) {
              swal({
                title: "Error Alert",
                text: "Failed to delete Selected post/s ",
                icon: "error",
                buttons: true,
                dangerMode: true,
              });
            }
          } else {
            swal({ text: "Your record/s is/are safe!", timer: 1500 });
          }
        });
      }
    } else {
      swal({
        title: "Error Alert",
        text: "Failed to delete Prediction post/s because selected post/s is/are included in mock test or predictions make sure you uncheck those post/s",
        icon: "error",
        buttons: true,
        dangerMode: true,
      });
    }
  };
  const removePredictionBtnHandler = () => {
    if (!token) {
      navigate("/login");
    } else {
      swal({
        title: "Warning",
        text: " Selected prediction/s will be removed",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((ok) => {
        if (ok) {
          try {
            axios
              .post(
                backendURL + "remove-selected-predictions",
                {
                  ids: selectedPredictionArray,
                },
                config
              )
              .then(() => {
                swal({
                  title: "Success Alert",
                  text: "Selected prediction/s removed successfully",
                  icon: "success",
                  // buttons: true,
                  // dangerMode: true,
                  timer: 2000,
                });
                setSelectedPredictionArray([]);
                props.handleReload(true);
              })
              .catch((error) => {
                swal({
                  title: "Selected prediction/s removing error",
                  text: error.message,
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                });
              });
          } catch (error) {
            swal({
              title: "Error Alert",
              text: "Failed to remove Selected prediction/s ",
              icon: "error",
              buttons: true,
              dangerMode: true,
            });
          }
        } else {
          swal({ text: "Your record/s is/are safe!", timer: 1500 });
        }
      });
    }
  };

  if (props.status === "loading") {
    post_html_table = <TableListLoadingComponent />;
  }
  if (props.status === "failed") {
    post_html_table = <TableListFailedComponent />;
  } else {
    if (props.status === "succeeded" && props.posts.data !== undefined) {
      post_html_table =
        props.posts.data?.length !== 0 ? (
          props.posts.data.map((item, index) => {
            return (
              <TableRow
                id={item.id}
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: "20%",
                  overflow: "scroll",
                }}
                height={"60px"}
              >
                <TableCell sx={{ ...style.ellipsisStyle }}>
                  {" "}
                  <Checkbox
                    checked={selectedIndexArray.includes(item.id)}
                    inputProps={{ "aria-label": "controlled" }}
                    onClick={() =>
                      selectHandler(
                        item.id,
                        item?.check_mt,
                        item?.start_date !== null ? true : false
                      )
                    }
                    disabled={!item.isActive}
                  />
                </TableCell>
                <TableCell sx={{ ...style.ellipsisStyle }}>
                  <Checkbox
                    checked={item?.start_date !== null ? true : false}
                    inputProps={{ "aria-label": "controlled" }}
                    disabled={true}
                  />
                </TableCell>
                <TableCell sx={{ ...style.ellipsisStyle }}>
                  {item.created_user?.name}{" "}
                  {item.updated_id !== "NULL" &&
                    item.updated_user &&
                    `(${item.updated_user.name})`}
                </TableCell>
                <TableCell sx={{ ...style.ellipsisStyle }}>
                  {item.post_number}
                </TableCell>

                <TableCell sx={{ ...style.ellipsisStyle }}>
                  {item.title}
                </TableCell>
                <TableCell sx={{ ...style.ellipsisStyle }}>
                  {item.content}
                </TableCell>
                {props.audio === "audio" && (
                  <TableCell sx={{ ...style.ellipsisStyle, minWidth: "10rem" }}>
                    <audio
                      className="audio"
                      src={
                        item.media_type === "1"
                          ? item.media
                          : `${process.env.REACT_APP_BACKEND_URL}storage/${item.category}/${item.media}`
                      }
                      onPlay={() => {
                        mediaPlayer(item.id);
                      }}
                      style={{
                        ...style.audioStyle,
                      }}
                      controls
                    ></audio>
                  </TableCell>
                )}
                {props.image === "image" && (
                  <TableCell sx={{ ...style.ellipsisStyle }}>
                    <img
                      src={
                        item.media_type === "1"
                          ? item.media
                          : `${process.env.REACT_APP_BACKEND_URL}storage/${props.storage}/${item.media}`
                      }
                      alt="diImg"
                      style={{
                        ...style.imageStyle,
                      }}
                    />
                  </TableCell>
                )}

                {props.category === "mc,smc,hcs,smw" && (
                  <TableCell sx={{ ...style.ellipsisStyle }}>
                    {item.category === "mc"
                      ? "Multiple Answers"
                      : item.category === "smc"
                      ? "Single Answer"
                      : item.category === "hcs"
                      ? "Highlight correct summary"
                      : item.category === "smw"
                      ? "Select Missing Word"
                      : ""}{" "}
                  </TableCell>
                )}
                {props.category === "rmc,rsmc" && (
                  <TableCell sx={{ ...style.ellipsisStyle }}>
                    {item.category === "rmc"
                      ? "Multiple Answers"
                      : item.category === "rsmc"
                      ? "Single Answer"
                      : ""}{" "}
                  </TableCell>
                )}
                {props.category === "rfib,rwfib" && (
                  <TableCell sx={{ ...style.ellipsisStyle }}>
                    {item.category === "rfib"
                      ? "Fill in the Blank"
                      : item.category === "rwfib"
                      ? "R&W Fill in the Blank"
                      : ""}{" "}
                  </TableCell>
                )}

                {props.category === "swt,we,wemail" && (
                  <TableCell sx={{ ...style.ellipsisStyle }}>
                    {item.category === "swt"
                      ? "Summary Written Text"
                      : item.category === "we"
                      ? "Write Essay"
                      : "Write Email"}{" "}
                  </TableCell>
                )}

                {props.category === "sst,wfd" && (
                  <TableCell sx={{ ...style.ellipsisStyle }}>
                    {item.category === "sst"
                      ? "Summarize Spoken Text"
                      : item.category === "wfd"
                      ? "Write From Diction"
                      : ""}{" "}
                  </TableCell>
                )}

                <TableCell sx={{ ...style.ellipsisStyle }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    {statusId === item.isActive ? (
                      "Changing"
                    ) : (
                      <>
                        {" "}
                        <Typography>Inactive</Typography>
                        <AntSwitch
                          checked={item.isActive === 0 ? false : true}
                          onClick={() => statusHandler(item.isActive, item.id)}
                          inputProps={{ "aria-label": "ant design" }}
                        />
                        <Typography>Active</Typography>
                      </>
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ ...style.ellipsisStyle, minWidth: "5rem" }}>
                  {item.start_date !== null ? item.start_date : "-"}
                </TableCell>
                <TableCell sx={{ ...style.ellipsisStyle, minWidth: "5rem" }}>
                  {item.end_date !== null ? item.end_date : "-"}
                </TableCell>
                <TableCell sx={{ ...style.ellipsisStyle, minWidth: "10rem" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={item?.check_mt}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </Box>
                </TableCell>
                <ActionCellForList
                  url={`${backendURL}${props.path}`}
                  item={item}
                  deleteDisabled={item?.check_mt}
                  deleteMessage={
                    "You are going to delete the post with title" +
                    item?.title +
                    ".This will delete all the content of this post"
                  }
                />
              </TableRow>
            );
          })
        ) : (
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              height: "20%",
              overflow: "scroll",
            }}
            height={"60px"}
          >
            <TableCell sx={{ ...style.ellipsisStyle }}>
              <Typography color={"red"} variant="h5">
                No Post Yet...
              </Typography>
            </TableCell>
          </TableRow>
        );
    }
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <PageNavTitle text={props.title} />

        <TableForm
          tableSection="admin"
          pagingHtml={paging_html}
          mc={props.mc}
          audio={props.audio}
          image={props.image}
          postHtmlTable={post_html_table}
          setPage={props.setPage}
          setSearchValue={props.setSearchValue}
          category={props.category}
        ></TableForm>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            my: 2,
          }}
        >
          <Pagination
            size="large"
            count={props.posts.last_page}
            color="primary"
            page={props.page}
            disabled={props.status === "loading" ? true : false}
            onChange={props.handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",

            my: 2,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              minDate={currentDate}
              sx={{ mr: 2 }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              minDate={currentDate}
            />

            <Box sx={(style.predictionBtn, { display: "flex", gap: 2, ml: 2 })}>
              <Button
                variant="contained"
                onClick={() => selectAllHandler()}
                style={style.button}
                disabled={props.status == "succeeded" ? false : true}
              >
                Select all
              </Button>
              <Button
                variant="contained"
                onClick={() => unSelectAllHandler()}
                style={style.button}
                disabled={selectedIndexArray.length === 0 ? true : false}
              >
                Unselect all
              </Button>
              <Button
                variant="contained"
                onClick={() => predictionBtnHandler()}
                style={style.button}
                disabled={selectedIndexArray.length === 0 ? true : false}
              >
                Add to prediction
              </Button>
              <Button
                variant="contained"
                onClick={() => removePredictionBtnHandler()}
                style={style.button}
                disabled={selectedPredictionArray.length === 0 ? true : false}
              >
                Remove from prediction
              </Button>
              {/* <Button
                variant="contained"
                onClick={() => predictionBtnHandler()}
                style={style.button}
                disabled={selectedIndexArray.length === 0 ? true : false}
              >
                Remove from prediction
              </Button> */}
              <Button
                variant="contained"
                onClick={() => postsDeleteBtnHandler()}
                style={style.button}
                disabled={selectedIndexArray.length === 0 ? true : false}
              >
                Delete Selected Posts
              </Button>
            </Box>
          </LocalizationProvider>
        </Box>
      </Box>
    </>
  );
}

const style = {
  predictionBtn: {
    display: "flex",
    alignItems: "center",
    mx: "2rem",
  },
  audioStyle: {
    width: "100%",
    minWidth: "10rem",
    marginTop: "1rem",
    height: "2rem",
  },
  imageStyle: {
    width: "100%",
    minHeight: "5rem",
    minWidth: "5rem",
    marginTop: "1rem",
    height: "2rem",
  },
  button: {},
  ellipsisStyle: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "250px",
    maxWidth: "250px",
  },
};

export default ReusableList;
