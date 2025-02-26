import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function TextAreaInput({
  control,
  defaultValue = "",
  errors,
  name,
  label,
  textInputStyle = undefined,
  disabled = false,
}) {
  const inputStyle = {
    backgroundColor: "white",
    boxShadow: 5,
    borderRadius: "1rem",
    p: 2,
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
            multiline
            rows={6}
            error={!!errors?.[name]}
            label={<Typography variant="h6">{label}</Typography>}
            InputProps={{
              sx:
                textInputStyle !== undefined
                  ? {
                      ...inputStyle,
                    }
                  : { ...textInputStyle },
            }}
            helperText={errors?.[name]?.message}
          />
        )}
      />
    </Box>
  );
}

export default TextAreaInput;
