import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProductCategoriesAsync,
  fetchProductDetailFrontendAsync,
  fetchProductListAsync,
  fetchSuppliersAsync,
} from "../thunk/Product";

const initialState = {
  supplierList: [],
  supplierListStatus: "",
  supplierListError: null,
  categoryList: [],
  categoryListStatus: "",
  categoryListError: null,
  productList: [],
  productListStatus: null,
  productListError: null,
  productDetailFrontend: null,
  productDetailFrontendStatus: "",
  productDetailFrontendError: null,
};

const ProductSlice = createSlice({
  name: "SaveNoteSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSuppliersAsync.pending, (state) => {
      state.supplierListStatus = "loading";
    });
    builder.addCase(fetchSuppliersAsync.fulfilled, (state, action) => {
      state.supplierListStatus = "succeeded";
      state.supplierList = action.payload;
    });
    builder.addCase(fetchSuppliersAsync.rejected, (state, action) => {
      state.supplierListStatus = "failed";
      state.supplierListError = action.error.message;
    });
    builder.addCase(fetchProductCategoriesAsync.pending, (state) => {
      state.categoryListStatus = "loading";
    });
    builder.addCase(fetchProductCategoriesAsync.fulfilled, (state, action) => {
      state.categoryListStatus = "succeeded";
      state.categoryList = action.payload;
    });
    builder.addCase(fetchProductCategoriesAsync.rejected, (state, action) => {
      state.categoryListStatus = "failed";
      state.categoryListError = action.error.message;
    });

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
    builder.addCase(fetchProductDetailFrontendAsync.pending, (state) => {
      state.productDetailFrontendStatus = "loading";
    });
    builder.addCase(
      fetchProductDetailFrontendAsync.fulfilled,
      (state, action) => {
        

        state.productDetailFrontendStatus = "succeeded";
        state.productDetailFrontend = action.payload;
      }
    );
    builder.addCase(
      fetchProductDetailFrontendAsync.rejected,
      (state, action) => {
        state.productDetailFrontendStatus = "failed";
        state.productDetailFrontendError = action.error.message;
      }
    );
  },
});

export default ProductSlice.reducer;
