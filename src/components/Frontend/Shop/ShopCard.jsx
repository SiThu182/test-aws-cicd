import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, Skeleton, Rating } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { NavLink, useNavigate } from "react-router-dom";
import { addToCart } from "../../../redux/slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ShopCard({
  title,
  item,
  price,
  image,
  category,
  categoryId,
  id,
  addToCartVisible,
  loading = false,
  rating,
  relatedProductCard = false,
}) {
  // const { userCart } = useSelector((state) => state.user);
  const { shopCurrency, currencyRate } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const [starValue, setStarValue] = React.useState(rating);

  const [imageLoading, setImageLoading] = React.useState(true);
  const [imageStyle, setImageStyle] = React.useState({});
  const [stock, setStock] = React.useState(null);
  const navigate = useNavigate();
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;

    if (naturalWidth >= naturalHeight) {
      // Landscape orientation

      setImageStyle({ width: "100%", height: "auto" });
    } else {
      // Portrait orientation
      setImageStyle({ height: "100%", width: "auto" });
    }
  };
  const errImgSrc =
    process.env.REACT_APP_FRONTEND_URL + "Image/error-image.png";
  const handleError = (e) => {
    e.target.src = errImgSrc; // Set the fallback image dynamically
  };
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    let totalStock = 0;
    if (item !== undefined) {
      item?.variations?.forEach((v) => {
        totalStock += v?.stock_quantity;
      });
      setStock(totalStock);
    }
  }, [item]);

  return (
    <Box>
      <Card
        sx={{
          width: {
            xs: 220,
            sm: 250,
            md: 300,
          },
          position: "relative",
          aspectRatio: {
            xs: 1 / 2,
            sm: 1 / 1.9,
            md: 1 / 1.7,
          },
          padding: 1,

          boxShadow: 1,
          "&:hover": {
            boxShadow: 5,
          },
        }}
      >
        {loading ? (
          <Box
            width="90%"
            sx={{
              borderRadius: "0.5rem",
              border: "1px solid whitesmoke",
              aspectRatio: 1 / 1,
            }}
          >
            <Skeleton
              variant="rectangular"
              sx={{
                width: {
                  xs: "5rem",
                  sm: "15rem",
                },

                height: "100%",
              }}
            ></Skeleton>
          </Box>
        ) : (
          <CardMedia
            component="img"
            width="100%"
            sx={{
              border: "1px solid whitesmoke",
              aspectRatio: 1 / 1,
              objectFit: "contain",
              ...imageStyle,
              cursor: "pointer",
            }}
            image={`${image}`}
            alt="product-img"
            onError={handleError}
            onClick={() => {
              navigate(
                relatedProductCard
                  ? "/pte-shop/product-details/" + id + "/" + categoryId
                  : "product-details/" + id + "/" + categoryId
              );
              if (relatedProductCard) {
                handleScrollToTop();
              }
            }}
            onLoad={(e) => {
              handleImageLoad(e);
              setImageLoading(false);
            }}
          />
        )}
        {stock !== null && stock <= 0 && (
          <Box
            width="90%"
            sx={{
              borderRadius: "0.5rem",
              border: "1px solid whitesmoke",

              position: "absolute",
              top: "30%",
              zIndex: 11,
              left: "10%",
              backdropFilter: "blur(5px)",
              transform: "rotate(45deg)",
            }}
          >
            <Typography
              variant="h3"
              component="h3"
              sx={{ color: "red", padding: "1rem", textAlign: "center" }}
            >
              Sold out !
            </Typography>
          </Box>
        )}

        <CardContent sx={{ background: "whitesmoke" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              flexDirection: "column",
            }}
          >
            <Rating
              name="simple-controlled"
              value={starValue}
              readOnly
              onChange={(event, newValue) => {
                setStarValue(newValue);
              }}
            />
            <Typography
              gutterBottom
              variant="h5"
              sx={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                fontWeight: "bold",
                width: "90%",
                margin: "auto",
                textAlign: "center",
                color: "rgb(18 ,82,166)",
              }}
            >
              {loading ? <Skeleton /> : title}
            </Typography>
            <Typography
              gutterBottom
              sx={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                fontWeight: "thin",
                width: "90%",
                fontSize: "1rem",
                color: "gray",
                margin: "auto",
                textAlign: "center",
              }}
            >
              {loading ? <Skeleton /> : category}
            </Typography>
            <Typography
              variant="body5"
              color="text.secondary"
              sx={{ color: "black" }}
            >
              {loading ? (
                <Skeleton width={"100% "} />
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <AttachMoneyIcon />
                  {price}{" "}
                  <span style={{ fontWeight: "bold", margin: "0 1rem" }}>
                    {" "}
                    {shopCurrency}
                  </span>
                </Box>
              )}
            </Typography>
            <Box sx={{ ml: 1, my: 2 }}>
              {addToCartVisible ? (
                <Button
                  sx={{ background: stock <= 0 ? "gray" : "rgb(18 ,82,166)" }}
                  disabled={stock <= 0}
                  onClick={() => {
                    dispatch(
                      addToCart({
                        title: title,
                        price: price,
                        id: id,
                        stock: stock,
                        image: image,
                        product_variantions_id: null,
                        quantity: 1,
                        category: category,
                      })
                    );
                  }}
                >
                  {loading ? <Skeleton width={"100% "} /> : "Add To Cart"}
                </Button>
              ) : (
                <NavLink
                  to={
                    relatedProductCard
                      ? "/pte-shop/product-details/" + id + "/" + categoryId
                      : "product-details/" + id + "/" + categoryId
                  }
                >
                  {loading ? (
                    <Skeleton width={"100% "} />
                  ) : (
                    <Button variant="contained">Select Options</Button>
                  )}
                </NavLink>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                {loading ? (
                  <Skeleton width={"100%"} />
                ) : (
                  <>{stock !== null ? stock : "-"} stocks left</>
                )}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
