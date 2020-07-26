import client from "../axiosConfig";
import {
  getToken,
  setToken,
  clearToken,
  setUserType,
  getUserType,
  clearUserType,
} from "../tokenService";

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
 * Check if user's credentials are valid
 * @param {user} email
 * @param {user} password
 */
export async function confirmAcccount(user) {
  const type = getUserType();
  let { data } = await client.post(`${typeTerm(type)}/login`, user);
  return data;
}

/**
 * Edit fields
 * @param changes an object of changes to the profile
 */
export async function editProfile(changes) {
  const type = getUserType();
  let { data } = await client.patch(`${typeTerm(type)}/me`, changes);
  return data;
}

/**
 * Log out user and clear their token
 */
export async function logOut() {
  const type = getUserType();
  let { data } = await client.post(`${typeTerm(type)}/logout`);
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

/**
 * Verify a user using their user type and a provided verification key
 * @param verificationKey ex b17da1d02e979a21c1b531e024b42d6f71d7deaa
 * @param type student or instructor
 */
export async function verifyUser(verificationKey, type) {
  let { data } = await client.post(`${typeTerm(type)}/verify`, {
    verificationKey,
  });
  setToken(data.token);
  setUserType(type);
  return data;
}

/**
 * Reverify the user
 * @param email contains email to reverify
 * @param type student,ta, or instructor
 */
export async function reverify(email, type) {
  let { data } = await client.post(`${typeTerm(type)}/reverify`, email);
  return { ...data };
}

/**
 * Request reset password for a given email
 * @param email contains email to reverify
 * @param type student,ta, or instructor
 */
export async function requestResetPassword(email, type) {
  let { data } = await client.post(`${typeTerm(type)}/reset/request`, email);
  return { ...data };
}

/**
 * Reset password for a given email
 * @param {body} token key recieved in email
 * @param {body} newPassword new password for account
 * @param type student,ta, or instructor
 */
export async function resetPassword(body, type) {
  let { data } = await client.post(`${typeTerm(type)}/reset/`, body);
  return { ...data };
}

export default {
  logIn,
  loadUser,
  logOut,
  register,
  confirmAcccount,
  requestResetPassword,
  resetPassword,
  verifyUser,
  reverify,
  editProfile,
};
