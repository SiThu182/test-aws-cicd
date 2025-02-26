import { createSlice } from "@reduxjs/toolkit";
import {
  FetchMaterialTypesAsync,
  FetchMaterialsAsync,
  FetchMaterialsFrontendAsync,
  FetchUserGuideAsync,
} from "../thunk/MaterialDownload";

let initialState = {
  materialList: "",
  materialListError: null,
  materialListStatus: null,
  userGuide: "",
  userGuideError: null,
  userGuideStatus: null,
  materialTypeList: "",
  materialTypeListError: null,
  materialTypeListStatus: null,
  materialListFrontend: "",
  materialListFrontendError: null,
  materialListFrontendStatus: null,
};

const MaterialSlice = createSlice({
  name: "MaterialSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(FetchUserGuideAsync.pending, (state) => {
      state.userGuideStatus = "loading";
      state.userGuideError = null;
    });
    builder.addCase(FetchUserGuideAsync.fulfilled, (state, action) => {
      state.userGuideStatus = "succeeded";
      state.userGuide = action.payload;
      state.userGuideError = null;
    });

    builder.addCase(FetchUserGuideAsync.rejected, (state, action) => {
      state.userGuideStatus = "failed";
      state.userGuideError = action.error.message;
    });

    builder.addCase(FetchMaterialsAsync.pending, (state) => {
      state.materialListStatus = "loading";
      state.materialListError = null;
    });
    builder.addCase(FetchMaterialsAsync.fulfilled, (state, action) => {
      state.materialListStatus = "succeeded";
      state.materialList = action.payload;
      state.materialListError = null;
    });

    builder.addCase(FetchMaterialTypesAsync.rejected, (state, action) => {
      state.materialTypeListStatus = "failed";
      state.materialTypeListError = action.error.message;
    });
    builder.addCase(FetchMaterialTypesAsync.pending, (state) => {
      state.materialTypeListStatus = "loading";
      state.materialTypeListError = null;
    });
    builder.addCase(FetchMaterialTypesAsync.fulfilled, (state, action) => {
      state.materialTypeListStatus = "succeeded";
      state.materialTypeList = action.payload;
      state.materialTypeListError = null;
    });

    builder.addCase(FetchMaterialsAsync.rejected, (state, action) => {
      state.materialListStatus = "failed";
      state.materialListError = action.error.message;
    });
    builder.addCase(FetchMaterialsFrontendAsync.pending, (state) => {
      state.materialListFrontendStatus = "loading";
      state.materialListFrontendError = null;
    });
    builder.addCase(FetchMaterialsFrontendAsync.fulfilled, (state, action) => {
      state.materialListFrontendStatus = "succeeded";
      state.materialListFrontend = action.payload;
      state.materialListFrontendError = null;
    });

    builder.addCase(FetchMaterialsFrontendAsync.rejected, (state, action) => {
      state.materialListFrontendStatus = "failed";
      state.materialListFrontendError = action.error.message;
    });
  },
});

export default MaterialSlice.reducer;
