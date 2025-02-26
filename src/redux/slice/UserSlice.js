import { createSlice } from "@reduxjs/toolkit";
import swal from "sweetalert";
// import { fetchAllCountryAsync, fetchAllUserAsync, fetchUserAsync, fetchUserDetailsAsync, fetchUserPlanDetailFromAdminPanelAsync } from "../api/UserApi";
import {
  fetchAllCountryAsync,
  fetchAllUserAsync,
  fetchUserAddressesAsync,
  fetchUserAsync,
  fetchUserDetailsAsync,
  fetchUserPlanDetailFromAdminPanelAsync,
} from "../thunk/Users";
import { getCookie } from "../../Utils/GetCookies";
import { Crisp } from "crisp-sdk-web";

// initialize userToken from local storage
const userToken = getCookie("userToken") ? getCookie("userToken") : null;

const userId = localStorage.getItem("userId")
  ? localStorage.getItem("userId")
  : null;
const userCart = localStorage.getItem("userCart")
  ? JSON.parse(localStorage.getItem("userCart"))
  : [];

const cartTotalAmount = localStorage.getItem("cartTotalAmount")
  ? localStorage.getItem("cartTotalAmount") * 1
  : 0;

const initialState = {
  loading: true,
  userToken,
  userId,
  error: null,
  success: false,
  status: null,
  user: null,
  role: null,
  userList: [],
  country: "AUD",
  countryError: null,
  allCountryLoading: true,
  allCountryStatus: null,
  allCountryError: null,
  allCountry: null,
  userDetailsStatus: null,
  userDetailsError: null,
  userDetails: null,
  userAddresses: null,
  userAddressesStatus: null,
  userAddressesError: null,

  userPlanDetailStatus: null,
  userPlanDetailError: null,
  userPlanDetail: null,
  userCart,
  cartAlert: null,
  cartTotalAmount,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.loading = false;
      state.userList = [];
      state.success = null;
      state.user = null;
      state.role = null;
      state.error = null;
      state.country = "AUD";
      Crisp.setTokenId(); // 1. Clear the token value
      Crisp.session.reset(); // 2. Unbind the current session
    },
    setCountry: (state, action) => {
      localStorage.setItem("country", action.payload);
      state.country = action.payload;
    },
    addToCart: (state, action) => {
      // const exist = state.userCart.filter(
      //   (c) => c?.title == action.payload?.title
      // );
      // if (exist?.length > 0) {

      const existArray = state.userCart.filter(
        (cart) =>
          cart.id === action.payload.id &&
          cart.product_variations_id == action.payload.product_variations_id
      );
      if (existArray?.length !== 0) {
        const existArray = state.userCart.map((cart) => {
          if (
            cart.id === action.payload.id &&
            cart.product_variations_id == action.payload.product_variations_id
          ) {
            if (
              cart.quantity + action.payload.quantity <=
              action.payload.stock
            ) {
              cart.quantity += action.payload.quantity;

              state.cartTotalAmount +=
                action.payload.quantity * action.payload.price;

              state.cartAlert = "success";
              swal({
                title: "Success",
                text: "Added to cart successfully",
                icon: "success",
                button: "OK!",
              });

              return cart;
            } else {
              state.cartAlert = "failed";
              swal({
                title: "Warning",
                text: "Exceed maximum stocks",
                icon: "warning",
                button: "OK!",
              });

              return cart;
            }
          } else {
            state.cartAlert = "failed";
            return cart;
          }
        });
        state.userCart = existArray;
      } else {
        if (action.payload.stock >= action.payload.quantity) {
          state.userCart = [
            ...state.userCart,
            { ...action.payload, quantity: action.payload.quantity },
          ];
          state.cartTotalAmount +=
            action.payload.quantity * action.payload.price;
          swal({
            title: "Success",
            text: "Added to cart successfully",
            icon: "success",
            button: "OK!",
          });
          state.cartAlert = "success";
        } else {
          swal({
            title: "Warning",
            text: "Exceed maximum stocks",
            icon: "warning",
            button: "OK!",
          });
          state.cartAlert = "failed";
        }
      }

      localStorage.setItem("userCart", JSON.stringify(state.userCart));
      localStorage.setItem("cartTotalAmount", state.cartTotalAmount);
    },

    checkAndUpdateCart: (state, action) => {
      state.userCart = [...action.payload];
    },

    setCartAlert: (state, action) => {
      state.cartAlert = action.payload;
    },

    stockIncrease: (state, action) => {
      state.cartTotalAmount += action.payload.price * 1;
      if (action.payload.cart == true) {
        state.userCart.forEach((cart) => {
          if (
            action.payload.cart &&
            cart.id === action.payload.id &&
            cart.product_variations_id == action.payload.product_variations_id
          ) {
            cart.quantity += 1;
          }
        });
      }
      localStorage.setItem("userCart", JSON.stringify(state.userCart));
      localStorage.setItem("cartTotalAmount", state.cartTotalAmount);
    },

    stockDecrease: (state, action) => {
      state.cartTotalAmount -= action.payload.price * 1;
      if (action.payload.cart == true) {
        state.userCart.forEach((cart) => {
          if (
            cart.id === action.payload.id &&
            cart.product_variations_id == action.payload.product_variations_id
          ) {
            cart.quantity -= 1;
          }
        });
      }
      localStorage.setItem("userCart", JSON.stringify(state.userCart));
      localStorage.setItem("cartTotalAmount", state.cartTotalAmount);
    },
    removeItem: (state, action) => {
      state.cartTotalAmount -= action.payload.quantity * action.payload.price;

      state.userCart.splice(action.payload.index, 1);
      localStorage.setItem("userCart", JSON.stringify(state.userCart));
      localStorage.setItem("cartTotalAmount", state.cartTotalAmount);
    },

    removeAllCartItems: (state) => {
      state.userCart = [];
      state.cartAmount = 0;
      localStorage.removeItem("userCart");
      localStorage.removeItem("cartTotalAmount");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserAsync.pending, (state) => {
      state.loading = true;
      state.status = "loading";
    });
    builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
      state.user = action.payload;
      state.role = action.payload.data.role_id;
      // state.country = action.payload.data.country;
      // localStorage.setItem("country", action.payload.data.country);
    });
    builder.addCase(fetchUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.error = action.error.message;
    });
    //userDetails
    builder.addCase(fetchUserDetailsAsync.pending, (state) => {
      state.userDetailsStatus = "loading";
      state.userDetailsError = null;
    });
    builder.addCase(fetchUserDetailsAsync.fulfilled, (state, action) => {
      state.userDetailsStatus = "succeeded";
      state.userDetails = action.payload;
      state.userDetailsError = null;

      // state.country = action.payload.data.country;
      // localStorage.setItem("country", action.payload.data.country);
    });
    builder.addCase(fetchUserDetailsAsync.rejected, (state, action) => {
      state.userDetailsStatus = "failed";
      state.userDetailsError = action.error.message;
    });

    builder.addCase(fetchAllUserAsync.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    });
    builder.addCase(fetchAllUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
      state.userList = action.payload;
    });
    builder.addCase(fetchAllUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(fetchAllCountryAsync.pending, (state, action) => {
      state.allCountryLoading = true;
      state.allCountryStatus = "loading";
    });
    builder.addCase(fetchAllCountryAsync.fulfilled, (state, action) => {
      state.allCountryLoading = false;
      state.allCountryStatus = "succeeded";
      state.allCountry = action.payload;
    });
    builder.addCase(fetchAllCountryAsync.rejected, (state, action) => {
      state.allCountryLoading = false;
      state.allCountryStatus = "failed";
      state.allCountryError = action.error.message;
    });

    //user plan detail
    builder.addCase(fetchUserPlanDetailFromAdminPanelAsync.pending, (state) => {
      state.userPlanDetailStatus = "loading";
      state.userPlanDetailError = null;
    });
    builder.addCase(
      fetchUserPlanDetailFromAdminPanelAsync.fulfilled,
      (state, action) => {
        state.userPlanDetailStatus = "succeeded";

        state.userPlanDetail = action.payload;
        state.userPlanDetailError = null;
      }
    );
    builder.addCase(
      fetchUserPlanDetailFromAdminPanelAsync.rejected,
      (state, action) => {
        state.userPlanDetailStatus = "failed";
        state.userPlanDetailError = action.error.message;
      }
    );
    builder.addCase(fetchUserAddressesAsync.pending, (state, action) => {
      state.userAddressesLoading = true;
      state.userAddressesStatus = "loading";
    });
    builder.addCase(fetchUserAddressesAsync.fulfilled, (state, action) => {
      state.userAddressesLoading = false;
      state.userAddressesStatus = "succeeded";
      state.userAddresses = action.payload;
    });
    builder.addCase(fetchUserAddressesAsync.rejected, (state, action) => {
      state.userAddressesLoading = false;
      state.userAddressesStatus = "failed";
      state.userAddressesError = action.error.message;
    });
  },
});

export const {
  userLogout,
  setCountry,
  addToCart,
  stockIncrease,
  removeItem,
  setCartAlert,
  removeAllCartItems,
  checkAndUpdateCart,
  stockDecrease,
} = userSlice.actions;
export default userSlice.reducer;
