import actionTypes from "./actionTypes";

export function setCurrentCourse(courseID) {
  return {
    type: actionTypes.SET_ACTIVE_COURSE,
    payload: courseID,
  };
}
