import * as auth from "./auth/actionCreators";
import * as sortedCourses from "./sorted-courses/actionCreators";
import * as studentCourses from "./courses/actions/student";
import * as wotoCourses from "./courses/actions/wotos";
import * as taCourses from "./courses/actions/ta";
import * as fetches from "./courses/actions/fetches";
import * as status from "./status/actionCreators";
import * as currentCourse from "./current-course/actionCreators";
import * as dashboard from "./dashboard/actionCreators";

export const actionCreators = {
  ...auth,
  ...sortedCourses,
  ...studentCourses,
  ...wotoCourses,
  ...taCourses,
  ...fetches,
  ...status,
  ...currentCourse,
  ...dashboard,
};
