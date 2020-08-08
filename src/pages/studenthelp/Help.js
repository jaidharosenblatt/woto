import React, { useEffect, useReducer } from "react";
import API from "../../api/API";
import JoinQueue from "./JoinQueue";

import { reducer } from "./util/reducer";
import { actions } from "./util/actions";
import { HelpContext } from "./util/HelpContext";
import ActiveSession from "./ActiveSession";
import WotoRoom from "./wotos/WotoRoom";

/**
 * @jaidharosenblatt Wrapper page for the student help process for both Woto rooms
 * and for submitting a question for a TA queue. Uses state variables to hold the current
 * stage of the problem and passes down as props to all of the pages. Decided to use
 * hooks instead of context for readability
 *
 * @param {course} code course code to display on various help pages
 * @param {course} activeSession the key of the active session if it exists
 */
const Help = ({ course }) => {
  // const temp = {
  //   assignment: ["test"],
  //   stage: "Just started the problem",
  //   concepts: ["Linked List"],
  //   details: "hi there",
  // };
  const initialState = {
    // description: temp,
    // question: { active: true, description: temp, createdAt: new Date() },
    course,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  useEffect(() => {
    async function getSession() {
      const response = await API.getSession(course._id);
      dispatch({ type: actions.SET_SESSION, payload: response[0] });
    }

    if (course.activeSession) {
      getSession();
    }
  }, [course]);

  var page = null;
  if (state.question && state.question.active) {
    page = <ActiveSession />;
  } else if (state.discussion || !course.activeSession) {
    page = <WotoRoom />;
  } else {
    page = <JoinQueue />;
  }

  return (
    <HelpContext.Provider value={{ state, dispatch }}>
      <div className="HelpWrapper">{page}</div>
    </HelpContext.Provider>
  );
};

export default Help;
