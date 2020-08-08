import { actions } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_SESSION:
      return {
        ...state,
        session: action.payload,
      };
    case actions.SET_QUESTION:
      return {
        ...state,
        description: action.payload.description,
        question: action.payload,
      };

    case actions.JOIN_WOTO_ROOM:
      return { ...state, discussion: { archived: true } };

    case actions.EDIT_SUBMISSION:
      return {
        ...state,
        question: action.payload.question,
        discussion: action.payload.discussion,
        description: action.payload.question.description,
      };

    case actions.SET_DISCUSSION:
      return {
        ...state,
        description: action.payload.description,
        discussion: action.payload,
      };

    // Join someone else's discussion
    case actions.JOIN_DISCUSSION:
      console.log(action.payload);
      return {
        ...state,
        discussionParticipant: action.payload,
      };
    // Leave someone else's discussion
    case actions.LEAVE_DISCUSSION:
      return {
        ...state,
        discussionParticipant: undefined,
      };
    default:
      return state;
  }
};
