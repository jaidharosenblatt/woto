import actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  pageLoading: true,
};

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
    case actionTypes.SET_SERVER_ERROR:
      return {
        ...state,
        serverError: action.payload,
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
    case actionTypes.SET_SERVER_SUCCESS:
      return {
        ...state,
        serverSuccess: action.payload,
      };
    case actionTypes.SET_ROSTER_STATUS:
      return {
        ...state,
        roster: action.payload,
      };
    case actionTypes.SET_MODAL_KEY:
      return {
        ...state,
        modalKey: action.payload,
      };
    case actionTypes.CLEAR_MODAL_KEY:
      return {
        ...state,
        modalKey: null,
        blockModal: true,
      };
    case actionTypes.BLOCK_MODAL:
      return {
        ...state,
        blockModal: true,
      };
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};

