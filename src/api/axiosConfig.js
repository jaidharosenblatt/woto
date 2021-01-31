import axios from "axios";
import { getToken } from "./tokenService.js";

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://woto.herokuapp.com/",
  // baseURL: "https://woto.herokuapp.com/",
  headers: { "Access-Control-Allow-Origin": "https://woto.herokuapp.com/" },
});

// Add authentication token to each request
const requestHandler = (request) => {
  if (getToken() !== null) {
    request.headers["Authorization"] = `${getToken()}`;
  }
  return request;
};

/**
 * Reject requests with errors
 * @param {Object} error
 */
const errorHandler = (error) => {
  console.log({ ...error });

  // Check if there is a message returned with this error
  if (error?.response?.data?.message) {
    return Promise.reject(error?.response?.data?.message);
  }
  return Promise.reject("Something went wrong with our servers");
};

client.interceptors.request.use((request) => requestHandler(request));
client.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error)
);
export default client;
