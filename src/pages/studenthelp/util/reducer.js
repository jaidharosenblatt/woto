import { actions } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_SESSION:
      return {
        ...state,
        loading: false,
        session: action.payload,
      };
    case actions.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.SET_QUESTION:
      return {
        ...state,
        loading: false,
        description: action.payload.description,
        question: action.payload,
      };

    case actions.SET_STATS:
      return {
        ...state,
        loading: false,
        stats: action.payload,
      };

    case actions.JOIN_WOTO_ROOM:
      return {
        ...state,
        loading: false,
        discussion: { archived: true },
      };

    case actions.EDIT_SUBMISSION:
      return {
        ...state,
        loading: false,
        question: action.payload.question,
        discussion: action.payload.discussion,
        description: action.payload.question.description,
      };

    case actions.SET_DISCUSSIONS:
      return {
        ...state,
        loading: false,
        discussions: action.payload,
      };

    case actions.SET_DISCUSSION:
      return {
        ...state,
        loading: false,
        description: action.payload.description,
        discussion: action.payload,
      };

    case actions.ARCHIVE_DISCUSSION:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        description: action.payload.description,
        discussion: action.payload.discussion,
      };

    // Join someone else's discussion
    case actions.JOIN_DISCUSSION:
      return {
        ...state,
        loading: false,
        discussion: { ...state.discussion, archived: true },
        discussionParticipant: action.payload.discussion,
        commonValues: action.payload.commonValues,
      };
    // Leave someone else's discussion
    case actions.LEAVE_DISCUSSION:
      return {
        ...state,
        loading: false,
        discussionParticipant: undefined,
      };

    default:
      return state;
  }
};
