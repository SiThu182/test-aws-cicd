import { Box } from "@mui/system";
import React, { createContext, useState } from "react";
import Layout from "../../components/Layout/Frontend/Layout";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import SpeakingComponent from "../../components/Frontend/Speaking/Speaking";
import { useNavigate } from "react-router-dom";

export const UserProgressSpeaking = createContext();
function Speaking() {
  const navigate = useNavigate();
  const [contextValue, setContextValue] = useState();
  return (
    <>
      <Layout speaking="speaking">
        <Box sx={{ bgcolor: "rgb(231 239 254)", height: "55%" }}>
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
              Your Speaking - Practise Progress
            </Typography>
            <Typography variant="p" color="initial">
              Last attempts - {contextValue}
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
            <UserProgressSpeaking.Provider
              value={{
                setContextValue: setContextValue,
              }}
            >
              <Box>
                <SpeakingComponent></SpeakingComponent>
              </Box>
            </UserProgressSpeaking.Provider>
          </Box>
          <Box sx={{ width: "50%", height: "10%", mx: "auto", pb: "8rem" }}>
            <Button
              variant="contained"
              size="large"
              sx={{ width: "100%", backgroundColor: "rgb(22 86 196)" }}
              onClick={() => navigate("/admin/speaking")}
            >
              Start Practicing
            </Button>
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export default Speaking;
