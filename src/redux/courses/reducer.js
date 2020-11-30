import {
  LOADING_SET,
  ERROR_SET,
  BYPASS_SESSION_SET,
  COURSE_FETCH,
  SESSION_FETCH,
  DISCUSSIONS_FETCH,
  ACTIVE_DISCUSSION_FETCH,
  QUESTIONS_FETCH,
} from "./actionsTypes";

/**
 * Reducer for courses Redux state
 * @param {Object} state starting state
 * @param {Object} action containing payload
 */
export default (state = { loading: false }, action) => {
  switch (action.type) {
    case LOADING_SET: // action.payload is boolean
      return {
        ...state,
        loading: action.payload,
      };
    case ERROR_SET: // action.payload is error message
      return {
        ...state,
        error: action.payload,
      };
    case BYPASS_SESSION_SET: {
      let newState = { ...state };
      newState[action.payload.courseID].bypassSession =
        action.payload.bypassSession;
      return newState;
    }
    case COURSE_FETCH: {
      // action.payload is course
      let newState = { ...state };
      if (action.payload?._id) {
        newState[action.payload._id] = action.payload;
      }
      return newState;
    }
    case SESSION_FETCH: {
      // action.payload is session
      let newState = { ...state };
      if (action.payload.courseID) {
        newState[action.payload.courseID] = {
          ...newState[action.payload.courseID],
          session: action.payload.session,
        };
      }
      return newState;
    }
    case DISCUSSIONS_FETCH: {
      // action.payload has attributes discussions and courseID
      let newState = { ...state };
      if (action.payload.courseID) {
        newState[action.payload.courseID] = {
          ...newState[action.payload.courseID],
          discussions: action.payload.discussions,
        };
      }
      return newState;
    }
    case ACTIVE_DISCUSSION_FETCH: {
      // action.payload has attributes activeDiscussion and courseID
      let newState = { ...state };
      if (action.payload.courseID) {
        newState[action.payload.courseID] = {
          ...newState[action.payload.courseID],
          activeDiscussion: action.payload.activeDiscussion,
        };
      }
      return newState;
    }
    case QUESTIONS_FETCH: {
      // action.payload has attributes courseID and questions[]
      let newState = { ...state };
      if (action.payload.courseID) {
        if (newState[action.payload.courseID]?.session) {
          newState[action.payload.courseID].session = {
            ...newState[action.payload.courseID].session,
            questions: action.payload.questions,
          };
        }
      }
      return newState;
    }
    default:
      return state;
  }
};
