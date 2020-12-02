import actionTypes from "./actionsTypes";

/**
 * Reducer for courses Redux state
 * @param {Object} state starting state
 * @param {Object} action containing payload
 */
export default (state = { sortedCourses: [] }, action) => {
  switch (action.type) {
    case actionTypes.SET_COURSE: {
      return {
        ...state,
        [action.courseID]: {
          bypassSession: false,
          session: {},
          discussions: [],
          questions: [],
          stats: {},
          ...action.payload,
        },
      };
    }
    case actionTypes.SET_SORTED_COURSES: {
      return {
        ...state,
        sortedCourses: action.payload,
      };
    }
    case actionTypes.SET_SESSION: {
      return {
        ...state,
        [action.courseID]: {
          ...state[action.courseID],
          session: action.payload,
        },
      };
    }
    case actionTypes.SET_DISCUSSIONS: {
      return {
        ...state,
        [action.courseID]: {
          ...state[action.courseID],
          discussions: action.payload,
        },
      };
    }

    case actionTypes.SET_ACTIVE_DISCUSSION: {
      return {
        ...state,
        [action.courseID]: {
          ...state[action.courseID],
          activeDiscussion: action.payload,
        },
      };
    }

    case actionTypes.SET_QUESTIONS: {
      return {
        ...state,
        [action.courseID]: {
          ...state[action.courseID],
          questions: action.payload,
        },
      };
    }

    case actionTypes.SET_ACTIVE_QUESTION: {
      return {
        ...state,
        [action.courseID]: {
          ...state[action.courseID],
          activeQuestion: action.payload,
        },
      };
    }

    case actionTypes.SET_STATS: {
      return {
        ...state,
        [action.courseID]: {
          ...state[action.courseID],
          stats: action.payload,
        },
      };
    }
    case actionTypes.SET_BYPASS_SESSION: {
      return {
        ...state,
        [action.courseID]: {
          ...state[action.courseID],
          bypassSession: true,
        },
      };
    }
    default:
      return state;
  }
};
