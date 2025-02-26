import React from "react";
import { useNavigate } from "react-router-dom";

function WritingComponent(props) {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
 
 
  return (
    <>
      {/* <Box
        sx={{
          width: "80%",
          m: "0 auto",
          backgroundColor: "#4dabf5",
          borderRadius: "1rem",
          p: 2,
        }}
      >
        <Typography variant="h5" color="white">
          Mock Test List
        </Typography>
        {props.tests.map((t, index) => (
          <Box
            sx={{
              width: "100%",
              height: "4rem",
              borderBottom: "1px solid black",
              display: "flex",
              backgroundColor: "white",
              borderRadius: "0.2rem",
              boxShadow: 5,
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ width: "60%", textAlign: "left", p: 2 }}>
              {t[0][0]}
            </Typography>
            <Button
              variant="contained"
              sx={{ height: "50%", m: 2 }}
              onClick={() => navigate(t[0][1])}
            >
              Take Test
            </Button>
          </Box>
        ))}
      </Box> */}

      {/* <Box
            sx={{
              ...cardBox,
              position: "relative",
            }}
            onClick={() => navigate(t[0][1])}
          >
            <Box sx={{ display: "", justifyContent: "space-between" }}>
              <Typography
                fontWeight={400}
                sx={{
                  fontSize: "1rem",
                  backgroundColor: "rgb(231,239,254)",
                  p: 0.5,
                  color: "black",
                  borderRadius: "1rem",
                  borderTopRightRadius: "1rem",
                  boxShadow: 5,
                  mt: "1.5rem",
                }}
              >
                This AI practice test comprises of 4 modules in PTE Academic:
                Speaking, Writing, Reading and Listening.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  fontWeight={400}
                  sx={{ ...ellipsisStyle }}
                  variant="h6"
                >
                  {t[0][0]}
                </Typography>
                <Typography variant="h6">50/50</Typography>
              </Box>
            </Box>
            <Button variant="contained">Take Test</Button>

            <Typography
              sx={{
                backgroundColor: "#ffef62",
                width: "60%",
                px: 2,
                position: "absolute",
                top: 0,
                right: 1,
                color: "red",
                borderRadius: "0.2rem",
                borderTopRightRadius: "1rem",
              }}
            >
              Not Taken Yet
            </Typography>
          </Box> */}
      {/* <Box
          sx={{
            ...cardBox,
            position: "relative",
          }}
          onClick={() => navigate("/mockup/test")}
        >
          <Box sx={{ display: "", justifyContent: "space-between" }}>
            <Typography
              fontWeight={400}
              sx={{
                fontSize: "1rem",
                backgroundColor: "rgb(231,239,254)",
                p: 0.5,
                color: "black",
                borderRadius: "1rem",
                borderTopRightRadius: "1rem",
                boxShadow: 5,
                mt: "1.5rem",
              }}
            >
              This AI practice test comprises of 4 modules in PTE Academic:
              Speaking, Writing, Reading and Listening.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontWeight={400} variant="h6">
                Mock Test -2
              </Typography>
              <Typography variant="h6">50/50</Typography>
            </Box>
          </Box>
          <Button variant="contained">Take Test</Button>

          <Typography
            sx={{
              backgroundColor: "#ffef62",
              width: "60%",
              px: 2,
              position: "absolute",
              top: 0,
              right: 1,
              color: "red",
              borderRadius: "0.2rem",
              borderTopRightRadius: "1rem",
            }}
          >
            Not Taken Yet
          </Typography>
        </Box>

        <Box
          sx={{
            ...cardBox,
            position: "relative",
          }}
          onClick={() => navigate("/mockup/test")}
        >
          <Box sx={{ display: "", justifyContent: "space-between" }}>
            <Typography
              fontWeight={400}
              sx={{
                fontSize: "1rem",
                backgroundColor: "rgb(231,239,254)",
                p: 0.5,
                color: "black",
                borderRadius: "1rem",
                borderTopRightRadius: "1rem",
                boxShadow: 5,
                mt: "1.5rem",
              }}
            >
              This AI practice test comprises of 4 modules in PTE Academic:
              Speaking, Writing, Reading and Listening.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontWeight={400} variant="h6">
                Mock Test -3
              </Typography>
              <Typography variant="h6">50/50</Typography>
            </Box>
          </Box>
          <Button variant="contained">Take Test</Button>

          <Typography
            sx={{
              backgroundColor: "#ffef62",
              width: "60%",
              px: 2,
              position: "absolute",
              top: 0,
              right: 1,
              color: "red",
              borderRadius: "0.2rem",
              borderTopRightRadius: "1rem",
            }}
          >
            Not Taken Yet
          </Typography>
        </Box> */}
    </>
  );
}

export default WritingComponent;
