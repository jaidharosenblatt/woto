import actionTypes from "./actionTypes";
import {
  clearUserType,
  clearToken,
  setUserType,
  getUserType,
} from "../../api/tokenService";

// initialize with session stored values if needed
let initialState = {
  user: "",
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
  switch (actionTypes.type) {
    case actionTypes.LOGIN:
      setUserType(action.payload.userType);
      return {
        ...state,
        user: { ...action.payload.user },
        userType: action.payload.userType,
      };
    case actionTypes.LOAD:
      return {
        ...state,
        user: { ...action.payload.user },
        userType,
        isAuthenticated: true,
      };

    case actionTypes.REGISTER:
      return {
        ...state,
        user: action.payload.user,
        userType: action.payload.userType,
        isAuthenticated: true,
      };
    case actionTypes.EDIT:
      return {
        ...state,
        user: action.payload.user,
      };

    case actionTypes.LOGOUT:
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
