import React, { useState } from "react";

import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import TextInput from "../TextInput";

import MultipleImageInput from "../../../../../Formcomponents/MutipleImageUpload";
import { useWatch } from "react-hook-form";
// import TextInput from "../../../../components/Formcomponents/TextInput";

const StandardImageList = (props) => {
  const { oldImages, images, removeImage, removeImageArray, targetCountry } =
    props;
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {oldImages?.length > 0 &&
        oldImages?.map((image, index) => (
          <ImageListItem
            key={index}
            sx={{ display: removeImageArray.includes(image.id) ? "none" : "" }}
          >
            <CancelIcon
              sx={{ position: "absolute", top: 0, right: 5, cursor: "pointer" }}
              onClick={() => removeImage(oldImages, image)}
            />
            {image.url}
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}storage/${image.url}`}
              alt={image.id}
              loading="lazy"
              style={{ overflow: "hidden" }}
            />
          </ImageListItem>
        ))}
      {images?.length > 0 &&
        Array.from(images)?.map((image, index) => (
          <ImageListItem key={index}>
            <CancelIcon
              sx={{ position: "absolute", top: 0, right: 5 }}
              onClick={() => removeImage(images, image)}
            />
            <img
              src={URL.createObjectURL(image)}
              alt={image}
              loading="lazy"
              style={{ overflow: "hidden" }}
            />
          </ImageListItem>
        ))}
    </ImageList>
  );
};

function ProductVariation({
  id,
  errors,
  edit,
  control,
  watch,
  variant,
  setValue,
  setRemoveImageArray,
  removeImageArray,
  targetCountry,
}) {
  const [fileUrl, setFileUrl] = useState();

  const images = useWatch({
    control,
    name: "image" + id,
    defaultValue: [],
  });

  function removeImage(fileList, fileToRemove) {
    const dataTransfer = new DataTransfer();
    if (Array.isArray(fileList)) {
      setRemoveImageArray((prev) => [...prev, fileToRemove.id]);
    }
    Array.from(fileList).forEach((file) => {
      if (file !== fileToRemove) {
        dataTransfer.items.add(file);
      }
    });
    setValue("image" + id, dataTransfer.files);
    return;
  }
  return (
    <div style={{ width: "100%", marginTop: "2rem" }}>
      <Typography variant="h5">Product Variant {id + 1}</Typography>
      <Box
        sx={{
          width: "100%",

          padding: "1rem",
          borderRadius: "1rem",
        }}
      >
        {/* React hook form with material ui */}
        <Box
          sx={{
            my: 2,
            width: "100%",
            bgcolor: "white",
            borderRadius: "0.5rem",
          }}
        >
          <TextInput
            name={"size" + id}
            control={control}
            label="size"
            type="text"
            rules={{
              required: {
                value: true,
                message: "*Product size is required",
              },
            }}
            defaultValue={edit ? variant?.size : ""}
            error={!!errors["size" + id]}
            errorMessage={errors?.["size" + id]?.message}
            inputStyle={{
              width: "100%",
              "&.MuiFormControl-root ": {
                bgColor: "white",
              },
              "&.MuiInputBase-root": {
                borderRadius: "0.5rem",
              },
            }}
          />
        </Box>
        <Box
          sx={{
            my: 2,
            width: "100%",
            bgcolor: "white",
            borderRadius: "0.5rem",
          }}
        >
          <TextInput
            name={"color" + id}
            control={control}
            label="color"
            type="text"
            rules={{
              required: {
                value: true,
                message: "*Product color is required",
              },
            }}
            defaultValue={edit ? variant?.color : ""}
            error={!!errors["color" + id]}
            errorMessage={errors?.["color" + id]?.message}
            inputStyle={{
              width: "100%",
              "&.MuiFormControl-root ": {
                bgColor: "white",
              },
              "&.MuiInputBase-root": {
                borderRadius: "0.5rem",
              },
            }}
          />
        </Box>
        <Box
          sx={{
            my: 2,
            width: "100%",
            bgcolor: "white",
            borderRadius: "0.5rem",
          }}
        >
          <TextInput
            name={"sku" + id}
            control={control}
            label="SKU"
            type="text"
            rules={{
              required: {
                value: true,
                message: "*Product sku is required",
              },
            }}
            defaultValue={edit ? variant?.sku : ""}
            error={!!errors["sku" + id]}
            errorMessage={errors?.["sku" + id]?.message}
            inputStyle={{
              width: "100%",
              "&.MuiFormControl-root ": {
                bgColor: "white",
              },
              "&.MuiInputBase-root": {
                borderRadius: "0.5rem",
              },
            }}
          />
        </Box>

        <Box
          sx={{
            my: 2,
            width: "100%",
            bgcolor: "white",
            borderRadius: "0.5rem",
          }}
        >
          <TextInput
            name={"stockQuantity" + id}
            control={control}
            label="Stock quantity"
            type="text"
            rules={{
              required: {
                value: true,
                message: "*Product quantity is required",
              },
            }}
            defaultValue={edit ? variant?.stock_quantity : ""}
            error={!!errors["stockQuantity" + id]}
            errorMessage={errors?.["stockQuantity" + id]?.quantity}
            inputStyle={{
              width: "100%",
              "&.MuiFormControl-root ": {
                bgColor: "white",
              },
              "&.MuiInputBase-root": {
                borderRadius: "0.5rem",
              },
            }}
          />
        </Box>

        <MultipleImageInput
          name={"image" + id}
          errors={errors}
          control={control}
          required={edit ? false : true}
        />

        <Box sx={{ display: "flex", my: 2 }}>
          {(variant?.images?.length > 0 || images?.length > 0) && (
            <Box sx={{ m: 2 }}>
              <StandardImageList
                images={images}
                removeImage={removeImage}
                oldImages={variant?.images}
                removeImageArray={removeImageArray}
                setRemoveImageArray={setRemoveImageArray}
              />
            </Box>
          )}
        </Box>
        {images?.length > 5 && (
          <span style={{ color: "red" }}>
            *Exceeds maximum number of images
          </span>
        )}
        {targetCountry?.map((c) => (
          <Box sx={{ backgound: "whitesmoke" }}>
            <Typography variant="h5">
              For{" "}
              {c === "my"
                ? "Myanmar"
                : c == "th"
                ? "Thailand"
                : c == "sg"
                ? "Singapore"
                : c == "au"
                ? "Australia"
                : "Newzealand"}
            </Typography>
            <Box
              sx={{
                my: 2,
                width: "100%",
                bgcolor: "white",
                borderRadius: "0.5rem",
              }}
            >
              <TextInput
                name={c + "purchasePrice" + id}
                control={control}
                label="Purchase Price"
                type="number"
                rules={{
                  required: {
                    value: true,
                    message: "*Purchase Price is required",
                  },
                }}
                defaultValue={
                  edit
                    ? variant?.prices?.filter((p) => p.country == c)?.[0]
                        ?.purchase_price
                    : ""
                }
                error={!!errors[c + "purchasePrice" + id]}
                errorMessage={errors?.[c + "purchasePrice" + id]?.message}
                inputStyle={{
                  width: "100%",
                  "&.MuiFormControl-root ": {
                    bgColor: "white",
                  },
                  "&.MuiInputBase-root": {
                    borderRadius: "0.5rem",
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                my: 2,
                width: "100%",
                bgcolor: "white",
                borderRadius: "0.5rem",
              }}
            >
              <TextInput
                name={c + "regularPrice" + id}
                control={control}
                label="regular Price"
                type="number"
                rules={{
                  required: {
                    value: true,
                    message: "*regular Price is required",
                  },
                }}
                defaultValue={
                  edit
                    ? variant?.prices?.filter((p) => p.country == c)?.[0]
                        ?.regular_price
                    : ""
                }
                error={!!errors?.[c + "regularPrice" + id]}
                errorMessage={errors?.[c + "regularPrice" + id]?.message}
                inputStyle={{
                  width: "100%",
                  "&.MuiFormControl-root ": {
                    bgColor: "white",
                  },
                  "&.MuiInputBase-root": {
                    borderRadius: "0.5rem",
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                my: 2,
                width: "100%",
                bgcolor: "white",
                borderRadius: "0.5rem",
              }}
            >
              <TextInput
                name={c + "salePrice" + id}
                control={control}
                label="Sale Price"
                type="number"
                rules={{
                  required: {
                    value: true,
                    message: "*Sale Price is required",
                  },
                }}
                defaultValue={
                  edit
                    ? variant?.prices?.filter((p) => p.country == c)?.[0]
                        ?.sale_price
                    : ""
                }
                error={!!errors[c + "salePrice" + id]}
                errorMessage={errors?.[c + "salePrice" + id]?.message}
                inputStyle={{
                  width: "100%",
                  "&.MuiFormControl-root ": {
                    bgColor: "white",
                  },
                  "&.MuiInputBase-root": {
                    borderRadius: "0.5rem",
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                my: 2,
                width: "100%",
                bgcolor: "white",
                borderRadius: "0.5rem",
              }}
            >
              <TextInput
                name={c + "shippingRate" + id}
                control={control}
                label="Shipping Rate"
                type="number"
                rules={{
                  required: {
                    value: true,
                    message: "*Shipping Rate is required",
                  },
                }}
                defaultValue={
                  edit
                    ? variant?.shippings?.filter((p) => p.country == c)?.[0]
                        ?.shipping_rate
                    : ""
                }
                error={!!errors[c + "shippingRate" + id]}
                errorMessage={errors?.[c + "shippingRate" + id]?.message}
                inputStyle={{
                  width: "100%",
                  "&.MuiFormControl-root ": {
                    bgColor: "white",
                  },
                  "&.MuiInputBase-root": {
                    borderRadius: "0.5rem",
                  },
                }}
              />
            </Box>
            {c == "my" && (
              <TextInput
                name="city"
                control={control}
                label="City"
                type="text"
                rules={{
                  required: {
                    value: true,
                    message: "*City is required",
                  },
                }}
                defaultValue={""}
                error={!!errors.city}
                errorMessage={errors?.city?.message}
                inputStyle={{
                  bgcolor: "white",
                  width: "100%",
                  "&.MuiFormControl-root ": {
                    bgColor: "white",
                  },
                  "&.MuiInputBase-root": {
                    borderRadius: "0.5rem",
                  },
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default ProductVariation;
