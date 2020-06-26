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
  } else {
    return null;
  }
}
