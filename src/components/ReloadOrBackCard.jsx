import { Box, Button, Card, CardContent, CardHeader } from "@mui/material";
import React from "react";
import ReportIcon from "@mui/icons-material/Report";
function ReloadOrBackCard({ header }) {
  return (
    <Card sx={{ boxShadow: 5 }}>
      <CardHeader
        title={<ReportIcon sx={{ width: "2rem", color: "red" }} />}
        subheader={header}
      ></CardHeader>
      <CardContent>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "orange",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
            onClick={() => window.location.reload()}
          >
            <lord-icon
              src="https://cdn.lordicon.com/afixdwmd.json"
              trigger="loop"
              style={{ width: "60px", height: "40px" }}
            ></lord-icon>
            Reload
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "yellowgreen",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
            onClick={() => window.history.back()}
          >
            <lord-icon
              src="https://cdn.lordicon.com/tfwhvbiq.json"
              trigger="loop"
              style={{ width: "60px", height: "40px" }}
            ></lord-icon>
            Back
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ReloadOrBackCard;
