import { combineReducers } from "redux";
import courses from "./courses/coursesReducer";
import auth from "./auth/authReducer";
import currentCourse from "./current-course/currentCourseReducer";
import status from "./status/statusReducer";
import sortedCourses from "./sorted-courses/sortedCoursesReducer";
import dashboard from "./dashboard/dashboardReducer";

export default combineReducers({
  courses,
  auth,
  currentCourse,
  status,
  sortedCourses,
  dashboard,
});
