import { Box, Button, CircularProgress } from "@mui/material";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// import Loader from "../AnimationLoader/Loader";
import ScoreCardComponent from "./ScoreCardComponent";
import ScoreCardDownloadComponent from "./ScoreCardDownloadComponent";

function MtScoreCard() {
  const [downloading, setDownloading] = useState();
  const [pointArray, setPointArray] = useState();

  const { user } = useSelector((state) => state.user);
  const { state } = useLocation();

  const date = new Date(state.post.updated_at).toDateString();
  useEffect(() => {
    if (state.post !== undefined) {
      setPointArray([]);
      setPointArray([
        state.post.speaking,
        state.post.reading,
        state.post.writing,
        state.post.listening,
      ]);
    }
  }, [state.post]);

  return (
    <>
      {user !== null && (
        <>
          <ScoreCardDownloadComponent
            user={user}
            post={state.post}
            overallPoint={state.post.overall_point}
            pointArray={pointArray}
            mockTestId={state.post.mock_test_id}
            downloading={downloading}
            setDownloading={setDownloading}
            id="scoreCardPrint"
            date={date}
          />
          <Box
            sx={{
              width: "100%",
              height: {
                xs: "20rem",
                sm: "54rem",
                md: "2rem",
                xl: "auto",
              },

              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                // width: "680px",
                // minWidth: "680px",
                width: "45rem",
                minWidth: "45rem",

                display: downloading ? "none" : "block",
                // : {
                //     xs: "block",
                //     md: "none",
                //   },
                transform: {
                  xs: "scale(0.4) ",
                  sm: "scale(0.6) ",
                  xl: "scale(1)",
                },

                mt: 2,
              }}
            >
              <ScoreCardComponent
                pointArray={pointArray}
                user={user}
                post={state.post}
                overallPoint={state.post.overall_point}
                mockTestId={state.post.mock_test_id}
                date={date}
              />
              <Box sx={{ display: downloading ? "none" : "block", my: 3 }}>
                <Button
                  variant="contained"
                  onClick={() => setDownloading(true)}
                >
                  {downloading ? (
                    <CircularProgress></CircularProgress>
                  ) : (
                    "Download"
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default MtScoreCard;
