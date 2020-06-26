import client from "../axiosConfig";
import { getToken, setToken, clearToken } from "../tokenService";

/**
 * Log in a user
 * @param {user} email
 * @param {user} password
 */
export async function logIn(user) {
  let { data } = await client.post("/students/login", user);
  setToken(data.token);
  return data;
}

/**
 * Log out user and clear their token
 */
export async function logOut() {
  let { data } = await client.post("/students/logout");
  clearToken();
  return data;
}

/**
 * Get user information by their token
 */
export async function loadUser() {
  const token = getToken();
  if (!token) return null;
  else {
    let { data } = await client.get("students/me");
    return data;
  }
}

export default {
  logIn,
  loadUser,
  logOut,
};
