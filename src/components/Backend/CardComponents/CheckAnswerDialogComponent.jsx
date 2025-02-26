import {
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckConditions from "../../../Screens/Backend/CourseTest/MockTest/CheckConditions";
function CheckAnswerDialogComponent(props) {
  const { title, handleClose, checkOpen, mockId, mockTestType, scoreId } =
    props;

  return (
    <>
      <Dialog
        fullWidth={true}
        sx={{
          zIndex: "3000",
          backdropFilter: "blur(5px)",
        }}
        maxWidth={"md"}
        open={checkOpen}
        // onClose={handleClose}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle>{title} Mock Test Score Detail</DialogTitle>

          <DialogActions>
            <ButtonBase onClick={handleClose}>
              <CancelIcon></CancelIcon>
            </ButtonBase>
          </DialogActions>
        </Box>
        <DialogContent>
          <Box sx={{ width: "100%", height: "80vh" }}>
            <CheckConditions
              checkAnswerState={true}
              mockId={mockId}
              scoreId={scoreId}
              mockTestType={mockTestType}
              handleClose={handleClose}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CheckAnswerDialogComponent;
