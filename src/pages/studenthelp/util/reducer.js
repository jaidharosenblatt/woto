import { actions } from "./actions";

export const reducer = async (state, action) => {
  switch (action) {
    case actions.SET_QUESTION:
      return {
        ...state,
        description: action.payload.description,
        question: action.payload,
      };

    // Navigate to woto room without an active submission
    case actions.JOIN_WOTO_ROOM:
      return { ...state, discussion: { archived: true } };

    // Edit both discussion and question if they exist
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
      return {
        ...state,
        discussionParticipant: action.payload.discussion,
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
