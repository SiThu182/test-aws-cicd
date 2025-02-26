import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Frontend/Layout";
import swal from "sweetalert";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ProcessTimeline from "./ProcessTimeline";

import AddressForm from "./AddressForm";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { getCookie } from "../../../Utils/GetCookies";
import { fetchUserAddressesAsync } from "../../../redux/thunk/Users";
import { setShopCurrency } from "../../../redux/slice/ShopSlice";
import {
  checkAndUpdateCart,
  removeAllCartItems,
} from "../../../redux/slice/UserSlice";
import CartRow from "./CartRow";
import { validateFullAddress } from "../../../Utils/AddressValidation";

function CheckOutPage() {
  const [shippingAddress, setShippingAddress] = useState("");
  // const [billingAddress, setBillingAddress] = useState("");
  const navigation = useNavigate();
  const { userCart, userAddresses, userAddressesStatus } = useSelector(
    (state) => state.user
  );
  const [isLoading, setIsLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [coupons, setCoupons] = useState([]);
  // const [checked, setChecked] = React.useState(true);
  const [invalidItemExist, setInvalidItemExist] = useState(false);
  const [paymentType, setPaymentType] = React.useState("stripe");
  const [isRetryPayment, setIsRetryPayment] = useState(false);
  const secretKey = process.env.REACT_APP_ENCRYPTION_SECRET_KEY;
  const [checkOutTotal, setCheckOutTotal] = useState(0);
  // const secretIvKey = process.env.REACT_APP_ENCRYPTION_IV_KEY;
  const [checkOutItems, setCheckOutItems] = useState([]);
  const [discountList, setDiscountList] = useState([]);
  const [originalAmount, setOriginalAmount] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();
  const { shopCurrency, shopCountry, currencyRate } = useSelector(
    (state) => state.shop
  );
  const [phone, setPhone] = useState();

  const userToken = getCookie("userToken");
  let userId = localStorage.getItem("userId");
  // const encryptionKey = CryptoJS.enc.Base64.parse(secretKey);
  // const iv = CryptoJS.enc.Hex.parse(secretIvKey);

  // const generateIv = () => CryptoJS.lib.WordArray.random(16); // AES block size is 16 bytes

  // Function to encrypt data
  // const encryptData = (data) => {
  //   const iv = generateIv();
  //   const encrypted = CryptoJS.AES.encrypt(
  //     JSON.stringify(data),
  //     encryptionKey,
  //     {
  //       iv: iv,
  //     }
  //   );
  // Prepend IV to ciphertext and encode in Base64
  //   const ivBase64 = CryptoJS.enc.Base64.stringify(iv);
  //   const ciphertextBase64 = encrypted.toString();
  //   return ivBase64 + ":" + ciphertextBase64;
  // };

  // useEffect(() => {
  //   if ((userId === null && userToken === null) || !userCart?.length > 0) {
  //     swal({
  //       title: "Warning",
  //       text: "You are not logged in",
  //       icon: "warning",
  //       button: "OK!",
  //       closeOnClickOutside: false,
  //     }).then(() => {
  //       localStorage.setItem("prevURL", "/subscription");
  //       navigation("/login/");
  //     });
  //   }
  // });

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    dispatch(fetchUserAddressesAsync(userId));
  }, [dispatch]);

  console.log(location?.state, "state");

  useEffect(() => {
    if (location?.state?.selectedItemId?.length > 0) {
      let filteredData = userCart.filter((c, index) =>
        location.state.selectedItemId.includes(index)
      );
      let totalPrice = 0;
      let originalPrice = 0;
      let invalidExist = false;
      filteredData.forEach((d) => {
        if (!d?.country.includes(shopCountry)) {
          invalidExist = true;
        }
        console.log(d, "d total price");

        let price = 0;
        console.log(discountList);

        let discountIdExist = discountList.filter(
          (di) => di.id === d.product_variations_id
        );
        if (discountIdExist?.length > 0) {
          price =
            d.price?.filter((p) =>
              shopCurrency?.toLowerCase().includes(p?.country)
            )?.[0]?.sale_price * d?.quantity;
          let discount =
            d.price?.filter((p) =>
              shopCurrency?.toLowerCase().includes(p?.country)
            )?.[0]?.sale_price *
            (discountIdExist[0].discount / 100);

          price = price - discount;
        } else {
          price =
            d.price?.filter((p) =>
              shopCurrency?.toLowerCase().includes(p?.country)
            )?.[0]?.sale_price * d?.quantity;
        }
        console.log(price, "price");
        originalPrice +=
          d.price?.filter((p) =>
            shopCurrency?.toLowerCase().includes(p?.country)
          )?.[0]?.sale_price * d?.quantity;
        totalPrice += price;
      });
      setOriginalAmount(originalPrice);
      setCheckOutItems(filteredData);
      setTotalAmount(totalPrice);
      setInvalidItemExist(invalidExist);
    }
  }, [location, userCart, shopCurrency, discountList, shopCountry]);

  useEffect(() => {
    if (location?.state?.order_details?.length > 0) {
      let totalPrice = 0;
      let originalPrice = 0;
      location?.state?.order_details?.forEach((o) => {
        let price = 0;

        let discountIdExist = discountList.filter(
          (di) => di.id === o.product_variations_id
        );
        if (discountIdExist?.length > 0) {
          price = o.unit_price * o?.quantity;
          let discount = o.unit_price * (discountIdExist[0].discount / 100);

          price = price - discount;
        } else {
          price = o.unit_price * o?.quantity;
        }
        totalPrice += price;
        originalPrice += o.unit_price * o?.quantity;
      });
      setOriginalAmount(originalPrice);
      setCheckOutTotal(totalPrice);
    }
  }, [location, discountList]);

  useEffect(() => {
    if (userId === null && userToken === null) {
      swal({
        title: "Warning",
        text: "You are not logged in",
        icon: "warning",
        button: "OK!",
        closeOnClickOutside: false,
      }).then(() => {
        localStorage.setItem("prevURL", "/subscription");
        navigation("/login/");
      });
    }
  });

  useEffect(() => {
    if (userAddressesStatus === "succeeded") {
      let shipData =
        userAddresses?.data?.length > 1
          ? userAddresses?.data?.filter((a) => a.address_type == 0)
          : userAddresses?.data;
      let billData =
        userAddresses?.data?.length > 1
          ? userAddresses?.data?.filter((a) => a.address_type == 1)
          : userAddresses?.data;
      setShippingAddress(shipData[0]);
      // setBillingAddress(billData[0]);
    }
  }, [userAddresses, userAddressesStatus]);

  // const handleClickCheckBox = (event) => {
  //   setChecked(event.target.checked);
  // };

  useEffect(() => {
    const state = location.state || null;

    if (
      state !== undefined &&
      state !== null &&
      state?.order_details?.length > 0
    ) {
      setIsRetryPayment(true);
    }
  }, [location]);

  const applyCoupon = (c, id, discount) => {
    if (!coupons.includes(c)) {
      setCoupons((prev) => [...prev, c]);
      setDiscountList((prev) => [
        ...prev,
        {
          id: id,
          code: c,
          discount: discount,
        },
      ]);
    } else {
      swal({
        title: "Warning",
        text: "Already applied",
        icon: "warning",
        button: "OK!",
      });
    }
  };

  const removeCoupon = (c) => {
    if (coupons.includes(c)) {
      let newList = coupons.filter((co) => co != c);
      setCoupons((prev) => [...newList]);

      let newDiscountList = discountList.filter((di) => di.code !== c);
      setDiscountList(newDiscountList);
    }
  };

  const handleChange = (event) => {
    setPaymentType(event.target.value);
  };
  // const apiKey = process.env.REACT_APP_MAP_API_KEY;

  const validateAddress = async (address) => {
    if (address?.address)
      try {
        const response = await axios.get(
          "https://api.geoapify.com/v1/geocode/search",
          {
            params: {
              text: address, // The address string entered by the user
              apiKey: "c0fb864839684bc2b4e4fa38e3d9f346",
            },
          }
        );
        let allowedCountry = [];
        if (location.state?.order_details?.length > 0) {
          switch (location.state?.currency) {
            case "THB":
              allowedCountry.push("Thailand");
              break;
            case "SGD":
              allowedCountry.push("Singapore");
              break;
            case "NZD":
              allowedCountry.push("NewZealand");
              break;
            case "MMK":
              allowedCountry.push("Myanmar");
              break;
            case "AUD":
              allowedCountry.push("Australia");
              break;

            default:
              break;
          }
        } else {
          switch (shopCountry) {
            case "th":
              allowedCountry.push("Thailand");
              break;
            case "sg":
              allowedCountry.push("Singapore");
              break;
            case "nz":
              allowedCountry.push("NewZealand");
              break;
            case "my":
              allowedCountry.push("Myanmar");
              break;
            case "au":
              allowedCountry.push("Australia");
              break;

            default:
              break;
          }
        }

        const { results, status } = response.data;

        if (
          status === "OK" &&
          results.length > 0 &&
          allowedCountry.includes(shippingAddress.country)
        ) {
          const location = results[0].geometry.location;

          return {
            valid: true,
            address: results[0].formatted_address,
            location,
          };
        } else {
          return {
            valid: false,
            message:
              "Invalid address or location not found in selected country",
          };
        }
      } catch (error) {
        console.error("Error validating address:", error);
        return { valid: false, message: "Error validating address" };
      }
  };

  const backendURL = `${process.env.REACT_APP_BACKEND_ADMIN}set-address`;
  const backendOrderURL = `${process.env.REACT_APP_BACKEND_ADMIN}place-order`;
  const backendPaymentURL = `${process.env.REACT_APP_BACKEND_ADMIN}retry-payment`;
  const backendCouponURL = `${process.env.REACT_APP_BACKEND_ADMIN}get-coupon-user`;

  useEffect(() => {
    let fetchCoupon = async () => {
      try {
        let result = await axios.post(backendCouponURL, { userId: userId });
        console.log(result);
      } catch (error) {
        console.log(error, "error");
      }
    };
    // fetchCoupon();
  });
  const submitUserDetail = async () => {
    // let string = "hello there";
    // let encryptedData = encryptData(string);

    let validateResult = await validateFullAddress(
      shippingAddress.house_number,
      shippingAddress.street,
      shippingAddress.city,
      shippingAddress.state,
      shippingAddress.postal_code,
      shippingAddress.country
    );
    // let validateResultForBilling = null;
    // if (!checked) {
    //   validateResultForBilling = await validateAddress(billingAddress.address);
    // }

    if (!validateResult?.valid) {
      return swal({
        title: "Warning",
        text: "Invalid address or location not found in selected country",
        icon: "warning",
        button: "OK!",
      });
    }
    return { status: "ok" };
    // const request = {
    //   user_id: userId,
    //   postal_code: shippingAddress.postal_code,
    //   state: shippingAddress.state,
    //   city: shippingAddress.city,
    //   address: shippingAddress.address,
    //   address_type: 0,
    //   country: shippingAddress.country,
    //   same_address: checked,
    // };

    // let token = getCookie("userToken");
    // let config = {
    //   headers: { Authorization: "Bearer " + token },
    // };
    // try {
    //   const res = await axios.post(`${backendURL}`, request, config);
    //   if (res.status === 200) {
    //     if (res.data.errors) {

    //       swal({
    //         title: "Warning",
    //         text: res.data.errors[0],
    //         icon: "warning",
    //         button: "OK!",
    //       });
    //       return { status: "error" };
    //     } else {

    //       swal({
    //         title: "Success",
    //         text: res.data.message,
    //         icon: "success",
    //         button: "OK!",
    //       });
    //       return { status: "ok" };
    //     }
    //   } else {
    //     swal({
    //       title: "Warning",
    //       text: res.data.message,
    //       icon: "warning",
    //       button: "OK!",
    //     });
    //     return { status: "error" };
    //   }
    // } catch (error) {

    //   swal({
    //     title: "Warning",
    //     text: error.message,
    //     icon: "warning",
    //     button: "OK!",
    //   });
    //   return { status: "error" };
    // }
  };

  let token = getCookie("userToken");

  console.log(discountList);

  const sendOrder = async () => {
    setIsLoading(true);
    if (phone == null || phone == undefined) {
      swal({
        title: "Warning",
        text: "Need phone number",
        icon: "warning",
        button: "OK!",
      });
      setIsLoading(false);
      return { status: "error" };
    }
    let allowedCountry = [];
    if (location.state?.order_details?.length > 0) {
      switch (location.state?.currency) {
        case "THB":
          allowedCountry.push("Thailand");
          break;
        case "SGD":
          allowedCountry.push("Singapore");
          break;
        case "NZD":
          allowedCountry.push("NewZealand");
          break;
        case "MMK":
          allowedCountry.push("Myanmar");
          break;
        case "AUD":
          allowedCountry.push("Australia");
          break;

        default:
          break;
      }
    } else {
      switch (shopCountry) {
        case "th":
          allowedCountry.push("Thailand");
          break;
        case "sg":
          allowedCountry.push("Singapore");
          break;
        case "nz":
          allowedCountry.push("NewZealand");
          break;
        case "my":
          allowedCountry.push("Myanmar");
          break;
        case "au":
          allowedCountry.push("Australia");
          break;

        default:
          break;
      }
    }
    if (!allowedCountry.includes(shippingAddress.country)) {
      swal({
        title: "Warning",
        text: "Invalid country",
        icon: "warning",
        button: "OK!",
      });
      setIsLoading(false);
      return { status: "error" };
    }
    if (!invalidItemExist) {
      let sendAddress = await submitUserDetail();

      let productData = [];

      if (
        location.state !== null &&
        location.state !== undefined &&
        location.state.order_details?.length > 0
      ) {
        dispatch(setShopCurrency(location.state.currency));
        productData = location.state.order_details.map((c) => {
          let discountIdExist = discountList.filter(
            (di) => di.id === c.product_variations_id
          );

          let data = {
            od_id: c.id,
            id: c.order_details?.product_id,
            name: c.product?.name,
            variant_id: c.product_variations_id,
            amount: c.unit_price,
            quantity: c.quantity,
            code: discountIdExist?.length > 0 ? discountIdExist[0]?.code : null,
            discount:
              discountIdExist?.length > 0 ? discountIdExist[0]?.discount : null,
          };

          return data;
        });
      } else {
        let filteredData = userCart.filter((c, index) =>
          location.state.selectedItemId.includes(index)
        );
        productData = filteredData.map((c, index) => {
          let data = [];
          let discountIdExist = discountList.filter(
            (di) => di.id === c.product_variations_id
          );

          data = {
            id: c.id,
            variant_id: c.product_variations_id,
            name: c.title,
            amount: c.price?.filter((p) =>
              shopCurrency?.toLowerCase().includes(p?.country)
            )?.[0]?.sale_price,
            quantity: c.quantity,
            code: discountIdExist?.length > 0 ? discountIdExist[0]?.code : null,
            discount:
              discountIdExist?.length > 0 ? discountIdExist[0]?.discount : null,
          };

          return data;
        });
      }

      let callCartCheck = async (data) => {
        try {
          let res = await axios.get(
            process.env.REACT_APP_BACKEND_ADMIN + "check-cart-stock",
            {
              headers: {
                "Cart-Data": JSON.stringify(data),
                "EXCEED-CHECK": true,
                Authorization: "Bearer " + token,
              },
            }
          );
          if (res.status === 200) {
            dispatch(checkAndUpdateCart(res.data.data));
            return res;
          }
        } catch (error) {
          return error;
        }
      };
      let checkResult = null;

      if (!isRetryPayment) {
        checkResult = callCartCheck(checkOutItems);
      } else {
        checkResult = callCartCheck(location.state?.order_details);
      }

      if (!checkResult?.exceed_stock_exists) {
        if (sendAddress?.status === "ok") {
          try {
            let userId = localStorage.getItem("userId");
            let token = getCookie("userToken");
            let config = {
              headers: { Authorization: "Bearer " + token },
            };
            const request = {
              user_id: userId,
              total_amount: totalAmount,
              original_amount: originalAmount,
              order_status: 0,
              coupons: coupons,
              product_data: productData,
              payment_method: "digital",
              payment_provider: paymentType,
              payment_status: 0,
              country: shippingAddress.country,
              currency: shopCurrency,
              shipping_address: JSON.stringify(shippingAddress),
              phone: phone,
              // billing_address: checked
              //   ? shippingAddress?.address
              //   : billingAddress?.address,
            };
            const retryRequest = {
              order_id: location?.state?.id,
              order_details: productData,
              total_amount: checkOutTotal,
              original_amount: originalAmount,
              coupons: coupons,

              phone: phone,
              shipping_address: shippingAddress?.address,
              // billingAddress: checked
              //   ? shippingAddress?.address
              //   : billingAddress?.address,
            };
            console.log(retryRequest, "retry request");

            const res = isRetryPayment
              ? await axios.post(`${backendPaymentURL}`, retryRequest, config)
              : await axios.post(`${backendOrderURL}`, request, config);

            if (res.status === 200) {
              if (res.data.errors) {
                swal({
                  title: "Warning",
                  text: res.data.errors[0],
                  icon: "warning",
                  button: "OK!",
                });
                setIsLoading(false);
                return { status: "error" };
              } else {
                dispatch(removeAllCartItems());
                window.location.href = res.data.payment_url;
                swal({
                  title: "Success",
                  text: res.data.message,
                  icon: "success",
                  button: "OK!",
                });
                setIsLoading(false);
                return { status: "ok" };
              }
            } else {
              swal({
                title: "Warning",
                text: res.data.message,
                icon: "warning",
                button: "OK!",
              });
              setIsLoading(false);
              return { status: "error" };
            }
          } catch (error) {
            let errorMessage = "";
            if (error instanceof AxiosError) {
              console.log(error, "error");

              if (error?.response) {
                errorMessage = error?.response?.data?.error;
              } else {
                errorMessage = error?.message;
              }
            } else {
              // Handle other types of errors

              errorMessage = "Unknown error occurred";
            }
            swal({
              title: "Warning",
              text: errorMessage,
              icon: "warning",
              button: "OK!",
            });
            setIsLoading(false);
            return { status: "error" };
          }
        }
      } else {
        swal({
          title: "Warning",
          text: checkResult?.exceed_stock_exists
            ? "Exceeds stock amount"
            : "Cart check",
          icon: "warning",
          button: "OK!",
        });
        setIsLoading(false);
        return { status: "error" };
      }
    } else {
      swal({
        title: "Warning",
        text: "One or more invalid item exists",
        icon: "warning",
        button: "OK!",
      });
      setIsLoading(false);
      return { status: "error" };
    }
  };

  return (
    <Layout bgColor="rgb(247,245,253)">
      <Box
        sx={{
          background: "rgb(247,245,253)",
        }}
      >
        <ProcessTimeline currentTimeline={"order"} />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            py: 5,
            justifyContent: "center",
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
                md: "70%",
              },
              background: "white",
              borderRadius: "0.5rem",
              padding: 2,
            }}
          >
            <Box>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Checkout
              </Typography>
              {checkOutItems?.length !== 0 &&
                checkOutItems.map((c, index) => (
                  <CartRow
                    title={c.title}
                    cartIndex={index}
                    id={c.id}
                    variant_id={c.product_variations_id}
                    image={
                      process.env.REACT_APP_BACKEND_URL + "storage/" + c.image
                    }
                    checkOut={true}
                    country={c.country}
                    category={c.category}
                    amount={c.quantity}
                    key={index}
                    stock={c.stock}
                    applyCoupon={applyCoupon}
                    coupons={coupons}
                    removeCoupon={removeCoupon}
                    price={
                      c.price?.filter((p) =>
                        shopCurrency?.toLowerCase().includes(p?.country)
                      )?.[0]?.sale_price
                    }
                  />
                ))}
              {location.state?.order_details?.length > 0 &&
                location.state?.order_details?.map((o, index) => (
                  <>
                    <CartRow
                      title={o?.product?.name}
                      cartIndex={index}
                      id={o?.product?.id}
                      coupons={coupons}
                      variant_id={o?.product_variations_id}
                      image={
                        process.env.REACT_APP_BACKEND_URL +
                        "storage/" +
                        o?.product?.variations.find(
                          (v) =>
                            o?.product_variations_id ===
                            v.images[0]?.product_variation_id
                        )?.images[0]?.url
                      }
                      defaultCoupon={o?.coupon?.code}
                      isReCheckOut={true}
                      applyCoupon={applyCoupon}
                      removeCoupon={removeCoupon}
                      checkOut={true}
                      orderId={o?.order_id}
                      category={o?.product?.category?.name}
                      amount={o?.quantity}
                      key={index}
                      stock={o?.product?.stock_quantity}
                      price={o?.unit_price}
                    />
                  </>
                ))}
            </Box>
            {userAddressesStatus === "succeeded" && (
              <>
                <AddressForm
                  title={"Shipping Address"}
                  setAddressData={setShippingAddress}
                  defaultAddress={
                    userAddresses?.data?.length > 1
                      ? userAddresses?.data?.filter((a) => a.address_type == 0)
                      : userAddresses?.data
                  }
                />
              </>
            )}

            {/* <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={handleClickCheckBox} />
                }
                label="Use the same adress for billing address"
              />
            </FormGroup> */}

            {/* {!checked && (
              <>
                {userAddressesStatus === "succeeded" && (
                  <>
                    <AddressForm
                      title={"Billing Address"}
                      setAddressData={setBillingAddress}
                      defaultAddress={
                        userAddresses?.data?.length >= 1
                          ? userAddresses?.data?.filter(
                              (a) => a.address_type == 1
                            )
                          : userAddresses?.data
                      }
                    />
                  </>
                )}
              </>
            )} */}
            {/* <Box sx={{}}>
              <Button onClick={() => submitUserDetail()}>Save Address</Button>
            </Box> */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
                label="phone"
                type="number"
                variant="outlined"
                sx={{ my: 2 }}
                fullWidth
                required
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "baseline", padding: 2 }}>
              <Typography variant="h5">Choose Payment</Typography>
            </Box>
            <FormControl>
              {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="stripe"
                name="payment-group"
                value={paymentType}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="stripe"
                  control={<Radio />}
                  label={
                    <>
                      <img
                        src={
                          process.env.REACT_APP_FRONTEND_URL +
                          "Image/stripe_payment.png"
                        }
                        style={{ width: "15rem", borderRadius: "2rem" }}
                        alt="stripe_payment"
                      />
                    </>
                  }
                />
                {/* <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label={
                    <img
                      src={
                        process.env.REACT_APP_FRONTEND_URL +
                        "Image/paypal_payment.png"
                      }
                      style={{ width: "15rem", borderRadius: "2rem" }}
                      alt="stripe_payment"
                    />
                  }
                /> */}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "20%",
              },
              background: "white",
              borderRadius: "0.5rem",
              padding: 2,
            }}
          >
            <Typography variant="h5">Order Summary</Typography>
            <Box
              sx={{
                borderRadius: "1rem",
                background: "#ebed7d",
                padding: 2,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bolder",
                  fontSize: "1.1rem",
                  mb: "1rem",
                }}
              >
                Items Total
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Box>
                  <Typography>
                    Cart Subtotal -{" "}
                    {invalidItemExist
                      ? 0
                      : isRetryPayment
                      ? checkOutTotal
                      : totalAmount}
                    {isRetryPayment ? location.state.currency : shopCurrency}
                  </Typography>
                  <Typography>Discount </Typography>

                  <Typography sx={{ fontWeight: "bold" }}>
                    Items Subtotal -{" "}
                    {invalidItemExist
                      ? 0
                      : isRetryPayment
                      ? checkOutTotal
                      : totalAmount}
                    {isRetryPayment ? location.state.currency : shopCurrency}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Button
                variant="outlined"
                sx={{ my: 2, width: "100%" }}
                disabled={location.state?.cartTotalAmount === 0 || isLoading}
                onClick={() => sendOrder()}
              >
                Place Order
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default CheckOutPage;
