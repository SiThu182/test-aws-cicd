import { Box, Divider, Typography } from "@mui/material";
import React from "react";

function ErrorTooltipContent({ error, replacements, lastIndex }) {
  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontSize: "1.1rem", color: "red" }}>
            Error :{" "}
          </Typography>
          <Typography variant="p" style={{ fontSize: "1rem" }}>
            {error}
          </Typography>
        </Box>
        <Divider sx={{ m: 1 }}></Divider>
        {replacements.length !== 0 && (
          <Box>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontSize: "1.1rem", color: "green" }}
              >
                Suggestion :{" "}
              </Typography>
              <Typography style={{ fontSize: "1rem", padding: 2 }}>
                {replacements.map((r, index) => (
                  <span>
                    {r.value} {index == replacements?.length - 1 ? "" : ","}
                  </span>
                ))}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default ErrorTooltipContent;
