import actionTypes from "./actionTypes";
import courses from "../courses/";
import { startPageLoading, stopPageLoading } from "../status/actionCreators";
/**
 * Create a dispatch to stop page loading in redux
 * @returns {Object} function to dispatch
 */
export function setCurrentCourse(courseID) {
  return {
    type: actionTypes.SET_ACTIVE_COURSE,
    payload: courseID,
  };
}

/**
 * Switch the currently viewed course and load all information about it
 * @param {String} courseID
 */
export const changeCourse = (courseID) => async (dispatch, getState) => {
  if (courseID === "addcourse") return; // ignore add course page

  dispatch(startPageLoading());

  dispatch(setCurrentCourse(courseID));

  await dispatch(courses.fetchFullCourse());

  dispatch(stopPageLoading());
};
