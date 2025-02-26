import axios from "axios";
import { getCookie } from "../../Utils/GetCookies";

const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
//posts

export const FetchPosts = async (path) => {
  let token = getCookie("userToken");
  let config = {
    headers: { Authorization: "Bearer " + token },
  };
  const response = await axios.get(`${backendURL}${path}`, config);

  return response;
};
//edit
export const FetchEditPosts = async (path, id) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };

  const response = await axios.get(`${backendURL}${path}/${id}`, config);
  return response;
};

//score test
export const FetchPostsByPage = async (path, page) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}?page=${page}`, config);
  return response;
};

export const FetchPostCount = async (user_id, path) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}${user_id}`, config);
  return response;
};

// export const FetchSeByPage = async (path,page) => {

//   let token = getCookie("userToken");
//   let config = { headers: { Authorization: "Bearer " + token } };
//   const response = await axios.get(`${backendURL}${path}?page=${page}`, config);
//   return response;
// };

export const FetchScorePosts = async (path) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}`, config);
  return response;
};

export const FetchUserCoupon = async (path) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}`, config);
  return response;
};
