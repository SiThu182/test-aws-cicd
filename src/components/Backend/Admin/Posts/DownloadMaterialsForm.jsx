import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Radio,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import PdfFileInput from "../../../Formcomponents/PdfFileInput";
import { useForm } from "react-hook-form";
import TextInput from "../../../Formcomponents/TextInput";
import SelectInput from "../../../Formcomponents/SelectInput";
import { useNavigate } from "react-router-dom";
import { FormApiFunction } from "../../../Formcomponents/FormApiFunction";
import useMaterialTypes from "../../../../customHooks/MaterialTypes/materialTypes";
import FormRadioGroup from "./Form/RadioGroup";
import { FormStyle } from "./FormStyle";
function DownloadMaterialsForm({ defaultValue = "", edit = "", editPost, id }) {
  const navigate = useNavigate();
  const materialTypes = useMaterialTypes();

  const crudPath = process.env.REACT_APP_BACKEND_ADMIN + "materials";
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  let uploadFile = watch("uploadFile");
  // let select = watch("selectTypes");

  const saveType = (data) => {
    let formData = new FormData();
    formData.append("name", data.name);
    if ((uploadFile === null || uploadFile === undefined) && edit === "edit") {
      formData.append("media", uploadFile);
    } else {
      formData.append("media", uploadFile);
    }

    formData.append("type", data.selectTypes);
    formData.append("target_user_type", data.targetUser);

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
      <SelectInput
        name={"selectTypes"}
        label={"Select One"}
        control={control}
        defaultValue={edit === "edit" ? editPost?.material_type_id : ""}
        errors={errors}
        selectArray={materialTypes.types !== null ? materialTypes.types : ""}
      />

      <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
        <Typography variant="h6">Target User Type</Typography>
        <FormRadioGroup
          name="targetUser"
          control={control}
          defaultValue={edit === "edit" ? editPost.target_user_type : ""}
          rules={{
            required: {
              value: true,
              message: "*Choose one",
            },
          }}
          errorMessage={errors?.role?.message}
        >
          {[
            { label: "Normal", value: "Normal" },
            { label: "VIP", value: "VIP" },
          ].map((r, index) => (
            <FormControlLabel
              key={index}
              control={<Radio value={r.value} />}
              label={r.label}
            />
          ))}
        </FormRadioGroup>
      </Box>
      <PdfFileInput
        name="uploadFile"
        control={control}
        errors={errors}
        label={"Upload Materials"}
        required={edit === "edit" ? false : true}
      />
      <Box>
        <Typography></Typography>
        {uploadFile?.name}
      </Box>
      {edit === "edit" && (
        <Box>
          <li>
            <a href={backendURL + "storage/" + editPost?.url}>
              Uploaded Old File
            </a>
          </li>
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

export default DownloadMaterialsForm;
