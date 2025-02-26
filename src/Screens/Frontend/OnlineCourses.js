import { Box,Typography } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Frontend/Layout";

import { useDispatch, useSelector } from "react-redux";

import { FetchStudentFeedbackFrontendAsync } from "../../redux/thunk/Feedback";
import { CourseCarousel } from "../../components/Frontend/OnlineCourses/CourseCarousel";
import StudentImageCarousel from "../../components/Frontend/OnlineCourses/StudentImageCarousel";
import Testimonial from "./Testimonial";
import StudentVideoCarousel from "../../components/Frontend/OnlineCourses/StudentVideoCarousel";
//import InstructorInfo from "../../components/Frontend/OnlineCourses/InstructorInfo";
import PteShowCase from "../../components/Frontend/Home/PteShowCase";
import CourseTimeTable from "../../components/Frontend/OnlineCourses/CourseTimeTable";
import InstructorCarousel from "../../components/Frontend/OnlineCourses/InstructorCarousel";
export const CourseContext = createContext("course");
function OnlineCourses() {
  const [studyWeeks, setStudyWeeks] = useState();
  const [courseName, setCourseName] = useState();
  const { feedback, feedbackStatus, feedbackError } = useSelector(
    (state) => state.studentFeedback
  );

  const [stories, setStories] = useState();
  const [feedbacks, setFeedbacks] = useState();
  const [scoreCards, setScoreCards] = useState();
  console.log(studyWeeks);
  console.log("studyWeeks");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      FetchStudentFeedbackFrontendAsync({ path: "student-feedback-list" })
    );
  }, [dispatch]);

  useEffect(() => {
    if (feedbackStatus === "succeeded") {
      console.log(feedback);
      let assignFeedbackByTypes = (type, setTypeArray) => {
        console.log("assigning");
        console.log(feedback[type]);
        if (feedback[type]?.length > 0) {
          setTypeArray([...feedback[type]]);
        } else {
          setTypeArray([]);
        }
      };
      assignFeedbackByTypes("Feedback", setFeedbacks);
      assignFeedbackByTypes("Score Card", setScoreCards);
      assignFeedbackByTypes("Stories", setStories);
    }
  }, [feedback, feedbackStatus]);

  return (
    <>
      <Layout>
        <Box
          sx={{
            width: "100%",
            // height: "70vh",
            // backgroundImage: `url(${process.env.REACT_APP_FRONTEND_URL}Image/subscription_banner.png)`,
            // backgroundPosition: "center",
            // backgroundSize: "cover",
            // backgroundAttachment: "fixed",
            // backgroundBlendMode: "overlay",
          }}
        >
          <img
            src={`${process.env.REACT_APP_FRONTEND_URL}Image/course_banner.png`}
            alt="subscription-banner"
            style={{ width: "100%" }}
          />
        </Box>
        {/* <CourseContext.Provider
          value={{
            studyWeeks: studyWeeks,
            setStudyWeeks: setStudyWeeks,
            courseName: courseName,
            setCourseName: setCourseName,
          }}
        >
          <CourseCarousel></CourseCarousel>
          <CourseTimeTable />
          <PteShowCase></PteShowCase>
          <Box
            sx={{
              width: "80vw",
              height: "90vh",
              maxWidth: "1300px",
              margin: "0 auto",
            }}
          >
            <Testimonial
              feedbacks={feedbacks}
              state={feedbackStatus}
            ></Testimonial>
          </Box>

          <StudentImageCarousel
            scoreCards={scoreCards}
            state={feedbackStatus}
          />
          <StudentVideoCarousel stories={stories} state={feedbackStatus} />
          <InstructorCarousel />
        </CourseContext.Provider> */}
        <Typography sx={{ mx: 2, my: 2 }} variant="h4">
          Coming soon...
        </Typography>
      </Layout>
    </>
  );
}

export default OnlineCourses;
