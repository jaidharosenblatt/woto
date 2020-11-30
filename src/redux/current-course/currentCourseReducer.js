import actionTypes from "./actionTypes";

/**
 * @function currentCourseReducer
 * @param {String} state - Currently viewed courseID
 * @param {Object} action - action to be reduced
 * @returns {String} - new viewed courseID
 */
export default (state = "", action) => {
  if (actionTypes.SET_ACTIVE_COURSE) {
    return action.payload;
  }

  return state;
};
