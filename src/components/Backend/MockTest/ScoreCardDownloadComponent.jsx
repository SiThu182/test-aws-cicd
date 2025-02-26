import React, { useEffect } from "react";
import ScoreCardComponent from "./ScoreCardComponent";
import { Box } from "@mui/material";
import Loader from "../AnimationLoader/Loader";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
function ScoreCardDownloadComponent(props) {
  const {
    pointArray,
    id,
    user,
    post,
    downloading,
    overallPoint,
    mockTestId,
    date,
    setDownloading,
  } = props;
  useEffect(() => {
    if (downloading) {
      const pdfDownload = (id) => {
        setTimeout(async () => {
          const input = document.getElementById(id);
          input.style.transform = "scale(2.2)";
          input.style.marginBottom = "950px";

          html2canvas(input, {
            allowTaint: true,
            useCORS: true,
          }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png", 3.0);

            const pdf = new jsPDF("p", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const widthRatio = pageWidth / canvas.width;
            const heightRatio = pageHeight / canvas.height;
            const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

            const canvasWidth = canvas.width * ratio;
            const canvasHeight = canvas.height * ratio;

            const marginX = (pageWidth - canvasWidth) / 2;
            //const marginY = (pageHeight - canvasHeight) / 2;

            pdf.addImage(imgData, "PNG", marginX, 0, canvasWidth, canvasHeight);

            pdf.save("download.pdf");
            setDownloading(false);
          }, 3000);
        });
      };
      pdfDownload(id);
    }
  }, [downloading, setDownloading, id]);
  return (
    <>
      <Box
        sx={{
          // width: "680px",
          // minWidth: "680px",
          width: "690px",
          minWidth: "690px",
          display: downloading ? "block" : "none",
          //   : {
          //       xs: "none",
          //       md: "block",
          //     },
          // mx: {
          //   xs: 0,
          //   md: "auto",
          // },
          boxShadow: 5,
          mt: 2,
          height: "auto",
        }}
      >
        <ScoreCardComponent
          pointArray={pointArray}
          user={user}
          id={id}
          post={post}
          overallPoint={overallPoint}
          mockTestId={mockTestId}
          date={date}
        />
      </Box>
      {downloading && (
        <Box
          sx={{
            position: "absolute",
            height: "100vh",
            left: "-2%",
            width: "101vw",
            zIndex: 4,
            backdropFilter: "blur(25px)",
            top: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader></Loader>
        </Box>
      )}
    </>
  );
}

export default ScoreCardDownloadComponent;
