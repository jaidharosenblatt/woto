import Cookies from "js-cookie";

// Set the JWT as "token" in local storage
export function setToken(JWT) {
  // Set an object called token with value and expiry properties
  Cookies.set("token", JSON.stringify(JWT));
}

// Clear the current JWT from local storage
export function clearToken() {
  Cookies.remove("token");
}

// Get the current JWT from local storage
export function getToken() {
  const token = Cookies.get("token");
  if (token && token !== "undefined") {
    return JSON.parse(token);
  }

  return null;
}

// set the current user type "instructor" or "student"
export function setUserType(userType) {
  Cookies.set("userType", JSON.stringify(userType));
}

// Get the current user from local storage
export function getUserType() {
  const userType = Cookies.get("userType");
  if (userType) {
    return JSON.parse(userType);
  }
  return null;
}

// Clear the current user from local storage
export function clearUserType() {
  Cookies.remove("userType");
}
