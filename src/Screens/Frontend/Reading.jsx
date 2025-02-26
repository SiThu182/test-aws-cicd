import { Box } from "@mui/system";
import React, { useState } from "react";
import Layout from "../../components/Layout/Frontend/Layout";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import ReadingComponent from "../../components/Frontend/Reading/Reading";
import { useNavigate } from "react-router-dom";

function Reading() {
  const navigate = useNavigate();
  const [userReadingProgress, setUserReadingProgress] = useState(0);
  return (
    <>
      <Layout speaking="reading">
        <Box
          sx={{
            bgcolor: "rgb(231 239 254)",
          }}
        >
          <Box
            sx={{
              px: {
                xs: 1,
                sm: 14,
              },
              height: "10%",
              py: 5,
            }}
          >
            <Typography variant="h5" color="initial">
              Your Reading -Practise Progress
            </Typography>
            <Typography variant="p" color="initial">
              Last attempts - {userReadingProgress}
            </Typography>
          </Box>
          <Box
            sx={{
              height: "80%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <ReadingComponent
                setUserReadingProgress={setUserReadingProgress}
              ></ReadingComponent>
            </Box>
          </Box>

          <Box sx={{ width: "50%", height: "10%", mx: "auto", pb: "8rem" }}>
            <Button
              variant="contained"
              size="large"
              sx={{ width: "100%", backgroundColor: "rgb(22 86 196)" }}
              onClick={() => navigate("/admin/reading")}
            >
              Start Practicing
            </Button>
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export default Reading;
