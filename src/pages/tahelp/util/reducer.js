import { actions } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.OPEN_SESSION:
      return {
        ...state,
        joined: true,
        session: action.payload,
      };
    case actions.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case actions.SETUP_SESSION:
      return {
        ...state,
        loading: false,
        session: action.payload.session,
        joined: action.payload.joined,
      };
    case actions.CLOSE_SESSION:
      return {
        ...state,
        session: false,
        joined: false,
      };
    case actions.SET_HELPING_QUESTION:
      return {
        ...state,
        loading: false,
        helpingQuestion: action.payload,
      };
    case actions.CLEAR_MESSAGE:
      return {
        ...state,
        loading: false,
        message: undefined,
      };
    case actions.SET_ERROR:
      return {
        ...state,
        loading: false,
        message: { error: action.payload },
      };
    case actions.SET_SUCCESS:
      return {
        ...state,
        loading: false,
        message: { success: action.payload },
      };

    default:
      return state;
  }
};
