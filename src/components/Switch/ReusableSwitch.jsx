import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

const SwitchButton = ({ title, isOn, setIsOn, order }) => {
  return (
    <Button
      sx={{
        backgroundColor: isOn == title ? "rgb(7,106,225)" : "white",
        color: isOn === title ? "white" : "rgb(7,106,225)",
        boxShadow: isOn == title ? 5 : "inset 0 0 10px rgba(0, 0, 0, 0.5)",
        // borderTopRightRadius: order == 1 ? 0 : "inherit",
        // borderBottomRightRadius: order == 1 ? 0 : "inherit",
        // // borderTopLefttRadius: order == 2 ? 0 : "inherit",
        // // borderBottomLefttRadius: order == 2 ? 0 : "inherit",
        fontSize: "1rem",
        fontWeight: 600,
        borderRadius: 0,
        "&:hover": {
          backgroundColor: isOn === title ? "rgb(7,106,225)" : "whitesmoke",
          borderColor: "#0062cc",
          boxShadow: "none",
        },
      }}
      onClick={() => setIsOn(title)}
    >
      {title}
    </Button>
  );
};

function ReusableSwitch({ title1, title2, setSelectType }) {
  const [currentTitle, setCurrentTitle] = useState(title1);
  useEffect(() => {
    setSelectType(currentTitle);
  });

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Box>
          <SwitchButton
            title={title1}
            order={1}
            isOn={currentTitle}
            setIsOn={setCurrentTitle}
          />
        </Box>
        <Box>
          <SwitchButton
            title={title2}
            order={2}
            isOn={currentTitle}
            setIsOn={setCurrentTitle}
          />
        </Box>
      </Box>
    </>
  );
}

export default ReusableSwitch;
