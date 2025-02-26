import { Button } from "@mui/material";
import React from "react";

function BtnComponent({
  onClickFun,
  disabledBtn,
  name,
  setShowAudioText = null,
}) {
  return (
    <Button
      variant="contained"
      size="sm"
      onClick={() =>
        setShowAudioText !== null && setShowAudioText !== undefined
          ? setShowAudioText((prev) => !prev)
          : onClickFun()
      }
      disabled={disabledBtn}
      sx={{ mr: 2, my: 1, fontSize: "0.8rem", p: 1 }}
    >
      {name}  
    </Button>
  );
}

export default BtnComponent;
