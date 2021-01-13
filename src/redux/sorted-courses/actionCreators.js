import actionTypes from "./actionTypes";
import API from "../../api/API";

import {
  startLoading,
  stopLoading,
  clearError,
  setError,
  setServerError,
  setSuccessMessage,
} from "../status/actionCreators";
import {
  setCurrentCourse,
  changeCourse,
} from "../current-course/actionCreators";
import { setCourse } from "../courses/actions/actionCreators";

/**
 * Create a dispatch to load sorted courses in redux
 * @param {Array} courses
 * @returns {Object} function to dispatch
 */
export const setSortedCourses = (courses) => {
  return {
    type: actionTypes.SET_SORTED_COURSES,
    payload: courses,
  };
};

/**
 * Create a dispatch to change a given course in redux
 * @param {Object} course
 * @returns {Object} function to dispatch
 */
export const updateCourse = (course) => {
  return {
    type: actionTypes.UPDATE_COURSE,
    payload: course,
  };
};

/**
 * @function createCourse
 * Create a new course and add it to sortedCourses in redux
 * @param {Object} course to add
 * @returns {Function} redux thunk action
 */
export const createCourse = (course) => async (dispatch) => {
  dispatch(startLoading());
  let newCourse;
  try {
    newCourse = await API.postCourses(course);
    await dispatch(setCurrentCourse(newCourse._id));
    dispatch({
      type: actionTypes.ADD_COURSE,
      payload: newCourse,
    });
    dispatch(clearError());
  } catch (error) {
    dispatch(setServerError("creating your course"));
  } finally {
    dispatch(stopLoading());
  }
  return newCourse;
};

/**
 * @function courseUnenroll
 * Unenroll from a course and remove it from sortedCourses in redux
 * @param {Object} course to remove
 * @returns {Function} redux thunk action
 */
export const courseUnenroll = (course) => async (dispatch) => {
  dispatch(startLoading());
  try {
    await API.unenroll(course._id);
    dispatch({
      type: actionTypes.REMOVE_COURSE,
      payload: course._id,
    });
    dispatch(clearError());
  } catch (error) {
    dispatch(setServerError("un-enrolling from this course"));
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * @function courseArchive
 * Archive a course and remove it from sortedCourses in redux
 * @param {Object} course
 * @returns {Function} redux thunk action
 */
export const courseArchive = (course) => async (dispatch) => {
  dispatch(startLoading());
  try {
    await API.editCourse(course._id, { archived: true });
    dispatch({
      type: actionTypes.REMOVE_COURSE,
      payload: course._id,
    });
    dispatch(clearError());
  } catch (error) {
    dispatch(setServerError("archiving this course"));
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * @function courseUnarchive
 * Unarchive a course and add it back to sortedCourses in redux
 * @param {Object} course
 * @returns {Function} redux thunk action
 */
export const courseUnarchive = (course) => async (dispatch) => {
  dispatch(startLoading());
  try {
    await API.editCourse(course._id, { archived: false });
    dispatch({
      type: actionTypes.ADD_COURSE,
      payload: course,
    });
    dispatch(clearError());
  } catch (error) {
    dispatch(setServerError("archiving this course"));
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * @function courseEnroll
 * Enroll in a new course and add it to sortedCourses in redux
 * @param {String} accessKey
 * @returns {Function} redux thunk action
 */
export const courseEnroll = (accessKey) => async (dispatch, getState) => {
  dispatch(startLoading());
  try {
    const newCourse = await API.courseEnroll({ accessKey });

    // add course to redux/courses
    dispatch(setCourse(newCourse._id, newCourse));

    // set course as current course and load session, discussions, etc
    await dispatch(changeCourse(newCourse._id));

    // add to navbar
    dispatch({
      type: actionTypes.ADD_COURSE,
      payload: newCourse,
    });

    dispatch(setSuccessMessage(`Enrolled in new course, ${newCourse?.code}`));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("Invalid course code. Please contact your instructor"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * @function sortCourses
 * Sort courses first by if they have a session then by code
 * Then return courses that only contain id, code, session, and name
 * @param {Array} courses
 * @returns {Array} courses sorted and truncated
 */
export function sortCourses(courses) {
  const filtered = courses.filter((course) => !course.archived);
  filtered.sort((a, b) => {
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
  return filtered;
}

/**
 * Reset the sortedCourses state in redux
 * @returns {Object} to dispatch to redux
 */
export function resetSortedCourses() {
  return {
    type: actionTypes.RESET,
  };
}
