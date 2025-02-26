import { createSlice } from "@reduxjs/toolkit";
import { FetchBlogAsync, FetchBlogDetailAsync, FetchBlogFrontendAsync } from "../thunk/Blog";

let initialState = {
  blogList: "",
  blogListError: "",
  blogListStatus: "",
  blogListFrontend: "",
  blogListFrontendError: "",
  blogListFrontendStatus: "",
  blogListFrontendDetail: "",
  blogListFrontendDetailError: "",
  blogListFrontendDetailStatus: "",
};

const BlogSlice = createSlice({
  name: "BlogSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(FetchBlogAsync.pending, (state) => {
      state.blogListStatus = "loading";
    });
    builder.addCase(FetchBlogAsync.fulfilled, (state, action) => {
      state.blogListStatus = "succeeded";
      state.blogList = action.payload;
      
    });

    builder.addCase(FetchBlogAsync.rejected, (state, action) => {
      state.blogListStatus = "failed";
      state.blogListError = action.error.message;
    });
    builder.addCase(FetchBlogFrontendAsync.pending, (state) => {
      state.blogListFrontendStatus = "loading";
    });
    builder.addCase(FetchBlogFrontendAsync.fulfilled, (state, action) => {
      state.blogListFrontendStatus = "succeeded";
      state.blogListFrontend = action.payload;
    
    });

    builder.addCase(FetchBlogFrontendAsync.rejected, (state, action) => {
      state.blogListFrontendStatus = "failed";
      state.blogListFrontendError = action.error.message;
    });
    builder.addCase(FetchBlogDetailAsync.pending, (state) => {
      state.blogListFrontendDetailStatus = "loading";
    });
    builder.addCase(FetchBlogDetailAsync.fulfilled, (state, action) => {
      state.blogListFrontendDetailStatus = "succeeded";
      state.blogListFrontendDetail = action.payload;
      
    });

    builder.addCase(FetchBlogDetailAsync.rejected, (state, action) => {
      state.blogListFrontendDetailStatus = "failed";
      state.blogListFrontendDetailError = action.error.message;
    });
  },
});

export default BlogSlice.reducer;
