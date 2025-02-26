import {
  getCountries,
 
} from "react-phone-number-input/input";
import { TextField, Typography, MenuItem } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export const CountrySelect = ({
  name,
  inputStyle,
  control,
  errors,
  labels,
  label,
  error,
  errorMessage,
  defaultValue,
  endAdornment,
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue !== "" ? defaultValue : ""}
    rules={{
      required: {
        value: true,
        message: "*Country is required",
      },
    }}
    render={({ field: { ref, ...field } }) => (
      <TextField
        {...field}
        inputRef={ref}
        id="country"
        select
        variant="outlined"
        error={error}
        label={<Typography variant="h6">{label}</Typography>}
        InputProps={{
          sx: {
            ...inputStyle,
          },
          endAdornment: endAdornment,
        }}
        fullWidth
        helperText={errorMessage}
      >
        {getCountries().map((country) => (
          <MenuItem key={country} value={labels[country]}>
            {labels[country]}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
);
