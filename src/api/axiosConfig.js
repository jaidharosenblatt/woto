import axios from "axios";
import { getToken } from "./tokenService.js";

const client = axios.create({
  baseURL: "https://woto.herokuapp.com/",
  // baseURL: "http://localhost:5000",
  headers: { "Access-Control-Allow-Origin": "https://woto.herokuapp.com/" },
});

/* REQUEST INTERCEPTORS */

// enable handler unless it is explicitly disabled
// to disable, simply pass handlerEnabled: false in config of request
const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

// Add authentication token to each request
const requestHandler = (request) => {
  if (isHandlerEnabled(request) && getToken() !== null) {
    request.headers["Authorization"] = `${getToken()}`;
  }
  return request;
};

/* RESPONSE INTERCEPTORS */
const errorHandler = (error) => {
  if (isHandlerEnabled(error.config)) {
    // Handle errors
    console.log(error);
  }
  return Promise.reject({ ...error });
};

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
  }
  return response;
};

client.interceptors.request.use((request) => requestHandler(request));
client.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);
export default client;
