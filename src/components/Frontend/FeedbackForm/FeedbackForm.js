import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import TextAreaInput from "../../Formcomponents/TextAreaInput";
import MultipleImageInput from "../../Formcomponents/MutipleImageUpload";
import { FormApiFunction } from "../../Formcomponents/FormApiFunction";
import { useNavigate } from "react-router-dom";
import TextInput from "../../Formcomponents/TextInput";

function FeedbackForm({ bgColor }) {
  const {
    handleSubmit,
    control,
    // setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const images = watch("image", []);
  const imagesNew = watch("imageNew", []);

  const navigate = useNavigate();
  const apiPath = process.env.REACT_APP_BACKEND_ADMIN + "student-feedbacks";
  const [loading, setLoading] = useState(false);

  const submitFunction = (data) => {
    if (images?.length <= 3) {
      const userId = localStorage.getItem("userId");

      let formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("user_id", userId);
      formData.append("type", "User Feedback");
      if (data.image !== undefined) {
        for (let i = 0; i < data.image?.length; i++) {
          formData.append(`media[${i}]`, data.image[i]);
        }
      }

      FormApiFunction(
        formData,
        loading,
        setLoading,
        apiPath,
        navigate,
        ""
        //back to prev path
      );
      reset();
    } else {
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(submitFunction)} encType="multipart/form-data">
      <Box sx={{ backgroundColor: bgColor }}>
        <TextInput
          control={control}
          errors={errors}
          name={"name"}
          label={"Name"}
        />
        <TextAreaInput
          control={control}
          errors={errors}
          name={"description"}
          label={"Description"}
        />
        <Box>
          {" "}
          <MultipleImageInput
            name={"image"}
            errors={errors}
            control={control}
          />
        </Box>
        <Box>
          <MultipleImageInput
            name={"imageNew"}
            errors={errors}
            control={control}
          />
        </Box>

        <Box sx={{ display: "flex" }}>
          {images?.length > 0 &&
            Array.from(images).map((image, index) => (
              <Box key={index} sx={{ m: 2 }}>
                <Typography>Image({index})</Typography>
                <Box
                  key={index}
                  sx={{ width: "8rem" }}
                  className="image-preview"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    style={{ width: "8rem", background: "red" }}
                    alt={`img-${index}`}
                  />
                </Box>
              </Box>
            ))}
        </Box>
        {images?.length > 3 && (
          <span style={{ color: "red" }}>
            *Exceeds maximum number of images
          </span>
        )}
        <Box display={"flex"} justifyContent="right">
          <Button
            id="btnSave"
            type="submit"
            // disabled={true}
            variant="contained"
            disabled={loading ? true : false}
            sx={{
              color: "#fff",
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
            ) : (
              "Confirm"
            )}
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default FeedbackForm;
