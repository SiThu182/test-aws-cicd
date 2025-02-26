import React, { useEffect, useRef, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import swal from "sweetalert";
import {
  Alert,
  Box,
  Avatar,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Skeleton,
  Stack,
  Typography,
  Pagination,
  Badge,
} from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import Lightbox from "./Product/LightBox";
import Layout from "../../Layout/Frontend/Layout";
import ShopCard from "../Shop/ShopCard";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { addToCart, setCartAlert } from "../../../redux/slice/UserSlice";
import QuantityButtonGroup from "./QuantityButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetailFrontendAsync } from "../../../redux/thunk/Product";
import JsonToHtml from "../../Backend/Admin/Posts/EditorHTMLContent";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import Inventory2Icon from "@mui/icons-material/Inventory2";
import PolicyIcon from "@mui/icons-material/Policy";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fetchReviewAsync } from "../../../redux/thunk/ProductReview";
import { fetchRelatedProductListAsync } from "../../../redux/thunk/Shop";
const ProductDetails = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageRatio, setImageRatio] = useState(false);
  const [page, setPage] = useState(1);

  const id = useParams();
  const reviewPath =
    process.env.REACT_APP_BACKEND_API +
    "product-reviews?page=" +
    page +
    "&product_id=" +
    id.id;
  const { status, reviewList } = useSelector((state) => state.rating);
  const { userCart } = useSelector((state) => state.user);
  const [stock, setStock] = React.useState(null);
  const { productDetailFrontendStatus, productDetailFrontend } = useSelector(
    (state) => state.product
  );
  const {
    shopCurrency,
    currencyRate,
    shopCountry,
    relatedProductListStatus,
    relatedProductList,
  } = useSelector((state) => state.shop);
  const [variation, setVariation] = React.useState(null);
  const { cartAlert } = useSelector((state) => state.user);
  const [currentImage, setCurrentImage] = useState("");
  const [imageStyle, setImageStyle] = useState({});
  const [starValue, setStarValue] = React.useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const errImgSrc =
    process.env.REACT_APP_FRONTEND_URL + "Image/error-image.png";

  useEffect(() => {
    dispatch(fetchProductDetailFrontendAsync(id.id));
    dispatch(setCartAlert(null));
  }, [id.id, reviewList]);

  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    handleScrollToTop();
  }, [id.id]);

  React.useEffect(() => {
    let totalStock = 0;
    if (productDetailFrontend !== undefined) {
      productDetailFrontend?.variations?.forEach((v) => {
        totalStock += v?.stock_quantity * 1;
      });
      setStock(totalStock);
    }
  }, [productDetailFrontend]);

  const imgRef = useRef(null);
  const [imgHeight, setImgHeight] = useState(0);

  const updateHeight = () => {
    if (imgRef.current) {
      setImgHeight(imgRef.current.clientHeight);
    }
  };

  useEffect(() => {
    // Create a ResizeObserver to monitor image size changes
    const observer = new ResizeObserver(() => {
      updateHeight(); // Update the height when the image size changes
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    // Add window resize event listener to ensure updates on window resize
    window.addEventListener("resize", updateHeight);

    // Initial update of height
    updateHeight();

    // Cleanup on component unmount
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  useEffect(() => {
    dispatch(
      fetchRelatedProductListAsync(
        "get-related-products?category_id=" +
          id.category_id +
          "&country=" +
          shopCountry
      )
    );
  }, [id.category_id, shopCountry]);

  useEffect(() => {
    dispatch(fetchReviewAsync(reviewPath));
  }, [dispatch, reviewPath]);

  let handleChange1 = (event, p) => {
    setPage(p);
  };
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;

    if (naturalWidth >= naturalHeight) {
      // Landscape orientation

      setImageStyle({ width: "100%", height: "auto" });
    } else {
      // Portrait orientation
      setImageStyle({ height: "100%", width: "auto" });
    }
    setImageRatio(naturalWidth / naturalHeight);
  };

  useEffect(() => {
    if (productDetailFrontendStatus === "succeeded") {
      setCurrentImage(
        `${process.env.REACT_APP_BACKEND_URL}storage/${productDetailFrontend?.images[0]?.url}`
      );
    }
  }, [productDetailFrontendStatus, productDetailFrontend]);

  const handleChange = (event) => {
    setVariation(event.target.value);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        title: productDetailFrontend?.name,
        price: productDetailFrontend?.variations?.[variation]?.prices,
        id: productDetailFrontend?.id,
        country: productDetailFrontend?.target_country,
        product_variations_id:
          productDetailFrontend?.variations?.length > 0
            ? productDetailFrontend?.variations?.[variation].id
            : null,
        category: productDetailFrontend?.category?.name,
        stock:
          productDetailFrontend?.variations?.length > 0
            ? productDetailFrontend?.variations?.[variation].stock_quantity
            : productDetailFrontend?.stock_quantity,
        image: productDetailFrontend?.variations?.[variation].images[0]?.url,
        quantity: quantity,
      })
    );
  };

  const reviewSubmitHandler = async () => {
    let userId = localStorage.getItem("userId");
    if (userId !== null && userId !== undefined) {
      let data = {
        rating: starValue,
        comment: reviewComment,
        user_id: userId,
        product_id: id.id,
      };

      let res = await axios
        .post(process.env.REACT_APP_BACKEND_API + "ratings", data)
        .catch((res) => {
          swal({
            title: "Warning",
            text: "Error uploading review" + res?.message,
            icon: "warning",
            button: "OK!",
          });
          return;
        });
      if (res?.status === 201) {
        swal({
          title: "Success",
          text: "Review posted successfully",
          icon: "success",
          button: "OK!",
        });
        dispatch(fetchReviewAsync(reviewPath));
      } else {
        swal({
          title: "Warning",
          text: "Error uploading review s" + res?.error,
          icon: "warning",
          button: "OK!",
        });
      }
    } else {
      swal({
        title: "Warning",
        text: "Please log in first",
        icon: "warning",
        button: "OK!",
      });
    }
  };

  const handleError = (e) => {
    e.target.src = errImgSrc; // Set the fallback image dynamically
  };

  const navigate = useNavigate();

  return (
    <Layout bgColor="#093E7C">
      <Box
        sx={{
          backgroundColor: "#093E7C",

          padding: "2rem",
        }}
      >
        <Stack
          sx={{
            width: "100%",

            maxWidth: "1600px",
            margin: "0 auto",
            mb: 5,
            display: "flex",
          }}
          spacing={2}
        >
          {cartAlert === "success" && (
            <Alert
              severity="success"
              onClose={() => dispatch(setCartAlert(null))}
              sx={{ mb: 5 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                  Item is added successfully to the cart.
                </Typography>

                <NavLink to={"/pte-shop/cart"}>
                  <Typography variant="body2" color="text.secondary">
                    Go to Cart
                  </Typography>
                </NavLink>
              </Box>
            </Alert>
          )}
          {cartAlert === "failed" && (
            <Alert
              severity="warning"
              onClose={() => dispatch(setCartAlert(null))}
            >
              Item is not added to the cart .
            </Alert>
          )}
          {!productDetailFrontend?.target_country.includes(shopCountry) && (
            <Alert
              severity="warning"
              onClose={() => dispatch(setCartAlert(null))}
            >
              This item is not available in selected country .
            </Alert>
          )}
        </Stack>
        <Box
          sx={{
            display: "flex",
            mb: 5,
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            maxWidth: "1600px",
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              width: {
                xs: "50%",
                sm: "30%",
                md: "20%",
              },
            }}
          >
            <Button
              onClick={() => navigate("/pte-shop")}
              sx={{ background: "white", "&:hover": { background: "gray" } }}
              variant="contained"
            >
              <ArrowBackIcon sx={{ color: "black" }} />
            </Button>
          </Box>
          {/* <ReusableSwitch
                title1={"Wire"}
                title2={"Wireless"}
                setSelectType={setSelectType}
              /> */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={{
                background: "white",
                borderRadius: "0.5rem",
                boxShadow: 5,
                padding: 1,
                "&:hover": { background: "gray" },
                ml: 1,
              }}
              onClick={() => navigate("/pte-shop/cart")}
            >
              <Badge color="error" badgeContent={userCart?.length} max={99}>
                <ShoppingCartIcon />
              </Badge>
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            margin: "0 auto",
            maxWidth: "1500px",
            p: 2,
            background: "#093E7C",
            borderRadius: "0.2rem",
            color: "white",
          }}
        >
          <Typography
            component="h1"
            sx={{ fontSize: "2rem", fontWeight: "bold", mb: 2 }}
          >
            {productDetailFrontendStatus === "loading" ? (
              <Skeleton />
            ) : (
              productDetailFrontend?.name
            )}
          </Typography>

          <div
            style={{
              gap: "2rem",
              flexWrap: "wrap",
              width: "100%",

              display: "flex",

              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "90%",
                  md: "50%",
                },
                height: {
                  xs: imgHeight + 200,
                  md: "950px",
                },
                overflowY: "auto",
                scrollbarWidth: "none",

                aspectRatio: "1 / 0.7",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  aspectRatio: " 1 / 0.7",

                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Box
                  className="vertical-gallery"
                  sx={{
                    display: "flex",
                    position: "relative",
                    gap: "10px",
                    flexDirection: {
                      xs: "row",
                      md: "column",
                    },
                    width: {
                      sm: "80%",
                      md: "20%",
                    },

                    overflowX: {
                      xs: "hidden",
                    },

                    order: {
                      xs: 2,
                      md: 1,
                    },
                  }}
                >
                  {productDetailFrontendStatus === "loading" ? (
                    <Box
                      sx={{
                        width: {
                          xs: "20%",
                          md: "100%",
                        },
                        aspectRatio: " 1 / 1",
                      }}
                    >
                      <Skeleton
                        sx={{
                          width: "100%",
                          height: "100%",

                          borderRadius: "0.5rem",
                        }}
                        animation="wave"
                        variant="rectangular"
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: {
                          xs: "20%",
                          md: "100%",
                        },
                        aspectRatio: " 1 / 1",
                        display: "flex",
                        gap: 2,
                        flexDirection: {
                          xs: "row",
                          md: "column",
                        },
                      }}
                    >
                      {productDetailFrontend?.images.map((image, index) => (
                        <img
                          key={index}
                          src={`${process.env.REACT_APP_BACKEND_URL}storage//${image.url}`}
                          alt={image.id}
                          style={{
                            cursor: "pointer",
                            width: "100%",
                            height: "auto",

                            borderRadius: "0.5rem",
                          }}
                          onError={handleError}
                          onClick={() => {
                            setCurrentImage(
                              `${process.env.REACT_APP_BACKEND_URL}storage/${image.url}`
                            );
                            // setLightboxOpen(true);
                          }}
                        />
                      ))}
                      {productDetailFrontend?.variations?.map((v, index) => (
                        <div key={index}>
                          {v?.images.map((image, id) => (
                            <img
                              key={id}
                              src={`${process.env.REACT_APP_BACKEND_URL}storage/${image.url}`}
                              alt={image.id}
                              style={{
                                cursor: "pointer",
                                width: "100%",
                                height: "auto",

                                borderRadius: "0.5rem",
                              }}
                              onError={handleError}
                              onClick={() => {
                                setCurrentImage(
                                  `${process.env.REACT_APP_BACKEND_URL}storage/${image.url}`
                                );
                                // setLightboxOpen(true);
                              }}
                            />
                          ))}
                        </div>
                      ))}
                    </Box>
                  )}
                </Box>
                <Box
                  className="current-image"
                  sx={{
                    display: "flex",
                    width: {
                      xs: "100%",
                      sm: "70%",
                      md: "70%",
                    },

                    overflow: "hidden",
                    aspectRatio: "1 / 1",
                    border: "2px solid rgb(196,186,184,0.5)",
                    borderRadius: "1rem",

                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",

                    order: {
                      xs: 1,
                      md: 2,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 3,
                      width: "3rem",
                      height: "3rem",
                    }}
                  >
                    <IconButton
                      onClick={() => setLightboxOpen(true)}
                      color="black"
                    >
                      <OpenInFullIcon />
                    </IconButton>
                  </Box>
                  {productDetailFrontendStatus === "loading" ? (
                    <Box sx={{ width: "100%", aspectRatio: " 1 / 1" }}>
                      <Skeleton
                        sx={{
                          width: "100%",
                          height: "100%",

                          borderRadius: "0.5rem",
                        }}
                        animation="wave"
                        variant="rectangular"
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "white",
                      }}
                    >
                      <img
                        ref={imgRef}
                        src={currentImage}
                        alt={`Thumbnail ${currentImage + 1}`}
                        style={{
                          cursor: "pointer",
                          ...imageStyle,
                        }}
                        onClick={() => {
                          //   setCurrentImage(currentImage);
                          setLightboxOpen(true);
                        }}
                        onError={handleError}
                        onLoad={handleImageLoad}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
              {lightboxOpen && (
                <Lightbox
                  image={currentImage}
                  imageStyle={imageStyle}
                  imageRatio={imageRatio}
                  onClose={() => setLightboxOpen(false)}
                />
              )}
              <Box
                sx={{
                  my: "4rem",
                  width: "100%",
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{ fontSize: "2rem" }}
                  >
                    Reviews
                  </Typography>
                  <Box sx={{ width: "100%", my: 3 }}>
                    <Rating
                      name="simple-controlled"
                      value={starValue}
                      onChange={(event, newValue) => {
                        setStarValue(newValue);
                      }}
                    />
                    <Box sx={{ width: "95%" }}>
                      <textarea
                        aria-label="review textbox"
                        rows={10}
                        value={reviewComment}
                        onChange={(event) => {
                          setReviewComment(event.target.value);
                        }}
                        style={{
                          width: "100%",
                          borderRadius: "1rem",
                          padding: "1rem",
                        }}
                        placeholder="Write a review"
                      />
                      <Box>
                        <Button
                          variant="outlined"
                          onClick={() => reviewSubmitHandler()}
                          sx={{ float: "right", mt: 2, mr: 2 }}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ width: "100%", my: 3 }}>
                    {reviewList?.data?.map((r, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", width: "100%", gap: 2, my: 2 }}
                      >
                        <Avatar sx={{ width: 50, height: 50 }}></Avatar>
                        <Box>
                          <Typography>{r?.user?.name}</Typography>
                          <Box
                            sx={{
                              padding: 2,
                              background: "whitesmoke",
                              boxShadow: 2,
                              borderRadius: "0.5rem",
                            }}
                          >
                            <Rating
                              name="simple-controlled"
                              value={r?.rating * 1}
                              sx={{ background: "white" }}
                              readOnly
                            />
                            <Typography sx={{ color: "black" }}>
                              {r.comment}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                    <Pagination
                      size="large"
                      count={reviewList?.last_page}
                      color="primary"
                      page={page}
                      onChange={handleChange1}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: {
                  xs: "90%",
                  md: "40%",
                },
                height: {
                  xs: "80vh",
                  md: "950px",
                },
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  mb: 2,
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  component="h3"
                  sx={{ fontSize: "1.6rem", color: "white", width: "50%" }}
                >
                  {productDetailFrontendStatus === "loading" ? (
                    <Skeleton />
                  ) : (
                    productDetailFrontend?.category?.name
                  )}
                </Typography>
                <Box
                  sx={{
                    width: "auto",
                    boxShadow: 3,
                    background: "white",
                    borderRadius: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    my: "auto",
                    p: 1,
                  }}
                >
                  {productDetailFrontendStatus === "loading" ? (
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={"2rem"}
                    />
                  ) : (
                    <Rating
                      name="simple-controlled"
                      readOnly
                      sx={{
                        "&.MuiRating-icon ": {
                          color: "#faaf00!Important",
                        },
                      }}
                      defaultValue={productDetailFrontend?.average_rating * 1}
                    />
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  component="h3"
                  sx={{ fontSize: "1.2rem", fontWeight: "thin" }}
                >
                  {productDetailFrontendStatus === "loading" ? (
                    <Skeleton width="30%" />
                  ) : (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "yellowgreen" }}
                      >
                        {shopCurrency}{" "}
                      </Typography>
                      {
                        productDetailFrontend?.variations[
                          variation === null ? 0 : variation
                        ]?.prices?.filter((p) =>
                          shopCurrency?.toLowerCase().includes(p?.country)
                        )?.[0]?.sale_price
                      }
                    </Box>
                  )}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    sx={{
                      background: "white",
                      color: "blue",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                    disabled={
                      productDetailFrontend?.target_country.includes(
                        shopCountry
                      ) && variation !== null
                        ? false
                        : (productDetailFrontend?.variations?.length > 0 &&
                            variation === null) ||
                          productDetailFrontendStatus === "loading"
                    }
                    onClick={() => handleAddToCart()}
                  >
                    {productDetailFrontendStatus === "loading" ? (
                      <Skeleton width="100%" />
                    ) : (
                      <>
                        Add to Cart <ShoppingCartIcon sx={{ ml: 1 }} />
                      </>
                    )}
                  </Button>
                  {/* <Button variant="outlined">
                    {productDetailFrontendStatus === "loading" ? (
                      <Skeleton width="20%" />
                    ) : (
                      <>
                        Buy Now <PaymentIcon sx={{ ml: 1 }} />
                      </>
                    )}
                  </Button> */}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mb: 2,
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Box
                      sx={{
                        width: "15rem",
                        overflow: "hidden",
                        display: "flex",
                      }}
                    >
                      {productDetailFrontendStatus === "loading" ? (
                        <Skeleton variant="rectangular" height={"3rem"} />
                      ) : (
                        <FormControl
                          fullWidth
                          sx={{
                            mt: 3,
                            mb: 4,
                            width: "100%",
                            background: "white",
                            borderRadius: "1rem",
                          }}
                        >
                          <InputLabel
                            id="demo-controlled-open-select-label"
                            sx={{ color: "black", mb: 2 }}
                          >
                            Variations
                          </InputLabel>
                          <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={variation}
                            fullWidth
                            onChange={(e) => {
                              handleChange(e);
                              setCurrentImage(
                                process.env.REACT_APP_BACKEND_URL +
                                  "storage/" +
                                  productDetailFrontend?.variations?.[
                                    e.target.value
                                  ]?.images[0]?.url
                              );
                            }}
                            sx={{
                              background: "white",
                              borderRadius: "1rem",
                            }}
                            label={"Variations"}
                          >
                            {productDetailFrontend?.variations?.map((v, id) => (
                              <MenuItem
                                value={id}
                                key={id}
                                sx={{ color: "black" }}
                              >
                                {v.size !== null ? "size :" + v.size : ""},
                                {v.color !== null ? "color :" + v.color : ""}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      my: 1,
                      display: "flex",
                      flexDirection: "column",

                      gap: 2,
                    }}
                  >
                    <Typography>
                      Stock :{" "}
                      {variation === null
                        ? stock
                        : productDetailFrontend?.variations[variation]
                            ?.stock_quantity}
                    </Typography>
                    <QuantityButtonGroup
                      value={quantity}
                      disabled={
                        productDetailFrontend?.variations?.length > 0 &&
                        variation === null
                      }
                      setValue={setQuantity}
                      disabledTotalControl={true}
                      max={stock == null ? 0 : stock}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    background: "white",
                    p: 2,
                    mt: 2,
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    borderRadius: "1rem",
                    boxShadow: 3,
                    minWidth: "10rem",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                      }}
                    >
                      <LocalShippingIcon sx={{ color: "red" }} />
                      <Typography sx={{ color: "black" }}>
                        Free shipping{" "}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                      }}
                    >
                      <HourglassBottomIcon sx={{ color: "red" }} />
                      <Typography sx={{ color: "black" }}>
                        {productDetailFrontend?.delivery_time}{" "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mt: "2rem" }}>
                {/* <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <StoreIcon sx={{ color: "green" }} />
                  <Typography>
                    Supplier : {productDetailFrontend?.supplier?.name}{" "}
                  </Typography>
                </Box> */}
              </Box>
              <Box sx={{ my: 2 }}>
                <Box
                  sx={{
                    border: "2px solid orange",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ width: "100%", p: 2, background: "whitesmoke" }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <PolicyIcon sx={{ color: "black" }} />
                      <Typography sx={{ fontWeight: "bold", color: "black" }}>
                        Return Refund Policy
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      p: 2,
                      maxHeight: "10rem",
                      overflowY: "auto",
                      background: "white",
                      color: "black",
                    }}
                  >
                    {productDetailFrontend?.supplier?.return_refund}
                  </Box>
                </Box>
              </Box>

              {productDetailFrontend?.description !== undefined &&
                productDetailFrontend?.description !== null && (
                  <Box sx={{ mt: "2rem" }}>
                    <Typography variant="h5" component="h5">
                      {productDetailFrontendStatus === "loading" ? (
                        <Skeleton width="30%" />
                      ) : (
                        <>Description</>
                      )}
                    </Typography>

                    {productDetailFrontendStatus === "loading" ? (
                      <Typography
                        variant="p"
                        component="p"
                        sx={{ width: "100%" }}
                      >
                        <Skeleton
                          animation="wave"
                          height={20}
                          style={{ marginBottom: 6 }}
                        />
                        <Skeleton animation="wave" height={20} width="80%" />
                        <Skeleton animation="wave" height={20} width="70%" />
                        <Skeleton animation="wave" height={20} width="80%" />
                      </Typography>
                    ) : (
                      <>
                        {productDetailFrontend?.description !== undefined && (
                          <Box
                            sx={{
                              py: 1,
                              color: "",
                              borderRadius: "0.5rem",
                            }}
                          >
                            <JsonToHtml
                              jsonData={JSON.parse(
                                productDetailFrontend?.description
                              )}
                            />
                          </Box>
                        )}
                      </>
                    )}
                  </Box>
                )}
              <Box
                sx={{
                  my: "4rem",
                  width: "100%",
                  display: {
                    xs: "block",
                    md: "none",
                  },
                  height: "400px",
                  overflow: "auto",
                  scrollbarWidth: "none",
                }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{ fontSize: "2rem" }}
                  >
                    Reviews
                  </Typography>
                  <Box sx={{ width: "100%", my: 3 }}>
                    <Rating
                      name="simple-controlled"
                      value={starValue}
                      onChange={(event, newValue) => {
                        setStarValue(newValue);
                      }}
                    />
                    <Box sx={{ width: "95%" }}>
                      <textarea
                        aria-label="review textbox"
                        rows={10}
                        value={reviewComment}
                        onChange={(event) => {
                          setReviewComment(event.target.value);
                        }}
                        style={{
                          width: "100%",
                          borderRadius: "1rem",
                          padding: "1rem",
                        }}
                        placeholder="Write a review"
                      />
                      <Box>
                        <Button
                          variant="outlined"
                          onClick={() => reviewSubmitHandler()}
                          sx={{ float: "right", mt: 2, mr: 2 }}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ width: "100%", my: 3 }}>
                    {reviewList?.data?.map((r, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", width: "100%", gap: 2, my: 2 }}
                      >
                        <Avatar sx={{ width: 50, height: 50 }}></Avatar>
                        <Box>
                          <Typography sx={{ color: "black" }}>
                            {r?.user?.name} name udpate
                          </Typography>
                          <Box
                            sx={{
                              padding: 2,
                              background: "whitesmoke",
                              boxShadow: 2,
                              color: "black",
                              borderRadius: "0.5rem",
                            }}
                          >
                            <Rating
                              name="simple-controlled"
                              defaultValue={r?.rating * 1}
                              sx={{
                                background: "white",
                              }}
                              readOnly
                            />
                            <Typography sx={{ color: "black" }}>
                              {r.comment}
                              {r?.rating}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                    <Pagination
                      size="large"
                      count={reviewList?.last_page}
                      color="primary"
                      page={page}
                      onChange={handleChange1}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>

          <Box sx={{ my: "4rem", width: "100%" }}>
            <Box>
              <Typography
                variant="h3"
                component="h3"
                sx={{ mb: 4, fontSize: "2rem" }}
              >
                Related Products
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              {relatedProductListStatus === "succeeded" &&
                relatedProductList?.data?.map((item) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flex: {
                        xs: 1,
                        sm: 0,
                      },
                    }}
                  >
                    <ShopCard
                      key={item.id}
                      id={item.id}
                      title={item.name}
                      item={item}
                      price={
                        item.variations[0]?.prices?.filter((p) =>
                          shopCurrency?.toLowerCase().includes(p?.country)
                        )?.[0]?.sale_price
                      }
                      category={item?.category?.name}
                      categoryId={item?.category_id}
                      image={`${process.env.REACT_APP_BACKEND_URL}storage/${item.primary_image?.url}`}
                      rating={item?.ratings_avg_rating}
                      relatedProductCard={true}
                    />
                  </Box>
                ))}

              {relatedProductList?.data?.length < 1 && (
                <Typography>Nothing to show ...</Typography>
              )}
              {relatedProductListStatus === "loading" && (
                <>
                  <ShopCard loading={true} />
                  <ShopCard loading={true} />
                  <ShopCard loading={true} />
                  <ShopCard loading={true} />
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default ProductDetails;
