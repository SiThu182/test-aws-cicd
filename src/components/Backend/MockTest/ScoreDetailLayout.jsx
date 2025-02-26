import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  LinearProgress,
  Typography,
} from "@mui/material";
import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

function ScoreDetailLayout(props) {
  const frontendURL = process.env.REACT_APP_FRONTEND_URL;
  const date = new Date(props.post.updated_at).toDateString();

  return (
    <>
      {props.post !== undefined && (
        <Box
          sx={{
            // width: "680px",
            // minWidth: "680px",
            width: "750px",
            minWidth: "750px",
            display: props.downloading
              ? "block"
              : {
                  xs: "none",
                  md: "block",
                },
            mx: {
              xs: 0,
              md: "auto",
            },
            boxShadow: 5,
            mt: 2,
            height: "auto",
          }}
        >
          <Box id="scoreCardPrint">
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
              />
              <Typography variant="h6">
                Aigma PTE | PTE Academic | Test Taker Score Report
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
                  {props.user.data?.user_image !== undefined ? (
                    <img src="" alt="test-taker-img" />
                  ) : (
                    <Avatar sx={{ width: 100, height: 100 }}></Avatar>
                  )}
                  <Box sx={{ ml: 4 }}>
                    <Typography>Name :{props.user.data.name}</Typography>
                    <Typography>Test TakerId :0000example ID</Typography>
                  </Box>
                </Box>

                <Divider
                  orientation="vertical"
                  flexItem
                  variant="full"
                  sx={{ borderRightWidth: "3px", borderColor: "black" }}
                />

                <Box>
                  <Card
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
                      <Typography
                        variant="h3"
                        color={"white"}
                        textAlign="center"
                      >
                        {props.post.overall_point}
                      </Typography>
                    </CardContent>
                  </Card>
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
                    {props.pointArray !== undefined &&
                      props.pointArray.map((p, index) => (
                        <Box sx={{ width: "7rem", p: 1, my: 2 }}>
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
                  <Box sx={{ width: "100%", my: 3 }}>
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
                      <Box sx={{ width: "40%" }}>
                        <Typography></Typography>
                      </Box>
                      <Box sx={{ width: "60%" }}>
                        <Box
                          sx={{
                            width: props.post.overall_point + "%",

                            display: "inline-block",
                          }}
                        ></Box>
                        <Divider
                          orientation="vertical"
                          sx={{
                            width: "3px",
                            backgroundColor: "dimgray",
                            borderTopWidth: "100%",
                            display: "inline-block",
                            position: "absolute",
                            zIndex: "1900",
                          }}
                        ></Divider>
                        <Typography
                          sx={{
                            display: "inline-block",
                            ml: "0.5rem",
                            color: "purple",
                          }}
                        >
                          Overall Point - {props.post.overall_point}
                        </Typography>
                      </Box>
                    </Box>
                    {props.pointArray !== undefined &&
                      props.pointArray.map((p, index) => (
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
                              width: "40%",
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <Typography sx={{ width: "70%" }}>
                              {index === 0
                                ? "Speaking"
                                : index === 1
                                ? "Reading"
                                : index === 2
                                ? "Writing"
                                : "Listening"}
                            </Typography>
                            <Typography sx={{ width: "10%" }}> -</Typography>
                            <Typography sx={{ width: "20%" }}>{p}</Typography>
                          </Box>
                          <Box sx={{ width: "60%" }}>
                            <LinearProgress
                              variant="determinate"
                              value={p}
                              maxValue={90}
                              sx={{
                                backgroundColor: "lightgrey",

                                "& .MuiLinearProgress-bar": {
                                  backgroundColor: "#1a237e",
                                },
                                height: 20,
                              }}
                            />
                          </Box>
                        </Box>
                      ))}

                    {/* needs to check */}
                    <Box>
                      <Typography sx={{ my: "1rem" }}>
                        Enabling Skills
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: "40%" }}>
                        <Typography>Grammar {props.post.listening}</Typography>
                      </Box>

                      <Box sx={{ width: "60%" }}>
                        <LinearProgress
                          variant="determinate"
                          value={props.post.listening}
                          maxValue={90}
                          sx={{
                            backgroundColor: "lightgrey",

                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "grey",
                            },
                            height: 20,
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: "40%" }}>
                        <Typography>
                          Oral Fluency {props.post.listening}
                        </Typography>
                      </Box>

                      <Box sx={{ width: "60%" }}>
                        <LinearProgress
                          variant="determinate"
                          value={props.post.listening}
                          maxValue={90}
                          sx={{
                            backgroundColor: "lightgrey",

                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "grey",
                            },
                            height: 20,
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: "40%" }}>
                        <Typography>
                          Pronunciation {props.post.listening}
                        </Typography>
                      </Box>

                      <Box sx={{ width: "60%" }}>
                        <LinearProgress
                          variant="determinate"
                          value={props.post.listening}
                          maxValue={90}
                          sx={{
                            backgroundColor: "lightgrey",

                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "grey",
                            },
                            height: 20,
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: "40%" }}>
                        <Typography>Spelling {props.post.listening}</Typography>
                      </Box>

                      <Box sx={{ width: "60%" }}>
                        <LinearProgress
                          variant="determinate"
                          value={props.post.listening}
                          maxValue={90}
                          sx={{
                            backgroundColor: "lightgrey",

                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "grey",
                            },
                            height: 20,
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: "40%" }}>
                        <Typography>
                          Vocabulary {props.post.listening}
                        </Typography>
                      </Box>

                      <Box sx={{ width: "60%" }}>
                        <LinearProgress
                          variant="determinate"
                          value={props.post.listening}
                          maxValue={90}
                          sx={{
                            backgroundColor: "lightgrey",

                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "grey",
                            },
                            height: 20,
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: "40%" }}>
                        <Typography>
                          Written Discourse {props.post.listening}
                        </Typography>
                      </Box>

                      <Box sx={{ width: "60%" }}>
                        <LinearProgress
                          variant="determinate"
                          value={props.post.listening}
                          maxValue={90}
                          sx={{
                            backgroundColor: "lightgrey",

                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "grey",
                            },
                            height: 20,
                          }}
                        />
                      </Box>
                    </Box>
                    {/* needs to check */}
                  </Box>
                </Box>
                {/* skill right column */}
                {/* test & taker information  */}
                <Box sx={{ width: "45%" }}>
                  <Box sx={{ my: 3 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      Candidate Information
                    </Typography>
                    <Divider sx={{ borderBottomWidth: "2px", mb: 3 }}></Divider>
                    <Box sx={{ p: 2 }}>
                      <Typography>Email - {props.user.data.email} </Typography>
                      <Typography>Name - {props.user.data.name}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ my: 3 }}>
                    <Typography variant="h5">Test Information</Typography>
                    <Divider sx={{ borderBottomWidth: "2px", mb: 3 }}></Divider>
                    <Box sx={{ p: 2 }}>
                      <Typography>
                        Test ID - {props.post.mock_test_id}{" "}
                      </Typography>
                      <Typography>Validate Date - {date}</Typography>
                    </Box>
                  </Box>
                </Box>
                {/* test & taker information  */}
              </Box>
            </Box>
            <Box
              sx={{
                backgroundColor: "whitesmoke",
                width: "100%",
                display: "flex",
                p: 1,
                mt: "5rem",
                height: "2rem",
                alignItems: "center",
              }}
            ></Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ScoreDetailLayout;
