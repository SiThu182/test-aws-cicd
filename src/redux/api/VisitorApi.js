import axios from "axios";
import { getCookie } from "../../Utils/GetCookies";

const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
// const frontendURL = process.env.REACT_APP_BACKEND_API;
export const FetchVisitors = async (path) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}`, config);
  return response;
};

export const FetchDailyPractice = async (path) => {
  let token = localStorage.getItem("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}`, config);
  return response;
};

 
