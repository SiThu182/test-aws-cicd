import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useTranslation } from "react-i18next";

export default function FAQs() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqAccordion = {
    width: "100%",
    backgroundColor: "#0CAFFF",

    boxShadow: 5,
    "&.MuiPaper-root": {
      borderRadius: "3rem",
    },
  };

  const faqDetail = {
    p: 2,
    backgroundColor: "#041E42",
    color: "white",
    m: 2,
    borderRadius: "2rem",
  };
  const hStyle = {
    fontSize: {
      xs: "16px",
      sm: "17px",
      md: "1.7rem",
    },
    fontWeight: 600,
    pt: "1rem",
    pb: "1rem",
    textAlign: "center",
  };

  return (
    <>
      <Box sx={{ backgroundColor: "rgb(227,242,253)", pb: "4rem", backgroundImage: `url(${
          process.env.REACT_APP_FRONTEND_URL
        }Image/chirstmas-plan.png)`,
        backgroundPosition: "center",
        backgroundSize: "cover", }}>
        <Typography variant="h3" sx={{ ...hStyle }}>
          PTE <span style={{ color: "#0CAFFF" }}>FAQs</span>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",

            width: "100%",
            p: 2,
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
        >
          <Box
            sx={{
              my: 2,
              width: {
                xs: "100%",
                sm: "50%",
                md: "40%",
              },
              mx: "auto",
            }}
          >
            <Accordion
              sx={{ ...faqAccordion }}
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  sx={{ width: "83%", flexShrink: 0, color: "white" }}
                >
                  {t("whatPTE", { ns: "faq" })}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  ...faqDetail,
                }}
              >
                <Typography>{t("whatPTEAnswer", { ns: "faq" })}</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box
            sx={{
              my: 2,
              width: {
                xs: "100%",
                sm: "50%",
                md: "40%",
              },
              mx: "auto",
            }}
          >
            <Accordion
              sx={{ ...faqAccordion }}
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography
                  sx={{ width: "83%", flexShrink: 0, color: "white" }}
                >
                  {t("howScore", { ns: "faq" })}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ ...faqDetail }}>
                <Typography>{t("howScoreAnswer", { ns: "faq" })}</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            p: 2,
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
        >
          <Box
            sx={{
              my: 2,
              width: {
                xs: "100%",
                sm: "50%",
                md: "40%",
              },
              mx: "auto",
            }}
          >
            <Accordion
              sx={{ ...faqAccordion }}
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography
                  sx={{ width: "83%", flexShrink: 0, color: "white" }}
                >
                  {t("price", { ns: "faq" })}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  ...faqDetail,
                }}
              >
                <Typography>
                  {t("priceAnswer", { ns: "faq" })}
                  <a
                    href="https://pearsonpte.com/test-centers-and-fees"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    https://pearsonpte.com/test-centers-and-fees
                  </a>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box
            sx={{
              my: 2,
              width: {
                xs: "100%",
                sm: "50%",
                md: "40%",
              },
              mx: "auto",
            }}
          >
            <Accordion
              sx={{ ...faqAccordion }}
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography
                  sx={{ width: "83%", flexShrink: 0, color: "white" }}
                >
                  {t("book", { ns: "faq" })}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ ...faqDetail }}>
                <Typography>
                  {t("bookAnswer", { ns: "faq" })}
                  <a
                    href=" https://www.pearsonpte.com/articles/how-to-book-your-pte-academic-exam"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    https://www.pearsonpte.com/articles/how-to-book-your-pte-academic-exam
                  </a>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
        {/* <Box sx={{ backgroundColor: "rgb(227,242,253)" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#0CAFFF"
              fill-opacity="1"
              d="M0,96L34.3,96C68.6,96,137,96,206,117.3C274.3,139,343,181,411,197.3C480,213,549,203,617,176C685.7,149,754,107,823,74.7C891.4,43,960,21,1029,53.3C1097.1,85,1166,171,1234,181.3C1302.9,192,1371,128,1406,96L1440,64L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            ></path>
          </svg>
        </Box> */}
      </Box>
    </>
  );
}
