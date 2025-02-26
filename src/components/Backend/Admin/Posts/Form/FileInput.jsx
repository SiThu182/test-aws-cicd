import { Button, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function FileInput({
  name,
  rules,
  control,
  error,
  errorMessage,
  acceptType,
  btnStyle,
}) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange } }) => (
          <label htmlFor={name}>
            <input
              accept={acceptType}
              style={{ display: "none" }}
              id={name}
              onChange={(event) => onChange(event.target.files[0])}
              type="file"
            />
            <Button
              variant="contained"
              component="span"
              sx={{
                ...btnStyle,
                color: "white",
                // ...enrollStyle.inputStyle,
              }}
            >
              Upload
            </Button>
          </label>
        )}
      />
      {error && (
        <Typography variant="p" color="red" textAlign={"left"}>
          <small>{errorMessage}</small>
        </Typography>
      )}
    </>
  );
}

export default FileInput;
