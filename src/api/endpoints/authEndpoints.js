import client from "../axiosConfig";
import { getToken, setToken, clearToken } from "../tokenService";

/*
  Return the proper endpoint directory for the provided user type
  ("student" vs "instructor")
*/
const typeTerm = (type) => {
  return type === "instructor" ? "instructors" : "students";
};

/**
 * Create a new user
 * @param user contains userType, email, firstName,lastName, graduationYear, institution, password,
 * @param type student,ta or instructor
 */
export async function register(user, type) {
  let { data } = await client.post(typeTerm(type), user);
  setToken(data.token);
  setUserType(type);
  return { ...data, verified: false };
}
/**
 * Verify a user using their user type and a provided verification key
 * @param verificationKey ex b17da1d02e979a21c1b531e024b42d6f71d7deaa
 * @param type student or instructor
 */
export async function verifyUser(verificationKey, type) {
  let { data } = await client.post(`${typeTerm(type)}/verify`, {
    verificationKey,
  });
  return data;
}

/**
 * Log in a user
 * @param {user} email
 * @param {user} password
 */
export async function logIn(user, type) {
  let { data } = await client.post(`${typeTerm(type)}/login`, user);
  setToken(data.token);
  setUserType(type);
  return data;
}

/**
 * Log out user and clear their token
 */
export async function logOut(type) {
  let { data } = await client.post(`${typeTerm(type)}/logout"`);
  clearUserType();
  clearToken();
  return data;
}

/* Get a user based on their JWT */
export async function loadUser() {
  const type = getUserType();
  const token = getToken();
  if (!token) return null;
  else {
    let { data } = await client.get(`${typeTerm(type)}/me`);
    return data;
  }
}

// set the current user type "company" or "student"
export function setUserType(userType) {
  window.localStorage.setItem("userType", JSON.stringify(userType));
}

// Get the current user from local storage
export function getUserType() {
  return JSON.parse(window.localStorage.getItem("userType"));
}

// Clear the current user from local storage
export function clearUserType() {
  window.localStorage.removeItem("userType");
}

// Check if the token has expired
function tokenValid(JWT) {
  const currDate = Math.floor(Date.now() / 1000); // Get current date in seconds
  const expiry = JWT.expiry;
  return currDate < expiry ? true : false;
}

export default {
  logIn,
  loadUser,
  logOut,
  register,
  setUserType,
  getUserType,
  clearUserType,
  tokenValid,
  verifyUser,
};
