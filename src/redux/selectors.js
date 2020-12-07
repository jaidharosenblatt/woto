import auth from "./auth/authSelectors";
import courses from "./courses/coursesSelectors";
import currentCourse from "./current-course/currentCourseSelectors";
import sortedCourses from "./sorted-courses/sortedCoursesSelectors";
import status from "./status/statusSelectors";

export default {
  ...auth,
  ...courses,
  ...currentCourse,
  ...sortedCourses,
  ...status,
};
