import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { PageCard } from "../../../Screens/Backend/PageStyle";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import CheckAnswerDialogComponent from "../CardComponents/CheckAnswerDialogComponent";
import MtDetail from "./MtDetailPage";
import {
  fetchMockTestDetailAsync,
  fetchMockTestListAsync,
} from "../../../redux/thunk/Dashboard";
import { useDispatch, useSelector } from "react-redux";
function MtScoreTableDashboard(props) {
  const { userId } = props;
  const [saveMtScoreArray, setSaveMtScoreArray] = useState([]);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const [startScore, setStartScore] = useState(true);
  const [totalPage, setTotalPage] = useState("");
  const [mtId, setMtId] = useState("");
  const [detailAssign, setDetailAssign] = useState(false);
  const [detailPost, setDetailPost] = useState("");
  // const [mtId, setMtId] = useState("");
  const [mtOpen, setMtOpen] = useState(false);
  //check
  const [checkOpen, setCheckOpen] = useState(false);
  const [mtTypeId, setMtTypeId] = useState("");
  const [scoreId, setScoreId] = useState("");
  const [checkAssign, setCheckAssign] = useState("");

  //Mock Test
  const mockTestPath = `mt-score-user/${userId}?page=${page}`;
  const mtDetailPath = `mt-score-user-detail/${userId}/${mtId}`;

  let {
    mockTestPosts,
    mockTestListStatus,
    mockTestDetailStatus,
    mockTestTotalPage,
    // userPlanDetail,
    // userPlanDetailStatus,
    mtDetailPost,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchMockTestListAsync(`mt-score-user/${userId}?page=1`));
  }, [dispatch, userId]);

  //FOR SCORE
  useEffect(() => {
    if (mockTestListStatus === "succeeded" && startScore) {
      setTotalPage(mockTestTotalPage);

      let arrFromDataLength;
      if (saveMtScoreArray.length !== mockTestTotalPage) {
        arrFromDataLength = new Array(mockTestTotalPage).fill("");
      } else {
        arrFromDataLength = saveMtScoreArray;
      }
      arrFromDataLength[page - 1] = mockTestPosts;
      setSaveMtScoreArray(arrFromDataLength);
      //  setStartAssign(false);

      setStartScore(false);
    }
  }, [
    mockTestListStatus,
    mockTestTotalPage,
    startScore,
    mockTestPosts,
    page,
    saveMtScoreArray,
  ]);

  const handleChange = (event, p) => {
    setPage(p);
    if (saveMtScoreArray[p - 1] === "") {
      dispatch(fetchMockTestListAsync(`mt-score-user/${userId}?page=${p}`));
      setStartScore(true);
    }
  };

  useEffect(() => {
    if (mockTestDetailStatus === "succeeded") {
      setDetailPost(mtDetailPost);
    }
  }, [mockTestDetailStatus, mtDetailPost]);

  let clickInfo = (id) => {
    setMtId(id);
    mtClickHandler();
    setDetailAssign(true);
  };

  const mtClickHandler = () => {
    setMtOpen(true);
  };

  useEffect(() => {
    if (detailAssign) {
      dispatch(fetchMockTestDetailAsync(mtDetailPath));
      setDetailAssign(false);
    }
  }, [detailAssign, dispatch, mtDetailPath]);

  const clickCheck = (score, mtId, mtTypeId) => {
    setMtId(mtId);
    setMtTypeId(mtTypeId);
    setScoreId(score);
    setCheckAssign(true);
  };

  //check modal box useEffect
  useEffect(() => {
    if (checkAssign) {
      setCheckOpen(true);
      setCheckAssign(false);
    }
  }, [checkAssign]);

  const handleClose = () => {
    setCheckOpen(false);
  };

  const TableHeaderArray = [
    [1, "No."],
    [2, "Mock Test"],
    [3, "Speaking"],
    [4, "Reading"],
    [5, "Writing"],
    [6, "Listening"],
    [7, "Overall Point"],
    [8, "Details"],
    [9, "Check"],
  ];

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          ...PageCard.mtTable,
        }}
      >
        <Table
          sx={{
            "& .MuiTableHead-root .MuiTableRow-head": {
              backgroundColor: "cyan",
            },
          }}
        >
          <TableHead
            sx={{
              "& .MuiTableRow-head": {
                backgroundColor: "cyan",
                border: 0,
                m: 0,
              },
            }}
          >
            <TableRow>
              {TableHeaderArray.map((h) => (
                <TableCell key={h[0]}>{h[1]}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {mockTestListStatus === "succeeded" &&
            saveMtScoreArray[page - 1] !== undefined &&
            saveMtScoreArray[page - 1] !== "" ? (
              saveMtScoreArray[page - 1].map((mt, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ width: "12.5%" }}>{index + 1}</TableCell>
                  <TableCell sx={{ width: "12.5%" }}>
                    {mt.mock_test.name}
                  </TableCell>
                  <TableCell sx={{ width: "12.5%" }}>
                    {mt.speaking === null ? 0 : mt.speaking}
                  </TableCell>
                  <TableCell sx={{ width: "12.5%" }}>
                    {mt.reading === null ? 0 : mt.reading}
                  </TableCell>
                  <TableCell sx={{ width: "12.5%" }}>
                    {mt.writing === null ? 0 : mt.writing}
                  </TableCell>
                  <TableCell sx={{ width: "12.5%" }}>
                    {mt.listening === null ? 0 : mt.listening}
                  </TableCell>
                  <TableCell sx={{ width: "12.5%" }}>
                    {mt.overall_point}
                  </TableCell>
                  <TableCell sx={{ width: "25%" }}>
                    {mt.status === 1 ? (
                      <Button
                        variant="contained"
                        disabled={detailAssign && mtId === mt.id ? true : false}
                        onClick={() => clickInfo(mt.id)}
                      >
                        {/* {detailAssign && mtId === mt.id ? (
                          <CircularProgress
                            sx={{ backgroundColor: "#ffff" }}
                          ></CircularProgress>
                        ) : (
                          <InfoIcon></InfoIcon>
                        )} */}
                        <InfoIcon></InfoIcon>
                      </Button>
                    ) : (
                      "Not Available"
                    )}
                  </TableCell>

                  <TableCell sx={{ width: "25%" }}>
                    {mt.status === 1 ? (
                      <Button
                        variant="contained"
                        sx={{ background: "yellow" }}
                        disabled={detailAssign && mtId === mt.id ? true : false}
                        onClick={() =>
                          clickCheck(mt.id, mt.mock_test_id, mt.mt_type_id)
                        }
                      >
                        <PlaylistAddCheckCircleIcon />
                      </Button>
                    ) : (
                      "Not Available"
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress></CircularProgress>
                </Box>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {detailPost !== "" && detailPost !== undefined && mtOpen && (
        <MtDetail
          open={mtOpen}
          setOpen={setMtOpen}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          my: 2,
        }}
      >
        {totalPage !== "" && totalPage !== undefined && (
          <Pagination
            size="large"
            count={parseInt(totalPage)}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        )}
      </Box>
    </>
  );
}

export default MtScoreTableDashboard;
