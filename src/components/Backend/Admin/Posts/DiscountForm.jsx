import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import TextInput from "../../../Formcomponents/TextInput";

import { useNavigate } from "react-router-dom";
import { FormApiFunction } from "../../../Formcomponents/FormApiFunction";
import { FormStyle } from "./FormStyle";

function DiscountCouponForm({ defaultValue = "", edit = "", editPost, id }) {
  const navigate = useNavigate();

  const crudPath = process.env.REACT_APP_BACKEND_ADMIN + "coupon-percents";

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    // watch,
    formState: { errors },
  } = useForm();
  // let uploadFile = watch("uploadFile");
  // let select = watch("selectTypes");

  const saveType = (data) => {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("percentage", data.percentage);
    formData.append("number_of_days", data.days);
    formData.append("status", data.statusValue);

    FormApiFunction(
      formData,
      loading,
      setLoading,
      edit === "edit" ? crudPath + "/" + id : crudPath,
      navigate,
      edit,
      true //back to prev path
    );
  };

  // addPost(request, loading, setLoading, backendURL, navigate);
  return (
    <form onSubmit={handleSubmit(saveType)}>
      <TextInput
        name="name"
        defaultValue={edit === "edit" ? editPost?.name : ""}
        control={control}
        errors={errors}
        label={"Name"}
      />
      <Box sx={{ my: 2 }}>
        <Controller
          name="percentage"
          control={control}
          defaultValue={edit === "edit" ? editPost.percentage : 0} //insert props.title
          rules={{
            required: {
              value: true,
              message: "*Percentage is required",
            },
          }}
          render={({ field: { ref, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              id="installmentFees"
              type="number"
              fullWidth
              error={!!errors.installment_fees}
              label={<Typography variant="h6">Discount Percentage</Typography>}
              InputProps={{
                sx: {
                  ...FormStyle.inputStyle,
                },
              }}
              helperText={errors?.installment_fees?.message}
            />
          )}
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Controller
          name="days"
          control={control}
          defaultValue={edit === "edit" ? editPost.number_of_days : 0} //insert props.title
          rules={{
            required: {
              value: true,
              message: "*Number of day is required",
            },
          }}
          render={({ field: { ref, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              id="days"
              type="number"
              fullWidth
              error={!!errors.installment_fees}
              label={<Typography variant="h6">Number of Days</Typography>}
              InputProps={{
                sx: {
                  ...FormStyle.inputStyle,
                },
              }}
              helperText={errors?.installment_fees?.message}
            />
          )}
        />
      </Box>
      <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
        <Typography variant="h6">Discount Status</Typography>
        <Controller
          name="statusValue"
          control={control}
          defaultValue={edit === "edit" ? editPost.status : ""}
          rules={{
            required: {
              value: true,
              message: "*Choose one",
            },
          }}
          render={({ field: { value, onChange } }) => (
            <RadioGroup
              // row
              // aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={edit === "edit" ? editPost.status : ""}
              onChange={onChange}
            >
              <FormControlLabel
                control={
                  <Radio
                    value={1}
                    // checked={statusValue === "active"}
                  />
                }
                label="Active"
              />
              <FormControlLabel
                control={
                  <Radio
                    value={0}
                    // checked = { editMediaType === "2"}
                    // checked={statusValue === "inactive"}
                  />
                }
                label="Inactive"
              />
              <Typography sx={{ fontSize: "1rem", color: "red" }}>
                {errors?.statusValue?.message}
              </Typography>
            </RadioGroup>
          )}
        />
      </Box>

      <Box display={"flex"} justifyContent="right">
        <Button
          id="btnSave"
          type="submit"
          variant="contained"
          disabled={loading ? true : false}
          sx={{
            color: "#000",
            bgcolor: "#2196f3",

            "&:hover": {
              bgcolor: "white",
            },
          }}
        >
          {loading ? (
            <CircularProgress
              sx={{ width: "50%", color: "white", m: "0 auto" }}
            ></CircularProgress>
          ) : edit !== "" ? (
            "Update"
          ) : (
            "Confirm"
          )}
        </Button>
      </Box>
    </form>
  );
}

export default DiscountCouponForm;
