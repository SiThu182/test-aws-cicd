import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import MockTestTabs from "../../../../components/Backend/Admin/Posts/MockTest";
import { fetchMockTestTypeAsync } from "../../../../redux/thunk/MockTestType";

function Add() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { types, status } = useSelector((state) => state.mtType);
  let [chooseState, setChooseState] = useState(true);
  let [typeArray, setTypeArray] = useState();

  let [chooseType, setChooseType] = useState("");
  let [assign, setAssign] = useState();
  const handleChange = (event) => {
    setChooseType(event.target.value);
  };

  const clickHandler = () => {
    setChooseState(false);
  };

  const path = "mock-test-type";
  useEffect(() => {
    if (status === "" || status === "failed") {
      dispatch(fetchMockTestTypeAsync(path));
    }

    setAssign(true);
  }, [path, dispatch, status]);
  useEffect(() => {
    if (assign && status === "succeeded" && types.data !== undefined) {
      setTypeArray(types.data.data);
    }
  }, [assign, status, types]);

  return (
    <>
      <Box
        className="container-fluid"
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          mt: 1,
        }}
      >
        <div className="card">
          <Link
            onClick={() => {
              navigate(-1);
            }}
            style={{
              textDecoration: "none",
              color: "#000",
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "#2196f3",

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

      <Dialog open={chooseState} sx={{ backdropFilter: "blur(10px)" }}>
        <DialogContent>
          <Typography variant="h5">Choose Mock Test Type</Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chooseType}
            sx={{ width: "100%" }}
            label="Age"
            onChange={handleChange}
          >
            {typeArray !== "" &&
              typeArray !== undefined &&
              typeArray.map((t, index) => (
                <MenuItem value={t.id} key={index}>
                  {t.name}
                </MenuItem>
              ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={chooseType === "" ? true : false}
            onClick={clickHandler}
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>
      {!chooseState && <MockTestTabs chooseType={chooseType}></MockTestTabs>}
    </>
  );
}

export default Add;
