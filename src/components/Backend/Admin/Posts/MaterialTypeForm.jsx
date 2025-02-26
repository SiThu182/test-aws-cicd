import { Box, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import TextInput from "../../../Formcomponents/TextInput";

import { useNavigate } from "react-router-dom";
import { FormApiFunction } from "../../../Formcomponents/FormApiFunction";

function MaterialTypeForm({ defaultValue = "", edit = "", editPost, id }) {
  const navigate = useNavigate();

  const crudPath = process.env.REACT_APP_BACKEND_ADMIN + "material-types";

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

export default MaterialTypeForm;
