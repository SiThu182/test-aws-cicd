import { Box, Button, FormLabel, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function DiffferentImageInput({
  control,
  defaultValue = "",
  errors,
  name,
  label,
  disabled,
  setValue,
}) {
  //   const inputStyle = {
  //     backgroundColor: "white",
  //     boxShadow: 5,
  //     borderRadius: "1rem",
  //     p: 2,
  //   };

  const handleFileChange = (event) => {
    event.stopPropagation();

    const files = event.target.files;

    setValue(name, files); // Manually set the value to the correct field
  };

  return (
    <Box sx={{ my: 3 }}>
      <FormLabel sx={{ mr: 2, color: "white" }}>Image</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <label htmlFor="file-photo">
            <input
              {...field}
              name={name}
              accept="image/*"
              multiple
              onChange={(e) => {
                e.stopPropagation();
                field.onChange(e.target.files);
              }}
              style={{ display: "none" }}
              id={name}
              type="file"
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
      <span> (max : 3 images)</span>
      {errors?.name && (
        <Typography variant="p" color="red" textAlign={"left"}>
          <small>{errors?.name?.message}</small>
        </Typography>
      )}
    </Box>
  );
}

export default DiffferentImageInput;
