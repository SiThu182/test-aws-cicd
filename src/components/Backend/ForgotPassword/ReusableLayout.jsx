import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Divider } from "@mui/material";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useNavigate } from "react-router-dom";

// import { fetchUserAsync } from "../../../redux/thunk/users";

import { FormStyle } from "../FormStyle";

export default function ReusableLayout(props) {
  let { title, children,backPath } = props;

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        ...FormStyle.bg,
      }}
    >
      <KeyboardBackspaceIcon
        sx={{ position: "absolute", top: 4, left: "1rem", cursor: "pointer" }}
        onClick={() => navigate(backPath)}
      ></KeyboardBackspaceIcon>
      {/* <Alert id="alert" onClose={() => close()}>
        This is a success alert — check it out!
      </Alert> */}

      <Card
        sx={{
          ...FormStyle.card,
          height: "auto",
          width: {
            xs: "80vw",
            sm: "60vw",
            md: "40vw",
          },
        }}
      >
        <Box
          sx={{
            ...FormStyle.yellow,
          }}
        />
        <Box
          sx={{
            ...FormStyle.blue,
          }}
        />
        <Box
          sx={{
            ...FormStyle.red,
          }}
        />
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <img
            // src="http://localhost:3000/Image/AigmaLogo.png"
            src={process.env.REACT_APP_FRONTEND_URL + "Image/AigmaLogo.png"}
            alt="pte-logo"
            style={{
              ...FormStyle.img,
            }}
          />
        </Box>

        <CardContent
          sx={{
            ...FormStyle.content,
          }}
        >
          <Divider></Divider>
          <Typography
            variant="h5"
            sx={{ ...FormStyle.formHeading }}
            color="text.secondary"
          >
            {title}
          </Typography>

          {children}
        </CardContent>
        <CardActions
          sx={{
            ...FormStyle.cardAction,
          }}
        >
          <Box
            sx={{
              ...FormStyle.terms,
              mt: "5rem",
            }}
          >
            <Typography sx={{ ...FormStyle.termsFont }}>
              Terms & Condition
            </Typography>
            <span>|</span>
            <Typography sx={{ ...FormStyle.termsFont }}>
              Privacy & Policy
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
