import React from "react";
import MaterialsDownloadComponent from "../../../components/Frontend/MaterialsDownload/MaterialsDownloadComponent";
import { Box } from "@mui/material";
import PageNavTitle from "../../../components/Backend/PageTitle";

function MaterialDownloadPage() {
  return (
    
    <Box sx={{ width: "100%" }}>
      <PageNavTitle text={"Materials download"}></PageNavTitle>
      <MaterialsDownloadComponent></MaterialsDownloadComponent>
    </Box>
  );
}

export default MaterialDownloadPage;
