import {
  clearUserType,
  clearToken,
  setUserType,
  getUserType,
} from "../../api/tokenService";
import {
  LOGIN_USER,
  LOAD_USER,
  REGISTER_USER,
  EDIT_USER,
  LOGOUT_USER,
} from "./actionTypes";

// initialize with session stored values if needed
let initialState = {
  user: {},
  isAuthenticated: false,
  userType: getUserType(),
};

/**
 * @function authReducer
 * @param {Object} state - User state
 * @param {Object} action - action to be reduced
 * @returns {Object} - new state
 */
export default (state = initialState, action) => {
  const userType = getUserType();
  switch (action.type) {
    case LOGIN_USER:
      setUserType(action.payload.userType);
      return {
        ...state,
        user: action.payload.user,
        userType: action.payload.userType,
      };
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
        userType,
        isAuthenticated: true,
      };

    case REGISTER_USER:
      return {
        ...state,
        user: action.payload.user,
        userType: action.payload.userType,
        isAuthenticated: true,
      };
    case EDIT_USER:
      return {
        ...state,
        user: action.payload.user,
      };

    case LOGOUT_USER:
      // in case user isn't verified and can't "log out" on backend
      clearToken();
      clearUserType();
      return {
        ...state,
        user: null,
        userType: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
