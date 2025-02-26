import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TableRow,
  TableCell,
} from "@mui/material";
import Layout from "../../Layout/Frontend/Layout";

import SimpleTable from "../../Backend/SimpleTable";

const cellStyles = {
  textAlign: "center",
};

const TableCellForPTECore = ({ content }) => {
  return (
    <TableCell
      sx={{
        ...cellStyles,
      }}
    >
      {content}
    </TableCell>
  );
};

function PTECorePage() {
  return (
    <>
      <Layout>
        <Box
          component={"section"}
          sx={{
            width: "100%",
            height: "70vh",
            backgroundImage: `url(${process.env.REACT_APP_FRONTEND_URL}Image/Australia_Building.jpg),linear-gradient(rgba(2,0,0,0.5),rgba(115,0,0,0.5))`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundBlendMode: "overlay",
          }}
        >
          <Typography
            variant="h1"
            component={"h3"}
            sx={{
              color: "white",
              textDecoration: "underline",
              textDecorationColor: "#637bfe",
            }}
          >
            PTE Core
          </Typography>
        </Box>
        <Box component={"section"} sx={{ bgcolor: "rgb(231 239 254)", p: 2 }}>
          <Box
            component={"article"}
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              //   background: "whitesmoke",
              borderRadius: "1rem",

              width: "90%",
              mx: "auto",
              p: 3,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography component="h2" variant="h4">
                What is PTE CORE?
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", height: "100%" }}
              >
                <Typography component={"p"} sx={{ alignSelf: "center" }}>
                  On February 1, 2023, Immigration, Refugees and Citizenship
                  Canada (IRCC) confirmed the acceptance of PTE as a valid
                  English proficiency test for Canadian migration purposes.So in
                  summary PTE CORE is the faster, fairer and simpler general
                  English test. Recognized by the Canadian government (IRCC) for
                  permanent residency applications under all economic classes.
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{ width: "50%", height: "100%", alignContent: "flex-end" }}
            >
              <img
                height={"100%"}
                width={"90%"}
                src={`${process.env.REACT_APP_FRONTEND_URL}Image/Australia_Building.jpg`}
                style={{
                  objectFit: "contain",
                  borderRadius: "1rem",
                  boxShadow: "0 0 5px 2px grey",
                }}
                alt="what is pte core"
              />
            </Box>
          </Box>
          <Box
            component={"article"}
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              //   background: "whitesmoke",
              borderRadius: "1rem",

              width: "90%",
              mx: "auto",
              p: 3,
              my: 4,
            }}
          >
            <Box
              sx={{ width: "50%", height: "100%", alignContent: "flex-end" }}
            >
              <img
                height={"100%"}
                width={"90%"}
                src={`${process.env.REACT_APP_FRONTEND_URL}Image/Australia_Building.jpg`}
                style={{
                  objectFit: "contain",
                  borderRadius: "1rem",
                  boxShadow: "0 0 5px 2px grey",
                }}
                alt="what is pte core"
              />
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography component="h2" variant="h4">
                Who is PTE CORE for?
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", height: "100%" }}
              >
                <Typography component={"p"} sx={{ alignSelf: "center" }}>
                  Choose PTE Core if you are applying for permanent residency in
                  Canada. You can also choose PTE Core if you are applying for
                  Canadian citizenship.PTE Core is accepted by the Immigration,
                  Refugees and Citizenship Canada (IRCC) for all Canadian
                  government economic visa categories.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            component={"article"}
            sx={{
              //   display: "flex",
              //   justifyContent: "space-evenly",
              //   background: "whitesmoke",
              borderRadius: "1rem",

              width: "90%",
              mx: "auto",
              p: 3,
              my: 4,
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography component="h2" variant="h4">
                PTE Core vs PTE Academic: Similarities & Differences
              </Typography>
              <Box>
                <Typography component="h3" variant="h5">
                  Similarities
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", height: "100%" }}
                >
                  <List
                    sx={{
                      listStyleType: "disc",
                      pl: 2,
                      "& .MuiListItem-root": {
                        display: "list-item",
                      },
                    }}
                  >
                    <ListItem>
                      <Typography sx={{ width: "40%", fontWeight: "bold" }}>
                        Computer-based Testing:
                      </Typography>
                      <ListItemText>
                        Both PTE Core and PTE Academic are computer-based exams,
                        leveraging Artificial Intelligence (AI) to assess and
                        score the English proficiency level of test takers.
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <Typography sx={{ width: "40%", fontWeight: "bold" }}>
                        Coverage of Four Skills:
                      </Typography>
                      <ListItemText>
                        Both exams comprehensively evaluate four key language
                        skills: Speaking, Listening, Reading, and Writing. This
                        ensures a balanced assessment of the test taker's
                        language abilities.
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <Typography sx={{ width: "40%", fontWeight: "bold" }}>
                        Similar Test Duration:
                      </Typography>
                      <ListItemText>
                        Both tests typically last for about 2 hours, offering a
                        standardized timeframe for completing the examination.
                        This ensures consistency and fairness across test
                        sessions.
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <Typography sx={{ width: "40%", fontWeight: "bold" }}>
                        Availability at Pearson Test Centers:
                      </Typography>
                      <ListItemText>
                        PTE Core and PTE Academic can be conveniently taken at
                        Pearson's authorized test centers, providing
                        accessibility and convenience to test takers globally.
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <Typography sx={{ width: "40%", fontWeight: "bold" }}>
                        Consistent Score Reporting:
                      </Typography>
                      <ListItemText>
                        Regardless of whether one takes the PTE Core or PTE
                        Academic, the score report generated will exhibit
                        similar formats and content, offering a clear overview
                        of the individual's language proficiency performance.
                      </ListItemText>
                    </ListItem>
                  </List>
                </Box>
              </Box>
              <Box>
                <Typography component="h3" variant="h5">
                  Differences
                </Typography>
                <Typography component={"p"}>
                  The main difference is that PTE Core mainly focuses on
                  vocational and non-academic training. It tests your English
                  skills in real life rather than academic environments, as in
                  PTE Academic. Simply put, PTE Core is a new test for general
                  English skills, while PTE Academic is academic English skills.
                </Typography>
                <Box sx={{ my: 4 }}>
                  <SimpleTable
                    headerArray={[
                      [0, "Differences"],
                      [1, "PTE Academic"],
                      [2, "PTE Core"],
                    ]}
                    headerStyle={{
                      backgroundColor: "#0CAFFF",
                      borderRadius: "2rem",
                    }}
                    headerTextStyle={{
                      textAlign: "center",
                      color: "white",
                      fontSize: "1.2rem",
                    }}
                  >
                    <TableRow>
                      <TableCell
                        sx={{
                          ...cellStyles,
                        }}
                      >
                        Difference Question Type
                      </TableCell>
                      <TableCell
                        sx={{
                          ...cellStyles,
                        }}
                      >
                        Retell Lecture
                      </TableCell>
                      <TableCell
                        sx={{
                          ...cellStyles,
                        }}
                      >
                        Respond to a Situation
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          ...cellStyles,
                        }}
                      >
                        Difference Question Type
                      </TableCell>
                      <TableCell
                        sx={{
                          ...cellStyles,
                        }}
                      >
                        Write Essay
                      </TableCell>
                      <TableCell
                        sx={{
                          ...cellStyles,
                        }}
                      >
                        Write Email
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          ...cellStyles,
                        }}
                      >
                        Changes in Same Question Types(SWT)
                      </TableCell>
                      <TableCell
                        sx={{
                          ...cellStyles,
                        }}
                      >
                        5-75 words
                      </TableCell>
                      <TableCell
                        sx={{
                          ...cellStyles,
                        }}
                      >
                        25-50 words
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          ...cellStyles,
                        }}
                      >
                        Changes in Same Question Types(SST)
                      </TableCell>
                      <TableCell
                        sx={{
                          ...cellStyles,
                        }}
                      >
                        50-70 words, 10 min
                      </TableCell>
                      <TableCell
                        sx={{
                          ...cellStyles,
                        }}
                      >
                        20-30 words, 8 min
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          ...cellStyles,
                        }}
                      >
                        Changes in Same Question Types(HCS)
                      </TableCell>
                      <TableCell
                        sx={{
                          ...cellStyles,
                        }}
                      >
                        (-)
                      </TableCell>
                      <TableCell
                        sx={{
                          ...cellStyles,
                        }}
                      >
                        Remove
                      </TableCell>
                    </TableRow>
                  </SimpleTable>
                </Box>
              </Box>
              <Box>
                <Typography component="h3" variant="h5">
                  Alignment between PTE Core and CLB(Canadian Language
                  Benchmark)
                </Typography>

                <Box sx={{ my: 4 }}>
                  <SimpleTable
                    headerArray={[
                      [0, "CLB"],
                      [1, "PTE Core Listening"],
                      [2, "PTE Core Reading"],
                      [3, "PTE Core Speaking"],
                      [4, "PTE Core Writing"],
                    ]}
                    headerStyle={{
                      backgroundColor: "#0CAFFF",
                      borderRadius: "2rem",
                    }}
                    headerTextStyle={{
                      textAlign: "center",
                      color: "white",
                      fontSize: "1.2rem",
                    }}
                  >
                    <TableRow>
                      <TableCell
                        sx={{
                          ...cellStyles,
                        }}
                      >
                        10
                      </TableCell>
                      {Array.from({ length: 3 }).map((_, index) => (
                        <TableCellForPTECore content="89 - 90" key={index} />
                      ))}
                      <TableCellForPTECore content="90" />
                    </TableRow>
                    <TableRow>
                      <TableCellForPTECore content="9" />
                      <TableCellForPTECore content="82 - 88" />
                      <TableCellForPTECore content="78 - 87" />
                      <TableCellForPTECore content="84 - 88" />
                      <TableCellForPTECore content="88 - 89" />
                    </TableRow>
                    <TableRow>
                      <TableCellForPTECore content="8" />
                      <TableCellForPTECore content="71 - 81" />
                      <TableCellForPTECore content="69 - 77" />
                      <TableCellForPTECore content="76 - 83" />
                      <TableCellForPTECore content="79 - 87" />
                    </TableRow>
                    <TableRow>
                      <TableCellForPTECore content="7" />
                      <TableCellForPTECore content="60 - 70" />
                      <TableCellForPTECore content="60 - 68" />
                      <TableCellForPTECore content="68 - 75" />
                      <TableCellForPTECore content="69 - 78" />
                    </TableRow>
                    <TableRow>
                      <TableCellForPTECore content="6" />
                      <TableCellForPTECore content="50 - 59" />
                      <TableCellForPTECore content="51 - 59" />
                      <TableCellForPTECore content="59 - 67" />
                      <TableCellForPTECore content="60 - 68" />
                    </TableRow>
                    <TableRow>
                      <TableCellForPTECore content="5" />
                      <TableCellForPTECore content="39 - 49" />
                      <TableCellForPTECore content="42 - 50" />
                      <TableCellForPTECore content="51 - 58" />
                      <TableCellForPTECore content="51 - 59" />
                    </TableRow>
                    <TableRow>
                      <TableCellForPTECore content="4" />
                      <TableCellForPTECore content="28 - 38" />
                      <TableCellForPTECore content="33 - 41" />
                      <TableCellForPTECore content="42 - 50" />
                      <TableCellForPTECore content="41 - 50" />
                    </TableRow>
                    <TableRow>
                      <TableCellForPTECore content="3" />
                      <TableCellForPTECore content="18 - 27" />
                      <TableCellForPTECore content="24 - 32" />
                      <TableCellForPTECore content="34 - 41" />
                      <TableCellForPTECore content="32 - 40" />
                    </TableRow>
                  </SimpleTable>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export default PTECorePage;
