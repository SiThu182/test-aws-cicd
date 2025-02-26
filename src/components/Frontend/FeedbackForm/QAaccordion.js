import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
function QAaccordion(props) {
  const { panel, title, content, expanded, handleChange } = props;
  const accordionContainer = {
    width: "100%",
    backgroundColor: "#0CAFFF",

    boxShadow: 5,
    "&.MuiPaper-root": {
      borderRadius: "3rem",
    },
  };

  const accordionDetail = {
    p: 2,
    backgroundColor: "#041E42",
    color: "white",
    m: 2,
    borderRadius: "2rem",
  };
  //   const hStyle = {
  //     fontSize: {
  //       xs: "16px",
  //       sm: "17px",
  //       md: "1.7rem",
  //     },
  //     fontWeight: 600,
  //     pt: "1rem",
  //     pb: "1rem",
  //     textAlign: "center",
  //   };

  return (
    <Box
      sx={{
        pt: 2,
        width: {
          xs: "90%",
          md: "80%",
        },
        mx: "auto",
      }}
    >
      <Accordion
        sx={{ ...accordionContainer }}
        expanded={expanded === panel}
        onChange={handleChange(panel)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "83%", flexShrink: 0, color: "white" }}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ ...accordionDetail }}>
          {content}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default QAaccordion;
