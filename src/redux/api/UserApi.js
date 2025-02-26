import axios from "axios";
import { getCookie } from "../../Utils/GetCookies";

const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
const backendAPI = process.env.REACT_APP_BACKEND_API;

export const fetchUser = async (userId) => {
  let token = getCookie("userToken");

  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}users/${userId}`, config);
  return response;
};

export const fetchUserDetails = async (id) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };

  const response = await axios.get(`${backendURL}users/${id}`, config);
  return response;
};

export const fetchAllUser = async (path) => {
  let token = getCookie("userToken");

  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}`, config);
  return response;
};

export const fetchAllCountry = async () => {
  const response = await axios.get(`${backendAPI}country`);
  return response;
};

export const FetchUserPlanDetailFromAdminSide = async (id) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(
    `${backendURL}user-subscription-plan/${id}`,
    config
  );
  return response;
};

export const FetchUserAddresses = async (id) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}shop-user/${id}`, config);
  return response;
};
