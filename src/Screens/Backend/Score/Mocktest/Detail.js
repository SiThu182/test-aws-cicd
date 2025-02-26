import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import AutoStoriesIcon from "@mui/icons-material/AutoStories";
// import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
// import GraphicEqIcon from "@mui/icons-material/GraphicEq";
// import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import CancelIcon from "@mui/icons-material/Cancel";
import MtDetailTable from "../../../../components/Backend/MockTest/mtDetailTable";
import { fetcheditPostsAsync } from "../../../../redux/thunk/Posts";
import ScoreCardComponent from "../../../../components/Backend/MockTest/ScoreCardComponent";
import ScoreCardDownloadComponent from "../../../../components/Backend/MockTest/ScoreCardDownloadComponent";
import { getCookie } from "../../../../Utils/GetCookies";

const Detail = () => {
  const { editPost, editStatus } = useSelector((state) => state.posts);

  const [speaking, setSpeaking] = useState();
  const [reading, setReading] = useState([]);
  const [writing, setWriting] = useState([]);
  const [listening, setListening] = useState([]);
  const [user, setUser] = useState("");

  const [checkScore, setCheckScore] = useState(false);
  const [assign, setAssign] = useState(false);

  const [downloading, setDownloading] = useState();
  const [scoreCardOpen, setScoreCardOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let pagePath = "mt-score";
  const postId = useParams();

  useEffect(() => {
    dispatch(fetcheditPostsAsync({ path: pagePath, id: postId.id }));
    setCheckScore(true);
    setAssign(true);
  }, [dispatch, pagePath, postId]);

  useEffect(() => {
    if (editStatus === "succeeded" && checkScore && assign) {
      setAssign(false);
      let res_speaking = editPost.mt_score_details.filter(
        (score) => score.language_type_id === 1
      );
      setSpeaking(res_speaking);

      let res_reading = editPost.mt_score_details.filter(
        (score) => score.language_type_id === 2
      );
      setReading(res_reading);

      let res_writing = editPost.mt_score_details.filter(
        (score) => score.language_type_id === 4
      );
      setWriting(res_writing);

      let res_listening = editPost.mt_score_details.filter(
        (score) => score.language_type_id === 3
      );
      setListening(res_listening);
    }
  }, [editStatus, checkScore, editPost, assign]);

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: "start",
  //   // color: theme.palette.text.secondary,
  // }));

  const backendURL =
    process.env.REACT_APP_BACKEND_ADMIN + "approve-reject-mtscore";

  let status_change = async (status) => {
    let token = await getCookie("userToken");
    if (!token) navigate("/login");
    else {
      let config = { headers: { Authorization: "Bearer " + token } };

      const res = await axios.post(
        `${backendURL}`,
        {
          status: status,
          mt_score_id: postId.id,
        },
        config
      );
      if (res.status === 200) {
        //
        swal({
          title: "Success",
          text: res.message,
          icon: "success",
          button: "OK!",
          timer: 1500,
        });
      }
    }
  };

  function confirmStatusChange(id) {
    swal({
      title: "Are you sure?",
      text: "Once updated, you will not be able to recover this record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        status_change(id);
      } else {
        swal({ text: "Your record is safe!", timer: 1500 });
      }
    });
  }

  useEffect(() => {
    if (editPost.user !== undefined) {
      let fetchMtUser = async () => {
        let token = getCookie("userToken");
        let config = { headers: { Authorization: "Bearer " + token } };
        let userDetail = await axios
          .get(
            process.env.REACT_APP_BACKEND_ADMIN + "users/" + editPost.user.id,
            config
          )
          .catch((error) => alert(error));
        setUser(userDetail.data);
      };
      fetchMtUser();
    }
  }, [editPost.user]);

  const clickHandler = () => {
    setScoreCardOpen(true);
  };
  const handleClose = () => {
    setScoreCardOpen(false);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            ml: "2rem",
            top: "1rem",

            position: "absolute",
            overflow: "visible",
            zIndex: 1500,
          }}
        >
          <Typography variant="h5">Score Mock Test</Typography>
        </Box>

        {(editStatus === "loading" || editStatus === "failed") && (
          <Box>
            <Typography variant="h5">{editStatus}</Typography>
          </Box>
        )}
        {editStatus === "succeeded" && checkScore && (
          <>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                md={12}
                sx={{
                  p: 2,
                  bgcolor: "background.default",
                  gridTemplateColumns: { md: "1fr 1fr" },
                  mt: 3,
                  mx: 2,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="subtitle1">
                      Test User : {editPost.user.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      Mock Test : {editPost.mock_test.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      Overall Point : {editPost.overall_point}
                    </Typography>
                    <Typography variant="subtitle1">
                      Overall Point :{" "}
                      {editPost.status == 0
                        ? "initial status"
                        : editPost.status == 1
                        ? "approved"
                        : editPost.status == 2
                        ? "rejected"
                        : ""}
                    </Typography>
                  </Box>

                  <Box className="container-fluid">
                    <div className="card">
                      <Link
                        onClick={() => {
                          navigate(-1);
                        }}
                        style={{
                          textDecoration: "none",

                          display: "flex",
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#2196f3",
                            color: "#000",
                            "&:hover": {
                              bgcolor: "white",
                            },
                            mb: 2,
                          }}
                        >
                          <ArrowBackIcon></ArrowBackIcon> Back
                        </Button>
                      </Link>
                    </div>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {editPost.status !== 1 && (
                    <>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#00FF00",
                          color: "#000",
                          "&:hover": {
                            bgcolor: "white",
                          },
                          mx: 2,
                          mt: 6,
                        }}
                        onClick={() => confirmStatusChange(1)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#FFA500",
                          color: "#000",
                          "&:hover": {
                            bgcolor: "white",
                          },
                          mx: 2,
                          mt: 6,
                        }}
                        onClick={() => confirmStatusChange(2)}
                      >
                        Reject
                      </Button>
                    </>
                  )}

                  <Button
                    variant="contained"
                    onClick={() => clickHandler()}
                    sx={{
                      bgcolor: "#2196f3",
                      color: "#000",
                      "&:hover": {
                        bgcolor: "white",
                      },
                      ml: 2,
                      mt: 6,
                    }}
                  >
                    Generate Score Card
                  </Button>
                </Box>
              </Grid>
            </Grid>
            {(editPost.mock_test.mt_type_id === 1 ||
              editPost.mock_test.mt_type_id === 2 ||
              editPost.mock_test.mt_type_id === 3) &&
              speaking !== "" &&
              speaking !== undefined && (
                <>
                  <Box
                    sx={{
                      width: "80%",
                      borderRadius: "1rem",
                      backgroundColor: "whitesmoke",
                      my: 2,
                      pb: 2,
                      mx: "auto",
                      boxShadow: 5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        backgroundColor: "red",
                        borderTopRightRadius: "1rem",
                        borderTopLeftRadius: "1rem",
                        py: 1,
                      }}
                    >
                      <Typography variant="h5" sx={{ ml: 2 }}>
                        Speaking Table
                      </Typography>
                      {/* <KeyboardVoiceIcon
                        sx={{ fontSize: "3rem" }}
                      ></KeyboardVoiceIcon> */}
                    </Box>
                    <MtDetailTable
                      title="Speaking"
                      score={speaking}
                    ></MtDetailTable>
                  </Box>
                </>
              )}
            {(editPost.mock_test.mt_type_id === 1 ||
              editPost.mock_test.mt_type_id === 2 ||
              editPost.mock_test.mt_type_id === 6) &&
              writing !== "" &&
              writing !== undefined && (
                <>
                  <Box
                    sx={{
                      width: "80%",
                      borderRadius: "1rem",
                      backgroundColor: "whitesmoke",
                      my: 2,
                      pb: 2,
                      mx: "auto",
                      boxShadow: 5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "yellow",
                        borderTopRightRadius: "1rem",
                        borderTopLeftRadius: "1rem",
                      }}
                    >
                      <Typography variant="h5" sx={{ ml: 2 }}>
                        Writing Table
                      </Typography>
                      {/* <DriveFileRenameOutlineIcon
                        sx={{ fontSize: "3rem" }}
                      ></DriveFileRenameOutlineIcon> */}
                    </Box>

                    <MtDetailTable
                      title="Writing"
                      score={writing}
                    ></MtDetailTable>
                  </Box>
                </>
              )}
            {(editPost.mock_test.mt_type_id === 1 ||
              editPost.mock_test.mt_type_id === 2 ||
              editPost.mock_test.mt_type_id === 4) &&
              reading !== "" &&
              reading !== undefined && (
                <>
                  <Box
                    sx={{
                      width: "80%",
                      borderRadius: "1rem",
                      backgroundColor: "whitesmoke",
                      my: 2,
                      pb: 2,
                      mx: "auto",
                      boxShadow: 5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "yellowgreen",
                        borderTopRightRadius: "1rem",
                        borderTopLeftRadius: "1rem",
                      }}
                    >
                      <Typography variant="h5" sx={{ ml: 2 }}>
                        Reading Table
                      </Typography>
                      {/* <AutoStoriesIcon
                        sx={{ fontSize: "3rem" }}
                      ></AutoStoriesIcon> */}
                    </Box>
                    <MtDetailTable
                      title="Reading"
                      score={reading}
                    ></MtDetailTable>
                  </Box>
                </>
              )}
            {(editPost.mock_test.mt_type_id === 1 ||
              editPost.mock_test.mt_type_id === 2 ||
              editPost.mock_test.mt_type_id === 5) &&
              listening !== "" &&
              listening !== undefined && (
                <>
                  <Box
                    sx={{
                      width: "80%",
                      borderRadius: "1rem",
                      backgroundColor: "whitesmoke",
                      my: 2,
                      pb: 2,
                      mx: "auto",
                      boxShadow: 5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "cyan",
                        borderTopRightRadius: "1rem",
                        borderTopLeftRadius: "1rem",
                      }}
                    >
                      <Typography variant="h5" sx={{ ml: 2 }}>
                        Listening Table
                      </Typography>
                      {/* <GraphicEqIcon sx={{ fontSize: "3rem" }}></GraphicEqIcon> */}
                    </Box>
                    <MtDetailTable
                      title="Listening"
                      score={listening}
                    ></MtDetailTable>
                  </Box>
                </>
              )}

            <Dialog
              fullWidth={true}
              sx={{ zIndex: "3000", backdropFilter: "blur(5px)" }}
              maxWidth={"md"}
              open={scoreCardOpen}
              onClose={handleClose}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <DialogTitle>Score Card</DialogTitle>

                <DialogActions>
                  <ButtonBase onClick={handleClose}>
                    <CancelIcon></CancelIcon>
                  </ButtonBase>
                </DialogActions>
              </Box>
              <ScoreCardDownloadComponent
                pointArray={[
                  editPost.speaking,
                  editPost.reading,
                  editPost.writing,
                  editPost.listening,
                ]}
                post={editPost}
                user={user}
                overallPoint={editPost.overall_point}
                mockTestId={editPost.mock_test_id}
                date={new Date(editPost.updated_at).toDateString()}
                downloading={downloading}
                setDownloading={setDownloading}
                id="scoreCardPrintAdmin"
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  sx={{
                    transform: {
                      xs: "scale(0.45)",
                      sm: "scale(0.5)",
                    },
                    my: "-20rem",
                    minWidth: "34rem",
                  }}
                >
                  <ScoreCardComponent
                    pointArray={[
                      editPost.speaking,
                      editPost.reading,
                      editPost.writing,
                      editPost.listening,
                    ]}
                    user={user}
                    post={editPost}
                    overallPoint={editPost.overall_point}
                    mockTestId={editPost.mock_test_id}
                    date={new Date(editPost.updated_at).toDateString()}
                  />

                  <Box sx={{ my: 3 }}>
                    <Button
                      variant="contained"
                      onClick={() => setDownloading(true)}
                    >
                      Download
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Dialog>
          </>
        )}
        {/* score card dialog box */}
      </Box>
    </>
  );
};

export default Detail;
