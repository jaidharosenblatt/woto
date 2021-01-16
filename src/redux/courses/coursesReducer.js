import actionTypes from "./actionsTypes";

const initialState = {};
/**
 * Reducer for courses Redux state
 * @param {Object} state starting state
 * @param {Object} action containing payload
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COURSE: {
      return {
        ...state,
        [action.courseID]: {
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

    case actionTypes.SET_STUDENT_ROSTER: {
      return {
        ...state,
        [action.courseID]: {
          ...state[action.courseID],
          studentRoster: action.payload,
        },
      };
    }

    case actionTypes.SET_TA_ROSTER: {
      return {
        ...state,
        [action.courseID]: {
          ...state[action.courseID],
          taRoster: action.payload,
        },
      };
    }
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};
