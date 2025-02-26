import React from "react";
import Layout from "../../components/Layout/Frontend/Layout";
import MaterialsDownloadComponent from "../../components/Frontend/MaterialsDownload/MaterialsDownloadComponent";
import { Box, Typography } from "@mui/material";

function MaterialDownloadPage() {
  return (
    <Layout>
      
      <Box
        sx={{
          width: "100%",
          height: "70vh",
          backgroundImage: `url(${process.env.REACT_APP_FRONTEND_URL}Image/study-materials.jpg),linear-gradient(rgba(2,0,0,0.5),rgba(115,0,0,0.5))`,
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
          Materials Download
        </Typography>
      </Box>
      <MaterialsDownloadComponent></MaterialsDownloadComponent>
    </Layout>
  );
}

export default MaterialDownloadPage;
