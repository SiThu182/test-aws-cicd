import { RadioGroup, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function FormRadioGroup({
  name,
  control,
  rules,
  defaultValue,
  label,
  errorMessage,
  children,
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue} //insert props.description
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <RadioGroup
          // row
          // aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={value}
          onChange={onChange}
        >
          {children}
          <Typography sx={{ fontSize: "1rem", color: "red" }}>
            {errorMessage}
          </Typography>
        </RadioGroup>
      )}
    />
  );
}

export default FormRadioGroup;
