import axios from "axios";
import { getCookie } from "../../Utils/GetCookies";

const backendURL = process.env.REACT_APP_BACKEND_API;
//posts

export const FetchShopApi = async (path) => {
  let token = getCookie("userToken");
  let config = {
    headers: { Authorization: "Bearer " + token },
  };
  const response = await axios.get(`${backendURL}${path}`, config);

  return response;
};

export const FetchRelatedProductApi = async (path) => {
  // let token = getCookie("userToken");
  // let config = {
  //   headers: { Authorization: "Bearer " + token },
  // };
  const response = await axios.get(`${backendURL}${path}`);

  return response;
};
