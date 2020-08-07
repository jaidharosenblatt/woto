import React from "react";
import {
  clearUserType,
  clearToken,
  setUserType,
  getUserType,
} from "../api/tokenService";

// intialize with session stored values if needed
let initialState = {
  user: "",
  isAuthenticated: false,
  userType: getUserType(),
};

export const actions = {
  LOGIN: "LOGIN",
  LOAD: "LOAD",
  REGISTER: "REGISTER",
  EDIT: "EDIT",
  LOGOUT: "LOGOUT",
};

export const AuthContext = React.createContext(initialState);

const reducer = (state, action) => {
  const userType = getUserType();
  switch (action.type) {
    case actions.LOGIN:
      setUserType(action.payload.userType);
      return {
        ...state,
        user: { ...action.payload.user },
        userType: action.payload.userType,
      };
    case actions.LOAD:
      return {
        ...state,
        user: { ...action.payload.user },
        userType,
        isAuthenticated: true,
      };

    case actions.REGISTER:
      return {
        ...state,
        user: action.payload.user,
        userType: action.payload.userType,
        isAuthenticated: true,
      };
    case actions.EDIT:
      return {
        ...state,
        user: action.payload.user,
      };

    case actions.LOGOUT:
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

export const ContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default { AuthContext, ContextProvider };
