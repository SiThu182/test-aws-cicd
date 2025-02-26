import { createSlice } from "@reduxjs/toolkit";

import {
  fetchCourseAsync,
  fetchCourseFrontendAsync,
  fetchCourseRegisterListAsync,
  fetchCourseTypeAsync,
  fetchCourseRegisterDetailAsync,
} from "../thunk/Course";

let initialState = {
  courseRegister: "",
  courseRegisterError: "",
  courseRegisterStatus: "",
  courseFrontend: "",
  courseFrontendError: "",
  courseFrontendStatus: "",
  courseStatus: "",
  courseError: "",
  courseType: "",
  status: "",
  course: "",
  totalAud: 0,
  totalUsd: 0,
  totalMmk: 0,
  totalSgd: 0,
  totalNzd: 0,
  totalThb: 0,
  error: "",
  course_register: "",
};
const CourseSlice = createSlice({
  name: "CourseSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourseTypeAsync.pending, (state) => {
      state.courseStatus = "loading";
    });
    builder.addCase(fetchCourseTypeAsync.fulfilled, (state, action) => {
      state.courseStatus = "succeeded";
      state.courseType = action.payload;
    });

    builder.addCase(fetchCourseTypeAsync.rejected, (state, action) => {
      state.courseStatus = "failed";
      state.courseError = action.error.message;
    });
    builder.addCase(fetchCourseAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCourseAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.course = action.payload;
    });

    builder.addCase(fetchCourseAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchCourseRegisterListAsync.pending, (state) => {
      state.courseRegisterStatus = "loading";
    });
    builder.addCase(fetchCourseRegisterListAsync.fulfilled, (state, action) => {
      state.courseRegisterStatus = "succeeded";
      state.courseRegister = action.payload.data;
      state.totalAud = action.payload.amount.total_aud;
      state.totalMmk = action.payload.amount.total_mmk;
      state.totalUsd = action.payload.amount.total_usd;
      state.totalSgd = action.payload.amount.total_sgd;
      state.totalThb = action.payload.amount.total_thb;
      state.totalNzd = action.payload.amount.total_nzd;
    });

    builder.addCase(fetchCourseRegisterListAsync.rejected, (state, action) => {
      state.courseRegisterStatus = "failed";
      state.courseRegisterError = action.error.message;
    });
    builder.addCase(fetchCourseFrontendAsync.pending, (state) => {
      state.courseFrontendStatus = "loading";
    });
    builder.addCase(fetchCourseFrontendAsync.fulfilled, (state, action) => {
      state.courseFrontendStatus = "succeeded";
      state.courseFrontend = action.payload;
    });

    builder.addCase(fetchCourseFrontendAsync.rejected, (state, action) => {
      state.courseFrontendStatus = "failed";
      state.courseFrontendError = action.error.message;
    });

    builder.addCase(fetchCourseRegisterDetailAsync.pending, (state) => {
      state.courseRegisterStatus = "loading";
    });
    builder.addCase(
      fetchCourseRegisterDetailAsync.fulfilled,
      (state, action) => {
        state.courseRegisterStatus = "succeeded";
        state.course_register = action.payload;
      }
    );

    builder.addCase(
      fetchCourseRegisterDetailAsync.rejected,
      (state, action) => {
        state.courseRegisterStatus = "failed";
        state.courseRegisterError = action.error.message;
      }
    );
  },
});

export default CourseSlice.reducer;
