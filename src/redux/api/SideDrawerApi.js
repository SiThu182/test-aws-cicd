import axios from "axios";
import { getCookie } from "../../Utils/GetCookies";
const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

export const fetchTestPostList = async (path, page) => {
  let token = getCookie("userToken");

  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}`, config);

  return response;
};
