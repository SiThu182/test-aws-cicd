import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

function CardComponent(props) {
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

    maxWidth: "20rem",
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

  const contentStyle = {
    px: 2,
    pt: 1,
    mb: 1,
    display: "flex",
    justifyContent: "space-between",
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
      <Card
        sx={{
          ...cardStyle,
        }}
      >
        <CardContent sx={{ ...contentStyle }}>
          <Box>
            <Typography
              gutterBottom
              variant="h5"
              color={"#fff"}
              component="div"
            >
              {props.number}
            </Typography>
            <Typography variant="h5" sx={{ fontSize: "1.3rem" }} color={"#fff"}>
              {props.title}
            </Typography>
          </Box>
          <Box sx={{ position: "relative" }}>{props.children}</Box>
        </CardContent>
        <CardActions sx={{ backgroundColor: "rgb(1 119 186)" }}>
          <Button
            onClick={() => navigate(props.path)}
            size="small"
            sx={{ ...btnStyle }}
          >
            More Info
            <ArrowForwardIcon></ArrowForwardIcon>
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default CardComponent;
