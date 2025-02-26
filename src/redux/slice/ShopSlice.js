import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProductListAsync,
  fetchRelatedProductListAsync,
} from "../thunk/Shop";

const shopCountry = localStorage.getItem("shopCountry")
  ? localStorage.getItem("shopCountry")
  : "au";

const shopCurrency = localStorage.getItem("shopCurrency")
  ? localStorage.getItem("shopCurrency")
  : "AUD";

const initialState = {
  productList: [],
  productListStatus: null,
  productListError: null,
  relatedProductList: [],
  relatedProductListStatus: null,
  relatedProductListError: null,
  product: [],
  shopCountry,
  productStatus: null,
  productError: null,
  shopCurrency,
  currencyRate: 1,
};

const ShopSlice = createSlice({
  name: "ShopSlice",
  initialState,
  reducers: {
    setShopCurrency: (state, action) => {
      state.shopCurrency = action.payload;
      localStorage.setItem("shopCurrency", action.payload);
      switch (action.payload) {
        case "AUD":
          state.currencyRate = 1;
          state.shopCountry = "au";
          localStorage.setItem("shopCountry", "au");
          break;
        case "THB":
          state.currencyRate = 24;
          state.shopCountry = "th";
          localStorage.setItem("shopCountry", "th");
          break;
        case "SGD":
          state.currencyRate = 0.88;
          state.shopCountry = "sg";
          localStorage.setItem("shopCountry", "sg");
          break;
        case "NZD":
          state.currencyRate = 0.92;
          state.shopCountry = "nz";
          localStorage.setItem("shopCountry", "nz");
          break;
        case "MMK":
          state.currencyRate = 0.88;
          state.shopCountry = "my";
          localStorage.setItem("shopCountry", "my");
          break;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductListAsync.pending, (state) => {
      state.productListStatus = "loading";
    });
    builder.addCase(fetchProductListAsync.fulfilled, (state, action) => {
      state.productListStatus = "succeeded";
      state.productList = action.payload;
    });
    builder.addCase(fetchProductListAsync.rejected, (state, action) => {
      state.productListStatus = "failed";
      state.productListError = action.error.message;
    });
    builder.addCase(fetchRelatedProductListAsync.pending, (state) => {
      state.relatedProductListStatus = "loading";
    });
    builder.addCase(fetchRelatedProductListAsync.fulfilled, (state, action) => {
      state.relatedProductListStatus = "succeeded";
      state.relatedProductList = action.payload;
    });
    builder.addCase(fetchRelatedProductListAsync.rejected, (state, action) => {
      state.relatedProductListStatus = "failed";
      state.relatedProductListError = action.error.message;
    });
  },
});

export const { setShopCurrency } = ShopSlice.actions;

export default ShopSlice.reducer;
