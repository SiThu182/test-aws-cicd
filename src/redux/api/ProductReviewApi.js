import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_API;

export const fetchProductDetailReview = async (path) => {
  const response = await axios.get(`${path}`);

  return response;
};
