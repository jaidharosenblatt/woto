import auth from "./auth/authSelectors";
import courses from "./courses/coursesSelectors";
import currentCourse from "./current-course/currentCourseSelectors";
import sortedCourses from "./sorted-courses/sortedCoursesSelectors";
import status from "./status/statusSelectors";
import dashboard from "./dashboard/dashboardSelectors";

export default {
  ...auth,
  ...courses,
  ...currentCourse,
  ...sortedCourses,
  ...status,
  ...dashboard,
};
