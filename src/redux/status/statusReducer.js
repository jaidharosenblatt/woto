import { RESET } from "../globalActionTypes";
import actionTypes from "./actionTypes";

const initialState = { loading: false, pageLoading: false };

/**
 * @function statusReducer
 * Holds state for loading and error
 * @param {Object} state - Current status of app
 * @param {Object} action - action to be reduced
 * @returns {Object} - new status of app
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: undefined,
      };
    case actionTypes.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.START_PAGE_LOADING:
      return {
        ...state,
        pageLoading: true,
      };
    case actionTypes.STOP_PAGE_LOADING:
      return {
        ...state,
        pageLoading: false,
      };
    case actionTypes.SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};
