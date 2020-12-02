import actionTypes from "./actionTypes";
/**
 * Create a dispatch to load sorted courses in redux
 * @param {Array} courses
 * @returns {Object} function to dispatch
 */
const setSortedCourses = (courses) => {
  const sorted = sortCourses(courses);
  return {
    type: actionTypes.SET_SORTED_COURSES,
    payload: sorted,
  };
};

const createCourse = (course) => {};

const courseUnenroll = async (course) => {
  console.log(course);
  const unenrollId = course._id;
  const res = await API.unenroll(unenrollId);
  const filteredCourses = courses.filter((course) => course._id !== unenrollId);
  setCourses([...filteredCourses]);
  console.log(res);
};

const handleArchive = async (course) => {
  await API.editCourse(course._id, { archived: true });
  const temp = courses.filter((item) => item._id !== course._id);
  setCourses([...temp]);
  setArchivedCourses([...archivedCourses, course]);
};

const handleActivate = async (course) => {
  await API.editCourse(course._id, { archived: false });
  const temp = courses.filter((item) => item._id !== course._id);
  setArchivedCourses([...temp]);
  setCourses([...courses, course]);
};

const enrollInCourse = async (values) => {
  setButtonDisabled(true);
  try {
    const res = await API.courseEnroll(values);
    setCourseInfo(res);

    console.log("Success:", res);
    setError("");
    setCourses([...courses, res]);
  } catch (error) {
    console.log(error.response);
    if (error.response.status === 401) {
      setError("You are already enrolled in this course");
    } else {
      setError("Invalid course code. Please contact your instructor");
    }
    setButtonDisabled(false);
    console.log("Failed:", error);
  }
};

/**
 * @function sortCourses
 * Sort courses first by if they have a session then by code
 * Then return courses that only contain id, code, session, and name
 * @param {Array} courses
 * @returns {Array} courses sorted and truncated
 */
function sortCourses(courses) {
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
}

export default {
  setSortedCourses,
};
