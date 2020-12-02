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
    case actionTypes.ADD_COURSE:
      return [...state, action.payload];
    case actionTypes.REMOVE_COURSE:
      return state.filter((course) => course._id != action.payload);
    default:
      return state;
  }
};
