import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import Layout from "../../Layout/Frontend/Layout";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CartRow from "./CartRow";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import ProcessTimeline from "./ProcessTimeline";
import { getCookie } from "../../../Utils/GetCookies";
import axios from "axios";
import { checkAndUpdateCart } from "../../../redux/slice/UserSlice";
export const CartTotalContext = createContext();

function Cart() {
  const { shopCurrency, currencyRate } = useSelector((state) => state.shop);
  const [country, setCountry] = React.useState("");
  const { userCart, cartTotalAmount } = useSelector((state) => state.user);
  const [totalAmount, setTotalAmount] = React.useState(cartTotalAmount);
  const [selectedItemId, setSelectedItemId] = React.useState([]);
  const [selectedCartAmount, setSelectedCartAmount] = useState(0);

  const navigation = useNavigate();
  const handleChange = (event) => {
    setCountry(event.target.value);
  };
  const dispatch = useDispatch();
  const userToken = getCookie("userToken");
  let userId = localStorage.getItem("userId");
  useEffect(() => {
    if (userId === null || userToken === null) {
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

  const handleCartCheck = (id) => {
    setSelectedItemId((prev) => {
      let selectedArray = prev?.length > 0 ? [...prev] : [];
      if (selectedArray.includes(id)) {
        selectedArray.splice(selectedArray.indexOf(id), 1);
      } else {
        selectedArray.push(id);
      }
      return selectedArray;
    });
  };
  let token = getCookie("userToken");
  useEffect(() => {
    let callCartCheck = async () => {
      try {
        let res = await axios.get(
          process.env.REACT_APP_BACKEND_ADMIN + "check-cart-stock",
          {
            headers: {
              "Cart-Data": JSON.stringify(userCart),
              Authorization: "Bearer " + token,
            },
          }
        );
        if (res.status === 200) {
          dispatch(checkAndUpdateCart(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    callCartCheck();
  }, []);
  useEffect(() => {
    if (selectedItemId?.length > 0) {
      let selectedProductPrice = 0;
      userCart?.forEach((u, index) => {
        if (selectedItemId.includes(index)) {
          selectedProductPrice +=
            u.quantity *
            u.price?.filter((p) =>
              shopCurrency?.toLowerCase().includes(p?.country)
            )?.[0]?.sale_price;
        }
      });
      setSelectedCartAmount(selectedProductPrice);
    } else {
      setSelectedCartAmount(0);
    }
  }, [userCart, selectedItemId]);

  return (
    <Layout bgColor="rgb(247,245,253)">
      <Box
        sx={{
          background: "rgb(247,245,253)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            minHeight: "100vh",
            py: 2,
            width: "90%",
            maxWidth: "1350px",
          }}
        >
          <ProcessTimeline currentTimeline={"cart"} />
          <Box sx={{}}>
            <Grid container spacing={2} sx={{ py: "1rem" }}>
              <Grid item sm={12} md={9}>
                <Box
                  sx={{
                    borderRadius: "1rem",

                    p: 2,
                    background: "white",
                  }}
                >
                  <Grid
                    container
                    sx={{
                      p: "1rem",
                      mb: 3,
                      mt: 0.5,
                    }}
                  >
                    <Grid items xs={10}>
                      <Box sx={{ display: "flex", alignItems: "baseline" }}>
                        <Typography
                          variant="h1"
                          component="h1"
                          sx={{
                            fontSize: "1.6rem",
                            fontWeight: "bolder",
                            mr: 2,
                          }}
                        >
                          Cart
                        </Typography>
                        <Typography variant="body1" sx={{ color: "gray" }}>
                          {userCart?.length} items total
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid items xs={2}>
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Link
                          href={"./"}
                          sx={{
                            textDecorationLine: "none",
                            color: "black",
                            display: "flex",
                            alignItems: "center",
                            "&:hover": {
                              color: "gray",
                            },
                          }}
                        >
                          Back to Shop
                          <KeyboardBackspaceIcon />
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                  <CartTotalContext.Provider
                    value={{
                      totalAmount: totalAmount,
                      setTotalAmount: setTotalAmount,
                    }}
                  >
                    {userCart?.length !== 0 &&
                      userCart.map((c, index) => (
                        <>
                          <CartRow
                            title={c.title}
                            cartIndex={index}
                            id={c.id}
                            variant_id={c.product_variations_id}
                            image={
                              process.env.REACT_APP_BACKEND_URL +
                              "storage/" +
                              c.image
                            }
                            country={c.country}
                            category={c.category}
                            amount={c.quantity}
                            key={index}
                            stock={c.stock}
                            price={
                              c.price?.filter((p) =>
                                shopCurrency?.toLowerCase().includes(p?.country)
                              )?.[0]?.sale_price
                            }
                            handleCartCheck={handleCartCheck}
                          />
                        </>
                      ))}
                  </CartTotalContext.Provider>
                </Box>
              </Grid>
              <Grid item sm={12} md={3}>
                {/* <Box
                  sx={{
                    borderRadius: "1rem",

                    p: 2,
                    mb: "2rem",
                    background: "white",
                  }}
                >
                  <Box>
                    <Box>
                      <Typography
                        variant="h2"
                        sx={{ fontWeight: "bolder", fontSize: "1.4rem" }}
                      >
                        Country
                        <Box sx={{ minWidth: 120, mt: "1rem" }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Country
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={country}
                              label="Age"
                              onChange={handleChange}
                            >
                              <MenuItem value={10}>Thai</MenuItem>
                              <MenuItem value={20}>Australia</MenuItem>
                              <MenuItem value={30}>Singapore</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                </Box> */}
                <Box
                  sx={{
                    borderRadius: "1rem",

                    p: 2,
                    background: "white",
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: "bolder",
                      fontSize: "1.4rem",
                      mb: "1rem",
                    }}
                  >
                    Coupon
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="Add coupon here"
                    variant="outlined"
                    fullWidth
                    sx={{
                      "&.MuiInputBase-root": { borderRadius: "2rem" },
                    }}
                  />
                  <Divider sx={{ my: 2 }} />
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
                      Cart Total
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      <Box>
                        {/* <Typography>
                          Cart Subtotal - {cartTotalAmount * currencyRate}{" "}
                          {shopCurrency}
                        </Typography> */}
                        <Typography>Discount </Typography>

                        <Typography sx={{ fontWeight: "bold" }}>
                          Cart Total - {selectedCartAmount} {shopCurrency}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Button
                      variant="outlined"
                      sx={{ my: 2, width: "100%" }}
                      disabled={totalAmount === 0 || selectedItemId?.length < 1}
                      onClick={() =>
                        navigation("/pte-shop/check-out", {
                          state: {
                            cartTotalAmount: selectedCartAmount,
                            selectedItemId: selectedItemId,
                            isRetryPayment: false,
                          },
                        })
                      }
                    >
                      Check Out
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default Cart;
