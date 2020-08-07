import React, { createContext, useReducer } from "react";
import API from "../api/API";

const initialState = {
  description: {},
  question: {},
  discussion: {},
  discussionParticipant: {},
};

export const actions = {
  CREATE_DISCUSSION: "CREATE_DISCUSSION",
  EDIT_DISCUSSION: "EDIT_DISCUSSION",
  ARCHIVE_DISCUSSION: "ARCHIVE_DISCUSSION",
  JOIN_DISCUSSION: "JOIN_DISCUSSION",
  LEAVE_DISCUSSION: "LEAVE_DISCUSSION",
  CREATE_QUESTION: "JOIN_QUESTION",
  EDIT_QUESTION: "EDIT_QUESTION",
  ARCHIVE_QUESTION: "ARCHIVE_QUESTION",
};

const reducer = async (state, action) => {
  switch (action) {
    case actions.CREATE_QUESTION:
      try {
        const response = await API.postQuestion(state.course._id);
        return {
          ...state,
          description: response.description,
          question: response,
        };
      } catch (error) {
        console.log(error);
        throw new Error();
      }
    default:
      return state;
  }
};
export const HelpContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    course: props.course,
  });

  return (
    <HelpContext.Provider value={{ state, dispatch }}>
      {props.children}
    </HelpContext.Provider>
  );
};

export const HelpContext = createContext(initialState);
