import actionTypes from "./actionTypes";

/**
 * @function sortedCoursesReducer
 * Holds a sorted course array
 * @param {Array} state - Current status of app
 * @param {Object} action - action to be reduced
 * @returns {Array} - new status of app
 */
export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_SORTED_COURSES:
      return action.payload;
    default:
      return state;
  }
};
