import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import QuantityButtonGroup from "./QuantityButtonGroup";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../../redux/slice/UserSlice";
import axios, { AxiosError } from "axios";
import { getCookie } from "../../../Utils/GetCookies";
import swal from "sweetalert";
const CartRow = React.memo(
  ({
    title,
    cartIndex,
    price,
    amount,
    image,
    country,
    stock,
    applyCoupon,
    removeCoupon,
    id,
    category,
    variant_id,
    orderId = null,
    handleCartCheck,
    coupons,
    checkOut = false,
    defaultCoupon = null,
    isReCheckOut = false,
  }) => {
    // const [isRemoved, setIsRemoved] = useState(false);
    const { shopCurrency, currencyRate, shopCountry } = useSelector(
      (state) => state.shop
    );
    const [quantity, setQuantity] = useState(amount);
    const [isApplied, setIsApplied] = useState(false);
    const [checked, setChecked] = useState(false);
    const [discount, setDiscount] = useState(0);
    const dispatch = useDispatch();
    const [isRemoving, setIsRemoving] = useState(false);
    const [coupon, setCoupon] = useState(defaultCoupon || "");
    const backendURL = `${process.env.REACT_APP_BACKEND_ADMIN}validate-coupon`;
    const backendRemoveURL = `${process.env.REACT_APP_BACKEND_ADMIN}remove-applied-coupon`;
    const remove = () => {
      handleCartCheck(cartIndex);
      dispatch(
        removeItem({
          price: price,
          quantity: quantity,
          id: id,
          index: cartIndex,
          product_variations_id: variant_id,
        })
      );
    };
    // useEffect(() => {
    //   if (isRemoved) handleCartCheck(cartIndex);
    // }, [isRemoved, handleCartCheck, cartIndex]);
    let token = getCookie("userToken");

    let userId = localStorage.getItem("userId");

    console.log(coupon, "coupon");

    const clickApply = useCallback(async () => {
      let config = {
        headers: { Authorization: "Bearer " + token },
      };

      if (!coupons.includes(coupon)) {
        try {
          const result = await axios.post(
            backendURL,
            {
              code: coupon,
              user_id: userId,
              order_id: orderId,
            },
            config
          );
          if (result.status === 200) {
            applyCoupon(coupon, variant_id, result.data.discount);
            setIsApplied(true);
            setDiscount(result.data.discount);
            swal({
              title: "Success",
              text: result.data.message,
              icon: "Success",
              button: "OK!",
            });
          } else {
            swal({
              title: "Warning",
              text: result.data.message,
              icon: "warning",
              button: "OK!",
            });
          }
        } catch (error) {
          let errorMessage = "";
          if (error instanceof AxiosError) {
            if (error?.response?.data?.error) {
              errorMessage = error?.response?.data?.error;
            } else {
              errorMessage = error.message;
            }
          } else {
            errorMessage = "Unknown Error occured";
          }
          swal({
            title: "Warning",
            text: errorMessage,
            icon: "warning",
            button: "OK!",
          });
        }
      } else {
        swal({
          title: "Warning",
          text: "Already applied.",
          icon: "warning",
          button: "OK!",
        });
      }
    }, []);

    useEffect(() => {
      if (defaultCoupon != null) {
        console.log("default aply");
        setCoupon(defaultCoupon);
        clickApply();
      }
    }, []);

    const clickRemove = async () => {
      if (defaultCoupon !== null && defaultCoupon == coupon) {
        let config = {
          headers: { Authorization: "Bearer " + token },
        };
        try {
          setIsRemoving(true);
          let result = await axios.post(
            backendRemoveURL,
            {
              code: coupon,
              user_id: userId,
              order_id: orderId,
            },
            config
          );
          if (result.status === 200) {
            setIsApplied(false);
            setCoupon("");
            setDiscount(0);
            removeCoupon(coupon);
            setIsRemoving(false);
          }
        } catch (error) {
          swal({
            title: "Success",
            text: error.message,
            icon: "Success",
            button: "OK!",
          });
          setIsRemoving(false);
        }
      } else {
        setIsApplied(false);
        setCoupon("");
        setDiscount(0);
        removeCoupon(coupon);
      }
    };
    return (
      <Box sx={{ display: "block" }}>
        <Grid container spacing={2} sx={{ p: "1rem" }}>
          <Grid items xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                justifyContent: {
                  xs: "center",
                  sm: "center",
                },
              }}
            >
              {!checkOut && (
                <Box sx={{ width: "2rem" }}>
                  <Checkbox
                    disabled={!country?.includes(shopCountry)}
                    checked={checked}
                    inputProps={{ "aria-label": "controlled" }}
                    onClick={() => {
                      setChecked((prev) => !prev);
                      handleCartCheck(cartIndex);
                    }}
                  />
                </Box>
              )}

              <Box
                sx={{
                  minHeight: 150,
                  height: "10rem",

                  width: {
                    xs: "100%",
                    md: "50%",
                  },

                  minWidth: "8rem",
                }}
              >
                <img
                  src={`${image}`}
                  alt="item-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "center",
                    objectFit: "contain",
                    borderRadius: "1rem",
                  }}
                />
              </Box>
              <Box
                sx={{
                  p: 2,
                  maxWidth: {
                    xs: "auto",
                    sm: "10rem",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: "gray", fontWeight: "bold" }}
                >
                  {category}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    width: "100%",
                    fontWeight: "bolder",
                    color: "rgb(18 ,82,166)",
                  }}
                >
                  {title}
                </Typography>
                <Box>
                  <Typography variant="body2" sx={{}}>
                    Attribute
                  </Typography>
                  <Typography variant="body2" sx={{}}>
                    Wire
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid items xs={12} sm={2}>
            <Box
              sx={{
                display: "flex",
                height: "100%",
                justifyContent: {
                  xs: "flex-start",
                  sm: "center",
                },
                alignItems: "center",
                my: {
                  xs: 2,
                },
              }}
            >
              <Typography>
                {shopCurrency} {price}{" "}
              </Typography>
            </Box>
          </Grid>
          <Grid items xs={12} sm={4}>
            {!checkOut ? (
              <Box
                sx={{
                  display: "flex",
                  height: "100%",
                  position: "relative",
                  justifyContent: {
                    xs: "flex-start",
                    sm: "center",
                  },
                  alignItems: "center",
                  flexDirection: "column",
                  my: {
                    xs: 2,
                  },
                }}
              >
                <QuantityButtonGroup
                  value={quantity}
                  cart={true}
                  id={id}
                  variant_id={variant_id}
                  setValue={setQuantity}
                  price={price}
                  max={stock}
                />
                <Box sx={{ position: "absolute", bottom: 20 }}>
                  max quantity - {stock}
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  my: {
                    xs: 2,
                  },
                }}
              >
                Quantity : {quantity}
              </Box>
            )}
          </Grid>
          <Grid items xs={12} sm={2} sx={{ position: "relative" }}>
            {!checkOut && (
              <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                <DeleteForeverIcon
                  sx={{
                    color: "rgba(255,42,0,1)",
                    "&:hover": {
                      cursor: "pointer",
                      color: "rgba(255,42,0,0.5)",
                    },
                  }}
                  onClick={() => remove()}
                />
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                height: "100%",
                justifyContent: {
                  xs: "flex-start",
                  sm: "center",
                },
                my: {
                  xs: 2,
                },
                alignItems: "center",
              }}
            >
              {!isReCheckOut && !country?.includes(shopCountry) ? (
                <span style={{ color: "red" }}>
                  Not available in selected country .
                </span>
              ) : (
                <Box>
                  <Typography
                    component={"p"}
                    sx={{ fontWeight: "bold", color: "rgb(18 ,82,166)" }}
                  >
                    {shopCurrency}{" "}
                    {isApplied
                      ? quantity * price - (price * discount) / 100
                      : quantity * price}
                  </Typography>
                  <span style={{ color: "red" }}>
                    {isApplied && discount + "% discount"}
                  </span>
                  <p>Note :Discount only affects one item </p>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid items xs={12}>
            {checkOut && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Coupon"
                  value={coupon}
                  disabled={isApplied}
                  onChange={(e) => setCoupon(e.target.value)}
                  variant="outlined"
                />
                <Button
                  variant="outlined"
                  onClick={() => clickApply()}
                  disabled={isApplied}
                >
                  Apply
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => clickRemove()}
                  disabled={!isApplied || isRemoving}
                >
                  Remove
                </Button>
              </Box>
            )}
          </Grid>
          <Grid items xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }
);

export default CartRow;
