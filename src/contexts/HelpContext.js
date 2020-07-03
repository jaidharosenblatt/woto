import React from "react";

let initialState = {
  student: "",
  ta: "",
  timeJoined: "",
  collaborators: [],
  stage: "",
  question: {},
  queuePosition: 0,
  active: true,
};

/**
 * @jaidharosenblatt
 * Used to store and modify the process for a student
 * joining the queue until they are helped
 */
export const HelpContext = React.createContext(initialState);
const reducer = (state, action) => {
  switch (action.type) {
    case "JOIN":
      return {
        ...state,
        stage: "preQuestion",
        timeJoined: new Date(),
        student: action.payload.student,
        queuePosition: action.payload.queuePosition,
      };
    case "SUBMIT":
      return {
        ...state,
        stage: "questionSubmitted",
        question: action.payload.question,
      };
    case "EDIT":
      return {
        ...state,
        question: action.payload.question,
      };
    case "COLLABORATE":
      return {
        ...state,
        stage: "collaborate",
      };
    case "HELP":
      return {
        ...state,
        ta: action.payload.ta,
        stage: "helped",
      };
    case "END":
      return {
        ...state,
        active: false,
        stage: "",
      };
    default:
      return state;
  }
};

export const HelpContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <HelpContext.Provider value={{ state, dispatch }}>
      {props.children}
    </HelpContext.Provider>
  );
};

export default { HelpContext, HelpContextProvider };
