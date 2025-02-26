import React, { useContext } from "react";
import { Badge, Box, Button, Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import "./NavSwitch.css";
import { NavContext } from "../Layout/Backend/Layout";
function NavSwitch() {
  const { pteCore, setPteCore, open } = useContext(NavContext);
  return (
    <>
      {open ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <Box>
            <Button
              sx={{
                backgroundColor: pteCore ? "white" : "rgb(7,106,225)",
                color: pteCore ? "black" : "white",
                boxShadow: pteCore ? "inset 0 0 10px rgba(0, 0, 0, 0.5)" : 5,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                "&:hover": {
                  backgroundColor: pteCore ? "white" : "rgb(7,106,225)",
                  borderColor: "#0062cc",
                  boxShadow: "none",
                },
              }}
              onClick={() => setPteCore(false)}
            >
              Academic
            </Button>
          </Box>
          <Box>
            <Badge
              badgeContent={"New"}
              color={"error"}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Button
                sx={{
                  backgroundColor: !pteCore ? "white" : "rgb(7,106,225)",
                  color: !pteCore ? "black" : "white",
                  boxShadow: pteCore ? 5 : "inset 0 0 10px rgba(0, 0, 0, 0.5)",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  "&:hover": {
                    backgroundColor: !pteCore ? "white" : "rgb(7,106,225)",
                    borderColor: "#0062cc",
                    boxShadow: "none",
                  },
                }}
                onClick={() => setPteCore(true)}
              >
                Core
              </Button>
            </Badge>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", color: "white" }}>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                value={pteCore}
                onClick={() => setPteCore((prev) => !prev)}
              />
            }
            label={pteCore ? "Core" : "Academic"}
            labelPlacement="top"
          />
        </Box>
      )}
    </>
  );
}

export default NavSwitch;
