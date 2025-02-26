import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  FetchCourse,
  FetchCourseFrontend,
  FetchCourseRegisterDetail,
  FetchCourseType,
  FetchEditPosts,
} from "../api/CourseApi";

export const fetchCourseTypeAsync = createAsyncThunk(
  "course/fetchType",
  async (path) => {
    const response = await FetchCourseType(path);

    return response.data.data;
  }
);

export const fetchCourseAsync = createAsyncThunk(
  "course/fetchcourselist",
  async (path) => {
    const response = await FetchCourse(path);
    // if (path === "mt-test") {
    //   return response;
    // } else {
    return response.data.data;
    // }
  }
);

export const fetchCourseRegisterDetailAsync = createAsyncThunk(
  "course/fetchcoursedetail",
  async (routeData) => {
    const { path, id } = routeData;

    const response = await FetchCourseRegisterDetail(path, id);
    return response.data;
  }
);

export const fetchCourseRegisterListAsync = createAsyncThunk(
  "course/registerlist",
  async (path) => {
    const response = await FetchCourse(path);

    return response.data;
  }
);
export const fetchCourseFrontendAsync = createAsyncThunk(
  "course/frontend",
  async (path) => {
    const response = await FetchCourseFrontend(path);

    return response.data.data;
  }
);
