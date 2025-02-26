import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import CourseFormComponent from "../../../../components/Backend/Admin/Posts/CourseForm";

const Add = () => {
  return (
    <>
      <Box id="main" sx={{ width: "100%", p: 4 }}>
        <Box
          sx={{
            top: "1rem",

            position: "absolute",
            overflow: "visible",
            zIndex: 1500,
          }}
        >
          <Typography variant="h5">Course</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 0 }}>
            Add Course
          </Typography>
          <Box className="container-fluid">
            <div className="card">
              <Link
                to={"/admin/course"}
                style={{
                  textDecoration: "none",

                  display: "flex",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#2196f3",
                    color: "#000",
                    "&:hover": {
                      bgcolor: "white",
                    },
                    mb: 2,
                  }}
                >
                  <ArrowBackIcon></ArrowBackIcon> Back
                </Button>
              </Link>
            </div>
          </Box>
        </Box>
        <CourseFormComponent
          edit=""
          category="course"
          addPath="courses"
        ></CourseFormComponent>
      </Box>
    </>
  );
};

export default Add;
