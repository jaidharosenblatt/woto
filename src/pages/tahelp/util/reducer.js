import { actions } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.SET_SESSION:
      return {
        ...state,
        loading: false,
        session: action.payload,
      };
    case actions.SET_HELPING_QUESTION:
      return {
        ...state,
        loading: false,
        helpingQuestion: action.payload,
      };
    case actions.SET_MESSAGE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    default:
      return state;
  }
};
