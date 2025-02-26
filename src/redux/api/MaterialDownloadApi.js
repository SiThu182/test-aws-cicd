import axios from "axios";
import { getCookie } from "../../Utils/GetCookies";

const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
const frontendURL = process.env.REACT_APP_BACKEND_API;
export const FetchMaterials = async (path) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}`, config);
  return response;
};

export const FetchMaterialTypes = async (path) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}`, config);
  return response;
};

export const FetchMaterialsFrontend = async (path) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${frontendURL}${path}`, config);
  return response;
};
