import React, { useEffect, useRef, useState } from "react";
import Layout from "../../Layout/Frontend/Layout";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
//import ReusableSwitch from "../../Switch/ReusableSwitch";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import ShopCard from "../Shop/ShopCard";
import { useDispatch, useSelector } from "react-redux";
// import jsonData from "./Product/item.json";
//import { FetchShopApi } from "../../../redux/api/ShopApi";
import { fetchProductListAsync } from "../../../redux/thunk/Shop";
import PaginationComponent from "../../Backend/PaginationComponent";
import { setShopCurrency } from "../../../redux/slice/ShopSlice";

function Shop() {
  const [bannerLoading, setBannerLoading] = useState(true);
  const { userCart } = useSelector((state) => state.user);
  //const [selectType, setSelectType] = useState("Wire");
  //const [imageStyle, setImageStyle] = useState({});

  //const [wireHeadphoneData, setWireHeadphoneData] = useState([]);
  //const [wirelessHeadphoneData, setWirelessHeadphoneData] = useState([]);
  //const [dataLoading, setDataLoading] = useState(true);
  const {
    productList,
    productListStatus,
    shopCurrency,
    currencyRate,
    shopCountry,
  } = useSelector((state) => state.shop);
  const imgRef = useRef(null);
  const navigate = useNavigate();
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;

    if (naturalWidth >= naturalHeight) {
      // Landscape orientation
      console.log("width greater");
      //setImageStyle({ width: "100%", height: "auto" });
    } else {
      console.log("height greater");
      // Portrait orientation
      //setImageStyle({ height: "100%", width: "auto" });
    }
  };

  useEffect(() => {
    // Check if the image is already loaded

    if (imgRef.current && imgRef.current.complete) {
      setBannerLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   if (wirelessHeadphoneData?.length > 0 && wireHeadphoneData?.length) {
  //     setDataLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   setWireHeadphoneData(jsonData.products?.wire);
  //   setWirelessHeadphoneData(jsonData.products?.wireless);
  // }, []);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const path = "get-all-products?page" + page + "&country=" + shopCountry;
  useEffect(() => {
    dispatch(fetchProductListAsync(path));
  }, [path, dispatch]);

  let handleChange = (event, p) => {
    setPage(p);
  };

  const [currency, setCurrency] = React.useState("");

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
    dispatch(setShopCurrency(event.target.value));
  };

  return (
    <Layout bgColor="#093E7C">
      <Box
        sx={{
          width: "100%",
          // height: "70vh",
          // backgroundImage: `url(${process.env.REACT_APP_FRONTEND_URL}Image/subscription_banner.png)`,
          // backgroundPosition: "center",
          // backgroundSize: "cover",
          // backgroundAttachment: "fixed",
          // backgroundBlendMode: "overlay",
        }}
      >
        {bannerLoading && (
          <Box
            sx={{
              minHeight: "60vh",
              maxHeight: "800px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={50} />
          </Box>
        )}
        <img
          ref={imgRef}
          src={`${process.env.REACT_APP_FRONTEND_URL}Image/AIGMA-PTE-AI.png`}
          alt="subscription-banner"
          style={{
            width: "100%",
            display: bannerLoading ? "none" : "block",
          }}
          onLoad={(e) => {
            handleImageLoad(e);
            setBannerLoading(false);
          }}
        />
      </Box>
      <Box sx={{ backgroundColor: "#093E7C", height: "auto", pb: "5rem" }}>
        <Box
          sx={{
            width: "90vw",
            maxWidth: "1350px",
            margin: "0 auto",
            pt: "2rem",
          }}
        >
          <Box>
            <Box sx={{}}>
              {/* <Typography
                component="h1"
                sx={{ fontSize: "2.5rem", fontWeight: "bold" }}
              >
                Shop
              </Typography> */}
            </Box>
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Shop Currency
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={shopCurrency}
                    label="currency"
                    onChange={handleCurrencyChange}
                    sx={{
                      bgcolor: "white",
                      boxShadow: "0 0 0 2px gray",
                      "&.MuiPaper-root": {
                        bgcolor: "red",
                      },
                    }}
                  >
                    <MenuItem value={"SGD"}>Singapore</MenuItem>
                    <MenuItem value={"AUD"}>Australia</MenuItem>
                    <MenuItem value={"THB"}>Thailand</MenuItem>
                    {/* <MenuItem value={"NZD"}>New Zealand</MenuItem>
                    <MenuItem value={"MMK"}>Myanmar</MenuItem> */}
                  </Select>
                </FormControl>
              </Box>
              {/* <ReusableSwitch
                title1={"Wire"}
                title2={"Wireless"}
                setSelectType={setSelectType}
              /> */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" sx={{ color: "white" }}>
                  Go to Cart
                </Typography>

                <Button
                  sx={{
                    background: "white",
                    borderRadius: "0.5rem",
                    boxShadow: 5,
                    padding: 1,
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
            <Box sx={{ py: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* <NavLink sx={{ textDecoration: "underline" }}>
                  <Typography variant="h5" sx={{ color: "white" }}>
                    See All
                  </Typography>
                </NavLink> */}
                {/* <Typography variant="h4" sx={{}}>
                  Headphones
                </Typography> */}
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 2,
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                {productListStatus === "succeeded" &&
                  productList?.data?.map((item) => (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <ShopCard
                        key={item.id}
                        id={item.id}
                        item={item}
                        title={item.name}
                        // stock={item.stock_quantity}
                        price={
                          item.variations[0]?.prices?.filter((p) =>
                            shopCurrency?.toLowerCase().includes(p?.country)
                          )?.[0]?.sale_price
                        }
                        category={item?.category?.name}
                        categoryId={item?.category_id}
                        image={`${process.env.REACT_APP_BACKEND_URL}storage/${item.primary_image?.url}`}
                        rating={item?.average_rating}
                      />
                    </Box>
                  ))}
                {productListStatus === "succeeded" &&
                  productList?.data?.length == 0 && (
                    <Typography variant="h5" sx={{ my: 2, color: "white" }}>
                      Nothing to show ...
                    </Typography>
                  )}

                {productListStatus === "loading" && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <ShopCard loading={productListStatus === "loading"} />
                    <ShopCard loading={productListStatus === "loading"} />
                    <ShopCard loading={productListStatus === "loading"} />
                    <ShopCard loading={productListStatus === "loading"} />
                  </Box>
                )}
                {productListStatus === "failed" && (
                  <Box>
                    Failed to get products .Please retry after some times.
                  </Box>
                )}
              </Box>

              <Box
                sx={{
                  mx: 1.5,
                  my: 2.5,
                  width: "90%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <PaginationComponent
                  page={page}
                  size={"medium"}
                  totalPage={productList?.last_page}
                  handleChange={handleChange}
                ></PaginationComponent>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                borderRadius: "1rem",

                my: "5rem",
                boxShadow: 4,
              }}
            >
              <img
                src={`${process.env.REACT_APP_FRONTEND_URL}Image/Get-Discount Buy-Aigma-Plans-2.png`}
                alt={"discount-bg"}
                style={{ width: "100%", height: "auto", minHeight: "20vh" }}
              />
              {/* <Box
                sx={{
                  width: {
                    xs: "100%",
                    md: "50%",
                  },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: "rgb(18 ,82,166)",
                    fontWeight: "bolder",
                    mb: "2rem",
                  }}
                >
                  Get <span style={{ color: "red" }}>5%</span> Discount <br />
                  Buy Aigma Plans
                </Typography>
                <Button
                  variant="contained"
                  size="lg"
                  sx={{ fontSize: "1.4rem" }}
                >
                  Shop Now
                </Button>
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ background: "rgb(247,245,253)" }}>
        <Box
          sx={{
            width: "100%",
            height: "70vh",
            maxHeight: "800px",
            backgroundImage: `url(${process.env.REACT_APP_FRONTEND_URL}Image/headphone-bg.png)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundBlendMode: "overlay",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "white",
                fontWeight: "bolder",
                textTransform: "capitalize",
                textAlign: "center",
                mb: "2rem",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              Explore Your Headphone
              <br /> With Aigma
            </Typography>
            <Button
              variant="contained"
              sx={{ fontSize: "1.4rem", color: "yellow" }}
            >
              Contact Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default Shop;
