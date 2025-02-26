import { Box, FormLabel, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function MultipleImageInput({
  control,
  defaultValue = "",
  errors,
  name,
  label,
  required = false,
  disabled,
}) {
  //   const inputStyle = {
  //     backgroundColor: "white",
  //     boxShadow: 5,
  //     borderRadius: "1rem",
  //     p: 2,
  //   };

  return (
    <Box sx={{ my: 3 }}>
      <FormLabel sx={{ mr: 2, color: "white" }}>Image</FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: required,
            message: "*File is required",
          },
        }}
        render={({ field }) => (
          <label htmlFor="file-photo">
            <input
              name={name}
              accept="image/*"
              multiple
              onChange={(e) => {
                field.onChange(e.target.files);
              }}
              id="file-photo"
              type="file"
            />
            {/* <button
              style={{
                color: "black",
                // ...enrollStyle.inputStyle,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              Upload
            </button> */}
          </label>
        )}
      />
      <span> (max : 3 images)</span>
      {errors?.[name]?.message && (
        <Typography variant="p" color="red" textAlign={"left"}>
          <small>{errors?.[name]?.message}</small>
        </Typography>
      )}
    </Box>
  );
}

export default MultipleImageInput;
