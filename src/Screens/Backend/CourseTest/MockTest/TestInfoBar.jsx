import React from "react";
import { Box, Typography, Button, LinearProgress } from "@mui/material";
import { MtStyle } from "./MtStyleVariable";
// import ExitConfirmBox from "./ExitConfirmBox";
import LogoutIcon from "@mui/icons-material/Logout";
function TestInfoBar(props) {
  const {
    title,

    pageIndicator,
    value,
    counterDuration,
    timerDuration,
    open,
    setOpen,
    checkAnswerState,
  } = props;
  return (
    <>
      <Box
        sx={{
          ...MtStyle.sectionWidthBox,
        }}
      >
        <Box
          sx={{
            ...MtStyle.sectionLayoutCenter,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                ...MtStyle.fontResponsive,
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", pr: 2 }}>
            <Typography
              sx={{
                ...MtStyle.fontResponsive,
                mr: "2rem",
              }}
            >
              {pageIndicator}
            </Typography>
            {!props.checkAnswerState && (
              <>
                <Typography
                  sx={{
                    ...MtStyle.fontResponsive,
                    mr: "2rem",
                  }}
                >
                  {Math.floor(counterDuration / 3600)}:
                  {Math.floor(counterDuration / 60) < 10
                    ? "0" + Math.floor(counterDuration / 60)
                    : Math.floor(counterDuration / 60) >= 60
                    ? Math.floor(counterDuration / 60 - 60) < 10
                      ? "0" + Math.floor(counterDuration / 60 - 60)
                      : Math.floor(counterDuration / 60 - 60)
                    : Math.floor(counterDuration / 60)}
                  :
                  {counterDuration % 60 < 10
                    ? "0" + (counterDuration % 60)
                    : counterDuration % 60}
                  /{Math.floor(timerDuration / 60)}:
                  {timerDuration % 60 < 10
                    ? "0" + (timerDuration % 60)
                    : timerDuration % 60}
                  :00
                </Typography>

                {checkAnswerState !== true && (
                  <Button
                    variant="contained"
                    onClick={() => setOpen(open ? false : true)}
                  >
                    <LogoutIcon
                      sx={{
                        ...MtStyle.fontResponsive,
                      }}
                    />
                    <Typography
                      sx={{
                        ...MtStyle.fontResponsive,
                      }}
                    >
                      Save & Exit
                    </Typography>
                  </Button>
                )}
              </>
            )}
          </Box>
        </Box>

        <LinearProgress variant="determinate" value={value} />
      </Box>
    </>
  );
}

export default TestInfoBar;
