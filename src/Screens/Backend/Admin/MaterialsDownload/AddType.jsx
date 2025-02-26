import { Box, Typography } from "@mui/material";
import React from "react";
import BackButton from "../../../../components/Backend/BackButton";
import PageNavTitle from "../../../../components/Backend/PageTitle";
import MaterialTypeForm from "../../../../components/Backend/Admin/Posts/MaterialTypeForm";


const AddType = () => {
  return (
    <>
      <Box id="main" sx={{ width: "100%", p: 4 }}>
        <PageNavTitle text="Material Type" />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 0 }}>
            Add Material Type
          </Typography>
          <BackButton />
        </Box>
        <MaterialTypeForm
          edit=""
          //   category="video-recording"
          addPath="material-types"
        ></MaterialTypeForm>
      </Box>
    </>
  );
};

export default AddType;
