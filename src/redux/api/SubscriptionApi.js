import axios from "axios";
import { getCookie } from "../../Utils/GetCookies";

const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
const frontendURL = process.env.REACT_APP_BACKEND_API;

export const FetchSubscriptionType = async (path) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${frontendURL}${path}`, config);
  return response;
};
export const FetchSubscriptionPlan = async (path) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}`, config);
  return response;
};

export const FetchTotalAmountRegistration = async (path) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}`, config);
  return response;
};

export const FetchSubscriptionPlanFrontend = async (path) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${frontendURL}${path}`, config);
  return response;
};

export const FetchTrainingPlanFrontend = async (type) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(
    `${frontendURL}subscription-training-by-type?type=${type}`,
    config
  );
  return response;
};

export const FetchPlanTypesFrontend = async (path, request) => {
  let token = getCookie("userToken");

  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(
    `${frontendURL}${path}?plan_type=${request.plan_type}`,
    config
  );
  return response;
};

export const SubscriptionPlanRegisterFrontend = async (path, postData) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.post(`${frontendURL}${path}`, postData, config);
  return response;
};

//register list
export const FetchSubscriptionPlanRegisterList = async (path, postData) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}`, config);
  return response;
};

//register plan detail
export const FetchSubscriptionPlanRegisterDetail = async (path, id) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };

  const response = await axios.get(`${backendURL}${path}/${id}`, config);

  return response.data;
};

//show frontend status = 1 count
export const FetchShowFrontendCount = async (path) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}`, config);
  return response;
};
