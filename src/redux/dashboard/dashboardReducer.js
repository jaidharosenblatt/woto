import actionTypes from "./actionTypes";
import moment from "moment";

const initialState = {
  startDate: moment().subtract(1, "weeks"),
  endDate: moment(),
};

/**
 * @function authReducer
 * @param {Object} state - User state
 * @param {Object} action - action to be reduced
 * @returns {Object} - new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ASSISTANT:
      return { ...state, assistant: action.payload };
    case actionTypes.SET_START_DATE:
      return { ...state, startDate: action.payload };
    case actionTypes.SET_END_DATE:
      return { ...state, endDate: action.payload };
    case actionTypes.SET_HOME:
      return { ...state, home: action.payload };
    case actionTypes.SET_COURSE:
      return { ...state, course: action.payload };
    default:
      return state;
  }
};
