import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_API;

export const FetchHomePageData = async (path) => {
  const response = await axios.get(`${backendURL}${path}`);
  return response;
};
