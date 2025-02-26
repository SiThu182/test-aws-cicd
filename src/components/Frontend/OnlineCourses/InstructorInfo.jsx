import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, CardMedia, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import FolderIcon from "@mui/icons-material/Folder";
import ListItemText from "@mui/material/ListItemText";

const InstructorInfo = (props) => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const frontEndURL = process.env.REACT_APP_FRONTEND_URL;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let nang_yoon_ts = [
    "SAT - 1360 / 1600",
    " EF test - 74 / 100",
    " BBC score - 560/ 600 ",
    " Duolingo score - 140/160",
  ];
  let nang_yoon_qua = [
    "Law student, Mandalay University",
    "Completed High School, Wisdom Villa Education Center",
    "Certificate - 4 skills in English for Young Adults (Intermediate) with Grade A+ (Issued by Strategy First University)",
    "A recipient of Merit Scholarship awarded by SUNY Korea",
  ];

  // function generate(element) {
  //   return nang_yoon.map((value) =>
  //     React.cloneElement(element, {
  //       key: value,
  //     }),
  //   );
  // }

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <React.Fragment>
      <Button variant="text" onClick={handleClickOpen}>
        Learn More
      </Button>
      <Dialog fullWidth="false" maxWidth="md" open={open} onClose={handleClose}>
        {/* <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle> */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ my: 3 }}>
          {props.instructor == "naydoon" ? (
            <>
              <Box>
                <Card>
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      <CardMedia
                        component="img"
                        height="70%"
                        image={frontEndURL + "Image/SND.png"}
                        title="green iguana"
                        sx={{ mt: 2 }}
                      />
                      <Typography
                        variant="h6"
                        mt={2}
                        sx={{ textAlign: "center" }}
                      >
                        Tr. Nay Doon
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ textAlign: "center" }}
                      >
                        PTE Instructor
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography>
                        Hello, I am Tr.Saw who is a seasoned language instructor
                        specializing in IELTS, TOEFL, and PTE preparation. Over
                        the course of my 13-year career, I have successfully
                        guided countless students toward achieving their desired
                        scores, enabling them to pursue academic and
                        professional opportunities around the world. My teaching
                        approach is dynamic, student-centered, and tailored to
                        individual learning styles, fostering an engaging and
                        effective learning environment. I am passionate about
                        guiding students through their language proficiency
                        journey, and I am confident in my ability to contribute
                        positively to any learning environment.
                      </Typography>
                      <Typography variant="h5" mt={2}>
                        Qualification
                      </Typography>
                      <Demo>
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
                            <Typography>LL.B</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography> Diploma in English (MUFL)</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>
                              {" "}
                              Diploma in Political Science
                            </Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>
                              {" "}
                              Diploma in International Law
                            </Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>
                              Single Subject Diploma in Business Law( ICM,UK )
                            </Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>
                              Executive Diploma in English Language Teaching
                              (LQB )
                            </Typography>
                          </ListItem>
                        </List>
                      </Demo>
                    </Grid>
                  </Grid>
                </Card>
              </Box>
            </>
          ) : props.instructor == "nangyoon" ? (
            <>
              <Box>
                <Card>
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      <CardMedia
                        component="img"
                        height="70%"
                        image={frontEndURL + "Image/ny.png"}
                        title="instructor image"
                      />
                      <Typography variant="h6" sx={{ textAlign: "center" }}>
                        Tr. Nang Yoon
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ textAlign: "center" }}
                      >
                        PTE Instructor
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography>
                        Hi, my name is Nang Yoon. I am a trained PTE teacher
                        with over 3 years of experience. I have a variety of
                        teaching experiences, including PTE, general English,
                        and the Duolingo English Test. Throughout my career, I
                        have used flexible teaching strategies to assist
                        numerous students in overcoming their struggles and
                        achieving their desired scores. My goal is to develop
                        various approaches that meets the needs of my students.
                      </Typography>
                      <Typography variant="h5" mt={2}>
                        Qualification
                      </Typography>
                      <Demo>
                        <List dense={dense}>
                          {nang_yoon_qua.map((test_score) => {
                            return (
                              <>
                                <ListItem>
                                  <ListItemText primary={test_score} />
                                </ListItem>
                              </>
                            );
                          })}
                        </List>
                      </Demo>

                      <Typography sx={{ mt: 4 }} variant="h6" component="div">
                        Test Score
                      </Typography>
                      <Demo>
                        <List dense={dense}>
                          {nang_yoon_ts.map((test_score) => {
                            return (
                              <>
                                <ListItem>
                                  <ListItemText primary={test_score} />
                                </ListItem>
                              </>
                            );
                          })}
                        </List>
                      </Demo>
                    </Grid>
                  </Grid>
                </Card>
              </Box>
            </>
          ) : (
            props.instructor == "nyominlwin" && (
              <>
                <Box>
                  <Card>
                    <Grid container spacing={2}>
                      <Grid item xs={5}>
                        <CardMedia
                          component="img"
                          height="70%"
                          image={frontEndURL + "Image/NML.png"}
                          title="green iguana"
                          // sx={{mt:2}}
                        />
                        <Typography variant="h6" sx={{ textAlign: "center" }}>
                          Tr. Nyo Min Lwin
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{ textAlign: "center" }}
                        >
                          PTE Instructor
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography>
                          Hi, my name is Nang Yoon. I am a trained PTE teacher
                          with over 3 years of experience. I have a variety of
                          teaching experiences, including PTE, general English,
                          and the Duolingo English Test. Throughout my career, I
                          have used flexible teaching strategies to assist
                          numerous students in overcoming their struggles and
                          achieving their desired scores. My goal is to develop
                          various approaches that meets the needs of my
                          students.
                        </Typography>
                        <Typography variant="h5" mt={2}>
                          Qualification
                        </Typography>
                        <Demo>
                          <List dense={dense}>
                            {nang_yoon_qua.map((test_score) => {
                              return (
                                <>
                                  <ListItem>
                                    <ListItemText primary={test_score} />
                                  </ListItem>
                                </>
                              );
                            })}
                          </List>
                        </Demo>

                        <Typography sx={{ mt: 4 }} variant="h6" component="div">
                          Test Score
                        </Typography>
                        <Demo>
                          <List dense={dense}>
                            {nang_yoon_ts.map((test_score) => {
                              return (
                                <>
                                  <ListItem>
                                    <ListItemText primary={test_score} />
                                  </ListItem>
                                </>
                              );
                            })}
                          </List>
                        </Demo>
                      </Grid>
                    </Grid>
                  </Card>
                </Box>
              </>
            )
          )}

          {/* <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography> */}
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Closed
          </Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
};

export default InstructorInfo;
