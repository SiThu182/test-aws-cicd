import { TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const TextInput = React.memo(
  ({
    name,
    inputStyle,
    defaultValue,
    rules,
    label,
    control,
    error,
    type,
    disabled = false,
    errorMessage,
    multiline = false,
    rows = 0,
    readOnly,
    startAdornment,
    inputAdorement,
  }) => {
    const {
      setValue,
      formState: { errors },
    } = useForm();

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
            disabled={disabled}
            type={type}
            fullWidth
            multiline={multiline}
            rows={rows}
            error={error}
            label={<Typography variant="h6">{label}</Typography>}
            InputProps={{
              readOnly: readOnly,
              sx: {
                ...inputStyle,
                "& input:disabled": {
                  color: "blue",
                },
              },

              startAdornment: startAdornment,
              endAdornment: inputAdorement,
            }}
            helperText={errorMessage}
          />
        )}
      />
    );
  }
);

export default TextInput;
