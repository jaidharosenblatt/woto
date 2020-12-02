import actionTypes from "./actionTypes";
/**
 * Create a dispatch to load sorted courses in redux
 * @param {Array} courses
 * @returns {Object} function to dispatch
 */
export function setSortedCourses(courses) {
  return {
    type: actionTypes.SET_SORTED_COURSES,
    payload: courses,
  };
}

export const sortCoursesBySessionThenCode = (courses) => {
  courses.sort((a, b) => {
    if (
      (a.activeSession && b.activeSession) ||
      (!a.activeSession && !b.activeSession)
    ) {
      return b.code > a.code ? 1 : -1;
    } else if (a.activeSession) {
      return -1;
    } else {
      return 1;
    }
  });
  return courses.map((course) => {
    return {
      _id: course._id,
      code: course.code,
      activeSession: course.activeSession,
      name: course.name,
    };
  });
};
