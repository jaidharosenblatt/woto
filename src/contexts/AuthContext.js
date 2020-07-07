import React from "react";
import { getUserType } from "../api/tokenService";
import { clearUserType, clearToken } from "../api/tokenService";

// intialize with session stored values if needed
let initialState = {
  user: "",
  isAuthenticated: false,
  userType: getUserType(),
  refreshApp: false,
};

export const AuthContext = React.createContext(initialState);

const reducer = (state, action) => {
  const userType = getUserType();
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: { ...action.payload.user },
        userType,
        isAuthenticated: true,
        refreshApp: !state.refreshApp,
      };
    case "LOAD":
      return {
        ...state,
        user: { ...action.payload.user },
        userType,
        isAuthenticated: true,
      };
    case "REGISTER":
      return {
        ...state,
        user: action.payload.user,
        userType: action.payload.userType,
        isAuthenticated: true,
        refreshApp: !state.refreshApp,
      };
    case "UPDATE USER":
      return {
        ...state,
        user: action.payload.user,
        refreshApp: !state.refreshApp,
      };
    case "LOGOUT":
      // in case user isn't verified and can't "log out" on backend
      clearToken();
      clearUserType();
      return {
        ...state,
        user: null,
        userType: null,
        isAuthenticated: false,
        refreshApp: !state.refreshApp,
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
