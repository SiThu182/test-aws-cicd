import React from "react";
import { ReusableCarousel } from "../OnlineCourses/CourseCarousel";

function PteCourse() {
  localStorage.setItem("path", "aigmapte");
  return (
    <>
      <ReusableCarousel id={1} courseType="PTE"></ReusableCarousel>
    </>
  );
}

export default PteCourse;
