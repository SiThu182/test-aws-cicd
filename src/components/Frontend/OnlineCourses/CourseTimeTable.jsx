import React, { useContext } from "react";
import { Box, Typography, List, ListItem, ListItemIcon } from "@mui/material";
import { CourseContext } from "../../../Screens/Frontend/OnlineCourses";
function CourseTimeTable() {
  const { studyWeeks, courseName } = useContext(CourseContext);
  return (
    <Box sx={{ background: "rgb(231 239 254)" }} id={"timetable"}>
      <Box>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#2196f3",
            fontWeight: "bolder",
            py: "2rem",
          }}
        >
          Online PTE Class Timetable
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "#616161",
            textAlign: "center",
            mx: "auto",
            width: "80%",
          }}
        >
          AIGMAPTE AI Online Classes Timetable covers all four crucial modules
          of PTE: PTE reading class, PTE writing class, PTE speaking class, and
          PTE listening class. Our PTE expert trainers promise to provide
          comprehensive guidance to students with an aim to help them achieve
          PTE target.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {studyWeeks?.map((s) => (
            <Box
              key={s.id}
              sx={{
                borderRadius: "1rem",
                minWidth: "350px",
                maxWidth: "650px",
                overflow: "hidden",
                margin: "2rem",
                flexGrow: 1,
                boxShadow: 4,
                backgroundColor: "white",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#2196f3",
                  minHeight: "50px",
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                }}
              >
                <Box sx={{ width: "40%" }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {s.week_name}
                  </Typography>
                </Box>
                <Box sx={{ borderLeft: "2px solid white", py: 2, mx: 2 }} />
                <Typography
                  sx={{
                    color: "white",

                    // whiteSpace: "nowrap",
                    // textOverflow: "ellipsis",
                    // overflow: "hidden",
                  }}
                >
                  {courseName} {s.time}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  borderTop: "1px solid white",
                  backgroundColor: "white",
                  display: "flex",
                  overflowX: "auto",
                }}
              >
                {JSON.parse(s.days).map((d, index) => (
                  <Box
                    key={index}
                    sx={{
                      flexGrow: 1,
                      minWidth: "150px",
                      borderLeft: "1px solid white",
                      borderRight: "1px solid white",
                      backgroundColor: "white",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#2196f3",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "3rem",
                        color: "white",
                      }}
                    >
                      <Typography variant="h5">{d}</Typography>
                    </Box>
                    <Box sx={{ padding: 2 }}>
                      <List sx={{ width: "80%", backgroundColor: "white" }}>
                        {JSON.parse(s.day_description)[index].map(
                          (description, dindex) => (
                            <ListItem sx={{ padding: 0 }} key={dindex}>
                              <ListItemIcon
                                sx={{
                                  minWidth: "25px",
                                }}
                              >
                                <i
                                  class="fa-solid fa-circle-check"
                                  style={{ color: "green" }}
                                ></i>
                              </ListItemIcon>
                              <Typography
                                variant="span"
                                sx={{ wordWrap: "break-word" }}
                              >
                                {description}
                              </Typography>
                            </ListItem>
                          )
                        )}
                      </List>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
          {(studyWeeks == null ||
            studyWeeks == undefined ||
            studyWeeks?.length == 0) && (
            <Typography sx={{ textAlign: "center", color: "grey", my: 2 }}>
              Chosen course do not have detail study weeks
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default CourseTimeTable;
