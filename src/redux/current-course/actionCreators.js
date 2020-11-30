import actionTypes from "./actionTypes";

export function setActiveCourse(courseID) {
  return {
    type: actionTypes.SET_ACTIVE_COURSE,
    payload: courseID,
  };
}
