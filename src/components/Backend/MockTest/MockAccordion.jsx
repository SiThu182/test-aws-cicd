import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function ControlledAccordions(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel, index) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    props.setSearchInput("");
    props.setPage(1);
    props.setFunction(
      "search?category=" + props.speakingAbbr[index] + "&page=1"
    );
    props.setCurrentCategory(props.speakingAbbr[index]);

   
  };

  return (
    <>
      {props.title.map((t, index) => (
        <Accordion
          key={index}
          expanded={expanded === "panel" + index}
          onChange={handleChange("panel" + index, index)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id={`panel${index}bh-header`}
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {props.title[index]}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{props.children}</AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
