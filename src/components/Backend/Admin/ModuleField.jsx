 import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Controller } from 'react-hook-form';

const ModuleField = ({ name, control, errors, fieldList, addField, removeField, getValues }) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "1rem",
        p: 2,
        my: 2,
      }}
    >
      <Typography variant="h6">{name} Module</Typography>

      <Box sx={{ width: "100%", mb: 2 }}>
        {fieldList.map((field, index) => (
          <Controller
            key={field.id}
            name={`${name.toLowerCase()}[${index}].name`}
            control={control}
            defaultValue={field.name}
            rules={{
              required: {
                value: true,
                message: `*${name} Module is required`,
              },
              validate: () => {
                const moduleData = getValues(name.toLowerCase());
                const totalLength = moduleData.reduce(
                  (acc, curr) => acc + (curr.name?.length || 0),
                  0
                );

                const maxCombinedLength = 500;

                return (
                  totalLength <= maxCombinedLength ||
                  `The combined total must not exceed ${maxCombinedLength} characters`
                );
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                id={`${name.toLowerCase()}[${index}].name`}
                type="text"
                variant="standard"
                fullWidth
                size="large"
                error={!!errors?.[name.toLowerCase()]?.[index]?.name}
                label={
                  <Typography variant="h5">
                    {name} {index + 1}
                    {!!errors?.[name.toLowerCase()]?.[index]?.name && (
                      <small>{errors[name.toLowerCase()]?.[index]?.name.message}</small>
                    )}
                  </Typography>
                }
                sx={{ bgcolor: "rgb(231 239 254)", mt: "2rem" }}
              />
            )}
          />
        ))}
      </Box>
      {fieldList.length < 6 && (
        <Button variant="contained" sx={{ mr: 5 }} onClick={addField}>
          Add
        </Button>
      )}

      <Button variant="contained" onClick={removeField}>
        Remove
      </Button>
    </Box>
  );
};

export default ModuleField;