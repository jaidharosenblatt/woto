import { combineReducers } from "redux";
import courses from "./courses/reducer";
import auth from "./auth/authReducer";

export default combineReducers({
  courses,
  auth,
});
