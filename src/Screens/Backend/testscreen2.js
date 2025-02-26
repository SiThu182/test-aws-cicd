import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import Layout from "../../components/Layout/Backend/Layout";
function testscreen2() {
  const drawerWidth = 290;

  const mainStyle = {
    flexGrow: 1,
    p: 3,
    width: { sm: `calc(100% - ${drawerWidth}px)` },
    height: "100vh",
    overflowX: "hidden",
    backgroundColor: "rgb(231 239 254)",
  };
  return (
    <>
      <Box style={{ display: "flex" }} className="dashboard-box">
        <Layout></Layout>

        <Box
          component="main"
          sx={{
            ...mainStyle,
            p: 0,
          }}
        >
          <Toolbar />
          <Box
            display={"flex"}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              px: 2,
            }}
          >
            <Typography variant="h2"> Hello there this is test 2</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default testscreen2;
