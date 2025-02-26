import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import TextInput from "../../../Formcomponents/TextInput";
import { useNavigate } from "react-router-dom";
import { FormApiFunction } from "../../../Formcomponents/FormApiFunction";
import { FormStyle } from "./FormStyle";

import FormRadioGroup from "./Form/FormRadioGroup";

function CouponForm({ defaultValue = "", edit = "", editPost, id }) {
  const navigate = useNavigate();

  const crudPath = process.env.REACT_APP_BACKEND_ADMIN + "coupon";

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  // let uploadFile = watch("uploadFile");
  // let select = watch("selectTypes");

  let couponType = watch("couponType");

  useEffect(() => {
    if (edit === "edit") {
      setValue("couponType", editPost.coupon_type);
    }
  }, [edit, editPost, setValue]);

  const saveType = (data) => {
    let formData = new FormData();
    formData.append("email", data.email);
    formData.append("coupon_type", data.couponType);

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
      <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
        <Typography variant="h6">Coypon Type</Typography>
        <FormRadioGroup
          name="couponType"
          control={control}
          defaultValue={edit === "edit" ? editPost.coupon_type : ""}
          rules={{
            required: {
              value: true,
              message: "*Choose one",
            },
          }}
          errorMessage={errors?.couponType?.message}
        >
          {[
            { label: "Single", value: "single" },
            { label: "Multiple", value: "multiple" },
          ].map((r, index) => (
            <FormControlLabel
              key={index}
              control={
                <Radio
                  value={r.value}
                  // checked={statusValue === "active"}
                />
              }
              label={r.label}
            />
          ))}
        </FormRadioGroup>
      </Box>

      {couponType === "single" && (
        <Box sx={{ my: 2 }}>
          <TextInput
            name="email"
            control={control}
            label="Email"
            type="mail"
            rules={{
              required: {
                value: true,
                message: "*Email is required",
              },
            }}
            defaultValue={edit === "edit" ? editPost?.user?.email : ""}
            error={!!errors.email}
            errorMessage={errors?.email?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>
      )}

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

export default CouponForm;
