import axios from "axios";
import { getCookie } from "../../Utils/GetCookies";

const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
const backendApiURL = process.env.REACT_APP_BACKEND_API;

export const FetchFeedbacks = async (path) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}`, config);
  return response;
};

export const FetchStudentFeedbackFrontend = async (path) => {
  // let token = getCookie("userToken");
  // let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendApiURL}${path}`);
  return response;
};
