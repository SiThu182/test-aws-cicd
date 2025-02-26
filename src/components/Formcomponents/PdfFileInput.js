import { Box, Button, FormLabel, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function PdfFileInput({
  control,
  defaultValue = "",
  errors,
  name,
  label,
  required,
}) {
  //   const inputStyle = {
  //     backgroundColor: "white",
  //     boxShadow: 5,
  //     borderRadius: "1rem",
  //     p: 2,
  //   };

  return (
    <Box sx={{ my: 3 }}>
      <FormLabel sx={{ mr: 2 }}>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: required,
            message: "*File is required",
          },
        }}
        render={({ field: { onChange } }) => (
          <label htmlFor="file-photo">
            <input
              name={name}
              type="file"
              accept="application/pdf"
              onChange={(event) => onChange(event.target.files[0])}
              style={{ display: "none" }}
              id="file-photo"
            />
            <Button
              variant="contained"
              component="span"
              sx={{
                color: "#ffff",
                // ...enrollStyle.inputStyle,
              }}
            >
              Upload
            </Button>
          </label>
        )}
      />
      {errors?.[name] && (
        <Typography variant="p" color="red" textAlign={"left"}>
          <small>{errors[name].message}</small>
        </Typography>
      )}
    </Box>
  );
}

export default PdfFileInput;
