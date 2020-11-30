import actionTypes from "./actionTypes";

/**
 * @function currentCourseReducer
 * @param {String} state - Currently viewed courseID
 * @param {Object} action - action to be reduced
 * @returns {String} - new viewed courseID
 */
export default (state = "5f26f8cf38ab0d00171aa7e5", action) => {
  if (action.type === actionTypes.SET_ACTIVE_COURSE) {
    return action.payload;
  }

  return state;
};
