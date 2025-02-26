import { Box } from "@mui/system";
import React, { useState } from "react";
import Layout from "../../components/Layout/Frontend/Layout";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import ListeningComponent from "../../components/Frontend/Listening/Listening";
import { useNavigate } from "react-router-dom";

function Listening() {
  const navigate = useNavigate();
  const [userListeningProgress, setUserListeningProgress] = useState(0);
  return (
    <>
      <Layout speaking="listening">
        <Box sx={{ bgcolor: "rgb(231 239 254)" }}>
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
              Your Listening -Practise Progress
            </Typography>
            <Typography variant="p" color="initial">
              Last attempts - {userListeningProgress}
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
              <ListeningComponent
                setUserListeningProgress={setUserListeningProgress}
              ></ListeningComponent>
            </Box>
          </Box>
          <Box sx={{ width: "50%", height: "10%", mx: "auto", pb: "8rem" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                width: "100%",
                backgroundColor: "rgb(22 86 196)",
              }}
              onClick={() => navigate("/admin/listening")}
            >
              Start Practicing
            </Button>
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export default Listening;
