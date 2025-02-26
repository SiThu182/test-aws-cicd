import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_API;

export const fetchProductDetailFrontend = async (postId) => {
  const response = await axios.get(
    `${backendURL}product-details/${postId}`
  );

  return response;
};
