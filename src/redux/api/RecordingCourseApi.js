import axios from "axios";
import { getCookie } from "../../Utils/GetCookies";

const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
const frontendURL = process.env.REACT_APP_BACKEND_API;

export const FetchRecordingCourse = async (path) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}`, config);
  return response;
};

export const FetchRecordingCourseFrontend = async (path) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${frontendURL}${path}`, config);

  console.log(response, "<<<response");
  return response;
};

export const FetchRecordingCourseDetail = async (path, id) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };

  const response = await axios.get(`${backendURL}${path}/${id}`, config);
  return response;
};
