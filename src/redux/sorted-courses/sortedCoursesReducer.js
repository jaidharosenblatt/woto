import actionTypes from "./actionTypes";
import { sortCourses } from "./actionCreators";

const initialState = [];
/**
 * @function sortedCoursesReducer
 * Holds a sorted course array
 * @param {Array} state - Current status of app
 * @param {Object} action - action to be reduced
 * @returns {Array} - new status of app
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SORTED_COURSES:
      return sortCourses(action.payload);
    case actionTypes.ADD_COURSE:
      return sortCourses([...state, action.payload]);
    case actionTypes.REMOVE_COURSE:
      return sortCourses(
        state.filter((course) => course._id !== action.payload)
      );
    case actionTypes.UPDATE_COURSE:
      const courses = state.filter(
        (course) => course._id !== action.payload._id
      );
      return sortCourses([...courses, action.payload]);
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};
