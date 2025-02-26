import axios from "axios";
import { getCookie } from "../../Utils/GetCookies";
const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

export const fetchAllAnswers = async (postId, page) => {
  let token = getCookie("userToken");
  let userId = localStorage.getItem("userId");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(
    `${backendURL}record_scores/${userId}/${postId}?page=${page}`,
    config
  );

  return response;
};
