import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CancelIcon from "@mui/icons-material/Cancel";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";

import MtDetailTable from "./mtDetailTable";

function MtDetail(props) {
  const printRef = useRef();
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState();

  const pdfDownload = (id) => {
    setDownloading(true);
    const input = document.getElementById(id);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");


      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;

      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;

      pdf.addImage(
        imgData,
        "JPEG",
        marginX,
        marginY,
        canvasWidth,
        canvasHeight
      );

      pdf.save("download.pdf");
      setDownloading(false);
    });
  };

  // let [ra, setRa] = useState("");
  // let [rs, setRs] = useState("");
  // let [rl, setRl] = useState("");
  // let [di, setDi] = useState("");
  // let [asq, setAsq] = useState("");
  let [speaking, setSpeaking] = useState("");
  let [reading, setReading] = useState("");
  let [writing, setWriting] = useState("");
  let [listening, setListening] = useState("");
  // let [assignSection, setAssignSection] = useState(false);

  // //Writing
  // let [swt, setSwt] = useState("");
  // let [we, setWe] = useState("");
  // //Reading
  // let [rsmc, setRsmc] = useState("");
  // let [rmc, setRmc] = useState("");
  // let [rfib, setRfib] = useState("");
  // let [rwfib, setRwfib] = useState("");
  // let [rop, setRop] = useState("");

  // //Listening
  // let [smc, setSmc] = useState("");
  // let [mc, setMc] = useState("");
  // let [fib, setFib] = useState("");
  // let [hiw, setHiw] = useState("");
  // let [hcs, setHcs] = useState("");
  // let [smw, setSmw] = useState("");
  // let [sst, setSst] = useState("");
  // let [wfd, setWfd] = useState("");
 
  const handleClose = () => {
    props.setOpen(false);
  };

  useEffect(() => {
    if (props.post !== undefined && props.post.mt_score_details !== undefined) {
      // let findCategory = (cat) => {
      //   let foundCat = props.post.mt_score_details.find(
      //     (detail) => detail.category === cat
      //   );
      //   return foundCat;
      // };

      let sectionFilter = (type_id) => {
        let res = props.post.mt_score_details.filter(
          (score) => score.language_type_id === type_id
        );
        return res;
      };

      setSpeaking(sectionFilter(1));
      setReading(sectionFilter(2));
      setWriting(sectionFilter(4));
      setListening(sectionFilter(3));

      // setRa(findCategory("ra"));
      // setRs(findCategory("rs"));
      // setRl(findCategory("rl"));
      // setDi(findCategory("di"));
      // setAsq(findCategory("asq"));

      // //Writing
      // setSwt(findCategory("swt"));
      // setWe(findCategory("we"));
      // //Reading
      // setRsmc(findCategory("rsmc"));
      // setRmc(findCategory("rmc"));
      // setRwfib(findCategory("rwfib"));
      // setRfib(findCategory("rfib"));
      // setRop(findCategory("rop"));
      // //Listening
      // setSmc(findCategory("smc"));
      // setMc(findCategory("mc"));
      // setFib(findCategory("fib"));
      // setHcs(findCategory("hcs"));
      // setHiw(findCategory("hiw"));
      // setSmw(findCategory("smw"));
      // setSst(findCategory("sst"));
      // setWfd(findCategory("wfd"));
      // setAssignSection(true);
    }
  }, [props.post]);



  // let printHandler = useReactToPrint({
  //   content: () => printRef.current,
  // });

  return (
    <>
      <Dialog
        fullWidth={true}
        sx={{ zIndex: "3000", backdropFilter: "blur(5px)" }}
        maxWidth={"md"}
        open={props.open}
        onClose={handleClose}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle>{props.title} Mock Test Score Detail</DialogTitle>

          <DialogActions>
            <ButtonBase onClick={handleClose}>
              <CancelIcon></CancelIcon>
            </ButtonBase>
          </DialogActions>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mx: 3 }}>
          {/* <Button onClick={printHandler} variant="contained" sx={{}}>
            {" "}
            Print & Download
          </Button> */}
          {props.post.mt_type_id === 1 ||
          props.post.mt_type_id === 2 ||
          props.post.mt_type_id === 4 ? (
            <Button
              sx={{ mr: "1rem" }}
              variant="contained"
              onClick={() =>
                navigate(
                  "/admin/mt-score-card",
                  {
                    state: {
                      post: props.post,
                    },
                  },
                  "_blank"
                )
              }
            >
              Generate Score Card
            </Button>
          ) : (
            <></>
          )}

          <Button
            variant="contained"
            onClick={() => pdfDownload("pdfPrint")}
            disabled={downloading}
          >
            {downloading ? <CircularProgress></CircularProgress> : "Download"}
          </Button>
        </Box>

        <Box
          sx={{
            width: {
              xs: "100%",
              md: "90%",
            },
            my: "2rem",
            mx: "auto",
          }}
        >
          {props.post !== undefined && props.post !== "" ? (
            <>
              <Box ref={printRef} id="pdfPrint">
                <Card sx={{ width: "100%" }}>
                  <CardHeader
                  // sx={{}}
                  // title={props.post.mock_test.name}
                  ></CardHeader>
                  {props.post !== "" && props.post !== undefined && (
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: {
                            xs: "column",
                            md: "row",
                          },
                        }}
                      >
                        <Box sx={{ alignSelf: "flex-start" }}>
                          <Typography variant="h5" sx={{ mb: 2 }}>
                            {props.post.mock_test.name}
                          </Typography>
                          <Typography
                            variant="body6"
                            sx={{ alignSelf: "center" }}
                          >
                            Mock Test Type :
                            {props.post.mt_type_id === 1
                              ? "Full Mock Test"
                              : props.post.mt_type_id === 2
                              ? "Mni Mock Test"
                              : props.post.mt_type_id === 3
                              ? "Speaking Mock Test"
                              : props.post.mt_type_id === 4
                              ? "Reading Mock Test"
                              : props.post.mt_type_id === 5
                              ? "Listening Mock Test"
                              : props.post.mt_type_id === 6
                              ? "Writing Mock Test"
                              : ""}
                          </Typography>
                          <br />
                          <Typography variant="body6">
                            Overall Points : {props.post.overall_point}
                          </Typography>
                        </Box>
                        {props.post?.mt_type_id !== 1 &&
                          props.post?.mt_type_id !== 2 && (
                            <Box
                              sx={{
                                p: 2,
                                width: "50%",
                                backgroundColor: "whitesmoke",
                                borderRadius: "2rem",
                              }}
                            >
                              <Typography textAlign="center">
                                Overall Points
                              </Typography>
                              <Box sx={{ width: "6rem", p: 1, mx: "auto" }}>
                                <CircularProgressbar
                                  value={props.post.overall_point}
                                  maxValue={90}
                                  text={props.post.overall_point}
                                  styles={{ width: "10%" }}
                                />
                              </Box>
                            </Box>
                          )}
                      </Box>

                      {props.post?.mt_type_id === 1 ||
                      props.post?.mt_type_id === 2 ? (
                        <Box
                          sx={{
                            p: 2,
                            width: "100%",
                            backgroundColor: "whitesmoke",
                            borderRadius: "2rem",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyConent: "space-evenly",
                            }}
                          >
                            <Box sx={{ width: "10rem", p: 1 }}>
                              <CircularProgressbar
                                value={props.post.speaking}
                                maxValue={90}
                                text={props.post.speaking}
                                styles={buildStyles({
                                  pathColor: `rgba(69, 44, 99, ${props.post.speaking})`,
                                  textColor: "#0CAFFF",
                                })}
                              />
                              <Typography textAlign="center">
                                Speaking
                              </Typography>
                            </Box>

                            <Box sx={{ width: "10rem", p: 1 }}>
                              <CircularProgressbar
                                value={props.post.reading}
                                maxValue={90}
                                text={props.post.reading}
                                styles={buildStyles({
                                  pathColor: `rgba(255, 215, 0, ${props.post.reading})`,
                                  textColor: "#0CAFFF",
                                })}
                              />
                              <Typography textAlign="center">
                                Reading
                              </Typography>
                            </Box>

                            <Box sx={{ width: "10rem", p: 1 }}>
                              <CircularProgressbar
                                value={props.post.writing}
                                maxValue={90}
                                text={props.post.writing}
                                styles={buildStyles({
                                  pathColor: `rgba(228, 130, 238, ${props.post.writing})`,
                                  textColor: "#0CAFFF",
                                })}
                              />
                              <Typography textAlign="center">
                                Writing
                              </Typography>
                            </Box>

                            <Box sx={{ width: "10rem", p: 1 }}>
                              <CircularProgressbar
                                value={props.post.listening}
                                maxValue={90}
                                text={props.post.listening}
                                styles={buildStyles({
                                  pathColor: `rgba(69, 44, 99, ${props.post.listening})`,
                                  textColor: "#0CAFFF",
                                })}
                              />
                              <Typography textAlign="center">
                                Listening
                              </Typography>
                            </Box>

                            <Box sx={{ width: "10rem", p: 1 }}>
                              <CircularProgressbar
                                value={props.post.overall_point}
                                maxValue={90}
                                text={props.post.overall_point}
                                styles={{ width: "20%" }}
                              />
                              <Typography textAlign="center">
                                Overall Points
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        <Box></Box>
                      )}

                      {(props.post.mt_type_id === 1 ||
                        props.post.mt_type_id === 2 ||
                        props.post.mt_type_id === 3) &&
                        speaking !== "" &&
                        speaking !== undefined && (
                          <>
                            <Box
                              sx={{
                                width: "100%",
                                borderRadius: "1rem",
                                backgroundColor: "whitesmoke",
                                boxShadow: 5,
                                my: 2,
                                pb: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  backgroundColor: "red",
                                  borderTopRightRadius: "1rem",
                                  borderTopLeftRadius: "1rem",
                                }}
                              >
                                <Typography variant="h5">
                                  Speaking Table
                                </Typography>
                                <KeyboardVoiceIcon
                                  sx={{ fontSize: "3rem" }}
                                ></KeyboardVoiceIcon>
                              </Box>
                              <MtDetailTable
                                title="Speaking"
                                score={speaking}
                              ></MtDetailTable>
                            </Box>
                          </>
                        )}
                      {(props.post.mt_type_id === 1 ||
                        props.post.mt_type_id === 2 ||
                        props.post.mt_type_id === 6) &&
                        writing !== "" &&
                        writing !== undefined && (
                          <>
                            <Box
                              sx={{
                                width: "100%",
                                borderRadius: "1rem",
                                backgroundColor: "whitesmoke",
                                boxShadow: 5,
                                my: 2,
                                pb: 2,
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
                                <Typography variant="h5">
                                  Writing Table
                                </Typography>
                                <DriveFileRenameOutlineIcon
                                  sx={{ fontSize: "3rem" }}
                                ></DriveFileRenameOutlineIcon>
                              </Box>

                              <MtDetailTable
                                title="Writing"
                                score={writing}
                              ></MtDetailTable>
                            </Box>
                          </>
                        )}
                      {(props.post.mt_type_id === 1 ||
                        props.post.mt_type_id === 2 ||
                        props.post.mt_type_id === 4) &&
                        reading !== "" &&
                        reading !== undefined && (
                          <>
                            <Box
                              sx={{
                                width: "100%",
                                borderRadius: "1rem",
                                backgroundColor: "whitesmoke",
                                boxShadow: 5,
                                my: 2,
                                pb: 2,
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
                                <Typography variant="h5">
                                  Reading Table
                                </Typography>
                                <AutoStoriesIcon
                                  sx={{ fontSize: "3rem" }}
                                ></AutoStoriesIcon>
                              </Box>
                              <MtDetailTable
                                title="Reading"
                                score={reading}
                              ></MtDetailTable>
                            </Box>
                          </>
                        )}
                      {(props.post.mt_type_id === 1 ||
                        props.post.mt_type_id === 2 ||
                        props.post.mt_type_id === 5) &&
                        listening !== "" &&
                        listening !== undefined && (
                          <>
                            <Box
                              sx={{
                                width: "100%",
                                borderRadius: "1rem",
                                backgroundColor: "whitesmoke",
                                boxShadow: 5,
                                my: 2,
                                pb: 2,
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
                                <Typography variant="h5">
                                  Listening Table
                                </Typography>
                                <GraphicEqIcon
                                  sx={{ fontSize: "3rem" }}
                                ></GraphicEqIcon>
                              </Box>
                              <MtDetailTable
                                title="Listening"
                                score={listening}
                              ></MtDetailTable>
                            </Box>
                          </>
                        )}
                    </CardContent>
                  )}
                </Card>
              </Box>
            </>
          ) : (
            <CircularProgress sx={{ m: "auto" }}></CircularProgress>
          )}
        </Box>
      </Dialog>
    </>
  );
}

export default MtDetail;
