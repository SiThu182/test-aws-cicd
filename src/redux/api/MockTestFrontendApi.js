import axios from "axios";
import { getCookie } from "../../Utils/GetCookies";

const backendAPI = process.env.REACT_APP_BACKEND_API;

export const FetchMockTestFrontend = async (path) => {
  let token = getCookie("userToken");
  //   let id = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(
    `${backendAPI}testing-mocktest?${path}`,
    config
  );
  return response.data.data;
};
