import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
// import MobileStepper from "@mui/material/MobileStepper";
// import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ReusableStepper = React.memo(({ images }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [imageSlides, setImageSlides] = React.useState(images);

  React.useEffect(() => {
    setImageSlides(images);
  }, [images]);
  //   const maxSteps = images.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        flexGrow: 1,
        padding: "1rem",
        m: "auto",
        position: "relative",
      }}
    >
      {/* <Paper
        square
        elevation={0}
        sx={{
          height: "20%",
          width: "70%",
          boxShadow: 5,
          border: "2px solid grey",
          mx: "auto",
          color: "white",
          pl: 2,
          bgcolor: "white",
          borderRadius: "1rem",
          background:
            "linear-gradient(77deg, rgba(44,101,238,0.9501050420168067) 2%, rgba(113,183,252,1) 61%)",
          mb: 1,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            width: "100%",
            fontSize: "1.2rem",
            color: "white",
          }}
        >
          {/* {images[activeStep].label} 
          ACHIEVE YOUR PTE TARGET SCORE WITH
        </Typography>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            width: "100%",
            color: "yellow",
            fontWeight: 800,
          }}
        >
{images[activeStep].label} 
          AIGMA PTE AI
        </Typography>
      </Paper> */}
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style={{ borderRadius: "1rem", zIndex: 1 }}
      >
        {imageSlides.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  maxHeight: "450px",
                  display: "block",
                  maxWidth: "500px",
                  overflow: "hidden",
                  width: "100%",
                  mx: "auto",
                  mb: 2,
                  borderRadius: "1rem",
                  boxShadow: 10,
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>

      {/* Interactive Dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-2rem",
        }}
      >
        {imageSlides.map((_, index) => (
          <span
            key={index}
            style={{
              cursor: "pointer",
              margin: "0 5px",
              zIndex: 5,
              boxShadow: 4,
              width: index === activeStep ? "20px" : "10px",
              height: "10px",
              border: "2px solid whitesmoke",
              translation: "1s ease",
              borderRadius: index === activeStep ? "1rem" : "50%",
              background: index === activeStep ? "#2196f3" : "gray", // Highlight the active dot
            }}
            onClick={() => handleStepChange(index)}
          />
        ))}
      </div>
    </Box>
  );
});

export default ReusableStepper;
