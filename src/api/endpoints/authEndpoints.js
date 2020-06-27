import client from "../axiosConfig";
import { getToken, setToken, clearToken } from "../tokenService";

/*
  Return the proper endpoint directory for the provided user type
  ("student" vs "instructor")
*/
const roleToEndPoint = (role) => {
  return role === "instructor" ? "/instructors" : "/students";
};

/**
 * Create a new user
 * @param user contains role, email, firstName,lastName, graduationYear, institution, password,
 */
export async function register(user) {
  console.log(user);
  const test = {
    name: "Jaidha Rosenblatt",
    email: "jaidharosenblatt@duke.edu",
    password: "729surfer",
    institution: "5eed8424b42c43217ed74ee6",
  };
  let { data } = await client.post("students", test);
  console.log(data);
  return { data };
}

/**
 * Log in a user
 * @param {user} email
 * @param {user} password
 */
export async function logIn(user) {
  let { data } = await client.post("students/login", user);
  setToken(data.token);
  return data;
}

/**
 * Log out user and clear their token
 */
export async function logOut() {
  let { data } = await client.post("students/logout");
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
  register,
};
