import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ProductForm from "../../../../components/Backend/Admin/Posts/ProductForm";
import { fetcheditPostsAsync } from "../../../../redux/thunk/Posts";
import Lightbox from "../../../../components/Frontend/PTEShop/Product/LightBox";
import JsonToHtml from "../../../../components/Backend/Admin/Posts/EditorHTMLContent";

const TextLayout = ({ title, detail }) => {
  return (
    <>
      <Box sx={{ width: "100%", display: "flex" }}>
        <Box sx={{ width: "30%", color: "#757575" }}>{title}</Box>
        <Box sx={{ width: "60%", color: "black", fontWeight: "bold" }}>
          {title !== "description" && detail}
        </Box>
      </Box>
    </>
  );
};

const Detail = () => {
  const { editPost, editStatus } = useSelector((state) => state.posts);
  const postId = useParams();
  const [currentVariation, setCurrentVariation] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageRatio, setImageRatio] = useState(false);
  const [clickedVariationId, setClickedVariationId] = useState(null);

  const [item, setItem] = useState([]);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [imageStyle, setImageStyle] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState([]);
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
    dispatch(fetcheditPostsAsync({ path: "products", id: postId.id }));
  }, [dispatch, postId.id]);

  useEffect(() => {
    if (editStatus === "succeeded") {
      setProductDetails(editPost);
      let imageArray = editPost?.images?.map((i) => {
        let image = { url: i.url, id: i.id };
        return image;
      });
      setCurrentImage(editPost?.images?.[0].url);
      if (editPost?.variations?.length > 0) {
        editPost?.variations?.forEach((i) => {
          for (let index = 0; index < i.images.length; index++) {
            imageArray?.push({
              url: i.images[index].url,
              id: i.images[index].id,
            });
          }
        });
      }
      setImages(imageArray);
    }
  }, [editStatus, editPost]);

  return (
    <>
      <Box id="main" sx={{ width: "100%", p: 4 }}>
        <Box
          sx={{
            top: "1rem",

            position: "absolute",
            overflow: "visible",
            zIndex: 1500,
          }}
        ></Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 2 }}>
            Product Detail
          </Typography>
          <Box className="container-fluid">
            <div className="card">
              <Link
                onClick={() => {
                  navigate(-1);
                }}
                style={{
                  textDecoration: "none",

                  display: "flex",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#2196f3",
                    color: "white",
                    "&:hover": {
                      bgcolor: "white",
                    },
                    mb: 2,
                  }}
                >
                  <ArrowBackIcon></ArrowBackIcon> Back
                </Button>
              </Link>
            </div>
          </Box>
        </Box>
        {(editStatus === "loading" || editStatus === "failed") && (
          <Box>
            <Typography variant="h5">{editStatus}</Typography>
          </Box>
        )}

        {editStatus === "succeeded" && editPost !== undefined && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                background: "white",
                padding: 2,
                borderRadius: "0.5rem",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    md: "50%",
                  },
                }}
              >
                <TextLayout title={"Name"} detail={editPost?.name} />
                <TextLayout title={"Sku"} detail={editPost?.sku} />
                <TextLayout
                  title={"Supplier"}
                  detail={editPost?.supplier?.name}
                />
                <TextLayout
                  title={"Category"}
                  detail={editPost?.category?.name}
                />
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ width: "30%" }}>
                    <Typography sx={{ color: "gray" }}>Description</Typography>
                  </Box>

                  <JsonToHtml jsonData={JSON.parse(editPost?.description)} />
                </Box>
                <TextLayout
                  title={"Regular Price"}
                  detail={editPost?.regular_price}
                />
                <TextLayout
                  title={"Purchase Price"}
                  detail={editPost?.purchase_price}
                />
                <TextLayout
                  title={"Sale Price"}
                  detail={editPost?.sale_price}
                />
                <TextLayout
                  title={"Stock Quantity"}
                  detail={editPost?.stock_quantity}
                />
                <Box sx={{ my: 2 }}>
                  <TextField
                    id="Variation"
                    select
                    variant="outlined"
                    label={<Typography variant="h6">Variations</Typography>}
                    InputProps={{
                      sx: {},
                    }}
                    fullWidth
                    helperText={"Variant type"}
                    onChange={(e) => {
                      setClickedVariationId(e.target.value);
                      setCurrentImage(
                        editPost?.variations?.[e.target.value]?.images[0]?.url
                      );
                    }}
                  >
                    {editPost?.variations?.map((s, index) => (
                      <MenuItem key={index} value={index}>
                        {s.color !== null && (
                          <>
                            Color :
                            <span
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              {s.color} ,
                            </span>
                          </>
                        )}
                        {s.size !== null && (
                          <>
                            Size :
                            <span
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              {s.size}
                            </span>
                          </>
                        )}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                {clickedVariationId !== null && (
                  <Box sx={{ p: 1, pl: 2, backgroundColor: "#fff1d0" }}>
                    <TextLayout
                      title={"color"}
                      detail={editPost?.variations[clickedVariationId].color}
                    />
                    <TextLayout
                      title={"Size"}
                      detail={editPost?.variations[clickedVariationId].size}
                    />
                    <TextLayout
                      title={"Sku"}
                      detail={editPost?.variations[clickedVariationId].sku}
                    />
                    <TextLayout
                      title={"Purchase price"}
                      detail={
                        editPost?.variations[clickedVariationId].purchase_price
                      }
                    />
                    <TextLayout
                      title={"Regular price"}
                      detail={
                        editPost?.variations[clickedVariationId].regular_price
                      }
                    />
                    <TextLayout
                      title={"Sale price"}
                      detail={
                        editPost?.variations[clickedVariationId].sale_price
                      }
                    />
                  </Box>
                )}
              </Box>
              <Box sx={{ width: "45%" }}>
                <Box
                  sx={{
                    width: "100%",

                    aspectRatio: " 1 / 0.7",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 5,
                      width: "100%",
                      height: "100%",

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
                      {editStatus !== "succeeded" ? (
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
                          {images.map((image, index) => (
                            <img
                              key={index}
                              src={`${process.env.REACT_APP_BACKEND_URL}storage/${image.url}`}
                              alt={`Thumbnail ${index + 1}`}
                              style={{
                                cursor: "pointer",
                                width: "100%",
                                height: "auto",

                                borderRadius: "0.5rem",
                              }}
                              onClick={() => {
                                setCurrentImage(image.url);
                                // setLightboxOpen(true);
                              }}
                            />
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
                          md: "70%",
                        },

                        // maxWidth: {
                        //   xs: "10rem",
                        //   sm: "20rem",
                        //   md: "800px",
                        // },
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
                      {editStatus !== "succeeded" ? (
                        <Box sx={{ width: "100%", aspectRatio: " 1 / 1" }}>
                          <Skeleton
                            sx={{
                              width: "100%",
                              // height: "100%",

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
                            height: "100%",

                            aspectRatio: " 1 / 1",

                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}storage/${currentImage}`}
                            alt={`Thumbnail ${currentImage}`}
                            style={{
                              cursor: "pointer",
                              ...imageStyle,
                            }}
                            onClick={() => {
                              //   setCurrentImage(currentImage);
                              setLightboxOpen(true);
                            }}
                            onLoad={handleImageLoad}
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                  {lightboxOpen && (
                    <Lightbox
                      image={`${process.env.REACT_APP_BACKEND_URL}storage/${currentImage}`}
                      imageStyle={imageStyle}
                      imageRatio={imageRatio}
                      onClose={() => setLightboxOpen(false)}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Detail;
