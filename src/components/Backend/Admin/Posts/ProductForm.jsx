import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductCategoriesAsync,
  fetchSuppliersAsync,
} from "../../../../redux/thunk/Product";
import { getCookie } from "../../../../Utils/GetCookies";
import PageNavTitle from "../../PageTitle";
import TextInput from "./Form/TextInput";
import SelectInput from "./Form/SelectInput";

import MultipleImageInput from "../../../Formcomponents/MutipleImageUpload";
import TipTapEditorWithToolbarAndBubbleMenu from "../../../Tiptap/TiptapEditor";
import ProductVariation from "./Form/Product/ProductVariation";
// import TextInput from "../../../../components/Formcomponents/TextInput";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StandardImageList = (props) => {
  const { oldImages, images, removeImage } = props;
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {oldImages?.length > 0 &&
        oldImages?.map((image, index) => (
          <ImageListItem key={index}>
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

function ProductForm(props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    register,
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: {
      targetCountry: [],
    },
  });
  const navigate = useNavigate();
  const {
    supplierList,
    supplierListStatus,

    categoryList,
    categoryListStatus,
  } = useSelector((state) => state.product);
  const images = watch("image", []);

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState();
  const [productVariantArray, setProductVariantArray] = useState([0]);
  const [editorJSON, setEditorJSON] = useState();
  const file = watch("fileUpload");
  const variantExist = watch("variantExist");
  const [oldImages, setOldImages] = useState([]);
  const [removeImageArray, setRemoveImageArray] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSuppliersAsync("product-suppliers"));
    dispatch(fetchProductCategoriesAsync("product-categories"));
  }, [dispatch]);

  useEffect(() => {
    // Register permissionIds to ensure it's tracked by react-hook-form
    register("targetCountry");
  }, [register]);
  const targetCountry = watch("targetCountry") || []; // Ensure permissionIds defaults to an array

  useEffect(() => {
    if (props.edit === "edit") {
      setValue("targetCountry", props.editPost?.target_country?.split(","));
    }
  }, [props]);

  useEffect(() => {
    if (props.edit === "edit" && props?.editPost?.variations?.length > 0) {
      let variantArray = [];
      for (
        let index = 0;
        index < props?.editPost?.variations?.length;
        index++
      ) {
        variantArray.push(index);

        // Set default values for each variation field to ensure they are registered
        setValue(`color${index}`, props.editPost.variations[index].color || "");
        setValue(`size${index}`, props.editPost.variations[index].size || "");
        setValue(`sku${index}`, props.editPost.variations[index].sku || "");
        setValue(
          `stockQuantity${index}`,
          props.editPost.variations[index].stock_quantity * 1 || ""
        );

        let countries = props.editPost?.target_country?.split(",");
        countries.forEach((country) => {
          const countryPrice = props.editPost.variations[index]?.prices?.find(
            (p) => p.country === country
          );

          const countryShippingPrice = props.editPost.variations[
            index
          ]?.shippings?.find((p) => p.country === country);

          // Use country code + field + index naming convention
          setValue(
            `${country}regularPrice${index}`,
            countryPrice?.regular_price * 1 || ""
          );
          setValue(
            `${country}salePrice${index}`,
            countryPrice?.sale_price * 1 || ""
          );
          setValue(
            `${country}purchasePrice${index}`,
            countryPrice?.purchase_price * 1 || ""
          );
          setValue(
            `${country}shippingRate${index}`,
            countryShippingPrice?.shipping_rate || ""
          );
        });
      }
      setProductVariantArray(variantArray);
    }
  }, [props, setValue]);

  const addOrRemoveCountry = (country) => {
    if (targetCountry.includes(country)) {
      const updatedCountry = targetCountry.filter((c) => c !== country);
      setValue("targetCountry", updatedCountry);
    } else {
      // Add the ID
      const updatedCountry = [...targetCountry, country];
      setValue("targetCountry", updatedCountry);

      // Clear the error if a permission is successfully added
      if (updatedCountry.length > 0) {
        clearErrors("targetCountry"); // Clear the error when permissions are added
      }
    }
  };

  useEffect(() => {
    if (file !== undefined && file !== "") {
      setFileUrl("");
      setFileUrl(URL.createObjectURL(file));
    }
  }, [file]);

  useEffect(() => {
    if (props.edit === "edit") {
      setOldImages(props?.editPost?.images);
    }
  }, [props]);

  const addProduct = () => {
    setProductVariantArray((prev) => [...prev, prev.length + 1]);
  };

  const removeProduct = () => {
    if (productVariantArray?.length > 0) {
      setProductVariantArray((prev) => prev.slice(0, -1));
    }
  };
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const saveType = async (data) => {
    setLoading(true);

    // return;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.content);
    formData.append("delivery_time", data.deliveryTime);

    formData.append("supplier_id", data.supplier * 1);
    formData.append("category_id", data.category * 1);

    formData.append("remark", data.remark);
    formData.append("target_country", data.targetCountry);
    formData.append("source_shop_url", data.source_shop_url);
    if (images !== undefined) {
      for (let i = 0; i < images?.length; i++) {
        formData.append(`images[]`, images[i]);
      }
    }
    let variations = [];
    if (productVariantArray?.length > 0) {
      productVariantArray?.forEach((p, id) => {
        variations[id] = {
          id: props?.editPost?.variations?.[id]?.id || null,
          color: data?.["color" + id],
          size: data?.["size" + id],
          regular_price: data?.["regularPrice" + id],
          sale_price: data?.["salePrice" + id],
          purchase_price: data?.["purchasePrice" + id],
          sku: data?.["sku" + id],
          stock_quantity: data?.["stockQuantity" + id],
        };

        variations[id].images =
          data?.["image" + id] === undefined || data?.["image" + id] === null
            ? null
            : data?.["image" + id];
      });
    }

    productVariantArray.forEach((v, vid) => {
      variations[vid].prices = [];
      variations[vid].shippings = [];
      targetCountry.forEach((c) => {
        // Append prices for each country
        variations[vid].prices.push({
          country: c,
          regular_price: data[c + "regularPrice" + vid] * 1,
          sale_price: data[c + "salePrice" + vid] * 1,
          purchase_price: data[c + "purchasePrice" + vid] * 1,
        });

        // Append shipping details for each country
        variations[vid].shippings.push({
          country: c,
          city: data["city" + vid],
          shipping_rate: data[c + "shippingRate" + vid] * 1,
        });
      });
    });

    if (props.edit === "edit") {
      removeImageArray.forEach((item, index) => {
        formData.append(`remove_images[${index}]`, item);
      });
    }

    Object.keys(variations).forEach((variationId) => {
      let variation = variations[variationId];

      // Append each non-file property
      formData.append(`variations[${variationId}][id]`, variation.id);
      formData.append(`variations[${variationId}][color]`, variation.color);
      formData.append(`variations[${variationId}][size]`, variation.size);

      // Append prices and shippings
      variation.prices.forEach((price, priceIndex) => {
        formData.append(
          `variations[${variationId}][prices][${priceIndex}][country]`,
          price.country
        );
        formData.append(
          `variations[${variationId}][prices][${priceIndex}][regular_price]`,
          price.regular_price
        );
        formData.append(
          `variations[${variationId}][prices][${priceIndex}][sale_price]`,
          price.sale_price
        );
        formData.append(
          `variations[${variationId}][prices][${priceIndex}][purchase_price]`,
          price.purchase_price
        );
      });

      variation.shippings.forEach((shipping, shippingIndex) => {
        formData.append(
          `variations[${variationId}][shippings][${shippingIndex}][country]`,
          shipping.country
        );
        formData.append(
          `variations[${variationId}][shippings][${shippingIndex}][city]`,
          shipping.city !== undefined ? shipping.city : null
        );
        formData.append(
          `variations[${variationId}][shippings][${shippingIndex}][shipping_rate]`,
          shipping.shipping_rate
        );
      });
      formData.append(`variations[${variationId}][sku]`, variation.sku);
      formData.append(
        `variations[${variationId}][stock_quantity]`,
        variation.stock_quantity
      );

      // Append each image in the images array

      if (variation?.images !== undefined && variation?.images?.length > 0) {
        for (let i = 0; i < variation?.images?.length; i++) {
          formData.append(
            `variations[${variationId}][images][]`,
            variation?.images[i]
          );
        }
      }
    });

    let token = await getCookie("userToken");

    let config = { headers: { Authorization: "Bearer " + token } };
    if (props.edit === "edit") {
      formData.append("_method", "PUT");
    }
    let res;
    try {
      if (props.edit === "edit") {
        res = await axios.post(
          `${backendURL}products/${props.editPost?.id}`,
          formData,
          config
        );
      } else {
        res = await axios.post(`${backendURL}products`, formData, config);
      }
      setLoading(false);

      if (res?.status === 200 || res?.status === 201) {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          button: "OK!",
          timer: 1500,
        });
        navigate(-1);
      }
    } catch (error) {
      if (error?.response?.data) {
        swal({
          title: "Warning",
          text: error?.response?.data?.error,
          icon: "warning",
          button: "OK!",
          timer: 1500,
        });
        setLoading(false);
      } else {
        swal({
          title: "Warning",
          text: error?.message,
          icon: "warning",
          button: "OK!",
          timer: 1500,
        });
        setLoading(false);
      }
    }
  };

  function removeImage(fileList, fileToRemove) {
    const dataTransfer = new DataTransfer();
    let imageArray = [];
    if (Array.isArray(fileList)) {
      imageArray = fileList.filter((f) => f.id !== fileToRemove.id);
      setOldImages(imageArray);
      setRemoveImageArray((prev) => [...prev, fileToRemove.id]);
    } else {
      Array.from(fileList).forEach((file) => {
        if (file !== fileToRemove) {
          dataTransfer.items.add(file);
        }
      });
      setValue("image", dataTransfer.files);
    }

    return;
  }

  return (
    <div style={{ width: "100%" }}>
      <PageNavTitle text={"Shop Products"} />
      <Box sx={{ height: "5rem" }}></Box>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <form onSubmit={handleSubmit(saveType)}>
          {/* React hook form with material ui */}
          <Box
            sx={{
              background: "#fff1d0",
              padding: "1rem",
              borderRadius: "1rem",
            }}
          >
            <Box
              sx={{
                my: 2,
                width: "100%",
                bgcolor: "white",
                borderRadius: "0.5rem",
              }}
            >
              <TextInput
                name="name"
                control={control}
                label="Name"
                type="text"
                rules={{
                  required: {
                    value: true,
                    message: "*Product name is required",
                  },
                }}
                defaultValue={
                  props.edit === "edit" ? props?.editPost?.name : ""
                }
                error={!!errors.name}
                errorMessage={errors?.name?.message}
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

            {supplierListStatus === "succeeded" && (
              <Box
                sx={{
                  my: 2,
                  width: "100%",
                  bgcolor: "white",
                  borderRadius: "0.5rem",
                }}
              >
                <SelectInput
                  name="supplier"
                  control={control}
                  defaultValue={
                    props.edit === "edit" ? props?.editPost?.supplier_id : ""
                  }
                  rules={{
                    required: {
                      value: true,
                      message: `Supplier name is required `,
                    },
                  }}
                  label="Supplier"
                  inputStyle={{
                    width: "100%",
                    "&.MuiFormControl-root ": {
                      bgColor: "white",
                    },
                    "&.MuiInputBase-root": {
                      borderRadius: "0.5rem",
                    },
                  }}
                  error={!!errors.supplier}
                  errorMessage={errors?.supplier?.message}
                >
                  {supplierList?.map((s, index) => (
                    <MenuItem key={index} value={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </SelectInput>
              </Box>
            )}
            {categoryListStatus === "succeeded" && (
              <Box
                sx={{
                  my: 2,
                  width: "100%",
                  bgcolor: "white",
                  borderRadius: "0.5rem",
                }}
              >
                <SelectInput
                  name="category"
                  control={control}
                  defaultValue={
                    props.edit === "edit" ? props?.editPost?.category_id : ""
                  }
                  rules={{
                    required: {
                      value: true,
                      message: `Category name is required `,
                    },
                  }}
                  label="Category"
                  inputStyle={{
                    width: "100%",
                    "&.MuiFormControl-root ": {
                      bgColor: "white",
                    },
                    "&.MuiInputBase-root": {
                      borderRadius: "0.5rem",
                    },
                  }}
                  error={!!errors.select}
                  errorMessage={errors?.category?.message}
                >
                  {categoryList?.map((s, index) => (
                    <MenuItem key={index} value={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </SelectInput>
              </Box>
            )}

            <FormGroup
              sx={{ background: "white", padding: 2, borderRadius: "0.5rem" }}
            >
              <Typography variant="h5">Target Country</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => addOrRemoveCountry("th")}
                    defaultChecked={
                      props.edit === "edit"
                        ? props?.editPost?.target_country?.includes("th")
                        : false
                    }
                  />
                }
                label="Thailand"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => addOrRemoveCountry("sg")}
                    defaultChecked={
                      props.edit === "edit"
                        ? props?.editPost?.target_country?.includes("sg")
                        : false
                    }
                  />
                }
                label="Singapore"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => addOrRemoveCountry("my")}
                    defaultChecked={
                      props.edit === "edit"
                        ? props?.editPost?.target_country?.includes("my")
                        : false
                    }
                  />
                }
                label="Myanmar"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => addOrRemoveCountry("au")}
                    defaultChecked={
                      props.edit === "edit"
                        ? props?.editPost?.target_country?.includes("au")
                        : false
                    }
                  />
                }
                label="Australia"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => addOrRemoveCountry("nz")}
                    defaultChecked={
                      props.edit === "edit"
                        ? props?.editPost?.target_country?.includes("nz")
                        : false
                    }
                  />
                }
                label="New Zealand"
              />
            </FormGroup>

            <Box
              sx={{
                my: 2,
                width: "100%",
                bgcolor: "white",
                borderRadius: "0.5rem",
              }}
            >
              <TextInput
                name="deliveryTime"
                control={control}
                label="Delivery Time (e.g Within 2 weeks no specific date)"
                type="text"
                rules={{
                  required: {
                    value: true,
                    message: "*Delivery time is required",
                  },
                }}
                defaultValue={
                  props.edit === "edit" ? props?.editPost?.delivery_time : ""
                }
                error={!!errors.deliveryTime}
                errorMessage={errors?.deliveryTime?.message}
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
              name={"image"}
              errors={errors}
              control={control}
              required={props?.edit === "edit" ? false : true}
            />

            <Box sx={{ display: "flex", my: 2, background: "white" }}>
              {(props?.editPost?.images?.length > 0 || images?.length > 0) && (
                <Box sx={{ m: 2 }}>
                  <StandardImageList
                    images={images}
                    removeImage={removeImage}
                    oldImages={oldImages}
                  />
                </Box>
              )}
            </Box>
            {images?.length > 5 && (
              <span style={{ color: "red" }}>
                *Exceeds maximum number of images
              </span>
            )}

            <Controller
              name="content"
              control={control}
              defaultValue={""} // Initial editor content
              render={({ field }) => (
                <div>
                  <TipTapEditorWithToolbarAndBubbleMenu
                    setEditorJSON={setEditorJSON}
                    setValue={setValue}
                    defaultValue={
                      props?.edit === "edit"
                        ? JSON.parse(props?.editPost?.description)
                        : ""
                    }
                  />
                </div>
              )}
            />

            <Box
              sx={{
                my: 2,
                width: "100%",
                bgcolor: "white",
                borderRadius: "0.5rem",
              }}
            >
              <TextInput
                name="remark"
                control={control}
                multiline={true}
                rows={6}
                label="Remark"
                type="text"
                defaultValue={
                  props.edit === "edit" ? props?.editPost?.remark : ""
                }
                error={!!errors.title}
                errorMessage={errors?.title?.message}
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
                name="shopUrl"
                control={control}
                label="Source shop url (if exist)"
                type="text"
                defaultValue={
                  props.edit === "edit" ? props?.editPost?.source_shop_url : ""
                }
                error={!!errors.title}
                errorMessage={errors?.title?.message}
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
          </Box>
          <Box
            sx={{
              display: "flex",

              justifyContent: "space-between",
              my: 4,
              py: 2,
              px: 1,
              background: "white",
              borderRadius: "0.5rem",
            }}
          >
            <Typography variant="h5">Variants</Typography>
            <Box>
              <Button onClick={() => addProduct()}>
                <AddIcon />
              </Button>
              {productVariantArray?.length > 1 && (
                <Button onClick={() => removeProduct()}>
                  <RemoveIcon />
                </Button>
              )}
            </Box>
          </Box>
          {productVariantArray?.length > 0 && (
            <Box sx={{ background: "#fff1d0", mt: "2rem" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={tabValue}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{
                    background: "white",
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                  }}
                >
                  {productVariantArray.map((p, id) => (
                    <Tab label={"Item " + (id + 1)} {...a11yProps(id)} />
                  ))}
                </Tabs>
              </Box>
              {productVariantArray.map((p, id) => (
                <CustomTabPanel value={tabValue} index={id}>
                  <Box>
                    <ProductVariation
                      key={p}
                      edit={props.edit === "edit"}
                      id={id}
                      errors={errors}
                      control={control}
                      targetCountry={targetCountry}
                      watch={watch}
                      setValue={setValue}
                      variant={props.editPost?.variations[id]}
                      setRemoveImageArray={setRemoveImageArray}
                      removeImageArray={removeImageArray}
                    />
                  </Box>
                </CustomTabPanel>
              ))}
            </Box>
          )}

          <Box display={"flex"} justifyContent="right">
            <Button
              id="btnSave"
              type="submit"
              variant="contained"
              disabled={loading ? true : false}
              sx={{
                color: "white",
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
        </form>
      </Box>
    </div>
  );
}

export default ProductForm;
