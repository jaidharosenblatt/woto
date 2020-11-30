import actionTypes from "./actionTypes";

/**
 * @function statusReducer
 * Holds state for loading and error
 * @param {Object} state - Current status of app
 * @param {Object} action - action to be reduced
 * @returns {Object} - new status of app
 */
export default (state = { loading: false, pageLoading: false }, action) => {
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
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.SET_PAGE_LOADING:
      return {
        ...state,
        pageLoading: action.payload,
      };
    default:
      return state;
  }
};
