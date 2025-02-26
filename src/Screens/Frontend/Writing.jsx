import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import WritingComponent from "../../components/Frontend/Writing/Writing";
import Layout from "../../components/Layout/Frontend/Layout";

function Writing() {
  const navigate = useNavigate();
  const [userWritingProgress, setUserWritingProgress] = useState(0);
  return (
    <>
      <Layout speaking="reading">
        <Box sx={{ bgcolor: "rgb(231 239 254)", height: "100vh" }}>
          <Box
            sx={{
              px: {
                xs: 1,
                sm: 14,
              },
              py: 5,
            }}
          >
            <Typography variant="h5" color="initial">
              Your Writing -Practise Progress
            </Typography>
            <Typography variant="p" color="initial">
              Last attempts - {userWritingProgress}
            </Typography>
          </Box>
          <Box>
            <WritingComponent
              setUserWritingProgress={setUserWritingProgress}
            ></WritingComponent>
          </Box>

          <Box sx={{ width: "50%", mx: "auto", pb: "2rem" }}>
            <Button
              variant="contained"
              size="large"
              sx={{ width: "100%", backgroundColor: "rgb(22 86 196)" }}
              onClick={() => navigate("/admin/writing")}
            >
              Start Practicing
            </Button>
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export default Writing;
