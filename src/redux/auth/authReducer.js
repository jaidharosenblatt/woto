import {
  clearUserType,
  clearToken,
  setUserType,
  getUserType,
} from "../../api/tokenService";
import { RESET } from "../globalActionTypes";
import actionTypes from "./actionTypes";

// initialize with session stored values if needed
const initialState = {
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
    case actionTypes.LOGIN_USER:
      setUserType(action.payload.userType);
      return {
        ...state,
        user: action.payload.user,
        userType: action.payload.userType,
        isAuthenticated: true,
      };
    case actionTypes.LOAD_USER:
      return {
        ...state,
        user: action.payload,
        userType,
        isAuthenticated: true,
      };

    case actionTypes.REGISTER_USER:
      return {
        ...state,
        user: action.payload.user,
        userType: action.payload.userType,
        isAuthenticated: true,
      };
    case actionTypes.EDIT_USER:
      return {
        ...state,
        user: action.payload,
      };

    case RESET:
      // in case user isn't verified and can't "log out" on backend
      clearToken();
      clearUserType();
      return initialState;
    default:
      return state;
  }
};
