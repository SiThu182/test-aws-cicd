import {
  Avatar,
  Box,

  Divider,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import { useSelector } from "react-redux";

import ProgressBar from "./ProgressBar";
import { colorCode } from "../../Colors/ReusableColorCode";
import axios from "axios";

function ScoreCardComponent(props) {
  const { pointArray, user, date, overallPoint, mockTestId, id, post } = props;
  const [imageSrc, setImageSrc] = useState("");
  useEffect(() => {
    const fetchImage = async () => {
      if (user.data?.image !== null && user.data?.image !== undefined) {
        try {
          await axios
            .get(process.env.REACT_APP_BACKEND_API + "images/" + user.data.id, {
              responseType: "blob", // Set the responseType to 'blob'
            })
            .then((response) => {
              // Do something with the Blob data
              const blobData = response.data;

              // Create a Blob URL or use the data directly
              const blobUrl = URL.createObjectURL(blobData);
              setImageSrc(blobUrl);
            })
            .catch((error) => {
              console.error("Error fetching image:", error);
            });
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    };

    fetchImage();
  }, [user]);

  const frontendURL = process.env.REACT_APP_FRONTEND_URL;
  const SkillsLinearBar = (props) => {
    const { title, point } = props;

    return (
      <Box
        //   key={index}
        sx={{
          display: "flex",
          width: "100%",

          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "40%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography sx={{ width: "70%" }}>{title}</Typography>
          <Typography sx={{ width: "10%" }}> -</Typography>
          <Typography sx={{ width: "20%" }}>{point}</Typography>
        </Box>
        <Box sx={{ width: "60%" }}>
          <LinearProgress
            variant="determinate"
            value={point}
            maxValue={90}
            sx={{
              backgroundColor: "lightgrey",

              "& .MuiLinearProgress-bar": {
                backgroundColor: "gray",
              },
              height: 20,
            }}
          />
        </Box>
      </Box>
    );
  };
  const TestCenter = (props) => {
    const { title, text } = props;
    return (
      <Box sx={{ display: "flex", width: "100%" }}>
        <Typography sx={{ width: "40%" }}>{title}</Typography>
        <Typography sx={{ width: "10%" }}>-</Typography>
        <Typography sx={{ width: "50%" }}>{text}</Typography>
      </Box>
    );
  };

  return (
    <>
      <Box
        id={id}
        sx={{
          boxShadow: 5,
          border: "2px solid black",
          background: "rgb(231, 239, 254)",
        }}
      >
        <Box
          sx={{
            backgroundColor: "whitesmoke",
            // width: "680px",
            width: "100%",
            display: "flex",
            p: 1,
            alignItems: "center",
          }}
        >
          <img
            src={frontendURL + "Image/AigmaLogo.png"}
            style={{ width: "20%", m: 1 }}
            alt="aigma_logo"
            crossorigin
          />
          <Typography variant="h6">
            Aigma PTE | PTE Academic | Test Taker Score Report
            <br />
            <small>
              Score Report Code:{" "}
              <b>
                {post?.report_score_id !== null
                  ? post?.report_score_id
                  : "AIG-SC#0000"}
              </b>
            </small>
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              p: 2,
              pt: 5,
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {user.data?.image !== undefined && user.data?.image !== null ? (
                <Box
                  sx={{
                    width: "6rem",
                    height: "6rem",
                    borderRadius: "50%",
                  }}
                  style={{ border: "1px solid black", overflow: "hidden" }}
                >
                  <img
                    src={imageSrc}
                    style={{ width: "100%" }}
                    alt="test-taker-img"
                    crossorigin
                  />
                </Box>
              ) : (
                <Avatar sx={{ width: 100, height: 100 }}></Avatar>
              )}
              <Box sx={{ ml: 4 }}>
                <Typography>Name :{user.data.name}</Typography>
                <Typography>
                  Test TakerId :
                  {user.data?.registration_id !== null
                    ? user.data?.registration_id
                    : "#0000exampleId"}
                </Typography>
              </Box>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              variant="full"
              sx={{ borderRightWidth: "3px", borderColor: "black" }}
            />

            <Box>
              {/* <Card
                sx={{
                  borderBottomLeftRadius: "5rem",
                  borderBottomRightRadius: "5rem",
                  borderTopLeftRadius: "2rem",
                  borderTopRightRadius: "2rem",
                }}
              >
                <CardHeader
                  sx={{ backgroundColor: "#004d40", p: 1 }}
                  title={
                    <Typography sx={{ color: "white" }}>
                      Overall Score
                    </Typography>
                  }
                ></CardHeader>
                <CardContent
                  sx={{
                    height: "6rem",
                    backgroundColor: "purple",
                  }}
                >
                  <Typography variant="h3" color={"white"} textAlign="center">
                    {overallPoint}
                  </Typography>
                   <Typography sx={{ color: "white" }}>
                      Overall Score
                    </Typography>
                </CardContent>
              </Card> */}
              <Box
                sx={{
                  width: "8rem",
                  height: "8rem",
                  borderRadius: "50%",
                  background: "#1769aa",
                }}
              >
                <Typography variant="h3" color={"white"} textAlign="center">
                  {overallPoint}
                </Typography>
                <Typography sx={{ color: "white" }} textAlign="center">
                  Overall
                  <br /> Score
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Communicative Skills
            </Typography>
            <Divider sx={{ borderBottomWidth: "2px" }}></Divider>
            <Box sx={{ width: "100%", display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyConent: "space-between",
                  mx: "auto",
                }}
              >
                {pointArray !== undefined &&
                  pointArray.map((p, index) => (
                    <Box sx={{ width: "7rem", p: 1, my: 2 }} key={index}>
                      <CircularProgressbar
                        value={p}
                        maxValue={90}
                        text={p}
                        styles={buildStyles({
                          pathColor:
                            index === 0
                              ? `rgba(26, 35, 126, ${p})`
                              : index === 1
                              ? `rgba(255, 255, 0, ${p})`
                              : index === 2
                              ? `rgba(128, 0, 128, ${p})`
                              : `rgba(89, 89, 89, ${p})`,
                          textColor: "#0CAFFF",
                        })}
                      />
                      <Typography textAlign="center">
                        {index === 0
                          ? "Speaking"
                          : index === 1
                          ? "Reading"
                          : index === 2
                          ? "Writing"
                          : "Listening"}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>

          <Box sx={{ width: "100%", display: "flex", mt: "1rem" }}>
            {/* skill right column */}
            <Box sx={{ width: "55%", mr: "1rem" }}>
              <Box sx={{ width: "100%", my: 1 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Skills Breakdown
                </Typography>
                <Divider sx={{ borderBottomWidth: "2px" }}></Divider>
              </Box>

              <Box sx={{ position: "relative", width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ width: "45%" }}>
                    <Typography></Typography>
                  </Box>
                  <Box sx={{ width: "55%" }}>
                    <Box
                      sx={{
                        width: overallPoint + "%",
                        display: "inline-block",
                      }}
                    ></Box>
                    <Divider
                      orientation="vertical"
                      sx={{
                        width: "3px",
                        marginTop: "12%",
                        backgroundColor: "dimgray",
                        borderTopWidth: "90%",
                        height: "80%",
                        display: "inline-block",
                        position: "absolute",
                        zIndex: 4,
                      }}
                    ></Divider>
                    <Typography
                      sx={{
                        display: "inline-block",
                        ml: "0.5rem",
                        color: "purple",
                        mb: 1,
                      }}
                    >
                      Overall Point - {overallPoint}
                    </Typography>
                  </Box>
                </Box>
                {pointArray !== undefined &&
                  pointArray.length !== 0 &&
                  pointArray.map((p, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        width: "100%",

                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: "45%",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Typography sx={{ width: "50%" }}>
                          {index === 0
                            ? "Speaking"
                            : index === 1
                            ? "Reading"
                            : index === 2
                            ? "Writing"
                            : "Listening"}
                        </Typography>
                        <Typography sx={{ width: "10%" }}> -</Typography>
                        <Typography sx={{ width: "40%" }}>{p}</Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "55%",
                          "& .speaking-progress-bar": {},
                        }}
                      >
                        <ProgressBar
                          bgcolor={
                            index === 0
                              ? colorCode.scoreColor.scoreBlue
                              : index === 1
                              ? colorCode.scoreColor.scoreYellow
                              : index === 2
                              ? colorCode.scoreColor.scorePurple
                              : colorCode.scoreColor.scoreGrey
                          }
                          completed={p}
                        />
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>
            {/* skill right column */}
            {/* test & taker information  */}
            <Box sx={{ width: "45%" }}>
              <Box sx={{ my: 1 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Future Information
                </Typography>
                <Divider sx={{ borderBottomWidth: "2px", mb: 5 }}></Divider>
                <Box sx={{ p: 2 }}>
                  <Typography>
                    <i>
                      This mock test is taken at home or office .It will not be
                      accepted at all institutions
                    </i>
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* test center information  */}
          </Box>
          <Box sx={{ width: "100%", display: "flex", mt: "1rem" }}>
            <Box sx={{ width: "55%", mr: "1rem" }}>
              <Box sx={{ mt: 5 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Test Center Information
                </Typography>
                <Divider sx={{ borderBottomWidth: "2px", mb: 3 }}></Divider>

                <Box sx={{ width: "100%" }}>
                  <TestCenter
                    title={"Test Center Country"}
                    text={"Australia"}
                  />
                  <TestCenter title={"Test Center ID"} text={"#00000"} />
                  <TestCenter title={"Test Center "} text={"Aigma PTE Ai"} />
                  <TestCenter title={"Test Date"} text={date} />
                  <TestCenter title={"Valid Until"} text={"(-)"} />
                </Box>
              </Box>
            </Box>
            {/* test & taker information  */}
            <Box sx={{ width: "45%" }}>
              <Box sx={{ mt: 5 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Candidate Information
                </Typography>
                <Divider sx={{ borderBottomWidth: "2px", mb: 3 }}></Divider>
                <Box sx={{ width: "100%", ml: 1 }}>
                  <Typography>Date of Birth - {"****"}</Typography>
                  <Typography>Gender - {"****"}</Typography>
                  <Typography>Country - {user.data.country}</Typography>
                  <Typography>Email - {user.data.email} </Typography>
                  <Typography>Name - {user.data.name}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "whitesmoke",
            width: "100%",
            p: 1,
            mt: "5rem",
            height: "2rem",
            textAlign: "center",
          }}
        >
          <Typography>
            NOTE TO INSTITUTIONS : This score is not REAL SCORE, is for ,
            <b style={{ color: "red" }}>MOCK TEST ONLY</b>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default ScoreCardComponent;
