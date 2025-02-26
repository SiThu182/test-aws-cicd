import React from "react";
import Layout from "../../components/Layout/Frontend/Layout";
import { Box, Typography, Button } from "@mui/material";
import { colorCode } from "../../components/Colors/ReusableColorCode";
import QAaccordion from "../../components/Frontend/FeedbackForm/QAaccordion";
import FeedbackForm from "../../components/Frontend/FeedbackForm/FeedbackForm";

function FeedbackPage() {
  const [expanded, setExpanded] = React.useState(false);
  const [video, setVideo] = React.useState("English");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          height: "70vh",
          backgroundImage: `url(${process.env.REACT_APP_FRONTEND_URL}Image/Help.jpg),linear-gradient(rgba(2,0,0,0.5),rgba(115,0,0,0.5))`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "white",
            textDecoration: "underline",
            textDecorationColor: "#637bfe",
          }}
        >
          Help
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: colorCode.homeFrontColor.lightBlue,
        }}
      >
        <Box sx={{ width: "100%", pt: 3 }}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Q & A{" "}
          </Typography>
          <QAaccordion
            title="Feedback Form"
            content={<FeedbackForm bgColor={"#041E42"} />}
            expanded={expanded}
            handleChange={handleChange}
            panel={"panel0"}
          />
          <QAaccordion
            title="Which browser is most suitable for this website?"
            content={
              <Typography>
                <p>
                  Works best on Google Chrome .Download latest version of chrome
                  at{" "}
                </p>
                <a
                  href="https://www.google.com/chrome/"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.google.com/chrome/
                </a>
              </Typography>
            }
            expanded={expanded}
            handleChange={handleChange}
            panel={"panel1"}
          />
          <QAaccordion
            title="How to Buy Plan"
            content={
              <>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    sx={{ mr: 2 }}
                    onClick={() => {
                      setVideo("English");
                    }}
                  >
                    English
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setVideo("Myanmar");
                    }}
                  >
                    Myanmar
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {video === "English" && (
                    <video width={"50%"} height={"50%"} controls>
                      <source
                        // src="https://ptebackend.aigmapte.com/How-to-buy-subscription-plans.mp4"
                        src={
                          process.env.REACT_APP_BACKEND_URL +
                          "/How-to-buy-subscription-plans.mp4"
                        }
                        type="video/mp4"
                      />
                      <source
                        // src="https://ptebackend.aigmapte.com/How%20to%20buy%20subscription%20plans.mov"
                        src={
                          process.env.REACT_APP_BACKEND_URL +
                          "How%20to%20buy%20subscription%20plans.mov"
                        }
                        type="video/quicktime"
                      />

                      <p>Your browser cannot play the provided video file.</p>
                    </video>
                  )}
                  {video === "Myanmar" && (
                    <video width={"50%"} height={"50%"} controls>
                      <source
                        // src="https://ptebackend.aigmapte.com//How-to-buy-subscription-plans-mm.mp4"
                        src={
                          process.env.REACT_APP_BACKEND_URL +
                          "https://ptebackend.aigmapte.com//How-to-buy-subscription-plans-mm.mp4"
                        }
                        type="video/mp4"
                      />
                      <p>Your browser cannot play the provided video file.</p>
                    </video>
                  )}
                </Box>
              </>
            }
            expanded={expanded}
            handleChange={handleChange}
            panel={"panel5"}
          />
          <QAaccordion
            title="Audio Problem"
            content={"Coming Soon ..."}
            expanded={expanded}
            handleChange={handleChange}
            panel={"panel2"}
          />
          <QAaccordion
            title="Internet Problem"
            content={"Coming Soon ..."}
            expanded={expanded}
            handleChange={handleChange}
            panel={"panel3"}
          />{" "}
          <QAaccordion
            title="Image Problem"
            content={"Coming Soon ..."}
            expanded={expanded}
            handleChange={handleChange}
            panel={"panel4"}
          />
        </Box>
        <Box></Box>
      </Box>
    </Layout>
  );
}

export default FeedbackPage;
