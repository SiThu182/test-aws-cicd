import { MenuItem, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function SelectInput({
  name,
  inputStyle,
  defaultValue,
  rules,
  label,
  control,
  error,
  type,
  errorMessage,
  endAdornment,
  selectData,
  children,
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue} //insert props.title
      rules={rules}
      render={({ field: { ref, ...field } }) => (
        <TextField
          {...field}
          inputRef={ref}
          id={name}
          select
          fullWidth
          error={error}
          label={<Typography variant="h6">{label}</Typography>}
          InputProps={{
            sx: {
              ...inputStyle,
            },
            endAdornment: endAdornment,
          }}
          helperText={errorMessage}
        >
          {children}
        </TextField>
      )}
    />
  );
}

export default SelectInput;
