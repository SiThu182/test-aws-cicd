import { Box, Typography } from "@mui/material";
import React, { createContext, useState } from "react";

import CourseCarousel from "../../components/Frontend/OnlineCourses/OnlineCourses";
import Layout from "../../components/Layout/Frontend/Layout";
import CourseTimeTable from "../../components/Frontend/OnlineCourses/CourseTimeTable";
import StudentImageCarousel from "../../components/Frontend/OnlineCourses/StudentImageCarousel";
import InstructorCarousel from "../../components/Frontend/OnlineCourses/InstructorCarousel";
import StudentVideoCarousel from "../../components/Frontend/OnlineCourses/StudentVideoCarousel";
export const CourseContext = createContext("course");
function OnlineCourses() {
  const [studyWeeks, setStudyWeeks] = useState();
  const [courseName, setCourseName] = useState();
  console.log(studyWeeks);
  console.log("studyWeeks");
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
          <StudentImageCarouqsel />
          <StudentVideoCarousel />
          <InstructorCarousel />
        </CourseContext.Provider>
        {/* <Typography variant="h4"> Coming soon...</Typography> */}
      </Layout>
    </>
  );
}

export default OnlineCourses;
