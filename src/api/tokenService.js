// Set the JWT as "token" in local storage
export function setToken(JWT) {
  // Set an object called token with value and expiry properties
  localStorage.setItem("token", JSON.stringify(JWT));
}

// Clear the current JWT from local storage
export function clearToken() {
  localStorage.removeItem("token");
}

// Get the current JWT from local storage
export function getToken() {
  const token = localStorage.getItem("token");
  if (token) {
    return JSON.parse(token);
  }

  return null;
}

// set the current user type "instructor" or "student"
export function setUserType(userType) {
  window.localStorage.setItem("userType", JSON.stringify(userType));
}

// Get the current user from local storage
export function getUserType() {
  const userType = localStorage.getItem("userType");
  if (userType) {
    return JSON.parse(userType);
  }
  return null;
}

// Clear the current user from local storage
export function clearUserType() {
  localStorage.removeItem("userType");
}
