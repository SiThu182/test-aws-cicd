import { Backdrop, Box } from "@mui/material";
import React from "react";
import { PageLoaderStyle } from "./PageLoaderStyle";
import Loader from "./AnimationLoader/Loader";

function PageLoader() {
  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1000,
        }}
        open={true}
        // onClick={handleClose}
      >
        <Box
          sx={{
            ...PageLoaderStyle.LoadContainer,
          }}
        >
          <Box
            sx={{
              ...PageLoaderStyle.LoadBox,
            }}
          >
            <Loader></Loader>
          </Box>
        </Box>
      </Backdrop>
    </div>
  );
}

export default PageLoader;
