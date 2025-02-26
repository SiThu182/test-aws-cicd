import axios from "axios";
import { getCookie } from "../../Utils/GetCookies";

const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

export const FetchMockTestList = async (path) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };

  const response = await axios.get(`${backendURL}${path}`, config);

  return response.data.data;
};

//for checking answer of the test
export const FetchCheckMockTest = async (id) => {
  let token = getCookie("userToken");
  let userId = localStorage.getItem("userId");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(
    `${backendURL}mt-test-user-answer/${id}/${userId}`,
    config
  );

  return response.data.data;
};

//for fetching audio of the mock test section
export const FetchAudioMockTest = async (data) => {
  let token = getCookie("userToken");

  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.post(`${backendURL}mt-test-audio`, data, config);

  return response.data.data;
};

//for fetching save progress mt of the mock test section
export const FetchSaveMockTestList = async (data) => {
  let token = getCookie("userToken");
  let userId = localStorage.getItem("userId");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(
    `${backendURL}temp-mt/get-save-files/${userId}`,
    config
  );

  return response.data.data;
};

//for fetching temp progress mt of the mock test section at admin side
export const FetchTempMockTestList = async (path) => {
  let token = getCookie("userToken");

  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(`${backendURL}${path}`, config);

  return response.data.data;
};
