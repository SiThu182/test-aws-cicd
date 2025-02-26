import { Box, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function SelectInput({
  errors,
  name,
  label,
  defaultValue,
  control,
  selectArray,
}) {
  const inputStyle = {
    backgroundColor: "white",
    boxShadow: 5,
    borderRadius: "1rem",
    p: 2,
  };
  return (
    <>
      {selectArray !== "" && selectArray?.length !== 0 && (
        <Box sx={{ my: 2 }}>
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{
              required: {
                value: true,
                message: "*Type is required",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="courseType"
                select
                variant="outlined"
                error={!!errors?.[name]}
                label={<Typography variant="h6">{label}</Typography>}
                InputProps={{
                  sx: {
                    ...inputStyle,
                  },
                }}
                fullWidth
                helperText={errors?.[name]?.message}
              >
                {selectArray.map((s, index) => (
                  <MenuItem key={index} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>
      )}
    </>
  );
}

export default SelectInput;
