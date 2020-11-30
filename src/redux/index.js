import { combineReducers } from "redux";
import courses from "./courses/reducer";
import auth from "./auth/authReducer";
import currentCourse from "./current-course/currentCourseReducer";
import status from "./status/statusReducer";

export default combineReducers({
  courses,
  auth,
  currentCourse,
  status,
});
