import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SearchIcon from "@mui/icons-material/Search";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Card,
  InputBase,
  Paper,
  Typography,
  Grid,
  Avatar,
  Rating,
  CardContent, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, 
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";

import ReadOnlyQuill from "../../components/Backend/Admin/Posts/ReadOnlyQuill";
import Layout from "../../components/Layout/Frontend/Layout";
import { FetchRecordingCourseFrontendAsync } from "../../redux/thunk/RecordingCourse";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListIcon from "@mui/icons-material/List";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";


import { ListItemIcon } from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircle';

import "./Blog.css";
import { Info } from "@mui/icons-material";
 
 
 import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { setPath } from "../../redux/slice/PathSlice";
 

const students = [
  {
    name: "John Doe",
    review: "Excellent in English Proficiency - Reading, Speaking, Writing, Listening.",
    image: "https://via.placeholder.com/150",
    rating: 5,
  },
  {
    name: "Jane Smith",
    review: "Achieved high scores in English proficiency tests.",
    image: "https://via.placeholder.com/150",
    rating: 4.5,
  },
  {
    name: "Jane Smith",
    review: "Achieved high scores in English proficiency tests.",
    image: "https://via.placeholder.com/150",
    rating: 4.5,
  },
  {
    name: "Jane Smith",
    review: "Achieved high scores in English proficiency tests.",
    image: "https://via.placeholder.com/150",
    rating: 4.5,
  },
  {
    name: "Jane Smith",
    review: "Achieved high scores in English proficiency tests.",
    image: "https://via.placeholder.com/150",
    rating: 4.5,
  },
];

const StudentCarousel = () => {
  return (
    <Box sx={{ maxWidth: "80%", margin: "auto", textAlign: "center", py: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        High Score Achiever Students
      </Typography>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={2}
        loop={true}
      >
        {students.map((student, index) => (
          <SwiperSlide key={index}>
            <Card sx={{ p: 2, boxShadow: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar src={student.image} />
                  <Typography fontWeight="bold">{student.name}</Typography>
                  <Rating value={student.rating} readOnly />
                </Box>
                <Typography variant="body2" mt={2}>{student.review}</Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

 


function RecordingCourse() {
   
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recordingCourseFrontend, recordingCourseFrontendStatus } = useSelector(
    (state) => state.recordingCourse
  );
    
  

  useEffect(() => {
    dispatch(FetchRecordingCourseFrontendAsync({ path: "recording-course-frontend" }));
  }, [dispatch]);
  const [isPlaying, setIsPlaying] = useState(false);


  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  if (recordingCourseFrontendStatus !== "succeeded") {
    return <div>Loading...</div>;
  }
  console.log(recordingCourseFrontendStatus, "<<<Status", recordingCourseFrontend);

  const courseContent = {
    introduction: JSON.parse(recordingCourseFrontend.introduction),
    speaking: JSON.parse(recordingCourseFrontend.speaking),
    reading: JSON.parse(recordingCourseFrontend.reading),
    writing: JSON.parse(recordingCourseFrontend.writing),
    listening: JSON.parse(recordingCourseFrontend.listening),
  };

  const clickBuyHandler = () => {
      dispatch(setPath());
      navigate("/recording-course/form", {
        state: {
          plan: recordingCourseFrontend,
        },
      });
    };

  return (
    <Layout speaking="Recording Course">
       
      <Box sx={{ bgcolor: "rgb(231 239 254)", p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            background: "whitesmoke",
            borderRadius: "1rem",

            width: "90%",
            mx: "auto",
            p: 3,
          }}
        >
          <Box
            sx={{
              width: "60%",
            }}
          > 
              <Box sx={{ my: 4, p: 2 }}>
              <Typography variant="h5" fontWeight="bold">{recordingCourseFrontend.title}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>{recordingCourseFrontend.sub_title}</Typography>
            </Box>

            <Box
              sx={{
                position: "relative",
                width: "100%", // Adjust as needed
                height: "340px",
                backgroundColor: "black",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {isPlaying ? (
                // Video Player
                <video
                  width="100%"
                  height="100%"
                  controls
                  autoPlay
                  style={{ borderRadius: 8 }}
                >
                  <source src={process.env.REACT_APP_BACKEND_URL+"storage/" +recordingCourseFrontend.video_file } type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                // Thumbnail with Play Button
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}storage/${recordingCourseFrontend.vd_thumbnail}')`, // Replace with your thumbnail
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsPlaying(true)}
                >
                  <Button
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.6)",
                      borderRadius: "50%",
                      p: 2,
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                    }}
                  >
                    <PlayCircleIcon sx={{ fontSize: 60, color: "white" }} />
                  </Button>
                </Box>
              )}
            </Box>
              
               
         
         
        
            <Card sx={{ my: 3, p: 2 }}>
              <Typography variant="h5" fontWeight="bold">What you'll learn:</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="10 scored section mock tests - 7 Reading & 3 Listening" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Experienced Trainer with 5+ years of experience" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Monthly Prediction File based on past exam patterns" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={6}>
                  <List sx={{ lineHeight: 1.5, listStyleType: 'disc', pl: 2 }}>
                    <ListItem  >
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Quizzes after every video to reinforce concepts" />
                    </ListItem>
                    <ListItem  >
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Coaching for all modules of PTE" />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Card>
             {/* About Course */}
            {/* <Box sx={{ my: 4, p: 2 }}>
              <Typography variant="h5" fontWeight="bold">About Course</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac eros tincidunt...</Typography>
            </Box> */}


      {/* Course Content */}
      <Card sx={{ mb: 3, p: 2 }}>
          <Typography variant="h5" fontWeight="bold">Course Content</Typography>
          <Typography variant="body2">{recordingCourseFrontend.course_content}</Typography>
          {Object.keys(courseContent).map((section, index) => (
            <Accordion key={index} expanded={expanded === section} onChange={handleChange(section)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ mt: 1, bgcolor: expanded === section ? "#0050ff" : "white", transition: "background-color 0.3s ease" }}>
                <Typography>{section.charAt(0).toUpperCase() + section.slice(1)}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {courseContent[section].map((lecture, idx) => (
                    <ListItem key={idx}>
                      <ListItemText primary={lecture} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Card>

      {/* Description & Features */}
     { recordingCourseFrontend !== undefined && (
      <>
      
      
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold">Requirement:</Typography>
           <ReadOnlyQuill
              delta={recordingCourseFrontend.requirement}
              quillClass={"front-rc"}
            />
      </Box>

      
      <Box sx={{ mb: 3, p: 2, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold">Descritpion:</Typography>
         
            <ReadOnlyQuill
              delta={recordingCourseFrontend.description}
              quillClass={"front-rc"}
            />
      </Box>
      </>
     )}
      
      <StudentCarousel /> 
      </Box>
      <Box
        sx={{
          width: "40%",
        }}
      >
          <Card sx={{ maxWidth: 345, p: 2, borderRadius: 3, boxShadow: 3,mx: "auto" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                US$ {recordingCourseFrontend.fees}
                  {/* <s style={{ color: "gray" }}>$30.13</s> */}
              </Typography>
              {/* <Box
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  display: "inline-block",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                20% OFF
              </Box> */}

              <Box mt={2}>
                <Button
                    variant="outlined"
                    // sx={{ ...CardStyle.subscribeBtn }}
                    onClick={() => clickBuyHandler()}
                  >
                    Buy
                </Button>                {/* <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<FavoriteBorderIcon />}
                  sx={{ mt: 1 }}
                >
                  Wishlist
                </Button> */}
              </Box>

              <Box mt={2}>
                {/* <Typography display="flex" alignItems="center" gap={1}>
                  <ListIcon /> 22 Sections
                </Typography>
                <Typography display="flex" alignItems="center" gap={1}>
                  <VideoLibraryIcon /> 152 Lectures
                </Typography>
                <Typography display="flex" alignItems="center" gap={1}>
                  <AccessTimeIcon /> 21h 33m total lengths
                </Typography>
                <Typography display="flex" alignItems="center" gap={1}>
                  <LanguageIcon /> English
                </Typography> */}
                  <ReadOnlyQuill
                      delta={recordingCourseFrontend.course_includes}
                      quillClass={"front-rc"}
                    />
                
              </Box>
              {/* 
              <Box mt={2}>
                <Typography>✔ How to score 79+ in your PTE.</Typography>
                <Typography>✔ English Proficiency - Reading, Speaking, Writing, Listening Modules.</Typography>
                <Typography>✔ Ways to beat the PTE algorithm.</Typography>
                <Typography>✔ Coaching for all modules of PTE.</Typography>
                <Typography>✔ Learn all HACKS & Strategies of PTE based on real experiments.</Typography>
              </Box> */}
            </CardContent>
          </Card>
      </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default RecordingCourse;
