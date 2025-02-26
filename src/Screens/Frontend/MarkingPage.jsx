import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Layout from "../../components/Layout/Frontend/Layout";
import { Box } from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#041E42",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name,
  speaking,
  reading,
  writing,
  listening,
  totalMark,
  questionNumbers,
  scorePerQuestion
) {
  return {
    name,
    speaking,
    reading,
    writing,
    listening,
    totalMark,
    questionNumbers,
    scorePerQuestion,
  };
}

const rows = [
  createData("Repeat Sentence", 32, 0, 0, 19, 51, "10-12", 13),
  createData("Read Aloud", 22, 26, 0, 0, 48, "6-7", 15),
  createData("Write From Dictation", 0, 0, 26, 21, 47, "3-4", 12),
  createData("R&W Fill in the Blank", 0, 18, 16, 0, 34, "5-6", "3-5"),
  createData("Summarized Spoken Text", 0, 0, 11, 14, 25, "2-3", 10),
  createData("Describe Image", 22, 0, 0, 0, 22, "6-7", 15),
  createData("Retell Lecture", 12, 0, 0, 10, 22, "3-4", 15),
  createData("Highlight Incorrect Word", 12, 0, 0, 10, 17, "2-3", "4-6"),
  createData("Summarize Written Text", 0, 4, 13, 0, 17, "2-3", 7),
  createData("Write Essay", 0, 0, 16, 0, 16, "1-2", "15"),
  createData("R Fill in the Blank", 0, 15, 0, 0, 15, "4-5", "3-5"),
  createData("L Fill in the Blank", 0, 0, 8, 6, 14, "2-3", "3-5"),
  createData("Answer Short Questions", 2, 0, 0, 6, 8, "10-12", "1"),
  createData("Re-order Paragraphs", 0, 7, 0, 0, 7, "2-3", "3-4"),
  createData("R Multiple Answers", 0, 5, 0, 0, 5, "2-3", "2-3"),
  createData("L Multiple Answers", 0, 0, 0, 3, 3, "2-3", "2-3"),
  createData("Highlight Correct Summary", 0, 2, 0, 1, 3, "2-3", 1),
  createData("R Single Answer", 0, 2, 0, 0, 2, "2-3", 1),
  createData("L Single Answer", 0, 0, 0, 1, 1, "2-3", 1),
  createData("Select Missing Word", 0, 0, 0, 1, 1, "2-3", 1),
];

export default function MarkingPage() {
  return (
    <Layout>
      <Box
        sx={{
          bgcolor: "rgb(231 239 254)",
          display: "flex",
          justifyContent: "center",

          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "80%",
            maxWidth: "1400px",
            px: "2rem",
            py: "2rem",
          }}
        >
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700, bgcolor: "inherit" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell colSpan={1} sx={{ textAlign: "center" }}>
                    Section (Category)
                  </StyledTableCell>
                  <StyledTableCell colSpan={7} sx={{ textAlign: "center" }}>
                    Mark Contribution
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right">Total Mark</StyledTableCell>
                  <StyledTableCell align="right">
                    Question Numbers
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Score per Question
                  </StyledTableCell>
                  <StyledTableCell align="right">Speaking</StyledTableCell>
                  <StyledTableCell align="right">Reading</StyledTableCell>
                  <StyledTableCell align="right">Writing</StyledTableCell>
                  <StyledTableCell align="right">Listening</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{ borderRight: "1px solid #d7cbcb" }}
                    >
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.totalMark !== 0 ? row.totalMark : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.questionNumbers !== 0 ? row.questionNumbers : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.scorePerQuestion !== 0 ? row.scorePerQuestion : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.speaking !== 0 ? row.speaking : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.reading !== 0 ? row.reading : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.writing !== 0 ? row.writing : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.listening !== 0 ? row.listening : "-"}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <StyledTableRow>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    sx={{
                      background: "yellow",
                      textAlign: "center",
                      borderRight: "1px solid #d7cbcb",
                    }}
                  >
                    Final Mark
                  </StyledTableCell>
                  <StyledTableCell align="right">360</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right">90</StyledTableCell>
                  <StyledTableCell align="right">90</StyledTableCell>
                  <StyledTableCell align="right">90</StyledTableCell>
                  <StyledTableCell align="right">90</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Layout>
  );
}
