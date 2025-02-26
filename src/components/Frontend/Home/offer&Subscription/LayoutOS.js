import { Box, style } from "@mui/system";
import React from "react";

import OfferPte from "./OfferPte";
import Subscription from "./Subscription";
 
function LayoutOS() {
  //custom css and responsive value
  const layoutStyle = {
    // backgroundColor: "rgb(227,242,253)",
    backgroundColor :"FFF",
    width: "100%",
    position:'static'
  };


  
  return (
    <>
      {/* layout box for offer and subscription section */}
      <Box
        sx={{
          ...layoutStyle,
        }}
      >
        {/* <Box
          sx={{
            position: "absolute",
            top: { xs: "30.5%", md: "30%", xl: "32%",lg:"33%" }, // Adjust for responsiveness

            left: { xs: "87%", md: "85%", xl: "86%",lg:"82%" }, // Adjust for responsiveness
            transform: "translateY(-50%)",
            m: 0,
            p: 1,
          }}
        >
          <Box
            sx={{
                width: {
                  xs: "15vw",
                  sm: "12vw",
                  md: "15vw",
                  lg: "12vw",
                  xl: "9vw",
                },
                overflow: "hidden",
              }}
            >
              <img
                src={`${process.env.REACT_APP_FRONTEND_URL}Image/chirstmas-tree.png`}
                style={{ width: "100%", height: "auto", transform: "rotate(8deg)" }}
                alt="Christmas Tree"
              />
          </Box>

        </Box> */}
  
        <OfferPte></OfferPte>

      </Box>
    </>
  );
}

export default LayoutOS;
