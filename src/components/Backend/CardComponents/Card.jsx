import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";

function DashboardCard(props) {
  const { pages } = props;
 
  const navigate = useNavigate();
  const cardStyle = {
    width: {
      xl: "20%",
      lg: "15rem",
      xs: "15rem",
    },
    height: {
      xs: "auto",
    },

    backgroundColor: "rgb(25 156 229)",
    color: "#fff",
    my: "0.5rem",
    mr: "0.5rem",
    "@keyframes widthCard-increase": {
      "0%": {
        opacity: "0",
        transform: "scale(0.5)",
      },
      "100%": {
        opacity: "1",
        transform: "scale(1)",
      },
    },
    animation: "1s widthCard-increase ease ",
  };
  const btnStyle = {
    margin: "auto",
    color: "#ffff",
    "&:hover": {
      color: "#000",
    },
  };

  return (
    <>
      {pages.map((page, index) => (
        <Card sx={{ ...cardStyle }} key={index}>
          <CardContent sx={{ textAlign: "center", p: 0 }}>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              sx={{ pt: 2, fontSize: "1.7rem" }}
            >
              {page[0] === "" ? (
                <CircularProgress size={"1rem"}></CircularProgress>
              ) : (
                page[0]
              )}
            </Typography>
            <Typography
              variant="h5"
              color="#fff"
              sx={{
                fontSize: "1.1rem",
                fontWeight: "600",

                height: "3rem",
              }}
            >
              {page[1]}
            </Typography>
          </CardContent>
          <CardActions sx={{ backgroundColor: "rgb(1 119 186)" }}>
            <Button
              size="small"
              sx={{ ...btnStyle }}
              onClick={() => navigate(page[2])}
            >
              More Info
              <ArrowForwardIcon></ArrowForwardIcon>
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
}

export default DashboardCard;
