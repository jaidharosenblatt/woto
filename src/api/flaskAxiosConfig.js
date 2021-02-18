import axios from "axios";

const flaskClient = axios.create({
  baseURL: "https://woto-analytics.herokuapp.com/api/",
  headers: {
    "Access-Control-Allow-Origin": "https://woto-analytics.herokuapp.com/api/",
  },
});

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

flaskClient.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error)
);

export default flaskClient;
