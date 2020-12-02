import auth from "./auth/selectors";
import courses from "./courses/selectors";
import currentCourse from "./current-course/selectors";
import sortedCourses from "./sorted-courses/selectors";
import status from "./status/selectors";

export default {
  ...auth,
  ...courses,
  ...currentCourse,
  ...sortedCourses,
  ...status,
};
