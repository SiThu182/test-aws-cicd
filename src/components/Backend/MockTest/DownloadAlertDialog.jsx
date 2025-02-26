import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { AdminCheckContext } from "../../../Screens/Backend/CourseTest/MockTest/MockTest";
export default function DownloadAlertDialog() {
  const [open, setOpen] = React.useState(true);
  const checkByAdmin = React.useContext(AdminCheckContext);
  const navigate = useNavigate();

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleExit = () => {
    checkByAdmin ? navigate("/admin/mocktestlist") : navigate("/mocktest/tabs");
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Downloading resources failed"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please check your internet connection and prees ok to retry or you
            can exit the test
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleExit}
            variant="contained"
            sx={{
              backgroundColor: "#b2102f",
              color: "white",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            Exit
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              backgroundColor: "#2196f3",
              color: "white",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
