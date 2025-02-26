import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
// import PaginationComponent from "../PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchSaveNoteListAsync } from "../../../redux/thunk/Note";
import axios from "axios";
import swal from "sweetalert";
import { styled } from "@mui/system";
import NoteStyledTextarea from "./NoteTextArea";
import { getCookie } from "../../../Utils/GetCookies";

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  &:hover {
    border-color: none};
  }

  &:focus {
    border-color: none};
    box-shadow: 0 0 0 0px;
  }

  // // firefox
  // &:focus-visible {
  //   outline: 0;
  // }
`
);

function NoteCard(props) {
  const { postId } = props;
  const userId = localStorage.getItem("userId");
  let token = getCookie("userToken");
  const config = { headers: { Authorization: "Bearer " + token } };
  const dispatch = useDispatch();
  const [isSaveNoteOpen, setIsSaveNoteOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { status, saveNoteList } = useSelector((state) => state.saveNote);
  // const [page, setPage] = useState(1);

  // let handleChange = (event, p) => {
  //   setPage(p);
  // };

  const fetchNoteListApiCallback = useCallback(() => {
    if (postId !== undefined) {
      dispatch(fetchSaveNoteListAsync({ post_id: postId }));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (postId !== undefined) {
      fetchNoteListApiCallback();
    }
  }, [fetchNoteListApiCallback, postId]);

  // const boxContainerStyle = {
  //   borderRadius: "2rem",
  //   backgroundColor: "white",
  //   boxShadow: 4,
  //   width: "100%",
  //   height: "80vh",
  // };
  // const titleStyle = {
  //   fontStyle: "italic",
  //   ml: 2,
  // };
  // const textAreaStyle = {
  //   fontSize: "1.2rem",
  //   width: "100%",
  //   resize: "vertical",
  //   backgroundColor: "primary",
  //   border: "none",
  //   "&:focus": {
  //     borderBottom: "none !important", // Hide the border on focus
  //     borderColor: "white !important",
  //     boxShadow: "none !important",
  //   },
  // };

  const deleteClickHandler = (saveId) => {
    try {
      axios
        .delete(
          process.env.REACT_APP_BACKEND_ADMIN + "save-post-note/" + saveId,
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
            fetchNoteListApiCallback();
          })
        );
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

  const saveClickHandler = () => {
    setIsSaving(true);
    let saveNote = value;
    let data = {
      post_id: postId,
      user_id: userId,
      save_note: saveNote,
      bookmark: saveNoteList?.data?.data?.[0]?.bookmark,
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
              fetchNoteListApiCallback();
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
              fetchNoteListApiCallback();
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

  //initial assign value for note card
  useEffect(() => {
    if (
      status === "succeeded" &&
      saveNoteList?.data?.data?.[0]?.post_id == postId
    ) {
      setValue(saveNoteList?.data?.data?.[0]?.save_note);
    } else {
      setValue("");
    }
  }, [postId, status, saveNoteList]);

  return (
    <>
      <Card sx={{ maxWidth: 345, borderRadius: "1rem" }}>
        <CardHeader title="Note" />
        <CardContent sx={{ p: 0 }}>
          {/* <Typography variant="h6" sx={titleStyle}>
            {!isSaveNoteOpen ? "Take note here " : "Save Note Lists"}
          </Typography> */}

          {isSaveNoteOpen ? (
            <>
              {status === "loading" && (
                <Box
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    height: "100%",
                    py: "20vh",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              {status === "failed" && (
                <Box>
                  <Typography>Failed to fetch data</Typography>
                </Box>
              )}
              {status === "succeeded" && (
                <Box sx={{ height: "50vh" }}>
                  <List dense={true}>
                    {saveNoteList?.data?.data.map((s, index) => (
                      <ListItem
                        key={index}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => deleteClickHandler(s.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          sx={{
                            maxHeight: "15rem",
                            p: 1,
                            overflowY: "scroll",
                          }}
                          primary="Save Note"
                          secondary={s.save_note}
                        />
                      </ListItem>
                    ))}
                  </List>
                  {/* <PaginationComponent
                size="large"
                count={saveNoteList?.data?.last_page}
                color="primary"
                page={page}
                onChange={handleChange}
              /> */}
                </Box>
              )}
            </>
          ) : status === "succeeded" ? (
            <Box>
              <NoteStyledTextarea value={value} setValue={setValue} />
            </Box>
          ) : (
            status === "loading" && (
              <Box
                sx={{
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  py: "20vh",
                }}
              >
                <CircularProgress />
              </Box>
            )
          )}
        </CardContent>
        <CardActions>
          {postId !== undefined && (
            <Box
              sx={{
                m: 1,
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                p: 1,
              }}
            >
              <Button
                variant="contained"
                disabled={value === "" || isSaving ? true : false}
                onClick={() => saveClickHandler()}
              >
                {isSaving ? <CircularProgress /> : "Save"}
              </Button>
              {/* <Button
                variant="contained"
                onClick={() => {
                  setIsSaveNoteOpen((prev) => !prev);
                }}
              >
                {isSaveNoteOpen ? "Back" : "Save Notes"}
              </Button> */}
            </Box>
          )}
        </CardActions>
      </Card>
    </>
  );
}

export default NoteCard;
