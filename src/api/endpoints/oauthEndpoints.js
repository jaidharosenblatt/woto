import client from "../axiosConfig";
import { setToken, setUserType } from "../tokenService";

/**
 * Get the redirect url for Duke shibboleth for students
 * @returns {String} url
 */
export const getOauthRedirectUrlStudent = async () => {
  const params = getDevParams();
  let { data } = await client.get("/oauth/authorize/student", { params });
  return data;
};

/**
 * Get the redirect url for Duke shibboleth for instructors
 * @returns {String} url
 */
export const getOauthRedirectUrlInstructor = async () => {
  const params = getDevParams();
  let { data } = await client.get("/oauth/authorize/instructor", { params });
  return data;
};

/**
 * Login/signup a student
 * @param code from oauth callback
 * @returns {Student} student to login
 */
export const authenticateStudent = async (code) => {
  const params = getDevParams();
  let { data } = await client.post("/oauth/student", { code }, { params });

  setToken(data.token);
  setUserType("student");
  return data.student;
};

/**
 * Login/signup a student
 * @param code from oauth callback
 * @returns {Instructor} instructor to login
 */
export const authenticateInstructor = async (code) => {
  const params = getDevParams();
  let { data } = await client.post("/oauth/instructor", { code }, { params });

  setToken(data.token);
  setUserType("instructor");
  return data.instructor;
};

const getDevParams = () => {
  const dev = process.env.NODE_ENV === "development";
  return { dev };
};
