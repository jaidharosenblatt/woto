import client from "../axiosConfig";
import { setToken, setUserType } from "../tokenService";

/**
 * Get the redirect url for Duke shibboleth
 * @returns {String} url
 */
export const getOauthRedirectUrl = async () => {
  const dev = process.env.NODE_ENV === "development";
  let { data } = await client.get("/oauth/authorize", {
    params: { dev },
  });
  return data;
};

/**
 * Login/signup a student
 * @param code from oauth callback
 * @returns {Student} student to login
 */
export const authenticateStudent = async (code) => {
  const dev = process.env.NODE_ENV === "development";

  let { data } = await client.post(
    "/oauth/student",
    { code },
    { params: { dev } }
  );

  setToken(data.token);
  setUserType("student");
  return data;
};
