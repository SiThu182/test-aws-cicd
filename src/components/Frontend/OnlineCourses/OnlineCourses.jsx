import { Box } from "@mui/material";
import React from "react";

import { CourseCarousel } from "./CourseCarousel";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function OnlineCourses() {
  const para = useParams();

  useEffect(() => {
    if (para.path !== "aigmapte") {
      localStorage.setItem("path", "smartedu");
    } else {
      localStorage.setItem("path", "aigmapte");
    }
  });

  return (
    <div>
      <Box sx={{ bgcolor: "rgb(231 239 254)", height: "auto", p: 2, pb: 20 }}>
        <CourseCarousel></CourseCarousel>
      </Box>
    </div>
  );
}

export default OnlineCourses;
