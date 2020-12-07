import actionTypes from "./actionTypes";

const initialState = "";
/**
 * @function currentCourseReducer
 * @param {String} state - Currently viewed courseID
 * @param {Object} action - action to be reduced
 * @returns {String} - new viewed courseID
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_COURSE:
      return action.payload;
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};
