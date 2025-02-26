import { Box, Typography } from "@mui/material";
import React from "react";
import BackButton from "../../../../components/Backend/BackButton";
import EmailTemplateForm from "../../../../components/Backend/Admin/Marketing/EmailTemplateForm";

const Add = () => {
  return (
    <>
      <Box id="main" sx={{ width: "100%", p: 4 }}>
        <Box
          sx={{
            top: "1rem",

            position: "absolute",
            overflow: "visible",
            zIndex: 1500,
          }}
        >
          <Typography variant="h5">Email Template</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 0 }}>
            Add Email Template
          </Typography>
          <BackButton />
        </Box>
        <EmailTemplateForm edit="" shopEmailTemplate={true}></EmailTemplateForm>
      </Box>
    </>
  );
};

export default Add;
