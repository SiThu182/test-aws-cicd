import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function TextInput({ name, control, defaultValue = "", errors, label }) {
  const inputStyle = {
    backgroundColor: "white",
    boxShadow: 5,
    borderRadius: "1rem",
  };
  return (
    <Box sx={{ my: 2 }}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue} //insert props.title
        rules={{
          required: {
            value: true,
            message: "*Required",
          },
        }}
        render={({ field: { ref, ...field } }) => (
          <TextField
            {...field}
            inputRef={ref}
            id={name}
            type="text"
            fullWidth
            error={!!errors?.[name]}
            label={<Typography variant="h6">{label}</Typography>}
            InputProps={{
              sx: {
                ...inputStyle,
              },
            }}
            helperText={errors?.name?.message}
          />
        )}
      />
    </Box>
  );
}

export default TextInput;
